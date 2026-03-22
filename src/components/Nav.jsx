import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import trivallerIcon from '../assets/trivallericon.png'

const DOWNLOAD_HREF = '/#download'
const DOWNLOAD_LABEL = 'Download app'

export default function Nav() {
  const [isOverFeatures, setIsOverFeatures] = useState(false)

  const { scrollY } = useScroll()
  const logoOpacity = useTransform(scrollY, [0, 280], [0, 1])

  // Nav stays transparent until the features section is in view
  const observerRef = useRef(null)
  useEffect(() => {
    function observe(target) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => setIsOverFeatures(entry.isIntersecting),
        { root: null, rootMargin: '0px', threshold: 0 }
      )
      observerRef.current.observe(target)
    }
    const el = document.getElementById('features-section')
    if (el) {
      observe(el)
    } else {
      const t = setTimeout(() => {
        const retry = document.getElementById('features-section')
        if (retry) observe(retry)
      }, 500)
      return () => {
        clearTimeout(t)
        observerRef.current?.disconnect()
      }
    }
    return () => observerRef.current?.disconnect()
  }, [])

  const navStyle = isOverFeatures
    ? { backgroundColor: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(8px)' }
    : { backgroundColor: 'transparent', backdropFilter: 'none' }

  return (
    <motion.nav
      style={navStyle}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <motion.div style={{ opacity: logoOpacity }} className="flex shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img src={trivallerIcon} alt="Trivaller" className="h-9 w-9 md:h-10 md:w-10 object-cover rounded-full" />
            <span className="text-xl font-semibold tracking-tight text-black">Trivaller</span>
          </Link>
        </motion.div>
        <a
          href={DOWNLOAD_HREF}
          className="flex-shrink-0 px-3 py-2 sm:px-4 rounded-full bg-[#059669] text-white font-medium text-sm hover:bg-[#047857] transition-colors whitespace-nowrap"
        >
          {DOWNLOAD_LABEL}
        </a>
      </div>
    </motion.nav>
  )
}
