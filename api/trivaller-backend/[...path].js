/**
 * Proxies /api/trivaller-backend/* → BACKEND_HTTP_ORIGIN/api/*
 * Nested route (Vite + Vercel): root-level api/[...slug].js often never runs — use this path instead.
 *
 * Vercel env: BACKEND_HTTP_ORIGIN=http://YOUR_EC2_IP:8080 (no /api)
 */
const PREFIX = '/api/trivaller-backend/'

function springPathFromRequest(req) {
  const host = req.headers.host || 'localhost'
  const forwardedProto = req.headers['x-forwarded-proto']
  const proto = (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto) || 'https'
  const u = new URL(req.url || '/', `${proto}://${host}`)
  const pathname = u.pathname

  if (pathname.startsWith(PREFIX)) {
    return decodeURIComponent(pathname.slice(PREFIX.length))
  }
  // Vercel may pass only the suffix (e.g. /auth/login) relative to this function
  if (pathname.startsWith('/') && pathname !== '/' && !pathname.startsWith('/api/')) {
    return decodeURIComponent(pathname.replace(/^\//, ''))
  }
  const q = req.query?.path
  if (q != null && q !== '') {
    return Array.isArray(q) ? q.join('/') : String(q)
  }
  return ''
}

export default async function handler(req, res) {
  const backend = process.env.BACKEND_HTTP_ORIGIN?.trim()
  if (!backend) {
    res.status(502).json({
      message:
        'BACKEND_HTTP_ORIGIN is not set. In Vercel → Environment Variables, set BACKEND_HTTP_ORIGIN=http://YOUR_EC2_IP:8080',
    })
    return
  }

  const springPath = springPathFromRequest(req)
  if (!springPath) {
    res.status(404).json({ message: 'Missing API path' })
    return
  }

  const search =
    typeof req.url === 'string' && req.url.includes('?')
      ? req.url.slice(req.url.indexOf('?'))
      : ''
  const target = `${backend.replace(/\/$/, '')}/api/${springPath}${search}`
  const targetUrl = new URL(target)

  const hopByHop = new Set([
    'connection',
    'keep-alive',
    'host',
    'content-length',
    'transfer-encoding',
    'te',
    'trailer',
    'upgrade',
    'x-forwarded-host',
    'x-forwarded-proto',
    'x-forwarded-port',
    'x-forwarded-ssl',
  ])

  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined || hopByHop.has(key.toLowerCase())) continue
    headers.set(key, Array.isArray(value) ? value.join(', ') : value)
  }
  headers.set('host', targetUrl.host)

  let body
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (typeof req.body === 'object' && req.body !== null && !Buffer.isBuffer(req.body)) {
      body = JSON.stringify(req.body)
      if (!headers.has('content-type')) {
        headers.set('content-type', 'application/json')
      }
    } else if (typeof req.body === 'string' && req.body.length > 0) {
      body = req.body
    }
  }

  try {
    const r = await fetch(target, {
      method: req.method,
      headers,
      body: body ?? undefined,
      redirect: 'manual',
    })
    const text = await r.text()
    res.status(r.status)
    const skip = new Set(['transfer-encoding', 'connection', 'keep-alive'])
    r.headers.forEach((value, key) => {
      if (skip.has(key.toLowerCase())) return
      res.setHeader(key, value)
    })
    res.send(text)
  } catch (e) {
    res.status(502).json({
      message: 'Proxy could not reach BACKEND_HTTP_ORIGIN',
      detail: e instanceof Error ? e.message : String(e),
    })
  }
}
