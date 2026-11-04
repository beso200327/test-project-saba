# Mosslight Forest

An editable, deterministic Three.js forest level. No asset services or credentials.

## Run locally

Node.js 24 or later. Run `npm ci`, then `npm run dev -- --port 5173` from this directory. Open http://localhost:5173. `npm run build` checks TypeScript and builds production assets; `npm run preview` serves the build.

Top View fits the complete map with north at the top. Inspect enables left-drag orbit, right-drag pan, and wheel/pinch zoom. Top View restores the exact overhead camera. Export GLB regenerates actual geometry and validates it by reimport. Save PNG captures a clean 1080 × 1920 overhead image without page controls.

## Edit the world

- `src/level-data.ts`: cross-section controls are `[z, centerX, usableHalfWidth]`, ordered south to north. Edit these to change the route, arena widths and offsets. `areas` documents the seven region centers. Y is height, north is -Z.
- `palette` in the same file controls grass, tree, rock and trunk colors. Terrain applies a subtle continuous color variation.
- `src/props.ts`: change the tree grid steps (2.65 and 2.75) and skip probability to adjust density. Placement checks the same walkable region plus canopy clearance. Seed 7241 fixes generation.
- `src/terrain.ts`, `lighting.ts`, `camera.ts`, `export.ts`, and `main.ts` separate terrain, light rig, view controls, GLB handling, and viewer wiring.

All exportable objects belong to `levelRoot`, grouped into Terrain, Forest boundaries, Trees, Rocks, Small decorations and Treasure chest. Lights and camera stay outside it. Instanced batches become ordinary meshes only in the export clone, retaining groups and local transforms. GLB does not bake preview lighting.

## Verification and deliverables

`npm run validate` uses Playwright and `/usr/bin/chromium` with software WebGL to capture desktop/mobile views, exercise orbit/reset, create `artifacts/forest-level.glb` and `artifacts/forest-level.png`, and reload the GLB into a fresh scene. Results, actual triangle/draw-call counts and console errors are in `artifacts/validation.json`. Chromium executable path can be adjusted in `scripts/validate.mjs` for another machine. Draw calls include the shadow pass; hardware frame-rate performance is not established by software rendering.

Use the existing checkout in each isolated cloud task; no additional worktree is needed. Live preview processes must be restarted in new tasks.
