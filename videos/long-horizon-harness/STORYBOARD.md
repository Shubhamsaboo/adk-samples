---
format: 1920x1080
duration: 88s
message: "Everything a long-running agent needs is already wired — and you run it with one command."
arc: PAS with a feature-benefit cascade — hook → pain → agitation → product intro → mechanism → capability beats → proof → quickstart → CTA
audience: AI engineers and platform developers building production agents on ADK / Google Agent Platform
mode: autonomous
music: dark cinematic tech underscore, deep sub bass, sparse pulsing arpeggio, restrained percussion, slow build into a confident lift
---

## Video direction

**Palette system** — from `frame.md`, never invented. `{colors.cream}` `#06080C` is the ground of
every frame (a full-duration `class="clip"` layer, never a `#root` background). `{colors.ink}`
`#E9EEF6` is the voice: 88–100% for display, 62–78% for supporting copy, 34–40% for chrome.
`{colors.tile}` / `{colors.tile-strong}` are the half-step-lighter card surfaces.
`{colors.navy}` / `navy-elev` are reserved for machine surfaces — terminal, code panel, the
browser chrome around real footage. `{colors.coral}` `#5CE1F2` is the signal: **exactly one cyan
moment per frame**, and it is the thing the beat is about. `{colors.amber}` `#F0A25C` appears
nowhere in this film except inside the banner plate's own sunset (Frame 4) — do not author it.

**The one exception to the one-cyan rule:** the `kicker-spike` ✱ is standing chrome, not the
signal. A frame may carry the ✱ *and* its one authored cyan moment. Nothing else is exempt.

**Light** — every frame's ground carries at most one wide, soft radial light (the sky), and at
most one element carries `{glows.signal}`. Two glowing things in one frame is the failure.

**Motion grammar** — long-tail decel settles, `power3` by default; never `back.out` / `bounce.out`
/ `elastic.out`. One paused GSAP timeline per frame, `fromTo` entrances with explicit from-states.
No `repeat` / `yoyo`, no `Math.random`, no `Date.now`, no CSS `transition` / `@keyframes`.

**Reveal model** — every frame is paced to its `voiceover`. At `t=0` only what the voice is saying
then is on screen; each further piece — a card, a node, a row, a line — reveals as the voice
reaches it, with reveals spread across the back ~50%. No frame front-loads its canvas and freezes.

**Rhythm / held-frame allocation** — the deliberate held reads are **Frame 1** (the cold open
settles and holds for its last ~1.4s), **Frame 4** (the title card is still from 7.6s to the cut),
**Frame 7** (from 6.1s the chrome and callouts are dead still and the real footage is the only
motion), and **Frame 11** (holds from 3.9s to the end). Everywhere else, keep content arriving.
During any hold the only sanctioned aliveness is low-amplitude subtle jitter — no breathing, no
back-half pan or push.

**Type** — display is Inter 700 sentence case, tightly negative-tracked, from `frame.md`'s ramp;
body Inter 400; all labels, paths, commands and status strips JetBrains Mono. Every frame declares
`@font-face` for the faces it names, pointing at `assets/fonts/*.woff2` — never a network import.

**Numerals & claims** — every figure, command, path and product name on screen traces to the
sample's own README (`capture/extracted/visible-text.txt`). Nothing is invented: no localhost
port, no adoption count, no benchmark.

**Caption band** — all content sits in the top ~83% (`y ≤ 896` on this 1080-tall canvas), even
though captions are disabled for this cut.

**Negative list** — no pure black or pure white; no warm gray; no gradient across a content card;
no tilt; no colored shadow; no second glow; no nav bars, footers, scrollbars, real cursors or
browser chrome except the deliberate `screen-frame` in Frame 7; no floating bokeh or purple-blue
"AI" gradients; no Google lock-up and no implication that this is a supported product. And both
motion failure modes: **slideshow** (everything dumped by ~25%, then frozen) and **screensaver**
(many elements floating independently).

---

## Frame 1 — The model was never the hard part

- scene: One cold statement lands on the near-black ground and a cyan rule draws under its last two words
- voiceover: "The model was never the hard part."
- duration: 4.0s
- transition_in: cut
- status: animated
- src: compositions/frames/01-hard-part.html
- type: hook
- persuasion: Negative contrast
- beat: recognition + tension
- blueprint: kinetic-type-beats (Adapt)
- focal: the statement itself
- roles: (no captured media — pure typography)
- sfx: impact-bass-1
- asset_candidates:

