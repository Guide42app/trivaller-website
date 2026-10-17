'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { easeOut } from '@/lib/motion'
import { cn } from '@/lib/cn'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
}

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: Props) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.65, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  )
}
