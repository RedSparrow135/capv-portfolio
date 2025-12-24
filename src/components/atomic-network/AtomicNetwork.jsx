import { useEffect, useMemo, useRef, useState } from "react";
import { initEngine, destroyEngine } from "./engine";
import { NODES_DATA } from "./config";
import "./styles.css";

function SkillModal({ open, onClose, data }) {
  if (!open || !data) return null;

  return (
    <div className="an-modal-backdrop" onMouseDown={onClose}>
      <div className="an-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="an-modal-head">
          <div className="an-modal-icon">{data.icon}</div>
          <div>
            <div className="an-modal-title">{data.label}</div>
            <div className="an-modal-sub">{data.sub}</div>
          </div>
          <button className="an-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="an-modal-body">
          <p>
            Aquí puedes poner descripción real por skill, links, proyectos relacionados,
            tech stack, etc.
          </p>
          <div className="an-modal-tags">
            <span>{data.id}</span>
            <span>portfolio</span>
            <span>CAPV</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AtomicNetwork() {
  const containerRef = useRef(null);
  const engineRef = useRef(null);

  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const isMobile = useMemo(() => window.innerWidth < 768, []);

  useEffect(() => {
    if (!containerRef.current) return;

    engineRef.current = initEngine(containerRef.current, {
      onNodeClick: (index) => {
        const d = NODES_DATA[index];
        if (d) setSelected(d);
      },
      onCoreClick: () => {
        if (isMobile) setExpanded((v) => !v);
      },
      getRenderOptions: () => ({
        expanded: isMobile ? expanded : true,
      }),
    });

    return () => destroyEngine(engineRef.current);
  }, [expanded, isMobile]);

  return (
    <div className="atomic-network-wrap">
      <div ref={containerRef} className="atomic-network" />

      <SkillModal
        open={!!selected}
        data={selected}
        onClose={() => setSelected(null)}
      />

      {isMobile && (
        <div className="an-hint">
          {expanded ? "Tap core para colapsar" : "Tap core para expandir"}
        </div>
      )}
    </div>
  );
}
