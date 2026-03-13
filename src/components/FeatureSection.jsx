import { useRef, forwardRef, useCallback, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import f1Img from '../assets/f1.PNG'

const features = [
  {
    title: 'Trip Planning',
    description: 'Build your perfect itinerary day by day with an intuitive, visual layout. Add destinations, activities, flight details, and personal notes all in one place. Stay organized from the first spark of inspiration to touchdown—and never miss a single moment of your adventure.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Discover Places',
    description: 'Uncover hidden gems and hand-picked recommendations for every destination. Get insider tips from real travelers, curated spots locals love, and personalized suggestions that match your style. Explore the world like a local—not a tourist with a guidebook.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Add Trip Members',
    description: 'Invite friends and family to your trip with a single tap. Collaborate on itineraries in real time—add ideas, vote on activities, and plan together from anywhere. Everyone stays on the same page, so there are no surprises when you hit the road.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Split Costs',
    description: 'Track every expense as you go—meals, activities, accommodation, and extras. Split bills fairly and instantly with smart algorithms that handle the math for you. No more awkward end-of-trip calculations or chasing people for money. Split with a tap and stay friends.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Share Guides',
    description: "Turn your adventures into beautiful, shareable guides. Export and share with friends, family, or the world. Create polished trip diaries with photos, tips, and routes—so others can follow in your footsteps. Your best trip could inspire someone else's journey of a lifetime.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
  },
]

function PhoneFrame({ img }) {
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
          <img src={img} alt="Feature preview" className="w-full h-full object-cover object-top" />
        </div>
      </motion.div>
    </motion.div>
  )
}

function FeatureSlide({ feature, isActive }) {
  return (
    <div className="w-full min-w-full flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center px-4 md:px-12 py-8 md:py-12">
      <PhoneFrame img={f1Img} />
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: isActive ? 1 : 0.7, x: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg"
      >
        <div className="relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-sm p-8 sm:p-10 shadow-xl shadow-black/5 border border-[var(--color-border)] text-center md:text-left hover:shadow-2xl hover:shadow-[#059669]/10 hover:border-[#059669]/30 transition-all duration-300">
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#059669] to-[#10b981]" />
          <div className="flex items-center gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="flex-shrink-0 p-4 rounded-2xl bg-neutral-900 text-white shadow-lg shadow-black/20"
          >
            {feature.icon}
          </motion.div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
            {feature.title}
          </h3>
        </div>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-[1.7] font-medium">
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
            <div key={feature.title} className="min-w-full snap-center flex-shrink-0">
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
