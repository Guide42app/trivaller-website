import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ExpandingHowBand from '@/components/sections/ExpandingHowBand'
import JeevaSection from '@/components/sections/JeevaSection'
import DiscoverSection from '@/components/sections/DiscoverSection'
import PlannerSection from '@/components/sections/PlannerSection'
import TogetherSection from '@/components/sections/TogetherSection'
import RoutesSection from '@/components/sections/RoutesSection'
import ThreadsSection from '@/components/sections/ThreadsSection'
import DealsSection from '@/components/sections/DealsSection'
import BusinessSection from '@/components/sections/BusinessSection'
import DownloadSection from '@/components/sections/DownloadSection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="bg-forest">
        <HeroSection />
        <ExpandingHowBand />
        <JeevaSection />
        <DiscoverSection />
        <PlannerSection />
        <TogetherSection />
        <RoutesSection />
        <ThreadsSection />
        <DealsSection />
        <BusinessSection />
        <DownloadSection />
      </main>
      <Footer />
    </>
  )
}
