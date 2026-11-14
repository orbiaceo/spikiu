// Hörproben Supertonic 3 (Leo, 14.11.2026): alle 10 Stimmen × 4 Sprachen × 2 Sätze.
// Läuft NUR in .github/workflows/tts-proben.yml (onnxruntime-node dort installiert).
// Algorithmus wie iuspik scripts/audio/render.mjs: 10 Schritte, Tempo 1.0, Spitzenpegel normalisiert.
// Aufruf: node supertonic.mjs <saetze.json> <wav-ordner>
import { readFile, writeFile, mkdir } from "node:fs/promises";
import * as ort from "onnxruntime-node";

const [saetzeDatei, aus] = process.argv.slice(2);
const REPO = "https://huggingface.co/supertone-oss-archive/supertonic-3/resolve/aafc6e32416a594460b32413efc49d7fe4ce6d46";
const SCHRITTE = 10;
const TEMPO = 1.0;
const STIMMEN = ["M1", "M2", "M3", "M4", "M5", "F1", "F2", "F3", "F4", "F5"];

const hole = async (p) => {
  for (let versuch = 1; ; versuch++) {
    const r = await fetch(`${REPO}/${p}`);
    if (r.ok) return Buffer.from(await r.arrayBuffer());
    if (versuch >= 4) throw new Error(`${p}: HTTP ${r.status}`);
    await new Promise((ok) => setTimeout(ok, 5000 * versuch));
  }
};
const saetze = JSON.parse(await readFile(saetzeDatei, "utf8"));
const cfgs = JSON.parse((await hole("onnx/tts.json")).toString());
const indexer = JSON.parse((await hole("onnx/unicode_indexer.json")).toString());
const sitzung = async (n) => ort.InferenceSession.create(await hole(`onnx/${n}.onnx`), { intraOpNumThreads: 4 });
const [dp, enc, est, voc] = [await sitzung("duration_predictor"), await sitzung("text_encoder"), await sitzung("vector_estimator"), await sitzung("vocoder")];
const T = ort.Tensor;

function vorbereiten(text, sprache) {
  let t = text.normalize("NFKD").replace(/[‘’´`]/g, "'").replace(/[“”«»„]/g, '"').replace(/[–—‑]/g, "-").replace(/\s+/g, " ").trim();
  if (!/[.!?;:,'")\]}…]$/.test(t)) t += ".";
  return `<${sprache}>${t}</${sprache}>`;
}
function wav(muster, sr) {
  let spitze = 0;
  for (const s of muster) spitze = Math.max(spitze, Math.abs(s));
  const faktor = spitze > 0 ? Math.min(4, 0.89 / spitze) : 1;
  const daten = Buffer.alloc(muster.length * 2);
  for (let i = 0; i < muster.length; i++) daten.writeInt16LE(Math.round(Math.max(-1, Math.min(1, muster[i] * faktor)) * 32767), i * 2);
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + daten.length, 4); h.write("WAVE", 8); h.write("fmt ", 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(sr, 24);
  h.writeUInt32LE(sr * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(daten.length, 40);
  return Buffer.concat([h, daten]);
}
async function synth(text, sprache, ttl, sdp) {
  const ids = [...vorbereiten(text, sprache)].map((c) => { const cp = c.codePointAt(0); return BigInt(cp < indexer.length ? indexer[cp] : -1); });
  const n = ids.length;
  const textIds = new T("int64", BigInt64Array.from(ids), [1, n]);
  const textMask = new T("float32", new Float32Array(n).fill(1), [1, 1, n]);
  const d = (await dp.run({ text_ids: textIds, style_dp: sdp, text_mask: textMask })).duration.data[0] / TEMPO;
  const e = await enc.run({ text_ids: textIds, style_ttl: ttl, text_mask: textMask });
  const sr = cfgs.ae.sample_rate;
  const chunk = cfgs.ae.base_chunk_size * cfgs.ttl.chunk_compress_factor;
  const len = Math.max(1, Math.floor((Math.floor(d * sr) + chunk - 1) / chunk));
  const dim = cfgs.ttl.latent_dim * cfgs.ttl.chunk_compress_factor;
  let xt = new Float32Array(dim * len).map(() => Math.sqrt(-2 * Math.log(Math.max(1e-4, Math.random()))) * Math.cos(2 * Math.PI * Math.random()));
  const lm = new T("float32", new Float32Array(len).fill(1), [1, 1, len]);
  for (let s = 0; s < SCHRITTE; s++) {
    const o = await est.run({ noisy_latent: new T("float32", xt, [1, dim, len]), text_emb: e.text_emb, style_ttl: ttl, latent_mask: lm, text_mask: textMask, current_step: new T("float32", new Float32Array([s]), [1]), total_step: new T("float32", new Float32Array([SCHRITTE]), [1]) });
    xt = Float32Array.from(o.denoised_latent.data);
  }
  return Float32Array.from((await voc.run({ latent: new T("float32", xt, [1, dim, len]) })).wav_tts.data);
}

await mkdir(aus, { recursive: true });
for (const stimme of STIMMEN) {
  const roh = JSON.parse((await hole(`voice_styles/${stimme}.json`)).toString());
  const ttl = new T("float32", Float32Array.from(roh.style_ttl.data.flat(Infinity)), roh.style_ttl.dims);
  const sdp = new T("float32", Float32Array.from(roh.style_dp.data.flat(Infinity)), roh.style_dp.dims);
  for (const [sprache, liste] of Object.entries(saetze)) {
    for (const [k, text] of liste.entries()) {
      try {
        await writeFile(`${aus}/${sprache}-${k + 1}-${stimme}.wav`, wav(await synth(text, sprache, ttl, sdp), cfgs.ae.sample_rate));
        console.log(sprache, k + 1, stimme);
      } catch (fehler) {
        console.log(`übersprungen ${sprache}-${k + 1}-${stimme}: ${String(fehler).slice(0, 160)}`);
      }
    }
  }
}
