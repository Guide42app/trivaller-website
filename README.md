# website-trivaller

Marketing website for Trivaller – the travel planning app.

## Tech stack

- React + Vite
- Tailwind CSS
- Framer Motion

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## HTTPS website + HTTP-only API on EC2

Browsers block `https://yoursite.com` from calling `http://EC2:8080` (mixed content). They also cannot use `https://EC2_IP:8080` unless something actually terminates TLS on that host.

**Option A — Vercel proxy (no TLS on EC2 yet)**

1. In Vercel → Project → **Environment Variables**, add  
   `BACKEND_HTTP_ORIGIN` = `http://YOUR_EC2_PUBLIC_IP:8080` (no `/api`).
2. For production builds, set  
   `VITE_API_BASE_URL` = `/api/trivaller-backend`  
   (relative path; `vercel.json` rewrites to `/api/ec2-proxy/*` and `api/[...slug].js` forwards to Spring’s `/api/...`).
3. Redeploy the site.

**Local dev** with the same URL shape: use `VITE_API_BASE_URL=/api/trivaller-backend` in `.env`; Vite proxies to Spring (default `http://127.0.0.1:8081`, override with `VITE_DEV_BACKEND_ORIGIN` if needed).

**Option B — TLS on the API** (nginx + Let’s Encrypt on a hostname such as `api.trivaller.com` proxying to `http://127.0.0.1:8080`), then set `VITE_API_BASE_URL=https://api.trivaller.com/api`.

### “Login failed (405)” or “404” on `/api/trivaller-backend/...`

1. **405** — SPA rewrite was catching `/api/*` (fixed: `vercel.json` excludes `api/` from the HTML fallback).
2. **404** — Nested `api/trivaller-backend/[...path].js` often doesn’t register on Vercel. This repo uses a **rewrite** to `/api/ec2-proxy/:path*` and a root **`api/[...slug].js`** handler that forwards to Spring. Redeploy after pulling.
