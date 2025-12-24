import { motion } from "framer-motion";
import ProjectMedia from "./ProjectMedia";

export default function ProjectCard({ project }) {
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* ================= MEDIA HEADER ================= */}
      <div className="project-media">
        <ProjectMedia media={project.media} />

        {/* DEPLOY */}
        <div className="project-status">
          <span className="dot" />
          {project.status}
        </div>

        {/* TITLE OVER MEDIA */}
        <div className="project-title-block">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-subtitle">{project.subtitle}</p>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="project-body">
        {/* DESCRIPCIÓN */}
        <div>
          <h4>Descripción Técnica</h4>
          <p className="project-description">
            {project.longDescription}
          </p>
        </div>

        {/* TECNOLOGÍAS */}
        <div>
          <h4>Tecnologías</h4>
          <div className="tech-tags">
            {project.stack.map((t, i) => (
              <span
                key={i}
                className={`tech tech-${t.toLowerCase().replace(/\s/g, "")}`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="project-actions">
          {project.actions.demo && (
            <a
              href={project.actions.demo}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Ver Demo Live ↗
            </a>
          )}

          {project.actions.repo && (
            <a
              href={project.actions.repo}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              &lt;/&gt; Repositorio GitHub
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
