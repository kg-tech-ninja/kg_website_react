import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Globe, Award, Heart } from 'lucide-react';

const team = [
  { name: 'Karthik G.', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face' },
  { name: 'Priya Rajan', role: 'CTO', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop&crop=face' },
  { name: 'Arjun S.', role: 'Head of Engineering', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
  { name: 'Meera V.', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
];

const values = [
  { icon: <Users size={28}/>, title: 'Client First', desc: 'Every decision starts with the question: does this create value for our clients?', color: '#4f8ef7' },
  { icon: <Globe size={28}/>, title: 'Global Mindset', desc: 'We build solutions that work across borders, cultures, and time zones.', color: '#7c5cfc' },
  { icon: <Award size={28}/>, title: 'Excellence Always', desc: 'We hold ourselves to the highest technical and professional standards.', color: '#00d4aa' },
  { icon: <Heart size={28}/>, title: 'People Matter', desc: 'Our culture prioritises wellbeing, growth, and genuine human connection.', color: '#f05454' },
];

const AboutPage = () => (
  <div style={{ minHeight: '100vh' }}>
    {/* Hero */}
    <div style={{ padding: 'calc(var(--nav-h) + 2rem) 0 2.5rem', background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,170,0.08) 0%, transparent 70%)', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="section-tag" style={{ margin: '0 auto 1.25rem' }}>Who We Are</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', marginBottom: '1rem' }}>
            Building the Future of <span className="gradient-text">Digital Enterprise</span>
          </h1>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Founded in 2012, KG Ops is a global technology engineering company helping businesses build, scale, and operate the digital infrastructure of tomorrow.
          </p>
        </motion.div>
      </div>
    </div>

    {/* Story */}
    <div className="container" style={{ padding: '2.5rem 5%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
      <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <div className="section-tag" style={{ marginBottom: '1.25rem' }}>Our Story</div>
        <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>From a 3-Person Startup to a <span className="gradient-text">Global Team</span></h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
          KG Ops began in 2012 when our founder Karthik G. recognized that most businesses were underserved by generic IT firms — and set out to build something different: a deeply technical, client-obsessed engineering company.
        </p>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
          Today, with 200+ engineers across 4 countries, we've delivered over 350 digital products and continue to grow — driven by the same conviction that extraordinary technology, built with care, changes businesses.
        </p>
        <Link to="/contact" className="btn-wavy"><span>Work with us</span> <ArrowRight size={16}/></Link>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=480&fit=crop" alt="KG Ops Team" style={{ width: '100%', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', height: '380px', objectFit: 'cover' }}/>
      </motion.div>
    </div>

    {/* Values */}
    <div style={{ background: 'var(--bg2)', padding: '2.5rem 0' }}>
      <div className="container" style={{ padding: '0 5%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag" style={{ margin: '0 auto 1rem' }}>Our Core Values</div>
          <h2 className="section-title">What We Stand <span className="gradient-text">For</span></h2>
        </div>
        <div className="grid-4">
          {values.map((v, i) => (
            <motion.div key={i} className="card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: `${v.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: v.color, marginBottom: '1.25rem' }}>{v.icon}</div>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem' }}>{v.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Team */}
    <div className="container" style={{ padding: '2.5rem 5%' }}>
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div className="section-tag" style={{ margin: '0 auto 1rem' }}>Leadership</div>
        <h2 className="section-title">Meet the <span className="gradient-text">Team</span></h2>
      </div>
      <div className="grid-4">
        {team.map((m, i) => (
          <motion.div key={i} className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <img src={m.img} alt={m.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)', marginBottom: '1rem' }}/>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, marginBottom: '0.3rem' }}>{m.name}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>{m.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default AboutPage;
