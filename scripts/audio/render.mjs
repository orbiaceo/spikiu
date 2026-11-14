// Spikiu (Leo, 14.11.2026): übernommen aus iuspik scripts/audio/render.mjs — Supertonic 3, Rev. aafc6e3.
// Läuft NUR in .github/workflows/audio-render.yml (onnxruntime-node dort installiert).
// Neu für Spikiu: „⏸“ im Text (Buchstabieren, sprechtext.js) = eigenes Stück + 0,35 s Pause.
// Renders the units of one course with one Supertonic 3 voice as WAV files
// (the workflow turns them into MP3). Skips units that already have an MP3.
// Usage: node render.mjs <units.json> <lang> <voice> <mp3dir> <wavdir> [shard] [shards]
// With shards, this run renders only every shards-th missing unit (shard 0…shards-1).
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import * as ort from "onnxruntime-node";

const [unitsFile, lang, voice, mp3dir, wavdir, shardArg = "0", shardsArg = "1"] = process.argv.slice(2);
const shard = Number(shardArg);
const shards = Number(shardsArg);
const REPO = "https://huggingface.co/supertone-oss-archive/supertonic-3/resolve/aafc6e32416a594460b32413efc49d7fe4ce6d46";
const STEPS = 10;
const SPEED = 1.0;

const get = async (p) => {
  for (let attempt = 1; ; attempt++) {
    const r = await fetch(`${REPO}/${p}`);
    if (r.ok) return Buffer.from(await r.arrayBuffer());
    if (attempt >= 4) throw new Error(`${p}: HTTP ${r.status}`);
    await new Promise((res) => setTimeout(res, 5000 * attempt));
  }
};
const exists = (f) => access(f).then(() => true, () => false);

const units = JSON.parse(await readFile(unitsFile, "utf8"));
const todo = [];
for (const [i, u] of units.entries()) if (i % shards === shard && !(await exists(`${mp3dir}/${u.key}.mp3`))) todo.push(u);
console.log(`${lang}/${voice} shard ${shard + 1}/${shards}: ${units.length} units, ${todo.length} to render`);
if (todo.length === 0) process.exit(0);

const cfgs = JSON.parse((await get("onnx/tts.json")).toString());
const indexer = JSON.parse((await get("onnx/unicode_indexer.json")).toString());
const opts = { intraOpNumThreads: 4 };
const sess = async (n) => ort.InferenceSession.create(await get(`onnx/${n}.onnx`), opts);
const [dp, enc, est, voc] = [await sess("duration_predictor"), await sess("text_encoder"), await sess("vector_estimator"), await sess("vocoder")];
const T = ort.Tensor;
const raw = JSON.parse((await get(`voice_styles/${voice}.json`)).toString());
const ttl = new T("float32", Float32Array.from(raw.style_ttl.data.flat(Infinity)), raw.style_ttl.dims);
const sdp = new T("float32", Float32Array.from(raw.style_dp.data.flat(Infinity)), raw.style_dp.dims);

