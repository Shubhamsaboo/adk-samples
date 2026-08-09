# Long Horizon — launch film

A ~88s dark-theme launch film for **Long Horizon**, the reference agent harness in
`google/adk-samples` (`core/python/long-horizon-harness`). Built with
[HyperFrames](https://hyperframes.heygen.com) — the video is an HTML composition rendered
frame-by-frame, so everything here is source you can read, edit and re-render.

**Output:** `renders/video.mp4` — 1920×1080, ~88s.

## The film

| # | Frame | Beat | On screen |
|---|---|---|---|
| 01 | `01-hard-part` | hook | "The model was never the hard part." — a cyan rule draws under the last three words |
| 02 | `02-everything-around-it` | pain | Memory / sandbox / secrets / guardrails panels pile up, then a push-in shoves them to the edges |
| 03 | `03-months-of-plumbing` | agitation | "Months of plumbing. / Before anything **interesting**." |
| 04 | `04-long-horizon` | product intro | The sample's own banner art under the wordmark, ADK 2.5.x + Agent Platform chips |
| 05 | `05-system` | architecture | One runner with memory, sandbox, secrets and two sub-agents ringed around it |
| 06 | `06-it-dreams` | the standout | A week of sessions, a nightly pass sweeping them, one consolidated memory surfacing |
| 07 | `07-running` | proof | The real Horizon web UI playing inside a browser frame, two callouts |
| 08 | `08-extend` | extensibility | `SKILL.md` + `/reload`, A2A, scheduled replayable chats |
| 09 | `09-quickstart` | payoff | The three real README commands typed into a terminal |
| 10 | `10-deploy` | value stack | `make deploy` → one command, three steps |
| 11 | `11-cta` | close | The lock-up and the repo path |

Every numeral, command, path and product name on screen traces to the sample's own README
(kept verbatim in `capture/extracted/visible-text.txt`). Nothing is invented.

## Files

```
BRIEF.md          why the film exists, who it is for, what was inferred vs confirmed
STORYBOARD.md     the plan — video direction + one time-coded shot sequence per frame
SCRIPT.md         the locked narration, line by line
frame.md          the design system (the shipped `code-editorial` preset, inverted to dark)
capture/          source material: the sample's README + its own banner art and screen recording
compositions/     one HTML sub-composition per frame — the actual film
index.html        generated: mounts every frame + the voice, music and SFX tracks
assets/           fonts, staged media, generated voice, the music bed, the SFX cues
scripts/build.sh  regenerate index.html from the storyboard (see below)
renders/          the MP4
snapshots/        contact sheets used to eyeball the cut before rendering
```

## Rebuilding

```bash
bash scripts/build.sh     # storyboard + frames -> index.html (+ transitions)
npx hyperframes check     # lint + runtime + layout + motion + contrast, one gate
npx hyperframes preview    # live studio
npx hyperframes render --quality high --output renders/video.mp4
```

Use `scripts/build.sh` rather than calling `assemble-index.mjs` directly — it re-applies two
things this project needs that the generic pipeline cannot know about:

1. **Frame 07's approved video.** `assemble-index.mjs` *hoists* the `<video>` out of the frame
   file into `index.html` and leaves a comment behind. A second assemble would then find
   nothing to hoist and the proof beat would render as empty browser chrome; the script
   restores the element first.
2. **GSAP.** `assemble-index.mjs` writes a jsdelivr `<script>` tag. Renders in this environment
   have no egress to that host, so the tag is re-pointed at `assets/vendor/gsap.min.js`
   (gsap 3.14.2, unmodified, from the npm registry).

## Audio

No HeyGen credential was available at build time, so all three audio layers were produced
locally and offline:

| Layer | Source |
|---|---|
| Narration | Kokoro-82M, voice `bm_george` — 11 lines, 75.2s total (`assets/voice/`) |
| Music | `scripts/compose-bed.py` — a deterministic numpy synthesis of the storyboard's `music:` mood, arranged against the film's beat map (`assets/bgm/track.mp3`) |
| SFX | The 19 cues named in `STORYBOARD.md`, resolved from HyperFrames' bundled library and hand-placed on the visual beats in `audio_meta.json` |

The music bed is composed rather than retrieved because HeyGen's licensed catalog needs a
sign-in and the local MusicGen fallback could not download its model (the model host is blocked
by this environment's egress policy). Signing in with `npx hyperframes auth login` and re-running
Step 3.1 would swap in the licensed catalog track and HeyGen's voices.

## Not an endorsement

Long Horizon is **sample code, not an officially supported Google product**. The film says so
on its final frame, uses no Google lock-up, and claims no GA status.
