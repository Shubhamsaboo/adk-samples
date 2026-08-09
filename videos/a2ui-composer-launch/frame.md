---
version: alpha
name: Composer Dark — Frame (video / frame layer)
description: >
  Dark-native frame spec for the A2UI Composer launch film. Derived from the shipped
  code-editorial preset (adopted via build-frame.mjs, which established the type ramp,
  the hairline-elevation doctrine, the code-surface component, and the "one voltage
  moment per frame" rule) and then inverted to a dark ground, because the brief is dark
  and all 13 shipped presets are paper-light. Atoms are sacred: a near-black void ground,
  a half-step surface ladder, 1px hairline elevation and NEVER a heavy shadow or glow on
  content, Inter for display and body, JetBrains Mono for every indexical and code voice,
  and exactly two working accents — stream blue for signal in flight, live mint for
  anything that has become real. The unit is the frame (1920×1080).
unit: the frame — 1920×1080
principle: atoms are sacred · composition is free · light is information, never decoration

colors:
  canvas: "#07080B"        # the void ground. The film's floor. Never lighter than this.
  surface: "#0D0F15"       # a panel body — one half-step up from the void
  surface-elev: "#141824"  # a panel header, title bar, tab strip — the second half-step
  surface-hi: "#1B2130"    # a hovered/active row, a selected tab. The top of the ladder.
  ink: "#EDF1F8"           # the voice. Primary type.
  ink-mute: "#A3ABBB"      # secondary type, panel labels, inactive tabs
  ink-faint: "#828A99"      # tertiary type, punctuation, line numbers, disabled chrome
  stream: "#5B8CFF"        # ACCENT 1 — signal in flight: JSON keys, the caret, the wire
  live: "#34E2C0"          # ACCENT 2 (the voltage) — anything that has become real
  gemini: "#A78BFA"        # RESERVED: the assistant panel only. Never used elsewhere.
  amber: "#E8B15A"         # numbers in code. Syntax only, never UI.

borders:
  hairline: "1px solid ink@10%"
  hairline-strong: "1px solid ink@18%"
  live-edge: "1px solid live@45%"
  stream-edge: "1px solid stream@40%"

shadows:
  none: "none"
  card: "0 1px 0 ink@6% inset, 0 24px 60px canvas@80%"
  bloom-stream: "0 0 0 1px stream@22%, 0 0 44px stream@14%"
  bloom-live: "0 0 0 1px live@26%, 0 0 52px live@16%"

typography:
  # — reading + chrome ramp —
  body:      { fontFamily: "Inter", cqw: 1.5, weight: 400, lineHeight: 1.5 }
  lead:      { fontFamily: "Inter", cqw: 2.08, weight: 400, lineHeight: 1.45 }
  card-title:{ fontFamily: "Inter", cqw: 2.3, weight: 600, lineHeight: 1.25, tracking: "-0.012em" }
  button:    { fontFamily: "Inter", cqw: 1.46, weight: 500, lineHeight: 1.0 }
  tag-upper: { fontFamily: "Inter", cqw: 1.35, weight: 600, tracking: "0.18em", upper: true }
  kicker:    { fontFamily: "JetBrains Mono", cqw: 1.15, weight: 500, tracking: "0.26em", upper: true }
  mono-label:{ fontFamily: "JetBrains Mono", cqw: 1.0, weight: 500, tracking: "0.06em", upper: true }
  panel-tab: { fontFamily: "JetBrains Mono", cqw: 0.92, weight: 500, tracking: "0.12em", upper: true }
  code:      { fontFamily: "JetBrains Mono", cqw: 1.02, weight: 400, lineHeight: 1.62 }
  code-lg:   { fontFamily: "JetBrains Mono", cqw: 1.35, weight: 400, lineHeight: 1.6 }
  # — display ramp (Inter, sentence case, tight negative tracking) —
  headline:      { fontFamily: "Inter", cqw: 4.6, weight: 600, lineHeight: 1.06, tracking: "-0.028em" }
  display:       { fontFamily: "Inter", cqw: 7.3, weight: 600, lineHeight: 1.0, tracking: "-0.036em" }
  display-cover: { fontFamily: "Inter", cqw: 9.4, weight: 700, lineHeight: 0.96, tracking: "-0.042em" }
  number-hero:   { fontFamily: "Inter", cqw: 9.4, weight: 700, lineHeight: 0.95, tracking: "-0.04em" }
  number-unit:   { fontFamily: "JetBrains Mono", cqw: 1.6, weight: 500, lineHeight: 1.0 }

spacing:
  slide-pad: "4.2cqw"   # ~80px @1920
  gap-lg: "2.6cqw"
  gap-md: "1.7cqw"
  gap-sm: "0.85cqw"
  hairline: "1px"
  radius-sm: "6px"
  radius-md: "10px"
  radius-lg: "14px"
  radius-pill: "9999px"

components:
  panel:
    backgroundColor: "{colors.surface}"
    border: "{borders.hairline}"
    rounded: "{spacing.radius-lg}"
    shadow: "{shadows.card}"
    header: "{colors.surface-elev} strip, {typography.panel-tab} label in {colors.ink-mute}, 1px ink@10% bottom rule"
    description: "The Composer workbench unit. Four of these compose the workbench. A panel is NEVER a floating card with a drop shadow — it is a hairline-bounded region of the same dark ground, one half-step brighter."
  code-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink} JetBrains Mono; keys {colors.stream} · strings {colors.live} · numbers {colors.amber} · punctuation {colors.ink-faint}"
    gutter: "{typography.code} line numbers in {colors.ink-faint}, right-aligned, 3.2cqw column"
    border: "{borders.hairline}"
    rounded: "{spacing.radius-md}"
    description: "The A2UI JSON editor. Syntax colour is SEMANTIC, not decorative: a key is stream blue because it is signal arriving; a string is live mint because it is the value that will become visible. Never colour a whole line."
  caret:
    look: "2px × 1.1em bar, {colors.stream}, {shadows.bloom-stream}"
    description: "The agent's presence on screen. It is the only element allowed to blink, and only at 1.6Hz on an even frame boundary. When it moves, everything else holds still."
  kicker-index:
    typography: "{typography.kicker}"
    mark: "a 6px {colors.live} square, 0.9cqw before the text, baseline-aligned"
    textColor: "{colors.ink-mute}"
    description: "The eyebrow — mono, uppercase, indexical, 2–5 words. Prefixed with the live square. Never a sentence, never sentence-case."
  live-chip:
    backgroundColor: "{colors.live}@10%"
    border: "{borders.live-edge}"
    textColor: "{colors.live}"
    rounded: "{spacing.radius-pill}"
    typography: "{typography.mono-label}"
    description: "The ONE voltage moment per frame — a state badge (LIVE · RENDERED · v1.0). Never two live chips in one frame, and never live mint on a large fill."
  renderer-badge:
    backgroundColor: "{colors.surface-elev}"
    border: "{borders.hairline}"
    textColor: "{colors.ink-mute}, active state {colors.ink} on {colors.surface-hi} with {borders.stream-edge}"
    rounded: "{spacing.radius-pill}"
    typography: "{typography.mono-label}"
    description: "Angular / Lit / React. Exactly one is active at a time; the active one carries the stream edge, the others recede to ink-mute."
  wire:
    look: "1px {colors.stream}@35% path, with a 6% travelling highlight of {colors.stream} at full opacity"
    description: "The connective tissue between agent and surface. A wire is drawn (stroke-dashoffset), never faded in. It always flows in the film's current — left to right."
  hairline-rule:
    rule: "1px solid ink@10%; a {colors.live} 1px rule may draw on to introduce a beat"
    description: "The only separator. Never 2px+, never a gradient divider."
  grid-field:
    look: "48px × 48px lattice of 1px ink@4% lines over {colors.canvas}, radially masked so it fades to nothing at the frame edge"
    description: "The permanent ground texture. Present in every frame at the same scale and opacity so cuts feel like camera moves across ONE space, not slide changes."
