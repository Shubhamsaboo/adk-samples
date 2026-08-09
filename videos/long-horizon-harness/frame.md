---
version: alpha
name: Long Horizon — Frame (video / frame layer, dark build)
description: >
  Video-first design system for the Long Horizon launch film. Derived from the shipped
  `code-editorial` frame preset and INVERTED into a dark build: a near-black observatory ground,
  a light ink voice, and one luminous cyan as the scarce signal. Structure, typography ramp,
  component names and frame treatments are the preset's; every color value and the prose that
  explains it are rewritten for the dark register. Motion out of scope.
unit: the frame — 1920×1080 primary; 9:16 and 1:1 documented
principle: atoms are sacred · composition is free · numbers come from the script

colors:
  ink: "#E9EEF6"
  cream: "#06080C"
  tile: "#0E1219"
  tile-strong: "#161C26"
  coral: "#5CE1F2"
  amber: "#F0A25C"
  navy: "#080B10"
  navy-soft: "#0D1117"
  navy-elev: "#141A23"

borders: { hairline: "1px solid ink@10%", hairline-strong: "1px solid ink@18%", signal: "1px solid coral@45%" }
shadows: { card: "0 1px 2px #000@70%, 0 18px 48px #000@45%", none: "none" }
glows: { signal: "0 0 24px coral@22%", signal-strong: "0 0 44px coral@34%", text: "0 0 18px coral@30%" }

typography:
  # — reading + chrome ramp —
  body:    { fontFamily: "Inter", cqw: 1.5, weight: 400, lineHeight: 1.5 }
  lead:    { fontFamily: "Inter", cqw: 2.08, weight: 400, lineHeight: 1.5 }
  card-title:{ fontFamily: "Inter", cqw: 2.3, weight: 700, lineHeight: 1.25, tracking: "-0.012em" }
  button:  { fontFamily: "Inter", cqw: 1.46, weight: 700, lineHeight: 1.0 }
  tag-upper:{ fontFamily: "Inter", cqw: 1.35, weight: 700, tracking: "0.18em", upper: true }
  kicker:  { fontFamily: "JetBrains Mono", px: 28, cqw: 1.46, weight: 400, tracking: "0.16em", upper: true }
  mono-label:{ fontFamily: "JetBrains Mono", px: 26, cqw: 1.35, weight: 400, tracking: "0.02em" }
  code:    { fontFamily: "JetBrains Mono", cqw: 1.67, weight: 400, lineHeight: 1.6 }
  # — display ramp (Inter 700, sentence case, tight negative tracking) —
  headline:{ fontFamily: "Inter", cqw: 4.6, weight: 700, lineHeight: 1.06, tracking: "-0.026em" }
  quote-pull:{ fontFamily: "Inter", cqw: 5.0, weight: 400, lineHeight: 1.14, tracking: "-0.018em" }
  display-italic:{ fontFamily: "Inter", cqw: 6.7, weight: 700, lineHeight: 1.05, tracking: "-0.030em", italic: true }
  display:{ fontFamily: "Inter", cqw: 7.3, weight: 700, lineHeight: 1.02, tracking: "-0.032em" }
  number-hero:{ fontFamily: "Inter", cqw: 9.4, weight: 700, lineHeight: 0.95, tracking: "-0.038em" }
  display-cover:{ fontFamily: "Inter", cqw: 9.9, weight: 700, lineHeight: 0.98, tracking: "-0.040em" }
  number-unit:{ fontFamily: "JetBrains Mono", cqw: 2.08, weight: 400, lineHeight: 1.0 }

spacing:
  slide-pad: "4.2cqw"   # ~80px @1920
  gap-md: "1.7cqw"
  hairline: "1px"
  radius-sm: "6px"
  radius-md: "8px"
  radius-lg: "12px"
  radius-pill: "9999px"

