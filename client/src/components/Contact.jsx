import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiSend, FiMessageSquare, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaGlobe } from 'react-icons/fa6';
import Reveal from './Reveal';
import { slideInLeft, slideInRight } from '../animations/variants';
import api from '../api/axios';
import { formatExternalUrl } from '../utils/url';

export default function Contact({ data = {} }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const getSocialIcon = (platform = '') => {
    const p = platform.toLowerCase();
    if (p.includes('git')) return <FaGithub size={16} />;
    if (p.includes('link')) return <FaLinkedin size={16} />;
    if (p.includes('twit') || p.includes('x')) return <FaTwitter size={16} />;
    if (p.includes('insta')) return <FaInstagram size={16} />;
    return <FaGlobe size={16} />;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      await api.post('/messages', form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 bg-grid-pattern">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent2 text-xs font-mono mb-3">
              <FiMessageSquare size={13} />
              <span>GET IN TOUCH</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="gradient-text">{data.heading || "Let's Connect"}</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto mt-3">
              Have a project in mind, an opportunity, or just want to say hi? Drop me a message below.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Direct Info & Photo */}
          <div className="md:col-span-5">
            <Reveal variants={slideInLeft}>
              {data.image ? (
                <div className="glass-card rounded-2xl overflow-hidden p-2 group border border-white/10 shadow-2xl mb-8">
                  <div className="rounded-xl overflow-hidden max-h-[340px]">
                    <img
                      src={data.image}
                      alt="Contact"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              ) : null}

              <div className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 shadow-xl space-y-5">
                <h3 className="font-display font-bold text-xl text-white">Contact Information</h3>

                {data.email && (
                  <a
                    href={`mailto:${data.email}`}
                    className="flex items-center gap-3.5 text-slate-300 hover:text-cyan-300 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent2 group-hover:scale-110 transition-transform">
                      <FiMail size={18} />
                    </div>
                    <span className="text-sm font-medium">{data.email}</span>
                  </a>
                )}

                {data.phone && (
                  <a
                    href={`tel:${data.phone}`}
                    className="flex items-center gap-3.5 text-slate-300 hover:text-cyan-300 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent2 group-hover:scale-110 transition-transform">
                      <FiPhone size={18} />
                    </div>
                    <span className="text-sm font-medium">{data.phone}</span>
                  </a>
                )}

                {data.socials?.filter(s => {
                  const p = (s.platform || '').toLowerCase();
                  return !p.includes('twit') && !p.includes('x') && !p.includes('git');
                }).length > 0 && (
                  <div className="pt-4 border-t border-white/[0.06]">
                    <p className="text-xs uppercase tracking-wider font-mono text-slate-400 mb-3">Connect on Socials</p>
                    <div className="flex flex-wrap gap-2.5">
                      {data.socials
                        .filter(s => {
                          const p = (s.platform || '').toLowerCase();
                          return !p.includes('twit') && !p.includes('x') && !p.includes('git');
                        })
                        .map((s, i) => (
                          <a
                            key={i}
                            href={formatExternalUrl(s.url)}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-2 rounded-xl glass flex items-center gap-2 text-xs text-slate-300 hover:text-white hover:border-accent/40 hover:bg-accent/10 transition-all"
                          >
                            {getSocialIcon(s.platform)}
                            <span>{s.platform}</span>
                          </a>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Direct Messaging Form */}
          <div className="md:col-span-7">
            <Reveal variants={slideInRight}>
              <form onSubmit={submit} className="glass-card rounded-2xl p-7 sm:p-9 border border-white/10 shadow-2xl flex flex-col gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Your Name
                  </label>
                  <input
                    required
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-surface/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Your Email
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-surface/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell me about your project, idea, or questions..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-surface/80 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'sending'}
                  className="mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-accent to-accent2 text-black font-bold text-sm shadow-glow-sm hover:shadow-glow-md disabled:opacity-60 flex items-center justify-center gap-2 transition-all"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Sending message...
                    </>
                  ) : status === 'sent' ? (
                    <>
                      <FiCheckCircle size={16} /> Message Delivered!
                    </>
                  ) : (
                    <>
                      <FiSend size={16} /> Send Direct Message
                    </>
                  )}
                </motion.button>

                {status === 'sent' && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2"
                  >
                    <FiCheckCircle size={15} /> Thank you! Your message has been saved to the dashboard inbox.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2"
                  >
                    <FiAlertCircle size={15} /> Failed to deliver message. Please check the backend connection.
                  </motion.div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
