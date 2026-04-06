/**
 * Vercel: invoked via rewrite from /api/trivaller-backend/* (see vercel.json).
 * Nested api/trivaller-backend/[...path].js is unreliable on Vite + Vercel static deploys.
 *
 * Env: BACKEND_HTTP_ORIGIN=http://YOUR_EC2_IP:8080 (no /api)
 */
function springPathFromQuery(req) {
  const raw = req.query?.segments
  if (raw == null || raw === '') return ''
  const s = Array.isArray(raw) ? raw.join('/') : String(raw)
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}

function backendSearchFromRequest(req) {
  const raw = typeof req.url === 'string' ? req.url : '/'
  const u = new URL(raw, 'http://localhost')
  const sp = new URLSearchParams(u.searchParams)
  sp.delete('segments')
  const q = sp.toString()
  return q ? `?${q}` : ''
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

  const springPath = springPathFromQuery(req)
  if (!springPath) {
    res.status(404).json({ message: 'Missing API path' })
    return
  }

  const search = backendSearchFromRequest(req)
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
