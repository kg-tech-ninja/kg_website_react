import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, TrendingUp, Shield, Zap } from 'lucide-react';
import './Hero.css';

const stats = [
  { num: '350+', label: 'Projects Delivered' },
  { num: '120+', label: 'Global Clients' },
  { num: '98%', label: 'Client Satisfaction' },
  { num: '12+', label: 'Years of Excellence' },
];

const techStack = ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'PostgreSQL'];

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section className="hero" ref={ref}>
      {/* Video BG */}
      <div className="hero-video-bg">
        <video autoPlay loop muted playsInline>
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connections-loop-27357-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-gradient-overlay"/>
      </div>

      {/* Animated grid lines */}
      <div className="grid-overlay"/>

      <motion.div className="container hero-content" style={{ opacity }}>
        {/* Pill badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Zap size={14}/> Next-Gen IT & DevOps Engineering
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Engineering Digital <span className="gradient-text">Excellence</span> for Tomorrow's Business
        </motion.h1>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          KG Ops delivers world-class IT services, DevOps solutions, SaaS products, and marketing
          technology to help businesses scale with confidence.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/services" className="btn-wavy">
            <span>Explore Services</span> <ArrowRight size={18}/>
          </Link>
          {/* <Link to="/case-studies" className="btn btn-outline hero-play">
            <span className="play-ring"><Play size={13} fill="currentColor"/></span>
            View Case Studies
          </Link> */}
        </motion.div>

        {/* Trust chips */}
        <motion.div
          className="trust-chips"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="chip"><TrendingUp size={13}/> Client-First Engineering</span>
          <span className="chip"><Shield size={13}/> Security-First Architecture</span>
          <span className="chip"><Zap size={13}/> Reliable Cloud Solutions</span>
        </motion.div>
      </motion.div>

      {/* Stats bar commented out for startup phase
      <motion.div
        className="stats-bar"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="container stats-inner">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-number gradient-text">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
      */}

      {/* Scrolling tech ticker */}
      <div className="tech-ticker">
        <div className="ticker-track">
          {[...techStack, ...techStack, ...techStack].map((t, i) => (
            <span key={i} className="ticker-item">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
