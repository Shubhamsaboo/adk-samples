# Frame packet: 05-one-payload-every-renderer

## Project inputs

- Project: /home/user/adk-samples/videos/a2ui-composer-launch
- Design tokens: /home/user/adk-samples/videos/a2ui-composer-launch/frame.md
- RULES_DIR: /home/user/adk-samples/.agents/skills/hyperframes-animation/rules

## Assigned storyboard block

## Frame 5 — One payload. Every renderer.

- scene: the JSON stays pinned and unmoving while the rendered surface cycles Angular → Lit → React
- duration: 10s
- transition_in: push-slide LEFT
- src: compositions/frames/05-one-payload-every-renderer.html
- status: outline
- type: benefit_highlight
- persuasion: Negative contrast
- beat: skepticism → trust
- blueprint: fixed-anchor-cycle (Adapt)
- focal: authored — the pinned A2UI payload
- roles: payload = the immovable anchor · rendered surface = the cycling region · renderer badges = the state readout
- asset_candidates:
- cue: 0.0 payload pins left, badges enter right · 2.0 ANGULAR active · 4.0 LIT active · 6.0 REACT active · 7.6 "Same payload. Native widgets." · 8.8 "Nothing executes." hold
- sfx: whoosh-short, click, click
- handoff_in: the workbench — the outgoing frame slides off left as this one pushes in from the right; the payload column arrives already at its final x 26%, y 50%, scale 1.0, opacity 1 and **never moves again inside this frame**.
- handoff_out: the payload column — x 26%, y 50%, scale 1.0, opacity 1, stationary; the closing line sits at y 74%.

narrativeRole: Answer the skeptic's question — "so it only works in your renderer?" — and land the
security claim in the same breath.
keyMessage: One declarative payload renders as native widgets anywhere, and no code crosses the
boundary.

Adapt: keep fixed-anchor-cycle's signature — one element PINNED, entering once and never moving,
while the adjacent region cycles through discrete states, the anchor's stillness carrying the claim.
Changed: the cycling region is a rendered widget rather than a text slot, and the cycle resolves into
a two-line verdict instead of a lockup, because the lockup is Frame 6's job.

Scene 1 (0.0–2.0s): the payload column pins at 26% width — the same JSON, same syntax colours, now
`code` ramp and visibly **static**. To its right the three `renderer-badge` pills enter as one group.
Split 35/65, 3 depth layers. Nothing else.
Scene 2 (2.0–4.0s): ANGULAR takes the active state (`surface-hi` + `stream-edge`) and the widget
renders in an Angular-flavoured skin — squarer corners, its own control styling. The widget arrives
via a short `scale-swap-transition`, never a fade-in from nothing.
Scene 3 (4.0–6.0s): **hard cut on the beat** to LIT — the badge's active state slides across
(`cut-the-curve`, matched direction and velocity, `cut-catalog.md`) and the widget swaps skins in
place: rounder, lighter chrome. The payload does not so much as shift a pixel. That non-movement is
the argument.
Scene 4 (6.0–7.6s): same cut to REACT, a third distinct skin. Three renders, one payload, zero edits.
Scene 5 (7.6–10.0s): all three badges settle lit at equal weight and the verdict lands in two beats
beneath — "Same payload. Native widgets." then, on its own cue, "Nothing executes." — the second line
carrying the frame's single `live` voltage. Held read; still.

## Selected motion rule: scale-swap-transition

---
name: scale-swap-transition
description: Coordinated shrink-out + spring pop-in morph-like transition between two elements — no SVG path interpolation needed.
metadata:
  tags: transition, morph, scale, swap, spring, pop
---

# Scale-Swap Transition

Simulates a "morph" between two DOM elements by overlapping exit and entrance scale animations. Lighter weight than [card-morph-anchor.md](card-morph-anchor.md) (which morphs container dimensions — use that for SHAPE changes; this rule is for SAME-shape state swaps) and easier than SVG path interpolation.

At a single trigger, two coordinated tweens fire:

1. **Outgoing**: scale `1.0 → EXIT_SCALE` + opacity `1 → 0`, fast `power2.in` (rushing away).
2. **Incoming**: scale `EXIT_SCALE → 1.0` + opacity `0 → 1`, `back.out(BOUNCE_FACTOR)` (arriving with weight).

