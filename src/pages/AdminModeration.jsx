import { useCallback, useEffect, useState } from 'react'

const TOKEN_KEY = 'trivaller_admin_token'

function hostnameLooksLikeIpv4(urlString) {
  try {
    const host = new URL(urlString).hostname
    return /^\d{1,3}(\.\d{1,3}){3}$/.test(host)
  } catch {
    return false
  }
}

/** Same-origin proxy on Vercel (vercel.json → api/[...slug].js + BACKEND_HTTP_ORIGIN). */
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
    return 'http://localhost:8081/api'
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
    const isLocalDev =
      import.meta.env.DEV &&
      (apiBase.includes('localhost') || apiBase.includes('127.0.0.1'))
    if (isLocalDev) {
      return `Could not reach ${apiBase}. Start the backend on that host/port (e.g. ./gradlew bootRun — default is port 8081 in application.properties), or create trivaller-website/.env with VITE_API_BASE_URL=http://localhost:YOUR_PORT/api (same base as EXPO_PUBLIC_BACKEND_URL in the app). EC2 security groups only apply when the API is on EC2, not for localhost.`
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

function EntryRow({ entry, onApprove, onReject, busy }) {
  const img = entry.imageUrl
  return (
    <li className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        {img ? (
          <img
            src={img}
            alt=""
            className="h-24 w-24 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-400 dark:bg-neutral-800">
            No image
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{entry.title}</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            By {entry.authorName || '—'} (user #{entry.authorUserId ?? '—'})
          </p>
          {entry.postId != null && (
            <p className="text-xs text-neutral-500">Post id: {entry.postId}</p>
          )}
          <p className="text-xs text-neutral-500">
            {entry.createdAt ? new Date(entry.createdAt).toLocaleString() : ''}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => onApprove(entry.type, entry.id)}
            className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            Approve
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => onReject(entry.type, entry.id)}
            className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/40 disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      </div>
    </li>
  )
}

function Section({ title, entries, onApprove, onReject, busy }) {
  if (!entries?.length) {
    return (
      <section className="mb-10">
        <h2 className="mb-3 text-lg font-semibold text-neutral-800 dark:text-neutral-200">{title}</h2>
        <p className="text-sm text-neutral-500">No pending items.</p>
      </section>
    )
  }
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-lg font-semibold text-neutral-800 dark:text-neutral-200">{title}</h2>
      <ul className="space-y-3">
        {entries.map((e) => (
          <EntryRow key={`${e.type}-${e.id}`} entry={e} onApprove={onApprove} onReject={onReject} busy={busy} />
        ))}
      </ul>
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
      <div className="min-h-screen bg-neutral-50 px-4 py-16 dark:bg-neutral-950">
        <div className="mx-auto max-w-lg rounded-2xl border border-amber-200 bg-amber-50 p-8 text-neutral-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
          <h1 className="mb-2 text-xl font-semibold">API URL not configured</h1>
          <p className="mb-4 text-sm">
            Production builds must set <code className="rounded bg-black/10 px-1 dark:bg-white/10">VITE_API_BASE_URL</code>{' '}
            to your backend root including <code className="rounded bg-black/10 px-1">/api</code> (same as the mobile
            app’s backend URL). Example:{' '}
            <code className="break-all rounded bg-black/10 px-1 dark:bg-white/10">https://api.trivaller.com/api</code>
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Add it in your host’s environment variables, then redeploy the site. See <code>.env.example</code> in this
            repo.
          </p>
        </div>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-neutral-50 px-4 py-16 dark:bg-neutral-950">
        <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <h1 className="mb-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">Trivaller admin</h1>
          <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
            Staff sign-in to review user submissions. This page is not linked from the public site.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email</label>
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Password</label>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
                required
              />
            </div>
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-600 py-2.5 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-10 dark:bg-neutral-950">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Content moderation</h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Approve place posts, guides, place details, and business listings.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => load(token)}
              disabled={loading || busy}
              className="rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-600"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-600"
            >
              Sign out
            </button>
          </div>
        </header>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
            {error}
          </div>
        )}
        {loading && !data && <p className="text-neutral-600 dark:text-neutral-400">Loading…</p>}

        {data && (
          <>
            <Section title="Place posts" entries={data.posts} onApprove={onApprove} onReject={onReject} busy={busy} />
            <Section title="Guides" entries={data.guides} onApprove={onApprove} onReject={onReject} busy={busy} />
            <Section
              title="Place details (business-style info)"
              entries={data.placeDetails}
              onApprove={onApprove}
              onReject={onReject}
              busy={busy}
            />
            <Section title="Business listings" entries={data.businesses} onApprove={onApprove} onReject={onReject} busy={busy} />
          </>
        )}
      </div>
    </div>
  )
}
