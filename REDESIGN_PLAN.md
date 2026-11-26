# Portfolio Redesign Plan — "Notebook / Scrapbook" direction

> **Status (27 Nov 2026): all phases 0–8 built on the `redesign` branch.** Remaining: EduPredict dashboard screenshot, a real Formspree test from the live site, then merge to `main`.

## 1. Where we are today

| Area | Current state |
|---|---|
| Stack | Vite 5 + React 18 + Tailwind 3 + Framer Motion + GSAP + OGL. Deployed on Vercel. |
| Look | Dark theme (black + cyan glow), WebGL "DarkVeil" hero, typing headline, PillNav. |
| Structure | One long page: Hero → tech logo loop → About (video + scrambled text) → Expertise (3 cards) → Projects (2 expandable cards) → Contact (Formspree form) → Footer. |
| Content | 2 projects (Portfolio, Movie Finder), 3 expertise blurbs, about text, socials, resume link, Formspree endpoint. |
| Assets | `portfolio.png` (1.5 MB), `movie.png` (1 MB), `about.mp4` (1 MB), 8 tech SVGs, Mangolaine font. **No photos of you, no workspace photos, no playground imagery.** |

### Housekeeping problems found
- `node_modules/` and `dist/` are committed to git, and there is no `.gitignore`.
- `tailwind.config.js` has two configs in one file (`export default` and `module.exports`).
- `package.json` has a junk dependency `"uninstall"`; `react-router-dom` is installed but not used.
- `Hero.jsx` has a class typo: `rrelative`.
- Heavy PNG/MP4 assets that are not compressed.

## 2. The target look (from the reference)

Key ingredients we'll reproduce **in our own way** (same genre, our own content, fonts and assets; no copying the template's text or images):

- **Paper canvas**: off-white lined notebook page sitting inside a grey grid "desk" frame.
- **Type system (4 voices)**:
  - Pixel/bitmap display for huge headings (`ANAND`, `ABOUT`, `MY WORK`, `CONTACT`). Candidates: *Jersey 10*, *Pixelify Sans*, *Silkscreen* (Google Fonts).
  - Handwritten for notes and margin scribbles (*Gochi Hand* / *Caveat*).
  - Monospace uppercase micro-labels (`● OPEN TO NEW WORK`, `PROJECT 01`, dates): *JetBrains Mono* / *Space Mono*.
  - Clean sans for body copy and the tagline (*Inter* / *Geist*).
- **Palette**: paper `#F4F3EF`, ink `#1A1A1A`, marker yellow `#F2C94C`, mint `#A8E0C8`, hot pink `#FF4F9A`, cobalt `#2F55D4`, green `#22B35E`, red-orange accent for the scribble box.
- **Scrapbook primitives**: sticky notes, washi-tape strips, polaroids with captions, torn-edge colored skill chips, hand-drawn arrows, red "scribble box" around the name, emoji stickers.
- **Nav**: thin top bar, active tab filled yellow, icon + mono label per item, colored social dots, outlined `CONTACT` button.
- **Projects as folder tabs**: stacked full-width cards (dark / yellow / blue) with `PROJECT 01/02/03` tabs, date, title, one-line pitch, `VIEW PROJECT ↗`, taped screenshot on the right.
- **Case study pages**: pixel title, sticky-note metadata (role, timeline, stack, year), hero image, write-up, sticky-note "results".
- **Playground**: free-form collage of taped images with handwritten labels and zoom +/-.
- **Contact**: big pixel `CONTACT` in a selection-box, sticky-note multi-step form (`NEXT (1/3)`), polaroids either side, social links underneath.
- **Closing CTA**: smiley sticker + `LET'S TALK` + handwritten line.

## 3. Content (sourced from the resume + GitHub `baymax-14`)

Positioning changes: the old site says "Front-End Developer". The resume says **Software Developer (Full-Stack & AI)**, B.Tech IT student graduating 2027, looking for an entry-level role. The new site leads with that.

### Hero
- `my name is` → **ANAND** (pixel type, red scribble box)
- Sticky tags: `Full-Stack & AI Dev` · `Amravati, IN` · `SHIPS REAL APPS` · `146 TESTS & COUNTING`
- Status line: `● OPEN TO ENTRY-LEVEL ROLES · GRADUATING 2027`
- Tagline: "I build full-stack apps that think a little — and never make things up."
- CTA: `CONTACT ME` + `RESUME ↗`

### "What's up" bio (handwritten)
B.Tech IT student at Prof. Ram Meghe Institute of Technology & Research, Amravati. Builds full-stack and AI-powered web apps with React, Node.js and Python. Cares about grounded answers, accessible UI, and tests that actually run.

### Skill chips (torn tape, color per group)
- Yellow, Frontend: React, Redux Toolkit, Tailwind, Vite
- Green, Backend: Node/Express, FastAPI, Flask, JWT/RBAC
- Pink, AI/ML: RAG, Hybrid Search, Gemini API, WebLLM, XGBoost
- Blue, Data/Ops: MongoDB, PostgreSQL, Redis, Qdrant, Docker

### Projects (folder tabs on home, full case studies at `/work/:slug`)
| # | Project | Folder | Stack | Links | Case-study facts (real numbers only) |
|---|---|---|---|---|---|
| 01 | **DocuMind AI**: privacy-first document Q&A | dark | React, FastAPI, PostgreSQL, Qdrant, Redis, Docker, WebLLM | code: github.com/baymax-14/Documind-ai | Dual mode (in-browser WebGPU / server), page-level citations, BM25 + vector hybrid search with RRF + cross-encoder rerank, JWT + tenant isolation, **146 tests / 29 suites**, OCR + screen-reader support |
| 02 | **HireHub**: AI job portal + ATS | yellow | React, Node, Express, MongoDB, Gemini | live: hirehub-green.vercel.app · code: HIRE_HUB-main | Gemini resume scoring on a **100-point rubric**, RBAC, search filters, Recharts recruiter dashboard, SMTP + HTTPS email fallback, deployed on Vercel/Render/Atlas |
| 03 | **EduPredict**: student performance prediction | blue | React, Chart.js, Flask, scikit-learn, XGBoost | live: student-performance-ivory.vercel.app · code | RF + XGBoost ensemble on the UCI dataset, risk levels with confidence + feature importance |

