import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Quote } from 'lucide-react';
import './HomeExtra.css';

const clients = [
  { name: 'HealthTech Pro', industry: 'Healthcare', result: '3x revenue growth', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=80&h=80&fit=crop' },
  { name: 'FinanceCore', industry: 'Fintech', result: '$2M cost savings', img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=80&h=80&fit=crop' },
  { name: 'RetailMax', industry: 'E-commerce', result: '180% traffic boost', img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=80&h=80&fit=crop' },
];

const testimonials = [
  {
    quote: "KG Ops transformed our entire DevOps pipeline. Deployment time went from hours to minutes.",
    name: "Sarah Chen",
    role: "CTO, HealthTech Pro",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face"
  },
  {
    quote: "Their AI integration helped us cut support costs by 60% and improved our NPS score significantly.",
    name: "James Okafor",
    role: "VP Engineering, FinanceCore",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
  },
  {
    quote: "The team delivered a full e-commerce platform in 3 months. Quality and speed were exceptional.",
    name: "Priya Sharma",
    role: "CEO, RetailMax",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=60&h=60&fit=crop&crop=face"
  },
];

const process = [
  { num: '01', title: 'Discovery & Strategy', desc: 'We deep-dive into your business goals to craft a tailored technology roadmap.' },
  { num: '02', title: 'Design & Architecture', desc: 'Our architects design scalable, secure systems built for long-term growth.' },
  { num: '03', title: 'Build & Iterate', desc: 'Agile development with weekly demos and continuous feedback loops.' },
  { num: '04', title: 'Launch & Scale', desc: 'Smooth deployment with 24/7 monitoring and proactive optimization.' },
];

const HomeExtra = () => (
  <>
    {/* Why Us */}
    <section className="why-us">
      <div className="container why-inner">
        <motion.div
          className="why-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-tag">Why KG Ops</div>
          <h2 className="section-title">The Partner You Need to <span className="gradient-text">Scale Fast</span></h2>
          <p className="section-sub" style={{marginBottom:'2rem'}}>
            We combine deep technical expertise with a startup mindset — delivering enterprise-grade solutions at startup speed.
          </p>
          {[
            'ISO-certified security & compliance',
            'Dedicated Agile teams per project',
            'Real-time delivery dashboards',
            'Post-launch 12-month SLA warranty',
          ].map((item, i) => (
            <div key={i} className="check-item">
              <CheckCircle size={18} className="text-accent3"/> {item}
            </div>
          ))}
          <Link to="/about" className="btn-wavy" style={{marginTop:'2rem'}}>
            <span>Learn about us</span> <ArrowRight size={16}/>
          </Link>
        </motion.div>

        <motion.div
          className="why-right"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop"
            alt="Team collaboration"
            className="why-img"
          />
          {/* Floating stat card commented out for startup phase
          <div className="why-floating-card">
            <div className="floating-stat">
              <span className="stat-number gradient-text">98%</span>
              <span className="text-muted" style={{fontSize:'0.85rem'}}>Client Retention Rate</span>
            </div>
          </div>
          */}
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
          <h2 className="section-title">Our Proven <span className="gradient-text">Process</span></h2>
        </motion.div>

        <div className="process-grid">
          {process.map((p, i) => (
            <motion.div
              key={i}
              className="process-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="process-num gradient-text">{p.num}</span>
              <h3 style={{fontFamily:"'Space Grotesk',sans-serif", fontSize:'1.1rem', fontWeight:700, marginBottom:'0.6rem'}}>{p.title}</h3>
              <p style={{color:'var(--muted)', fontSize:'0.9rem', lineHeight:1.65}}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="testimonials-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{textAlign:'center', alignItems:'center', display:'flex', flexDirection:'column', marginBottom:'4rem'}}
        >
          <div className="section-tag">Client Love</div>
          <h2 className="section-title">What Our Clients <span className="gradient-text">Say</span></h2>
        </motion.div>

        <div className="testi-grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="testi-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <Quote size={32} className="testi-quote-icon"/>
              <p className="testi-text">"{t.quote}"</p>
              <div className="testi-author">
                <img src={t.avatar} alt={t.name} className="testi-avatar"/>
                <div>
                  <strong style={{fontSize:'0.95rem'}}>{t.name}</strong>
                  <p style={{color:'var(--muted)', fontSize:'0.82rem'}}>{t.role}</p>
                </div>
              </div>
              <div className="testi-stars">
                {[...Array(5)].map((_,j)=><Star key={j} size={14} fill="var(--gold)" color="var(--gold)"/>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Case Study Preview commented out for startup phase
    <section className="cases-preview">
      <div className="container">
        <motion.div
          style={{textAlign:'center', alignItems:'center', display:'flex', flexDirection:'column', marginBottom:'4rem'}}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-tag">Our Work</div>
          <h2 className="section-title">Featured <span className="gradient-text">Case Studies</span></h2>
        </motion.div>

        <div className="cases-grid">
          {clients.map((c, i) => (
            <motion.div
              key={i}
              className="case-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <img src={c.img} alt={c.name} className="case-img"/>
              <div className="case-body">
                <span className="chip">{c.industry}</span>
                <h3 className="case-title">{c.name}</h3>
                <p className="case-result gradient-text-warm">{c.result}</p>
              </div>
              <div className="case-hover">
                <Link to="/case-studies" className="btn btn-primary btn-sm">View Case Study <ArrowRight size={14}/></Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{textAlign:'center', marginTop:'3rem'}}>
          <Link to="/case-studies" className="btn btn-outline">See all case studies <ArrowRight size={16}/></Link>
        </div>
      </div>
    </section>
    */}
  </>
);

export default HomeExtra;
