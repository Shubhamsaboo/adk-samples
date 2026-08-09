---
format: 1920x1080
duration: 60s
message: "Describe the interface. Watch the agent stream it into existence."
arc: Hook (text isn't an interface) → Value claim → Mechanism (prompt → streaming UI) → Scope (the workbench) → Proof (one payload, every renderer) → CTA
audience: Developers and product engineers building agent-driven apps
mode: autonomous
music: dark minimal electronic underscore — 120 BPM, sub-bass pulse, tense arpeggio, one riser into the close
captions: skipped (no narration — kinetic typography carries the message)
---

## Video direction

The invariants every frame inherits. Per-frame Scene lines carry only the delta — never restate these.

**One room, one camera.** The film happens in a single unlit space. `canvas` (#07080B) plus the
`grid-field` (48px lattice, ink@4%, radially masked to nothing at the edges) is present in **every**
frame at identical scale and opacity, so each cut reads as a camera move through one continuous
space rather than a change of venue. The grid never animates — it is the floor.

**Palette system** — from `frame.md`, by role, never invented:

- `canvas` is the ground; the surface ladder (`surface` → `surface-elev` → `surface-hi`) moves in
  half-steps and a panel is separated from the ground by one half-step plus a 1px hairline, never
  by a shadow.
- `stream` blue = **signal in flight** — the caret, JSON keys, the wire, the active renderer edge.
- `live` mint = **the voltage**, one moment per frame — the instant a description becomes real.
- `gemini` violet is **quarantined to the assistant panel**. It is the agent's colour and it must
  never appear on a surface the agent produced; that separation is the protocol's whole thesis.
- `amber` is syntax-only (numbers in JSON). Never UI.

**Reveal model — beat-paced, not VO-paced.** There is no narration, so the substitute cue rail is
the **music grid**: 120 BPM → a beat every 0.5s, a bar every 2.0s. Every frame boundary falls on a
bar line (cuts at 0 / 8 / 16 / 30 / 40 / 50 / 60s). Each frame carries a `cue:` field listing its
on-screen beats with times; **treat each cue exactly as `visual-design.md` treats a spoken line** —
at t=0 only the first cue's content is on screen, and every further element reveals on its own cue,
spread across the shot and especially the back ~50%. Front-loading the canvas then freezing is the
one unforgivable failure here.

**Motion grammar.** Long-tail decel; `power3` is the default and smooth always beats bouncy — no
`back.out` / `bounce.out` / `elastic.out` anywhere in this film. Entrances are `fromTo` so a seek to
t=0 lands correctly. No `repeat`/`yoyo`, no `Math.random`, no `Date.now`, no CSS `transition` or
`@keyframes` for motion — every move lives on the frame's paused GSAP timeline. No mid-frame exits:
the injected `transition_in` is each frame's exit.

**Rhythm / held-frame allocation.** Frames 02 and 06 are the **held beats** — content resolves and
then reads still, which is what makes the streaming density of 03 and 04 land. Frame 03 is the
busiest frame in the film and is allowed to be. Every frame ends on a held read; the only sanctioned
aliveness during a hold is the caret blink (1.6 Hz, on an even frame boundary) and, at most, a
low-amplitude jitter on one held hero.

**Light discipline.** Content never glows. Exactly two things may bloom, and only at the instant they
act: the caret (`bloom-stream`) and a component's **first frame of existence** (`bloom-live`, decayed
to nothing inside 0.4s). A permanent glow is a bug. No gradients on content — the only gradients in
the film are the grid's radial edge mask and the vertical scrim under a panel header.

**Layout floor.** Content is planned into the **top ~83%** of the canvas (y ≤ ~890) for bottom-edge
consistency even though captions are disabled; the bottom band carries only a thin mono status
strip, which is chrome, not content.

**Negative list — never appears:** browser chrome, address bars, real OS cursors, scrollbars,
favicons, stock imagery, floating bokeh or purple-blue "AI" gradients, drop shadows on content,
permanent glows, decorative shapes standing in for real assets, and both motion failure modes —
**slideshow** (everything dumped in the first 25%, then frozen) and **screensaver** (many elements
drifting independently). Lazy breathing and back-half camera drift are banned outright.

---

## Frame 1 — Text can't be tapped

- scene: an agent's plain-text reply types into the void, then greys out under one mono verdict
- duration: 8s
- transition_in: cut
- src: compositions/frames/01-text-cant-be-tapped.html
- status: outline
- type: hook
- persuasion: Pain agitation
- beat: friction → recognition
- blueprint: typewriter-reveal (Adapt)
- focal: authored — the typed agent reply
- roles: (no captured assets — typography-only beat)
- asset_candidates:
- cue: 0.0 "Flight AA 2417 is delayed 40 minutes." (types) · 2.6 "You can rebook, change seats, or add a bag." (types) · 5.0 "Text can't be tapped." (lands) · 6.4 hold
- sfx: typing, key-press
- handoff_out: caret — x 50% (frame centre), y 62% of canvas, scale 1.0, opacity 1, blinking, stationary; it is the ONE element that survives the cut into Frame 2.

narrativeRole: Open on the everyday failure the protocol exists to fix, in the viewer's own language —
an agent that can answer you but can't hand you anything to use.
keyMessage: An answer is not an interface.

Adapt: keep typewriter-reveal's signature — a live caret typing a line as a human would, then the
line collapsing into a payoff. Changed: the payoff is not a brand pop but a verdict line, because the
brand belongs to Frame 2; and the collapse is a **desaturation**, not a clear, so the dead text stays
visible under the verdict as the evidence for it.

Scene 1 (0.0–2.6s): void + grid-field only. A single `stream` caret sits centre-left at ~38% width,
62% height, and the agent's first reply **types on with the caret** (`discrete-text-sequence` +
`context-sensitive-cursor`) in body ink — one line, ~34 characters of measure. Nothing else exists.
Centred single-column, ~46% of frame, 2 depth layers (grid behind, type in front).
Scene 2 (2.6–5.0s): the caret continues to a second line on its cue — same type-on, same rail. The
two lines now read as a plausible agent reply and nothing more. No camera move.
Scene 3 (5.0–6.4s): on the cue, both lines **desaturate to `ink-faint` in one 0.4s pass** while a
mono `kicker-index` verdict lands directly beneath them via **per-word staggered reveal**
(`dynamic-content-sequencing`), the word "tapped" carrying a single `asr-keyword-glow` hit in `live`
— the frame's one voltage moment. Hierarchy by contrast + weight; the dead reply drops to background,
the verdict owns the frame.
Scene 4 (6.4–8.0s): held read. Everything still; only the caret blinks. No drift, no push.

