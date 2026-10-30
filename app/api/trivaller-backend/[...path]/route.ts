/**
 * Proxies /api/trivaller-backend/* to NestJS so the HTTPS site can reach an HTTP API host.
 *
 * Env: BACKEND_HTTP_ORIGIN=http://YOUR_HOST:8080 (no /api)
 */
export const dynamic = 'force-dynamic'

const HOP_BY_HOP = new Set([
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

const SKIP_RESPONSE = new Set(['transfer-encoding', 'connection', 'keep-alive', 'content-encoding', 'content-length'])

type Context = { params: Promise<{ path: string[] }> }

async function proxy(req: Request, { params }: Context) {
  const backend = process.env.BACKEND_HTTP_ORIGIN?.trim()
  if (!backend) {
    return Response.json(
      {
        message:
          'BACKEND_HTTP_ORIGIN is not set. In Vercel → Environment Variables, set BACKEND_HTTP_ORIGIN=http://YOUR_NEST_HOST:8080',
      },
      { status: 502 },
    )
  }

  const { path } = await params
  const apiPath = path?.join('/') ?? ''
  if (!apiPath) {
    return Response.json({ message: 'Missing API path' }, { status: 404 })
  }

  const { search } = new URL(req.url)
  const target = `${backend.replace(/\/$/, '')}/api/${apiPath}${search}`

  const headers = new Headers()
  req.headers.forEach((value, key) => {
    if (!HOP_BY_HOP.has(key.toLowerCase())) headers.set(key, value)
  })
  headers.set('host', new URL(target).host)

  const hasBody = req.method !== 'GET' && req.method !== 'HEAD'

  try {
    const r = await fetch(target, {
      method: req.method,
      headers,
      body: hasBody ? await req.arrayBuffer() : undefined,
      redirect: 'manual',
    })
    const responseHeaders = new Headers()
    r.headers.forEach((value, key) => {
      if (!SKIP_RESPONSE.has(key.toLowerCase())) responseHeaders.set(key, value)
    })
    return new Response(await r.arrayBuffer(), { status: r.status, headers: responseHeaders })
  } catch (e) {
    return Response.json(
      {
        message: 'Proxy could not reach BACKEND_HTTP_ORIGIN',
        detail: e instanceof Error ? e.message : String(e),
      },
      { status: 502 },
    )
  }
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE, proxy as OPTIONS }
