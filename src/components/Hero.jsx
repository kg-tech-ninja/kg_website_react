import React, { useRef, useMemo, useCallback, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SystemTopology from './SystemTopology';
import './Hero.css';

const trustStats = [
  { val: '100%', label: 'Code ownership' },
  { val: 'Direct', label: 'Engineer access' },
  { val: 'Fixed', label: 'Transparent pricing' },
];

const Hero = () => {
  const ref = useRef(null);
  const raf = useRef(0);
  const reduce = useReducedMotion();

  /* On phones the scroll-linked parallax fights the browser URL-bar resize and
     the fade can make the hero jump/stutter — so we bind it on desktop only. */
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* Single pointer handler drives the cursor glow + parallax via CSS vars — no re-renders.
     Ignored for touch/coarse pointers so the visual never shifts on mobile. */
  const onPointerMove = useCallback((e) => {
    if (reduce || e.pointerType === 'touch') return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const gx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const gy = ((e.clientY - r.top) / r.height - 0.5) * 2;
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      el.style.setProperty('--gx', gx.toFixed(3));
      el.style.setProperty('--gy', gy.toFixed(3));
    });
  }, [reduce]);

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.4,
        delay: -(Math.random() * 16),
        dur: 12 + Math.random() * 14,
        drift: (Math.random() * 2 - 1) * 44,
      })),
    []
  );

  return (
    <section className="hero" ref={ref} onPointerMove={onPointerMove}>
      {/* ═══ Layered cinematic background ═══ */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-aurora hero-aurora--1" />
        <div className="hero-aurora hero-aurora--2" />
        <div className="hero-aurora hero-aurora--3" />
        <div className="hero-grid" />

        {/* moving network / constellation */}
        <svg className="hero-network" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <g className="hero-network__group">
            <polyline points="120,180 300,120 480,240 660,160 840,300" />
            <polyline points="80,520 260,600 440,500 620,640 820,540" />
            <polyline points="180,860 380,780 560,880 760,760 900,840" />
            <polyline points="300,120 260,600" />
            <polyline points="480,240 440,500" />
            <polyline points="660,160 620,640" />
            <polyline points="440,500 560,880" />
            <polyline points="840,300 820,540" />
            {[
              [120, 180], [300, 120], [480, 240], [660, 160], [840, 300],
              [80, 520], [260, 600], [440, 500], [620, 640], [820, 540],
              [180, 860], [380, 780], [560, 880], [760, 760], [900, 840],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3.2" style={{ animationDelay: `${(i % 6) * 0.5}s` }} />
            ))}
          </g>
        </svg>

        {/* floating particles */}
        <div className="hero-particles">
          {particles.map((p) => (
            <span
              key={p.id}
              className="hero-particle"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                '--dur': `${p.dur}s`,
                '--delay': `${p.delay}s`,
                '--drift': `${p.drift}px`,
              }}
            />
          ))}
        </div>

        <div className="hero-noise" />
        <div className="hero-vignette" />
      </div>

      {/* ═══ Content ═══ */}
      <motion.div className="hero-inner" style={isMobile ? undefined : { y: contentY, opacity: contentOpacity }}>
        <div className="hero-grid-cols">
          {/* ── Left: copy ── */}
          <div className="hero-copy">
            <motion.div
              className="hero-eyebrow"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
            >
              <span className="hero-eyebrow__dot" />
              Enterprise IT · DevOps · Software
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              Engineering the{' '}
              <span className="gradient-text hero-title__accent">digital backbone</span>{' '}
              <span className="hero-title__tail">of modern business.</span>
            </motion.h1>

            <motion.p
              className="hero-sub"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              IT, DevOps, cloud, and custom software — architected for security,
              reliability, and scale. KG Web &amp; Ops helps ambitious teams ship
              faster and operate with confidence.
            </motion.p>

            <motion.div
              className="hero-cta"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.7 }}
            >
              <Link to="/contact" className="hero-btn hero-btn--primary">
                <span>Start a project</span>
                <ArrowRight size={18} className="hero-btn__arrow" />
              </Link>
              <Link to="/services" className="hero-btn hero-btn--glass">
                <span>Explore services</span>
              </Link>
            </motion.div>

            <motion.div
              className="hero-trust"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.62, duration: 0.7 }}
            >
              {trustStats.map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <span className="hero-trust__sep" aria-hidden="true" />}
                  <div className="hero-trust__item">
                    <span className="hero-trust__val">{s.val}</span>
                    <span className="hero-trust__label">{s.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* ── Right: signature system-topology visual ── */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <SystemTopology />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
