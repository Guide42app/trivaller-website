'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { destinations } from '@/data/content'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/animations/Reveal'

const categories = ['All', 'Scenic', 'Hike', 'Landmark', 'Waterfall', 'Culture']

export default function DiscoverSection() {
  const [category, setCategory] = useState('All')
  const items = useMemo(
    () => (category === 'All' ? destinations : destinations.filter((item) => item.category === category)),
    [category],
  )
  const featured = items[0] ?? destinations[0]
  const rest = items.slice(1)

  return (
    <section id="explore" className="scroll-mt-24 bg-forest py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Discover"
            title="Every Destination Has a Story. Discover Yours."
            description="Find incredible places, nearby attractions, and local guides worth exploring. Sample destinations for demonstration."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                category === item
                  ? 'bg-ink text-white'
                  : 'bg-forest-card text-muted hover:text-ink'
              }`}
            >
              {item}
            </button>
          ))}
        </Reveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          <Reveal className="group relative min-h-[360px] overflow-hidden rounded-[2rem] lg:col-span-7 lg:min-h-[520px]">
            <Image
              src={featured.image}
              alt={featured.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-black/70 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                {featured.category}
              </p>
              <h3 className="mt-2 text-3xl font-semibold text-white">{featured.name}</h3>
              <p className="mt-2 max-w-md text-sm text-white/75">{featured.blurb}</p>
              <div className="mt-4 flex items-center gap-2 text-sm text-white">
                <Star size={14} className="fill-white text-white" />
                {featured.rating} · {featured.location}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {rest.slice(0, 4).map((item, index) => (
              <Reveal key={item.id} delay={0.08 + index * 0.06}>
                <article className="group flex h-full overflow-hidden rounded-[1.5rem] border border-black/10 bg-forest-card transition hover:-translate-y-1">
                  <div className="relative w-28 shrink-0 sm:w-32">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="128px"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                      {item.category}
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-ink">{item.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{item.blurb}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="mt-8 overflow-x-auto scrollbar-hide">
          <div className="flex min-w-max gap-4 pb-2">
            {destinations.map((item) => (
              <motion.article
                key={`carousel-${item.id}`}
                whileHover={{ y: -4 }}
                className="relative h-48 w-64 overflow-hidden rounded-3xl"
              >
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="256px" />
                <div className="absolute inset-x-0 bottom-0 bg-black/70 p-4">
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-white/70">{item.location}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </Reveal>

        <div className="mt-10">
          <Button href="#planner">Explore Destinations</Button>
        </div>
      </div>
    </section>
  )
}