Adapt: keep sub-shape B's beat-by-beat statement build and its punctuating payoff; two beats
instead of five, and the payoff is a drawn cyan rule + glow rather than a spring-popped element.

Scene 1 (0.0–1.3s): near-black ground with one wide soft radial light low-centre. "The model was
never" enters dead-centre at 8.6cqw via **per-word staggered reveal**
(`dynamic-content-sequencing`) on a long-tail settle. Nothing else on screen. Centered, block
capped at ~90cqw, 2 depth layers (light / type).
Scene 2 (1.3–2.6s): the line completes — "the hard part." lands word by word on its own second
line as the voice reaches it (`dynamic-content-sequencing`). Still centered, 2 lines, top-83%.
(The break falls after "never" rather than after "model": at `display-cover` the second clause
overruns the frame, and 8.6cqw across two balanced lines reads larger than one stepped-down size.)
Scene 3 (2.6–4.0s): held read. A 1px cyan rule **draws left→right** under "hard part"
(a `scaleX` draw from the left — the `svg-path-draw` move without the SVG, whose dash pattern
rendered as two short dashes under a non-uniform viewBox) and `{glows.signal}` blooms softly
behind it (`ambient-glow-bloom`) — the one cyan moment. The mono `kicker-spike` `✱ AGENT HARNESS` fades up in the upper-left safe area.
Everything settles still; at most **subtle jitter** (`sine-wave-loop`, low amplitude). No drift.

narrativeRole: Opens cold on the thing the audience already privately believes, in their own outcome language — no product, no feature, no logo. Creates the gap the rest of the film fills.
keyMessage: The hard part of an agent is everything that is not the model.

## Frame 2 — Everything around it

- scene: Four capability panels pile up until the frame is crowded, then a push-in shoves them to the edges
- voiceover: "Memory that outlives the session. A sandbox that stays warm. Secrets the model never sees. Guardrails that halt a runaway loop."
- duration: 8.9s
- transition_in: crossfade
- status: animated
- src: compositions/frames/02-everything-around-it.html
- type: pain_point
- persuasion: Pain agitation by accumulation
- beat: overwhelm
- blueprint: overwhelm-surround (Adapt — clutter-shove-to-question resolution)
- focal: the accumulating panel stack
- roles: (no captured media — authored panels only)
- sfx: whoosh, glitch-3
- handoff_out: the four panels end shoved to the four frame edges, each ~55% cropped off-canvas, at scale 0.82, opacity 1, still travelling outward at low speed; the centre 46% of the frame is empty ground.
- asset_candidates:

Adapt: keep the accumulation-under-a-slow-zoom-out and the reverse quick push-in that **shoves the
clutter to the frame edges** (the signature of this resolution). What changes: the accumulating
objects are hairline capability panels rather than desktop windows, there is no avatar and no
morph, and the opened centre is handed to Frame 3 rather than carrying a question here. The panels
are shoved to the edges where they **remain visible and cropped** — nothing exits.

