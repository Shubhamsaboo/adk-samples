#!/usr/bin/env bash
# Rebuild index.html from STORYBOARD.md + the frame compositions.
#
# Run this instead of calling assemble-index directly: it re-applies two things the
# generic pipeline cannot know about this project.
#
#   1. Frame 07 mounts the real Horizon screen recording as an approved frame video.
#      `assemble-index.mjs` HOISTS that <video> out of the frame file into index.html and
#      leaves a comment behind, so a second assemble would find nothing to hoist and the
#      proof beat would render as an empty browser chrome. This restores the element first.
#   2. `assemble-index.mjs` writes a jsdelivr <script> tag for GSAP. Renders here run with
#      no egress to that host, so the tag is re-pointed at the vendored copy in
#      assets/vendor/gsap.min.js (gsap 3.14.2, unmodified, fetched from the npm registry).
#
# Usage:  bash scripts/build.sh        (from the project root)

set -euo pipefail
cd "$(dirname "$0")/.."

SKILL_DIR="${SKILL_DIR:-$HOME/.agents/skills/product-launch-video}"
FRAME7="compositions/frames/07-running.html"

# 1. restore the hoisted <video> into frame 07 if a previous assemble stripped it
python3 - "$FRAME7" <<'PY'
import sys, re
p = sys.argv[1]
s = open(p).read()
VIDEO = '''<video
          data-frame-video="approved"
          src="assets/horizon-demo.mp4"
          muted
          playsinline
          data-start="0.4"
          data-duration="7.8"
          data-track-index="4"
          data-frame-video-x="760"
          data-frame-video-y="180"
          data-frame-video-width="1000"
          data-frame-video-height="632"
          data-frame-video-fit="cover"
        ></video>'''
if "<video" in s:
    print("frame 07: video already present")
else:
    s2, n = re.subn(r'\s*<!-- approved frame video hoisted by assemble-index -->', "\n        " + VIDEO, s, count=1)
    if not n:
        sys.exit("frame 07: neither a <video> nor the hoist marker found — cannot restore")
    # collapse the duplicate provenance comments a repeated hoist leaves behind
    s2 = re.sub(r'(\s*<!-- the real product recording[^\n]*-->){2,}',
                "\n        <!-- the real product recording, hoisted to the host root with explicit geometry -->", s2)
    open(p, "w").write(s2)
    print("frame 07: video restored")
PY

# 2. assemble, then stamp the between-frame transitions
node "$SKILL_DIR/scripts/assemble-index.mjs" --storyboard ./STORYBOARD.md --hyperframes .
node "$SKILL_DIR/scripts/transitions.mjs" inject --storyboard ./STORYBOARD.md --hyperframes .

# 3. re-point GSAP at the vendored copy
python3 - <<'PY'
import re
s = open("index.html").read()
s, k = re.subn(
    r'<script src="https://cdn\.jsdelivr\.net/npm/gsap@[\d.]+/dist/gsap\.min\.js"[^>]*></script>',
    '<script src="assets/vendor/gsap.min.js"></script>',
    s,
)
open("index.html", "w").write(s)
print(f"gsap: re-pointed {k} tag(s) at assets/vendor/gsap.min.js")
PY

node "$SKILL_DIR/scripts/transitions.mjs" verify --storyboard ./STORYBOARD.md --index ./index.html
echo "✓ build complete — run 'npx hyperframes check' next"