A small `OVERLAP` window during which both are mid-tween creates the morph illusion; the incoming sits on top via z-index so the outgoing's fade-tail doesn't bleed through.

## Recipe

```html
<!-- Both cards position: absolute; inset: 0 in one fixed-size wrapper — same
     footprint, same transform-origin: 50% 50%. Incoming starts opacity: 0,
     transform: scale(EXIT_SCALE), z-index above the outgoing. -->
<div class="swap-wrap">
  <div class="card outgoing" id="outgoing">{outgoingIcon} {outgoingLabel}</div>
  <div class="card incoming" id="incoming">
    {incomingIcon} {incomingLabel}
    <div class="sub" id="sub">{incomingSubline}</div>
  </div>
</div>
```

```js
// Outgoing: shrink + fade fast
tl.to(
  "#outgoing",
  { scale: EXIT_SCALE, opacity: 0, duration: EXIT_DUR, ease: "power2.in" },
  TRIGGER,
);

// Incoming: pops in with overshoot, starting OVERLAP before the exit finishes
tl.to(
  "#incoming",
  { scale: 1.0, opacity: 1, duration: ENTER_DUR, ease: `back.out(${BOUNCE_FACTOR})` },
  TRIGGER + EXIT_DUR - OVERLAP,
);

// Inner content reveals AFTER the incoming settles
tl.fromTo(
  "#sub",
  { opacity: 0, y: SUB_REVEAL_Y_PX },
  { opacity: 1, y: 0, duration: SUB_REVEAL_DUR, ease: "power3.out" },
  TRIGGER + EXIT_DUR + SUB_REVEAL_DELAY,
);
```

## Variations

- **Delayed inner content reveal** — the classic pattern above: morph the container, then reveal inner text once it settles; the 0.2–0.4 s gap lets the eye land on the new shape before reading.
- **Triple swap (3-state cycle)** — chain A→B→C with triggers `TRIGGER_AB` / `TRIGGER_BC`; each transition is its own tween pair, the previous incoming becoming the next outgoing. State-evolution narratives (early → mid → final labels).
- **Color-shift transition (no scale)** — for a flat morph between same-shape states, drop the scale and keep opacity + a brief background hue tween; less dramatic, more product-UI tone.

## Values

| token            | range                                 | notes                                                                                                  |
| ---------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| TRIGGER          | ≥ outgoing settled + a presence-dwell | the outgoing must "land" before transforming                                                           |
| EXIT_DUR         | 0.3–0.5 s                             |                                                                                                        |
| ENTER_DUR        | 0.45–0.7 s                            | longer than `EXIT_DUR` so the overshoot can settle                                                     |
| OVERLAP          | 0.1–0.2 s                             | >0.3 s both are clearly visible together (no morph); <0.05 s leaves a visible empty gap                |
| EXIT_SCALE       | 0.6–0.8                               | smaller exits feel dramatic but risk reading as "vanish" instead of "morph"                            |
| BOUNCE_FACTOR    | 1.4 soft · 1.8 firm · 2.2 cartoony    |                                                                                                        |
| SUB_REVEAL_DELAY | 0.2–0.4 s                             | reveals during the morph compete with the swap for attention                                           |
| BRAND_REVEAL_AT  | < TRIGGER                             | context (brand, eyebrow) sets the stage early; revealed AT the swap it competes with the headline beat |

## Critical Constraints

- **Incoming z-index ABOVE outgoing** — otherwise the outgoing's fade-tail (opacity 0.3–0.5) bleeds through and double-exposes the frame.
- **Both elements share `transform-origin: 50% 50%`** — different origins make the morph read as one thing teleporting elsewhere.
- **Bouncy ease ONLY on the incoming** — outgoing `power2.in`, incoming `back.out`; reversed, the swap feels mechanical.
- **Both cards `position: absolute; inset: 0`** in the same fixed-size wrapper (sized to fit both states; the wrap never resizes).
- **Don't `display: none` the outgoing** after the fade — leave it at `opacity: 0` so layout doesn't reflow.
- **Inner content reveals after the container settles**; **climax dwell ≥ 1 s** after the final state + subline land.

## See also

`press-release-spring` (a button press TRIGGERS the swap — cause and effect) · `card-morph-anchor` (shape-changing alternative) · `reactive-displacement` (when the replacement should read as a causal collision) · `sine-wave-loop` (idle breathing on the final state).
