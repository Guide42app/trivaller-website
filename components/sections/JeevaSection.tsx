'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Bot, MapPinned, Route, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/animations/Reveal'

const highlights = [
  { icon: Sparkles, text: 'Describe the vibe — Jeeva drafts the bones of the trip.' },
  { icon: MapPinned, text: 'Destination cards and activities appear as the plan takes shape.' },
  { icon: Route, text: 'A day-by-day overview you can edit before you leave.' },
]

type Step =
  | { kind: 'user'; text: string }
  | { kind: 'typing' }
  | { kind: 'assistant'; text: string }
  | { kind: 'cards' }
  | { kind: 'itinerary' }

const sequence: Step[] = [
  { kind: 'user', text: 'Plan a 4-day trip to Colorado with scenic hikes and beautiful places.' },
  { kind: 'typing' },
  { kind: 'assistant', text: 'Absolutely! Let’s build an unforgettable Colorado adventure.' },
  { kind: 'cards' },
  { kind: 'itinerary' },
]

const demoCards = [
  { title: 'Rocky Mountain NP', meta: 'Alpine lakes · overlooks' },
  { title: 'Maroon Bells', meta: 'Iconic peaks · trail day' },
  { title: 'Garden of the Gods', meta: 'Sandstone · easy walks' },
]

const demoDays = [
  'Day 1 — Denver arrival & riverfront walk',
  'Day 2 — Rocky Mountain National Park',
  'Day 3 — Scenic mountain exploration',
  'Day 4 — Garden of the Gods & return',
]

export default function JeevaSection() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reduce) {
      setStep(sequence.length)
      return
    }
    if (step >= sequence.length) return
    const delay = sequence[step]?.kind === 'typing' ? 900 : sequence[step]?.kind === 'user' ? 500 : 1100
    const timer = window.setTimeout(() => setStep((value) => value + 1), delay)
    return () => window.clearTimeout(timer)
  }, [step, reduce])

  const visible = reduce ? sequence.filter((item) => item.kind !== 'typing') : sequence.slice(0, step)

  return (
    <section id="jeeva" className="relative scroll-mt-24 overflow-hidden bg-forest py-20 sm:py-28">
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Jeeva AI"
            title="Meet Jeeva. Your Travel Sidekick."
            description="Dream it. Ask Jeeva. Plan it. A guided demo of how Trivaller turns a single prompt into destinations, activities, and a clear itinerary."
          />
          <ul className="mt-8 space-y-4">
            {highlights.map((item) => (
              <li key={item.text} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/10 bg-black/[0.03] text-ink">
                  <item.icon size={15} />
                </span>
                {item.text}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="#planner">Plan with Jeeva</Button>
          </div>
          <p className="mt-4 text-xs text-muted">Demonstration conversation — not connected to a live model.</p>
        </Reveal>

        <Reveal delay={0.12} className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-forest-card shadow-soft">
            <div className="flex items-center gap-3 border-b border-black/10 px-5 py-4">
              <div className="grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-black/[0.03] text-ink">
                <Bot size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Jeeva</p>
                <p className="text-xs text-muted">Travel sidekick · demo</p>
              </div>
            </div>

            <div className="space-y-4 px-5 py-5">
              <AnimatePresence initial={false}>
                {visible.map((item, index) => {
                  if (item.kind === 'user') {
                    return (
                      <motion.div
                        key={`u-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ml-auto max-w-[85%] rounded-3xl rounded-br-md bg-ink px-4 py-3 text-sm font-medium text-white"
                      >
                        {item.text}
                      </motion.div>
                    )
                  }
                  if (item.kind === 'typing') {
                    return (
                      <motion.div
                        key={`t-${index}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex gap-1 rounded-3xl bg-black/[0.03] px-4 py-3 w-fit"
                      >
                        {[0, 1, 2].map((dot) => (
                          <span
                            key={dot}
                            className="h-2 w-2 animate-bounce rounded-full bg-muted"
                            style={{ animationDelay: `${dot * 120}ms` }}
                          />
                        ))}
                      </motion.div>
                    )
                  }
                  if (item.kind === 'assistant') {
                    return (
                      <motion.div
                        key={`a-${index}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-[90%] rounded-3xl rounded-bl-md border border-black/10 bg-black/[0.03] px-4 py-3 text-sm text-ink"
                      >
                        {item.text}
                      </motion.div>
                    )
                  }
                  if (item.kind === 'cards') {
                    return (
                      <motion.div
                        key={`c-${index}`}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-3 overflow-x-auto pb-1"
                      >
                        {demoCards.map((card) => (
                          <div
                            key={card.title}
                            className="min-w-[140px] rounded-2xl border border-black/10 bg-forest-mid px-3 py-3"
                          >
                            <p className="text-sm font-semibold text-ink">{card.title}</p>
                            <p className="mt-1 text-xs text-muted">{card.meta}</p>
                          </div>
                        ))}
                      </motion.div>
                    )
                  }
                  return (
                    <motion.div
                      key={`i-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="overflow-hidden rounded-2xl border border-black/10 bg-forest-mid/80 p-4"
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                        Trip overview
                      </p>
                      <ul className="mt-3 space-y-2">
                        {demoDays.map((day) => (
                          <li key={day} className="text-sm text-ink/90">
                            {day}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