components:
  card-hairline:
    backgroundColor: "{colors.tile} or {colors.tile-strong}"
    border: "1px solid {colors.ink}@10%"
    rounded: "{spacing.radius-lg}"
    shadow: "{shadows.card}"
    typography: "{typography.card-title} + {typography.body}"
    description: "The content card. Elevation is the hairline + a half-step LIGHTER surface — the dark equivalent of the preset's warm step. Never a colored fill, never a gradient across the whole card."
  kicker-spike:
    typography: "{typography.kicker}"
    mark: "✱ cyan spike prefix"
    description: "The eyebrow — JetBrains Mono uppercase, indexical (2–5 words), prefixed with the cyan ✱. Never plain text, never a sentence."
  coral-callout:
    backgroundColor: "{colors.coral} (full-bleed) or {colors.tile} with a cyan edge"
    textColor: "{colors.cream} on cyan"
    rounded: "{spacing.radius-md}"
    typography: "{typography.button}"
    description: "The ONE signal moment per frame — the CTA, the single inline link, OR the full-bleed band. Text on a cyan fill is the near-black ground, never white. Never two cyan moments in one frame."
  number-lockup:
    typography: "{typography.number-hero} figure + {typography.number-unit} unit"
    description: "Hero stat — an Inter 700 figure paired with a JetBrains Mono unit. The figure is Inter; the unit is ALWAYS mono, never Inter."
  pull-quote:
    typography: "{typography.quote-pull} + {typography.tag-upper} cite"
    description: "A line from the docs or the thesis of a beat. Inter 400 at display size, with a small tracked-uppercase cite beneath."
  section-rule:
    rule: "1px solid {colors.ink}@10%"
    description: "The only separator. A cyan 1px rule may draw on to introduce a section. Never 2px+, never a heavy divider."
  code-surface:
    backgroundColor: "{colors.navy} body / {colors.navy-elev} title bar + status strip"
    textColor: "{colors.ink} (JetBrains Mono); syntax in cyan (keywords) / teal #5DB8A6 (strings) / amber #E8A55A (numbers)"
    border: "1px solid {colors.ink}@12%"
    rounded: "{spacing.radius-md}"
    description: "The terminal / code surface. It sits a half-step DARKER than the ground so it reads as a cut-out window, framed by the hairline. This preset owns the surface, title bar, status strip and mono chrome — the code itself comes from the code-* registry blocks."
  screen-frame:
    backgroundColor: "{colors.navy-elev} chrome over the media"
    border: "1px solid {colors.ink}@14%"
    rounded: "{spacing.radius-lg}"
    shadow: "{shadows.card}"
    description: "The device/browser frame that real product footage (horizon-demo.gif) must sit inside — a 3-dot chrome strip in navy-elev, the media clipped to the radius beneath. Real UI is never full-bleed and never floats unframed on the ground."
  spike-mark:
    glyph: "✱ (U+2731), always {colors.coral}"
    description: "The brand mark. Fades + scales 0.92→1 on a single emphasis beat; never spins."
---

# Long Horizon — Frame (video / frame layer, dark build)

## Brand adaptation (READ FIRST — the frontmatter is the source of truth)

This is the **code-editorial** preset **inverted into a dark build** for the Long Horizon launch
film. The YAML frontmatter above (colors · typography · components) is **normative and already
correct — use it verbatim.** Three things changed from the shipped preset, all deliberate:

- **The ground and the voice are swapped.** `{colors.cream}` keeps its key name but is now the
  **near-black ground** (`#06080C`); `{colors.ink}` is now the **light voice** (`#E9EEF6`). Read
  every "cream" in any inherited prose as "the dark ground". There is no cream paper in this build.
