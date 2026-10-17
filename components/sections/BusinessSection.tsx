'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Building2, Eye, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/animations/Reveal'

export default function BusinessSection() {
  return (
    <section id="business" className="scroll-mt-24 bg-forest py-20 text-ink sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            eyebrow="For Business"
            title="Put Your Business on the Traveler's Map."
            description="Connect your local business with visitors discovering your destination — guides, experiences, restaurants, and activity operators."
          />
          <ul className="mt-8 space-y-3 text-sm text-muted">
            <li className="rounded-2xl border border-black/10 bg-forest-card px-4 py-3">
              Create a polished business profile travelers can trust
            </li>
            <li className="rounded-2xl border border-black/10 bg-forest-card px-4 py-3">
              Feature experiences where visitors already plan
            </li>
            <li className="rounded-2xl border border-black/10 bg-forest-card px-4 py-3">
              Appear in discovery near your destination
            </li>
          </ul>
          <div className="mt-8">
            <Button href="#download">List Your Business</Button>
            <p className="mt-3 text-xs text-muted">Coming soon — join the waitlist from the app CTA.</p>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="relative">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="rounded-[2rem] border border-black/10 bg-forest-card p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-forest-mid text-ink">
                  <Building2 size={18} />
                </div>
                <div>
                  <p className="font-semibold text-ink">Peak Path Outfitters</p>
                  <p className="text-xs text-muted">Guided hikes · Estes Park</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-sm text-ink">
                <Star size={14} className="fill-ink text-ink" /> 4.9
              </span>
            </div>
            <div className="relative mt-4 h-44 overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80"
                alt="Guided hiking experience"
                fill
                className="object-cover"
                sizes="480px"
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Sunrise ridge walks, gear tips, and small-group adventures for visitors planning Colorado days.
            </p>
            <div className="mt-4 flex gap-2">
              {['Sunrise hike', 'Family trail', 'Photo walk'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/10 bg-forest-mid px-3 py-1 text-xs font-medium text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-4 -right-2 rounded-2xl border border-black/10 bg-forest-mid px-4 py-3 text-ink shadow-soft sm:right-4"
          >
            <p className="inline-flex items-center gap-2 text-sm">
              <Eye size={15} className="text-ink" />
              Appears in discovery near Estes Park
            </p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
