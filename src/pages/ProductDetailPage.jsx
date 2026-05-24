import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, ArrowLeft, ChevronRight } from 'lucide-react';
import { productsData } from '../data/siteData';
import './DetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = productsData.find(p => p.id === productId);
  const [activeScreen, setActiveScreen] = useState(0);

  if (!product) return <Navigate to="/products" replace />;
  const otherProducts = productsData.filter(p => p.id !== productId);
  const statusColor = { Live: '#00d4aa', Beta: '#4f8ef7', 'Coming Soon': '#f6c90e' };

  return (
    <div className="detail-page">
      <div className="detail-hero">
        <img src={product.heroImage} alt={product.name} className="detail-hero-img" />
        <div className="detail-hero-overlay" />
        <div className="container detail-hero-content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/products" className="back-link"><ArrowLeft size={16} /> Back to Products</Link>
            <div style={{ display: 'flex', gap: '0.75rem', margin: '1.25rem 0', flexWrap: 'wrap' }}>
              <div className="section-tag" style={{ color: product.color, background: `${product.color}20`, borderColor: `${product.color}30` }}>{product.tag}</div>
              <span className="chip" style={{ fontSize: '0.75rem', color: statusColor[product.status], background: `${statusColor[product.status]}15`, borderColor: 'transparent' }}>{product.status}</span>
            </div>
            <h1 className="detail-title">{product.name}</h1>
            <p className="detail-tagline">{product.tagline}</p>
          </motion.div>
        </div>
      </div>

      <div className="detail-stats-bar">
        <div className="container detail-stats-inner">
          {product.stats.map((s, i) => (
            <div key={i} className="detail-stat">
              <span className="stat-number" style={{ color: product.color }}>{s.val}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="container detail-body">
        <div className="detail-overview-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="section-tag" style={{ marginBottom: '1rem' }}>Product Overview</div>
            <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>
              What is <span className="gradient-text">{product.name}</span>?
            </h2>
            <p className="detail-overview-text">{product.overview}</p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary" style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}bb)` }}>
                {product.status === 'Coming Soon' ? 'Join the Waitlist' : 'Start Free Trial'} <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-outline">Book a Demo</Link>
            </div>
          </motion.div>

          <motion.div className="detail-gallery" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src={product.screenshots[activeScreen]} alt="Screenshot" className="gallery-main" />
            <div className="gallery-thumbs">
              {product.screenshots.map((img, i) => (
                <img key={i} src={img} alt={`Screen ${i + 1}`} className={`gallery-thumb ${activeScreen === i ? 'active' : ''}`} onClick={() => setActiveScreen(i)} />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="detail-features-section">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag" style={{ margin: '0 auto 1rem' }}>Key Features</div>
            <h2 className="section-title">Everything You <span className="gradient-text">Need</span></h2>
          </div>
          <div className="detail-features-grid">
            {product.features.map((f, i) => (
              <motion.div key={i} className="detail-feature-card card"
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="feature-check" style={{ background: `${product.color}18`, color: product.color }}><CheckCircle size={20} /></div>
                <div><h3 className="feature-title">{f.title}</h3><p className="feature-desc">{f.desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="pricing-section">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag" style={{ margin: '0 auto 1rem' }}>Pricing</div>
            <h2 className="section-title">Simple, <span className="gradient-text">Transparent</span> Pricing</h2>
          </div>
          <div className="pricing-grid">
            {product.pricing.map((tier, i) => {
              const isFeatured = product.pricing.length === 3 && i === 1;
              return (
                <motion.div key={i} className={`pricing-card card ${isFeatured ? 'pricing-card-featured' : ''}`}
                  style={isFeatured ? { borderColor: product.color, background: `${product.color}08` } : {}}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  {isFeatured && <div className="pricing-popular" style={{ background: product.color }}>Most Popular</div>}
                  <h3 className="pricing-plan">{tier.plan}</h3>
                  <div className="pricing-price" style={{ color: product.color }}>{tier.price}</div>
                  <ul className="pricing-features">
                    {tier.features.map((f, j) => (
                      <li key={j}><CheckCircle size={15} style={{ color: product.color, flexShrink: 0 }} /> {f}</li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn"
                    style={isFeatured
                      ? { background: `linear-gradient(135deg, ${product.color}, ${product.color}bb)`, color: '#fff', width: '100%', justifyContent: 'center' }
                      : { background: 'transparent', border: '1px solid var(--border-hover)', width: '100%', justifyContent: 'center', color: 'var(--text)' }}>
                    {tier.price === 'Custom' ? 'Contact Sales' : 'Get Started'} <ArrowRight size={15} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div className="detail-cta-banner"
          style={{ background: `linear-gradient(135deg, ${product.color}15, ${product.color}05)`, borderColor: `${product.color}25` }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div>
            <h3 className="detail-cta-title">Ready to try {product.name}?</h3>
            <p className="detail-cta-sub">Join thousands of teams already saving time and money.</p>
          </div>
          <div className="detail-cta-actions">
            <Link to="/contact" className="btn btn-primary">{product.status === 'Coming Soon' ? 'Join Waitlist' : 'Start Free Trial'} <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn btn-outline">Book a Demo</Link>
          </div>
        </motion.div>

        {otherProducts.length > 0 && (
          <div className="related-section">
            <h3 className="related-title">Explore Other Products</h3>
            <div className="related-grid">
              {otherProducts.map((p, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/products/${p.id}`} className="related-card card">
                    <h4 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, marginBottom: '0.3rem' }}>{p.name}</h4>
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{p.tag}</p>
                    <span style={{ color: p.color, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 4 }}>Learn more <ChevronRight size={14} /></span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
