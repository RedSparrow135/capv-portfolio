
import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { useNavbarScroll } from "./hooks/useNavbarScroll";
import ProgressiveScroll  from './components/scroll/ProgressiveScroll'
import Hero from './components/hero/Hero'
import About from './components/about/About'
import Experience from './components/experience/Experience'
import Projects from './components/projects/Projects'
import Contact from './components/contact/Contact'
import { useHideOnScroll } from "./hooks/useHideOnScroll";
function App() {
   const hideNavbar = useHideOnScroll();
const { hidden, atTop } = useNavbarScroll();
  return (
    <>
      <Navbar hidden={hideNavbar} atTop={atTop} />

       <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />

      
      <Footer />
    </>
  )
}

export default App
