'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CalendarDays, Map as MapIcon } from 'lucide-react'
import { itineraryDays } from '@/data/content'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/animations/Reveal'

const PlannerMap = dynamic(() => import('@/components/demos/PlannerMap'), {
  ssr: false,
  loading: () => (
    <div className="grid h-full min-h-[360px] place-items-center rounded-[1.5rem] bg-forest-mid text-sm text-muted">
      Loading map…
    </div>
  ),
})

export default function PlannerSection() {
  const reduce = useReducedMotion()
  const [activeDay, setActiveDay] = useState(0)
  const lineRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduce || !lineRef.current || !sectionRef.current) return
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'center center',
            scrub: true,
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reduce])

  return (
    <section id="planner" ref={sectionRef} className="scroll-mt-24 bg-forest py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Trip Planner"
            title="Your Entire Trip. Beautifully Planned."
            description="Turn travel ideas into an organized, day-by-day adventure. Interactive demo of a Colorado itinerary."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal className="rounded-[2rem] border border-black/10 bg-forest-card p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">Trip</p>
                <h3 className="mt-1 text-2xl font-semibold text-ink">Colorado Adventure</h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 text-xs text-muted">
                <CalendarDays size={14} className="text-ink" />
                Jun 12 – Jun 15
              </div>
            </div>

            <div className="relative mt-6 pl-8">
              <div className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-black/5" />
              <div
                ref={lineRef}
                className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-ink"
                style={{ transform: reduce ? 'scaleY(1)' : 'scaleY(0)' }}
              />
              <ol className="space-y-3">
                {itineraryDays.map((day, index) => {
                  const selected = index === activeDay
                  return (
                    <li key={day.day}>
                      <button
                        type="button"
                        onClick={() => setActiveDay(index)}
                        className={`relative w-full rounded-2xl border px-4 py-4 text-left transition ${
                          selected
                            ? 'border-ink bg-black/[0.04]'
                            : 'border-black/10 bg-black/[0.03] hover:border-black/20'
                        }`}
                      >
                        <span
                          className={`absolute -left-[29px] top-5 grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold ${
                            selected ? 'bg-ink text-white' : 'bg-forest-elevated text-muted'
                          }`}
                        >
                          {day.day}
                        </span>
                        <p className="text-sm font-semibold text-ink">
                          Day {day.day} — {day.title}
                        </p>
                        <p className="mt-1 text-sm text-muted">{day.summary}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {day.stops.map((stop) => (
                            <span
                              key={stop}
                              className="rounded-full border border-black/10 px-2.5 py-1 text-[11px] text-muted"
                            >
                              {stop}
                            </span>
                          ))}
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="overflow-hidden rounded-[2rem] border border-black/10 bg-forest-card p-3 sm:p-4">
            <div className="mb-3 flex items-center gap-2 px-2 text-sm text-muted">
              <MapIcon size={15} className="text-ink" />
              Interactive map · numbered destinations
            </div>
            <div className="h-[420px] overflow-hidden rounded-[1.5rem] border border-black/10">
              <PlannerMap activeDay={activeDay} />
            </div>
            <motion.p
              key={activeDay}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 px-2 text-sm text-muted"
            >
              Viewing <span className="text-ink">{itineraryDays[activeDay].title}</span> — select a day to move the map.
            </motion.p>
          </Reveal>
        </div>

        <div className="mt-10">
          <Button href="#together">Create Your Trip</Button>
        </div>
      </div>
    </section>
  )
}
