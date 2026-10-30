'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Aperture,
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  Check,
  Eye,
  EyeOff,
  Inbox,
  Landmark,
  LogOut,
  RotateCw,
  Store,
  X,
} from 'lucide-react'
import { cn } from '@/lib/cn'

const TOKEN_KEY = 'trivaller_admin_token'
const PROXY_API_BASE = '/api/trivaller-backend'

type QueueType = 'POST' | 'GUIDE' | 'PLACE_DETAILS' | 'BUSINESS'
type TabKey = 'all' | 'posts' | 'guides' | 'placeDetails' | 'businesses'

type Entry = {
  type: QueueType
  id: number
  title: string
  imageUrl: string | null
  authorUserId: number | null
  authorName: string
  createdAt: string
  postId: number | null
}

type PendingPayload = {
  posts: Entry[]
  guides: Entry[]
  placeDetails: Entry[]
  businesses: Entry[]
}

const TYPE_META: Record<
  QueueType,
  { label: string; hint: string; icon: typeof Aperture; chip: string }
> = {
  POST: {
    label: 'Post',
    hint: 'Place post',
    icon: Aperture,
    chip: 'bg-forest-mid text-ink',
  },
  GUIDE: {
    label: 'Guide',
    hint: 'Travel guide',
    icon: BookOpen,
    chip: 'bg-forest-mid text-ink',
  },
  PLACE_DETAILS: {
    label: 'Place',
    hint: 'Place details',
    icon: Landmark,
    chip: 'bg-forest-mid text-ink',
  },
  BUSINESS: {
    label: 'Business',
    hint: 'Business listing',
    icon: Store,
    chip: 'bg-forest-mid text-ink',
  },
}

const STATS: { key: TabKey; label: string; field: keyof PendingPayload; icon: typeof Aperture }[] = [
  { key: 'posts', label: 'Posts', field: 'posts', icon: Aperture },
  { key: 'guides', label: 'Guides', field: 'guides', icon: BookOpen },
  { key: 'placeDetails', label: 'Places', field: 'placeDetails', icon: Landmark },
  { key: 'businesses', label: 'Businesses', field: 'businesses', icon: Store },
]

const TABS: { key: TabKey; label: string; field?: keyof PendingPayload; icon?: typeof Aperture }[] = [
  { key: 'all', label: 'All' },
  { key: 'posts', label: 'Posts', field: 'posts', icon: Aperture },
  { key: 'guides', label: 'Guides', field: 'guides', icon: BookOpen },
  { key: 'placeDetails', label: 'Places', field: 'placeDetails', icon: Landmark },
  { key: 'businesses', label: 'Businesses', field: 'businesses', icon: Store },
]

function hostnameLooksLikeIpv4(urlString: string) {
  try {
    return /^\d{1,3}(\.\d{1,3}){3}$/.test(new URL(urlString).hostname)
  } catch {
    return false
  }
}

function effectiveApiBaseForHttpsSite(fromEnv: string) {
  const base = fromEnv.replace(/\/$/, '')
  if (process.env.NEXT_PUBLIC_DISABLE_IP_API_PROXY === 'true') return base
  if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') return base
  if (window.location.protocol !== 'https:') return base
  try {
    const u = new URL(base)
    const host = u.hostname
    const isPublicIpv4 = /^\d{1,3}(\.\d{1,3}){3}$/.test(host)
    const isLoopback = host === 'localhost' || host === '127.0.0.1'
    if (isLoopback || isPublicIpv4) return PROXY_API_BASE
  } catch {
    return base
  }
  return base
}

function resolveApiBase() {
  const fromEnv = process.env.NEXT_PUBLIC_API_BASE_URL?.trim()
  if (fromEnv) return effectiveApiBaseForHttpsSite(fromEnv)
  if (process.env.NODE_ENV === 'development') return PROXY_API_BASE
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') return PROXY_API_BASE
  return ''
}

