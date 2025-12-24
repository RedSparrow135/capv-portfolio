import "./HeroBadge.css";

const LABELS = {
  available: "Disponible para proyectos",
  busy: "Actualmente ocupado",
  offline: "No disponible",
};

export default function HeroBadge({ status = "available" }) {
  return (
    <span className={`hero-badge status-${status}`}>
      {LABELS[status] ?? LABELS.available}
    </span>
  );
}
