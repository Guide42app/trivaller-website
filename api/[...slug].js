/**
 * Handles /api/ec2-proxy/* after vercel.json rewrite from /api/trivaller-backend/*.
 * Path rewrite preserves query string (e.g. ?limit=50) on internal rewrites.
 *
 * Vercel env: BACKEND_HTTP_ORIGIN=http://YOUR_EC2_IP:8080 (no /api)
 */
const PREFIX = '/api/ec2-proxy/'

export default async function handler(req, res) {
  const backend = process.env.BACKEND_HTTP_ORIGIN?.trim()
  if (!backend) {
    res.status(502).json({
      message:
        'BACKEND_HTTP_ORIGIN is not set. In Vercel → Environment Variables, set BACKEND_HTTP_ORIGIN=http://YOUR_EC2_IP:8080',
    })
    return
  }

  const u = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
  if (!u.pathname.startsWith(PREFIX)) {
    res.status(404).send('Not found')
    return
  }

  const springPath = decodeURIComponent(u.pathname.slice(PREFIX.length))
  const target = `${backend.replace(/\/$/, '')}/api/${springPath}${u.search}`

  const hopByHop = new Set([
    'connection',
    'keep-alive',
    'host',
    'content-length',
    'transfer-encoding',
    'te',
    'trailer',
    'upgrade',
  ])

  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined || hopByHop.has(key.toLowerCase())) continue
    headers.set(key, Array.isArray(value) ? value.join(', ') : value)
  }

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
