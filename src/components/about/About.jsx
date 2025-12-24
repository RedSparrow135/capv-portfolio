import React, { useState } from 'react'; // 1. Importar useState
import './About.css'
import SkillGrid from '../SkillCard/SkillGrid'
import { skillsPrimary } from '../../data/skillsData/skillsPrimary.js'
import { skillsSecondary } from '../../data/skillsData/skillsSecondary.js'

export default function About() {
  // 2. Estado para controlar la expansión
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="about">
      <img 
        src="/img/tuerca.png" 
        className="about-bg-gear" 
        alt="" 
      />
      
      {/* HEADER */}
      <div className="about-header">
        <span className="about-eyebrow">PERFIL PROFESIONAL</span>
        <h2>Sobre Mí</h2>
        <div className="about-line" />
      </div>

      <div className="about-hero">
        {/* IZQUIERDA */}
        <div className="about-intro">
          <h3 className="about-title">
            Ingeniería de Sistemas:
            <span> Arquitectura, Automatización y Escala</span>
          </h3>

          <div className="about-profile">
            <img
              className="about-avatar"
              src="/img/image_perfil.jpg"
              alt="Carlos Alonso"
            />
            <div>
              <h4>Carlos Alonso Picho Vargas</h4>
              <span>Ingeniero de Sistemas</span>
              <p>Backend · Cloud · DevOps · Android · Azure</p>
            </div>
          </div>

          {/* 3. Lógica de la descripción con clase dinámica */}
          <div className={`about-description-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <p className="about-description">
              Profesional en tecnologías de la información con enfoque en 
              <strong> Backend Engineering</strong>, <strong>Cloud Computing</strong> y 
              <strong> automatización DevOps</strong>. Me especializo en diseñar arquitecturas 
              estables, seguras y escalables, integrando servicios bien estructurados, APIs 
              robustas y modelos de despliegue optimizados. Mi trabajo se basa en principios de 
              arquitectura limpia, buenas prácticas, calidad de código y una comprensión profunda 
              de cómo cada capa del sistema afecta el rendimiento, la disponibilidad y la 
              experiencia final del usuario.
              <br /><br />
              Poseo una alta capacidad de análisis, adaptación y resolución de problemas 
              técnicos complejos, lo que me permite transformar requerimientos en soluciones 
              eficientes y mantenibles. Además, combino conocimientos en infraestructura, 
              bases de datos, contenedorización, automatización y observabilidad, manteniendo 
              siempre un enfoque orientado a confiabilidad, seguridad y escalabilidad real en 
              entornos productivos.
            </p>
          </div>

          {/* 4. Botón de Ver más / Ver menos */}
          <button className="btn-read-more" onClick={toggleReadMore}>
            {isExpanded ? 'Ver menos ↑' : 'Ver más ↓'}
          </button>

          <div className="about-actions">
            <button className="btn-primary">Explorar Proyectos</button>
            <button className="btn-secondary">Contactar Ahora</button>
            <a className="about-cv" href="/cv.pdf" target="_blank">
              Ver CV en PDF
            </a>
          </div>
        </div>

        {/* DERECHA */}
        {/* DERECHA: Paneles de Control */}
<div className="about-panels">
  <div className="panels-section">
    <h4 className="about-section-title">
      <span className="title-dot" /> Fortalezas Técnicas Clave
    </h4>
    <div className="grid-container">
      <SkillGrid skills={skillsPrimary} variant="primary" />
    </div>
  </div>

  <div className="about-focus">
    <h4 className="about-section-title">
       <span className="title-dot red" /> Mi Enfoque de Ingeniería
    </h4>
    
    <div className="focus-cards-container">
      <div className="focus-item">
        <div className="focus-icon">📐</div>
        <div className="focus-content">
          <strong>Diseño sólido</strong>
          <p>Pensar antes de codificar.</p>
        </div>
      </div>

      <div className="focus-item">
        <div className="focus-icon">✨</div>
        <div className="focus-content">
          <strong>Clean Code</strong>
          <p>Mantenible y escalable.</p>
        </div>
      </div>

      <div className="focus-item">
        <div className="focus-icon">🚀</div>
        <div className="focus-content">
          <strong>Optimización</strong>
          <p>Refactorización continua.</p>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>
    </section>
  )
}