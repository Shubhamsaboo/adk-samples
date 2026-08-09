"""Deterministic underscore for the Long Horizon film.

Usage:  python3 scripts/compose-bed.py && ffmpeg -y -i assets/bgm/track.wav \
            -c:a libmp3lame -b:a 192k assets/bgm/track.mp3 && rm assets/bgm/track.wav

Written because HeyGen's licensed music catalog needs a sign-in and the local MusicGen
fallback could not download its model in this environment. Same seed in, same bytes out.

Dark cinematic tech bed: sub drone + soft pad in A minor, sparse plucked arpeggio,
restrained kick/hat pulse at 100 BPM, arranged against the film's beat map.
No external models — pure numpy synthesis, fully deterministic.
"""
import math
from pathlib import Path

import numpy as np
import soundfile as sf

SR = 44100
DUR = 92.0
BPM = 100.0
BEAT = 60.0 / BPM          # 0.6s
BAR = BEAT * 4             # 2.4s
N = int(DUR * SR)
t = np.arange(N, dtype=np.float64) / SR

rng = np.random.default_rng(20260809)   # fixed seed → identical every run

L = np.zeros(N)
R = np.zeros(N)


def add(buf, start_s, sig, gain=1.0, pan=0.0):
    """Mix sig into L/R at start_s with equal-power pan (-1..1)."""
    i = int(start_s * SR)
    if i >= N:
        return
    seg = sig[: N - i]
    gl = gain * math.cos((pan + 1) * math.pi / 4)
    gr = gain * math.sin((pan + 1) * math.pi / 4)
    L[i : i + len(seg)] += seg * gl * math.sqrt(2) / 2 * 1.414
    R[i : i + len(seg)] += seg * gr * math.sqrt(2) / 2 * 1.414


def env(n, a, d, s_level, r, sustain_n=None):
    """ADSR over n samples (a/d/r in samples)."""
    e = np.zeros(n)
    a = max(1, int(a)); d = max(1, int(d)); r = max(1, int(r))
    if sustain_n is None:
        sustain_n = max(0, n - a - d - r)
    idx = 0
    e[idx : idx + a] = np.linspace(0, 1, a)
    idx += a
    e[idx : idx + d] = np.linspace(1, s_level, d)
    idx += d
    e[idx : idx + sustain_n] = s_level
    idx += sustain_n
    tail = min(r, n - idx)
    if tail > 0:
        e[idx : idx + tail] = np.linspace(s_level, 0, tail)
    return e


