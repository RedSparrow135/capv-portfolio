import { useEffect, useState } from 'react'
import './Navbar.css'

export default function Navbar({ hidden }) {
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

  const go = (index) => {
    window.dispatchEvent(
      new CustomEvent('progressive:navigate', { detail: index })
    )
  }

  return (
    <header className={`navbar ${hidden ? 'navbar-hidden' : ''}`}>
      {/* LOGO */}
      <div className="navbar-left">
        <div className="navbar-logo" onClick={() => go(0)}>
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
        <button onClick={() => go(1)}>Sobre mí</button>
        <button onClick={() => go(2)}>Experiencia</button>
        <button onClick={() => go(3)}>Proyectos</button>
      </nav>

      {/* ACTIONS */}
      <div className="navbar-actions">
        {/* MODO DEV */}
        <button
          className={`identity-toggle ${
            identity === 'dev' ? 'active' : ''
          }`}
          onClick={toggleIdentity}
        >
          {identity === 'dev' ? 'DEV MODE' : 'PERSONAL'}
        </button>

        {/* THEME */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Cambiar tema"
        >
          {theme === 'dark' ? '☀︎' : '☾'}
        </button>

        <button className="navbar-cta" onClick={() => go(4)}>
          Contrátame
        </button>
      </div>
    </header>
  )
}
