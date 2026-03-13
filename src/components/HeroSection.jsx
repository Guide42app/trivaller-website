import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, motion, useSpring } from 'framer-motion'
import guideme42icon from '../assets/guideme42icon.png'

const TOTAL_FRAMES = 240
const MIN_FRAMES_TO_SHOW = 5

function padZeros(num, places) {
  return String(num).padStart(places, '0')
}

function Cloud({ className = '' }) {
  return (
    <svg
      viewBox="0 0 160 70"
      className={`flex-shrink-0 ${className}`}
      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.06))' }}
      aria-hidden
    >
      <defs>
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.98)" />
          <stop offset="70%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(248,250,252,0.82)" />
        </linearGradient>
      </defs>
      <g fill="url(#cloudGrad)">
        {/* Base puffs - layered for a cumulus look */}
        <ellipse cx="45" cy="48" rx="28" ry="14" />
        <ellipse cx="82" cy="45" rx="35" ry="16" />
        <ellipse cx="118" cy="48" rx="26" ry="13" />
        {/* Middle layer */}
        <ellipse cx="65" cy="38" rx="32" ry="15" />
        <ellipse cx="95" cy="42" rx="24" ry="12" />
        {/* Top puffs */}
        <ellipse cx="52" cy="28" rx="22" ry="12" />
        <ellipse cx="78" cy="25" rx="28" ry="14" />
        <ellipse cx="105" cy="30" rx="20" ry="10" />
        {/* Small accent puffs */}
        <ellipse cx="38" cy="42" rx="14" ry="8" />
        <ellipse cx="125" cy="40" rx="12" ry="7" />
      </g>
    </svg>
  )
}