## Frame 2 — Describe the interface

- scene: three type beats land the value claim, then the Composer wordmark forms
- duration: 8s
- transition_in: crossfade
- src: compositions/frames/02-describe-the-interface.html
- status: outline
- type: product_intro
- persuasion: Friction reduction
- beat: curiosity → clarity
- blueprint: kinetic-type-beats (Reproduce)
- focal: authored — the display type + wordmark lockup
- roles: (no captured assets — typography-only beat)
- asset_candidates:
- cue: 0.0 "Describe the interface." · 2.0 "The agent streams it in." · 4.0 wordmark "A2UI Composer" + mono sub "the visual workbench for A2UI" · 6.0 hold
- sfx: whoosh-short, impact-bass-1
- handoff_in: caret — arrives at x 50%, y 62%, scale 1.0, opacity 1, blinking, stationary; it fades out over the first 0.5s as the first display line claims the centre.
- handoff_out: wordmark — x 50%, y 46%, scale 1.0, opacity 1, stationary at the cut.

narrativeRole: The value claim, landed by beat two — everything after this is evidence for it.
keyMessage: You describe it; the agent streams it in.

Reproduce: kinetic-type-beats' signature is the statement building across full-screen beats, each its
own move, resolving on a payoff. Filled with this product's three beats.

Scene 1 (0.0–2.0s): the caret from Frame 1 fades as the first display line **hard-cuts in**
(`discrete-text-sequence`) dead-centre — `display` ramp, sentence case, tight tracking, ~22 characters
of measure so it never spans the full width. Centred, ~40% of frame.
Scene 2 (2.0–4.0s): the second beat **replaces the first on an instant cut at peak velocity** — a
`waterfall cut` at word granularity (`cut-catalog.md`), the words handing over left-to-right in the
film's current. No fade between beats; the swap is the beat.
Scene 3 (4.0–6.0s): both lines clear upward and the **wordmark forms** — "A2UI Composer" settles from
a 6% scale-up on a long-tail settle (`spring-pop-entrance`, smooth register, no overshoot), a
`hairline-rule` draws on beneath it left-to-right (`svg-path-draw`), and the mono sub-line reveals
under the rule. One `impact-bass-1` on the wordmark's landing.
Scene 4 (6.0–8.0s): **held beat.** Completely still. This stillness is deliberate and is what makes
Frame 3's density land.

## Frame 3 — Prompt → UI, live

