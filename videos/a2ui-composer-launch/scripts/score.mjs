#!/usr/bin/env node
// score.mjs — the film's music bed, synthesised offline and deterministically.
//
// Why hand-scored: no HeyGen credential is available in this environment and the local
// MusicGen deps are absent, so the library path is closed. More importantly, a library
// track can't be locked to the edit — this bed is written at 120 BPM (0.5s beat, 2.0s
// bar) so every frame boundary (0/8/16/30/40/50/60s) lands exactly on a bar line, and
// the arrangement changes section on the cut rather than under it.
//
// Deterministic by construction: a seeded PRNG for noise, no Date/Math.random.
//
//   node scripts/score.mjs --out assets/bgm/composer-bed.wav

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const argv = process.argv.slice(2);
const flag = (n, d) => {
  const i = argv.indexOf(`--${n}`);
  return i >= 0 && i + 1 < argv.length ? argv[i + 1] : d;
};

const SR = 48000;
const DUR = 60.0;
const BPM = 120;
const BEAT = 60 / BPM; // 0.5s
const BAR = BEAT * 4; // 2.0s
const N = Math.round(SR * DUR);

const L = new Float64Array(N);
const R = new Float64Array(N);

// ── deterministic noise ───────────────────────────────────────────────────────

let seed = 987654321;
const rnd = () => {
  // xorshift32 — same sequence every render
  seed ^= seed << 13;
  seed >>>= 0;
  seed ^= seed >> 17;
  seed ^= seed << 5;
  seed >>>= 0;
  return seed / 4294967296 - 0.5;
};

// ── helpers ───────────────────────────────────────────────────────────────────
const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);
// note names → midi
const NOTE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const n = (name) => {
  const m = /^([A-G])(#?)(-?\d)$/.exec(name);
  return NOTE[m[1]] + (m[2] ? 1 : 0) + (parseInt(m[3], 10) + 1) * 12;
};

function add(t, sample, pan = 0) {
  const i = Math.round(t * SR);
  if (i < 0 || i >= N) return;
  const l = Math.cos(((pan + 1) * Math.PI) / 4);
  const r = Math.sin(((pan + 1) * Math.PI) / 4);
  L[i] += sample * l * 1.414;
  R[i] += sample * r * 1.414;
}

// one-pole lowpass state factory
const lp = (cut) => {
  let y = 0;
  const a = 1 - Math.exp((-2 * Math.PI * cut) / SR);
  return (x) => (y += a * (x - y));
};

// ── voices ────────────────────────────────────────────────────────────────────

// Sub bass: sine with a touch of drive. The film's floor.
function sub(t0, freq, dur, gain, pan = 0) {
  const len = Math.round(dur * SR);
  const f = lp(220);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    // fast attack, long exponential decay
    const env = (1 - Math.exp(-t * 260)) * Math.exp(-t * (2.2 / dur));
    const ph = 2 * Math.PI * freq * t;
    let s = Math.sin(ph) + 0.14 * Math.sin(2 * ph);
    s = Math.tanh(s * 1.5) * 0.66;
    add(t0 + t, f(s) * env * gain, pan);
  }
}

// Kick: pitch-dropping sine, tight.
function kick(t0, gain) {
  const dur = 0.32;
  const len = Math.round(dur * SR);
  let ph = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const freq = 46 + 92 * Math.exp(-t * 42);
    ph += (2 * Math.PI * freq) / SR;
    const env = Math.exp(-t * 17) * (1 - Math.exp(-t * 1400));
    add(t0 + t, Math.tanh(Math.sin(ph) * 1.9) * env * gain, 0);
  }
}

// Closed hat / tick: filtered noise, very short.
function tick(t0, gain, bright = 1, pan = 0) {
  const dur = 0.055;
  const len = Math.round(dur * SR);
  let hp = 0,
    prev = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    const x = rnd() * 2;
    // crude high-pass
    hp = 0.86 * (hp + x - prev) * bright;
    prev = x;
    const env = Math.exp(-t * 150);
    add(t0 + t, hp * env * gain, pan);
  }
}