export default function HeroSection() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  const [loadedImages, setLoadedImages] = useState(0)
  const imagesRef = useRef([])
  const currentFrameDrawn = useRef(-1)

  // Load first few frames immediately so we can show the hero; preload the rest in background
  useEffect(() => {
    const loadFrame = (i) =>
      new Promise((resolve) => {
        const img = new Image()
        img.src = `/guideme42_sequence/${padZeros(i, 5)}.jpg`
        img.onload = () => {
          imagesRef.current[i] = img
          setLoadedImages((c) => c + 1)
          resolve()
        }
        img.onerror = () => resolve()
      })

    const preloadImages = async () => {
      // Load first MIN_FRAMES_TO_SHOW frames so hero can show quickly
      for (let i = 1; i <= MIN_FRAMES_TO_SHOW; i++) {
        await loadFrame(i)
      }
      // Preload the rest in background (no await) so animation is smooth as user scrolls
      for (let i = MIN_FRAMES_TO_SHOW + 1; i <= TOTAL_FRAMES; i++) {
        loadFrame(i)
      }
    }
    preloadImages()
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const smoothProgress = useSpring(scrollYProgress, { damping: 40, stiffness: 200, mass: 0.2 })
  const frameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_FRAMES])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { alpha: false })
    if (!canvas || !ctx) return

    let animationFrameId
    const render = () => {
      let targetFrame = Math.round(frameIndex.get())
      targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, targetFrame))

      if (imagesRef.current[targetFrame] && currentFrameDrawn.current !== targetFrame) {
        const img = imagesRef.current[targetFrame]
        let width = canvas.clientWidth || 0
        let height = canvas.clientHeight || 0
        if (width <= 0 || height <= 0) {
          width = window.innerWidth || 300
          height = window.innerHeight || 500
        }
        const dpr = window.devicePixelRatio || 1
        const isMobile = window.innerWidth < 768
        const renderScale = isMobile ? 0.75 : 1
        const effectiveDpr = isMobile ? Math.min(dpr, 1.5) * renderScale : dpr
        const bufferWidth = Math.round(width * effectiveDpr)
        const bufferHeight = Math.round(height * effectiveDpr)
        if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
          canvas.width = bufferWidth
          canvas.height = bufferHeight
        }
        ctx.setTransform(effectiveDpr, 0, 0, effectiveDpr, 0, 0)
        const sizeFactor = isMobile ? 0.55 : 1
        const targetW = width * sizeFactor
        const targetH = height * sizeFactor
        const imgScale = Math.max(targetW / img.width, targetH / img.height)
        const drawWidth = img.width * imgScale
        const drawHeight = img.height * imgScale
        const dx = (width - drawWidth) / 2
        const dy = (height - drawHeight) / 2
        ctx.fillStyle = '#E8ECEC'
        ctx.fillRect(0, 0, width, height)
        ctx.drawImage(img, dx, dy, drawWidth, drawHeight)
        currentFrameDrawn.current = targetFrame
      }
      animationFrameId = requestAnimationFrame(render)
    }
    render()
    const initialDrawTimer = setInterval(() => {
      if (imagesRef.current[1] && currentFrameDrawn.current === -1) {
        frameIndex.set(1)
        clearInterval(initialDrawTimer)
      }
    }, 100)
    return () => {
      cancelAnimationFrame(animationFrameId)
      clearInterval(initialDrawTimer)
    }
  }, [frameIndex])

  useEffect(() => {
    const invalidate = () => { currentFrameDrawn.current = -1 }
    window.addEventListener('resize', invalidate)
    const el = containerRef.current
    if (el) {
      const ro = new ResizeObserver(invalidate)
      ro.observe(el)
      return () => {
        window.removeEventListener('resize', invalidate)
        ro.disconnect()
      }
    }
    return () => window.removeEventListener('resize', invalidate)
  }, [])

  const opacity0 = useTransform(smoothProgress, [0, 0.05, 0.1], [1, 1, 0])
  const y0 = useTransform(smoothProgress, [0, 0.05], [0, -20])
  const opacity1 = useTransform(smoothProgress, [0.15, 0.25, 0.35], [0, 1, 0])
  const y1 = useTransform(smoothProgress, [0.15, 0.25], [20, 0])
  const opacity2 = useTransform(smoothProgress, [0.5, 0.6, 0.7], [0, 1, 0])
  const y2 = useTransform(smoothProgress, [0.5, 0.6], [20, 0])
  const opacity3 = useTransform(smoothProgress, [0.8, 0.9, 1], [0, 1, 1])
  const y3 = useTransform(smoothProgress, [0.8, 0.9], [20, 0])
  const progressPercent = Math.round((loadedImages / TOTAL_FRAMES) * 100)

  return (
    <div ref={containerRef} id="hero" className="relative w-full h-[350vh] md:h-[500vh] bg-[#E8ECEC] font-sans">
      <div className="sticky top-0 left-0 right-0 w-full min-h-screen h-[100dvh] sm:h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full z-0"
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
        {/* Looping cloud layer */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden opacity-80">
          <motion.div
            className="absolute top-[15%] left-0 h-[120px] flex"
            style={{ width: '200%' }}
            animate={{ x: [0, '-50%'] }}
            transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          >
            <div className="flex shrink-0 items-end gap-[15%] w-1/2">
              <Cloud className="w-32 h-12 sm:w-40 sm:h-14" />
              <Cloud className="w-24 h-10 sm:w-28 sm:h-11" />
              <Cloud className="w-40 h-14 sm:w-52 sm:h-16" />
              <Cloud className="w-28 h-11 sm:w-36 sm:h-12" />
            </div>
            <div className="flex shrink-0 items-end gap-[15%] w-1/2">
              <Cloud className="w-32 h-12 sm:w-40 sm:h-14" />
              <Cloud className="w-24 h-10 sm:w-28 sm:h-11" />
              <Cloud className="w-40 h-14 sm:w-52 sm:h-16" />
              <Cloud className="w-28 h-11 sm:w-36 sm:h-12" />
            </div>
          </motion.div>
          <motion.div
            className="absolute top-[25%] left-0 h-[100px] flex"
            style={{ width: '200%' }}
            animate={{ x: ['-50%', 0] }}
            transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
          >
            <div className="flex shrink-0 items-end gap-[20%] w-1/2">
              <Cloud className="w-28 h-10 sm:w-36 sm:h-12" />
              <Cloud className="w-36 h-12 sm:w-44 sm:h-14" />
              <Cloud className="w-20 h-8 sm:w-24 sm:h-9" />
            </div>
            <div className="flex shrink-0 items-end gap-[20%] w-1/2">
              <Cloud className="w-28 h-10 sm:w-36 sm:h-12" />
              <Cloud className="w-36 h-12 sm:w-44 sm:h-14" />
              <Cloud className="w-20 h-8 sm:w-24 sm:h-9" />
            </div>
          </motion.div>
          <motion.div
            className="absolute top-[8%] left-0 h-[80px] flex"
            style={{ width: '200%' }}
            animate={{ x: [0, '-50%'] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <div className="flex shrink-0 items-end gap-[25%] w-1/2">
              <Cloud className="w-24 h-9 sm:w-28 sm:h-10" />
              <Cloud className="w-36 h-12 sm:w-44 sm:h-14" />
            </div>
            <div className="flex shrink-0 items-end gap-[25%] w-1/2">
              <Cloud className="w-24 h-9 sm:w-28 sm:h-10" />
              <Cloud className="w-36 h-12 sm:w-44 sm:h-14" />
            </div>
          </motion.div>
        </div>
        {loadedImages < MIN_FRAMES_TO_SHOW && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#E8ECEC]">
            <div className="w-16 h-16 border-4 border-black/10 border-t-black/80 rounded-full animate-spin mb-4" />
            <p className="text-black/60 font-medium tracking-wide">Loading GuideMe42 experience... {progressPercent}%</p>
          </div>
        )}
        <div className="absolute inset-0 pointer-events-none z-10 px-6 max-w-7xl mx-auto w-full">
          <motion.div style={{ opacity: opacity0, y: y0 }} className="absolute inset-0 flex flex-col items-start justify-start pt-[12vh] sm:pt-[20vh] pl-3 pr-4 sm:pl-4 md:pl-4 md:-ml-16">
            <div className="relative sm:-ml-4 -mt-2 pr-4 sm:pr-8 pt-4 sm:pt-6 pb-4 sm:pb-6 pl-4 sm:pl-6 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border-l-4 border-[#059669] shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-w-[95vw]">
              <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-sans text-left tracking-tight mb-2 sm:mb-4 flex items-center gap-2 sm:gap-3" style={{ fontFamily: 'Poppins, sans-serif', textShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
                <img src={guideme42icon} alt="" className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 object-cover rounded-full shrink-0" />
                <span><span className="text-black font-semibold">GuideMe</span><span className="text-[#059669] font-semibold">42</span></span>
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-black/70 font-medium tracking-wide text-left max-w-md" style={{ letterSpacing: '0.02em' }}>Plot your path. Pack your bags. Go.</p>
            </div>
          </motion.div>
          <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute inset-0 flex flex-col items-start justify-center pl-3 pr-4 sm:pl-4 md:pl-4 md:-ml-16 w-full md:w-1/2">
            <div className="relative sm:-ml-4 pr-4 sm:pr-8 pt-4 sm:pt-6 pb-4 sm:pb-6 pl-4 sm:pl-6 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border-l-4 border-[#059669] shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-w-[95vw]">
              <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-sans font-semibold tracking-tight text-black mb-3 sm:mb-5" style={{ fontFamily: 'Poppins, sans-serif', textShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>Your Trip<br/>Begins Here</h2>
              <p className="text-base sm:text-lg md:text-xl text-black/70 font-medium leading-relaxed max-w-sm" style={{ letterSpacing: '0.015em' }}>Dream it. Map it. Live it.</p>
            </div>
          </motion.div>
          <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute inset-0 flex flex-col items-start justify-start pt-[12vh] sm:pt-[20vh] pl-3 pr-4 sm:pl-4 md:pl-4 md:-ml-16 w-full md:w-1/2">
            <div className="relative sm:-ml-4 pr-4 sm:pr-8 pt-4 sm:pt-6 pb-4 sm:pb-6 pl-4 sm:pl-6 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border-l-4 border-[#059669] shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-w-[95vw]">
              <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-sans font-semibold tracking-tight text-black mb-3 sm:mb-5 text-left" style={{ fontFamily: 'Poppins, sans-serif', textShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>Build your own itinerary</h2>
              <p className="text-base sm:text-lg md:text-xl text-black/70 font-medium leading-relaxed max-w-[400px] text-left" style={{ letterSpacing: '0.015em' }}>Day by day, your perfect trip unfolds.</p>
            </div>
          </motion.div>
          <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute inset-0 flex flex-col items-start justify-end pb-6 sm:pb-8 md:pb-12 pl-3 pr-4 sm:pl-4 md:pl-4 md:-ml-16 w-full md:w-1/2">
            <div className="relative sm:-ml-4 pr-4 sm:pr-8 pt-4 sm:pt-6 pb-4 sm:pb-6 pl-4 sm:pl-6 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border-l-4 border-[#059669] shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-w-[95vw]">
              <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-sans font-semibold tracking-tight text-black mb-3 sm:mb-4 text-left" style={{ fontFamily: 'Poppins, sans-serif', textShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>Your Adventure Awaits</h2>
              <p className="text-base sm:text-lg md:text-xl text-black/70 font-medium text-left mb-6 sm:mb-10" style={{ letterSpacing: '0.015em' }}>Your next adventure starts with one tap.</p>
              <div className="pointer-events-auto">
                <a href="#download" className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-4 sm:py-5 text-sm sm:text-base bg-black text-white rounded-full font-medium tracking-wide hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-black/10 group">
                  <span>Start Planning</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