Smaller work on the `/work` index (no full case study): CineScope movie app (AngularJS + TMDB, live on GitHub Pages), Hospital DB management system (SQL), Brick Breaker (Python/Pygame), this portfolio.

### Playground
Brick Breaker gameplay, CineScope screens, DocuMind "Instrument Sheet" UI, HireHub dashboard, EduPredict charts, architecture sketches, CodeVita certificate. Most can be screenshotted straight from the live demos.

### About page extras
- **Education:** B.Tech IT, Prof. Ram Meghe Institute of Technology & Research (exp. 2027); HSC PCM 2021–2023
- **Certifications:** AICTE × EduSkills AI-ML Virtual Internship, supported by Google for Developers (Jul–Sep 2024); IIT Guwahati × Masai School AI & ML program
- **Achievements:** TCS CodeVita Season 13 global rank certificate; Adobe India Hackathon 2025 (Round 1)

### "Built with" strip
Replaces the reference's "trusted by" client logos so we don't claim clients: React, Node, Python, FastAPI, MongoDB, PostgreSQL, Docker, Tailwind.

### Contact
Email, LinkedIn, GitHub, existing Formspree endpoint. **The phone number from the resume stays off the public site.**

## 4. Still needed from you
1. **A photo of you** (polaroids + nav avatar), optionally a desk/workspace photo.
2. **An updated resume link.** The Google Docs link in About.jsx may point to an old version; I can host the PDF in `/public` instead.
3. OK to screenshot your live demos (HireHub, EduPredict, CineScope) for project cards. DocuMind has no live demo, so a screenshot or short screen recording from you would help.
4. Approval of the hero tagline and sticky tags above.

## 5. Build phases

### Phase 0 — Cleanup (small, do first)
- Create a branch `redesign`.
- Add `.gitignore` (`node_modules`, `dist`), untrack them.
- Fix `tailwind.config.js`, drop the `uninstall` dependency.
- Remove what the new design won't use: `DarkVeil` + `ogl`, `ScrambledText`, `PillNav`, `ScrollProgress`, `ExpandableCard`, `LogoLoop` (and `gsap` if nothing else needs it).

### Phase 1 — Design system
- Tailwind theme tokens: colors, font families, shadows (`paper`, `polaroid`, `sticky`), rotation utilities.
- Load fonts via Google Fonts in `index.html` (keep Mangolaine only if we still use it).
- `PaperCanvas` layout: grey grid desk background + lined paper page (pure CSS gradients, no images).
- Primitive components in `src/components/ui/`:
  `StickyNote`, `Tape`, `Polaroid`, `TornChip`, `MonoLabel`, `HandNote`, `Arrow` (SVG), `ScribbleBox`, `Sticker`, `PixelHeading`.

### Phase 2 — Routing + shell
- React Router routes: `/` Home, `/about`, `/work`, `/work/:slug`, `/playground`, `/contact`.
- `Navbar` with yellow active tab, social dots (LinkedIn / GitHub / Freelancer), `CONTACT` button; collapses to a menu on mobile.
- Page transition (paper slide / fade) with Framer Motion; scroll-to-top on route change.
- `vercel.json` rewrite already supports SPA routes.

### Phase 3 — Home page
Hero → about teaser ("what's up") → skill chips → stacked project folders → "built with" strip → `LET'S TALK` CTA.

### Phase 4 — Work + case studies
- `src/data/projects.js` as the single source (slug, title, date, pitch, tags, role, timeline, stack, images, sections, links).
- `/work` index: `MY WORK` pixel heading + project cards with date pills.
- `/work/:slug` template: pixel title, sticky-note metadata, hero image, story sections, results notes, demo/code buttons, next-project link.

### Phase 5 — About page
Pixel `ABOUT`, side tabs (Main bio / Skills / Now), long bio on a ruled sticky card, polaroid, resume download, short timeline (education, freelance work).

### Phase 6 — Playground
Collage canvas: taped images with handwritten labels, draggable (Framer Motion `drag`), zoom +/- controls, lightbox on click. Static grid fallback on mobile.

### Phase 7 — Contact
Pixel `CONTACT` in a selection box with corner handles, sticky-note 3-step form (name → email → message) posting to the existing Formspree endpoint, success/error states, polaroids on each side, social row.

### Phase 8 — Motion, responsive, performance, polish
- Micro-interactions: stickers wobble on hover, polaroids straighten on hover, tape peel, chips lift.
- `prefers-reduced-motion` respected.
- Mobile layouts for every page (stacked folders, smaller pixel type, no overlapping collage).
- Compress images to WebP/AVIF, lazy-load, drop `about.mp4` if unused.
- Meta tags + OG image, favicon, accessible focus states, alt text, color contrast check.
- Final build + Vercel preview deploy.

## 6. Suggested order of work
Phase 0 → 1 → 2 → 3 (first visible milestone: new home page live locally) → 7 → 4 → 5 → 6 → 8.
All copy lives in `src/data/` (`profile.js`, `projects.js`, `skills.js`) so text updates never touch layout code.
Contact comes early because it's the page that actually earns you work.
