import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import guideme42icon from '../assets/guideme42icon.png'

const links = [
  { href: '/#about', label: 'About' },
  { href: '/#features-section', label: 'Features' },
  { href: '/#download', label: 'Download' },
]

export default function Nav({ featuresSectionRef }) {
  const [open, setOpen] = useState(false)
  const fallbackRef = useRef(null)
  const targetRef = featuresSectionRef || fallbackRef

  const { scrollY } = useScroll()
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'start start'],
  })
  const logoOpacity = useTransform(scrollY, [0, 280], [0, 1])
  const navBg = useTransform(scrollYProgress, [0, 0.05], [0, 1])
  const backgroundColor = useTransform(navBg, [0, 1], ['transparent', 'rgba(255,255,255,0.98)'])
  const backdropFilter = useTransform(navBg, [0, 1], ['none', 'blur(8px)'])

  return (
    <motion.nav
      style={{ backgroundColor, backdropFilter }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-transparent"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <motion.div style={{ opacity: logoOpacity }} className="flex shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img src={guideme42icon} alt="GuideMe42" className="h-9 w-9 md:h-10 md:w-10 object-cover rounded-full" />
            <span className="text-xl font-semibold tracking-tight"><span className="text-black">GuideMe</span><span className="text-[#059669]">42</span></span>
          </Link>
        </motion.div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={
                l.label === 'Download'
                  ? 'px-4 py-2 rounded-full bg-[#059669] text-white font-medium text-sm hover:bg-[#047857] transition-colors'
                  : 'text-[var(--color-text-secondary)] hover:text-[#059669] font-medium text-sm transition-colors'
              }
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="md:hidden w-10 h-10 flex flex-col justify-center gap-1.5"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span className={`block h-0.5 bg-black transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 bg-black transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 bg-black transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 flex flex-col gap-4 pb-4"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={
                  l.label === 'Download'
                    ? 'px-4 py-2 rounded-full bg-[#059669] text-white font-medium hover:bg-[#047857] transition-colors inline-block'
                    : 'text-[var(--color-text-secondary)] hover:text-[#059669] font-medium'
                }
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
