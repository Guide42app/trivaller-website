import { useCallback, useEffect, useState } from 'react'
import trivallerIcon from '../assets/trivallericon.png'

const TOKEN_KEY = 'trivaller_admin_token'

const TYPE_LABELS = {
  POST: 'Post',
  GUIDE: 'Guide',
  PLACE_DETAILS: 'Place details',
  BUSINESS: 'Business',
}

function typeLabel(type) {
  return TYPE_LABELS[type] || type || 'Item'
}

function hostnameLooksLikeIpv4(urlString) {
  try {
    const host = new URL(urlString).hostname
    return /^\d{1,3}(\.\d{1,3}){3}$/.test(host)
  } catch {
    return false
  }
}

/** Same-origin proxy on Vercel (api/trivaller-backend/[...path].js + BACKEND_HTTP_ORIGIN). */
const PROXY_API_BASE = '/api/trivaller-backend'

/**
 * On HTTPS production pages, if VITE_API_BASE_URL points at a public IPv4 (typical EC2 mistake:
 * https://1.2.3.4:8080/api or http://1.2.3.4:8080/api), use the Vercel proxy instead so the
 * browser never talks to the IP directly. Requires BACKEND_HTTP_ORIGIN on Vercel.
 */
function effectiveApiBaseForHttpsSite(fromEnv) {
  const base = fromEnv.replace(/\/$/, '')
  if (import.meta.env.VITE_DISABLE_IP_API_PROXY === 'true') {
    return base
  }
  if (!import.meta.env.PROD || typeof window === 'undefined') {
    return base
  }
  if (window.location.protocol !== 'https:') {
    return base
  }
  try {
    const u = new URL(base)
    const host = u.hostname
    const isPublicIpv4 = /^\d{1,3}(\.\d{1,3}){3}$/.test(host)
    const isLoopback = host === 'localhost' || host === '127.0.0.1'
    if (!isPublicIpv4 || isLoopback) {
      return base
    }
    if (u.protocol === 'https:' || u.protocol === 'http:') {
      return PROXY_API_BASE
    }
  } catch {
    // keep base
  }
  return base
}

/** Same convention as the mobile app: base URL includes Spring’s /api context path (or proxy path). */
function resolveApiBase() {
  const fromEnv = import.meta.env.VITE_API_BASE_URL?.trim()
  if (fromEnv) {
    return effectiveApiBaseForHttpsSite(fromEnv)
  }
  if (import.meta.env.DEV) {
    // Same-origin via Vite proxy (vite.config.js) — no CORS, same path as Vercel
    return PROXY_API_BASE
  }
  // Production HTTPS (e.g. Vercel): same-origin proxy avoids mixed content without env mistakes
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    return PROXY_API_BASE
  }
  return ''
}

/**
 * Browsers block HTTPS pages from calling http:// APIs (mixed content) — shows as "Failed to fetch".
 */
function explainNetworkError(apiBase, err) {
  const pageHttps =
    typeof window !== 'undefined' && window.location.protocol === 'https:'
  const apiHttp = apiBase.startsWith('http://')
  if (pageHttps && apiHttp) {
    return 'Your site uses HTTPS but VITE_API_BASE_URL is HTTP. Browsers block that. Use HTTPS on EC2 (nginx + Let’s Encrypt) and set VITE_API_BASE_URL to https://your-api-domain/api — or test admin from http://localhost only during dev.'
  }
  if (
    pageHttps &&
    apiBase === PROXY_API_BASE &&
    err instanceof TypeError &&
    String(err.message).includes('fetch')
  ) {
    return `Could not reach ${apiBase} (Vercel → EC2 proxy). In Vercel → Environment Variables add BACKEND_HTTP_ORIGIN=http://YOUR_EC2_IP:8080 (no /api), redeploy, and ensure EC2 security group allows inbound 8080 from the internet (or from Vercel if you lock it down).`
  }
  if (err instanceof TypeError && String(err.message).includes('fetch')) {
    const isLocalDev = import.meta.env.DEV
    if (isLocalDev && apiBase === PROXY_API_BASE) {
      return `Could not reach ${apiBase}. Start the backend (e.g. cd trivallerapp-backend && ./gradlew bootRun). Default API is http://127.0.0.1:8081 — if yours uses another port, set VITE_DEV_BACKEND_ORIGIN in trivaller-website/.env and restart npm run dev.`
    }
    if (
      isLocalDev &&
      (apiBase.includes('localhost') || apiBase.includes('127.0.0.1'))
    ) {
      return `Could not reach ${apiBase}. Start the backend on that host/port (e.g. ./gradlew bootRun), or use VITE_API_BASE_URL=/api/trivaller-backend with the Vite proxy (see README).`
    }
    if (apiBase.startsWith('https://') && hostnameLooksLikeIpv4(apiBase)) {
      return `Could not reach ${apiBase}. A raw EC2 IP almost never serves HTTPS on 8080 (Spring is HTTP there). Fix: use http://IP:8080/api only from an HTTP page (e.g. local dev), or put TLS on a real hostname (nginx + Let’s Encrypt), or use the Vercel proxy: VITE_API_BASE_URL=/api/trivaller-backend and BACKEND_HTTP_ORIGIN=http://IP:8080 — see trivaller-website README and .env.example.`
    }
    return `Could not reach ${apiBase}. Check EC2 security group (inbound port), the URL/port, and that the backend allows CORS for this site.`
  }
  return err instanceof Error ? err.message : 'Request failed'
}

