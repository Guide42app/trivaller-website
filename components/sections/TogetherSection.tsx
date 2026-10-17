'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, Music2, Users, Wallet } from 'lucide-react'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/animations/Reveal'

const members = [
  { name: 'Alex', color: 'bg-ink' },
  { name: 'Sam', color: 'bg-teal-600' },
  { name: 'Riley', color: 'bg-slate-700' },
  { name: 'Jordan', color: 'bg-slate-600' },
]

export default function TogetherSection() {
  const reduce = useReducedMotion()
  const [visibleMembers, setVisibleMembers] = useState(reduce ? members.length : 1)
  const [amount, setAmount] = useState(reduce ? 186 : 0)
  const [invited, setInvited] = useState(false)

  useEffect(() => {
    if (reduce) return
    if (visibleMembers >= members.length) {
      setInvited(true)
      return
    }
    const timer = window.setTimeout(() => setVisibleMembers((value) => value + 1), 450)
    return () => window.clearTimeout(timer)
  }, [visibleMembers, reduce])

  useEffect(() => {
    if (reduce) return
    let frame = 0
    const target = 186
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1200)
      setAmount(Math.round(target * progress))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reduce])

  return (
    <section id="together" className="scroll-mt-24 bg-forest py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Travel together"
            title="Better Trips Are Shared."
            description="Bring your people, your plans, your expenses, and your soundtrack together."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Reveal className="rounded-[2rem] border border-black/10 bg-forest-card p-6 md:col-span-2 xl:col-span-1">
            <div className="flex items-center gap-2 text-ink">
              <Users size={18} />
              <p className="text-sm font-semibold">Trip Members</p>
            </div>
            <p className="mt-3 text-sm text-muted">Invite companions and keep one shared overview.</p>
            <div className="mt-6 flex -space-x-3">
              {members.slice(0, visibleMembers).map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={reduce ? false : { opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`grid h-12 w-12 place-items-center rounded-full border-2 border-forest-card text-sm font-semibold text-white ${member.color}`}
                  style={{ zIndex: members.length - index }}
                >
                  {member.name[0]}
                </motion.div>
              ))}
            </div>
            {invited ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1.5 text-xs text-ink"
              >
                <Check size={14} /> Riley accepted the invite
              </motion.p>
            ) : null}
          </Reveal>

          <Reveal delay={0.08} className="rounded-[2rem] border border-black/10 bg-forest-card p-6">
            <div className="flex items-center gap-2 text-ink">
              <Wallet size={18} />
              <p className="text-sm font-semibold">Split Trip Costs</p>
            </div>
            <p className="mt-3 text-sm text-muted">Track who paid and what each person owes.</p>
            <p className="mt-6 text-4xl font-semibold text-ink">${amount}</p>
            <p className="text-xs text-muted">Shared total · demo</p>
            <div className="mt-5 space-y-3">
              {[
                { name: 'Alex', pct: 40, balance: '+$24' },
                { name: 'Sam', pct: 30, balance: '-$12' },
                { name: 'Riley', pct: 30, balance: '-$12' },
              ].map((row) => (
                <div key={row.name}>
                  <div className="mb-1 flex justify-between text-xs text-muted">
                    <span>{row.name}</span>
                    <span>{row.balance}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-black/5">
                    <motion.div
                      className="h-full rounded-full bg-ink"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.14} className="rounded-[2rem] border border-black/10 bg-forest-card p-6">
            <div className="flex items-center gap-2 text-ink">
              <Music2 size={18} />
              <p className="text-sm font-semibold">Trip Music</p>
            </div>
            <p className="mt-3 text-sm text-muted">Add a playlist vibe for the road ahead.</p>
            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-black/10 bg-black/[0.03] p-3">
              <motion.div
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="grid h-16 w-16 place-items-center rounded-xl bg-ink text-white"
              >
                <Music2 size={22} />
              </motion.div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-ink">Mountain Roads</p>
                <p className="text-xs text-muted">Playlist preview · tap to imagine</p>
                <div className="mt-3 flex items-end gap-1">
                  {[8, 14, 10, 18, 12, 16, 9].map((h, index) => (
                    <motion.span
                      key={index}
                      className="w-1 rounded-full bg-ink"
                      animate={reduce ? { height: h } : { height: [h, h + 8, h] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: index * 0.08 }}
                      style={{ height: h }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted">No audio autoplays. Music requires authorized media.</p>
          </Reveal>
        </div>

        <div className="mt-10">
          <Button href="#routes">Plan Together</Button>
        </div>
      </div>
    </section>
  )
}
