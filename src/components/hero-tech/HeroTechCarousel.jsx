import "./HeroTechCarousel.css";
import { HERO_TECHS } from "../../config/heroTechs";

export default function HeroTechCarousel() {
  return (
    <div className="hero-tech-carousel">
      <div className="hero-tech-track">
        {[...HERO_TECHS, ...HERO_TECHS].map((tech, i) => (
          <div
            key={i}
            className="hero-tech-item"
            style={{ "--tech-color": tech.color }}   // 🔥 CLAVE
          >
            <img src={tech.logo} alt={tech.name} />
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
