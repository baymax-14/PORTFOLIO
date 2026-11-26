# Anand Rathod: Portfolio

My personal site: a scrapbook on notebook paper, with sticky notes, taped polaroids and pixel lettering.
Live at **[portfolio-anandrathod.vercel.app](https://portfolio-anandrathod.vercel.app/)**.

## Pages

| Route | What's there |
|---|---|
| `/` | Hero, short bio with skills, stacking project folders, "built with", Let's Talk |
| `/about` | Bio, full skills board, journey timeline, resume |
| `/work` | Featured projects + side quests |
| `/work/:slug` | Case studies: problem, what I built, how it works, real numbers |
| `/playground` | Draggable photo collage with zoom and a lightbox |
| `/contact` | Three-step sticky-note form (Formspree) |

## Stack

React 18 · Vite 5 · Tailwind CSS 3 · React Router 7 · Framer Motion (LazyMotion) · React Icons · Formspree · Vercel

## Editing content

All copy lives in `src/data/`, so text changes never touch layout code:

- `profile.js`: name, role, tagline, email, socials, resume link, photos
- `projects.js`: featured projects, case studies, side quests
- `skills.js`: home skill chips, About skills board, "built with" strip
- `journey.js`: About timeline
- `playground.js`: collage items and their positions

Images go in `public/images/` as WebP (`projects/` for screenshots). Full-size originals are kept in `originals/` and are not deployed.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Contact

[LinkedIn](https://www.linkedin.com/in/anand-rathod-b95b14290/) · [GitHub](https://github.com/baymax-14) · anand2005rathod@gmail.com
