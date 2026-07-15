import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Smartphone, Code, Layout as LayoutIcon, Settings, Cloud, Cpu, Megaphone, ShieldCheck, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import './ServicesPage.css';

const allServices = [
  {
    icon: <Cpu size={30}/>, color: '#4f8ef7',
    title: 'IT Services & Products',
    subtitle: 'End-to-end enterprise IT',
    id: 'it',
    desc: 'We design, implement, and maintain complete IT ecosystems — from hardware procurement and networking to software licensing and helpdesk.',
    features: ['IT Consulting & Audits', 'Network Setup & Security', 'Hardware Procurement', 'Help Desk & Ticketing', 'Vendor Management'],
  },
  {
    icon: <Megaphone size={30}/>, color: '#6d5ef6',
    title: 'Digital Marketing',
    subtitle: 'Data-driven growth at scale',
    id: 'marketing',
    desc: 'Our growth marketers combine SEO, performance ads, content strategy, and automation to build a measurable demand engine for your business.',
    features: ['SEO & Content Strategy', 'Paid Performance Ads', 'Email & Marketing Automation', 'Brand Identity & Design', 'Analytics & Reporting'],
  },
  {
    icon: <ShieldCheck size={30}/>, color: '#4f8ef7',
    title: 'Admin & Support',
    subtitle: 'Operational excellence',
    id: 'support',
    desc: 'From back-office management to customer-facing support teams, we handle the operational complexity so your core team can focus on growth.',
    features: ['L1 / L2 / L3 Support', 'SLA Management', 'Incident Response', 'Process Documentation', 'Remote Admin Teams'],
  },
  {
    icon: <Settings size={30}/>, color: '#6d5ef6',
    title: 'DevOps & CI/CD',
    subtitle: 'Automation & monitoring',
    id: 'devops',
    desc: 'We build and manage fully automated deployment pipelines using industry best tools, enabling teams to ship fast and reliably.',
    features: ['CI/CD Pipeline Design', 'Container Orchestration', 'Multi-Cloud Deployment', 'Monitoring & Alerting', 'Infrastructure as Code'],
  },
  {
    icon: <Smartphone size={30}/>, color: '#4f8ef7',
    title: 'Mobile App Development',
    subtitle: 'iOS & Android, built to perform',
    id: 'mobile',
    desc: 'We create high-performance native and cross-platform mobile applications with exceptional UX and robust backend integrations.',
    features: ['Cross-Platform Apps', 'Native iOS & Android', 'App Store Optimization', 'Offline-First Architecture', 'Push Notifications & Analytics'],
  },
  {
    icon: <Code size={30}/>, color: '#4f8ef7',
    title: 'Custom Software',
    subtitle: 'Bespoke, battle-tested builds',
    id: 'software',
    desc: 'Our engineers build tailor-made web and desktop applications from scratch — architected for scale, security, and long-term maintainability.',
    features: ['Full-Stack Web Apps', 'Microservices Architecture', 'Scalable Database Design', 'API Design & Integration', 'Code Reviews & QA Testing'],
  },
  {
    icon: <LayoutIcon size={30}/>, color: '#6d5ef6',
    title: 'Website Design & Development',
    subtitle: 'Fast, SEO-ready sites & portals',
    id: 'web',
    desc: 'From marketing landing pages to complex portals, we design and build pixel-perfect websites optimised for conversions and performance.',
    features: ['UI/UX Design & Prototyping', 'Headless CMS Integration', 'Speed & Core Web Vitals', 'SEO-Optimized Architecture', 'E-Commerce & Payments'],
  },
  {
    icon: <Cloud size={30}/>, color: '#4f8ef7',
    title: 'AI & ML Services',
    subtitle: 'Automate, optimize, innovate',
    id: 'ai',
    desc: 'Boost your business with cutting-edge AI and ML technology — from intelligent chatbots to predictive analytics and computer vision.',
    features: ['Generative AI Integration', 'Computer Vision Systems', 'Predictive Analytics', 'NLP & Chatbot Development', 'MLOps & Model Deployment'],
  },
];

const idMap = {
  it: 'it-services',
  marketing: 'digital-marketing',
  support: 'admin-support',
  devops: 'devops',
  mobile: 'mobile-development',
  software: 'custom-software',
  web: 'web-development',
  ai: 'ai-ml',
};

const ServicesPage = () => {
  const { hash } = useLocation();

  /* scroll to the anchored service when arriving via a #hash link (navbar dropdown) */
  useEffect(() => {
    if (!hash) { window.scrollTo({ top: 0 }); return; }
    const id = hash.slice(1);
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <div className="services-page">
      {/* ═══ Hero ═══ */}
      <section className="svc-hero">
        <div className="svc-hero__bg" aria-hidden="true">
          <div className="svc-hero__aurora svc-hero__aurora--1" />
          <div className="svc-hero__aurora svc-hero__aurora--2" />
          <div className="svc-hero__grid" />
        </div>
        <motion.div
          className="svc-hero__inner"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="svc-eyebrow"><span className="svc-eyebrow__dot" /> Full service portfolio</span>
          <h1 className="svc-hero__title">
            Everything your business needs to <span className="gradient-text">grow</span>
          </h1>
          <p className="svc-hero__sub">
            From infrastructure to AI — end-to-end technology, engineered to scale with your ambitions.
          </p>
          <div className="svc-hero__cta">
            <Link to="/contact" className="svc-btn svc-btn--primary">
              <span>Discuss your project</span> <ArrowRight size={18} />
            </Link>
            <Link to="/products" className="svc-btn svc-btn--ghost">
              <span>Explore products</span>
            </Link>
          </div>
          <div className="svc-hero__meta">
            <span>8 core services</span>
            <span className="svc-hero__dot" />
            <span>Senior engineers, hands-on</span>
            <span className="svc-hero__dot" />
            <span>Fixed-scope pricing</span>
          </div>
        </motion.div>
      </section>

      {/* ═══ Services grid ═══ */}
      <section className="svc-section">
        <div className="svc-grid">
          {allServices.map((s, i) => (
            <motion.article
              key={s.id}
              id={s.id}
              className="svc-card"
              style={{ '--svc': s.color }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="svc-card__top">
                <span className="svc-card__icon">{s.icon}</span>
                <span className="svc-card__num">{String(i + 1).padStart(2, '0')}</span>
              </div>

              <h2 className="svc-card__title">{s.title}</h2>
              <p className="svc-card__sub">{s.subtitle}</p>
              <p className="svc-card__desc">{s.desc}</p>

              <ul className="svc-card__features">
                {s.features.map((f, j) => (
                  <li key={j}><Check size={14} /> {f}</li>
                ))}
              </ul>

              <Link to={`/services/${idMap[s.id]}`} className="svc-card__link">
                Learn more <ArrowUpRight size={16} />
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ═══ CTA band ═══ */}
      <section className="svc-cta">
        <div className="svc-cta__inner">
          <div>
            <h2 className="svc-cta__title">Not sure where to start?</h2>
            <p className="svc-cta__sub">
              Tell us your goals — we'll map the right services and a clear plan. No obligation.
            </p>
          </div>
          <Link to="/contact" className="svc-btn svc-btn--primary svc-cta__btn">
            <span>Book a free consult</span> <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
