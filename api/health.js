/** Sanity check that Vercel is deploying /api functions. GET https://yoursite.com/api/health */
export default function handler(req, res) {
  res.status(200).json({ ok: true, service: 'trivaller-website-api' })
}
