import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Minimize2, Maximize2, Loader } from 'lucide-react';
import './Chatbot.css';
import { config } from '../data/config';

// ── Placeholder responses (replace with real AI API call later) ──────────────
const botResponses = {
  greeting: ["Hi there! 👋 I'm KG Assistant. How can I help you today?", "Welcome to KG Web & Ops! I'm here to help. What can I do for you?"],
  services: ["We offer IT Services, DevOps, Digital Marketing, Custom Software, Mobile Development, AI/ML Services, and Admin Support. Which one interests you? 🚀"],
  pricing: ["Our pricing is flexible and project-based. The best way to get an accurate quote is to book a free consultation. Want me to connect you?"],
  contact: [`You can reach us at ${config.email} or call ${config.phone}. Or simply click 'Talk to us' in the top navigation! 📞`],
  devops: ["Our DevOps team specializes in CI/CD pipelines, Kubernetes, AWS/Azure/GCP, Terraform, and full observability stacks. Want to learn more?"],
  ai: ["We build LLM integrations, computer vision systems, NLP chatbots, and MLOps pipelines. Our AI team can automate the most complex workflows! 🤖"],
  default: ["Great question! Let me connect you with our team for a detailed answer. Would you like to book a free consultation?", "I'd love to help with that. Our experts can give you the best guidance. Shall I set up a call?"],
};

const getResponse = (msg) => {
  const m = msg.toLowerCase();
  if (m.match(/hi|hello|hey|good/)) return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
  if (m.match(/service|offer|provide|what do you/)) return botResponses.services[0];
  if (m.match(/price|cost|pricing|quote|budget/)) return botResponses.pricing[0];
  if (m.match(/contact|email|phone|call|reach/)) return botResponses.contact[0];
  if (m.match(/devops|deploy|pipeline|kubernetes|docker|cloud/)) return botResponses.devops[0];
  if (m.match(/ai|ml|machine learning|artificial|chatbot|nlp/)) return botResponses.ai[0];
  return botResponses.default[Math.floor(Math.random() * botResponses.default.length)];
};

