import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Globe, Mail, Phone, ArrowUpRight } from 'lucide-react';
import './Footer.css';
import { config } from '../data/config';

const Footer = () => {
  const { pathname } = useLocation();
  const hideCta = ['/products', '/contact'].includes(pathname);

  return (
  <footer className="footer">
    {/* CTA Banner — hidden on pages with their own CTA */}
    {!hideCta && (
      <div className="footer-cta-banner">
        <div className="container footer-cta-inner">
          <div>
            <h3 className="footer-cta-title">Ready to Transform Your Business?</h3>
            <p className="footer-cta-sub">Let's build something exceptional together.</p>
          </div>
          <Link to="/contact" className="btn-wavy">
            <span>Start a Project</span> <ArrowUpRight size={18}/>
          </Link>
        </div>
      </div>
    )}

    <div className="footer-main container">
      {/* Brand */}
      <div className="footer-brand">
        <div className="footer-logo">
          <img src="/logo_footer.png" alt="KG Web & Ops" style={{ height: '52px', width: 'auto', display: 'block' }} />
        </div>
        <p className="footer-desc">
          Engineering digital excellence through innovative IT services, DevOps mastery, and cutting-edge SaaS products.
        </p>
        <div className="footer-socials">
          <a href={`mailto:${config.email}`} className="social-btn" aria-label="Email"><Mail size={18}/></a>
          <a href={`tel:${config.phoneRaw}`} className="social-btn" aria-label="Phone"><Phone size={18}/></a>
          <a href="https://kgops.com" className="social-btn" aria-label="Website"><Globe size={18}/></a>
        </div>
      </div>

      {/* Links */}
      <div className="footer-col">
        <h4 className="footer-col-title">Services</h4>
        <ul>
          <li><Link to="/services">IT Service & Products</Link></li>
          <li><Link to="/services#devops">DevOps & Cloud</Link></li>
          <li><Link to="/services#software">Custom Software</Link></li>
          <li><Link to="/services#marketing">Digital Marketing</Link></li>
          <li><Link to="/services#ai">AI & ML Solutions</Link></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4 className="footer-col-title">Company</h4>
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4 className="footer-col-title">Solutions</h4>
        <ul>
          <li><Link to="/services/mobile-development">Mobile Development</Link></li>
          <li><Link to="/services/web-development">Web Development</Link></li>
          <li><Link to="/services/admin-support">Support Solutions</Link></li>
          <li><Link to="/services/devops">Cloud Infrastructure</Link></li>
          <li><Link to="/services/ai-ml">Data & Analytics</Link></li>
        </ul>
      </div>
    </div>

    <div className="footer-bottom container">
      <p>&copy; {new Date().getFullYear()} KG Web & Ops. All rights reserved.</p>
      <div className="footer-bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
      </div>
    </div>
  </footer>
  );
};

export default Footer;

