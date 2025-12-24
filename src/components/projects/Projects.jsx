import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "./projects.data";
import ProjectCard from "./ProjectCard";

import "./Projects.css";

export default function Projects() {
  const [active, setActive] = useState(0);

  return (
    <section className="projects">
      <header className="projects-header">
        <h2>Proyectos Destacados</h2>
        <p>
          Explora mi portafolio de soluciones tecnológicas, desde arquitectura
          móvil hasta infraestructura cloud.
        </p>
      </header>

      <div className="projects-grid">
        {/* SELECTOR */}
        <aside className="projects-list">
          <span className="projects-label">Seleccionar proyecto</span>

          {projects.map((p, i) => (
            <motion.button
              key={p.id}
              className={`project-item ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.97 }}
            >
              <div>
                <strong>{p.short}</strong>
                <small>{p.stack.join(" + ")}</small>
              </div>
              <span className="arrow">›</span>
            </motion.button>
          ))}
        </aside>

        {/* PANEL */}
        <div className="project-panel">
          <AnimatePresence mode="wait">
            <ProjectCard key={projects[active].id} project={projects[active]} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
