# Open Mosslight Forest on your Mac

1. Install Node.js 24 LTS for macOS from https://nodejs.org/ (Apple Silicon or Intel as appropriate). Close and reopen Terminal after installation.
2. Extract mosslight-forest.zip in Finder. It contains a folder named mosslight-forest. Move that folder to Downloads if your browser extracted it elsewhere.
3. Open Terminal and run:

```sh
cd ~/Downloads/mosslight-forest
node --version
npm ci
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Node should report v24.x or newer. Keep Terminal open while exploring. Open http://127.0.0.1:5173 in Safari or Chrome. If port 5173 is occupied, stop the other process or use `--port 5174` and open http://127.0.0.1:5174 instead.

## Explore

- Top View: full map from directly above, north at top.
- Inspect: click and drag to rotate; scroll or pinch to zoom; right-drag to pan (two-finger click and drag on a configured Mac trackpad).
- Top View resets the camera after inspection.
- Export GLB downloads actual environment geometry.
- Save PNG downloads a clean overhead image.

The artifacts directory already contains the GLB and PNG. Source, lockfile, production build, screenshots, and validation results are included. No API keys or asset downloads are required at runtime; npm ci needs Internet access once to install packages. Do not open index.html directly with Finder; run the server above.

Stop the server with Control-C. To run again, use the same cd command and npm run dev command; npm ci is only needed initially or after dependency changes.

## Optional verification on macOS

The default validation script targets cloud Chromium. To run it on your Mac:

```sh
npx playwright install chromium
PLAYWRIGHT_CHROMIUM_EXECUTABLE="$(node --input-type=module -e 'import {chromium} from "playwright"; console.log(chromium.executablePath())')" npm run validate
```

Keep the dev server running in another Terminal window. `npm run build` runs the TypeScript check and builds production assets. See README.md for layout and palette editing instructions.
