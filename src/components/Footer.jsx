import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import guideme42icon from '../assets/guideme42icon.png'
import googlePlayIcon from '../assets/google-play-store-icon.webp'

const productLinks = [
  { href: '/#features-section', label: 'Features' },
  { href: '/#hero', label: 'How it works' },
  { href: '/#about', label: 'About' },
]
const companyLinks = [
  { href: '/#about', label: 'About' },
  { href: '/support', label: 'Support' },
  { href: '/privacy', label: 'Privacy' },
]
const connectLinks = [
  { href: '#', label: 'Twitter' },
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950" />
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#059669]/40 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <img
                src={guideme42icon}
                alt="GuideMe42"
                className="h-12 w-12 object-cover rounded-full ring-2 ring-white/10"
              />
              <span className="text-2xl font-semibold tracking-tight">
                <span className="text-white">GuideMe</span>
                <span className="text-[#10b981]">42</span>
              </span>
            </Link>
            <p className="text-zinc-400 text-lg max-w-sm leading-relaxed mb-8">
              Plan trips, discover places, split costs, and share guides—all in one app.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#059669] text-white text-sm font-medium hover:bg-[#047857] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </motion.a>
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-800 text-white text-sm font-medium hover:bg-zinc-700 transition-colors border border-zinc-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img src={googlePlayIcon} alt="Play Store" className="w-5 h-5 object-contain flex-shrink-0" />
                Get it on Play Store
              </motion.a>
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-zinc-400 hover:text-[#10b981] transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-zinc-400 hover:text-[#10b981] transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-zinc-400 hover:text-[#10b981] transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Connect</h3>
              <ul className="space-y-3">
                {connectLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-zinc-400 hover:text-[#10b981] transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} GuideMe42. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/support" className="text-zinc-500 hover:text-zinc-300 transition-colors">Support</Link>
            <Link to="/terms" className="text-zinc-500 hover:text-zinc-300 transition-colors">Terms</Link>
            <Link to="/privacy" className="text-zinc-500 hover:text-zinc-300 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
