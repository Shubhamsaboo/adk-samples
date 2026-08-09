# Asset inventory

No website capture was run: the brief supplies the source material (the sample's
own README and docs). The two assets below are the project's own published
artwork, downloaded directly from the repository, and are the canonical
inventory for `asset_candidates`.

| File | What it is | Where it belongs |
|---|---|---|
| `capture/assets/long-horizon-banner.webp` | 1408×768 illustrated banner shipped by the sample: an observatory on a hillside at sunset, a glowing cyan agent graph projected above a wooden table, a long valley running to the horizon. Warm amber sun on the left, deep blue-navy sky, cyan graph nodes. | The opening ground and the closing lock-up. Its cyan graph and amber sun are the video's accent colors. |
| `capture/assets/horizon-demo.mp4` **[video]** | 1596×1008, 12.8 s, 25 fps — the H.264 transcode of the shipped GIF, cropped to the browser window (the recording carries a bright desktop wallpaper border that fights the dark palette). This is the form the composition must use: an animated GIF advances on the browser clock, so it cannot render deterministically under frame-by-frame seek. | The proof beat, mounted as an approved frame video with explicit host geometry. |
| ~~`capture/assets/horizon-demo.gif`~~ *(not kept — superseded by the MP4 above and re-downloadable from the repo)* | 1684×1080, 12.8 s, 128 frames (10 fps). Screen recording of the real Horizon web UI in a browser: left rail of chats (General, BQ Analysis, agents-cli, Scheduled) and a workspace file tree; center a thread titled "Long Horizon Harness" streaming tool calls (`write_file analyze_ngrams.py · 89 lines`, `terminal uv run --with google-cloud-bigquery`, `load_skill`); right rail an Activity feed with timestamped tool events plus Background / Memory / Auth / Secrets / Scheduled / Skills counters. Ends in a rendered HTML report artifact. Dark UI throughout. | The proof beat — the only place real product footage appears. Use as a framed screen, never full-bleed at 1:1 without a device frame. |

## Colors read off the assets

- `#5CE1F2` — the banner's glowing agent-graph nodes and edges (primary accent).
- `#F0A25C` — the banner's sunset (secondary accent, used sparingly for warmth).
- `#6366F1` — the web UI's user-message bubble (tertiary, UI-truth accent).
- `#06080C` / `#0E1219` — the UI chrome's near-black ground.

## Not captured

No screenshots of a marketing site exist — the sample has no marketing site. No
logo file ships with the sample; the wordmark is set in type, not an image.