function explainNetworkError(apiBase: string, err: unknown) {
  const pageHttps = typeof window !== 'undefined' && window.location.protocol === 'https:'
  const apiHttp = apiBase.startsWith('http://')
  if (pageHttps && apiHttp) {
    return 'This page is HTTPS but the API URL is HTTP. Browsers block that mix. Use the same-origin proxy, or an HTTPS API host.'
  }
  if (pageHttps && apiBase === PROXY_API_BASE && err instanceof TypeError && String(err.message).includes('fetch')) {
    return `Could not reach ${apiBase}. Set BACKEND_HTTP_ORIGIN on Vercel to your NestJS host (no /api) and redeploy.`
  }
  if (err instanceof TypeError && String(err.message).includes('fetch')) {
    if (process.env.NODE_ENV === 'development' && apiBase === PROXY_API_BASE) {
      return 'Could not reach NestJS. Start trivaller-backend with npm run start:dev (http://127.0.0.1:8080).'
    }
    if (apiBase.startsWith('https://') && hostnameLooksLikeIpv4(apiBase)) {
      return `Could not reach ${apiBase}. Use the same-origin proxy instead of calling a raw IP over HTTPS.`
    }
    return `Could not reach ${apiBase}. Check that NestJS is running and allows this origin.`
  }
  return err instanceof Error ? err.message : 'Request failed'
}

async function apiLogin(apiBase: string, email: string, password: string) {
  let r: Response
  try {
    r = await fetch(`${apiBase}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
  } catch (err) {
    throw new Error(explainNetworkError(apiBase, err))
  }
  const data = (await r.json().catch(() => ({}))) as { message?: string; error?: string; access_token?: string; accessToken?: string }
  if (!r.ok) {
    const hint = r.status === 502 && apiBase === PROXY_API_BASE ? ' Set BACKEND_HTTP_ORIGIN on Vercel and redeploy.' : ''
    throw new Error((data.message || data.error || `Login failed (${r.status})`) + hint)
  }
  const token = data.access_token || data.accessToken
  if (!token) throw new Error('No access token in response')
  return token
}

async function apiPending(apiBase: string, token: string) {
  let r: Response
  try {
    r = await fetch(`${apiBase}/admin/moderation/pending?limit=50`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (err) {
    throw new Error(explainNetworkError(apiBase, err))
  }
  if (r.status === 401 || r.status === 403) throw new Error('unauthorized')
  if (!r.ok) throw new Error(`Failed to load queue (${r.status})`)
  return r.json() as Promise<PendingPayload>
}

async function apiAction(apiBase: string, path: string, token: string, type: QueueType, id: number) {
  let r: Response
  try {
    r = await fetch(`${apiBase}/admin/moderation/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ type, id }),
    })
  } catch (err) {
    throw new Error(explainNetworkError(apiBase, err))
  }
  if (!r.ok) throw new Error(`Action failed (${r.status})`)
}

function relativeTime(iso?: string) {
  if (!iso) return ''
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ''
  const delta = Date.now() - then
  const min = Math.round(delta / 60000)
  if (min < 1) return 'Just now'
  if (min < 60) return `${min}m ago`
  const hr = Math.round(min / 60)
  if (hr < 24) return `${hr}h ago`
  const day = Math.round(hr / 24)
  if (day < 7) return `${day}d ago`
  return new Date(iso).toLocaleDateString()
}

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <Image src="/mark.png" alt="" width={36} height={36} className="rounded-full" />
      <span className={cn('text-lg font-semibold tracking-tight', light ? 'text-white' : 'text-ink')}>Trivaller</span>
    </div>
  )
}

