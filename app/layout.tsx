import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Trivaller — Your Journey, Beautifully Connected',
  description:
    'From your first idea to your favorite memories, Trivaller brings planning, exploration, collaboration, and local knowledge together.',
  openGraph: {
    title: 'Trivaller — Go Further. Travel Smarter.',
    description:
      'An intelligent travel companion for planning, discovery, shared trips, and smarter routes.',
    type: 'website',
    siteName: 'Trivaller',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trivaller — Go Further. Travel Smarter.',
    description: 'Plan smarter. Explore further. Make every journey count.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="bg-forest font-body text-ink">{children}</body>
    </html>
  )
}
