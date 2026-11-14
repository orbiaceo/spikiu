#!/usr/bin/env bash
# Vergleich: dieselben Sätze mit den heutigen Piper-Stimmen aus audio.js (VOICE_MAP).
# Aufruf: piper.sh <saetze.json> <wav-ordner>
set -uo pipefail
saetze="$1"; aus="$2"; mkdir -p "$aus" stimmen
HF=https://huggingface.co/rhasspy/piper-voices/resolve/main
declare -A V=(
  [de]="de/de_DE/thorsten/medium/de_DE-thorsten-medium"
  [es]="es/es_ES/davefx/medium/es_ES-davefx-medium"
  [en]="en/en_US/lessac/high/en_US-lessac-high"
  [el]="el/el_GR/rapunzelina/low/el_GR-rapunzelina-low"
)
for sprache in de es en el; do
  p="${V[$sprache]}"; n=$(basename "$p")
  [ -f "stimmen/$n.onnx" ] || { curl -sSL "$HF/$p.onnx" -o "stimmen/$n.onnx"; curl -sSL "$HF/$p.onnx.json" -o "stimmen/$n.onnx.json"; }
  for k in 1 2; do
    jq -r ".${sprache}[$((k-1))]" "$saetze" | piper -m "stimmen/$n.onnx" -f "$aus/$sprache-$k-piper.wav" && echo "$sprache $k piper" || echo "übersprungen $sprache $k piper"
  done
done