- scene: a prompt is sent, A2UI JSON streams down the editor, and the widget assembles component by component in lockstep
- duration: 14s
- transition_in: zoom-through
- src: compositions/frames/03-prompt-to-ui-live.html
- status: outline
- type: feature_showcase
- persuasion: Show-don't-tell proof
- beat: intrigue → awe
- blueprint: prompt-type-submit-generate (Adapt)
- focal: authored — the three-panel Composer stage (assistant · preview · editor)
- roles: assistant panel = supporting (gemini violet, left) · preview panel = **cutout / hero** (centre) · editor panel = supporting-but-causal (right)
- asset_candidates:
- cue: 0.0 stage arrives, assistant panel left · 0.8 prompt types: "A flight status card with a seat picker and a rebook button." · 3.0 SEND — caret jumps to the editor · 3.4 JSON begins streaming · 3.4–9.0 preview assembles in lockstep: Card → Text h2 → Text caption → Divider → ChoicePicker chips → Button primary · 9.6 cursor taps Rebook · 10.4 Events tab logs `rebook_flight` · 11.4 hold
- sfx: typing, click, pop, ping
- handoff_in: the frame arrives THROUGH the wordmark (zoom-through) — the stage scales up from 0.86 into focus over the first 0.5s, opacity 0→1, no lateral movement.
- handoff_out: the editor panel — x 78% centre, y 50%, scale 1.0, opacity 1, stationary, JSON fully populated at the cut.

narrativeRole: The mechanism, and the whole reason the film exists — the one thing a screenshot
physically cannot show.
keyMessage: The JSON arriving and the interface appearing are the same event.

Adapt: keep prompt-type-submit-generate's signature — a prompt types into a real product input and
the machine answers with a streaming artifact. Changed: the answer is **bipartite** — the stream
lands in the editor and the consequence renders in the preview **in the same beat**, borrowing
`panel-edit-live-sync`'s coupling discipline. The camera never loses the couple. This is the film's
climax; it gets the most screen time and the highest reveal density.

Scene 1 (0.0–0.8s): the three-panel stage arrives — assistant left (3 cols), preview centre (5 cols),
editor right (4 cols), each a `panel` on the half-step ladder with a mono header. Asymmetric
3/5/4 field, 3 depth layers. Panels enter as one group on a single long-tail settle, not staggered
individually — the stage is one object.
Scene 2 (0.8–3.0s): inside the assistant panel (the only place `gemini` violet appears), the prompt
**types on with the caret** (`discrete-text-sequence`). The other two panels are empty and quiet —
visibly waiting. This is the frame's held-back space; nothing else moves.
Scene 3 (3.0–3.4s): the send control presses in and springs back under a `cursor-click-ripple`; the
caret leaves the assistant and **arrives in the editor's gutter** — a `zoom-through` seam on the
caret itself (`cut-catalog.md`), matched direction and velocity, so the click visibly ignites the
next beat rather than merely preceding it.
Scene 4 (3.4–9.0s): **the signature stretch.** JSON streams down the editor line by line
(`dynamic-content-sequencing`) with semantic syntax colour — keys `stream`, strings `live`, numbers
`amber`, punctuation `ink-faint` — the gutter's line numbers ticking up with it. In the **same
beats**, the preview assembles: the Card frame draws its outline (`svg-path-draw`), then the h2 Text,
the caption Text, the Divider, the seat-picker chips (arriving in index order on the same staggered
reveal), and finally the primary Button. **Every component's first frame blooms `bloom-live` and
decays to nothing within 0.4s** — the visual grammar of "this just became real". The pairing is the
whole point: each preview element lands on the beat its own lines finish streaming, never before,
never in a separate pass.
Scene 5 (9.0–11.4s): the payload completes and a `live-chip` reading RENDERED pops beside the preview
header (`spring-pop-entrance`). An oversized cursor enters from off-screen bottom-right, travels to
the Rebook button, and **taps** (`cursor-click-ripple` + `press-release-spring`); on the tap, a row
writes itself into the Events tab beneath — `rebook_flight` — proving the round trip back to the
agent.
Scene 6 (11.4–14.0s): held read. The stage is still; only the editor caret blinks. No push, no drift.

## Frame 4 — The workbench

- scene: one continuous pull-back reveals the whole Composer around the editor we were reading
- duration: 10s
- transition_in: crossfade
- src: compositions/frames/04-the-workbench.html
- status: outline
- type: feature_showcase
- persuasion: Value stacking
- beat: clarity → control
- blueprint: zoom-out-workspace-reveal (Reproduce)
- focal: authored — the full four-panel Composer workbench
- roles: editor = the opening detail · workbench shell = the containing whole · debug tab strip = the payoff region
- asset_candidates:
- cue: 0.0 tight on the JSON · 1.6 the pull-back begins · 4.0 panel labels type on as they enter frame · 5.6 debug tabs light in sequence: DATA MODEL · EVENTS · ERRORS · RAW MESSAGES · 7.0 a value edit in Data Model propagates into the preview · 8.4 hold
- sfx: whoosh-cinematic, click-soft
- handoff_in: the editor panel — enters at exactly the position, scale and opacity it held at the end of Frame 3 (x 78%, y 50%, scale 1.0, opacity 1), then the camera begins its pull-back from there. This seam must not pop.
- handoff_out: the full workbench — x 50%, y 50%, scale 1.0, opacity 1, stationary; it is the anchor Frame 5 inherits.

