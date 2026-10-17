'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { routeOrders, routeStops } from '@/data/content'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/animations/Reveal'

function pathFor(order: string[]) {
  const points = order
    .map((id) => routeStops.find((stop) => stop.id === id))
    .filter(Boolean) as typeof routeStops
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')
}

export default function RoutesSection() {
  const [optimized, setOptimized] = useState(false)
  const order = optimized ? routeOrders.after : routeOrders.before
  const d = useMemo(() => pathFor(order), [order])
  const distance = optimized ? 18.4 : 26.1
  const savings = Math.round(((26.1 - distance) / 26.1) * 100)

  return (
    <section id="routes" className="scroll-mt-24 bg-forest py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Optimized routes"
            title="Spend Less Time Navigating. More Time Exploring."
            description="Discover a smarter order to visit the places on your itinerary. Demo uses nearest-location style ordering — not live traffic."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="overflow-hidden rounded-[2rem] border border-black/10 bg-forest-card p-4 sm:p-6">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem] bg-forest-mid">
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <motion.path
                  key={d}
                  d={d}
                  fill="none"
                  stroke="#1a1b1d"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0.4 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
                {order.map((id, index) => {
                  const stop = routeStops.find((item) => item.id === id)!
                  return (
                    <g key={`${id}-${index}`}>
                      <motion.circle
                        cx={stop.x}
                        cy={stop.y}
                        r="3.2"
                        fill="#ffffff"
                        stroke="#1a1b1d"
                        strokeWidth="1.2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.08 }}
                      />
                      <text
                        x={stop.x}
                        y={stop.y + 1.1}
                        textAnchor="middle"
                        fontSize="2.4"
                        fill="#1a1b1d"
                        fontFamily="Manrope, sans-serif"
                        fontWeight="700"
                      >
                        {index + 1}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-center rounded-[2rem] border border-black/10 bg-forest-card p-6">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOptimized(false)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  !optimized ? 'bg-black/5 text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                Before
              </button>
              <button
                type="button"
                onClick={() => setOptimized(true)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  optimized ? 'bg-ink text-white' : 'text-muted hover:text-ink'
                }`}
              >
                Optimize Route
              </button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-4">
                <p className="text-xs uppercase tracking-wider text-muted">Est. distance</p>
                <p className="mt-2 text-3xl font-semibold text-ink">
                  <motion.span key={distance} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>
                    {distance}
                  </motion.span>
                  <span className="text-base text-muted"> mi</span>
                </p>
              </div>
              <div className="rounded-2xl border border-black/10 bg-black/[0.03] p-4">
                <p className="text-xs uppercase tracking-wider text-muted">Order improvement</p>
                <p className="mt-2 text-3xl font-semibold text-ink">
                  {optimized ? `${savings}%` : '—'}
                </p>
              </div>
            </div>

            <ol className="mt-6 space-y-2">
              {order.map((id, index) => {
                const stop = routeStops.find((item) => item.id === id)!
                return (
                  <li key={`${id}-list`} className="flex items-center gap-3 text-sm text-ink">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-black/5 text-xs font-semibold text-ink">
                      {index + 1}
                    </span>
                    {stop.name}
                  </li>
                )
              })}
            </ol>
            <p className="mt-6 text-xs text-muted">
              Illustrative distance reduction from visit order only — not guaranteed time or traffic savings.
            </p>
          </Reveal>
        </div>

        <div className="mt-10">
          <Button href="#community">Explore Route Planning</Button>
        </div>
      </div>
    </section>
  )
}
