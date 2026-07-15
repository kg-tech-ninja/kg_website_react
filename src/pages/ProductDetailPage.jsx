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
  const statusColor = { 'In Development': '#4f8ef7', 'Coming Soon': '#6d5ef6' };

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

      <div className="container detail-body">
        <div className="detail-overview-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="section-tag" style={{ marginBottom: '1rem' }}>Product Overview</div>
            <h2 className="section-title" style={{ fontSize: '2rem', marginBottom: '1.25rem' }}>
              What is <span className="gradient-text">{product.name}</span>?
            </h2>
            <p className="detail-overview-text">{product.overview}</p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-wavy">
                <span>Join the Waitlist</span> <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn-outline"><span>Talk to Us</span></Link>
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

        <motion.div className="detail-cta-banner"
          style={{ background: `linear-gradient(135deg, ${product.color}15, ${product.color}05)`, borderColor: `${product.color}25` }}
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div>
            <h3 className="detail-cta-title">Want early access to {product.name}?</h3>
            <p className="detail-cta-sub">Join the waitlist and we'll keep you posted — early users help shape what we build.</p>
          </div>
          <div className="detail-cta-actions">
            <Link to="/contact" className="btn-wavy"><span>Join the Waitlist</span> <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn btn-outline"><span>Talk to Us</span></Link>
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
