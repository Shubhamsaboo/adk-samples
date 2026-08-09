---
workflow: product-launch-video
flow: automation
storyboard: no
message: "Everything a long-running agent needs — memory, sandbox, guardrails, self-improvement — already wired, and you run it with one command."
destination: youtube-embed
aspect: 1920x1080
language: en
audience: "AI engineers and platform developers building production agents on ADK / Google Agent Platform"
length: 88s
angle: "capability reveal — the harness you would otherwise spend months building, shipped as readable reference code"
style_preset: code-editorial
---

## Intent

A launch/showcase film for **Long Horizon**, the reference agent harness in
`google/adk-samples` (`core/python/long-horizon-harness`). The audience is
developers who already know that the hard part of agents is not the model — it
is everything around it: memory that survives the session, a sandbox that stays
warm, secrets the model never sees, guardrails that halt a runaway loop, and a
harness that gets better the more it is used.

The film should feel like an expensive studio piece: **dark theme**, deep
near-black ground, restrained luminous accents, precise typography, motion that
is engineered rather than decorative, and sound design that lands every cut.
Confident and technical — closer to a hardware keynote than a SaaS explainer.
No stock-photo gloss, no bullet lists read aloud.

Source of truth for every claim on screen: the sample's own README and docs
(features, stack table, quickstart commands, deploy story). Nothing invented.

## Assets

- capture/assets/long-horizon-banner.webp — the sample's own banner art (observatory at sunset, agent graph on the table); the opening ground.
- capture/assets/horizon-demo.gif — the real Horizon web UI running two tasks, streaming tool calls into a rendered HTML artifact; the proof beat.

## Customizations

- Dark theme is a hard requirement — the shipped `code-editorial` preset is
  adopted for structure, typography and the code surface, then inverted to a
  near-black canvas design system before any frame is built.
- Real terminal/code surfaces for the quickstart beat — the three actual
  commands from the README, typed on screen, not paraphrased.
- Count-up / ticking treatment on the stack numbers where one exists
  (ADK 2.5.x, one command, min_instance_count = 1).
- Sound design is explicitly requested: whooshes on wipes, UI ticks on
  data reveals, a riser into the climax, a bass impact on the logo lock-up.

## Notes

- Product name on screen is **Long Horizon** / **Horizon**; it is a Google
  ADK *sample*, not an officially supported product — do not imply GA status
  or use Google brand lock-ups.
- Autonomous run: the user asked for the finished piece ("create an interesting
  video ... it should be super impressive"), so `flow: automation` and
  `storyboard: no` are inferred, not answered. Aspect, destination, length and
  angle are likewise inferred from a developer-facing showcase; they are the
  correction surface if the user wants something else.
- Not signed in to HeyGen at run time: voice, music and SFX all resolve offline.
  Narration is Kokoro-82M (`bm_george`); SFX come from HyperFrames' bundled
  21-file library; the music bed is composed deterministically by
  `scripts/compose-bed.py`, because the licensed catalog needs a sign-in and the
  local MusicGen fallback could not fetch its model (its host is blocked by this
  environment's egress policy). Signing in would swap in the HeyGen catalog and
  voices — a re-run of Step 3.1 is all it takes.
- The cut lands at **87.7s** against the 75s expectation in this brief. The
  narration alone is 75.2s; the extra ~12s is deliberate air — the cold open
  holds, the proof beat gets time for the real UI to actually be watched, the
  terminal gets time to be read, and the close holds. `length` above was updated
  to match what shipped.
- GSAP is vendored at `assets/vendor/gsap.min.js` and the composition's `<video>`
  is restored by `scripts/build.sh` before each assemble; see the project README
  for why.
