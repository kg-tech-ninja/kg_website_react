import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, ArrowUpRight } from 'lucide-react';
import './Footer.css';
import { config } from '../data/config';

const Footer = () => (
  <footer className="footer">
    {/* CTA Banner */}
    <div className="footer-cta-banner">
      <div className="container footer-cta-inner">
        <div>
          <h3 className="footer-cta-title">Ready to Transform Your Business?</h3>
          <p className="footer-cta-sub">Let's build something exceptional together.</p>
        </div>
        <Link to="/contact" className="btn btn-primary">
          Start a Project <ArrowUpRight size={18}/>
        </Link>
      </div>
    </div>

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
          {/* <li><Link to="/case-studies">Case Studies</Link></li> */}
          {/* <li><Link to="/careers">Careers</Link></li> */}
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/products">Products</Link></li>
        </ul>
      </div>

      <div className="footer-col">
        <h4 className="footer-col-title">Technologies</h4>
        <ul>
          <li><a href="#">React & Next.js</a></li>
          <li><a href="#">Node.js & Python</a></li>
          <li><a href="#">AWS & Azure</a></li>
          <li><a href="#">Docker & Kubernetes</a></li>
          <li><a href="#">TensorFlow & PyTorch</a></li>
        </ul>
      </div>
    </div>

    <div className="footer-bottom container">
      <p>&copy; {new Date().getFullYear()} KG Ops. All rights reserved.</p>
      <div className="footer-bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Cookie Policy</a>
      </div>
    </div>
  </footer>
);

export default Footer;
