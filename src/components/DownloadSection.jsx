import { motion } from 'framer-motion'
import googlePlayIcon from '../assets/google-play-store-icon.webp'

export default function DownloadSection() {
  return (
    <section id="download" className="relative py-20 px-6 bg-gradient-to-b from-white to-zinc-100">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-4"
        >
          Start your journey today
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-[var(--color-text-secondary)] mb-12"
        >
          Available on iOS and Android
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-black text-white hover:bg-zinc-800 transition-colors shadow-lg shadow-black/10"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <span className="block text-xs font-medium opacity-90">Download on the</span>
              <span className="block text-lg font-semibold">App Store</span>
            </div>
          </motion.a>
          <motion.a
            href="#"
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-black text-white hover:bg-zinc-800 transition-colors shadow-lg shadow-black/10"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src={googlePlayIcon} alt="Play Store" className="w-10 h-10 object-contain flex-shrink-0" />
            <div className="text-left">
              <span className="block text-xs font-medium opacity-90">Get it on</span>
              <span className="block text-lg font-semibold">Play Store</span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
