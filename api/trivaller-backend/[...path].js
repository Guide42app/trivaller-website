/**
 * Proxies /api/trivaller-backend/* → BACKEND_HTTP_ORIGIN/api/*
 * so https://trivaller.com can reach http://EC2:8080 without mixed content.
 *
 * Vercel env: BACKEND_HTTP_ORIGIN=http://YOUR_EC2_IP:8080 (no trailing slash, no /api)
 */
export default async function handler(req, res) {
  const origin = process.env.BACKEND_HTTP_ORIGIN?.trim()
  if (!origin) {
    res.status(502).json({
      message:
        'BACKEND_HTTP_ORIGIN is not set. In Vercel → Settings → Environment Variables, set BACKEND_HTTP_ORIGIN=http://YOUR_EC2_IP:8080',
    })
    return
  }

  const host = req.headers.host || 'localhost'
  const incoming = new URL(req.url, `http://${host}`)
  const prefix = '/api/trivaller-backend'
  if (!incoming.pathname.startsWith(prefix)) {
    res.status(404).json({ message: 'Unexpected path' })
    return
  }
  let rest = incoming.pathname.slice(prefix.length).replace(/^\//, '')
  const target = `${origin.replace(/\/$/, '')}/api/${rest}${incoming.search}`

  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue
    const kl = key.toLowerCase()
    if (['host', 'connection', 'content-length'].includes(kl)) continue
    if (Array.isArray(value)) headers.set(key, value.join(', '))
    else headers.set(key, value)
  }

  let body
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (typeof req.body === 'object' && req.body !== null && !Buffer.isBuffer(req.body)) {
      body = JSON.stringify(req.body)
      if (!headers.has('content-type')) {
        headers.set('content-type', 'application/json')
      }
    } else if (typeof req.body === 'string') {
      body = req.body
    }
  }

  try {
    const r = await fetch(target, { method: req.method, headers, body, redirect: 'manual' })
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
