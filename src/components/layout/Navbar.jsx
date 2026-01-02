import { useEffect, useState } from 'react'
import './Navbar.css'

export default function Navbar({ hidden , atTop }) {
  const [theme, setTheme] = useState('dark')
  const [identity, setIdentity] = useState('personal') // 👈 NUEVO

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light')
    document.body.classList.toggle('dark', theme === 'dark')

    document.body.classList.toggle(
      'identity-redsparrow',
      identity === 'dev'
    )
    document.body.classList.toggle(
      'identity-personal',
      identity === 'personal'
    )
  }, [theme, identity])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const toggleIdentity = () => {
    setIdentity(prev => (prev === 'personal' ? 'dev' : 'personal'))
  }

const goTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  return (
    <header className={`navbar ${hidden ? 'navbar-hidden' : ''} ${atTop ? 'navbar-top' : 'navbar-scrolled'}`}>
      {/* LOGO */}
      <div className="navbar-left">
        <div className="navbar-logo"  onClick={() => goTo('hero')}>
          {identity === 'dev' ? (
            <>
              <img src="/logo-redsparrow.png" alt="RedSparrow" />
              <span>RedSparrow</span>
            </>
          ) : (
            <>
              <img src="/logo.png" alt="CAPV" />
              <span>CAPV</span>
            </>
          )}
        </div>
      </div>

      {/* LINKS */}
      <nav className="navbar-links">
        <button onClick={() => goTo('about')}>Sobre mí</button>
        <button onClick={() => goTo('experience')}>Experiencia</button>
        <button onClick={() => goTo('projects')}>Proyectos</button>
      </nav>

      {/* ACTIONS */}
      <div className="navbar-actions">
        {/* MODO DEV */}
       { /*<button
          className={`identity-toggle ${
            identity === 'dev' ? 'active' : ''
          }`}
          onClick={toggleIdentity}
        >
          {identity === 'dev' ? 'DEV MODE' : 'PERSONAL'}
        </button>*/}

        {/* THEME */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Cambiar tema"
        >
          {theme === 'dark' ? '☀︎' : '☾'}
        </button>

        <button className="navbar-cta" onClick={() => goTo('contact')}>
          Contactame
        </button>
      </div>
    </header>
  )
}
