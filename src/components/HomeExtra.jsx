import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import WorkspaceIllustration from './WorkspaceIllustration';
import './HomeExtra.css';

const differentiators = [
  'Direct access to the engineers building your product',
  'Fixed scope and transparent pricing — no surprises',
  'Weekly demos with full source-code ownership',
  'Secure-by-default, modern architecture from day one',
];

const process = [
  { num: '01', title: 'Discovery & Strategy', desc: 'We deep-dive into your business goals to craft a tailored technology roadmap.' },
  { num: '02', title: 'Design & Architecture', desc: 'We design scalable, secure systems built for long-term growth — not just launch day.' },
  { num: '03', title: 'Build & Iterate', desc: 'Agile development with weekly demos and continuous feedback loops.' },
  { num: '04', title: 'Launch & Support', desc: 'Smooth deployment, monitoring, and hands-on support as you scale.' },
];

const HomeExtra = () => (
  <>
    {/* Why Us */}
    <section className="why-us">
      <div className="container why-inner">
        <motion.div
          className="why-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">Why KG Web & Ops</div>
          <h2 className="section-title">A New Kind of <span className="gradient-text">Technology Partner</span></h2>
          <p className="section-sub" style={{marginBottom:'2rem'}}>
            We're a fresh, focused engineering studio — combining deep technical craft with a startup's
            hunger to prove itself. You get senior attention, honest communication, and work we stake our name on.
          </p>
          {differentiators.map((item, i) => (
            <div key={i} className="check-item">
              <CheckCircle size={18} className="text-accent"/> {item}
            </div>
          ))}
          <Link to="/about" className="btn-wavy" style={{marginTop:'2rem'}}>
            <span>Learn about us</span> <ArrowRight size={16}/>
          </Link>
        </motion.div>

        <motion.div
          className="why-right"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="why-illustration">
            <WorkspaceIllustration />
          </div>
        </motion.div>
      </div>
    </section>

    {/* Process */}
    <section className="process-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{textAlign:'center', alignItems:'center', display:'flex', flexDirection:'column', marginBottom:'4rem'}}
        >
          <div className="section-tag">How we work</div>
          <h2 className="section-title">A Clear, Proven <span className="gradient-text">Process</span></h2>
        </motion.div>

        <div className="process-grid">
          {process.map((p, i) => (
            <motion.div
              key={i}
              className="process-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <span className="process-num gradient-text">{p.num}</span>
              <h3 style={{fontFamily:"'Space Grotesk',sans-serif", fontSize:'1.1rem', fontWeight:700, marginBottom:'0.6rem'}}>{p.title}</h3>
              <p style={{color:'var(--muted)', fontSize:'0.9rem', lineHeight:1.65}}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export default HomeExtra;
