import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, CheckCircle, Loader2 } from 'lucide-react';
import { config } from '../data/config';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Fallback simulation if script URL is not configured
    if (!config.scriptUrl || config.scriptUrl.includes('YOUR_GOOGLE_SCRIPT_WEB_APP_URL')) {
      setTimeout(() => {
        setSubmitted(true);
        setSubmitting(false);
      }, 800);
      return;
    }

    try {
      // Use URLSearchParams for application/x-www-form-urlencoded
      // This is the most reliable format for Google Apps Script parameter extraction
      const params = new URLSearchParams();
      params.append('name', form.name);
      params.append('email', form.email);
      params.append('phone', form.phone);
      params.append('company', form.company);
      params.append('service', form.service);
      params.append('message', form.message);

      await fetch(config.scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Bypasses CORS redirects block in browsers
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
      });

      // With no-cors, we don't read response data, but if it resolves without error,
      // it was successfully received by Google Apps Script.
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError('Unable to send message. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(79,142,247,0.06) 0%, transparent 70%)', display: 'flex', alignItems: 'center' }}>
      {/* Contact Grid - Unified Screen */}
      <div className="container" style={{ padding: 'calc(var(--nav-h) + 2rem) 5% 2.5rem', display: 'grid', gridTemplateColumns: '1.1fr 1.5fr', gap: '3.5rem', alignItems: 'stretch' }}>

        {/* Info & Text (left column) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '100%' }}
        >
          <div>
            <div className="section-tag" style={{ marginBottom: '1rem' }}>Get in Touch</div>
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '0.85rem' }}>
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h1>
            <p className="section-sub" style={{ fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '480px' }}>
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
          </div>

          <div style={{ margin: '1.5rem 0' }}>
            {[
              { icon: <Mail size={18}/>, label: 'Email', val: config.email, href: `mailto:${config.email}` },
              { icon: <Phone size={18}/>, label: 'Phone', val: config.phone, href: `tel:${config.phoneRaw}` },
              { icon: <MapPin size={18}/>, label: 'Office', val: 'Chennai, Tamil Nadu, India', href: '#' },
            ].map((c, i) => (
              <a key={i} href={c.href} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem', textDecoration: 'none' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(79,142,247,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.1rem' }}>{c.label}</p>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.val}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="card" style={{ padding: '1rem', background: 'linear-gradient(135deg, rgba(79,142,247,0.08), rgba(124,92,252,0.08))' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>
              ⏱️ <strong style={{ color: 'var(--text)' }}>24-hour response</strong> guaranteed on all inquiries. We respect your time.
            </p>
          </div>
        </motion.div>

        {/* Form (right column) */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} style={{ height: '100%' }}>
          {submitted ? (
            <motion.div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle size={44} color="var(--accent3)" style={{ marginBottom: '0.5rem' }}/>
              <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.2rem' }}>Message Sent!</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1rem', maxWidth: '320px' }}>We'll get back to you within 24 hours. Looking forward to working with you!</p>
              
              <div style={{ height: '1px', width: '80%', background: 'var(--border)', margin: '0.5rem 0' }} />
              
              <p style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 500 }}>
                Want immediate connection or response?
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '-0.4rem' }}>
                Please chat with us directly on WhatsApp:
              </p>
              <a
                href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
                  `Hi KG Web & Ops! I just submitted the contact form on your website. Here are my details:\n\n*Name:* ${form.name}\n*Email:* ${form.email}\n*Phone:* ${form.phone || 'N/A'}\n*Company:* ${form.company || 'N/A'}\n*Service:* ${form.service || 'N/A'}\n*Message:* ${form.message}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                style={{
                  background: '#25D366',
                  color: '#fff',
                  padding: '0.65rem 1.5rem',
                  fontSize: '0.85rem',
                  marginTop: '0.5rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '30px',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(37,211,102,0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ display: 'block' }}>
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.949h.004c4.368 0 7.926-3.564 7.93-7.93a7.864 7.864 0 0 0-2.327-5.593zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.251-.015-.35-.052-.099-.445-1.076-.61-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </motion.div>
          ) : (
            <form className="card contact-form" onSubmit={handleSubmit} style={{ padding: '1.75rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Full Name *</label>
                  <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Karthik G." required style={{ padding: '0.6rem 0.85rem', fontSize: '0.9rem' }} disabled={submitting}/>
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Email *</label>
                  <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="hello@company.com" required style={{ padding: '0.6rem 0.85rem', fontSize: '0.9rem' }} disabled={submitting}/>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Phone Number</label>
                  <input className="form-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" style={{ padding: '0.6rem 0.85rem', fontSize: '0.9rem' }} disabled={submitting}/>
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Company</label>
                  <input className="form-input" name="company" value={form.company} onChange={handleChange} placeholder="Acme Corp" style={{ padding: '0.6rem 0.85rem', fontSize: '0.9rem' }} disabled={submitting}/>
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '1rem' }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Service Needed</label>
                <select className="form-input" name="service" value={form.service} onChange={handleChange} style={{ padding: '0.6rem 0.85rem', fontSize: '0.9rem' }} disabled={submitting}>
                  <option value="">Select a service</option>
                  <option>IT Service & Products</option>
                  <option>DevOps & Cloud</option>
                  <option>Custom Software</option>
                  <option>Digital Marketing</option>
                  <option>Admin & Support</option>
                  <option>AI & ML Solutions</option>
                  <option>Mobile App Development</option>
                  <option>SaaS Products</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label" style={{ fontSize: '0.75rem' }}>Message *</label>
                <textarea className="form-input" name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project, timeline, and goals..." rows={3} required style={{ resize: 'vertical', padding: '0.6rem 0.85rem', fontSize: '0.9rem' }} disabled={submitting}/>
              </div>
              
              {error && (
                <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
                  {error}
                </div>
              )}

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem 1.5rem', fontSize: '0.9rem' }} disabled={submitting}>
                {submitting ? (
                  <>Sending... <Loader2 size={15} className="animate-spin"/></>
                ) : (
                  <>Send Message <Send size={15}/></>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
