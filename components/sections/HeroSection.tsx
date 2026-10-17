'use client'

import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'
import { useRef } from 'react'
import Button from '@/components/ui/Button'
import PhoneFrame from '@/components/ui/PhoneFrame'
import { appScreens } from '@/data/screens'
import { easeOut } from '@/lib/motion'

const words = ['Go', 'Further.', 'Travel', 'Smarter.']

export default function HeroSection() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120])
  const imageScale = useTransform(scrollYProgress, [0, 1], reduce ? [1.05, 1.05] : [1.08, 1.18])

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80"
          alt="Cinematic mountain valley at sunrise"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-5 pb-24 pt-28 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:pt-32">
        <div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
          >
            <Sparkles size={12} />
            Your journey, beautifully connected
          </motion.p>

          <h1 className="mt-6 max-w-xl text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {words.map((word, index) => (
              <motion.span
                key={word + index}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: reduce ? 0 : 0.08 + index * 0.08, ease: easeOut }}
                className="mr-[0.28em] inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: reduce ? 0 : 0.45, ease: easeOut }}
            className="mt-6 max-w-md text-lg leading-relaxed text-white/75"
          >
            From your first idea to your favorite memories, Trivaller brings every part of your journey together.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, delay: reduce ? 0 : 0.55 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="#explore">Start Exploring</Button>
            <Button href="#jeeva" variant="secondary">
              Meet Jeeva AI
            </Button>
          </motion.div>
        </div>

        {/* Featured app screenshots */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.3, ease: easeOut }}
          className="relative mx-auto flex h-[min(620px,72svh)] w-full max-w-lg items-end justify-center lg:max-w-none"
        >
          {/* Back-left phone */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-6 left-[2%] z-0 w-[38%] max-w-[180px] -rotate-12 sm:left-[6%] sm:w-[42%]"
          >
            <PhoneFrame src={appScreens[1].src} alt={appScreens[1].alt} sizes="180px" />
          </motion.div>

          {/* Back-right phone */}
          <motion.div
            animate={reduce ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="absolute bottom-8 right-[2%] z-0 w-[38%] max-w-[180px] rotate-[12deg] sm:right-[6%] sm:w-[42%]"
          >
            <PhoneFrame src={appScreens[2].src} alt={appScreens[2].alt} sizes="180px" />
          </motion.div>

          {/* Featured center phone */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
            className="relative z-10 w-[52%] max-w-[240px] sm:w-[48%]"
          >
            <PhoneFrame src={appScreens[0].src} alt={appScreens[0].alt} priority sizes="240px" />
            <p className="mt-3 text-center text-[11px] font-medium tracking-wide text-white/70">
              Trivaller app preview
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#jeeva"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs text-white/70"
        animate={reduce ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scroll
        <ChevronDown size={16} />
      </motion.a>
    </section>
  )
}
