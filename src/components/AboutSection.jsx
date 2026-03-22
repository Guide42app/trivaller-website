import { motion } from 'framer-motion'
import featureImg from '../assets/feature.png'

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-0 w-full max-w-full overflow-x-hidden flex items-center pt-6 pb-10 px-4 sm:px-6">
      {/* Background - fixed for parallax; responsive to viewport on all devices */}
      <div
        className="fixed -z-10 left-0 top-0 w-full min-w-0 pointer-events-none"
        style={{
          width: '100vw',
          minWidth: '100%',
          height: '100dvh',
          minHeight: '100vh',
          backgroundImage: `url(${featureImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden
      />
      {/* Dark overlay - same viewport size as background */}
      <div
        className="fixed -z-[5] left-0 top-0 w-full pointer-events-none bg-black/50"
        style={{ width: '100vw', minWidth: '100%', height: '100dvh', minHeight: '100vh' }}
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center justify-center text-center">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl w-full mx-auto mb-10 text-left px-2"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
              <span className="text-white">About Trivaller</span>
            </h2>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4">
              Trivaller was created to make travel planning simple, collaborative, and enjoyable. We believe every trip should begin with excitement—not stress. From choosing destinations to organizing itineraries, traveling should feel effortless.
            </p>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4">
              Our app helps travelers discover places, plan trips, invite friends, split expenses, and share travel guides—all in one place. Whether you're planning a weekend getaway, a road trip, or an international adventure, Trivaller keeps everything organized so you can focus on the experience.
            </p>
            <p className="text-base md:text-lg text-white/90 leading-relaxed">
              We built Trivaller for explorers, dreamers, and planners who want smarter tools to turn travel ideas into real adventures.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
