import { useRef } from 'react'
import Nav from '../components/Nav'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import FeatureSection from '../components/FeatureSection'
import DownloadSection from '../components/DownloadSection'
import Footer from '../components/Footer'

export default function HomePage() {
  const featuresRef = useRef(null)

  return (
    <div className="min-h-screen text-black">
      <Nav featuresSectionRef={featuresRef} />
      <HeroSection />
      <AboutSection />
      <FeatureSection ref={featuresRef} />
      <DownloadSection />
      <Footer />
    </div>
  )
}
