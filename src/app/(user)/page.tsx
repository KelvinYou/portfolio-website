import Image from 'next/image'
import Hero from './Hero'
import AboutMe from './AboutMe'
import Github from './Github'
import Project from '@/components/projects/Project'
import Experience from '@/components/experience/Experience'
import "@/styles/index.scss";


export default function Home() {
  return (
    <main id="main-home" className="">
      <Hero />

      <AboutMe />

      <Experience />

      <Github />

      <Project />

    </main>
  )
}
