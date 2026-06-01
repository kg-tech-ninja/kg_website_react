import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';

const products = [
  {
    name: 'KG Flow',
    tag: 'Workflow Automation',
    color: '#4f8ef7',
    desc: 'Automate repetitive business workflows with a no-code drag-and-drop builder. Integrate 200+ tools out of the box.',
    features: ['Visual workflow builder', '200+ integrations', 'Real-time analytics', 'Team collaboration'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=380&fit=crop',
    status: 'Live',
  },
  {
    name: 'KG Shield',
    tag: 'Cybersecurity Suite',
    color: '#00d4aa',
    desc: 'Enterprise-grade security monitoring, threat detection, and compliance management on one unified dashboard.',
    features: ['Threat intelligence', 'SIEM integration', 'Compliance reports', 'Zero-trust access'],
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=380&fit=crop',
    status: 'Beta',
  },
  {
    name: 'KG Insight',
    tag: 'Business Intelligence',
    color: '#7c5cfc',
    desc: 'Turn raw data into boardroom-ready insights with AI-powered analytics and beautiful, shareable dashboards.',
    features: ['AI-powered reports', 'Custom dashboards', 'Multi-source connectors', 'Scheduled alerts'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=380&fit=crop',
    status: 'Coming Soon',
  },
];

const ProductsPage = () => (
  <div style={{ minHeight: '100vh' }}>
    {/* Hero */}
    <div style={{ padding:'calc(var(--nav-h) + 2rem) 0 2.5rem', background:'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,92,252,0.1) 0%, transparent 70%)', borderBottom:'1px solid var(--border)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="section-tag" style={{ margin: '0 auto 1.25rem' }}>SaaS Products</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', marginBottom: '1rem' }}>
            Software Built for <span className="gradient-text">Modern Teams</span>
          </h1>
          <p className="section-sub" style={{ margin: '0 auto 2.5rem' }}>
            Our proprietary SaaS products help businesses automate workflows, secure data, and unlock intelligence at scale.
          </p>
        </motion.div>
      </div>
    </div>

    {/* Products List */}
    <div className="container" style={{ padding: '2.5rem 5%', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {products.map((p, i) => (
        <motion.div
          key={i}
          className="card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr', gap: '3rem', alignItems: 'center', padding: '2.5rem' }}
        >
          {/* Text (alternate order) */}
          <div style={{ order: i % 2 !== 0 ? 2 : 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span className="section-tag" style={{ color: p.color, background: `${p.color}15`, border: `1px solid ${p.color}25` }}>{p.tag}</span>
              <span className="chip" style={{ fontSize: '0.75rem', background: p.status === 'Live' ? 'rgba(0,212,170,0.1)' : p.status === 'Beta' ? 'rgba(79,142,247,0.1)' : 'rgba(246,201,14,0.1)', color: p.status === 'Live' ? '#00d4aa' : p.status === 'Beta' ? '#4f8ef7' : '#f6c90e', borderColor: 'transparent' }}>{p.status}</span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>{p.name}</h2>
            <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>{p.desc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              {p.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--muted)', fontSize: '0.9rem' }}>
                  <CheckCircle size={16} color={p.color}/> {f}
                </div>
              ))}
            </div>
            <Link to="/contact" className="btn-wavy">
              <span>{p.status === 'Coming Soon' ? 'Join Waitlist' : 'Get Started'}</span> <ArrowRight size={16}/>
            </Link>
          </div>

          {/* Image */}
          <div style={{ order: i % 2 !== 0 ? 1 : 2 }}>
            <img src={p.img} alt={p.name} style={{ width: '100%', borderRadius: 'var(--radius)', objectFit: 'cover', height: '280px', border: '1px solid var(--border)' }}/>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default ProductsPage;
