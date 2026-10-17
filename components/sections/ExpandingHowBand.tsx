'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/** Scroll-linked band that expands to full width with rounded upper corners — sits after the hero. */
export default function ExpandingHowBand() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 72px'],
  })
  const inset = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['7%', '0%'])
  const radius = useTransform(scrollYProgress, [0, 1], reduce ? [40, 40] : [80, 36])

  return (
    <div ref={ref} className="relative z-10 -mt-8">
      <motion.div
        style={{
          marginLeft: inset,
          marginRight: inset,
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
        }}
        className="overflow-hidden bg-forest"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-12">
          <p className="max-w-xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            From the first spark of an idea to a day you can actually follow.
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Scroll into Jeeva, planning, routes, and the rest of the journey — connected as one story.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
