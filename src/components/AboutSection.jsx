import { motion } from 'framer-motion'
import tripImg from '../assets/trip.jpg'

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-[100dvh] sm:min-h-screen w-full max-w-full overflow-x-hidden flex items-center pt-20 pb-16 px-4 sm:px-6">
      {/* Background - absolute on mobile (responsive), fixed on desktop */}
      <div
        className="absolute inset-0 w-full min-w-0 h-full sm:fixed sm:inset-0 sm:-z-10 pointer-events-none"
        style={{
          backgroundImage: `url(${tripImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none sm:fixed sm:inset-0 sm:-z-[5]" aria-hidden />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center justify-center text-center">
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#059669] font-medium tracking-widest uppercase text-sm mb-4"
          >
            Smarter Trips Start Here
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-4"
          >
            GuideMe<span className="text-[#059669]">42</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white mb-4 max-w-lg mx-auto"
          >
            Plan trips, discover places, add trip members, split costs, and share guides—all in one app.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-base md:text-lg text-white/90 mb-2 max-w-2xl mx-auto italic"
          >
            Plot your path. Pack your bags. Go.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm md:text-base text-white/80 mb-8 max-w-xl mx-auto"
          >
            Dream it. Map it. Live it. GuideMe42 turns your travel ideas into real adventures, one tap at a time.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.a
              href="#download"
              className="px-8 py-4 rounded-full bg-[#059669] text-white font-semibold hover:bg-[#047857] transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Download App
            </motion.a>
            <motion.a
              href="#features-section"
              className="px-8 py-4 rounded-full border-2 border-white text-white font-medium hover:border-[#059669] hover:bg-[#059669] transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Features
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
