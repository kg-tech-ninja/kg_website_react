import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, ArrowLeft, ChevronRight } from 'lucide-react';
import { servicesData } from '../data/siteData';
import './DetailPage.css';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const service = servicesData.find(s => s.id === serviceId);
  const [activeImg, setActiveImg] = useState(0);

  if (!service) return <Navigate to="/services" replace />;

  const otherServices = servicesData.filter(s => s.id !== serviceId).slice(0, 3);

  return (
    <div className="detail-page">
      {/* Hero */}
      <div className="detail-hero" style={{ '--hero-color': service.color }}>
        <img src={service.heroImage} alt={service.title} className="detail-hero-img" />
        <div className="detail-hero-overlay" />
        <div className="container detail-hero-content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/services" className="back-link">
              <ArrowLeft size={16} /> Back to Services
            </Link>
            <div className="section-tag" style={{ color: service.color, background: `${service.color}20`, borderColor: `${service.color}30`, margin: '1.25rem 0' }}>
              {service.sub}
            </div>
            <h1 className="detail-title">{service.title}</h1>
            <p className="detail-tagline">{service.tagline}</p>
          </motion.div>
        </div>
      </div>

      {/* Overview + Gallery */}
      <div className="container detail-body">
        <div className="detail-overview-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="section-tag" style={{ marginBottom: '1rem' }}>Overview</div>
            <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>
              Why Choose <span className="gradient-text">KG Web & Ops</span> for {service.title}?
            </h2>
            <p className="detail-overview-text">{service.overview}</p>
            <Link to="/contact" className="btn-wavy" style={{ marginTop: '2rem' }}>
              <span>Get a Free Consultation</span> <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Gallery */}
          <motion.div className="detail-gallery" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src={service.gallery[activeImg]} alt="Service" className="gallery-main" />
            <div className="gallery-thumbs">
              {service.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className={`gallery-thumb ${activeImg === i ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="detail-features-section">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag" style={{ margin: '0 auto 1rem' }}>What's Included</div>
            <h2 className="section-title">Full Service <span className="gradient-text">Breakdown</span></h2>
          </div>
          <div className="detail-features-grid">
            {service.features.map((f, i) => (
              <motion.div
                key={i}
                className="detail-feature-card card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="feature-check" style={{ background: `${service.color}18`, color: service.color }}>
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* CTA Banner */}
        <motion.div
          className="detail-cta-banner"
          style={{ background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)`, borderColor: `${service.color}25` }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h3 className="detail-cta-title">Ready to get started with {service.title}?</h3>
            <p className="detail-cta-sub">Let's talk about how we can tailor this service for your specific needs and goals.</p>
          </div>
          <div className="detail-cta-actions">
            <Link to="/contact" className="btn-wavy"><span>Start a Project</span> <ArrowRight size={16} /></Link>
            <Link to="/services" className="btn btn-outline"><span>Explore All Services</span></Link>
          </div>
        </motion.div>

        {/* Related Services */}
        <div className="related-section">
          <h3 className="related-title">Explore Other Services</h3>
          <div className="related-grid">
            {otherServices.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={`/services/${s.id}`} className="related-card card">
                  <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, marginBottom: '0.3rem' }}>{s.title}</h4>
                  <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{s.sub}</p>
                  <span style={{ color: s.color, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                    Learn more <ChevronRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
