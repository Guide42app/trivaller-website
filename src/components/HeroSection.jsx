import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, motion, useSpring } from 'framer-motion'
import trivallerIcon from '../assets/trivallericon.png'
import appScreenImg from '../assets/features/f1.PNG'

const TOTAL_FRAMES = 240
const MIN_FRAMES_TO_SHOW = 5

function padZeros(num, places) {
  return String(num).padStart(places, '0')
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
        img.src = `/trivaller_sequence/${padZeros(i, 5)}.jpg`
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
        const width = canvas.clientWidth || window.innerWidth || 300
        const height = canvas.clientHeight || window.innerHeight || 500
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const bufferWidth = Math.round(width * dpr)
        const bufferHeight = Math.round(height * dpr)
        if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
          canvas.width = bufferWidth
          canvas.height = bufferHeight
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        // Always cover full width and height (no responsive scaling)
        const scale = Math.max(width / img.width, height / img.height)
        const drawWidth = img.width * scale
        const drawHeight = img.height * scale
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
    const container = containerRef.current
    const canvas = canvasRef.current
    const ro = new ResizeObserver(invalidate)
    if (container) ro.observe(container)
    if (canvas) ro.observe(canvas)
    return () => {
      window.removeEventListener('resize', invalidate)
      ro.disconnect()
    }
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
        {loadedImages < MIN_FRAMES_TO_SHOW && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#E8ECEC]">
            <div className="w-16 h-16 border-4 border-black/10 border-t-black/80 rounded-full animate-spin mb-4" />
            <p className="text-black/60 font-medium tracking-wide">Loading Trivaller experience... {progressPercent}%</p>
          </div>
        )}
        <div className="absolute inset-0 pointer-events-none z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 min-w-0 max-w-7xl mx-auto w-full">
          {/* Trivaller text + iPhone frame: same animation, disappear together */}
          <motion.div style={{ opacity: opacity0, y: y0 }} className="absolute inset-0 flex flex-col items-start justify-start pt-[10vh] sm:pt-[14vh] md:pt-[16vh] lg:pt-[18vh] xl:pt-[20vh] pl-2 pr-3 sm:pl-4 md:pl-6 md:pr-6 lg:pl-10 lg:pr-8 xl:pl-12 xl:-ml-8 2xl:-ml-16">
            <div className="relative -mt-2 sm:-ml-4 pr-3 sm:pr-6 md:pr-8 pt-3 sm:pt-5 md:pt-6 pb-3 sm:pb-5 md:pb-6 pl-3 sm:pl-5 md:pl-6 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border-l-4 border-[#059669] shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-w-[95vw] md:max-w-[85vw] lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-sans text-left tracking-tight mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 sm:gap-3 flex-wrap" style={{ fontFamily: 'Poppins, sans-serif', textShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
                <img src={trivallerIcon} alt="" className="h-8 w-8 sm:h-11 sm:w-11 md:h-14 md:w-14 lg:h-16 lg:w-16 xl:h-20 xl:w-20 object-cover rounded-full shrink-0" />
                <span className="text-black font-semibold">Trivaller</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-black/70 font-medium tracking-wide text-left max-w-md md:max-w-lg lg:max-w-xl" style={{ letterSpacing: '0.02em' }}>Plot your path. Pack your bags. Go.</p>
            </div>
          </motion.div>
          {/* iPhone frame – right on sm+, below title on mobile; disappears with Trivaller text (opacity0, y0) */}
          <motion.div
            style={{ opacity: opacity0, y: y0 }}
            className="absolute right-2 top-[34vh] w-[180px] max-w-[50vw] sm:right-6 sm:top-1/2 sm:-translate-y-1/2 sm:max-w-none sm:w-[200px] md:right-8 md:w-[260px] lg:right-10 lg:w-[300px] xl:right-14 xl:w-[340px] 2xl:right-16 2xl:w-[380px] z-10"
            aria-hidden
          >
            <div className="bg-[#1c1c1e] rounded-[1.25rem] p-1.5 sm:rounded-[2.25rem] sm:p-2.5 md:rounded-[2.5rem] md:p-3 shadow-[0_25px_80px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(0,0,0,0.05)] w-full">
              <div className="relative rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[1.75rem] overflow-hidden bg-black aspect-[9/20]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[28%] max-w-[40px] sm:max-w-[60px] h-4 sm:h-6 bg-[#1c1c1e] rounded-b-lg sm:rounded-b-xl z-10" aria-hidden />
                <img
                  src={appScreenImg}
                  alt=""
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>
          <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute inset-0 flex flex-col items-start justify-center pl-2 pr-3 sm:pl-4 md:pl-6 md:pr-6 lg:pl-10 lg:pr-8 xl:pl-12 xl:-ml-8 2xl:-ml-16 w-full md:max-w-[85vw] lg:w-[48%] lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
            <div className="relative sm:-ml-4 pr-3 sm:pr-6 md:pr-8 pt-3 sm:pt-5 md:pt-6 pb-3 sm:pb-5 md:pb-6 pl-3 sm:pl-5 md:pl-6 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border-l-4 border-[#059669] shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-w-[95vw] md:max-w-xl lg:max-w-none w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-sans font-semibold tracking-tight text-black mb-3 sm:mb-4 md:mb-5" style={{ fontFamily: 'Poppins, sans-serif', textShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>Your Trip<br/>Begins Here</h2>
              <p className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl text-black/70 font-medium leading-relaxed max-w-sm md:max-w-md lg:max-w-lg" style={{ letterSpacing: '0.015em' }}>Dream it. Map it. Live it.</p>
            </div>
          </motion.div>
          <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute inset-0 flex flex-col items-start justify-start pt-[10vh] sm:pt-[14vh] md:pt-[16vh] lg:pt-[18vh] xl:pt-[20vh] pl-2 pr-3 sm:pl-4 md:pl-6 md:pr-6 lg:pl-10 lg:pr-8 xl:pl-12 xl:-ml-8 2xl:-ml-16 w-full md:max-w-[85vw] lg:w-[48%] lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
            <div className="relative sm:-ml-4 pr-3 sm:pr-6 md:pr-8 pt-3 sm:pt-5 md:pt-6 pb-3 sm:pb-5 md:pb-6 pl-3 sm:pl-5 md:pl-6 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border-l-4 border-[#059669] shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-w-[95vw] md:max-w-xl lg:max-w-none w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-sans font-semibold tracking-tight text-black mb-3 sm:mb-4 md:mb-5 text-left" style={{ fontFamily: 'Poppins, sans-serif', textShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>Build your own itinerary</h2>
              <p className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl text-black/70 font-medium leading-relaxed max-w-[400px] md:max-w-md lg:max-w-lg text-left" style={{ letterSpacing: '0.015em' }}>Day by day, your perfect trip unfolds.</p>
            </div>
          </motion.div>
          <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute inset-0 flex flex-col items-start justify-end pb-4 sm:pb-6 md:pb-8 lg:pb-10 xl:pb-12 pl-2 pr-3 sm:pl-4 md:pl-6 md:pr-6 lg:pl-10 lg:pr-8 xl:pl-12 xl:-ml-8 2xl:-ml-16 w-full md:max-w-[85vw] lg:w-[48%] lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
            <div className="relative sm:-ml-4 pr-3 sm:pr-6 md:pr-8 pt-3 sm:pt-5 md:pt-6 pb-3 sm:pb-5 md:pb-6 pl-3 sm:pl-5 md:pl-6 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-md border-l-4 border-[#059669] shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-w-[95vw] md:max-w-xl lg:max-w-none w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-sans font-semibold tracking-tight text-black mb-3 sm:mb-4 text-left" style={{ fontFamily: 'Poppins, sans-serif', textShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>Your Adventure Awaits</h2>
              <p className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl text-black/70 font-medium text-left mb-4 sm:mb-6 md:mb-8 lg:mb-10 max-w-md md:max-w-lg lg:max-w-xl" style={{ letterSpacing: '0.015em' }}>Your next adventure starts with one tap.</p>
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
