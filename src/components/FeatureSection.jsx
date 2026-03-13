import { useRef, forwardRef, useCallback, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import f1Img from '../assets/features/f1.PNG'
import f2Img from '../assets/features/f2.PNG'
import f3Img from '../assets/features/f3.jpg'
import f4Img from '../assets/features/f4.PNG'
import f5Img from '../assets/features/f5.PNG'
import f6Img from '../assets/features/f6.jpg'
import f7Img from '../assets/features/f7.PNG'
import f8Img from '../assets/features/f8.PNG'
import f9Img from '../assets/features/f9.PNG'
import f10Img from '../assets/features/f10.jpg'
import f11Img from '../assets/features/f11.PNG'
import f12Img from '../assets/features/f12.PNG'
import f13Img from '../assets/features/f13.PNG'

const features = [
  {
    img: f1Img,
    title: 'Your Command Center',
    description: 'Everything you need, right where you need it. The home screen puts your trips, feed, and next adventure at your fingertips. One tap to plan, explore, or jump back in—so you spend less time searching and more time adventuring.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    img: f2Img,
    title: 'Discover & Get Inspired',
    description: 'Swipe into your feed and discover trips, tips, and treasures from travelers like you. Hand-picked recommendations, trending destinations, and stories from the road—all curated to spark your next adventure. Inspiration is always one scroll away.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    ),
  },
  {
    img: f3Img,
    title: 'Milestone Your Journey',
    description: 'See your trip come to life with a visual timeline of every milestone. From flights and hotels to activities and must-dos, map out each step so nothing slips through the cracks. Plan with clarity and travel with confidence.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    img: f4Img,
    title: 'Jeeva: Plan Trips With AI',
    description: 'Meet Jeeva—your AI trip designer. Describe your dream trip, set your vibe, and watch as Jeeva crafts a tailored itinerary in seconds. Smart suggestions, optimized routes, and personalized recommendations. Plan like a pro without the homework.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    img: f5Img,
    title: 'Your Trip Dashboard',
    description: 'Members, packing lists, and expenses—all in one place. The dashboard keeps your trip organized and everyone aligned. See who’s coming, what to pack, and where the money goes. One screen to rule them all.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  {
    img: f6Img,
    title: 'Split Smart, Stay Friends',
    description: 'Track every expense as you go—meals, activities, accommodation, the works. Split bills fairly with a single tap. No spreadsheets, no awkward end-of-trip math, no chasing people for cash. The app does the work so your group stays friends.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    img: f7Img,
    title: 'Thread It All Together',
    description: 'Keep every trip conversation in one place. Discuss plans, share updates, ask questions—all in organized threads. No more lost messages or scattered group chats. Everyone stays looped in and ready to go.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    img: f8Img,
    title: 'Deals That Feel Like Steals',
    description: 'Find discounts, promos, and offers tailored to your trip. Hotels, flights, activities—all in one deals hub. Save more and stretch your travel budget further. Your wallet will thank you.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    img: f9Img,
    title: 'Your Day-by-Day Blueprint',
    description: 'Build the perfect itinerary, one day at a time. Drop in places, activities, and notes—see it all laid out in a clean, visual flow. Rearrange with a tap, add details on the fly. Your trip, your way, beautifully organized.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    img: f10Img,
    title: 'Dark Mode on the House',
    description: 'Easy on the eyes, day or night. Dark mode is included at no extra cost—no premium paywall, no strings attached. Toggle it on and travel in comfort, whether you’re planning at midnight or exploring in bright sun.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  },
  {
    img: f11Img,
    title: 'Every Place, Every Detail',
    description: 'Dive deep into any destination. Photos, tips, opening hours, reviews—everything you need to decide and explore. No more tab-hopping or guesswork. Know before you go.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    img: f12Img,
    title: 'Map the Smart Route',
    description: 'Optimize your stops in map view. See the best route across your day’s destinations—less back-tracking, more exploring. A smarter path means more time for what matters: the adventure.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
  },
  {
    img: f13Img,
    title: 'List View, Smarter Order',
    description: 'Prefer lists over maps? Get the same smart route optimization in a clean, scrollable list. Stops are ordered for efficiency—just follow the list and make the most of every stop. Simple, clear, and optimized.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
]

function PhoneFrame({ img, alt = 'Feature preview' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex justify-center items-center flex-shrink-0"
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative w-[260px] sm:w-[300px] md:w-[340px] rounded-[2.5rem] p-2.5 sm:p-3 bg-neutral-900 shadow-2xl shadow-black/30 border-4 border-neutral-800"
      >
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black z-10" />
        <div className="relative overflow-hidden rounded-[2rem] aspect-[9/19.5] bg-neutral-100">
          <img src={img} alt={alt} className="w-full h-full object-cover object-top" loading="lazy" decoding="async" />
        </div>
      </motion.div>
    </motion.div>
  )
}

function FeatureSlide({ feature, isActive }) {
  return (
    <div className="w-full min-w-full flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 items-center justify-center px-3 sm:px-4 md:px-12 py-6 sm:py-8 md:py-12">
      <PhoneFrame img={feature.img} alt={feature.title} />
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isActive ? 1 : 0.7, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full min-w-0 max-w-lg px-1"
      >
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-sm p-4 sm:p-6 md:p-8 lg:p-10 shadow-xl shadow-black/5 border border-[var(--color-border)] text-center md:text-left hover:shadow-2xl hover:shadow-[#059669]/10 hover:border-[#059669]/30 transition-all duration-300">
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#059669] to-[#10b981]" />
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              className="flex-shrink-0 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-900 text-white shadow-lg shadow-black/20"
            >
              {feature.icon}
            </motion.div>
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight break-words">
              {feature.title}
            </h3>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-[var(--color-text-secondary)] leading-[1.7] font-medium break-words">
            {feature.description}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

const FeatureSection = forwardRef(function FeatureSection(_, ref) {
  const sectionRef = useRef(null)
  const sliderRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const setRef = useCallback((node) => {
    sectionRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const sectionY = useTransform(scrollYProgress, [0, 0.35], [80, 0])
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.25], [0.4, 1])
  const sectionScale = useTransform(scrollYProgress, [0, 0.3], [0.96, 1])

  const goToSlide = (index) => {
    const clamped = Math.max(0, Math.min(index, features.length - 1))
    setActiveIndex(clamped)
    const container = sliderRef.current
    if (container) {
      container.scrollTo({ left: clamped * container.offsetWidth, behavior: 'smooth' })
    }
  }

  const handleScroll = () => {
    const container = sliderRef.current
    if (!container) return
    const index = Math.round(container.scrollLeft / container.offsetWidth)
    setActiveIndex(Math.min(index, features.length - 1))
  }

  // Auto-advance every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev >= features.length - 1 ? 0 : prev + 1
        const container = sliderRef.current
        if (container) {
          container.scrollTo({ left: next * container.offsetWidth, behavior: 'smooth' })
        }
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      ref={setRef}
      id="features-section"
      style={{ y: sectionY, opacity: sectionOpacity, scale: sectionScale }}
      className="relative py-24 px-0 rounded-t-3xl overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[var(--color-bg)] to-[var(--color-bg)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #059669 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative">
        {/* Horizontal slider */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory scrollbar-hide flex"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {features.map((feature, index) => (
            <div key={feature.title} className="w-full min-w-full flex-shrink-0 snap-center">
              <FeatureSlide feature={feature} isActive={activeIndex === index} />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between px-2 md:px-6 pointer-events-none">
          <button
            onClick={() => goToSlide(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/90 shadow-lg border border-[var(--color-border)] flex items-center justify-center hover:bg-white disabled:opacity-40 disabled:pointer-events-none transition-all"
            aria-label="Previous feature"
          >
            <svg className="w-6 h-6 text-[var(--color-text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goToSlide(activeIndex + 1)}
            disabled={activeIndex === features.length - 1}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/90 shadow-lg border border-[var(--color-border)] flex items-center justify-center hover:bg-white disabled:opacity-40 disabled:pointer-events-none transition-all"
            aria-label="Next feature"
          >
            <svg className="w-6 h-6 text-[var(--color-text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-[#059669] w-8'
                  : 'bg-[var(--color-border)] hover:bg-[#059669]/50'
              }`}
              aria-label={`Go to feature ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
})

export default FeatureSection
