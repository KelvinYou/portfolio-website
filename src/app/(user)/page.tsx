import Image from 'next/image'
import Hero from './Hero'
import AboutMe from './AboutMe'
import Github from './Github'
import Project from './projects/Project'
import Experience from './exp/Experience'
import "@/styles/index.scss";


export default function Home() {
  return (
    <main className="">
      <Hero />

      <AboutMe />

      <Experience />

      <Github />

      <Project />

    </main>
  )
}
