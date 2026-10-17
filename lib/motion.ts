export const easeOut = [0.22, 1, 0.36, 1] as const

export const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
}

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
}

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25, margin: '0px 0px -8% 0px' },
  transition: { duration: 0.65, ease: easeOut, delay },
})
