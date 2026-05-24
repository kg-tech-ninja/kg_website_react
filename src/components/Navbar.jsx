import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ArrowRight, Cpu, Cloud, Code, Megaphone, ShieldCheck, Terminal } from 'lucide-react';
import './Navbar.css';

const servicesMenu = [
  { label: 'IT Services & Products', icon: <Cpu size={16}/>, to: '/services#it' },
  { label: 'DevOps & Cloud', icon: <Cloud size={16}/>, to: '/services#devops' },
  { label: 'Custom Software', icon: <Code size={16}/>, to: '/services#software' },
  { label: 'Marketing', icon: <Megaphone size={16}/>, to: '/services#marketing' },
  { label: 'Admin & Support', icon: <ShieldCheck size={16}/>, to: '/services#support' },
  { label: 'AI & ML Solutions', icon: <Terminal size={16}/>, to: '/services#ai' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.addEventListener('scroll', () => setScrolled(window.scrollY > 60));
    return () => window.removeEventListener('scroll', () => {});
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setDropdown(false); }, [pathname]);

  return (
    <header className={`navbar ${scrolled ? 'glass' : ''}`}>
      <div className="container nav-inner">

        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="KG Web & Ops" style={{ height: '52px', width: 'auto', display: 'block' }} />
        </Link>

        {/* Desktop Nav */}
        <nav className="desk-nav">
          {/* Services dropdown */}
          <div
            className="nav-item dropdown-trigger"
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <span>Services <ChevronDown size={14} className={dropdown ? 'rotated' : ''}/></span>

            <AnimatePresence>
              {dropdown && (
                <motion.div
                  className="mega-menu"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="menu-label">What we offer</p>
                  <div className="menu-grid">
                    {servicesMenu.map(s => (
                      <Link key={s.label} to={s.to} className="menu-item">
                        <span className="menu-icon">{s.icon}</span>
                        <span>{s.label}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/products" className={({isActive}) => `nav-item ${isActive ? 'active':''}`}>Products</NavLink>
          {/* <NavLink to="/case-studies" className={({isActive}) => `nav-item ${isActive ? 'active':''}`}>Case Studies</NavLink> */}
          <NavLink to="/about" className={({isActive}) => `nav-item ${isActive ? 'active':''}`}>About Us</NavLink>
          {/* <NavLink to="/careers" className={({isActive}) => `nav-item ${isActive ? 'active':''}`}>Careers</NavLink> */}
        </nav>

        {/* CTA */}
        <div className="nav-cta">
          <Link to="/contact" className="btn btn-outline nav-talk">Talk to us</Link>
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu glass"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-links">
              <Link to="/services" className="mob-link">Services <ArrowRight size={15}/></Link>
              <Link to="/products" className="mob-link">Products <ArrowRight size={15}/></Link>
              {/* <Link to="/case-studies" className="mob-link">Case Studies <ArrowRight size={15}/></Link> */}
              <Link to="/about" className="mob-link">About Us <ArrowRight size={15}/></Link>
              {/* <Link to="/careers" className="mob-link">Careers <ArrowRight size={15}/></Link> */}
              <Link to="/contact" className="btn btn-primary" style={{marginTop:'1rem',justifyContent:'center'}}>Talk to us</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