---

# Composer Dark — Frame (video / frame layer)

## Provenance (READ FIRST — the frontmatter is the source of truth)

Adopted from the **code-editorial** preset via `build-frame.mjs`, then deliberately
inverted to a dark ground. What survives from the preset is its *doctrine*: hairline
elevation instead of shadows, a scarce single voltage colour, a first-class code surface,
sentence-case display with tight negative tracking, and a mono voice for everything
indexical. What changed is the ground and therefore every colour value. The YAML
frontmatter above is normative — use its hex verbatim.

## Overview

The film happens in **one dark room**. Not a sequence of dark slides: one continuous,
unlit space with a faint 48px lattice on the floor, through which the camera moves. Every
frame inherits `canvas` and the `grid-field`, at identical scale and opacity, so a cut
reads as a move rather than a change of venue.

The thesis is three values and two colours:

- **Canvas is the void, surface is the room, ink is the voice.** The surface ladder
  (`canvas` → `surface` → `surface-elev` → `surface-hi`) moves in half-steps. A panel is
  never separated from the ground by a shadow — it is separated by one half-step and a
  1px hairline. If two adjacent regions need more contrast than a half-step, the layout
  is wrong, not the palette.
- **`stream` blue is signal in flight.** The caret, JSON keys, the wire, the active
  renderer's edge, anything mid-transmission.
