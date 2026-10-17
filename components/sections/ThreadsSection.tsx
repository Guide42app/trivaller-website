'use client'

import { useMemo, useState } from 'react'
import { MessageCircle, ThumbsUp } from 'lucide-react'
import { threads } from '@/data/content'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/animations/Reveal'

const categories = ['All', 'Trail tips', 'Local tip', 'Precaution', 'Q&A']

export default function ThreadsSection() {
  const [category, setCategory] = useState('All')
  const [expanded, setExpanded] = useState(threads[0].id)
  const items = useMemo(
    () => (category === 'All' ? threads : threads.filter((thread) => thread.category === category)),
    [category],
  )

  return (
    <section id="community" className="scroll-mt-24 bg-forest py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Travel Threads"
            title="Know Before You Go."
            description="Discover firsthand experiences, useful local tips, and things to watch out for. Sample community posts for demonstration."
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                category === item ? 'bg-ink text-white' : 'bg-forest-card text-muted hover:text-ink'
              }`}
            >
              {item}
            </button>
          ))}
        </Reveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            {items.map((thread, index) => {
              const open = expanded === thread.id
              return (
                <Reveal key={thread.id} delay={index * 0.05}>
                  <button
                    type="button"
                    onClick={() => setExpanded(thread.id)}
                    className={`w-full rounded-[1.5rem] border p-5 text-left transition hover:-translate-y-0.5 ${
                      open
                        ? 'border-ink bg-forest-card'
                        : 'border-black/10 bg-forest-mid hover:border-black/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-forest-elevated text-sm font-semibold text-ink">
                        {thread.author[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink">{thread.author}</p>
                        <p className="text-xs text-muted">
                          {thread.handle} · {thread.destination}
                        </p>
                      </div>
                      <span className="ml-auto rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] font-medium text-ink">
                        {thread.category}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-ink">{thread.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{thread.excerpt}</p>
                    {open ? (
                      <p className="mt-3 text-sm text-muted">
                        Community-submitted advice. Cross-check official park and safety sources before you go.
                      </p>
                    ) : null}
                    <div className="mt-4 flex gap-4 text-xs text-muted">
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle size={13} /> {thread.replies}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <ThumbsUp size={13} /> {thread.helpful} helpful
                      </span>
                    </div>
                  </button>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.1} className="rounded-[2rem] border border-black/10 bg-forest-card p-6 text-ink lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink">Featured discussion</p>
            <h3 className="mt-3 text-2xl font-semibold">Trail conditions & local knowledge</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Threads collect traveler questions and tips so your group arrives informed — without treating sample posts as real-time warnings.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              <li className="rounded-2xl border border-black/10 bg-forest-mid px-4 py-3">
                Category chips keep advice easy to scan
              </li>
              <li className="rounded-2xl border border-black/10 bg-forest-mid px-4 py-3">
                Helpful votes surface the most useful replies
              </li>
              <li className="rounded-2xl border border-black/10 bg-forest-mid px-4 py-3">
                Official safety info stays distinct from community tips
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="mt-10">
          <Button href="#deals">Explore Travel Threads</Button>
        </div>
      </div>
    </section>
  )
}
