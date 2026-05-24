import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, Code, Layout as LayoutIcon, Settings, Cloud, Cpu, Megaphone, ShieldCheck, ArrowRight } from 'lucide-react';
import './ServicesPage.css';

const allServices = [
  {
    icon: <Cpu size={38}/>, color: '#4f8ef7',
    title: 'IT Service & Products Provide',
    subtitle: 'End-to-end enterprise IT solutions',
    id: 'it',
    desc: 'We design, implement, and maintain complete IT ecosystems — from hardware procurement and networking to software licensing and helpdesk.',
    features: ['IT Consulting & Audits', 'Network Setup & Security', 'Hardware Procurement', 'Help Desk & Ticketing', 'Vendor Management'],
  },
  {
    icon: <Megaphone size={38}/>, color: '#7c5cfc',
    title: 'Digital Marketing',
    subtitle: 'Data-driven growth at scale',
    id: 'marketing',
    desc: 'Our growth marketers combine SEO, performance ads, content strategy, and automation to build a measurable demand engine for your business.',
    features: ['SEO & Content Strategy', 'Paid Ads (Google, Meta)', 'Email & Marketing Automation', 'Brand Identity & Design', 'Analytics & Reporting'],
  },
  {
    icon: <ShieldCheck size={38}/>, color: '#00d4aa',
    title: 'Admin & Support',
    subtitle: 'Operational excellence, 24/7',
    id: 'support',
    desc: 'From back-office management to customer-facing support teams, we handle the operational complexity so your core team can focus on growth.',
    features: ['24/7 L1/L2/L3 Support', 'SLA Management', 'Incident Response', 'Process Documentation', 'Remote Admin Teams'],
  },
  {
    icon: <Settings size={38}/>, color: '#f6c90e',
    title: 'DevOps & CI/CD',
    subtitle: 'Performance monitoring & automation',
    id: 'devops',
    desc: 'We build and manage fully automated deployment pipelines using industry best tools, enabling teams to ship fast and reliably.',
    features: ['CI/CD Pipeline Design', 'Docker & Kubernetes', 'AWS / Azure / GCP', 'Monitoring & Alerting', 'Infrastructure as Code'],
  },
  {
    icon: <Smartphone size={38}/>, color: '#f05454',
    title: 'Mobile App Development',
    subtitle: 'iOS & Android, built to perform',
    id: 'mobile',
    desc: 'We create high-performance native and cross-platform mobile applications with exceptional UX and robust backend integrations.',
    features: ['React Native & Flutter', 'iOS (Swift) & Android (Kotlin)', 'App Store Optimization', 'Offline-First Architecture', 'Push Notifications & Analytics'],
  },
  {
    icon: <Code size={38}/>, color: '#4f8ef7',
    title: 'Custom Software Development',
    subtitle: 'Bespoke solutions, battle-tested',
    id: 'software',
    desc: 'Our engineers build tailor-made web and desktop applications from scratch — architected for scale, security, and long-term maintainability.',
    features: ['React, Node.js, Python, Java', 'Microservices Architecture', 'PostgreSQL, MongoDB, Redis', 'REST & GraphQL APIs', 'Code Reviews & QA Testing'],
  },
  {
    icon: <LayoutIcon size={38}/>, color: '#7c5cfc',
    title: 'Website Design & Development',
    subtitle: 'Zend, Python, Laravel, Sqlite, Elastic search, MongoDB',
    id: 'web',
    desc: 'From marketing landing pages to complex portals, we design and build pixel-perfect websites optimised for conversions and performance.',
    features: ['UI/UX Design & Prototyping', 'CMS Integration (Sanity, Strapi)', 'Speed & Core Web Vitals', 'SEO-Optimized Architecture', 'E-Commerce & Payments'],
  },
  {
    icon: <Cloud size={38}/>, color: '#00d4aa',
    title: 'AI & ML Services',
    subtitle: 'Automate, optimize, and innovate',
    id: 'ai',
    desc: 'Boost your business with cutting-edge AI and ML technology — from intelligent chatbots to predictive analytics and computer vision.',
    features: ['LLM Integration (GPT, Gemini)', 'Computer Vision Systems', 'Predictive Analytics', 'NLP & Chatbot Development', 'MLOps & Model Deployment'],
  },
];

const idMap = {
  'it': 'it-services',
  'marketing': 'digital-marketing',
  'support': 'admin-support',
  'devops': 'devops',
  'mobile': 'mobile-development',
  'software': 'custom-software',
  'web': 'web-development',
  'ai': 'ai-ml',
};

const ServicesPage = () => (
  <div className="services-page">
    {/* Page Hero */}
    <div className="services-hero">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{textAlign:'center'}}
        >
          <div className="section-tag" style={{margin:'0 auto 1.25rem'}}>Full Service Portfolio</div>
          <h1 className="section-title" style={{fontSize:'clamp(2.5rem,5vw,4rem)', marginBottom:'1rem'}}>
            Everything Your Business Needs to <span className="gradient-text">Grow</span>
          </h1>
          <p className="section-sub" style={{margin:'0 auto 2.5rem'}}>
            From infrastructure to AI — we provide end-to-end technology solutions that scale with your ambitions.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Discuss your project <ArrowRight size={16}/>
          </Link>
        </motion.div>
      </div>
    </div>

    {/* Services List */}
    <div className="services-detail-list container">
      {allServices.map((s, i) => (
        <motion.div
          key={s.id}
          id={s.id}
          className="service-detail-row"
          initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="sdr-icon-col">
            <div className="sdr-icon-box" style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
          </div>

          <div className="sdr-content-col">
            <h2 className="sdr-title">{s.title}</h2>
            <p className="sdr-subtitle">{s.subtitle}</p>
            <p className="sdr-desc">{s.desc}</p>
            <div className="sdr-features">
              {s.features.map((f, j) => (
                <span key={j} className="chip sdr-chip">✦ {f}</span>
              ))}
            </div>
            <div style={{display:'flex', gap:'0.75rem', marginTop:'1.5rem', flexWrap:'wrap'}}>
              <Link to={`/services/${idMap[s.id]}`} className="btn btn-primary" style={{fontSize:'0.875rem'}}>
                Learn More <ArrowRight size={15}/>
              </Link>
              <Link to="/contact" className="btn btn-outline" style={{fontSize:'0.875rem'}}>
                Get a Quote
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default ServicesPage;
