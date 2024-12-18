import ProjectValueSection from '@/components/guest/about/project-value-section'
import StakeholdersSection from '@/components/guest/about/stakeholders-section'
import ValueChainsSection from '@/components/guest/about/value-chains-section'
import VisionSection from '@/components/guest/about/vision-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos de Cassava Marketplace',
  description: 'Découvrez notre vision, nos parties prenantes et la valeur que nous apportons au secteur agricole.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto space-y-24 px-4 py-16">
      <h1 className="mb-12 text-center text-4xl font-bold">À propos de Cassava Marketplace</h1>
      <VisionSection />
      <StakeholdersSection />
      <ProjectValueSection />
      <ValueChainsSection />
    </div>
  )
}

