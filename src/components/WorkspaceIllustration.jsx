import React from 'react';

/* ───────────────────────────────────────────────────────────
   Custom 2D vector illustration — a stylised engineering
   workspace (analytics dashboard + code card + live stat),
   drawn in the brand palette so it fits the dark premium theme.
   Fully self-contained SVG; subtle motion via CSS classes.
   ─────────────────────────────────────────────────────────── */
export default function WorkspaceIllustration() {
  return (
    <svg
      className="wi"
      viewBox="0 0 600 440"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Illustration of an analytics dashboard, code editor and live metrics"
    >
      <defs>
        <linearGradient id="wiBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4f8ef7" />
          <stop offset="100%" stopColor="#6d5ef6" />
        </linearGradient>
        <linearGradient id="wiBar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fb0ff" />
          <stop offset="100%" stopColor="#6d5ef6" />
        </linearGradient>
        <linearGradient id="wiPanel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#161d33" />
          <stop offset="100%" stopColor="#0d1223" />
        </linearGradient>
        <linearGradient id="wiCard" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1b2340" />
          <stop offset="100%" stopColor="#111730" />
        </linearGradient>
        <linearGradient id="wiArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4f8ef7" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#4f8ef7" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="wiGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4f8ef7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4f8ef7" stopOpacity="0" />
        </radialGradient>
        <filter id="wiShadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="16" stdDeviation="22" floodColor="#000" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* ambient glow */}
      <ellipse className="wi-glow" cx="360" cy="150" rx="230" ry="180" fill="url(#wiGlow)" />

      {/* decorative background */}
      <g stroke="#7fb0ff" strokeWidth="2" opacity="0.5" strokeLinecap="round">
        <path d="M56 96 h18 M65 87 v18" />
        <path d="M528 300 h16 M536 292 v16" opacity="0.7" />
      </g>
      <circle cx="512" cy="356" r="46" fill="none" stroke="#6d5ef6" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.5" className="wi-spin-slow" />
      <circle className="wi-pulse" cx="466" cy="330" r="4" fill="#7fb0ff" />
      <circle className="wi-pulse" cx="70" cy="330" r="5" fill="#6d5ef6" style={{ animationDelay: '-1s' }} />
      <circle cx="556" cy="150" r="3.5" fill="#4f8ef7" opacity="0.8" />
      <circle cx="40" cy="200" r="3" fill="#a78bfa" opacity="0.8" />
      <circle className="wi-pulse" cx="300" cy="60" r="3.5" fill="#34d399" style={{ animationDelay: '-1.6s' }} />

      {/* ═══ main dashboard window ═══ */}
      <g>
        <rect x="96" y="72" width="372" height="286" rx="22" fill="url(#wiPanel)" stroke="rgba(255,255,255,0.09)" />
        {/* header */}
        <circle cx="122" cy="96" r="5" fill="#f87171" />
        <circle cx="140" cy="96" r="5" fill="#fbbf24" />
        <circle cx="158" cy="96" r="5" fill="#34d399" />
        <rect x="322" y="89" width="86" height="14" rx="7" fill="rgba(255,255,255,0.07)" />
        <line x1="108" y1="120" x2="456" y2="120" stroke="rgba(255,255,255,0.07)" />

        {/* area / line chart */}
        <path d="M120 208 C 150 188, 176 200, 206 172 S 268 146, 300 160 L300 214 L120 214 Z" fill="url(#wiArea)" />
        <path d="M120 208 C 150 188, 176 200, 206 172 S 268 146, 300 160" fill="none" stroke="#7fb0ff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="206" cy="172" r="4" fill="#0d1223" stroke="#7fb0ff" strokeWidth="2.5" />
        <circle cx="300" cy="160" r="4" fill="#0d1223" stroke="#4f8ef7" strokeWidth="2.5" />
        <rect x="120" y="228" width="60" height="7" rx="3.5" fill="rgba(255,255,255,0.14)" />
        <rect x="120" y="242" width="38" height="7" rx="3.5" fill="rgba(255,255,255,0.08)" />

        {/* donut chart */}
        <g className="wi-donut">
          <circle cx="392" cy="176" r="38" fill="none" stroke="#4f8ef7" strokeWidth="15" strokeDasharray="107.4 131.3" />
          <circle cx="392" cy="176" r="38" fill="none" stroke="#6d5ef6" strokeWidth="15" strokeDasharray="71.6 167.1" strokeDashoffset="-107.4" />
          <circle cx="392" cy="176" r="38" fill="none" stroke="#a78bfa" strokeWidth="15" strokeDasharray="59.6 179.1" strokeDashoffset="-179" />
        </g>

        {/* bar chart */}
        <line x1="120" y1="336" x2="440" y2="336" stroke="rgba(255,255,255,0.08)" />
        {[
          [120, 46], [160, 70], [200, 54], [240, 86],
          [280, 62], [320, 96], [360, 72], [400, 108],
        ].map(([x, h], i) => (
          <rect key={i} x={x} y={336 - h} width="20" height={h} rx="5" fill="url(#wiBar)" opacity={0.55 + (i % 4) * 0.14} />
        ))}
      </g>

      {/* ═══ floating code card ═══ */}
      <g className="wi-float-a" filter="url(#wiShadow)">
        <rect x="36" y="262" width="190" height="150" rx="16" fill="url(#wiCard)" stroke="rgba(255,255,255,0.12)" />
        <circle cx="56" cy="284" r="3.5" fill="#f87171" />
        <circle cx="68" cy="284" r="3.5" fill="#fbbf24" />
        <circle cx="80" cy="284" r="3.5" fill="#34d399" />
        <rect x="150" y="279" width="56" height="10" rx="5" fill="rgba(255,255,255,0.06)" />
        {/* code lines */}
        <g>
          <rect x="56" y="306" width="30" height="7" rx="3.5" fill="#a78bfa" />
          <rect x="92" y="306" width="52" height="7" rx="3.5" fill="#4f8ef7" />
          <rect x="150" y="306" width="40" height="7" rx="3.5" fill="#34d399" />
          <rect x="72" y="324" width="44" height="7" rx="3.5" fill="#4f8ef7" />
          <rect x="122" y="324" width="66" height="7" rx="3.5" fill="rgba(255,255,255,0.22)" />
          <rect x="72" y="342" width="86" height="7" rx="3.5" fill="#34d399" />
          <rect x="56" y="360" width="38" height="7" rx="3.5" fill="#a78bfa" />
          <rect x="100" y="360" width="58" height="7" rx="3.5" fill="#4f8ef7" />
          <rect x="56" y="378" width="102" height="7" rx="3.5" fill="rgba(255,255,255,0.14)" />
        </g>
      </g>

      {/* ═══ floating live-stat card ═══ */}
      <g className="wi-float-b" filter="url(#wiShadow)">
        <rect x="392" y="50" width="172" height="84" rx="16" fill="url(#wiCard)" stroke="rgba(255,255,255,0.12)" />
        <rect x="410" y="66" width="66" height="8" rx="4" fill="rgba(255,255,255,0.18)" />
        <text x="410" y="108" fontFamily="'Space Grotesk', sans-serif" fontSize="26" fontWeight="700" fill="#ffffff">+32%</text>
        <path d="M498 112 l10 -16 l10 16 Z" fill="#34d399" />
        {/* sparkline */}
        <polyline points="498,96 508,100 516,90 526,94 538,82 548,86"
          fill="none" stroke="#4f8ef7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      </g>
    </svg>
  );
}
