import { CONFIG, NODES_DATA, THEMES } from "./config";

/* ================= CONFIG ================= */
const SOFT_LIMIT_RADIUS = 360;
const HALO_INNER = 0.82;
const HALO_OUTER = 1.0;

/* ================= THEME ================= */
function currentTheme() {
  const isLight = document.body.classList.contains("light");
  return isLight ? THEMES.light : THEMES.dark;
}

/* ================= UTILS ================= */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* ================= CARD ================= */
function drawCard(ctx, x, y, data, isHover, compact, theme) {
  const w = compact ? 110 : 132;
  const h = 52;
  const r = 14;

  ctx.save();

  ctx.shadowBlur = isHover ? 26 : 14;
  ctx.shadowColor = data.color;

  ctx.fillStyle = theme.cardBg;
  roundRect(ctx, x - w / 2, y - h / 2, w, h, r);
  ctx.fill();

  ctx.shadowBlur = 0;

  /* icon bg */
  ctx.fillStyle = "rgba(37,99,235,0.12)";
  roundRect(ctx, x - w / 2 + 10, y - 16, 30, 30, 12);
  ctx.fill();

  /* icon */
  ctx.font = "15px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = data.color;
  ctx.fillText(data.icon, x - w / 2 + 25, y + 5);

  /* title */
  ctx.textAlign = "left";
  ctx.font = "12.5px Inter, system-ui, sans-serif";
  ctx.fillStyle = theme.textMain;
  ctx.fillText(data.label, x - w / 2 + 48, y - 2);

  if (!compact) {
    ctx.font = "10px Inter, system-ui, sans-serif";
    ctx.fillStyle = theme.textSub;
    ctx.fillText(data.sub, x - w / 2 + 48, y + 14);
  }

  ctx.restore();
}

/* ===================================================== */
/* ===================== DRAW SCENE ==================== */
/* ===================================================== */

export function drawScene(
  ctx,
  { core, nodes, hoveredNode, constraints, width, height, renderOptions }
) {
  const theme = currentTheme();
  const expanded = renderOptions?.expanded ?? true;
  const compact = !expanded;

  ctx.clearRect(0, 0, width, height);

  /* ================= HALO LÍMITE INVISIBLE ================= */
  ctx.save();

  const gradient = ctx.createRadialGradient(
    core.position.x,
    core.position.y,
    SOFT_LIMIT_RADIUS * HALO_INNER,
    core.position.x,
    core.position.y,
    SOFT_LIMIT_RADIUS * HALO_OUTER
  );

  gradient.addColorStop(0, "rgba(37,99,235,0)");
  gradient.addColorStop(1, "rgba(37,99,235,0.10)");

  ctx.strokeStyle = gradient;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(
    core.position.x,
    core.position.y,
    SOFT_LIMIT_RADIUS,
    0,
    Math.PI * 2
  );
  ctx.stroke();
  ctx.restore();

  /* ================= LÍNEAS ================= */
  ctx.save();
  ctx.setLineDash([3, 7]);
  ctx.lineWidth = 1;
  ctx.strokeStyle = theme.line;
  ctx.lineDashOffset = -(core.position.x + core.position.y) * 0.02;

  constraints.forEach((c) => {
    if (!c.bodyA || !c.bodyB) return;
    ctx.beginPath();
    ctx.moveTo(c.bodyA.position.x, c.bodyA.position.y);
    ctx.lineTo(c.bodyB.position.x, c.bodyB.position.y);
    ctx.stroke();
  });

  ctx.restore();

  /* ================= CARDS ================= */
  nodes.forEach((n, i) => {
    const data = NODES_DATA[i];
    if (!data) return;
    drawCard(
      ctx,
      n.position.x,
      n.position.y,
      data,
      hoveredNode === n,
      compact,
      theme
    );
  });

  /* ================= CORE ================= */
  const pulse = 1 + Math.sin(core.position.x * 0.01) * 0.03;
  const r = CONFIG.core.radius * 1.35;

  ctx.save();
  ctx.shadowBlur = 42;
  ctx.shadowColor = CONFIG.core.color;
  ctx.fillStyle = theme.coreAura;

  ctx.beginPath();
  ctx.arc(
    core.position.x,
    core.position.y,
    r * pulse + 18,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.shadowBlur = 26;
  ctx.fillStyle = CONFIG.core.color;
  ctx.beginPath();
  ctx.arc(core.position.x, core.position.y, r * pulse, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  /* ================= CORE TEXT ================= */
  ctx.save();
  ctx.textAlign = "center";
  ctx.font = "15px Inter, system-ui, sans-serif";
  ctx.fillStyle = "#fff";
  ctx.fillText("CAPV", core.position.x, core.position.y - 4);

  ctx.font = "9px Inter, system-ui, sans-serif";
  ctx.fillStyle = theme.textSubStrong;
  ctx.fillText("CORE NEXUS", core.position.x, core.position.y + 14);
  ctx.restore();
}
