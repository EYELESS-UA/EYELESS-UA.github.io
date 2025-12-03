# AI Coding Assistant Guidelines

## Project Overview
**L Games Studio** — a portfolio/showcase website for Ukrainian video game localizations. Single-page vanilla JavaScript app with dual-language support (Ukrainian/English), dynamic project grid rendering, and interactive visual effects.

## Architecture

### Core Data Structure (`data.js`)
- **`projectsData`**: Array of localization projects with properties:
  - `id`, `title`, `status` (`in-progress`, `done`, `planned`, `early-access`, `fundraising`)
  - Progress tracking: `progress` (overall), or component-level: `progress_text` (60% weight), `progress_textures` (30%), `progress_fonts` (10%)
  - UI: `cover`, `logo` (webp images), `gallery` (screenshot paths)
  - CTA: `cta.url`, `cta.label`/`cta.label_en`, `cta.type` (`link` or `disabled`)
  - Fundraising: optional `raised`, `goal` (in cents for "k" formatting)

### Language/i18n (`script.js`)
- **Single translation object** `translations` with `uk` and `en` keys — each contains all UI strings
- Elements use `data-i18n="key"` for content, `data-i18n-placeholder="key"` for inputs
- `setLang(lang)` function: fade-out text → swap translations → fade-in
- Language persisted to localStorage via `localStorage.setItem('lng', lang)`

### Visual Rendering
1. **Background** (`style.css`): Fixed canvas + animated blob gradients + noise overlay
2. **Particle system** (lines 139-270 in `script.js`): 
   - Canvas with particle physics: velocity, mouse attraction (200px radius), center gravity
   - Connecting lines between particles, pulsing glow effects
   - Lightweight: responsive particle count based on viewport width
3. **Game cards** (`renderGrid()` in `script.js`):
   - 3D tilt effect on hover (using `initTilt()`)
   - Parallax logo movement during tilt
   - Lazy-loaded images with version cache-busting (`?v=1.4.1`)
   - Status-based styling: color-coded progress bars, button states

### State & Filtering
- **`activeFilter`**: Global state tracking selected filter (`all`, `in-progress`, `fundraising`, `early-access`)
- **`renderGrid()`**: Main rendering function called on:
  - Language change
  - Filter button clicks
  - Search input changes
  - Data updates
- Computes **weighted progress** on-the-fly; recalculates stats per active filter

## Critical Patterns & Conventions

### Progress Calculation
```javascript
// Component-weighted approach (used when progress_text/textures/fonts defined)
60% text + 30% textures + 10% fonts = overall progress
// Falls back to simple `progress` field if components undefined
```

### Status-to-UI Mapping
| Status | Color | Bar | Button |
|--------|-------|-----|--------|
| `in-progress` | blue | neon-blue | link |
| `done` | green | neon-green | link |
| `early-access` | purple | neon-purple | link (early) |
| `fundraising` | orange | neon-orange | special fundraise button |
| `planned` | gray | muted | disabled |

### Image Version Cache-Busting
All images use `addImageVersion()` helper — appends `?v=1.4.1` to bust browser cache when assets change. Update `ASSETS_VERSION` constant when deploying new assets.

### Asset Organization
- **Covers/logos**: `assets/` root (webp format)
- **Screenshots**: `assets/screenshot/{project-id}/` (jpg)
- Paths in `data.js` use relative paths; versioning handled client-side

## Key Workflows

### Adding a New Localization Project
1. Add entry to `projectsData` array in `data.js`:
   ```javascript
   { "id": "unique-slug", "title": "Game Title", "cover": "assets/cover.webp", 
     "logo": "assets/logo.webp", "status": "in-progress", "progress": 45, 
     "desc": "UA text", "desc_en": "EN text", "cta": {...}, "gallery": [...] }
   ```
2. Upload cover/logo images to `assets/` (webp)
3. Upload screenshots to `assets/screenshot/{id}/` (jpg)
4. No rebuild needed — data-driven rendering

### Modifying UI Strings
1. Update both keys in `translations.uk` and `translations.en` in `script.js`
2. Add `data-i18n="key"` to HTML elements in `index.html`
3. Call `setLang(currentLang)` to apply or let it auto-apply on language toggle

### Styling Changes
- CSS variables in `:root` (line 1-15 of `style.css`): colors, fonts, dimensions
- Avoid hardcoded values — use CSS custom properties for theming
- Glassmorphism effect uses `--glass` rgba for consistency

## External Dependencies
- **Fonts**: Google Fonts (Space Grotesk, Inter)
- **Audio**: Easter egg sound file (`assets/sound.mp3`) triggered by "yakuza"/"якудза" search
- No build step, no npm — vanilla stack

## Common Gotchas
- **Filter/search desync**: Always call `renderGrid()` after state change
- **Language persistence**: localStorage key is `'lng'`; check for errors in older browsers
- **Image loading**: Use `loading="lazy"` and error handlers (`onerror`) for optional images (logos)
- **Modal gallery**: Separate slider logic; slides indexed from 0; check `totalSlides` before rendering
- **Stats calculations**: "AVG. READINESS" label changes to "ЗІБРАНО"/"FUNDRAISED" when fundraising filter active

## Performance Notes
- Canvas particle system scales particle count responsively (min 18, max ~viewport/70)
- Visibility API: animation pauses when tab unfocused
- Image optimization: webp for covers/logos (smaller), jpg for screenshots
