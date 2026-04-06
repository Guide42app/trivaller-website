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

### Admin panel on **localhost**

1. Start the API (default **8081**): from `trivallerapp-backend` run `./gradlew bootRun` (with DB + `application-local` as you already use).
2. Apply migrations so the seeded admin exists (e.g. Flyway **V33**): email **`admin@trivaller.internal`**, password **`TrivallerAdmin2026!`** (see backend `V33__seed_website_admin_user.sql`).
3. From this repo: `npm run dev`, then open **`http://localhost:5173/admin`** (port shown in the terminal if different).
4. The dev server proxies **`/api/trivaller-backend/*`** → **`http://127.0.0.1:8081/api/*`**. If your API uses another host/port, set **`VITE_DEV_BACKEND_ORIGIN`** in `.env` and restart Vite.

Do not use **`https://localhost`** for the site while the API is **`http://`** — the browser will block it (mixed content). Use plain **`http://localhost:5173`** for local admin.

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
   (relative path; `api/trivaller-backend/[...path].js` forwards to Spring’s `/api/...`).
3. After deploy, open **`https://trivaller.com/api/health`** — if that 404s, Vercel is not deploying the `api/` folder (check **Root Directory** = repo folder that contains `api/`, not only `dist`).
4. Redeploy the site.

**Local dev** with the same URL shape: use `VITE_API_BASE_URL=/api/trivaller-backend` in `.env`; Vite proxies to Spring (default `http://127.0.0.1:8081`, override with `VITE_DEV_BACKEND_ORIGIN` if needed).

**Option B — TLS on the API** (nginx + Let’s Encrypt on a hostname such as `api.trivaller.com` proxying to `http://127.0.0.1:8080`), then set `VITE_API_BASE_URL=https://api.trivaller.com/api`.

### “Login failed (405)” or “404” on `/api/trivaller-backend/...`

1. **405** — SPA rewrite was catching `/api/*` (fixed: `vercel.json` excludes `api/` from the HTML fallback).
2. **404** — Root `api/[...slug].js` often doesn’t register on Vercel with Vite; this repo uses **`api/trivaller-backend/[...path].js`** instead (no rewrite). Test **`/api/health`** after deploy.

### Admin `/admin` checklist

- **Vercel:** `BACKEND_HTTP_ORIGIN=http://EC2_IP:8080` (no `/api`). Root Directory must be the app root (folder containing `api/` + `vercel.json`). The proxy sets the correct `Host` header for Tomcat.
- **Spring:** `server.servlet.context-path=/api` (already set). Login is `POST /api/auth/login` (same path the proxy forwards to).
- **If `VITE_API_BASE_URL` is unset** on an HTTPS deploy, the admin page defaults to `/api/trivaller-backend` (the proxy).
