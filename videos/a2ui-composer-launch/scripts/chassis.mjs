#!/usr/bin/env node
// chassis.mjs — applies the film's editorial chassis to every frame, identically.
//
// The chassis is the thing that makes six independently-authored frames read as one
// designed object rather than six good slides. It is deliberately ALL ground and chrome:
// nothing here is content, so it cannot violate the "no glow / no gradient on content"
// rule in frame.md, and it cannot move a single piece of type.
//
// Two layers per frame:
//   · atmosphere — painted onto the existing ground clip via ::after, so it sits BELOW
//     every piece of content. A 240px major grid over the existing 48px minor lattice
//     (a mesh with no hierarchy reads as wallpaper; a two-step grid reads as drafting
//     paper), a faint centre aperture so the void isn't dead flat, and an edge vignette.
//   · chassis — corner ticks and the top rail, appended last so they sit above the
//     stage. They live in the 64px margin where content never goes.
//
// Idempotent: re-running replaces the injected block rather than stacking it.
//
//   node scripts/chassis.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;

const FRAMES = [
  { id: "01-text-cant-be-tapped", p: "f01c", dur: 8, ground: ".f01tct-ground", fig: "Fig. 01 — Agent reply, plain text" },
  { id: "02-describe-the-interface", p: "f02c", dur: 8, ground: "#f02-ground", fig: "Fig. 02 — A2UI Composer" },
  { id: "03-prompt-to-ui-live", p: "f03c", dur: 14, ground: "#p3-ground", fig: "Fig. 03 — Surface: flight-status" },
  { id: "04-the-workbench", p: "f04c", dur: 10, ground: "#wb4-ground", fig: "Fig. 04 — Composer workbench" },
  { id: "05-one-payload-every-renderer", p: "f05c", dur: 10, ground: ".f05-ground", fig: "Fig. 05 — Basic catalog, three renderers" },
  { id: "06-open-the-composer", p: "f06c", dur: 10, ground: ".otc-ground", fig: "Fig. 06 — a2ui.org/composer" },
];

const RAIL = "A2UI · a streaming protocol for agent-driven user interfaces";

const css = (f) => `
    /* ── injected by scripts/chassis.mjs — do not hand-edit ───────────────── */
    /* atmosphere: rides the ground, so it is always BELOW content */
    ${f.ground}::after {
      content: ""; position: absolute; inset: 0; pointer-events: none;
      background-image:
        radial-gradient(ellipse 44% 38% at 50% 47%, rgba(237,241,248,0.030), rgba(237,241,248,0) 72%),
        repeating-linear-gradient(to right, rgba(237,241,248,0.055) 0 1px, transparent 1px 240px),
        repeating-linear-gradient(to bottom, rgba(237,241,248,0.055) 0 1px, transparent 1px 240px);
      -webkit-mask-image: radial-gradient(ellipse 76% 68% at 50% 50%, #000 28%, transparent 100%);
      mask-image: radial-gradient(ellipse 76% 68% at 50% 50%, #000 28%, transparent 100%);
    }
    ${f.ground} { box-shadow: inset 0 0 300px 90px rgba(0,0,0,0.55); }

    /* chassis: corner ticks + top rail + the vertical index rail */
    #${f.p}-chassis { position: absolute; inset: 0; pointer-events: none; }
    #${f.p}-chassis .tick { position: absolute; width: 30px; height: 30px; }
    #${f.p}-chassis .tick::before,
    #${f.p}-chassis .tick::after {
      content: ""; position: absolute; background: rgba(237,241,248,0.16);
    }
    #${f.p}-chassis .tick::before { width: 30px; height: 1px; }
    #${f.p}-chassis .tick::after { width: 1px; height: 30px; }
    #${f.p}-chassis .tl { left: 64px; top: 64px; }
    #${f.p}-chassis .tr { right: 64px; top: 64px; }
    #${f.p}-chassis .bl { left: 64px; bottom: 64px; }
    #${f.p}-chassis .br { right: 64px; bottom: 64px; }
    #${f.p}-chassis .tl::before, #${f.p}-chassis .tl::after { left: 0; top: 0; }
    #${f.p}-chassis .tr::before { right: 0; top: 0; }
    #${f.p}-chassis .tr::after { right: 0; top: 0; }
    #${f.p}-chassis .bl::before { left: 0; bottom: 0; }
    #${f.p}-chassis .bl::after { left: 0; bottom: 0; }
    #${f.p}-chassis .br::before { right: 0; bottom: 0; }
    #${f.p}-chassis .br::after { right: 0; bottom: 0; }

    #${f.p}-toprail {
      position: absolute; left: 118px; right: 118px; top: 62px; height: 20px;
      display: flex; align-items: center; justify-content: space-between;
      font-family: 'JetBrains Mono', monospace; font-size: 17px; font-weight: 500;
      letter-spacing: 0.16em; line-height: 20px; color: #828A99;
    }
    #${f.p}-toprail .dot {
      display: inline-block; width: 5px; height: 5px; background: #34E2C0;
      margin-right: 14px; vertical-align: 3px;
    }
    #${f.p}-vrail {
      position: absolute; left: 34px; top: 50%; transform: translateY(-50%) rotate(180deg);
      writing-mode: vertical-rl; text-orientation: mixed;
      font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 400;
      letter-spacing: 0.30em; color: #828A99; white-space: nowrap;
    }
    /* ── end chassis ─────────────────────────────────────────────────────── */
`;

