import Image from 'next/image'
import Hero from './Hero'
import AboutMe from './AboutMe'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <AboutMe />
    </main>
  )
}
