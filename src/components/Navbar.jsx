import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Cpu, Cloud, Code, Megaphone, ShieldCheck, Terminal, ArrowRight, GraduationCap } from 'lucide-react';
import './Navbar.css';

const servicesMenu = [
  { label: 'IT Services & Products', icon: <Cpu size={15}/>, to: '/services/it-services' },
  { label: 'DevOps & Cloud',         icon: <Cloud size={15}/>, to: '/services/devops' },
  { label: 'Custom Software',        icon: <Code size={15}/>, to: '/services/custom-software' },
  { label: 'Marketing',              icon: <Megaphone size={15}/>, to: '/services/digital-marketing' },
  { label: 'Admin & Support',        icon: <ShieldCheck size={15}/>, to: '/services/admin-support' },
  { label: 'AI & ML Solutions',      icon: <Terminal size={15}/>, to: '/services/ai-ml' },
];

const productsMenu = [
  { label: 'EduHub', tag: 'EdTech · Centralised Hub', icon: <GraduationCap size={15}/>, to: '/products' },
];


const Navbar = () => {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [dropdown,    setDropdown]    = useState(false);
  const [prodOpen,    setProdOpen]    = useState(false);
  const [mobileServOpen, setMobileServOpen] = useState(false);
  const [mobileProdOpen, setMobileProdOpen] = useState(false);
  const dropRef = useRef(null);
  const prodRef = useRef(null);
  const { pathname } = useLocation();

  /* ── scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── close everything on route change ── */
  useEffect(() => {
    setMobileOpen(false);
    setDropdown(false);
    setProdOpen(false);
    setMobileServOpen(false);
    setMobileProdOpen(false);
  }, [pathname]);

  /* ── close dropdowns on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(false);
      if (prodRef.current && !prodRef.current.contains(e.target)) setProdOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className={`kg-nav${scrolled ? ' kg-nav--glass' : ''}${mobileOpen ? ' kg-nav--open' : ''}`}>
      <div className="kg-nav__inner">

        {/* ── Logo ── */}
        <Link to="/" className="kg-nav__brand" aria-label="KG Web & Ops Home">
          <img
            src="/logo.png"
            alt="KG Web & Ops"
            className="kg-nav__logo-img"
          />
        </Link>

        {/* ── Desktop Links ── */}
        <nav className="kg-nav__links" aria-label="Main navigation">

          <NavLink to="/about"
            className={({ isActive }) => `kg-nav__link${isActive ? ' is-active' : ''}`}>
            About
          </NavLink>

          <Link to="/contact" className="kg-nav__link">Contact</Link>

          {/* Services dropdown */}
          <div
            className="kg-nav__link kg-nav__link--drop"
            ref={dropRef}
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <span className="kg-nav__drop-trigger">
              Services
              <ChevronDown size={14} className={`kg-nav__chevron${dropdown ? ' is-open' : ''}`}/>
            </span>

            <AnimatePresence>
              {dropdown && (
                <motion.div
                  className="kg-nav__dropdown"
                  initial={{ opacity: 0, y: 8, scale: 0.97, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                  exit={{ opacity: 0, y: 8, scale: 0.97, x: '-50%' }}
                  transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                >
                  <p className="kg-nav__drop-label">What we offer</p>
                  <div className="kg-nav__drop-grid">
                    {servicesMenu.map(s => (
                      <Link key={s.label} to={s.to} className="kg-nav__drop-item">
                        <span className="kg-nav__drop-icon">{s.icon}</span>
                        <span>{s.label}</span>
                      </Link>
                    ))}
                  </div>
                  <Link to="/services" className="kg-nav__drop-all">
                    <span>View all services</span>
                    <ArrowRight size={15} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Products dropdown */}
          <div
            className="kg-nav__link kg-nav__link--drop"
            ref={prodRef}
            onMouseEnter={() => setProdOpen(true)}
            onMouseLeave={() => setProdOpen(false)}
          >
            <span className="kg-nav__drop-trigger">
              Products
              <ChevronDown size={14} className={`kg-nav__chevron${prodOpen ? ' is-open' : ''}`}/>
            </span>

            <AnimatePresence>
              {prodOpen && (
                <motion.div
                  className="kg-nav__dropdown kg-nav__dropdown--sm"
                  initial={{ opacity: 0, y: 8, scale: 0.97, x: '-50%' }}
                  animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
                  exit={{ opacity: 0, y: 8, scale: 0.97, x: '-50%' }}
                  transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                >
                  <p className="kg-nav__drop-label">Our products</p>
                  <div className="kg-nav__drop-grid">
                    {productsMenu.map(p => (
                      <Link key={p.label} to={p.to} className="kg-nav__drop-item">
                        <span className="kg-nav__drop-icon">{p.icon}</span>
                        <span className="kg-nav__drop-text">
                          <span className="kg-nav__drop-name">{p.label}</span>
                          <span className="kg-nav__drop-tag">{p.tag}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <Link to="/products" className="kg-nav__drop-all">
                    <span>View all products</span>
                    <ArrowRight size={15} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </nav>

        {/* ── CTA + hamburger ── */}
        <div className="kg-nav__actions">
          <Link to="/contact" className="kg-nav__cta">
            <span>Book a Call</span>
          </Link>

          <button
            className="kg-nav__hamburger"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.span key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}>
                    <X size={22}/>
                  </motion.span>
                : <motion.span key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}>
                    <Menu size={22}/>
                  </motion.span>
              }
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="kg-nav__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="kg-nav__mobile-inner">
              <Link to="/about"      className="kg-mob__link">About</Link>
              <Link to="/contact"    className="kg-mob__link">Contact</Link>

              {/* Mobile services accordion */}
              <div className="kg-mob__link kg-mob__link--acc"
                onClick={() => setMobileServOpen(v => !v)}>
                <span>Services</span>
                <ChevronDown size={16} className={`kg-nav__chevron${mobileServOpen ? ' is-open' : ''}`}/>
              </div>
              <AnimatePresence>
                {mobileServOpen && (
                  <motion.div
                    className="kg-mob__sub"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {servicesMenu.map(s => (
                      <Link key={s.label} to={s.to} className="kg-mob__sub-link">
                        <span className="kg-nav__drop-icon">{s.icon}</span>
                        {s.label}
                      </Link>
                    ))}
                    <Link to="/services" className="kg-mob__sub-link kg-mob__sub-all">
                      View all services <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile products accordion */}
              <div className="kg-mob__link kg-mob__link--acc"
                onClick={() => setMobileProdOpen(v => !v)}>
                <span>Products</span>
                <ChevronDown size={16} className={`kg-nav__chevron${mobileProdOpen ? ' is-open' : ''}`}/>
              </div>
              <AnimatePresence>
                {mobileProdOpen && (
                  <motion.div
                    className="kg-mob__sub"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    {productsMenu.map(p => (
                      <Link key={p.label} to={p.to} className="kg-mob__sub-link">
                        <span className="kg-nav__drop-icon">{p.icon}</span>
                        {p.label}
                      </Link>
                    ))}
                    <Link to="/products" className="kg-mob__sub-link kg-mob__sub-all">
                      View all products <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link to="/contact" className="btn-wavy kg-mob__cta">
                <span>Book a Call</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