// Arp/pluck: two detuned saws through a decaying lowpass. The "signal" voice.
function pluck(t0, freq, dur, gain, pan = 0, cut = 2600) {
  const len = Math.round(dur * SR);
  const f1 = lp(cut);
  const f2 = lp(cut * 0.6);
  let p1 = 0,
    p2 = 0;
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    p1 = (p1 + freq / SR) % 1;
    p2 = (p2 + (freq * 1.0035) / SR) % 1;
    const saw = (p1 - 0.5) * 2 * 0.5 + (p2 - 0.5) * 2 * 0.5;
    const env = (1 - Math.exp(-t * 900)) * Math.exp(-t * (3.4 / dur));
    add(t0 + t, f2(f1(saw)) * env * gain, pan);
  }
}

// Pad: stacked detuned saws, slow attack, wide. The room.
function pad(t0, freqs, dur, gain, cut = 900) {
  const len = Math.round(dur * SR);
  const fl = lp(cut);
  const fr = lp(cut * 0.92);
  const ph = freqs.map(() => [0, 0, 0]);
  const det = [0.997, 1.0, 1.004];
  const atk = Math.min(1.6, dur * 0.35);
  for (let i = 0; i < len; i++) {
    const t = i / SR;
    let sl = 0,
      sr = 0;
    for (let k = 0; k < freqs.length; k++) {
      for (let d = 0; d < 3; d++) {
        ph[k][d] = (ph[k][d] + (freqs[k] * det[d]) / SR) % 1;
        const v = (ph[k][d] - 0.5) * 2;
        if (d === 0) sl += v;
        else if (d === 2) sr += v;
        else {
          sl += v * 0.7;
          sr += v * 0.7;
        }
      }
    }
    const norm = 1 / (freqs.length * 2.4);
    const env =
      (1 - Math.exp((-t * 3) / atk)) * Math.min(1, Math.exp((-(t - (dur - 1.2)) * 1.6) / 1) || 1);
    const tail = t > dur - 1.4 ? clamp((dur - t) / 1.4, 0, 1) : 1;
    add(t0 + t, fl(sl * norm) * env * tail * gain, -0.55);
    add(t0 + t, fr(sr * norm) * env * tail * gain, 0.55);
  }
}

// Stab: short bright chord hit for the renderer cuts.
function stab(t0, freqs, gain) {
  for (const f of freqs) pluck(t0, f, 0.5, gain * 0.5, (f % 3) / 3 - 0.33, 4200);
}

// ── arrangement ───────────────────────────────────────────────────────────────
// A minor. Frame boundaries: 0 / 8 / 16 / 30 / 40 / 50 / 60s — all on bar lines.
const bar = (b) => b * BAR;

// Chord bed, one entry per 2-bar block: [rootMidiName, [chord tones]]
const PROG = [
  // 0–8s · Frame 1 — sparse, unresolved
  { at: 0, dur: 8, root: "A1", tones: ["A3", "E4", "C5"], gain: 0.055, cut: 620 },
  // 8–16s · Frame 2 — the claim; open it up a little
  { at: 8, dur: 8, root: "A1", tones: ["A3", "E4", "C5", "G5"], gain: 0.075, cut: 780 },
  // 16–30s · Frame 3 — the engine
  { at: 16, dur: 6, root: "A1", tones: ["A3", "E4", "C5"], gain: 0.085, cut: 980 },
  { at: 22, dur: 4, root: "F1", tones: ["F3", "C4", "A4"], gain: 0.085, cut: 980 },
  { at: 26, dur: 4, root: "G1", tones: ["G3", "D4", "B4"], gain: 0.085, cut: 1050 },
  // 30–40s · Frame 4 — the pull-back: widen, drop density
  { at: 30, dur: 6, root: "F1", tones: ["F3", "C4", "A4", "E5"], gain: 0.095, cut: 820 },
  { at: 36, dur: 4, root: "C2", tones: ["C4", "G4", "E5"], gain: 0.09, cut: 880 },
  // 40–50s · Frame 5 — rebuild under the renderer cuts
  { at: 40, dur: 4, root: "A1", tones: ["A3", "E4", "C5"], gain: 0.09, cut: 1000 },
  { at: 44, dur: 3, root: "F1", tones: ["F3", "C4", "A4"], gain: 0.09, cut: 1000 },
  { at: 47, dur: 3, root: "G1", tones: ["G3", "D4", "B4"], gain: 0.095, cut: 1100 },
  // 50–60s · Frame 6 — the close: land on A minor and let it ring out
  { at: 50, dur: 10, root: "A1", tones: ["A2", "A3", "E4", "C5", "E5"], gain: 0.115, cut: 900 },
];

