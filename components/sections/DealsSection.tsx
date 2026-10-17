'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { deals } from '@/data/content'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/animations/Reveal'

const categories = ['All', 'Activity', 'Experience', 'Local', 'Attraction']

export default function DealsSection() {
  const [category, setCategory] = useState('All')
  const items = useMemo(
    () => (category === 'All' ? deals : deals.filter((deal) => deal.category === category)),
    [category],
  )

  return (
    <section id="deals" className="scroll-mt-24 bg-forest py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Deals"
            title="More Experiences. Better Value."
            description="Discover travel deals, local experiences, and offers that make your next adventure even better. All offers below are labeled demos."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                category === item ? 'bg-ink text-white' : 'bg-black/[0.03] text-muted hover:text-ink'
              }`}
            >
              {item}
            </button>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="mt-8 overflow-x-auto scrollbar-hide">
          <div className="flex min-w-max gap-4 pb-2">
            {items.map((deal) => (
              <motion.article
                key={deal.id}
                whileHover={{ y: -6 }}
                className="group w-72 overflow-hidden rounded-[1.75rem] border border-black/10 bg-forest-card"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="288px"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-forest px-2.5 py-1 text-[11px] font-semibold text-ink">
                    {deal.offer}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                    {deal.category}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{deal.title}</h3>
                  <p className="mt-1 text-sm text-muted">{deal.place}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </Reveal>

        <div className="mt-10">
          <Button href="#business">Discover Deals</Button>
        </div>
      </div>
    </section>
  )
}
