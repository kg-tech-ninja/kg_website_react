import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Clock, Users } from 'lucide-react';

const cases = [
  {
    tag: 'Healthcare', title: 'HealthTech Pro — Patient Portal Redesign',
    metrics: [{ icon: <TrendingUp size={16}/>, val: '3× revenue growth in 8 months' }, { icon: <Users size={16}/>, val: '250,000+ active patients' }, { icon: <Clock size={16}/>, val: 'Delivered in 14 weeks' }],
    desc: 'We rebuilt a legacy patient management portal from scratch using React, Node.js, and AWS — reducing page load time by 80% and driving a 3× revenue uplift.',
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&h=420&fit=crop',
    color: '#00d4aa',
  },
  {
    tag: 'Fintech', title: 'FinanceCore — AI Fraud Detection System',
    metrics: [{ icon: <TrendingUp size={16}/>, val: '$2M cost savings annually' }, { icon: <Users size={16}/>, val: '99.7% fraud detection accuracy' }, { icon: <Clock size={16}/>, val: 'Delivered in 20 weeks' }],
    desc: 'We built an ML-powered fraud detection pipeline using Python and TensorFlow that processes 10M+ transactions daily with sub-100ms latency.',
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&h=420&fit=crop',
    color: '#4f8ef7',
  },
  {
    tag: 'E-commerce', title: 'RetailMax — Headless Commerce Platform',
    metrics: [{ icon: <TrendingUp size={16}/>, val: '180% organic traffic growth' }, { icon: <Users size={16}/>, val: '40% conversion rate improvement' }, { icon: <Clock size={16}/>, val: 'Delivered in 18 weeks' }],
    desc: 'We migrated RetailMax from a monolithic WooCommerce setup to a blazing-fast Next.js + Shopify headless stack with full SEO optimization.',
    img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=700&h=420&fit=crop',
    color: '#7c5cfc',
  },
  {
    tag: 'EdTech', title: 'LearnPath — LMS Scalability & DevOps',
    metrics: [{ icon: <TrendingUp size={16}/>, val: '10× platform scalability' }, { icon: <Users size={16}/>, val: '99.99% uptime achieved' }, { icon: <Clock size={16}/>, val: 'Zero-downtime migrations' }],
    desc: 'We restructured their AWS infrastructure using Kubernetes, implemented blue-green deployments, and cut server costs by 45% while handling 10× the traffic.',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=420&fit=crop',
    color: '#f6c90e',
  },
];

const CaseStudiesPage = () => (
  <div style={{ minHeight: '100vh' }}>
    {/* Hero */}
    <div style={{ padding: 'calc(var(--nav-h) + 4rem) 0 5rem', background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,92,252,0.08) 0%, transparent 70%)', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="section-tag" style={{ margin: '0 auto 1.25rem' }}>Our Work</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', marginBottom: '1rem' }}>
            Real Projects, <span className="gradient-text">Real Results</span>
          </h1>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Measurable impact delivered across industries, at speed, without compromising quality.
          </p>
        </motion.div>
      </div>
    </div>

    {/* Cases */}
    <div className="container" style={{ padding: '5rem 5%', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      {cases.map((c, i) => (
        <motion.div
          key={i}
          className="card"
          style={{ padding: 0, overflow: 'hidden' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1.2fr 1fr' : '1fr 1.2fr' }}>
            <div style={{ order: i % 2 !== 0 ? 2 : 1 }}>
              <img src={c.img} alt={c.title} style={{ width: '100%', height: '100%', minHeight: 320, objectFit: 'cover', display: 'block', filter: 'brightness(0.75)' }}/>
            </div>
            <div style={{ order: i % 2 !== 0 ? 1 : 2, padding: '3rem' }}>
              <span className="section-tag" style={{ marginBottom: '1rem', color: c.color, background: `${c.color}15`, border: `1px solid ${c.color}25` }}>{c.tag}</span>
              <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.3 }}>{c.title}</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>{c.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                {c.metrics.map((m, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                    <span style={{ color: c.color }}>{m.icon}</span>
                    <span style={{ color: 'var(--muted)' }}>{m.val}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
                <span>Start a similar project</span> <ArrowRight size={15}/>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Bottom CTA */}
    <div style={{ background: 'var(--bg2)', padding: '5rem 0', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>Ready to Become Our <span className="gradient-text">Next Success Story?</span></h2>
        <p className="section-sub" style={{ margin: '0 auto 2rem' }}>Let's talk about your project.</p>
        <Link to="/contact" className="btn-wavy"><span>Start your project</span> <ArrowRight size={16}/></Link>
      </div>
    </div>
  </div>
);

export default CaseStudiesPage;