function Spinner({ className = '' }: { className?: string }) {
  return (
    <svg className={cn('size-5 animate-spin', className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}

function LoginScreen({
  email,
  password,
  error,
  loading,
  onEmail,
  onPassword,
  onSubmit,
}: {
  email: string
  password: string
  error: string
  loading: boolean
  onEmail: (v: string) => void
  onPassword: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative min-h-svh overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative flex min-h-svh flex-col px-4 py-5 sm:px-6">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <BrandMark light />
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:bg-white/20">
            <ArrowLeft size={16} />
            Back to site
          </Link>
        </header>

        <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center py-10">
          <div className="rounded-[28px] border border-white/15 bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8">
            <p className="inline-flex items-center gap-2 rounded-full bg-forest-mid px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
              <BadgeCheck size={13} strokeWidth={1.75} className="text-ink" />
              Staff only
            </p>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Sign in to moderate</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Review posts, guides, place details, and businesses before they go live.
            </p>

            <form onSubmit={onSubmit} className="mt-7 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(ev) => onEmail(ev.target.value)}
                  placeholder="admin@trivaller.demo"
                  className="w-full rounded-2xl border border-line bg-forest px-4 py-3.5 text-ink outline-none transition placeholder:text-muted/70 focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink">Password</span>
                <div className="relative">
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(ev) => onPassword(ev.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-line bg-forest px-4 py-3.5 pr-12 text-ink outline-none transition placeholder:text-muted/70 focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted hover:text-ink"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} strokeWidth={1.75} className="text-ink" /> : <Eye size={18} strokeWidth={1.75} className="text-ink" />}
                  </button>
                </div>
              </label>

              {error && (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-bright disabled:pointer-events-none disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Spinner className="text-white" />
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
    </div>
  )
}

function EntryCard({
  entry,
  busy,
  onApprove,
  onReject,
}: {
  entry: Entry
  busy: boolean
  onApprove: (type: QueueType, id: number) => void
  onReject: (type: QueueType, id: number) => void
}) {
  const meta = TYPE_META[entry.type] ?? TYPE_META.POST
  const Icon = meta.icon

  return (
    <article className="overflow-hidden rounded-3xl border border-line bg-white shadow-soft">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-48 shrink-0 bg-forest-mid sm:h-auto sm:w-52">
          {entry.imageUrl ? (
            // User-submitted URLs are not always in next/image remotePatterns.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={entry.imageUrl} alt="" className="absolute inset-0 size-full object-cover" />
          ) : (
            <div className="flex size-full min-h-48 items-center justify-center text-ink">
              <Icon size={28} strokeWidth={1.5} />
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide', meta.chip)}>
              <Icon size={13} strokeWidth={1.75} className="text-ink" />
              {meta.label}
            </span>
            {entry.createdAt && (
              <time className="text-xs text-muted" dateTime={entry.createdAt} title={new Date(entry.createdAt).toLocaleString()}>
                {relativeTime(entry.createdAt)}
              </time>
            )}
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">{entry.title || 'Untitled'}</h3>
          <p className="mt-1 text-sm text-muted">
            {entry.authorName || 'Unknown author'}
            {entry.authorUserId != null && <span> · #{entry.authorUserId}</span>}
            {entry.postId != null && <span> · post {entry.postId}</span>}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => onApprove(entry.type, entry.id)}
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-bright disabled:opacity-45"
            >
              <Check size={16} strokeWidth={2} className="text-white" />
              Approve
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => onReject(entry.type, entry.id)}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-forest-mid disabled:opacity-45"
            >
              <X size={16} strokeWidth={2} className="text-ink" />
              Reject
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function AdminModeration() {
  const apiBase = resolveApiBase()
  const [token, setToken] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<PendingPayload | null>(null)
  const [busy, setBusy] = useState(false)
  const [tab, setTab] = useState<TabKey>('all')

  useEffect(() => {
    setToken(sessionStorage.getItem(TOKEN_KEY))
    setHydrated(true)
  }, [])

  const load = useCallback(
    async (t: string) => {
      setLoading(true)
      setError('')
      try {
        setData(await apiPending(apiBase, t))
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Failed to load'
        if (message === 'unauthorized') {
          sessionStorage.removeItem(TOKEN_KEY)
          setToken(null)
          setError('Session expired or this account is not an admin. Sign in again.')
        } else {
          setError(message)
        }
      } finally {
        setLoading(false)
      }
    },
    [apiBase],
  )

  useEffect(() => {
    if (hydrated && token && apiBase) load(token)
  }, [token, load, apiBase, hydrated])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const t = await apiLogin(apiBase, email.trim(), password)
      sessionStorage.setItem(TOKEN_KEY, t)
      setPassword('')
      setToken(t)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
    setData(null)
    setTab('all')
  }

  const runAction = async (path: 'approve' | 'reject', type: QueueType, id: number) => {
    if (!token) return
    setBusy(true)
    try {
      await apiAction(apiBase, path, token, type, id)
      await load(token)
    } catch (err) {
      setError(err instanceof Error ? err.message : `${path} failed`)
    } finally {
      setBusy(false)
    }
  }

  const counts = {
    posts: data?.posts.length ?? 0,
    guides: data?.guides.length ?? 0,
    placeDetails: data?.placeDetails.length ?? 0,
    businesses: data?.businesses.length ?? 0,
  }
  const total = counts.posts + counts.guides + counts.placeDetails + counts.businesses

  const visible = useMemo(() => {
    if (!data) return []
    if (tab === 'all') {
      return [...data.posts, ...data.guides, ...data.placeDetails, ...data.businesses].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    }
    const field = TABS.find((t) => t.key === tab)?.field
    return field ? data[field] : []
  }, [data, tab])

  if (!hydrated) {
    return (
      <div className="grid min-h-svh place-items-center bg-forest text-sm text-muted">
        <Spinner className="text-emerald" />
      </div>
    )
  }

  if (!apiBase) {
    return (
      <div className="grid min-h-svh place-items-center bg-forest px-4">
        <div className="max-w-md rounded-3xl bg-white p-8 shadow-soft">
          <h1 className="font-display text-2xl font-semibold text-ink">API URL not configured</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Set <code className="rounded-md bg-forest-mid px-1.5 py-0.5 text-ink">NEXT_PUBLIC_API_BASE_URL</code> to your
            NestJS root including <code className="rounded-md bg-forest-mid px-1.5 py-0.5 text-ink">/api</code>, then
            redeploy.
          </p>
        </div>
      </div>
    )
  }

  if (!token) {
    return (
      <LoginScreen
        email={email}
        password={password}
        error={error}
        loading={loading}
        onEmail={setEmail}
        onPassword={setPassword}
        onSubmit={handleLogin}
      />
    )
  }

  return (
    <div className="min-h-svh bg-forest">
      <header className="sticky top-0 z-20 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-black/10 bg-white px-3 py-2 shadow-soft sm:px-4">
          <div className="flex min-w-0 items-center gap-3">
            <Image src="/mark.png" alt="" width={36} height={36} className="rounded-full" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight text-ink sm:text-base">Moderation</p>
              <p className="hidden text-xs text-muted sm:block">Publish queue for the Trivaller app</p>
            </div>
            <span className="hidden rounded-full bg-emerald/10 px-2.5 py-1 text-xs font-semibold text-emerald-dim sm:inline">
              {total} pending
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => token && load(token)}
              disabled={loading || busy}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-2 text-sm font-medium text-ink transition hover:bg-forest-mid disabled:opacity-45"
            >
              <RotateCw size={15} strokeWidth={1.75} className={cn('text-ink', (loading || busy) && 'animate-spin')} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full bg-forest-deep px-3 py-2 text-sm font-medium text-white transition hover:bg-ink"
            >
              <LogOut size={15} strokeWidth={1.75} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {error && (
          <p className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            {error}
          </p>
        )}

        {loading && !data && (
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-white py-20 shadow-soft">
            <Spinner className="size-8 text-emerald" />
            <p className="text-sm text-muted">Loading the queue…</p>
          </div>
        )}

        {data && (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((stat) => {
                const Icon = stat.icon
                const active = tab === stat.key
                return (
                  <button
                    key={stat.key}
                    type="button"
                    onClick={() => setTab(stat.key)}
                    className={cn(
                      'rounded-3xl border bg-white p-4 text-left shadow-soft transition',
                      active ? 'border-ink ring-2 ring-ink/10' : 'border-transparent hover:border-line',
                    )}
                  >
                    <Icon size={20} strokeWidth={1.5} className="text-ink" />
                    <p className="mt-3 font-display text-3xl font-semibold tabular-nums tracking-tight text-ink">{counts[stat.field]}</p>
                    <p className="mt-1 text-sm text-muted">{stat.label}</p>
                  </button>
                )
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1 rounded-full border border-black/10 bg-white p-1">
                {TABS.map((item) => {
                  const n = item.key === 'all' ? total : item.field ? counts[item.field] : 0
                  const TabIcon = item.icon
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setTab(item.key)}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition',
                        tab === item.key ? 'bg-forest-deep text-white' : 'text-muted hover:text-ink',
                      )}
                    >
                      {TabIcon && <TabIcon size={14} strokeWidth={1.75} className={tab === item.key ? 'text-white' : 'text-ink'} />}
                      {item.label}
                      <span className={cn('ml-1 tabular-nums', tab === item.key ? 'text-white/70' : 'text-muted')}>{n}</span>
                    </button>
                  )
                })}
              </div>
              <p className="text-sm text-muted">Approve to publish. Reject hides it from the public feed.</p>
            </div>

            <div className="mt-6 space-y-4">
              {visible.length === 0 ? (
                <div className="rounded-3xl bg-white px-6 py-12 text-center shadow-soft">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-forest-mid text-ink">
                    <Inbox size={22} strokeWidth={1.5} />
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-semibold text-ink">Queue is clear</h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
                    {tab === 'all'
                      ? 'Nothing is waiting for review. New submissions will appear here.'
                      : `No pending ${TABS.find((t) => t.key === tab)?.label.toLowerCase()} right now.`}
                  </p>
                </div>
              ) : (
                visible.map((entry) => (
                  <EntryCard
                    key={`${entry.type}-${entry.id}`}
                    entry={entry}
                    busy={busy}
                    onApprove={(type, id) => runAction('approve', type, id)}
                    onReject={(type, id) => runAction('reject', type, id)}
                  />
                ))
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
