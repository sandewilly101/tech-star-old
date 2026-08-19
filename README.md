# TechStar Innovation Hub — Website

Marketing site for [TechStar Innovation Hub](https://techstar-innovation-hub.onrender.com),
Tanzania's platform for hands-on STEM, coding, AI, IoT and robotics education.

Rebuilt from a static Bootstrap template into a modern React single-page app.

---

## Stack

| Concern        | Choice                                                       |
| -------------- | ------------------------------------------------------------ |
| Build          | [Vite 7](https://vite.dev)                                    |
| UI             | [React 19](https://react.dev)                                 |
| Routing        | [React Router 7](https://reactrouter.com) (declarative mode)  |
| Styling        | [Tailwind CSS v4](https://tailwindcss.com) — CSS-first config |
| Animation      | [Motion 12](https://motion.dev) (`motion/react`)              |
| Smooth scroll  | [Lenis](https://lenis.darkroom.engineering)                   |
| Carousel       | [Embla](https://www.embla-carousel.com)                       |
| Icons          | [react-icons](https://react-icons.github.io) (Lucide + FA6)   |
| Linting        | ESLint 9 flat config + React / Hooks / Refresh plugins        |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # production bundle → dist/
npm run preview    # serve the production build locally
npm start          # serve dist/ on $PORT (used by hosts that run a web service)
npm run lint       # ESLint
```

## Project layout

```
index.html                 Vite entry — document head, SEO meta, JSON-LD, theme bootstrap
public/                    Copied verbatim to the site root
  assets/img/              All photography and logos (paths unchanged from the old site)
  robots.txt, sitemap.xml, _redirects
src/
  main.jsx                 React root
  App.jsx                  Routes (Home eager, every other page lazily loaded)
  styles/index.css         Tailwind v4 theme: brand scales, semantic tokens, keyframes, helpers
  data/                    All site copy — site config, nav, programs, team, content
  lib/                     cn(), image fallbacks, the named icon registry, shared variants
  hooks/                   Theme, media queries, smooth scroll, SEO, course API
  components/
    ui/                    Design-system primitives (Button, SmartImage, Reveal, Cards, …)
    layout/                RootLayout, Navbar, Footer, PageHero, BackToTop
    sections/              Composed page sections, reused across routes
  pages/                   One file per route
legacy/                    The original static HTML site, kept for reference only
```

## Design system

Everything is driven by tokens in `src/styles/index.css`.

- **Brand colours** come straight from the TechStar logo: navy `#070640` and
  ember/orange `#f7921e`, each expanded into a 50–950 scale. Two supporting hues
  (`plasma`, `aqua`) exist only for gradients and glows, so the brand pair always
  stays dominant.
- **Semantic tokens** (`canvas`, `surface`, `ink`, `hairline`, …) are the ones
  components actually use. They are redefined under `.dark`, which is how the
  whole site flips theme from one class on `<html>`.
- **Dark mode** is class-based, persisted in `localStorage`, and applied by a tiny
  inline script in `index.html` before first paint so there is no flash.
- **Motion** is centralised: `<Reveal>`, `<RevealGroup>` and `<RevealText>` give
  every section the same entrance curve. Every animation — including the CSS
  keyframes — collapses to a static state under `prefers-reduced-motion: reduce`.

### Editing content

Copy lives in plain JS modules, not in JSX:

| File                  | Contains                                                    |
| --------------------- | ----------------------------------------------------------- |
| `src/data/site.js`    | Contact details, socials, API endpoints                     |
| `src/data/nav.js`     | Header navigation and the Programs mega-menu                |
| `src/data/content.js` | Hero slides, stats, services, why-us, process, testimonials, partners, events, FAQ |
| `src/data/programs.js`| The five bootcamps (also generates their routes)            |
| `src/data/team.js`    | Founder, team members, advisory board                       |

Adding a programme to `programs.js` automatically adds it to the home showcase,
the programmes page, the footer, the mega-menu and its own detail route.

## Live data

The course catalogue is still served by the existing TechStar admin backend:

- `GET /courses/api/fetch-courses/` — catalogue (`/courses`)
- `GET /api/course-details/:id` — single course (`/courses/:id`)
- `POST /forms/newsletter` — newsletter signup (footer)

Endpoints are configured in `src/data/site.js`. That service sleeps when idle, so
both course views render skeletons while loading and an explicit retry state if
the request fails — rather than silently showing nothing.

The contact form composes a pre-filled `mailto:` message, since the site is
deployed as static files and the old `forms/contact.php` endpoint no longer
exists. WhatsApp, phone and email are offered alongside it.

## Deployment

The build output in `dist/` is plain static files.

Because this is a single-page app, the host must rewrite unknown paths to
`index.html` or deep links like `/programs/kids-stem-iot-robotics-bootcamps`
will 404 on a hard refresh. That rule is already configured:

- **Render** — `render.yaml` at the repo root (static site, rewrite `/*` → `/index.html`).
- **Netlify / Cloudflare Pages** — `public/_redirects`.
- **Other hosts** — point the SPA fallback at `dist/index.html`.

If you deploy as a web service instead of a static site, `npm start` serves
`dist/` on `$PORT` with the SPA fallback already handled by Vite's preview server.