async function apiLogin(apiBase, email, password) {
  let r
  try {
    r = await fetch(`${apiBase}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
  } catch (err) {
    throw new Error(explainNetworkError(apiBase, err))
  }
  const data = await r.json().catch(() => ({}))
  if (!r.ok) {
    throw new Error(data.message || data.error || `Login failed (${r.status})`)
  }
  const token = data.access_token || data.accessToken
  if (!token) {
    throw new Error('No access token in response')
  }
  return token
}

async function apiPending(apiBase, token) {
  let r
  try {
    r = await fetch(`${apiBase}/admin/moderation/pending?limit=50`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (err) {
    throw new Error(explainNetworkError(apiBase, err))
  }
  if (r.status === 401 || r.status === 403) {
    throw new Error('unauthorized')
  }
  if (!r.ok) {
    throw new Error(`Failed to load queue (${r.status})`)
  }
  return r.json()
}

async function apiAction(apiBase, path, token, type, id) {
  let r
  try {
    r = await fetch(`${apiBase}/admin/moderation/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ type, id }),
    })
  } catch (err) {
    throw new Error(explainNetworkError(apiBase, err))
  }
  if (!r.ok) {
    throw new Error(`Action failed (${r.status})`)
  }
}

function Spinner({ className = '' }) {
  return (
    <svg
      className={`size-5 animate-spin text-[var(--color-primary)] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

function EmptyQueueIllustration() {
  return (
    <div
      className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-[var(--color-primary-muted)] text-[var(--color-primary)]"
      aria-hidden
    >
      <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </div>
  )
}

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900/80">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">{label}</p>
      <p className={`mt-1 font-display text-2xl font-semibold tabular-nums ${accent}`}>{value}</p>
    </div>
  )
}

function EntryRow({ entry, onApprove, onReject, busy }) {
  const img = entry.imageUrl
  const label = typeLabel(entry.type)
  return (
    <li className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm transition-all duration-200 hover:border-[var(--color-primary-muted)] hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900/90 dark:hover:border-emerald-900/50">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {img ? (
          <img
            src={img}
            alt=""
            className="h-28 w-28 shrink-0 rounded-xl object-cover ring-1 ring-black/5 dark:ring-white/10"
          />
        ) : (
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-xs text-neutral-400 ring-1 ring-black/5 dark:bg-neutral-800 dark:text-neutral-500 dark:ring-white/5">
            No preview
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-[var(--color-primary-muted)] px-2.5 py-0.5 text-xs font-semibold text-[var(--color-primary-dark)] dark:text-emerald-300">
              {label}
            </span>
            {entry.createdAt && (
              <span className="text-xs text-[var(--color-text-muted)]">
                {new Date(entry.createdAt).toLocaleString()}
              </span>
            )}
          </div>
          <p className="font-display text-lg font-semibold text-[var(--color-text-primary)] dark:text-neutral-100">
            {entry.title || 'Untitled'}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            <span className="text-[var(--color-text-muted)]">Author</span>{' '}
            {entry.authorName || '—'}
            {entry.authorUserId != null && (
              <span className="text-[var(--color-text-muted)]"> · user #{entry.authorUserId}</span>
            )}
          </p>
          {entry.postId != null && (
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">Post id · {entry.postId}</p>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-start">
          <button
            type="button"
            disabled={busy}
            onClick={() => onApprove(entry.type, entry.id)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-dark)] disabled:pointer-events-none disabled:opacity-45"
          >
            Approve
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => onReject(entry.type, entry.id)}
            className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:pointer-events-none disabled:opacity-45 dark:border-red-900/60 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            Reject
          </button>
        </div>
      </div>
    </li>
  )
}

function Section({ title, entries, onApprove, onReject, busy }) {
  const count = entries?.length ?? 0
  return (
    <section className="mb-12 scroll-mt-24">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2 border-b border-[var(--color-border)] pb-3 dark:border-neutral-800">
        <div>
          <h2 className="font-display text-xl font-semibold text-[var(--color-text-primary)] dark:text-neutral-100">
            {title}
          </h2>
          <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
            {count === 0 ? 'Nothing waiting in this queue' : `${count} pending`}
          </p>
        </div>
        {count > 0 && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
            {count} to review
          </span>
        )}
      </div>
      {!entries?.length ? (
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg-elevated)]/60 px-6 py-12 text-center dark:border-neutral-700 dark:bg-neutral-900/40">
          <EmptyQueueIllustration />
          <p className="text-sm font-medium text-[var(--color-text-secondary)]">Queue is clear</p>
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">New submissions will show up here.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {entries.map((e) => (
            <EntryRow key={`${e.type}-${e.id}`} entry={e} onApprove={onApprove} onReject={onReject} busy={busy} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default function AdminModeration() {
  const apiBase = resolveApiBase()

  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY))
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [busy, setBusy] = useState(false)

  const load = useCallback(
    async (t) => {
      setLoading(true)
      setError('')
      try {
        const json = await apiPending(apiBase, t)
        setData(json)
      } catch (e) {
        if (e.message === 'unauthorized') {
          sessionStorage.removeItem(TOKEN_KEY)
          setToken(null)
          setError('Session expired or not an admin. Sign in again.')
        } else {
          setError(e.message || 'Failed to load')
        }
      } finally {
        setLoading(false)
      }
    },
    [apiBase],
  )

  useEffect(() => {
    if (token && apiBase) {
      load(token)
    }
  }, [token, load, apiBase])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const t = await apiLogin(apiBase, email.trim(), password)
      sessionStorage.setItem(TOKEN_KEY, t)
      setPassword('')
      setToken(t)
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setData(null)
  }

  const onApprove = async (type, id) => {
    if (!token) return
    setBusy(true)
    try {
      await apiAction(apiBase, 'approve', token, type, id)
      await load(token)
    } catch (err) {
      setError(err.message || 'Approve failed')
    } finally {
      setBusy(false)
    }
  }

  const onReject = async (type, id) => {
    if (!token) return
    setBusy(true)
    try {
      await apiAction(apiBase, 'reject', token, type, id)
      await load(token)
    } catch (err) {
      setError(err.message || 'Reject failed')
    } finally {
      setBusy(false)
    }
  }

  if (!apiBase) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] px-4 py-16 dark:bg-neutral-950">
        <div
          className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-20"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(5, 150, 105, 0.35), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(16, 185, 129, 0.12), transparent)',
          }}
        />
        <div className="relative mx-auto max-w-lg rounded-3xl border border-amber-200/80 bg-amber-50/90 p-8 shadow-xl backdrop-blur-sm dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-50">
          <h1 className="font-display text-xl font-semibold text-amber-950 dark:text-amber-100">API URL not configured</h1>
          <p className="mb-4 mt-2 text-sm text-amber-900/90 dark:text-amber-200/90">
            Production builds must set{' '}
            <code className="rounded-md bg-amber-900/10 px-1.5 py-0.5 text-xs dark:bg-black/30">VITE_API_BASE_URL</code>{' '}
            to your backend root including <code className="rounded-md bg-amber-900/10 px-1.5 py-0.5 text-xs dark:bg-black/30">/api</code>{' '}
            (same as the mobile app’s backend URL). Example:{' '}
            <code className="break-all rounded-md bg-amber-900/10 px-1.5 py-0.5 text-xs dark:bg-black/30">
              https://api.trivaller.com/api
            </code>
          </p>
          <p className="text-sm text-amber-800/80 dark:text-amber-300/80">
            Add it in your host’s environment variables, then redeploy the site. See <code>.env.example</code> in this
            repo.
          </p>
        </div>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] px-4 py-12 sm:py-20 dark:bg-neutral-950">
        <div
          className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 100% 80% at 50% -30%, rgba(5, 150, 105, 0.25), transparent), radial-gradient(ellipse 70% 50% at 0% 100%, rgba(16, 185, 129, 0.08), transparent), radial-gradient(ellipse 50% 40% at 100% 80%, rgba(4, 120, 87, 0.06), transparent)',
          }}
        />
        <div className="relative mx-auto w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-[var(--color-surface)] shadow-lg ring-1 ring-black/5 dark:bg-neutral-900 dark:ring-white/10">
              <img src={trivallerIcon} alt="" className="size-10 object-contain" width={40} height={40} />
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--color-text-primary)] dark:text-white">
              Admin
            </h1>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Staff workspace for reviewing posts, guides, place details, and business listings. This URL is not linked
              on the public site.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-8 shadow-xl shadow-emerald-900/5 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/95 dark:shadow-black/40">
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="admin-email"
                  className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)] dark:text-neutral-200"
                >
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-muted)] dark:border-neutral-600 dark:bg-neutral-800/80 dark:text-white dark:focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="admin-password"
                  className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)] dark:text-neutral-200"
                >
                  Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text-primary)] outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-muted)] dark:border-neutral-600 dark:bg-neutral-800/80 dark:text-white dark:focus:border-emerald-500"
                  required
                />
              </div>
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-200">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] py-3.5 font-semibold text-white shadow-md transition hover:bg-[var(--color-primary-dark)] disabled:pointer-events-none disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Spinner className="!size-5 text-white" />
                    Signing in…
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const pendingPosts = data?.posts?.length ?? 0
  const pendingGuides = data?.guides?.length ?? 0
  const pendingPlaceDetails = data?.placeDetails?.length ?? 0
  const pendingBusinesses = data?.businesses?.length ?? 0
  const totalPending =
    data != null ? pendingPosts + pendingGuides + pendingPlaceDetails + pendingBusinesses : null

  return (
    <div className="min-h-screen bg-[var(--color-bg)] dark:bg-neutral-950">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-48 bg-gradient-to-b from-[var(--color-primary-muted)]/50 to-transparent dark:from-emerald-950/30"
        aria-hidden
      />

      <header className="sticky top-0 z-10 border-b border-[var(--color-border)]/80 bg-[var(--color-surface)]/85 px-4 py-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-muted)] dark:bg-emerald-950/50">
              <img src={trivallerIcon} alt="" className="size-7 object-contain" width={28} height={28} />
            </div>
            <div className="min-w-0">
              <h1 className="font-display text-lg font-bold text-[var(--color-text-primary)] sm:text-xl dark:text-white">
                Moderation
              </h1>
              <p className="truncate text-xs text-[var(--color-text-secondary)] sm:text-sm">
                Review and approve user-submitted content
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => load(token)}
              disabled={loading || busy}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text-primary)] transition hover:bg-[var(--color-bg)] disabled:opacity-45 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              {(loading || busy) && <Spinner className="!size-4" />}
              Refresh
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-xl border border-transparent bg-neutral-200/80 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-300/80 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-4xl px-4 py-8 sm:py-10">
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800 shadow-sm dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </div>
        )}

        {loading && !data && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]/50 py-20 dark:border-neutral-700 dark:bg-neutral-900/30">
            <Spinner className="!size-10" />
            <p className="text-sm font-medium text-[var(--color-text-secondary)]">Loading moderation queue…</p>
          </div>
        )}

        {data && (
          <>
            <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              <StatCard label="Total pending" value={totalPending} accent="text-[var(--color-primary)]" />
              <StatCard label="Posts" value={pendingPosts} accent="text-[var(--color-text-primary)] dark:text-neutral-100" />
              <StatCard label="Guides" value={pendingGuides} accent="text-[var(--color-text-primary)] dark:text-neutral-100" />
              <StatCard
                label="Place details"
                value={pendingPlaceDetails}
                accent="text-[var(--color-text-primary)] dark:text-neutral-100"
              />
              <StatCard
                label="Businesses"
                value={pendingBusinesses}
                accent="text-[var(--color-text-primary)] dark:text-neutral-100"
              />
            </div>
            <p className="mb-8 text-center text-sm text-[var(--color-text-muted)] sm:text-left">
              Approve to publish, or reject to send back. Actions apply immediately.
            </p>

            <Section title="Place posts" entries={data.posts} onApprove={onApprove} onReject={onReject} busy={busy} />
            <Section title="Guides" entries={data.guides} onApprove={onApprove} onReject={onReject} busy={busy} />
            <Section
              title="Place details"
              entries={data.placeDetails}
              onApprove={onApprove}
              onReject={onReject}
              busy={busy}
            />
            <Section title="Business listings" entries={data.businesses} onApprove={onApprove} onReject={onReject} busy={busy} />
          </>
        )}
      </main>
    </div>
  )
}