function prepare(text) {
  let t = text.normalize("NFKD").replace(/[‘’´`]/g, "'").replace(/[“”«»„]/g, '"').replace(/[–—‑]/g, "-").replace(/[→←]/g, ", ").replace(/[_|#\/[\]]/g, " ").replace(/ ([,.!?;:])/g, "$1").replace(/\s+/g, " ").trim();
  if (!/[.!?;:,'")\]}…]$/.test(t)) t += ".";
  return `<${lang}>${t}</${lang}>`;
}
function wav(samples, sr) {
  let peak = 0;
  for (const s of samples) peak = Math.max(peak, Math.abs(s));
  const gain = peak > 0 ? Math.min(4, 0.89 / peak) : 1;
  const data = Buffer.alloc(samples.length * 2);
  for (let i = 0; i < samples.length; i++) data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, samples[i] * gain)) * 32767), i * 2);
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + data.length, 4); h.write("WAVE", 8); h.write("fmt ", 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(sr, 24);
  h.writeUInt32LE(sr * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(data.length, 40);
  return Buffer.concat([h, data]);
}

async function synth(text) {
  const ids = [...prepare(text)].map((c) => { const cp = c.codePointAt(0); return BigInt(cp < indexer.length ? indexer[cp] : -1); });
  const n = ids.length;
  const textIds = new T("int64", BigInt64Array.from(ids), [1, n]);
  const textMask = new T("float32", new Float32Array(n).fill(1), [1, 1, n]);
  const d = (await dp.run({ text_ids: textIds, style_dp: sdp, text_mask: textMask })).duration.data[0] / SPEED;
  const e = await enc.run({ text_ids: textIds, style_ttl: ttl, text_mask: textMask });
  const sr = cfgs.ae.sample_rate;
  const chunk = cfgs.ae.base_chunk_size * cfgs.ttl.chunk_compress_factor;
  const len = Math.max(1, Math.floor((Math.floor(d * sr) + chunk - 1) / chunk));
  const dim = cfgs.ttl.latent_dim * cfgs.ttl.chunk_compress_factor;
  let xt = new Float32Array(dim * len).map(() => Math.sqrt(-2 * Math.log(Math.max(1e-4, Math.random()))) * Math.cos(2 * Math.PI * Math.random()));
  const lm = new T("float32", new Float32Array(len).fill(1), [1, 1, len]);
  for (let s = 0; s < STEPS; s++) {
    const o = await est.run({ noisy_latent: new T("float32", xt, [1, dim, len]), text_emb: e.text_emb, style_ttl: ttl, latent_mask: lm, text_mask: textMask, current_step: new T("float32", new Float32Array([s]), [1]), total_step: new T("float32", new Float32Array([STEPS]), [1]) });
    xt = Float32Array.from(o.denoised_latent.data);
  }
  return Float32Array.from((await voc.run({ latent: new T("float32", xt, [1, dim, len]) })).wav_tts.data);
}

/** Long texts (placement listening) are spoken sentence by sentence and joined with a short pause. */
async function speakUnit(text) {
  if (text.includes("⏸")) {
    const stuecke = text.split("⏸").map((s) => s.trim()).filter((s) => /\p{L}|\p{N}/u.test(s));
    const pause = new Float32Array(Math.round(cfgs.ae.sample_rate * 0.35));
    const parts = [];
    for (const s of stuecke) parts.push(await speakPlain(s), pause);
    parts.pop();
    const out = new Float32Array(parts.reduce((n, p) => n + p.length, 0));
    let at = 0;
    for (const p of parts) { out.set(p, at); at += p.length; }
    return out;
  }
  return speakPlain(text);
}
async function speakPlain(text) {
  try {
    return await synth(text);
  } catch (error) {
    const sentences = text.split(/(?<=[.!?…])\s+/).filter((x) => x.trim());
    if (sentences.length < 2) throw error;
    const pause = new Float32Array(Math.round(cfgs.ae.sample_rate * 0.25));
    const parts = [];
    for (const sentence of sentences) parts.push(await synth(sentence), pause);
    const out = new Float32Array(parts.reduce((n, p) => n + p.length, 0));
    let at = 0;
    for (const p of parts) { out.set(p, at); at += p.length; }
    return out;
  }
}

await mkdir(wavdir, { recursive: true });
const t0 = Date.now();
let done = 0;
const failed = [];
for (const u of todo) {
  try {
    await writeFile(`${wavdir}/${u.key}.wav`, wav(await speakUnit(u.text), cfgs.ae.sample_rate));
  } catch (error) {
    failed.push(u);
    console.log(`übersprungen (bleibt still): ${JSON.stringify(u.text).slice(0, 120)} — ${String(error).slice(0, 120)}`);
  }
  if (++done % 100 === 0) console.log(`${done}/${todo.length} in ${Math.round((Date.now() - t0) / 1000)} s`);
}
console.log(`rendered ${done - failed.length} in ${Math.round((Date.now() - t0) / 1000)} s; skipped ${failed.length}`);