const markup = (f) => `
    <!-- injected by scripts/chassis.mjs — the film's editorial chassis -->
    <div id="${f.p}-chassis" class="clip" data-start="0" data-duration="${f.dur}" data-track-index="3" data-layout-allow-overlap>
      <i class="tick tl"></i><i class="tick tr"></i><i class="tick bl"></i><i class="tick br"></i>
      <div id="${f.p}-toprail"><span><i class="dot"></i>${f.fig}</span><span>A2UI.ORG/COMPOSER</span></div>
      <div id="${f.p}-vrail">${RAIL}</div>
    </div>
`;

const START = "\n    /* ── injected by scripts/chassis.mjs";
const END = "    /* ── end chassis ─────────────────────────────────────────────────────── */\n";
const MSTART = "\n    <!-- injected by scripts/chassis.mjs";

let n = 0;
for (const f of FRAMES) {
  const path = join(ROOT, "compositions/frames", `${f.id}.html`);
  let s = readFileSync(path, "utf8");

  // idempotence — strip any previous injection
  if (s.includes(START)) s = s.slice(0, s.indexOf(START)) + s.slice(s.indexOf(END) + END.length);
  if (s.includes(MSTART)) {
    const a = s.indexOf(MSTART);
    // the vrail line closes itself, so step PAST that one to reach the
    // chassis wrapper's own </div> — stopping at the first one strands an
    // orphan close, which silently ejects the re-injected block from #root.
    const vrailClose = s.indexOf("</div>", s.indexOf(`id="${f.p}-vrail"`)) + "</div>".length;
    const b = s.indexOf("</div>", vrailClose) + "</div>".length;
    s = s.slice(0, a) + s.slice(b);
  }

  // CSS → before the first </style>
  s = s.replace(/[ \t]+<\/style>/, "</style>").replace(/[ \t]+<\/div>(\s*<script)/, "</div>$1");
  const st = s.indexOf("</style>");
  if (st < 0) throw new Error(`${f.id}: no </style>`);
  s = s.slice(0, st) + css(f) + s.slice(st);

  // markup → last </div> before the first <script> that follows the root
  const rootAt = s.indexOf(`data-composition-id="${f.id}"`);
  const scriptAt = s.indexOf("<script", rootAt);
  if (rootAt < 0 || scriptAt < 0) throw new Error(`${f.id}: cannot locate root/script`);
  const close = s.lastIndexOf("</div>", scriptAt);
  // trim trailing whitespace on the insertion side so repeat runs are byte-stable
  s = s.slice(0, close).replace(/[ \t\n]*$/, "") + markup(f) + "  " + s.slice(close);

  writeFileSync(path, s);
  n++;
  console.log(`  ✓ ${f.id}`);
}
console.log(`✓ chassis applied to ${n} frame(s)`);
