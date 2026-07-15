import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Users, GraduationCap, ShieldCheck,
  Video, Calendar, Award, BarChart3, MessageSquare, Bell
} from 'lucide-react';
import './ProductsPage.css';

/* ─── Feature list ─── */
const features = [
  { icon: <Video size={18} />,         color: '#4f8ef7', label: 'Live session links'                  },
  { icon: <Calendar size={18} />,      color: '#6d5ef6', label: '1:1 booking system'                  },
  { icon: <MessageSquare size={18} />, color: '#4f8ef7', label: 'Academic support & query resolution'  },
  { icon: <Award size={18} />,         color: '#6d5ef6', label: 'Certificate downloads'                },
  { icon: <BarChart3 size={18} />,     color: '#4f8ef7', label: 'Weekly performance tracking'          },
  { icon: <Bell size={18} />,          color: '#6d5ef6', label: 'Admin alerts & smart reminders'       },
];

/* ─── Role cards ─── */
const roles = [
  {
    icon: <ShieldCheck size={26} />,
    color: '#4f8ef7',
    title: 'Admin',
    desc: 'Full control over users, content, reminders, support tickets, and reports — everything visible from one powerful dashboard.',
  },
  {
    icon: <Users size={26} />,
    color: '#6d5ef6',
    title: 'Candidate',
    desc: 'Access live sessions, book mentors, raise queries, download certificates, and monitor your weekly learning progress.',
  },
  {
    icon: <GraduationCap size={26} />,
    color: '#4f8ef7',
    title: 'Faculty',
    desc: 'Manage class schedules, respond to student queries, share resources, and track attendance — all in one place.',
  },
];



/* ─── Page ─── */
const ProductsPage = () => (
  <div style={{ minHeight: '100vh' }}>

    {/* ── Hero ── */}
    <div className="prod-hero">
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
          <div className="section-tag" style={{ margin: '0 auto 1.25rem' }}>
            Live Product · Client Success
          </div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem,5vw,3.6rem)', marginBottom: '1rem' }}>
            From Manual Chaos to a{' '}
            <span className="gradient-text">Centralised Hub</span>
          </h1>
          <p className="section-sub" style={{ maxWidth: 640, margin: '0 auto' }}>
            We designed and shipped a fully centralised platform for a course provider who was drowning
            in spreadsheets, group chats, and manual follow-ups. One platform. Every role. Zero wasted effort.
          </p>
        </motion.div>
      </div>
    </div>

    {/* ── Main product section ── */}
    <div className="container prod-main-single">

      {/* Copy — left */}
      <motion.div
        className="prod-copy-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Badges moved here so image can top-align with EduHub title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <span className="section-tag" style={{ color: '#4f8ef7', background: 'rgba(79,142,247,0.1)', border: '1px solid rgba(79,142,247,0.2)', margin: 0 }}>
            EdTech Platform
          </span>
          <span className="chip" style={{ fontSize: '0.75rem', background: 'rgba(34,197,94,0.1)', color: '#4ade80', borderColor: 'transparent' }}>
            ✦ Live &amp; Deployed
          </span>
        </div>

        <h2 className="prod-name">EduHub</h2>
        <p className="prod-tagline">Your institution's command centre.</p>

        <p className="prod-desc">
          Our client — a growing course provider — was managing live classes, mentor bookings, student
          queries, and certifications entirely through manual effort. We built <strong>EduHub</strong>:
          a role-based, centralised platform that gives every stakeholder their own intelligent dashboard,
          replacing scattered tools with a single source of truth.
        </p>

        <p className="prod-desc" style={{ marginTop: '0.75rem' }}>
          Hub is your single platform to access everything your institution runs on:
        </p>

        {/* Feature grid */}
        <div className="prod-features">
          {features.map((f, i) => (
            <div key={i} className="prod-feature-item">
              <span style={{ color: f.color, flexShrink: 0 }}>{f.icon}</span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/contact" className="btn-wavy">
            <span>Build something like this</span> <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>

      {/* Landscape image — full width */}
      <motion.div
        className="prod-image-wrap"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.15 }}
      >
        <img
          src="/eduhub_mockup_1784134109726.png"
          alt="EduHub — centralised platform for Admin, Candidate and Faculty"
          className="prod-landscape-img"
        />
      </motion.div>
    </div>

    {/* ── Role cards ── */}
    <div className="container prod-roles-section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
      >
        <h2 className="section-title" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', marginBottom: '0.75rem' }}>
          Three Logins. <span className="gradient-text">One Ecosystem.</span>
        </h2>
        <p className="section-sub" style={{ maxWidth: 540, margin: '0 auto' }}>
          Every user sees exactly what they need — no clutter, no confusion. Role-based access keeps the
          platform secure, focused, and fast for everyone.
        </p>
      </motion.div>

      <div className="prod-roles">
        {roles.map((r, i) => (
          <motion.div
            key={i}
            className="card prod-role-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.12 }}
          >
            <div
              className="prod-role-icon"
              style={{ color: r.color, background: `${r.color}15`, border: `1px solid ${r.color}25` }}
            >
              {r.icon}
            </div>
            <h3 className="prod-role-title">{r.title}</h3>
            <p className="prod-role-desc">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>

    {/* ── CTA banner ── */}
    <div className="container" style={{ padding: '0 5% 5rem' }}>
      <motion.div
        className="card prod-cta-banner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h3 className="prod-cta-title">Got a similar challenge?</h3>
          <p className="prod-cta-sub">
            If your team is doing manually what software should handle — scheduling, tracking, support,
            certifications — we'll build you the system that changes that.
          </p>
        </div>
        <Link to="/contact" className="hero-btn hero-btn--primary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
          <span>Let's talk</span> <ArrowRight size={16} className="hero-btn__arrow" />
        </Link>
      </motion.div>
    </div>

  </div>
);

export default ProductsPage;