- **`{colors.coral}` is a luminous cyan** (`#5CE1F2`) — the color of the agent graph glowing on the
  table in the project's own banner art. It is still "the voltage": scarce, one moment per frame.
  `{colors.amber}` (`#F0A25C`, the banner's sunset) is the second, rarer warmth — see § Colors.
- **Fonts** — display and body are **Inter** (weight 700 display / 400 body), index and code are
  **JetBrains Mono**. Both ship as local WOFF2 in `assets/fonts/` (see § Font loading). There is no
  serif in this build; ignore any "serif" wording lingering in inherited prose.

## Overview

Long Horizon at frame scale is an **observatory at night**. The thesis is three values:
**the dark ground is the sky, ink is the voice, cyan is the signal** — and a fourth (`navy`) only
where a machine shows itself: a terminal, a code panel, a captured screen.

Every surface is **near-black with a blue cast** (`#06080C` — never pure black, never warm, never
gray). Content gathers on a **tile** surface a half-step *lighter*; the demarcation is a half-step,
never a hard contrast. Elevation is a **1px light hairline at low alpha** plus, on real panels, one
deep black shadow. Unlike the light preset this system **does have light to emit** — a disciplined
cyan glow is allowed on the signal element and nowhere else.

Two typographic voices: **Inter** carries every display moment — covers, headlines, big stat
numerals — at weight **700** with tight negative tracking (−0.026 to −0.040em), sentence case;
and body/lead/chrome at weight 400. **JetBrains Mono** carries the indexical layer — kickers,
technical labels, file paths, the code window, status strips. Switching a voice's face collapses
the register: a mono headline or an Inter file path reads as a different product.

**Key characteristics at frame scale:**

- **Ground / ink / cyan trinity** + a darker navy machine surface; the ground is the default,
  ink the voice, cyan the scarce signal.
- **Inter 700** (sentence case, tightly negative-tracked) for all display; **Inter 400** body;
  **JetBrains Mono** index + code.
- **Hairline elevation** — a 1px ink@10% border and a half-step lighter surface. One deep black
  shadow on floating panels only.
- **Cyan is rationed** — at most ONE cyan moment per frame (the signal: a CTA, a highlighted term,
  a drawn rule, OR a glowing node). Cyan never sets a headline or a body run.
- **Glow is earned, never ambient** — only the one signal element may carry `{glows.signal}`.
  A frame where everything glows reads as a screensaver, not a product.
- **Density is free** — a frame may stand on a single focal or carry a dense, layered composition.
- **The ✱ cyan spike** opens kickers; navy is reserved for terminal / code / captured-screen surfaces.

## The Frame

### Frame Craft Bar

Eyeball tests gate every frame before any structural check:

- **Squint** — one Inter display moment dominates at 3–6× its neighbor.
- **Trinity** — dark ground, ink text, cyan exactly **once**; navy only on a machine surface; no
  pure black, no pure white, no warm gray, no fifth hue.
- **Type** — Inter 700 sentence-case display (tightly tracked); Inter 400 body; JetBrains Mono
  kickers (uppercase 0.16em, cyan ✱) + code.
- **Light** — exactly one glowing thing. If two things glow, one of them is decoration; kill it.

- **Primary:** 1920×1080 (16:9). Display authored in **`cqw`** (`px ÷ 1920 × 100 = cqw`).
- **Vertical:** 1080×1920 (9:16). **Square:** 1080×1080 (1:1).
- **Safe area:** `slide-pad` ~4.2cqw; the kicker/mono chrome sit inside it.

**The container law (load-bearing).** Every frame ground sets `container-type: size`; ALL
frame-relative units are `cqw`/`cqh` against it — never `vw`. Hairlines stay 1px; card radii stay
6/8/12px; the near-black reading must survive every ratio.

**The ground is a clip, not the root.** A frame's full-bleed ground rides on its own
full-duration `class="clip"` layer. A `background` set on the `#root` / `data-composition-id`
element is clip-gated to the frame's window and is not a dependable ground.

## Colors

Default ground `{colors.cream}` (`#06080C`); content gathers on `{colors.tile}` (`#0E1219`) and
`{colors.tile-strong}` (`#161C26`) — half-step *lighter* steps, never a hard contrast.

- **Headlines & body:** `{colors.ink}` (`#E9EEF6`). Secondary copy is `{colors.ink}` at 62–78%;
  mono chrome (kickers, labels, paths, status strips) sits at **52–72%** — never below 52% for
  text, because on this ground anything dimmer falls under 4.5:1 and `hyperframes check` fails it.
  Alphas under 20% are for hairlines, borders and dots only, never for type. Never a separate
  gray hex.
- **Cyan** (`{colors.coral}`, `#5CE1F2`) is the scarce signal — one moment per frame: the CTA,
  one highlighted term, one drawn rule, one live node, or a full-bleed band. Never body text,
  never a card fill behind reading copy.
- **Amber** (`{colors.amber}`, `#F0A25C`) is the horizon — the banner's sunset. Use it at most
  once in the whole film as a *counter*-light (a warm edge, a second series in a chart, the
  horizon line itself). It is not a co-equal accent and never appears in the same frame as a
  cyan signal unless the frame's whole subject is the two of them together.
- **Navy** (`{colors.navy}` / `navy-soft` / `navy-elev`) is the machine surface — terminal, code
  panel, browser chrome around captured footage. A structural anchor, not a fifth hue.
- **No pure black (`#000`), no pure white (`#FFF`), no warm gray.**

**Fixed decoration colors (NOT remixable brand hues).** Inside a code or terminal surface:
keywords cyan, strings **teal `#5DB8A6`**, numbers **amber `#E8A55A`**, comments ink@40%; status
reads success `#5DB872` / warn `#C64545`. The Horizon web UI's own indigo **`#6366F1`** may appear
only *inside* captured product footage — never as a design accent of ours.

## Typography

Two ramps. The **reading/chrome ramp** (Inter `body` 1.5cqw / `lead` 2.08cqw at weight 400;
JetBrains Mono `kicker`/`mono-label` in px) carries copy + chrome; the **display ramp**
(Inter `headline` 4.6cqw → `display-cover` 9.9cqw, weight 700, tightly negative-tracked) carries
every headline + stat.

- **Legibility floor:** any load-bearing line ≥ **1.4cqw**; mono px labels are chrome only.
- **Fit-to-measure:** size the headline to its length. Cap the block at **≤ 78cqw**; ≤3 words →
  `display-cover`; 4–6 → `display`; 7+ → `headline`. Reserve the 7.3–9.9cqw tier for cover /
  statement / stat.
- **Inter display is sentence case** (NOT title case, NOT uppercase), weight 700, tracking
  −0.026…−0.040em — the tracking tightens as the size grows. **Inter body** sentence case
  weight 400. **JetBrains Mono** kickers UPPERCASE 0.16em with the cyan ✱.
- **On a dark ground, weight reads heavier.** Never set body copy above 400, and never set a long
  reading line in pure white — `{colors.ink}` at 88–100% for display, 62–78% for supporting copy.

## Depth & Surface

- **1px hairline** ink@10% border is the primary lift (ink@18% when a panel must separate hard).
- **Half-step surface** — a `{colors.tile}` block on the ground reads elevated by the lighter step,
  not by a cast shadow.
- **One deep shadow** (`{shadows.card}`) on genuinely floating panels — the screen frame, a card
  that must sit above a glow. Black, never colored.
- **Glow** (`{glows.signal}`) on the single signal element only. `{glows.text}` may sit on ONE
  cyan word or figure per frame.

**Ceiling:** no gradient across a content card, no tilt, no double glow, no colored shadow. A soft
radial vignette or a single wide radial "light source" in the ground layer is allowed and
encouraged — it is the sky, not decoration on content.

## Shapes

**6px** small chrome, **8px** cards / code surface, **12px** large cards / screen frames, **9999px**
true pills only. No square corners, no heavy rounding.

## Components

- **card-hairline** — the content card (hairline + half-step lighter surface).
- **section-rule** — the only separator (1px; a cyan rule may draw on).
- **kicker-spike** — the ✱ cyan eyebrow. **coral-callout** — the one signal moment.
- **number-lockup** — Inter figure + mono unit. **pull-quote** — Inter 400 at display size + cite.
- **code-surface** — the terminal / code surface; the code itself comes from the `code-*` blocks.
- **screen-frame** — the browser/device frame that real captured footage must sit inside.
- **spike-mark** — the ✱ brand glyph, always cyan.

## Frame Treatments

> Recipe: ground · container · composes · focal · chrome · accent · Fixed/Free · density.
> One cyan moment per frame; open with a kicker-spike.

### 1 · Cover (identity · move: oversized Inter · dark ground + one light source)

**Ground** `{colors.cream}` with a single wide radial light low in the frame, `slide-pad`.
**Composes** kicker-spike, display-cover, lead, mono-label index. **Focal** a 2–3 line Inter
`display-cover` (sentence case, ink) under a cyan ✱ kicker. **Chrome** mono index strip
(repo · path). **Accent** the single cyan ✱ (or one cyan word in the title). **Fixed** Inter 700
sentence case, hairline, near-black ground. **Free** title, the mono index, layout + how full the
frame runs. **Density** free.

### 2 · Statement (statement · move: single Inter line · ground)

**Ground** `{colors.cream}`. **Composes** kicker-spike, display, optional lead. **Focal** one
1–2 line Inter `display` carrying the claim in a sentence. **Chrome** mono kicker. **Accent** none,
or exactly one cyan word. **Fixed** sentence-case Inter 700. **Free** the line, layout + density.
**Density** sparse.

### 3 · Code Surface (code · move: terminal window · the quickstart-critical frame)

**Ground** `{colors.cream}` framing a `{colors.navy}` **code-surface** (8px, ink@12% hairline,
`navy-elev` title bar + path in mono). **Composes** mono-label path, the **`code-*` block**
(code-typing / code-snippet-*), optional `section-rule`. **Focal** the panel — the typed-on
commands. **Chrome** mono path + status strip. **Accent** syntax cyan/teal/amber inside the panel;
at most one cyan marker outside. **Fixed** navy surface, mono code, hairline. **Free** which code-*
block, the commands (from the script), panel size. **Density** dense.

### 4 · Number / Impact (data · move: oversized figure · ground)

**Ground** `{colors.cream}`, `slide-pad`. **Composes** kicker-spike, number-lockup, lead/caption,
optional `section-rule`. **Focal** an Inter `number-hero` figure with a mono unit over a 1px rule.
**Chrome** mono tag. **Accent** the figure in ink; at most one cyan unit or one cyan rule.
**Fixed** Inter figure + mono unit, hairline rule. **Free** the figures (from the script), tag,
layout. **Density** free.

### 5 · System / Diagram (architecture · move: nodes + edges on the dark sky)

**Ground** `{colors.cream}`. **Composes** kicker-spike, labeled nodes as `card-hairline` chips or
1px-ringed dots, 1px ink@18% edges. **Focal** the graph — the harness's parts and what connects
them. **Chrome** mono labels on every node. **Accent** exactly one **live** node or one edge drawn
in cyan with `{glows.signal}`; everything else is ink hairline. **Fixed** 1px edges, mono labels,
one live element. **Free** the topology, node shapes, layout. **Density** free — this is the one
treatment allowed to run dense and technical.

### 6 · Real Screen (proof · move: captured UI inside a screen-frame)

**Ground** `{colors.cream}`. **Composes** `screen-frame` holding `assets/horizon-demo.gif`,
mono caption, optional 1–2 pull callouts on `card-hairline` chips connected by a 1px cyan leader.
**Focal** the real UI. **Chrome** mono caption naming what is on screen. **Accent** the one cyan
leader/ring marking the thing being pointed at. **Fixed** the footage is never full-bleed, never
recolored, never cropped past its own chrome; the frame's hairline + shadow stay. **Free** scale,
position, which moment is called out. **Density** medium.

### 7 · Closing / CTA (closer · move: cyan signal · ground)

**Ground** `{colors.cream}` (a low radial light returning). **Composes** display sign-off,
`coral-callout`, mono index line (repo path / command). **Focal** a short Inter sign-off with the
one **coral-callout**. **Chrome** mono index. **Accent** the single cyan voltage. **Fixed** one
cyan moment, sentence-case Inter. **Free** sign-off, layout. **Density** sparse.

## Composition Rules

### Do

- Stand every frame on the **near-black ground**; gather content on a **half-step lighter tile**.
- Set all display in **Inter 700, sentence case**, tightly negative-tracked; **Inter 400** body;
  **JetBrains Mono** kickers (uppercase, 0.16em, cyan ✱) + code.
- Ration **cyan to one moment per frame**; let exactly one thing glow.
- Elevate with a **1px ink@10% hairline** + a lighter surface step; reserve **navy** for machine
  surfaces (terminal, code, captured screen).
- Lead with **one clear focal**; open regions with a **kicker-spike**.
- Pair an Inter figure with a **mono unit** for every stat; render code via the **`code-*` blocks**
  on the navy surface.
- Put real product footage inside the **screen-frame**, always.

### Don't

- No pure black, no pure white, no warm gray; no fifth hue (navy is structural, syntax colors and
  the captured UI's indigo are decoration).
- No gradient across a content card, no tilt, no colored shadow, no second glow.
- No uppercase or title-case Inter display; no mono headline; no Inter file path; no Inter-set
  numeric unit.
- No two cyan moments in one frame; cyan never sets a headline or a body run.
- Don't blow a headline past the measure — step the ramp down.
- Don't recolor, invert, or heavily grade the captured Horizon UI — it is evidence.

## Aspect-Ratio Behavior

| Treatment      | 16:9                       | 9:16                         | 1:1                    |
| -------------- | -------------------------- | ---------------------------- | ---------------------- |
| Cover          | display left, index top    | display top, index below     | display, index corner  |
| Statement      | line left/centered         | line stacked                 | centered               |
| Code Surface   | panel framed on ground     | panel taller, fewer lines    | panel centered, square |
| Number/Impact  | figure left                | figure centered, taller      | centered               |
| System/Diagram | graph wide, labels beside  | graph vertical, labels below | graph centered         |
| Real Screen    | frame right, callouts left | frame top, callouts below    | frame centered         |
| Closing/CTA    | sign-off + callout         | sign-off top, callout below  | centered               |

`slide-pad` holds on the short edge; re-step display above the 1.4cqw floor. The code surface and
the screen frame keep their hairline + mono chrome on every ratio.

## Approved Real Entities

The subject is **Long Horizon** (also "Horizon"), the reference agent harness in
`google/adk-samples` at `core/python/long-horizon-harness`. It is **sample code, not an officially
supported Google product** — never render a Google lock-up, never imply GA. Named real
technologies that may appear as mono labels because the sample's own README names them: ADK 2.5.x,
Gemini 3.6 Flash, Memory Bank, Agent Platform Sessions, Sandboxes, Cloud Run, Cloud SQL, Cloud
Scheduler, Secret Manager, BigQuery, Vite 8, React 18, A2A, Terraform. Render them as type — no
vendor logos. The only image assets are the project's own `long-horizon-banner.webp` and
`horizon-demo.gif`.

## Numerals & Claims (hard rule)

Never invent figures, stats, or counts at frame scale. Every numeral must trace to the sample's
README: `ADK 2.5.x`, `Gemini 3.6 Flash`, `min_instance_count = 1`, `3` deploy steps, `1` command.
Render any unsupported slot as `— figure —`, never a plausible-looking number.

## Pre-Render Self-Audit

- **Squint** — one Inter display moment dominates.
- **Trinity** — near-black ground + lighter tile step + ink voice; cyan appears exactly once; navy
  only on a machine surface; no pure black / pure white / fifth hue.
- **Type** — Inter 700 sentence-case display (tightly tracked); Inter 400 body; JetBrains Mono
  kickers (uppercase 0.16em, cyan ✱) + code; ≥1.4cqw floor; every text colour ≥ 4.5:1 on its
  own surface (mono chrome ≥ 52% ink).
- **Depth** — 1px hairline + half-step surface; at most one deep black shadow; exactly one glow;
  6/8/12px radii.
- **Light** — the frame has one light source in the ground and one glowing element. Not two.
- **Code** — code rendered by a `code-*` block on the navy surface; figures paired with a mono unit.
- **Footage** — captured UI is inside a `screen-frame`, un-recolored.
- **Fabrication** — every numeral traces to the README, else placeholder.

## Known Gaps

- **Motion intentionally out of scope.** frame.md specifies composition only. This build's motion
  register — short cross-dissolves and hard cuts on the beat, no bounce/elastic, cyan as the only
  "draw-on", numbers count up, code types on line by line, one slow continuous push per frame —
  lives in the workflow's `motion-language.md` + `hyperframes-animation`, not here.
- **Inter + JetBrains Mono ship as licensed local WOFF2 assets** in `assets/fonts/` (weights 400
  and 700 for each). Author display at **700**, body at **400**; italic is the browser-synthesized
  slant and is used at most once. If Inter ever fails, fall to `system-ui`/Helvetica — never to a
  serif. CJK: Noto Sans SC (display + body) / Noto Sans Mono CJK (code).
- **Syntax colors (teal `#5DB8A6` / amber `#E8A55A` / status) and the captured UI's indigo
  `#6366F1` are fixed decoration** — they are NOT brand accents and never leave their surface.
- **The code itself is the `code-*` registry blocks**, not this spec — this owns only the
  surrounding navy surface + mono chrome.
- **9:16 / 1:1 are guidance**; verify the legibility floor and the one-cyan discipline per ratio.

## Font loading (auto-generated)

The brand fonts ship as local files in `assets/fonts/` — do NOT link Google Fonts. Paste this
`<style>` into every frame's `<head>`/`<template>` (captions use the same files) so `font-family`
resolves in preview, snapshot, and render alike:

```html
<style>
@font-face{font-family:"Inter";font-weight:400;font-style:normal;font-display:block;src:url("assets/fonts/Inter-Regular.woff2") format("woff2");}
@font-face{font-family:"Inter";font-weight:700;font-style:normal;font-display:block;src:url("assets/fonts/Inter-Bold.woff2") format("woff2");}
@font-face{font-family:"JetBrains Mono";font-weight:400;font-style:normal;font-display:block;src:url("assets/fonts/JetBrainsMono-Regular.woff2") format("woff2");}
@font-face{font-family:"JetBrains Mono";font-weight:700;font-style:normal;font-display:block;src:url("assets/fonts/JetBrainsMono-Bold.woff2") format("woff2");}
</style>
```
