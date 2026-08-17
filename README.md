# tayori-web

Landing page for **[Tayori](https://github.com/cflarios/Tayori)** — the real-time AI
assistant for meetings and interviews that stays invisible when you share your screen.

Built with **React + Vite + TypeScript + Tailwind CSS v4**, deployed on **Cloudflare
Workers** (static assets + a tiny Worker). Bilingual **EN/ES** with a language toggle.

The **Download** button hits `/download`, a Worker route that resolves the newest
Windows portable `.exe` from the latest [Tayori GitHub release](https://github.com/cflarios/Tayori/releases/latest)
at request time — so it never goes stale when a new version ships.

## Develop

```bash
npm install
npm run dev       # Vite dev server (the page only)
npm run cf-dev    # build + wrangler dev — the full Worker, incl. /download
```

`npm run dev` serves the page but **not** the `/download` redirect (that lives in the
Worker). Use `npm run cf-dev` to exercise the redirect locally.

## Build

```bash
npm run build     # tsc + vite build → dist/
```

## Deploy

The site auto-deploys on every push to `main`. There are two ways to wire it; pick one.

### Option A — Cloudflare Git integration (zero-config, recommended)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository**.
2. Select `cflarios/tayori-web`.
3. Build command `npm run build`, deploy command `npx wrangler deploy`. Cloudflare
   reads the rest from `wrangler.jsonc`.
4. Every push to `main` builds and deploys automatically. You can delete
   `.github/workflows/deploy.yml` if you use this path.

### Option B — GitHub Actions

`.github/workflows/deploy.yml` deploys with `wrangler-action`. Add two repository
secrets (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_API_TOKEN` — a token with the **Edit Cloudflare Workers** template.
- `CLOUDFLARE_ACCOUNT_ID` — from the Cloudflare dashboard sidebar.

### Manual

```bash
npx wrangler login
npm run deploy
```

## Structure

```
worker/index.ts      Cloudflare Worker: /download redirect + static asset fallback
wrangler.jsonc       Worker + static-assets config (run_worker_first on /download)
index.html           HTML shell, meta/OG tags, fonts
src/
  main.tsx           React entry
  App.tsx            Section layout
  i18n.tsx           Bilingual EN/ES copy + language context
  icons.tsx          Inline SVG icon set
  useLatestRelease.ts  Live version badge from the GitHub API
  components/        Nav, Hero, OverlayMock, Sections, Download, Footer, Reveal
  index.css          Tailwind v4 theme + design system
public/
  favicon.svg, og.svg
```

## License

GPL-3.0-only. See [LICENSE](LICENSE).
