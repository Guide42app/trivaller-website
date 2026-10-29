/** Sanity check that Vercel is deploying API routes. GET https://yoursite.com/api/health */
export function GET() {
  return Response.json({ ok: true, service: 'trivaller-website-api' })
}
