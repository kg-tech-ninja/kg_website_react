import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
import { config } from '../data/config';
import './ContactPage.css';

/* ── Floating label input ── */
const FloatInput = ({ label, name, type = 'text', value, onChange, required, disabled, as = 'input', rows, children, list }) => {
  const [focused, setFocused] = useState(false);
  const active = focused || value;
  const Tag = as;

  return (
    <div className={`cf-field${active ? ' cf-field--active' : ''}${focused ? ' cf-field--focus' : ''}`}>
      <label className="cf-label">{label}{required && ' *'}</label>
      <Tag
        className="cf-input"
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        disabled={disabled}
        rows={rows}
        list={list}
      >
        {children}
      </Tag>
      <span className="cf-line" />
    </div>
  );
};

const ContactPage = () => {
  const [submitted,  setSubmitted]  = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState(null);
  const [form, setForm] = useState({
    firstName: '', lastName: '', countryCode: '+91', phone: '', email: '', message: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const fullName  = `${form.firstName} ${form.lastName}`.trim();
    const fullPhone = `${form.countryCode} ${form.phone}`.trim();

    if (!config.scriptUrl || config.scriptUrl.includes('YOUR_GOOGLE_SCRIPT_WEB_APP_URL')) {
      setTimeout(() => { setSubmitted(true); setSubmitting(false); }, 800);
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append('name',    fullName);
      params.append('email',   form.email);
      params.append('phone',   fullPhone);
      params.append('message', form.message);

      await fetch(config.scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Unable to send. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const waLink = submitted
    ? `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(
        `Hi KG Web & Ops! I just submitted a contact form.\n\n*Name:* ${form.firstName} ${form.lastName}\n*Email:* ${form.email}\n*Phone:* ${form.countryCode} ${form.phone}\n*Message:* ${form.message}`
      )}`
    : '#';

  return (
    <div className="contact-page">
      {/* dot-grid + orbiting glow — pure CSS, no canvas */}
      <div className="contact-glow" aria-hidden="true" />

      <div className="contact-inner">
        <AnimatePresence mode="wait">
          {submitted ? (
            /* ── Success state ── */
            <motion.div
              key="success"
              className="contact-success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle size={54} color="var(--accent3)" />
              <h2 className="cs-title">Message Sent!</h2>
              <p className="cs-sub">We'll get back to you within 24 hours.</p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="cs-wa"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.949h.004c4.368 0 7.926-3.564 7.93-7.93a7.864 7.864 0 0 0-2.327-5.593zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.251-.015-.35-.052-.099-.445-1.076-.61-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </motion.div>
          ) : (
            /* ── Form ── */
            <motion.div
              key="form"
              className="contact-form-wrap"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="cf-eyebrow">Striking a chord?</p>
              <h1 className="cf-heading">
                Let's work <span className="cf-accent">together</span>
              </h1>

              <form className="cf-form" onSubmit={handleSubmit} noValidate>
                {/* Row 1: First + Last */}
                <div className="cf-row">
                  <FloatInput label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required disabled={submitting} />
                  <FloatInput label="Last Name"  name="lastName"  value={form.lastName}  onChange={handleChange} disabled={submitting} />
                </div>

                {/* Row 2: Code + Phone */}
                <div className="cf-row--phone">
                  <FloatInput label="Code" name="countryCode" value={form.countryCode} onChange={handleChange} list="codes" disabled={submitting} />
                  <datalist id="codes">
                    <option value="+91" /><option value="+1" /><option value="+44" /><option value="+61" /><option value="+971" /><option value="+65" /><option value="+60" />
                    <option value="+81" /><option value="+49" /><option value="+33" /><option value="+86" /><option value="+27" /><option value="+39" /><option value="+34" />
                  </datalist>
                  <FloatInput label="Phone No." name="phone" type="tel" value={form.phone} onChange={handleChange} disabled={submitting} />
                </div>

                {/* Row 3: Email */}
                <FloatInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} required disabled={submitting} />

                {/* Row 4: Message */}
                <FloatInput
                  label="How can we help?"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  disabled={submitting}
                  as="textarea"
                  rows={4}
                />

                {error && <p className="cf-error">{error}</p>}

                {/* Submit */}
                <div className="cf-submit-wrap">
                  <button type="submit" className="btn-wavy cf-submit" disabled={submitting}>
                    {submitting ? (
                      <><Loader2 size={16} className="animate-spin" /> <span>Sending…</span></>
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactPage;