narrativeRole: Re-scope from "a neat trick" to "a working environment" — everything the streaming
demo implied is actually instrumented.
keyMessage: It is a workbench, not a toy: assistant, preview, editor, and the machinery underneath.

Reproduce: zoom-out-workspace-reveal's signature is ONE continuous decelerating zoom-out from a tight
detail into the containing whole, with no zoom-in anywhere. The detail is the editor we were already
reading, which makes the reveal feel earned rather than announced.

Scene 1 (0.0–1.6s): open **tight** on the JSON — `code-lg` ramp, a few lines and the gutter filling
the frame, the hairline of the panel edge just visible at frame right. Full-bleed detail, 2 depth
layers. Still.
Scene 2 (1.6–5.6s): **one unbroken decelerating pull-back** (`viewport-change` on the world wrapper,
long-tail decel across the whole window — never re-accelerating, never reversing). The workbench
assembles into view as it is revealed: assistant, preview, editor, then the debug strip beneath.
Each `panel-tab` mono label **types on as its panel enters frame** (`discrete-text-sequence`), so the
reveal reads as labelling, not as decoration.
Scene 3 (5.6–7.0s): the camera has locked. The four debug tabs light **in sequence** on their cues
(`asr-keyword-glow`, one at a time, `ink-mute` → `ink` with a `stream` underline sliding between
them) — DATA MODEL, EVENTS, ERRORS, RAW MESSAGES.
Scene 4 (7.0–8.4s): the payoff and the frame's one voltage moment — a value in the Data Model panel
retypes (`discrete-text-sequence`, seat `14A` → `22F`) and the **same value updates inside the
preview's chip in the same beat**, a `live` hairline briefly connecting the two (`svg-path-draw`,
drawn left-to-right in the film's current, then gone). Two-way binding shown, not claimed.
Scene 5 (8.4–10.0s): held read. Locked frame, nothing moving but the caret.

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

## Frame 6 — Open the composer

- scene: the panels clear, the streaming wire draws itself into the A2UI mark, and the URL lands
- duration: 10s
- transition_in: zoom-through
- src: compositions/frames/06-open-the-composer.html
- status: outline
- type: cta
- persuasion: Friction reduction
- beat: confidence → urgency-to-act
- blueprint: logo-assemble-lockup (Adapt)
- focal: authored — the A2UI mark + wordmark lockup
- roles: wire = the connective element carried over from the demo · mark = the payoff · URL = the ask
- asset_candidates:
- cue: 0.0 stage clears, the wire persists · 1.6 the mark draws itself · 3.4 wordmark settles beside it · 5.0 "a2ui.org/composer" · 6.4 mono sub "No install. Open the tab." · 7.6 hold to the last frame
- sfx: riser, impact-bass-2, sparkle
- handoff_in: the frame arrives THROUGH the closing verdict line (zoom-through) — the stage scales up from 0.88 into focus over 0.5s. The `wire` from the demo is the one element that survives, entering at x 26%, y 50%, opacity 1 and immediately beginning its draw toward centre.
- handoff_out: (final frame — the lockup holds to the last rendered frame; this is the film's only true exit and there isn't one.)

narrativeRole: Convert. The ask is small on purpose — there is nothing to install.
keyMessage: It is one tab away.

Adapt: keep logo-assemble-lockup's signature — the mark **comes to exist on screen**, built from
parts, resolving into a centred lockup extended to a URL. Changed: the parts are not generic
particles but the film's own `wire` — the same connective element that carried signal between agent
and surface — so the mark is assembled out of the thing the video has been about.

Scene 1 (0.0–1.6s): the workbench clears outward and the `wire` survives alone against the grid, a
single `stream` path with its travelling highlight still running. A `riser` starts here, timed so its
peak lands on the mark's completion.
Scene 2 (1.6–3.4s): the wire **draws itself into the A2UI mark** (`svg-path-draw`, stroke-by-stroke,
one continuous chain, no cut) — two nodes joined by a streaming edge. On completion the stroke
resolves to fill and takes one `bloom-live` that decays inside 0.4s. `impact-bass-2` lands exactly
here.
Scene 3 (3.4–5.0s): the wordmark "A2UI Composer" settles beside the mark on a long-tail settle
(`spring-pop-entrance`, smooth register), and a `hairline-rule` draws on beneath the lockup.
Scene 4 (5.0–7.6s): the URL reveals on its cue in `code-lg` mono — `a2ui.org/composer` — with the
mono sub-line "No install. Open the tab." beneath it, and a small `live-chip` reading
`APACHE 2.0 · OPEN SOURCE` at the lockup's baseline.
Scene 5 (7.6–10.0s): **held to the final frame.** Absolutely still except the caret blinking after
the URL. The film ends on stillness, not on a move.
