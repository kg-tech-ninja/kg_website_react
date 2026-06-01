import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

const openings = [
  { title: 'Senior Full-Stack Engineer', dept: 'Engineering', location: 'Remote / Chennai', type: 'Full-time', salary: '₹18–30 LPA', desc: 'Build scalable web applications using React, Node.js, and cloud infrastructure. 4+ years experience required.' },
  { title: 'DevOps Engineer', dept: 'Infrastructure', location: 'Remote', type: 'Full-time', salary: '₹15–25 LPA', desc: 'Manage and scale our CI/CD systems, Kubernetes clusters, and AWS infrastructure for hundreds of client deployments.' },
  { title: 'AI/ML Engineer', dept: 'Data & AI', location: 'Hybrid / Chennai', type: 'Full-time', salary: '₹20–35 LPA', desc: 'Build and deploy LLM-powered products and ML pipelines. Experience with PyTorch, Transformers, and MLOps required.' },
  { title: 'UI/UX Designer', dept: 'Design', location: 'Remote', type: 'Full-time', salary: '₹10–18 LPA', desc: 'Design beautiful, functional interfaces for web and mobile products. Figma expertise and a strong portfolio required.' },
  { title: 'Digital Marketing Manager', dept: 'Marketing', location: 'Chennai', type: 'Full-time', salary: '₹8–15 LPA', desc: 'Lead SEO, paid ads, content strategy, and analytics for KG Ops and client brands.' },
];

const perks = [
  '🌍 100% Remote-friendly', '🏥 Full health insurance', '📈 ESOPs & profit sharing',
  '🎓 ₹1L/year learning budget', '🏖️ Unlimited PTO', '💻 Top-tier equipment'
];

const JobCard = ({ job }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="card job-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <div className="job-header" onClick={() => setOpen(!open)}>
        <div>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span className="chip" style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>{job.dept}</span>
            <span className="chip" style={{ fontSize: '0.75rem' }}>{job.type}</span>
          </div>
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.15rem', fontWeight: 700 }}>{job.title}</h3>
          <div className="job-meta">
            <span><MapPin size={13}/> {job.location}</span>
            <span><DollarSign size={13}/> {job.salary}</span>
            <span><Clock size={13}/> Full-time</span>
          </div>
        </div>
        <button className="btn btn-ghost" style={{ flexShrink: 0 }}>
          {open ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
        </button>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="job-body">
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{job.desc}</p>
          <Link to="/contact" className="btn btn-primary" style={{ fontSize: '0.875rem' }}>
            <span>Apply Now</span> <ArrowRight size={15}/>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

const CareersPage = () => (
  <div style={{ minHeight: '100vh' }}>
    {/* Hero */}
    <div style={{ padding: 'calc(var(--nav-h) + 4rem) 0 5rem', background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(246,201,14,0.06) 0%, transparent 70%)', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="section-tag" style={{ margin: '0 auto 1.25rem' }}>We're Hiring</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', marginBottom: '1rem' }}>
            Join a Team That <span className="gradient-text">Ships Great Things</span>
          </h1>
          <p className="section-sub" style={{ margin: '0 auto 2.5rem' }}>
            Help us build the future of enterprise technology. We're a high-growth team that values craft, ownership, and growth.
          </p>
        </motion.div>
      </div>
    </div>

    {/* Perks */}
    <div style={{ padding: '4rem 0', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{ padding: '0 5%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {perks.map((p, i) => (
            <motion.span key={i} className="chip" style={{ fontSize: '0.9rem', padding: '0.6rem 1.25rem' }}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              {p}
            </motion.span>
          ))}
        </div>
      </div>
    </div>

    {/* Job Listings */}
    <div className="container" style={{ padding: '5rem 5%' }}>
      <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>
        Open <span className="gradient-text">Positions</span>
        <span style={{ fontSize: '1rem', color: 'var(--muted)', fontWeight: 400, marginLeft: '1rem' }}>({openings.length} roles)</span>
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {openings.map((j, i) => <JobCard key={i} job={j}/>)}
      </div>

      <div className="card" style={{ marginTop: '3rem', textAlign: 'center', padding: '3rem', background: 'linear-gradient(135deg, rgba(79,142,247,0.06), rgba(124,92,252,0.06))' }}>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Don't see a fit?</h3>
        <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>Send us your resume and we'll reach out when the right role opens up.</p>
        <Link to="/contact" className="btn btn-primary"><span>Send your resume</span> <ArrowRight size={16}/></Link>
      </div>
    </div>
  </div>
);

export default CareersPage;
