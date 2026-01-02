import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "./projects.data";
import ProjectCard from "./ProjectCard";

import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Projects.css";

export default function Projects() {
  const [active, setActive] = useState(0);
const { ref, isInView } = useScrollReveal();
  return (
    
<motion.section
id="projects"
  ref={ref}
  className="projects"
  initial={{ opacity: 0, y: 36 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
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
    </motion.section>
  );
}
