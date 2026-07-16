import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { Layers, Cloud, Database, GitBranch, ShieldCheck, Code, Cpu } from 'lucide-react';

/* ───────────────────────────────────────────────────────────
   Signature visual — a live cloud-infrastructure topology.
   A glowing core emits signal rings; six glass service nodes sit
   on an orbit, wired to the core by circuit paths with data
   packets flowing along them. Everything lives in a 0–100 square
   coordinate space so the SVG lines and the HTML glass chips align.
   ─────────────────────────────────────────────────────────── */

const CX = 50;
const CY = 50;
const R = 36;
const round = (v) => Math.round(v * 100) / 100;

const NODE_DEFS = [
  { id: 'cloud', label: 'Cloud', angle: 0 },
  { id: 'data', label: 'Data', angle: 60 },
  { id: 'cicd', label: 'CI/CD', angle: 120 },
  { id: 'security', label: 'Security', angle: 180 },
  { id: 'software', label: 'Software', angle: 240 },
  { id: 'ai', label: 'AI / ML', angle: 300 },
];

const ICONS = { cloud: Cloud, data: Database, cicd: GitBranch, security: ShieldCheck, software: Code, ai: Cpu };

/* Curved connector between two points (perpendicular bow for a circuit-trace feel). */
function link(x1, y1, x2, y2, bow) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const qx = mx - (dy / len) * bow;
  const qy = my + (dx / len) * bow;
  return `M ${round(x1)} ${round(y1)} Q ${round(qx)} ${round(qy)} ${round(x2)} ${round(y2)}`;
}

/* Trim each spoke so it starts just outside the core and ends exactly at the
   node chip's edge — the line touches the chip instead of running under it. */
const CORE_EDGE = 7.5;   // just outside the core disc
const CHIP_HH = 3.4;     // node-chip half-height, in viewBox units

const NODES = NODE_DEFS.map((n) => {
  const a = (n.angle * Math.PI) / 180;
  const dx = Math.sin(a);
  const dy = -Math.cos(a);
  // radius where the radial spoke meets the chip's near (horizontal) edge
  const rEnd = R - CHIP_HH / Math.max(Math.abs(Math.cos(a)), 0.3);
  return {
    ...n,
    x: round(CX + R * dx),
    y: round(CY + R * dy),
    sx: round(CX + CORE_EDGE * dx),
    sy: round(CY + CORE_EDGE * dy),
    ex: round(CX + rEnd * dx),
    ey: round(CY + rEnd * dy),
  };
});
const SPOKES = NODES.map((n) => ({ id: `sp-${n.id}`, d: link(n.sx, n.sy, n.ex, n.ey, 2) }));
const MESH = NODES.map((n, i) => {
  const m = NODES[(i + 1) % NODES.length];
  return { id: `me-${i}`, d: link(n.x, n.y, m.x, m.y, 3) };
});

/* One glowing light per spoke — all start together, flow outward (core → node)
   slowly, and fade out as they near the node so the loop never hard-cuts. */
const FLOW_DUR = 5.5;
const PACKETS = SPOKES.map((s) => s.id);

export default function SystemTopology() {
  const reduced = useReducedMotion();

  return (
    <div className="tp" aria-hidden="true">
      <div className="tp-glow" />

      <div className="tp-parallax">
        <div className="tp-float">
          <svg className="tp-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="tpPacket" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e5eeff" />
                <stop offset="55%" stopColor="#7fb0ff" />
                <stop offset="100%" stopColor="#4f8ef7" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="tpLink" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4f8ef7" />
                <stop offset="100%" stopColor="#6d5ef6" />
              </linearGradient>
            </defs>

            {/* boundary orbit + adjacency mesh */}
            <circle className="tp-orbit" cx={CX} cy={CY} r={R} />
            <g className="tp-mesh">
              {MESH.map((m) => (
                <path key={m.id} d={m.d} />
              ))}
            </g>

            {/* signal rings emitted by the core */}
            <g className="tp-rings">
              <circle className="tp-ring" cx={CX} cy={CY} r="24" />
              <circle className="tp-ring" cx={CX} cy={CY} r="24" style={{ animationDelay: '-1.3s' }} />
              <circle className="tp-ring" cx={CX} cy={CY} r="24" style={{ animationDelay: '-2.6s' }} />
            </g>

            {/* connectors */}
            <g className="tp-links">
              {SPOKES.map((s) => (
                <path key={s.id} id={s.id} d={s.d} />
              ))}
            </g>

            {/* flowing data packets */}
            {!reduced && (
              <g className="tp-packets">
                {PACKETS.map((path, i) => (
                  <circle key={i} r="1.3" fill="url(#tpPacket)" className="tp-packet" opacity="0">
                    <animateMotion dur={`${FLOW_DUR}s`} begin="0s" repeatCount="indefinite">
                      <mpath href={`#${path}`} xlinkHref={`#${path}`} />
                    </animateMotion>
                    <animate
                      attributeName="opacity"
                      dur={`${FLOW_DUR}s`}
                      begin="0s"
                      repeatCount="indefinite"
                      calcMode="linear"
                      values="0; 1; 1; 0"
                      keyTimes="0; 0.14; 0.62; 1"
                    />
                  </circle>
                ))}
              </g>
            )}
          </svg>

          {/* glass overlay: core + service nodes */}
          <div className="tp-nodes">
            <div className="tp-core" style={{ left: `${CX}%`, top: `${CY}%` }}>
              <span className="tp-core__icon"><Layers size={22} /></span>
            </div>

            {NODES.map((n) => {
              const Icon = ICONS[n.id];
              return (
                <div key={n.id} className="tp-node" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
                  <span className="tp-node__icon"><Icon size={15} /></span>
                  <span className="tp-node__label">{n.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>



    </div>
  );
}
