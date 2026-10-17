'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks } from '@/data/content'
import { useActiveSection } from '@/hooks/useActiveSection'
import { cn } from '@/lib/cn'
import Button from '@/components/ui/Button'

const sectionIds = navLinks.map((link) => link.href.replace('#', ''))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const onHero = !scrolled && !open

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={cn(
          'mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-full px-4 transition duration-300 sm:px-5',
          scrolled || open
            ? 'border border-black/10 bg-white shadow-soft'
            : 'border border-transparent bg-transparent',
        )}
      >
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image src="/mark.png" alt="" width={36} height={36} className="rounded-full" />
          <span
            className={cn(
              'text-lg font-semibold tracking-tight',
              onHero ? 'text-white' : 'text-ink',
            )}
          >
            Trivaller
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const id = link.href.slice(1)
            const isActive = active === id
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'group relative rounded-full px-3 py-2 text-sm font-medium transition',
                  onHero
                    ? isActive
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                    : isActive
                      ? 'text-ink'
                      : 'text-muted hover:text-ink',
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute inset-x-3 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-300',
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )}
                />
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="#download" className="hidden sm:inline-flex">
            Get the App
          </Button>
          <button
            type="button"
            className={cn(
              'grid h-10 w-10 place-items-center rounded-full border lg:hidden',
              onHero ? 'border-white/30 text-white' : 'border-black/10 text-ink',
            )}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 max-w-6xl rounded-3xl border border-black/10 bg-white p-4 shadow-soft lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-forest-mid"
                >
                  {link.label}
                </a>
              ))}
              <Button href="#download" className="mt-2" onClick={() => setOpen(false)}>
                Get the App
              </Button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