const quickReplies = [
  '💼 View Services',
  '💰 Get a Quote',
  '📞 Contact Us',
  '🤖 AI & ML Solutions',
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [minimised, setMinimised] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: "Hi! I'm KG Assistant 🤖 How can I help you today?", time: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const windowRef = useRef(null);

  // Close (shrink back to the bubble) when clicking outside the chat window
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (windowRef.current && !windowRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (open && !minimised) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open, minimised]);

  // Increment unread when closed
  useEffect(() => {
    if (!open) {
      const last = messages[messages.length - 1];
      if (last?.from === 'bot' && messages.length > 1) {
        setUnread(u => u + 1);
      }
    }
  }, [messages]);

  const handleOpen = () => {
    setOpen(true);
    setMinimised(false);
    setUnread(0);
  };

  const send = async (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');

    const userMsg = { id: Date.now(), from: 'user', text: msg, time: new Date() };
    
    // We update state and capture the exact array to build history synchronously
    let updatedMsgs = [];
    setMessages(prev => {
      updatedMsgs = [...prev, userMsg];
      return updatedMsgs;
    });
    setTyping(true);

    if (config.geminiApiKey) {
      try {
        // Ensure conversation history starts with a 'user' message as required by Gemini
        const firstUserIndex = updatedMsgs.findIndex(m => m.from === 'user');
        const apiHistory = (firstUserIndex !== -1 ? updatedMsgs.slice(firstUserIndex) : updatedMsgs)
          .map(m => ({
            role: m.from === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }));

        const systemInstructionText = 
          "You are KG Assistant, an extremely polite, warm, helpful, and professional customer support representative for KG Web & Ops. " +
          "Your main goal is to welcome visitors, describe our services and products with utmost courtesy and respect, and help them get in touch with our team. " +
          "Guidelines:\n" +
          "1. Tone: Speak very politely and respectfully. Use warm greetings, thank users for their questions, use phrases like 'It is my absolute pleasure to assist you,' 'Certainly, let me help you with that,' and maintain an elite, premium corporate service standard. Avoid sounding robotic.\n" +
          `2. Contact Info: Direct users to our official email (${config.email}) or phone (${config.phone}). Let them know they can click 'Talk to us' or visit our contact page (/contact).\n` +
          "3. Our Services:\n" +
          "  - IT Service & Products: Network setup, enterprise security, hardware licensing, SLA helpdesk support, disaster recovery, active directory, ServiceNow.\n" +
          "  - DevOps & Cloud: CI/CD automated pipelines (GitHub Actions, GitLab), Docker, Kubernetes cluster orchestration, multi-cloud (AWS, Azure, GCP), Terraform (Infrastructure as Code), observability with Prometheus/Grafana.\n" +
          "  - Custom Software: Web & desktop applications built using React, Next.js, Node.js, Python, Java Spring, PostgreSQL, MongoDB, Redis.\n" +
          "  - Website Design & Development: Pixel-perfect, WCAG accessible, conversion-optimized sites using Laravel, Django, Zend, React, SQLite, Elasticsearch.\n" +
          "  - AI & ML Services: LLM Integration (GPT, Gemini), Computer Vision (object detection, OCR), Predictive Analytics, MLOps, RAG chatbot development.\n" +
          "  - Digital Marketing: SEO, SEMrush, Paid Ads (Google, Meta, LinkedIn), HubSpot CRM automation, Email marketing, Brand Identity.\n" +
          "  - Admin & Support: 24/7 client helpdesk, SLA tracking, virtual remote admin staff, Freshdesk/Zendesk integration.\n" +
          "4. Our Products (all in development — invite interested visitors to join the waitlist via the contact page; do NOT quote prices or claim they are already live):\n" +
          "  - KG Flow: A no-code workflow automation platform with a visual drag-and-drop builder. Status: In Development.\n" +
          "  - KG Shield: A unified cybersecurity and zero-trust suite for threat monitoring and compliance. Status: In Development.\n" +
          "  - KG Insight: An AI-powered business intelligence platform with natural-language data queries. Status: Coming Soon.\n" +
          "5. Boundaries: Keep responses helpful but concise (bullet points are encouraged). Never invent facts, clients, case studies, prices, or metrics. We are a new studio — be honest and warm about that. Represent the brand as a skilled, dependable engineering partner.";

        const modelName = config.geminiModel || 'gemini-2.5-flash';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${config.geminiApiKey}`;

        const payload = {
          contents: apiHistory,
          systemInstruction: {
            parts: [{ text: systemInstructionText }]
          }
        };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`Gemini API returned status ${response.status}`);
        }

        const data = await response.json();
        const botReplyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (botReplyText) {
          setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: botReplyText, time: new Date() }]);
          setTyping(false);
          return;
        } else {
          throw new Error("Invalid reply format received from Gemini API");
        }
      } catch (err) {
        console.error("Gemini API call failed, using rule-based response:", err);
      }
    }

    // Rule-based fallback if API key is not set or API call throws an error
    setTimeout(() => {
      const reply = getResponse(msg);
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: reply, time: new Date() }]);
      setTyping(false);
    }, 600 + Math.random() * 500);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const fmt = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* Floating trigger */}
      <AnimatePresence>
        {!open && (
          <motion.button
            className="chat-trigger"
            onClick={handleOpen}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open chat"
          >
            <MessageSquare size={24} />
            {unread > 0 && (
              <motion.span className="unread-badge" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                {unread}
              </motion.span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={windowRef}
            className={`chat-window ${minimised ? 'minimised' : ''}`}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-header-left">
                <div className="bot-avatar">
                  <Bot size={18} />
                  <span className="online-dot" />
                </div>
                <div>
                  <h4 className="chat-bot-name">KG Assistant</h4>
                  <p className="chat-bot-status">🟢 Online — Usually replies instantly</p>
                </div>
              </div>
              <div className="chat-header-actions">
                <button onClick={() => setMinimised(m => !m)} className="chat-ctrl-btn" aria-label="Minimise">
                  {minimised ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button onClick={() => setOpen(false)} className="chat-ctrl-btn" aria-label="Close">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Body (hidden when minimised) */}
            {!minimised && (
              <>
                <div className="chat-body">
                  {/* Date stamp */}
                  <div className="chat-date-stamp">Today</div>

                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      className={`chat-msg-row ${m.from}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {m.from === 'bot' && (
                        <div className="msg-avatar bot-msg-avatar">
                          <Bot size={13} />
                        </div>
                      )}
                      <div className="chat-bubble-wrap">
                        <div className={`chat-bubble ${m.from}`}>{m.text}</div>
                        <span className="msg-time">{fmt(m.time)}</span>
                      </div>
                      {m.from === 'user' && (
                        <div className="msg-avatar user-msg-avatar">
                          <User size={13} />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  <AnimatePresence>
                    {typing && (
                      <motion.div
                        className="chat-msg-row bot"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="msg-avatar bot-msg-avatar"><Bot size={13} /></div>
                        <div className="chat-bubble bot typing-bubble">
                          <span /><span /><span />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={bottomRef} />
                </div>

                {/* Quick Replies */}
                <div className="quick-replies">
                  {quickReplies.map((q, i) => (
                    <button key={i} className="quick-reply-btn" onClick={() => send(q)}>
                      {q}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className="chat-input-row">
                  <textarea
                    className="chat-input"
                    placeholder="Type a message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    rows={1}
                  />
                  <button
                    className={`chat-send-btn ${input.trim() ? 'active' : ''}`}
                    onClick={() => send()}
                    disabled={!input.trim()}
                    aria-label="Send"
                  >
                    <Send size={16} />
                  </button>
                </div>

                <p className="chat-footer-note">Powered by KG Web & Ops AI · <a href="/contact">Talk to a human →</a></p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
