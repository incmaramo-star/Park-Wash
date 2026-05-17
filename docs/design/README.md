# Design Reference

This folder holds the **read-only** design handoff from Claude Design
(bundle `MM8VXwOrJaMoweEmLZdxrQ`, fetched 2026-05-17).

It is reference material. Production code must **not** import from here.

## What lives where

| Purpose | Canonical location | Reference here |
|---|---|---|
| Design tokens (colors, type, spacing, radii, shadows) | `src/styles/tokens.css` | — |
| Logo SVGs (primary, mono, wordmark, app-icon, favicon) | `public/brand/logo/` | — |
| Logo PNG exports + favicons + app icons | `public/brand/logo/png/` | — |
| Root favicons (auto-served by Next.js) | `public/favicon.svg`, `public/favicon-16.png`, `public/favicon-32.png`, `public/apple-touch-icon.png` | — |
| Original logo source PNGs from owner | `public/brand/source/` | — |
| Original brand brief from owner | — | `bedrijfsidentiteit.docx` |
| Full brand guide (HTML prototype) | — | `Park&Wash Brand Guidelines.html` |
| Section components (React + Babel-in-browser) | — | `components/*.jsx` |
| Bundle handoff README (verbatim) | — | `BUNDLE_README.md` |
| Designer ↔ owner chat transcript | — | `chat-transcript.md` |

## Why the HTML/JSX are reference, not production

Per `BUNDLE_README.md`:

> The design medium is HTML/CSS/JS — these are prototypes, not production code.
> Your job is to recreate them pixel-perfectly in whatever technology makes
> sense for the target codebase.

The Next.js setup task (see `docs/PLAN.md` Fase 1, step 1) will:

- Import `src/styles/tokens.css` from `globals.css`
- Map the `--pw-*` custom properties into the Tailwind theme
- Wire `next/font` for Poppins (display) and Montserrat (body)
- Serve favicons from `public/`

When a future page or component needs exact specs (e.g. the type scale,
the color spec sheet with HEX/RGB/CMYK/HSL/Pantone/RAL, the icon set,
the spacing/radii samples, or the application mockups), the source of
truth is:

- Colors → `components/sections-3-color.jsx`
- Typography → `components/sections-4-type.jsx`
- Icons & spacing → `components/sections-5-icons-spacing.jsx`
- Applications (business card, polo, social, web/app mockups) → `components/sections-6-apps.jsx`
- Logo construction, clear-space, don'ts → `components/sections-2-logo.jsx`

## Re-fetching

If the bundle is updated upstream, fetch
`https://api.anthropic.com/v1/design/h/MM8VXwOrJaMoweEmLZdxrQ` (gzipped
tar) and replace the contents of this folder plus the canonical paths
above. Do **not** edit anything inside `docs/design/` by hand.