for (const c of PROG) {
  pad(
    c.at,
    c.tones.map((t) => midi(n(t))),
    c.dur,
    c.gain,
    c.cut,
  );
}

// Sub-bass pulse. Density is the arrangement's main lever.
const subRootAt = (t) => {
  let cur = PROG[0];
  for (const c of PROG) if (t >= c.at - 1e-6) cur = c;
  return midi(n(cur.root));
};

for (let b = 0; b < 30; b++) {
  const t = bar(b);
  const f = subRootAt(t);
  if (t < 8) {
    // Frame 1 — beats 1 and 3 only, quiet: a heartbeat, not a groove
    sub(t, f, 1.05, 0.3);
    sub(t + 2 * BEAT, f, 0.9, 0.2);
  } else if (t < 16) {
    // Frame 2 — add beat 4-and as a lift
    sub(t, f, 1.0, 0.36);
    sub(t + 2 * BEAT, f, 0.85, 0.26);
    sub(t + 3.5 * BEAT, f * 1.5, 0.4, 0.16);
  } else if (t < 30) {
    // Frame 3 — the engine: eighths
    for (let e = 0; e < 8; e++) {
      const g = e % 2 === 0 ? 0.34 : 0.15;
      sub(t + e * (BEAT / 2), e === 6 ? f * 1.5 : f, 0.42, g);
    }
  } else if (t < 40) {
    // Frame 4 — pull back to a half-time pulse under the reveal
    sub(t, f, 1.3, 0.34);
    sub(t + 2 * BEAT, f, 1.1, 0.24);
  } else if (t < 50) {
    // Frame 5 — quarters, driving
    for (let e = 0; e < 4; e++) sub(t + e * BEAT, f, 0.55, e === 0 ? 0.36 : 0.22);
  } else {
    // Frame 6 — one landing hit per bar, thinning to nothing
    const fade = clamp((60 - t) / 10, 0, 1);
    sub(t, f, 1.8, 0.42 * (0.35 + 0.65 * fade));
  }
}

// Kick — only where the film is actually driving (Frames 3 and 5).
for (let b = 8; b < 15; b++) for (let q = 0; q < 4; q++) kick(bar(b) + q * BEAT, 0.3);
for (let b = 20; b < 25; b++) for (let q = 0; q < 4; q++) kick(bar(b) + q * BEAT, 0.26);

// Hats / ticks — the data texture. Offbeat 16ths, alternating pan by index (deterministic).
for (let b = 4; b < 30; b++) {
  const t0 = bar(b);
  if (t0 >= 30 && t0 < 36) continue; // breathe under the workbench pull-back
  const dense = (t0 >= 16 && t0 < 30) || (t0 >= 40 && t0 < 50);
  const step = dense ? BEAT / 4 : BEAT / 2;
  const steps = Math.round(BAR / step);
  for (let s = 0; s < steps; s++) {
    if (s % 2 === 0) continue; // offbeat only
    const t = t0 + s * step;
    if (t >= 50 && t > 54) continue; // clear the close
    const g = (dense ? 0.05 : 0.032) * (s % 4 === 1 ? 1 : 0.6);
    tick(t, g, 1, s % 4 === 1 ? -0.45 : 0.45);
  }
}

