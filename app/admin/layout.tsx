import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Trivaller',
  description: 'Review and publish posts, guides, place details, and business listings.',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
