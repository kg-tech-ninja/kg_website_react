import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Cloud, Code, Megaphone, ShieldCheck, Terminal, Smartphone, Database } from 'lucide-react';
import './Services.css';

const items = [
  { icon: <Cpu size={28}/>, color: '#4f8ef7', title: 'IT Service & Products', sub: 'End-to-end solutions for modern enterprise', href: '/services/it-services' },
  { icon: <Megaphone size={28}/>, color: '#7c5cfc', title: 'Digital Marketing', sub: 'Data-driven growth strategies', href: '/services/digital-marketing' },
  { icon: <ShieldCheck size={28}/>, color: '#00d4aa', title: 'Admin & Support', sub: '24/7 operational excellence', href: '/services/admin-support' },
  { icon: <Terminal size={28}/>, color: '#f6c90e', title: 'DevOps & CI/CD', sub: 'Automated pipelines & infra', href: '/services/devops' },
  { icon: <Cloud size={28}/>, color: '#4f8ef7', title: 'SaaS Products', sub: 'Scalable software-as-a-service', href: '/products/kg-flow' },
  { icon: <Smartphone size={28}/>, color: '#f05454', title: 'Mobile Development', sub: 'iOS & Android applications', href: '/services/mobile-development' },
  { icon: <Code size={28}/>, color: '#7c5cfc', title: 'Custom Software', sub: 'Bespoke engineering solutions', href: '/services/custom-software' },
  { icon: <Database size={28}/>, color: '#00d4aa', title: 'AI & ML Services', sub: 'Intelligent automation & analytics', href: '/services/ai-ml' },
];

const card = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServicesOverview = () => (
  <section className="services-section">
    <div className="container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-tag">What we do</div>
        <h2 className="section-title">Comprehensive Digital <span className="gradient-text">Services</span></h2>
        <p className="section-sub">From cloud infrastructure to AI-driven marketing — we handle everything your business needs to grow.</p>
      </motion.div>

      <motion.div
        className="services-grid"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
      >
        {items.map((s, i) => (
          <motion.div key={i} variants={card}>
            <Link to={s.href} className="service-card card">
              <div className="srv-icon" style={{ background: `${s.color}18`, color: s.color }}>
                {s.icon}
              </div>
              <h3 className="srv-title">{s.title}</h3>
              <p className="srv-sub">{s.sub}</p>
              <div className="srv-arrow">
                <ArrowRight size={16}/>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="services-cta">
        <Link to="/services" className="btn btn-outline">
          <span>View all services</span> <ArrowRight size={16}/>
        </Link>
      </div>
    </div>
  </section>
);

export default ServicesOverview;