- **`live` mint is the voltage** — the scarce, earned colour. It marks the moment
  something stops being a description and starts being real: a rendered component's first
  frame, the LIVE chip, the value strings that made it to the screen. **One live moment
  per frame.** Mint on a large fill is always wrong; mint is a 1px edge, a small chip, or
  type.
- **`gemini` violet is reserved** for the assistant panel and nothing else — it is the
  agent's colour, and it must never leak into the surfaces the agent produces. That
  separation is the entire point of the protocol; the palette should say so.

## Type

Three voices, each in one face. **Inter 600/700** carries every display moment — covers,
headlines, the end lockup — at large sizes with hard negative tracking (−0.028em to
−0.042em; the bigger the type, the tighter). **Inter 400/500** carries body and leads.
**JetBrains Mono** carries the entire indexical layer: kickers, panel tabs, state badges,
line numbers, and all code. Switching a voice's face collapses the register — a mono
headline or an Inter panel tab reads as a different product.

Display is **sentence case**. Uppercase belongs to mono chrome and tag-upper only. Never
letterspace the display ramp positively; never set body below 1.4cqw.

## Light discipline

This is a dark film, so glow is the easiest mistake and the most expensive one.

- **Content never glows.** Type, panels, rules and tables carry no shadow and no bloom.
- **Only two things may bloom**, and only at the instant they act: the `caret`
  (`bloom-stream`) and a component's *first frame of existence* (`bloom-live`, decaying to
  nothing within 0.4s). A permanent glow on anything is a bug.
- **No gradients on content.** The only gradient permitted anywhere is the radial mask
  that fades the `grid-field` toward the frame edge, and the vertical scrim under a panel
  header.
- Contrast floor: **every** step of the ink ladder clears **4.5:1** against every step of the
  surface ladder, including the worst pairing (`ink-faint` on `surface-hi` = 4.63:1). The muted
  steps were lifted from `#4A5364` / `#8A93A6` after the WCAG gate caught line numbers, JSON
  punctuation and the status strip sitting at 2.3–2.6:1 — recessive is a hierarchy decision, not a
  licence to be unreadable at the size people actually watch this. `ink-faint` still belongs to
  punctuation, line numbers and chrome; it is simply legible now.

## Frame scale (1920×1080)

- Outer padding `slide-pad` (~80px). Nothing but a full-bleed ground crosses it.
- The workbench composes on a **12-column** field with `gap-md` gutters. The canonical
  Composer layout is: assistant 3 cols · preview 5 cols · editor 4 cols, with the debug
  tab strip spanning the preview + editor columns beneath them.
- A single centred display statement uses at most **14 columns of measure** — roughly
  22 characters per line at `display`, never a full-width line of huge type.
- Panels are `radius-lg`; chips and badges are `radius-pill`; the code surface is
  `radius-md`. Nothing is square-cornered, nothing is more rounded than 14px.

## Do

- Let the grid-field persist across every cut at identical opacity.
- Colour JSON semantically (key = stream, string = live, number = amber).
- Earn the mint. One live moment per frame, and make it the thing the viewer should
  remember from that frame.
- Keep the assistant's violet inside the assistant panel.
- Set display type tight and sentence-case.

## Don't

- Don't put a drop shadow, glow, or gradient on content.
- Don't use two accents at equal weight in one frame — one leads, one supports.
- Don't let a panel float free of the hairline system.
- Don't brighten the ground to separate elements; move one half-step and add a hairline.
- Don't animate the grid-field. It is the floor; floors don't move.