def one_pole_lp(x, cutoff_hz):
    a = math.exp(-2 * math.pi * cutoff_hz / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc = (1 - a) * x[i] + a * acc
        y[i] = acc
    return y


def lp_fast(x, cutoff_hz):
    """Two cascaded one-pole lowpasses, vectorised via lfilter-style recursion."""
    from scipy.signal import lfilter  # noqa
    a = math.exp(-2 * math.pi * cutoff_hz / SR)
    y = lfilter([1 - a], [1, -a], x)
    return lfilter([1 - a], [1, -a], y)


def hp_fast(x, cutoff_hz):
    from scipy.signal import butter, lfilter
    b, a = butter(2, cutoff_hz / (SR / 2), btype="high")
    return lfilter(b, a, x)


def note(f, dur_s, kind="sine", detune=0.0, a=0.005, d=0.25, s=0.35, r=0.5):
    n = int(dur_s * SR)
    tt = np.arange(n) / SR
    if kind == "sine":
        y = np.sin(2 * math.pi * f * tt)
    elif kind == "tri":
        y = 2 / math.pi * np.arcsin(np.sin(2 * math.pi * f * tt))
    elif kind == "saw5":                      # 5-harmonic band-limited saw
        y = sum(np.sin(2 * math.pi * f * k * tt) / k for k in range(1, 6))
        y /= 2.0
    else:
        raise ValueError(kind)
    if detune:
        y = y + 0.5 * np.sin(2 * math.pi * f * (1 + detune) * tt)
        y /= 1.5
    return y * env(n, a * SR, d * SR, s, r * SR)


def pluck(f, dur_s, bright=1.0):
    """Soft plucked tone: sine + a decaying 2nd/3rd harmonic."""
    n = int(dur_s * SR)
    tt = np.arange(n) / SR
    body = np.sin(2 * math.pi * f * tt)
    h2 = np.sin(2 * math.pi * f * 2 * tt) * np.exp(-tt * 9) * 0.32 * bright
    h3 = np.sin(2 * math.pi * f * 3 * tt) * np.exp(-tt * 16) * 0.16 * bright
    y = body + h2 + h3
    e = np.exp(-tt * 2.6) * (1 - np.exp(-tt * 400))
    return y * e


def kick(dur_s=0.7):
    n = int(dur_s * SR)
    tt = np.arange(n) / SR
    f = 96 * np.exp(-tt * 26) + 42
    ph = 2 * math.pi * np.cumsum(f) / SR
    y = np.sin(ph) * np.exp(-tt * 6.5)
    click = rng.standard_normal(n) * np.exp(-tt * 320) * 0.06
    return y * 0.9 + click


def hat(dur_s=0.09):
    n = int(dur_s * SR)
    tt = np.arange(n) / SR
    y = rng.standard_normal(n) * np.exp(-tt * 90)
    return hp_fast(y, 7000) * 0.5


def sub(f, dur_s, a=2.0, r=3.0):
    n = int(dur_s * SR)
    tt = np.arange(n) / SR
    y = np.sin(2 * math.pi * f * tt) + 0.22 * np.sin(2 * math.pi * f * 2 * tt)
    # slow amplitude breathing so the drone is not a dead tone
    breathe = 1 + 0.10 * np.sin(2 * math.pi * 0.055 * tt)
    return y * breathe * env(n, a * SR, 0.1 * SR, 1.0, r * SR)


# ── note table (A minor) ─────────────────────────────────────────────────────
def hz(semis_from_a4):
    return 440.0 * (2 ** (semis_from_a4 / 12))

A1, A2, F2, C3, E3 = hz(-36), hz(-24), hz(-28), hz(-21), hz(-17)
A3, C4, E4, G4, A4, B4, C5, E5, G5 = (hz(-12), hz(-9), hz(-5), hz(-2),
                                      hz(0), hz(2), hz(3), hz(7), hz(10))

# ── arrangement ──────────────────────────────────────────────────────────────
# Section map (seconds) mirrors the film's beat map:
#   0-18   cold open + pain      — drone + pad, no drums
#   18-28  product intro         — pad lifts, arpeggio enters
#   28-36  system diagram        — arpeggio + soft pulse
#   36-48  "it dreams"           — strip back: bell motif, no drums
#   48-68  proof + extensibility — full: kick, hat, bass pulse, arpeggio
#   68-82  quickstart + deploy   — driving, brightest
#   82-92  close                 — drums out, long resolve

# 1. Sub drone: A1 through the whole piece, dropping to F2's root under the close.
drone = sub(A1, 92.0, a=3.5, r=10.0)
add(L, 0.0, drone, gain=0.26, pan=0.0)
drone2 = sub(F2 / 2, 30.0, a=3.0, r=9.0)
add(L, 62.0, drone2, gain=0.18, pan=0.0)

# 2. Pad: slow A-minor triad chords, one per 8 bars, with a soft filter.
pad_chords = [
    (0.0, [A2, C3, E3], 22.0, 0.20),
    (19.2, [A2, C3, E3], 20.0, 0.26),
    (36.0, [F2, C3, hz(-16)], 14.0, 0.24),      # F major-ish colour for the dream beat
    (48.0, [A2, C3, E3], 22.0, 0.28),
    (68.0, [hz(-29), hz(-22), hz(-17)], 16.0, 0.28),  # G-ish lift for the payoff
    (81.6, [A2, C3, E3], 11.0, 0.26),
]
for start, chord, dur, g in pad_chords:
    voice = np.zeros(int(dur * SR))
    for k, f in enumerate(chord):
        v = note(f, dur, kind="saw5", detune=0.0016 * (k + 1),
                 a=2.4, d=1.6, s=0.7, r=3.4)
        voice[: len(v)] += v / len(chord)
    voice = lp_fast(voice, 620)
    add(L, start, voice, gain=g, pan=-0.12)
    add(L, start + 0.03, voice, gain=g * 0.92, pan=0.12)

# 3. Sparse plucked arpeggio — enters at 19.2s, sits out the dream beat.
arp_notes = [A4, C5, E5, C5, G4, C5, E5, A4]
arp_windows = [(19.2, 36.0, 0.32), (48.0, 68.0, 0.42), (68.0, 82.0, 0.46)]
step = BEAT / 2
for w_start, w_end, w_gain in arp_windows:
    i = 0
    tpos = w_start
    while tpos < w_end - 0.4:
        f = arp_notes[i % len(arp_notes)]
        # let it breathe: skip the 4th and 8th sixteenth of every bar
        if i % 8 not in (3, 7):
            g = w_gain * (0.72 if i % 2 else 1.0)
            add(L, tpos, pluck(f, 1.5), gain=g * 0.5,
                pan=-0.35 + 0.7 * ((i % 4) / 3))
        tpos += step
        i += 1

# 4. Bell motif for the dream beat (36-48s) — slow, wide, one note per bar.
for k, (off, f) in enumerate([(36.4, E5), (38.8, C5), (41.2, A4), (43.6, G4),
                              (46.0, E5)]):
    add(L, off, pluck(f, 3.2, bright=0.55), gain=0.26, pan=-0.3 + 0.15 * k)

# 5. Drums — restrained, only in the driving sections.
drum_windows = [(48.0, 68.0), (68.0, 82.0)]
for w_start, w_end in drum_windows:
    b = w_start
    n_beat = 0
    while b < w_end - 0.2:
        if n_beat % 4 in (0, 2):
            add(L, b, kick(), gain=0.24 if n_beat % 4 == 0 else 0.15)
        if n_beat % 2 == 1:
            add(L, b + BEAT / 2, hat(), gain=0.075, pan=0.22)
        # sub bass pulse follows the kick
        if n_beat % 4 == 0:
            add(L, b, note(A2 / 2, 0.55, kind="sine", a=0.004, d=0.18, s=0.25, r=0.3),
                gain=0.22)
        b += BEAT
        n_beat += 1

# 6. One soft swell into the payoff at 68s (the deploy/close lift).
sw_n = int(3.0 * SR)
sw_t = np.arange(sw_n) / SR
swell = rng.standard_normal(sw_n) * np.linspace(0, 1, sw_n) ** 2.4
swell = lp_fast(swell, 1400) * 0.5
add(L, 65.2, swell, gain=0.10, pan=0.0)

# ── space: a cheap but musical reverb (decaying noise convolution) ───────────
ir_len = int(1.9 * SR)
ir_t = np.arange(ir_len) / SR
ir = rng.standard_normal(ir_len) * np.exp(-ir_t * 3.1)
ir = lp_fast(ir, 3800)
ir[: int(0.012 * SR)] = 0.0
ir /= np.max(np.abs(ir))


def convolve_tail(x, ir, wet):
    y = np.convolve(x, ir, mode="full")[: len(x)]
    y /= (np.max(np.abs(y)) + 1e-9)
    return x * (1 - wet * 0.35) + y * wet


L = convolve_tail(L, ir, 0.30)
R = convolve_tail(R, ir[::-1] * np.exp(-ir_t * 3.4), 0.30)

# ── glue: gentle high-shelf tame, soft clip, master fades ────────────────────
def soft_clip(x):
    return np.tanh(x * 1.25) / 1.25


stereo = np.stack([L, R], axis=1)
stereo = np.apply_along_axis(lambda c: lp_fast(c, 13000), 0, stereo)
peak = np.max(np.abs(stereo))
if peak > 1e-9:
    stereo = stereo / peak * 0.82
stereo = soft_clip(stereo)

fade_in = int(2.5 * SR)
fade_out = int(6.0 * SR)
stereo[:fade_in] *= np.linspace(0, 1, fade_in)[:, None] ** 1.6
stereo[-fade_out:] *= np.linspace(1, 0, fade_out)[:, None] ** 1.4

peak = np.max(np.abs(stereo))
stereo = stereo / peak * 0.88

out = "/home/user/adk-samples/videos/long-horizon-harness/assets/bgm/track.wav"
sf.write(out, stereo.astype("float32"), SR)
print(f"wrote {out}  {stereo.shape[0]/SR:.2f}s  peak={np.max(np.abs(stereo)):.3f}")
