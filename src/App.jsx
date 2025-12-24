
import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProgressiveScroll  from './components/scroll/ProgressiveScroll'
import Hero from './components/hero/Hero'
import About from './components/about/About'
import Experience from './components/experience/Experience'
import Projects from './components/projects/Projects'
import Contact from './components/contact/Contact'
function App() {
  const [hideNavbar, setHideNavbar] = useState(false)

  return (
    <>
      <Navbar hidden={hideNavbar} />

      <ProgressiveScroll onNavbarToggle={setHideNavbar}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />

      </ProgressiveScroll>
      
      <Footer />
    </>
  )
}

export default App
