import { motion } from "framer-motion";

export default function ProjectMedia({ media, status }) {
  if (!media) return null;

  return (
    <motion.div
      className="project-media"
      initial={{ opacity: 0, scale: 0.50 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {/* STATUS */}
      <div className="media-status">
        <span className="dot" />
        {status}
      </div>

      {/* MEDIA */}
      {media.type === "image" && (
        <img src={media.src} alt={media.alt || ""} />
      )}

      {media.type === "video" && (
        <video
          src={media.src}
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* OVERLAY */}
      <div className="media-overlay" />
    </motion.div>
  );
}
