import Image from 'next/image'
import Hero from './Hero'
import AboutMe from './AboutMe'
import Github from './Github'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <AboutMe />

      <Github />
    </main>
  )
}
