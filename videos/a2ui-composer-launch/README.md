# A2UI Composer — launch film

A 60-second, 1920×1080 dark-theme launch film for the [A2UI Composer](https://a2ui.org/composer/),
built with [HyperFrames](https://hyperframes.heygen.com) (write HTML, render video).

The film's one claim: **describe the interface, and watch the agent stream it into existence.**
It sells the thing a screenshot physically cannot — progressive rendering — by putting the A2UI
JSON editor and the rendered preview on screen at the same time and making every component appear
on the beat its own lines finish streaming.

```
npm run dev      # preview in the browser (long-running)
npm run check    # lint + runtime + layout + motion + contrast
npm run render   # → renders/video.mp4
```

## The cut

| # | Frame | Len | Beat | Shape |
|---|-------|-----|------|-------|
| 01 | Text can't be tapped | 8s | hook · pain agitation | `typewriter-reveal` (adapt) |
| 02 | Describe the interface | 8s | value claim | `kinetic-type-beats` |
| 03 | Prompt → UI, live | 14s | mechanism · the climax | `prompt-type-submit-generate` (adapt) |
| 04 | The workbench | 10s | scope | `zoom-out-workspace-reveal` |
| 05 | One payload. Every renderer. | 10s | proof · objection handling | `fixed-anchor-cycle` (adapt) |
| 06 | Open the composer | 10s | CTA | `logo-assemble-lockup` (adapt) |

Cuts land at 0 / 8 / 16 / 30 / 40 / 50 / 60s — every one of them on a bar line (see *Audio*).

## Design system

`frame.md` is the spec every frame is built against. It was adopted from the shipped
**`code-editorial`** preset via `build-frame.mjs` — which established the doctrine it keeps
(hairline elevation instead of shadows, a single scarce voltage colour, a first-class code
surface, sentence-case display with tight negative tracking, mono for everything indexical) —
and then **inverted to a dark ground by hand**, because the brief is dark and all 13 shipped
presets are paper-light.

The palette is deliberately semantic rather than decorative:

| Role | Hex | Means |
|------|-----|-------|
| `canvas` | `#07080B` | the void — the film's floor |
| `surface` → `surface-elev` → `surface-hi` | `#0D0F15` → `#141824` → `#1B2130` | half-step panel ladder |
| `ink` / `ink-mute` / `ink-faint` | `#EDF1F8` / `#8A93A6` / `#4A5364` | the voice, in three steps |
| `stream` | `#5B8CFF` | **signal in flight** — the caret, JSON keys, the wire |
| `live` | `#34E2C0` | **the voltage** — the instant a description becomes real |
| `gemini` | `#A78BFA` | the agent's colour, quarantined to the assistant panel |
| `amber` | `#E8B15A` | numbers in JSON. Syntax only. |

`gemini` violet appearing only inside the assistant panel is a deliberate argument, not a style
rule: the agent's colour never leaks onto the surfaces the agent produced, which is the trust
boundary the protocol exists to draw.

Every frame carries the identical `grid-field` — a 48px lattice at 4% ink, radially masked — so
each cut reads as a camera move through one continuous room rather than a change of venue.

## Audio

Both halves are generated into the project, so a re-render is byte-identical.

- **Music** — `scripts/score.mjs` synthesises `assets/bgm/composer-bed.mp3` from scratch: a dark
  minimal electronic bed at **120 BPM** (0.5s beat, 2.0s bar) in A minor, arranged section by
  section against the cut — sparse under the hook, an eighth-note engine under the streaming
  demo, half-time under the pull-back, quarters under the renderer cycle, and one held chord that
  rings out over the lockup. Deterministic by construction (seeded PRNG, no `Date`/`Math.random`).
  The reason it is hand-scored rather than pulled from a library is partly access — no HeyGen
  credential here, and the local MusicGen deps are absent — but mostly control: a library track
  can't be locked to the edit, and this one is written so the frame boundaries *are* bar lines.
- **SFX** — 45 cues from the bundled HyperFrames library, hand-placed in `audio_meta.json` against
  the real visual beats (the resolver's default is one cue per frame at offset 0, which is not
  sound design). The riser is triggered at 43.4s so its peak lands exactly on the mark's
  completion at 53.4s, where the bass hit sits.

## Notes on how this was built

- **No-capture mode.** This environment's egress proxy blocks `a2ui.org` and the hosted Composer
  app, so nothing was screenshotted. Every visual — the workbench chrome, the streaming JSON, the
  rendered widget, the renderer skins, the mark — is authored HTML/SVG. That is also why the
  panels can animate natively instead of being a still plate with overlays.
- **The A2UI shown on screen is real.** The payload uses actual Basic Catalog v0.9/v1.0 syntax
  (`Card` / `Column` / `Text` / `Divider` / `ChoicePicker` / `Button`, flat components array,
  `action.event.name`), and the product surfaces named in the film — the four workbench panels,
  the three shipped renderers, the debug tabs — all exist.
- **Vendored dependencies.** GSAP is served from `assets/vendor/gsap.min.js` and the fonts from
  `assets/fonts/` because the CDNs are blocked; nothing in a composition fetches at render time,
  which is also what the framework's determinism rules require.
- **Skills.** Built with the HyperFrames agent skills (`npx skills add heygen-com/hyperframes`).
  They are gitignored at the repo root and reproducible from `skills-lock.json`.
