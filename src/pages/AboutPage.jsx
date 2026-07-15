import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Globe, Award, Heart } from 'lucide-react';

const values = [
  { icon: <Users size={28}/>, title: 'Client First', desc: 'Every decision starts with one question: does this create real value for the client?', color: '#4f8ef7' },
  { icon: <Award size={28}/>, title: 'Craft Over Volume', desc: 'We take on work we can do exceptionally well — and we back every line of it.', color: '#6d5ef6' },
  { icon: <Globe size={28}/>, title: 'Modern By Default', desc: 'Secure, scalable, and built on today’s best tools — not yesterday’s shortcuts.', color: '#4f8ef7' },
  { icon: <Heart size={28}/>, title: 'Honest & Direct', desc: 'Clear communication, realistic timelines, and no jargon between you and the people building your product.', color: '#4f8ef7' },
];

const AboutPage = () => (
  <div style={{ minHeight: '100vh' }}>
    {/* Hero */}
    <div style={{ padding: 'calc(var(--nav-h) + 2rem) 0 2.5rem', background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(79,142,247,0.1) 0%, transparent 70%)', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="section-tag" style={{ margin: '0 auto 1.25rem' }}>Who We Are</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', marginBottom: '1rem' }}>
            Building the Future of <span className="gradient-text">Digital Enterprise</span>
          </h1>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            KG Web & Ops is a newly founded technology studio — a small, senior team helping businesses
            design, build, and operate modern software, websites, and IT.
          </p>
        </motion.div>
      </div>
    </div>

    {/* Story */}
    <div className="container" style={{ padding: '2.5rem 5%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
      <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <div className="section-tag" style={{ marginBottom: '1.25rem' }}>Our Story</div>
        <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>A Fresh Start, Built on <span className="gradient-text">Real Craft</span></h2>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
          We started KG Web & Ops because we believe businesses deserve a technology partner that treats
          their product like its own — not a ticket in a queue. No bloated agency layers, no juniors
          learning on your budget. Just experienced people doing focused, high-quality work.
        </p>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
          We're early in our journey, and we're honest about that. What we bring is deep technical skill,
          a genuine sense of ownership, and the drive of a team out to prove itself on every single project.
        </p>
        <Link to="/contact" className="btn-wavy"><span>Work with us</span> <ArrowRight size={16}/></Link>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=480&fit=crop" alt="Focused engineering work" style={{ width: '100%', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', height: '380px', objectFit: 'cover' }}/>
      </motion.div>
    </div>

    {/* Values */}
    <div style={{ background: 'var(--bg2)', padding: '3.5rem 0' }}>
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

    {/* CTA */}
    <div className="container" style={{ padding: '4.5rem 5%', textAlign: 'center' }}>
      <h2 className="section-title" style={{ marginBottom: '1rem' }}>Let's Build Something <span className="gradient-text">Together</span></h2>
      <p className="section-sub" style={{ margin: '0 auto 2rem' }}>
        Whether it's your first product or your next big rebuild — we'd love to hear what you're working on.
      </p>
      <Link to="/contact" className="btn-wavy"><span>Start a conversation</span> <ArrowRight size={16}/></Link>
    </div>
  </div>
);

export default AboutPage;
