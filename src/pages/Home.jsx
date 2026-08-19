import Hero from '@/components/sections/Hero'
import StatsBand from '@/components/sections/StatsBand'
import AboutSplit from '@/components/sections/AboutSplit'
import WhyUs from '@/components/sections/WhyUs'
import Services from '@/components/sections/Services'
import ProgramsShowcase from '@/components/sections/ProgramsShowcase'
import ProcessTimeline from '@/components/sections/ProcessTimeline'
import Testimonials from '@/components/sections/Testimonials'
import PartnersMarquee from '@/components/sections/PartnersMarquee'
import TeamPreview from '@/components/sections/TeamPreview'
import EventsPreview from '@/components/sections/EventsPreview'
import FaqSection from '@/components/sections/FaqSection'
import CtaBand from '@/components/sections/CtaBand'
import { useSeo } from '@/hooks/useSeo'

export default function Home() {
  useSeo({
    title: null,
    description:
      "TechStar Innovation Hub delivers hands-on STEM, coding, AI, IoT and robotics bootcamps to learners, teachers and schools across Tanzania's rural and underserved communities.",
    path: '/',
  })

  return (
    <>
      <Hero />
      <StatsBand />
      <AboutSplit />
      <WhyUs />
      <Services />
      <ProgramsShowcase />
      <PartnersMarquee />
      <ProcessTimeline />
      <Testimonials />
      <TeamPreview />
      <EventsPreview />
      <FaqSection />
      <CtaBand />
    </>
  )
}
