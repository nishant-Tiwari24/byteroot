'use client'
import { Skeleton } from '@chakra-ui/react'
import { SpotlightPreview } from './components/Hero-parallax'
import { BentoGridDemo } from './components/Hero-bento'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <div className="h-screen">
      <SpotlightPreview />
      <BentoGridDemo />
      <Footer />
    </div>
  )
}
