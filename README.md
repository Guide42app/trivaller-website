# Trivaller Website

Premium marketing site for **Trivaller** — Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion + GSAP ScrollTrigger.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Next.js development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |

## Environment

See `.env.example`.

- **`DEV_BACKEND_ORIGIN`** — local rewrite target for `/api/trivaller-backend/*` (default `http://127.0.0.1:8080`, NestJS)
- **`NEXT_PUBLIC_API_BASE_URL`** — browser API base for the admin panel (prefer `/api/trivaller-backend`)
- **`BACKEND_HTTP_ORIGIN`** — Vercel serverless proxy target (`app/api/trivaller-backend`)

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Landing page |
| `/admin` | Moderation admin |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/support` | Support |

## Stack notes

- Leaflet maps load client-only (`ssr: false`) in the trip planner demo.
- Landing demos use sample content in `data/content.ts` and do not call live AI or deal APIs.
- Production API access on Vercel uses the same-origin proxy rewrite in `vercel.json`.
