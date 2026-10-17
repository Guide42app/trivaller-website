'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import PhoneFrame from '@/components/ui/PhoneFrame'
import Reveal from '@/components/animations/Reveal'
import { appScreens } from '@/data/screens'

export default function DownloadSection() {
  const reduce = useReducedMotion()

  return (
    <section id="download" className="scroll-mt-24 bg-forest px-5 py-20 sm:px-6 sm:py-28">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-black/10 bg-forest-card px-6 py-14 sm:px-12 sm:py-16">
        <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
              Get Trivaller
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
              Your Next Adventure Starts Here.
            </h2>
            <p className="mt-5 max-w-md text-lg text-muted">
              Plan smarter. Explore further. Make every journey count — see the app that brings it together.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#" variant="primary" ariaLabel="Download for iOS — coming soon">
                Download for iOS
              </Button>
              <Button href="#" variant="secondary" ariaLabel="Get it on Android — coming soon">
                Get it on Android
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted">
              App store links will appear when Trivaller is publicly released. Until then, this is a launch waitlist CTA.
            </p>
          </div>

          <div className="relative mx-auto h-[420px] w-full max-w-md sm:h-[480px]">
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-4 left-[4%] z-[1] w-[42%] -rotate-12"
            >
              <PhoneFrame src={appScreens[3].src} alt={appScreens[3].alt} sizes="180px" />
            </motion.div>

            <motion.div
              animate={reduce ? undefined : { y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
              className="absolute bottom-0 left-1/2 z-[3] w-[48%] -translate-x-1/2"
            >
              <PhoneFrame
                src={appScreens[0].src}
                alt={appScreens[0].alt}
                priority
                sizes="220px"
                className="shadow-[0_24px_60px_rgba(0,0,0,0.16)]"
              />
            </motion.div>

            <motion.div
              animate={reduce ? undefined : { y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              className="absolute bottom-4 right-[4%] z-[2] w-[42%] rotate-12"
            >
              <PhoneFrame src={appScreens[4].src} alt={appScreens[4].alt} sizes="180px" />
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
