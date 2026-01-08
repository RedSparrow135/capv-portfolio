import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "./experience.data";
import { useScrollReveal } from "../../hooks/useScrollReveal";

import "./Experience.css";

export default function Experience() {
  const [active, setActive] = useState(0);
  const exp = experiences[active];
const { ref, isInView } = useScrollReveal();

  return (
    <motion.section
  id="experience"
  ref={ref}
  className="experience"
  initial={{ opacity: 0, y: 32 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.45, ease: "easeOut" }}
>
    <section className="experience">
      <header className="experience-header">
        <span className="experience-eyebrow">Trayectoria</span>
        <h2>Experiencia Profesional</h2>
      </header>

      <div className="experience-grid">
        {/* TIMELINE */}
        <aside className="experience-timeline">
          <div className="timeline-line" />

          {experiences.map((item, i) => (
            <motion.button
              key={i}
              className={`timeline-item ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="dot" />
              {item.label}
            </motion.button>
          ))}
        </aside>

        {/* CONTENT */}
        <div className="experience-detail-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="experience-detail"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <h3>{exp.role}</h3>
              <span className="meta">
                {exp.company} · {exp.period}
              </span>

              <ul className="bullet-list">
                {exp.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i }}
                  >
                    ✓ {b}
                  </motion.li>
                ))}
              </ul>

              <div className="tech-list">
                {exp.tech.map((t, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              {/* BOTÓN */}
              <motion.a
                className="experience-link"
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.95 }}
                 href="/cv/CV-2025-Carlos Alonso Picho Vargas.pdf"
              target="_blank"
              >
                Ver currículum completo →
              </motion.a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
    </motion.section>
  );
}
