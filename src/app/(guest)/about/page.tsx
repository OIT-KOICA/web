import ProjectValueSection from '@/components/guest/about/stakeholders-section'
import StakeholdersSection from '@/components/guest/about/stakeholders-section'
import ValueChainsSection from '@/components/guest/about/value-chains-section'
import VisionSection from '@/components/guest/about/vision-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Cassava Marketplace',
  description: 'Learn about our vision, stakeholders, and the value we bring to the agricultural sector.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 space-y-24">
      <h1 className="text-4xl font-bold text-center mb-12">About Cassava Marketplace</h1>
      <VisionSection />
      <StakeholdersSection />
      <ProjectValueSection />
      <ValueChainsSection />
    </div>
  )
}