Scene 1 (0.0–2.2s): ground. One `card-hairline` panel scale-ins just left of centre carrying the
mono label `MEMORY` and three faint session rows that keep scrolling inside it as live density
(`spring-pop-entrance` smooth-settle; internal rows per `svg-icon-enrichment`'s DOM contract). A
**slow steady zoom-out** starts on the world wrapper (`multi-phase-camera`). Layered-depth, panel
~34% of frame.
Scene 2 (2.2–4.1s): panel 2 `SANDBOX` pops in overlapping the first, a container prompt typing
inside it (`discrete-text-sequence`); the zoom-out keeps widening so both fit. Asymmetric, 2 depth
layers.
Scene 3 (4.1–6.2s): panel 3 `SECRETS` slides in from the right edge showing a key-name list whose
values are redacted to `●●●●●●`; a small stack of alert chips slides in at the lower-left edge
(`spring-pop-entrance`). 3 depth layers, frame two-thirds full.
Scene 4 (6.2–8.4s): panel 4 `GUARDRAILS` pops in over the others with an iteration counter ticking
up beside it (`counting-dynamic-scale`, low register). Density peaks — panels overlap, the ground
is barely visible, everything holds crowded. No cyan anywhere in this frame; ink hairlines only.
Scene 5 (8.4–8.9s): the camera **reverses into a quick push-in** that shoves all four panels out to
the frame edges (`multi-phase-camera`), opening clean negative space at centre. The frame ends
mid-move so the hard cut into Frame 3 is velocity-matched (`cut-catalog.md` → cut-the-curve).

narrativeRole: Names the plumbing precisely, in the audience's vocabulary, and lets it pile up until the frame feels crowded. Each item is a real Long Horizon capability, so the pain and the product share a spine.
keyMessage: Every serious agent needs the same four things, and none of them are the model.

## Frame 3 — Months, before anything interesting

- scene: The cleared centre carries two hard-cut beats; a single cyan word takes the sting
- voiceover: "That's months of plumbing. Before your agent does anything interesting."
- duration: 5.2s
- transition_in: cut
- status: animated
- src: compositions/frames/03-months-of-plumbing.html
- type: pain_point
- persuasion: Cost-of-delay framing
- beat: frustration
- blueprint: kinetic-type-beats (Reproduce — sub-shape B)
- focal: the two statement beats
- roles: (no captured media — pure typography plus the inherited edge panels)
- sfx: impact-bass-2
- handoff_in: the four panels start shoved to the four frame edges, each ~55% cropped off-canvas, at scale 0.82, opacity 1, still travelling outward at low speed, decelerating to rest by 1.2s; the centre 46% of the frame is empty ground.
- asset_candidates:

Scene 1 (0.0–2.0s): opens on the centre Frame 2 cleared, the four panels still cropped at the
edges and coasting outward to rest. Beat 1 — "Months of plumbing." — enters centre at `display`
via **per-word staggered reveal** (`dynamic-content-sequencing`). Centered, block ~58cqw.
Scene 2 (2.0–2.15s): the seam — beat 1 clears left→right at word granularity as beat 2 arrives on
the same vector at matched speed (`cut-catalog.md` → waterfall cut).
Scene 3 (2.15–4.3s): beat 2 — "Before anything interesting." — lands centre. As the voice reaches
it, the word **"interesting"** takes the frame's one cyan moment: an attack-decay glow onto
`{colors.coral}` (`asr-keyword-glow`), the rest of the line staying ink.
Scene 4 (4.3–5.2s): held read. The edge panels are at rest; the cyan word has decayed back to a
steady `{colors.coral}` at full opacity. Subtle jitter only (`sine-wave-loop`, low amplitude).

narrativeRole: Converts the pile-up into a cost the viewer feels — time, not features. This is the last beat before the promise lands.
keyMessage: The plumbing is the thing standing between you and the interesting part.

## Frame 4 — Long Horizon

- scene: The project's own banner art holds under a title lock-up that settles and stops moving
- voiceover: "This is Long Horizon. A reference agent harness on ADK and Google's Agent Platform — with all of it already wired."
- duration: 9.5s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/04-long-horizon.html
- type: product_intro
- persuasion: Friction reduction
- beat: relief
- blueprint: titlecard-reveal (Adapt)
- focal: assets/long-horizon-banner.webp
- roles: long-horizon-banner.webp = background (full-bleed, dimmed ~45%, soft vignette)
- sfx: whoosh-cinematic, impact-bass-1
- asset_candidates: assets/long-horizon-banner.webp — the sample's own banner: an observatory at sunset with a cyan agent graph glowing above a table

Adapt: keep titlecard-reveal's **one restrained move then a still hold** — low motion is the
payload. What changes: instead of a chain of monochrome cards, a single lock-up builds in stages
over the banner plate, each stage cued to the voice. The banner's own glowing agent graph is this
frame's light source, so the frame authors **no** `{glows.signal}`; the `✱` spike is the only
authored cyan.

Scene 1 (0.0–2.6s): the banner plate is already full-bleed, dimmed ~45% with a soft vignette, and
holds — one very slow scale-settle that is finished by 2.6s and never resumes. "Long Horizon" sets
left-of-centre at `display-cover` in one restrained slide-up crossfade (`spring-pop-entrance`,
smooth-settle register). Asymmetric 60/40, 3 depth layers (plate / vignette / type).
Scene 2 (2.6–5.4s): as the voice names it, a single `lead` line sets under the wordmark —
"A reference agent harness" — at ink 78% (`dynamic-content-sequencing`).
Scene 3 (5.4–7.6s): as the voice reaches "ADK and Google's Agent Platform", two mono chips fade up
beneath the lead, staggered (`spring-pop-entrance`): `ADK 2.5.x` and `AGENT PLATFORM`.
Scene 4 (7.6–9.5s): held read — the mono index `core/python/long-horizon-harness` types on in the
lower safe area (`discrete-text-sequence`) and everything stops. No push, no drift, no breathing.

narrativeRole: The value claim of the whole film, landing on beat 4 immediately after the pain. Everything after this is evidence.
keyMessage: The harness already exists, and it is readable reference code you can lift.

## Frame 5 — One runner, everything attached

- scene: A node graph builds on the dark sky, one node per spoken cue, and one edge lights cyan
- voiceover: "One runner. Its own memory. Its own sandbox. Its own secrets. And sub-agents, each with a context window of their own."
- duration: 8.9s
- transition_in: crossfade
- status: animated
- src: compositions/frames/05-system.html
- type: feature_showcase
- persuasion: Show-don't-tell proof
- beat: clarity
- blueprint: constellation-hub (Adapt)
- focal: the `ADK RUNNER` core node
- roles: (no captured media — authored diagram)
- sfx: ping, pop
- asset_candidates:

Adapt: keep the signature — **nodes spring into a ring around a centre and the shot resolves on
the core**. What changes: the satellites arrive **one per spoken cue** instead of as a single
staggered burst, and the resolving camera push-in is replaced by a still hold (the diagram is the
payload; a push would fight the read). Use the `System / Diagram` treatment from `frame.md`.

Scene 1 (0.0–1.7s): dark ground. The core — a `card-hairline` chip labelled `ADK RUNNER` in mono —
spring-pops dead-centre (`spring-pop-entrance`, smooth settle). Nothing else. Centered, ~22% of
frame, 2 depth layers.
Scene 2 (1.7–3.4s): `MEMORY BANK` springs in at its upper-left ring position and a 1px ink@18%
edge **draws** from the core out to it (`svg-path-draw`).
Scene 3 (3.4–5.1s): `SANDBOX` + its drawn edge, upper-right.
Scene 4 (5.1–6.8s): `SECRET MANAGER` + its drawn edge, lower-right.
Scene 5 (6.8–8.4s): two `SUB-AGENT` chips spring in on the lower-left arc, each ringed by three
small dots expanding outward from it to imply its own context window
(`center-outward-expansion`). The edge from the core to the nearer sub-agent **lights cyan** with
`{glows.signal}` as the voice says it — the one cyan moment.
Scene 6 (8.4–8.9s): the whole graph holds still; subtle jitter on the core chip only
(`sine-wave-loop`, low amplitude).

narrativeRole: Turns the four pains from Frame 2 into a system the viewer can hold in their head — the same four words, now as parts of one machine.
keyMessage: The pieces are not bolted on; they are the architecture.

## Frame 6 — It dreams

- scene: A week of sessions runs as faint rows; a nightly pass sweeps them and one memory rises out
- voiceover: "It saves what's worth keeping. And every night it dreams — one pass across every session, surfacing what no single conversation could. Mention it Monday, it's there by Friday."
- duration: 12.0s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/06-it-dreams.html
- type: benefit_highlight
- persuasion: Future pacing
- beat: intrigue → aspiration
- blueprint: agent-progress-theater (Adapt)
- focal: the surfaced memory card
- roles: (no captured media — authored session rows and card)
- sfx: sparkle, ping
- asset_candidates:

Adapt: keep the shape's spine — **trigger → visible working theater → a receipt that lands and
checks off**. What changes: the trigger is nightfall rather than a click, the working theater is a
scan line travelling the week's session rows rather than spinners, and the receipt is one
consolidated memory card rising out of Monday instead of a findings checklist.

Scene 1 (0.0–2.3s): five faint session rows stack across the mid-band as a week, each a 1px
hairline strip carrying a few mono tokens and one saved-memory dot; rows arrive staggered
(`spring-pop-entrance`). A mono scale `MON TUE WED THU FRI` sits above them. Full-width strip,
2 depth layers, rows at ink 34%.
Scene 2 (2.3–4.4s): the ground darkens a half-step and the mono status label swaps to
`NIGHTLY PASS · RUNNING` (`discrete-text-sequence`); a 1px scan line begins travelling left→right
across the rows.
Scene 3 (4.4–6.3s): the scan line completes its travel; each row it crosses brightens to ink 62%
then settles back behind it (`asr-keyword-glow`, low register) — the working theater.
Scene 4 (6.3–8.7s): the receipt — one `card-hairline` memory card rises out of the Monday row to
the upper third and settles (`spring-pop-entrance`), mono label `CONSOLIDATED · 1 PROFILE`.
Scene 5 (8.7–10.0s): a 1px **cyan leader draws** from the Monday row up to the risen card
(`svg-path-draw`) carrying `{glows.signal}` — the one cyan moment.
Scene 6 (10.0–12.0s): the Friday row brightens under the card and the status label swaps to
`SURFACED` (`discrete-text-sequence`); everything holds still, subtle jitter on the card only.

narrativeRole: The one beat that is genuinely unusual and worth remembering — the self-improvement loop, said as a concrete Monday-to-Friday story rather than a capability name.
keyMessage: The harness gets better the more it is used, on its own schedule.

## Frame 7 — Here it is, running

- scene: The real Horizon web UI plays inside a browser frame while two callouts name what is moving
- voiceover: "Here it is running. Tool calls stream as they happen — and the work ends in something you can open."
- duration: 8.2s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/07-running.html
- type: feature_showcase
- persuasion: Show-don't-tell proof
- beat: trust
- blueprint: device-surface-showcase (Adapt)
- focal: assets/horizon-demo.mp4
- roles: horizon-demo.mp4 = cutout **[video]** (the hero, mounted inside the `screen-frame`); horizon-demo.gif = source only, never mounted
- sfx: click, notification
- asset_candidates: assets/horizon-demo.mp4 — [video] the real Horizon web UI running two tasks, streaming tool calls into a rendered HTML artifact

Adapt: keep the signature — **one surface held as hero while its screens advance under a camera
that does not chase**. What changes: the surface is the project's real screen recording rather
than a rebuilt UI, so the advancing screens are the footage itself; the camera never moves at all.

**Mounting (binding — the worker must use these exact values).** The recording is an approved frame
video, declared as `<video data-frame-video="approved" muted playsinline data-start="0"
data-duration="8.2" data-track-index="…">` with `src="assets/horizon-demo.mp4"` and explicit host
geometry `data-frame-video-x="760" data-frame-video-y="180" data-frame-video-width="1000"
data-frame-video-height="642" data-frame-video-fit="cover"`. The assembler hoists it to the host
root, so the authored `screen-frame` chrome must be drawn to match those coordinates exactly: a
`navy-elev` chrome strip spanning x 760→1760 at y 140→180 with three 8px dots at its left, a 1px
ink@14% hairline around the whole x 760→1760 / y 140→822 rectangle, `{shadows.card}` beneath it,
and 12px corners. Never rebuild the UI, never recolor or crop the footage.

Scene 1 (0.0–1.9s): the `screen-frame` (chrome + hairline + shadow) arrives as one restrained
slide-up and smooth settle (`spring-pop-entrance`) with the recording already playing inside it.
Asymmetric 60/40 — the left ~38% of the canvas stays dark ground. 3 depth layers (ground /
shadow / framed surface).
Scene 2 (1.9–3.8s): as the voice says "tool calls stream", a `card-hairline` chip fades in at the
left carrying the mono label `STREAMING TOOL CALLS`, joined to the recording's centre column by a
1px ink@18% leader that **draws** across (`svg-path-draw`).
Scene 3 (3.8–6.1s): as the voice reaches "something you can open", a second chip fades in beneath
it, mono `ACTIVITY · MEMORY · SECRETS · SKILLS`, its leader **drawn in cyan** to the recording's
right rail with `{glows.signal}` — the one cyan moment.
Scene 4 (6.1–8.2s): held read. Chips, leaders, chrome and camera are all dead still; the real
footage is the only motion in the frame. No push, no drift, no jitter.

narrativeRole: The evidence beat. Everything claimed so far is now visible in real product footage rather than in our typography.
keyMessage: This is not a diagram — it runs, and you can watch it work.

## Frame 8 — Teach it mid-session

- scene: Three extension cards assemble left to right, each arriving on its own spoken cue
- voiceover: "Drop in a skill or a script and reload — no fork, no redeploy. Drive it from any agent over A2A. Reminders come back as real, replayable chats."
- duration: 11.0s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/08-extend.html
- type: feature_showcase
- persuasion: Feature-to-benefit translation
- beat: control
- blueprint: grid-card-assemble (Adapt)
- focal: the `SKILL.md` card
- roles: (no captured media — authored cards)
- sfx: pop, whoosh-short, riser
- asset_candidates:

Adapt: keep the signature — **items self-assemble in a staggered cascade into a held array**.
What changes: three cards rather than a dense grid, and each card assembles on its own spoken cue
instead of the whole array cascading at once; the optional zoom-out reveal is dropped.

Scene 1 (0.0–2.6s): card 1 assembles left of centre — a small `code-surface` panel, `navy-elev`
title bar reading `SKILL.md` in mono, three lines typing on inside its body
(`discrete-text-sequence`). Triptych framing, each card ~26% of frame, 2 depth layers.
Scene 2 (2.6–4.4s): a mono chip `/reload` spring-pops onto card 1's lower edge
(`spring-pop-entrance`) and the panel's status strip flips to `LOADED`
(`discrete-text-sequence`) — no re-mount, no redeploy.
Scene 3 (4.4–7.0s): card 2 assembles at centre — two node chips joined by a 1px line that **draws**
between them (`svg-path-draw`), mono label `A2A`; a small structured-part chip pops in on the
return path.
Scene 4 (7.0–10.56s): card 3 assembles at the right — a `card-hairline` holding three chat rows
that arrive staggered (`spring-pop-entrance`), mono label `SCHEDULED`. The newest row **lights
cyan** with `{glows.signal}` as the voice says "replayable chats" — the one cyan moment.
Scene 5 (10.56–11.0s): all three cards hold still; subtle jitter on the right card only.

narrativeRole: Answers the "but can I change it?" objection with three concrete extension points, each translated into what it saves the viewer.
keyMessage: You extend it without forking it.

## Frame 9 — Two commands

- scene: A terminal types the real quickstart line by line and lands on make dev-local
- voiceover: "Clone the sample. One make target. It installs, seeds your environment, and runs."
- duration: 8.0s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/09-quickstart.html
- type: cta
- persuasion: Friction reduction
- beat: ease
- blueprint: prompt-type-submit-generate (Adapt — install-command form)
- focal: the terminal `code-surface`
- roles: (no captured media — authored terminal)
- sfx: typing, key-press
- asset_candidates:

Adapt: keep the signature — **a command types live into a real input and the machine answers**.
What changes: the input is the project's terminal rather than a product composer, and the answer
is the make target's own first-run behaviour rather than a generated artifact. The commands are
verbatim from the sample's README; do not paraphrase them and do not invent output.

Scene 1 (0.0–1.6s): a `code-surface` terminal arrives centre at ~72% of frame width — `navy`
body, `navy-elev` title bar with the mono path `~/adk-samples`, empty body, caret blinking
(`context-sensitive-cursor`). One restrained arrival, then the camera is still for the rest of the
frame. Centered, 3 depth layers.
Scene 2 (1.6–3.4s): line 1 types on character by character behind the caret
(`discrete-text-sequence` + `context-sensitive-cursor`):
`git clone --depth 1 --filter=blob:none --sparse https://github.com/google/adk-samples.git`,
then line 2 `git sparse-checkout set core/python/long-horizon-harness`. Syntax inside the surface
uses the fixed decoration colors from `frame.md` — command in cyan, flags at ink 62%, the URL and
path in teal `#5DB8A6`.
Scene 3 (3.4–5.7s): line 3 types — `make dev-local` — and the caret drops to a new line. The
surface's status strip flips to `first run installs deps · seeds .env` (`discrete-text-sequence`).
Scene 4 (5.7–8.0s): two ok rows print beneath, staggered (`spring-pop-entrance`), and the
`make dev-local` line itself takes the frame's one cyan moment — a steady `{glows.text}` on that
line only. The terminal holds, caret blinking, nothing else moves.

narrativeRole: Collapses the "months of plumbing" from Frame 3 into a terminal you can read in one breath — the film's structural payoff.
keyMessage: Getting it running is a clone and one command.

## Frame 10 — And one command to ship it

- scene: One oversized figure holds while three deploy steps land beside it over a 1px rule
- voiceover: "And when it's yours: one command provisions the infrastructure and ships the code."
- duration: 6.0s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/10-deploy.html
- type: benefit_highlight
- persuasion: Value stacking
- beat: confidence
- blueprint: dataviz-countup (Adapt)
- focal: the `1` / `command` number-lockup
- roles: (no captured media — authored stat + rows)
- sfx: impact-bass-1
- asset_candidates:

Adapt: keep the signature — **one oversized figure is the hero and the shot resolves onto it**.
What changes: there is no camera push-through (this beat is short and must read instantly), and
the escalation comes from the three step rows landing beside the figure rather than from the
figure climbing.

Scene 1 (0.0–1.8s): the `number-lockup` lands left of centre — an Inter `number-hero` `1` over a
1px rule with the mono unit `command` beside it, the figure settling from a short count
(`counting-dynamic-scale`). The mono `kicker-spike` `✱ MAKE DEPLOY` sits above it. Asymmetric
60/40, 3 depth layers.
Scene 2 (1.8–3.3s): as the voice says "provisions the infrastructure", step row 1 slides in on the
right: mono `01 TERRAFORM · Cloud SQL · Secret Manager · IAM · Scheduler`.
Scene 3 (3.3–4.4s): step row 2 slides in beneath it: mono `02 AGENTS-CLI · backend image → lha`.
Scene 4 (4.4–5.4s): step row 3 lands: mono `03 CLOUD BUILD · web image → lha-web`; on its arrival a
small cyan pill `3 STEPS` spring-pops at the end of the rule (`spring-pop-entrance`) with
`{glows.signal}` — the one cyan moment.
Scene 5 (5.4–6.0s): everything holds still.

narrativeRole: Extends the ease claim past the laptop — the difference between a demo and a reference implementation you can actually deploy.
keyMessage: It goes to production with the same economy it starts with.

## Frame 11 — Read it. Run it. Lift the patterns.

- scene: The lock-up assembles on the returning light and the repo path lands as the one cyan callout
- voiceover: "Read it, run it, and lift the patterns into your own agent."
- duration: 6.0s
- transition_in: blur-crossfade
- status: animated
- src: compositions/frames/11-cta.html
- type: branding
- persuasion: Risk reversal
- beat: motivation
- blueprint: logo-assemble-lockup (Adapt)
- focal: the `Long Horizon` lock-up
- roles: (no captured media — authored lock-up)
- sfx: impact-bass-2
- asset_candidates:

Adapt: keep the signature — **the mark comes to exist on screen and resolves into a centred
lock-up extended to the destination**. What changes: the "elements clear the stage" phase is
replaced by the ground's radial light returning, since Frame 10 leaves a clean field. This is the
final frame, so a closing settle is allowed here and nowhere else.

Scene 1 (0.0–1.4s): the ground returns with one wide low radial light. The `✱` spike **draws on**
first (`svg-path-draw`), then `Long Horizon` assembles centre at `display` via per-word staggered
reveal (`dynamic-content-sequencing`). Centered, 2 depth layers.
Scene 2 (1.4–2.6s): the mono index `github.com/google/adk-samples` fades up beneath the wordmark at
ink 62%, one smooth settle.
Scene 3 (2.6–3.9s): the `coral-callout` lands — a cyan pill carrying the mono path
`core/python/long-horizon-harness` in near-black text — spring-popping beneath the index line with
`{glows.signal}` (`spring-pop-entrance`). The one cyan moment.
Scene 4 (3.9–6.0s): held close. The mono line `Sample code · not an officially supported Google
product` fades in at ink 40% in the lower safe area, and the ground's radial light eases down to a
slow final settle. Nothing else moves.

narrativeRole: Closes on the sample's own invitation — it is meant to be read and adapted, not adopted wholesale — and leaves exactly one thing to type.
keyMessage: github.com/google/adk-samples → core/python/long-horizon-harness.
