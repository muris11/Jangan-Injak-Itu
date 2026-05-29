# Mobile: Fullscreen & Landscape Overlay

## Problem
Mobile players need a proper fullscreen game experience and clear guidance when holding the phone in portrait mode during gameplay.

## Design

### 1. Auto Fullscreen on Mobile
- When game starts (user clicks "Mulai" or starts solo), auto-request fullscreen via `document.documentElement.requestFullscreen()`
- Chained from the same user gesture (click) so browser allows it
- Non-critical: if fullscreen fails (user denied, API unsupported), game continues normally with no error state
- A small fullscreen toggle button appears in the top-right of `.game-frame` on all devices for manual control

### 2. Landscape Overlay
- New `LandscapeOverlay` component
- Detects portrait orientation via `matchMedia("(orientation: portrait)")` — only activates on touch/coarse devices
- Shows centered overlay: rotation icon + "Putar HP ke landscape" text
- Overlay has `pointer-events: none` so game behind still receives events (though hidden)
- Hidden in landscape or on non-mobile devices

### 3. Files Changed

| File | Change |
|------|--------|
| `components/game/PlayClient.tsx` | Import + render `LandscapeOverlay`; call `requestFullscreen` on game start when mobile |
| `components/game/LandscapeOverlay.tsx` | New component: orientation detection + overlay UI |
| `components/game/GameHud.tsx` | Add fullscreen toggle button |
| `app/globals.css` | Styles for overlay, fullscreen button |

### 4. Non-Changes
- Phaser config untouched (1280×720, Scale.FIT already handles resize)
- No new dependencies
- No orientation lock API (browser support inconsistent; overlay is reliable)
