/**
 * Proxies /api/trivaller-backend/* → BACKEND_HTTP_ORIGIN/api/*
 * Uses the Web Request/Response API (Vercel Node runtime) so POST is routed correctly.
 *
 * Vercel env: BACKEND_HTTP_ORIGIN=http://YOUR_EC2_IP:8080 (no trailing slash, no /api)
 */
export default {
  async fetch(request) {
    const backend = process.env.BACKEND_HTTP_ORIGIN?.trim()
    if (!backend) {
      return Response.json(
        {
          message:
            'BACKEND_HTTP_ORIGIN is not set. In Vercel → Environment Variables, set BACKEND_HTTP_ORIGIN=http://YOUR_EC2_IP:8080',
        },
        { status: 502 },
      )
    }

    const incoming = new URL(request.url)
    const prefix = '/api/trivaller-backend'
    if (!incoming.pathname.startsWith(prefix)) {
      return Response.json({ message: 'Unexpected path' }, { status: 404 })
    }

    let rest = incoming.pathname.slice(prefix.length).replace(/^\//, '')
    const target = `${backend.replace(/\/$/, '')}/api/${rest}${incoming.search}`

    const hopByHop = new Set([
      'connection',
      'keep-alive',
      'proxy-authenticate',
      'proxy-authorization',
      'te',
      'trailers',
      'transfer-encoding',
      'upgrade',
      'host',
      'content-length',
    ])

    const outHeaders = new Headers()
    request.headers.forEach((value, key) => {
      if (hopByHop.has(key.toLowerCase())) return
      outHeaders.set(key, value)
    })

    /** @type {RequestInit} */
    const init = {
      method: request.method,
      headers: outHeaders,
      redirect: 'manual',
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const text = await request.text()
      if (text) {
        init.body = text
        if (!outHeaders.has('content-type')) {
          outHeaders.set('content-type', 'application/json')
        }
      }
    }

    try {
      const r = await fetch(target, init)
      const skip = new Set(['transfer-encoding', 'connection', 'keep-alive'])
      const resHeaders = new Headers()
      r.headers.forEach((value, key) => {
        if (skip.has(key.toLowerCase())) return
        resHeaders.set(key, value)
      })
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: resHeaders,
      })
    } catch (e) {
      return Response.json(
        {
          message: 'Proxy could not reach BACKEND_HTTP_ORIGIN',
          detail: e instanceof Error ? e.message : String(e),
        },
        { status: 502 },
      )
    }
  },
}
