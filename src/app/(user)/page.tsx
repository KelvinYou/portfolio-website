import Hero from './_components/Hero'
import AboutMe from './_components/AboutMe'
import Github from './_components/Github'
import Project from './_components/Project'
import Experience from './_components/Experience'
import "@/styles/index.scss";


export default function Home() {
  return (
    <main id="main-home" className="pt-20">
      <Hero />

      <AboutMe />

      <Experience />

      <Project />
      
      <Github />

    </main>
  )
}