// Arpeggio — the "signal in flight" voice. Enters with the streaming demo.
const ARP_16 = ["A4", "C5", "E5", "C5", "A4", "E5", "G5", "E5"];
for (let b = 8; b < 30; b++) {
  const t0 = bar(b);
  if (t0 >= 30 && t0 < 40) continue; // silent through the pull-back
  const intro = t0 < 16; // Frame 2: quiet, half-density
  const g = intro ? 0.045 : t0 < 30 ? 0.085 : 0.07;
  const stepsPerBar = intro ? 8 : 16;
  for (let s = 0; s < stepsPerBar; s++) {
    const t = t0 + (s * BAR) / stepsPerBar;
    if (t >= 50) break;
    const note = ARP_16[s % ARP_16.length];
    const oct = s >= 8 && !intro ? 12 : 0;
    pluck(
      t,
      midi(n(note)) * Math.pow(2, oct / 12),
      0.3,
      g * (s % 4 === 0 ? 1 : 0.62),
      s % 2 ? 0.35 : -0.35,
      t0 < 16 ? 1700 : 3000,
    );
  }
}

// Stabs on the three renderer cuts (Frame 5: 42 / 44 / 46s) and the closing verdict.
stab(42.0, [midi(n("A4")), midi(n("C5")), midi(n("E5"))], 0.16);
stab(44.0, [midi(n("F4")), midi(n("A4")), midi(n("C5"))], 0.16);
stab(46.0, [midi(n("G4")), midi(n("B4")), midi(n("D5"))], 0.16);
stab(48.8, [midi(n("A4")), midi(n("E5")), midi(n("A5"))], 0.2);

// Close: the mark completes at 53.4s. Land a low octave there.
sub(53.4, midi(n("A1")), 3.4, 0.5);
stab(53.4, [midi(n("A4")), midi(n("E5")), midi(n("C6"))], 0.22);

// ── space: a small deterministic feedback delay, then a gentle bus ────────────
function delayBus(buf, timeS, fb, mix) {
  const d = Math.round(timeS * SR);
  const out = new Float64Array(buf.length);
  for (let i = 0; i < buf.length; i++) {
    const wet = i >= d ? out[i - d] * fb : 0;
    out[i] = buf[i] + wet;
  }
  for (let i = 0; i < buf.length; i++) buf[i] = buf[i] * (1 - mix) + out[i] * mix;
}
// dotted-eighth on one side, eighth on the other — classic, and it stays on the grid
delayBus(L, BEAT * 0.75, 0.3, 0.22);
delayBus(R, BEAT * 0.5, 0.28, 0.22);

// ── master: soft-knee limit, head/tail fades, DC-safe ─────────────────────────
let peak = 0;
for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
const norm = peak > 0 ? 0.82 / peak : 1;

const FADE_IN = 0.9 * SR;
const FADE_OUT = 3.2 * SR;
const buf = Buffer.alloc(44 + N * 4);
buf.write("RIFF", 0);
buf.writeUInt32LE(36 + N * 4, 4);
buf.write("WAVE", 8);
buf.write("fmt ", 12);
buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20);
buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24);
buf.writeUInt32LE(SR * 4, 28);
buf.writeUInt16LE(4, 32);
buf.writeUInt16LE(16, 34);
buf.write("data", 36);
buf.writeUInt32LE(N * 4, 40);

for (let i = 0; i < N; i++) {
  let fade = 1;
  if (i < FADE_IN) fade = i / FADE_IN;
  if (i > N - FADE_OUT) fade = Math.min(fade, (N - i) / FADE_OUT);
  const l = Math.tanh(L[i] * norm * 1.05) * fade;
  const r = Math.tanh(R[i] * norm * 1.05) * fade;
  buf.writeInt16LE(clamp(Math.round(l * 32767), -32768, 32767), 44 + i * 4);
  buf.writeInt16LE(clamp(Math.round(r * 32767), -32768, 32767), 44 + i * 4 + 2);
}

const out = resolve(flag("out", "assets/bgm/composer-bed.wav"));
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, buf);
console.log(`✓ score: ${DUR}s @ ${BPM} BPM → ${out} (peak ${peak.toFixed(3)} → −1.7 dBFS)`);
