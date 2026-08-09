---
workflow: product-launch-video
flow: automation
storyboard: no
message: "Describe the interface. Watch the agent stream it into existence."
destination: youtube
aspect: 1920x1080
language: en
audience: "Developers and product engineers building agent-driven apps"
length: 60s
angle: "Prompt → UI, live: a typed prompt streams A2UI JSON into the editor while the rendered preview assembles itself in real time beside it"
music: tense-electronic
---

## Intent

A launch film for **A2UI Composer** — the browser-based visual workbench for A2UI,
the open protocol (created by Google, Apache 2.0) that lets AI agents send *declarative*
UI descriptions across a trust boundary instead of executing arbitrary code.

The film sells the one thing a screenshot physically cannot: **progressive streaming**.
A developer types a prompt; A2UI JSON streams down the editor token by token; and in the
panel beside it the interface assembles itself component by component, in lockstep.

Tone: dark, precise, expensive. Closer to a Linear or Vercel launch film than a SaaS
explainer — restrained palette, confident typography, motion that performs rather than
decorates. No stock imagery, no bullet lists, no cheerful marketing voice.

Confirmed by the user at the intent layer:

- **Angle** — "Prompt → UI, live" (chosen over three alternatives: a three-renderer
  triptych, a trust-boundary problem/solution, and a 20-second speed-run). The chosen
  angle absorbs a workbench pull-back and a renderer-swap beat as supporting scenes.
- **Destination** — YouTube / docs embed → 16:9, 1920×1080.
- **Length** — ~60 seconds; six beats with room to breathe.
- **Audio** — music bed plus designed SFX, no voice-over. Kinetic typography carries
  the message.

## Assets

None supplied by the user. Every visual is designed from scratch.

## Customizations

- **No-capture mode.** This environment's egress proxy blocks `a2ui.org` and the live
  Composer app, so nothing is screenshotted. The Composer UI is reconstructed as
  designed, in-composition HTML — which also lets the panels animate natively instead
  of being a still plate with overlays.
- **Streaming is the hero.** The JSON editor and the rendered preview must be visibly
  synchronised: every component that appears in the preview is caused by the lines that
  just landed in the editor. Never let one finish before the other starts.
- **Sound design is deterministic and hand-scored**, generated offline into the project
  rather than pulled from a library — the cut grid and the music grid are authored to
  the same BPM so hits land on beats.

## Notes

- Not signed in to HeyGen; Kokoro and MusicGen local deps are absent. Narration was not
  requested, so no TTS is needed. BGM and SFX are synthesised into `assets/audio/`.
- Real product facts only — the four workbench panels (Gemini assistant, rendered
  preview, JSON editor, debug tabs), the three shipped renderers (Angular, Lit, React),
  and the components gallery all exist. Do not invent features.
- Dark theme throughout. No white flashes at seams.
- End card carries `a2ui.org/composer`.
