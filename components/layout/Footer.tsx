import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Instagram, Linkedin, Twitter } from 'lucide-react'
import Button from '@/components/ui/Button'

const columns = [
  {
    title: 'Explore',
    links: [
      { href: '#explore', label: 'Destinations' },
      { href: '#jeeva', label: 'Jeeva AI' },
      { href: '#planner', label: 'Trip Planner' },
      { href: '#community', label: 'Community' },
    ],
  },
  {
    title: 'Product',
    links: [
      { href: '#together', label: 'Travel Together' },
      { href: '#routes', label: 'Route Planning' },
      { href: '#deals', label: 'Deals' },
      { href: '#business', label: 'For Business' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/support', label: 'Contact' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms of Service' },
    ],
  },
]

const social = [
  { Icon: Twitter, label: 'Twitter' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Linkedin, label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 -mt-10 overflow-hidden rounded-t-[2.5rem] bg-forest-deep text-white sm:rounded-t-[3.5rem]">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Closing CTA */}
        <div className="flex flex-col gap-6 border-b border-white/10 py-14 sm:flex-row sm:items-end sm:justify-between sm:py-16">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Trivaller
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              Your next adventure starts here.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/55">
              Plan smarter. Explore further. Make every journey count.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="#download">Get the App</Button>
            <a
              href="#explore"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5"
            >
              Start Exploring
            </a>
          </div>
        </div>

        {/* Brand + links */}
        <div className="grid gap-12 py-14 lg:grid-cols-[1.15fr_1.85fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/mark.png" alt="" width={44} height={44} className="rounded-full" />
              <span className="text-2xl font-semibold tracking-tight text-white">Trivaller</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              Your journey, beautifully connected — planning, exploration, collaboration, and local knowledge in one companion.
            </p>
            <div className="mt-7 flex gap-2.5">
              {social.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-white/70 transition hover:border-white/35 hover:bg-white/5 hover:text-white"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') ? (
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-1 text-sm text-white/65 transition hover:text-white"
                        >
                          {link.label}
                          <ArrowUpRight
                            size={13}
                            className="opacity-0 transition group-hover:opacity-70"
                            aria-hidden
                          />
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="group inline-flex items-center gap-1 text-sm text-white/65 transition hover:text-white"
                        >
                          {link.label}
                          <ArrowUpRight
                            size={13}
                            className="opacity-0 transition group-hover:opacity-70"
                            aria-hidden
                          />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Trivaller. Go further. Travel smarter.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/45">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>
            <Link href="/support" className="transition hover:text-white">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
