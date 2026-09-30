import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Download, Send, Check, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../ui/Icons';
import confetti from 'canvas-confetti';
import SpatialGlassCard from '../ui/SpatialGlassCard';
import SectionAsterisk from '../ui/SectionAsterisk';
import ItalicFlipWord from '../ui/ItalicFlipWord';

// Subtle Translucent Leopard Print Watermark Overlay (Covers whole box area edge-to-edge)
function LeopardPrintOverlay({ isDark, opacity }) {
  const baseOpacity = opacity ?? (isDark ? 0.12 : 0.10);
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        backgroundImage: 'url(/leopard_texture.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: baseOpacity,
        mixBlendMode: isDark ? 'screen' : 'multiply',
        filter: isDark ? 'contrast(1.22) brightness(1.02)' : 'contrast(1.28) brightness(0.96)',
        pointerEvents: 'none',
        zIndex: 1,
        transition: 'opacity 0.3s ease',
      }}
    />
  );
}

export default function ContactSection({ theme = 'dark' }) {
  const isDark = theme === 'dark';
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Trigger celebratory confetti burst
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#AF8260', '#E4C59E', '#803D3B', '#FFE7E7'],
    });

    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('manyaintelinfo.18@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Almond Honey + Caramel Earth Palettes for Studio Mode
  const cardBg = isDark
    ? 'linear-gradient(155deg, rgba(26, 14, 22, 0.92) 0%, rgba(18, 9, 15, 0.96) 100%)'
    : 'linear-gradient(150deg, #FDF8F2 0%, #F6EBDD 50%, #EAD4BE 100%)';

  const cardBorder = isDark
    ? '1px solid rgba(180, 123, 132, 0.28)'
    : '1.5px solid rgba(175, 130, 96, 0.45)';

  const cardBoxShadow = isDark
    ? '0 16px 36px rgba(0, 0, 0, 0.5)'
    : '0 16px 36px rgba(175, 130, 96, 0.16), 0 0 25px -4px rgba(228, 197, 158, 0.45)';

  const textColor = isDark ? '#ffffff' : '#322C2B';
  const labelColor = isDark ? 'var(--text-tertiary)' : '#803D3B';
  const subtitleColor = isDark ? 'var(--text-tertiary)' : '#AF8260';
  const inputBg = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.65)';
  const inputBorder = isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1.5px solid rgba(175, 130, 96, 0.42)';

  return (
    <section id="contact">
      <div className="section-container">
        {/* Header with Asterisk Emblem & Editorial Ligature Font */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.9rem' }}>
            <SectionAsterisk size={42} theme={theme} />
            <div className="section-tag" style={{ margin: 0 }}>
              Direct Transmission
            </div>
          </div>
          <h2 className="section-title">
            INITIATE <ItalicFlipWord text="Collaboration" />
          </h2>
          <p className="section-desc">
            Open to backend engineering, full stack development, and AI application internships and full time roles. Let's discuss technical architecture or potential collaborations.
          </p>
        </div>

        <div className="contact-grid-layout">
          {/* Quick Connect Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Copyable Email Card */}
            <SpatialGlassCard
              bgOverlay={<LeopardPrintOverlay isDark={isDark} />}
              style={{
                padding: 'clamp(1rem, 3vw, 1.4rem) clamp(0.85rem, 3vw, 1.6rem)',
                position: 'relative',
                overflow: 'hidden',
                background: cardBg,
                border: cardBorder,
                boxShadow: cardBoxShadow,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: isDark ? 'rgba(197, 153, 182, 0.12)' : 'rgba(175, 130, 96, 0.16)',
                      border: isDark ? '1px solid rgba(197, 153, 182, 0.25)' : '1px solid rgba(175, 130, 96, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isDark ? '#C599B6' : '#803D3B',
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-m)', color: subtitleColor, textTransform: 'uppercase' }}>
                      Primary Email
                    </div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 600, color: textColor }}>
                      manyaintelinfo.18@gmail.com
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  style={{
                    background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(228, 197, 158, 0.35)',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(175, 130, 96, 0.35)',
                    borderRadius: '10px',
                    padding: '0.5rem',
                    color: copiedEmail ? '#10b981' : (isDark ? 'var(--text-secondary)' : '#803D3B'),
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-m)',
                    transition: 'all 0.2s',
                  }}
                  title="Copy email address"
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </SpatialGlassCard>

            {/* Social Channels */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: '0.85rem' }}>
              <a
                href="https://github.com/Manya22Kes"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <SpatialGlassCard
                  bgOverlay={<LeopardPrintOverlay isDark={isDark} />}
                  style={{
                    padding: 'clamp(0.9rem, 2.5vw, 1.2rem)',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    background: cardBg,
                    border: cardBorder,
                    boxShadow: cardBoxShadow,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative', zIndex: 2 }}>
                    <GithubIcon size={18} color={isDark ? '#C599B6' : '#803D3B'} />
                    <div>
                      <div style={{ fontSize: '0.7rem', color: subtitleColor, fontFamily: 'var(--font-m)' }}>GITHUB</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: textColor }}>@Manya22Kes</div>
                    </div>
                  </div>
                </SpatialGlassCard>
              </a>

              <a
                href="https://www.linkedin.com/in/manya-keserwani-2b8686357"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <SpatialGlassCard
                  bgOverlay={<LeopardPrintOverlay isDark={isDark} />}
                  style={{
                    padding: 'clamp(0.9rem, 2.5vw, 1.2rem)',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    background: cardBg,
                    border: cardBorder,
                    boxShadow: cardBoxShadow,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative', zIndex: 2 }}>
                    <LinkedinIcon size={18} color={isDark ? '#D4A36A' : '#AF8260'} />
                    <div>
                      <div style={{ fontSize: '0.7rem', color: subtitleColor, fontFamily: 'var(--font-m)' }}>LINKEDIN</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: textColor }}>Manya Keserwani</div>
                    </div>
                  </div>
                </SpatialGlassCard>
              </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))', gap: '0.85rem' }}>
              <a
                href="https://leetcode.com/u/Manya_Keserwani/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <SpatialGlassCard
                  bgOverlay={<LeopardPrintOverlay isDark={isDark} />}
                  style={{
                    padding: 'clamp(0.9rem, 2.5vw, 1.2rem)',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    background: cardBg,
                    border: cardBorder,
                    boxShadow: cardBoxShadow,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative', zIndex: 2 }}>
                    <LeetCodeIcon size={18} color={isDark ? '#C4684A' : '#AF8260'} />
                    <div>
                      <div style={{ fontSize: '0.7rem', color: subtitleColor, fontFamily: 'var(--font-m)' }}>LEETCODE</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: textColor }}>200+ Solved</div>
                    </div>
                  </div>
                </SpatialGlassCard>
              </a>

              <a
                href="/assets/Manya_Keserwani_Resume.pdf"
                download="Manya_Keserwani_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <SpatialGlassCard
                  bgOverlay={<LeopardPrintOverlay isDark={isDark} />}
                  style={{
                    padding: 'clamp(0.9rem, 2.5vw, 1.2rem)',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    background: cardBg,
                    border: cardBorder,
                    boxShadow: cardBoxShadow,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative', zIndex: 2 }}>
                    <Download size={18} color={isDark ? '#E4C59E' : '#803D3B'} />
                    <div>
                      <div style={{ fontSize: '0.7rem', color: subtitleColor, fontFamily: 'var(--font-m)' }}>OFFICIAL RESUME</div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 600, color: textColor }}>Download PDF</div>
                    </div>
                  </div>
                </SpatialGlassCard>
              </a>
            </div>
          </div>

          {/* Contact Transmission Form with Almond Honey + Caramel Colors in Creme Mode */}
          <SpatialGlassCard
            bgOverlay={<LeopardPrintOverlay isDark={isDark} opacity={isDark ? 0.13 : 0.11} />}
            style={{
              padding: 'clamp(1.2rem, 3.5vw, 2.2rem)',
              position: 'relative',
              overflow: 'hidden',
              background: cardBg,
              border: cardBorder,
              boxShadow: cardBoxShadow,
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', position: 'relative', zIndex: 2 }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-m)', color: labelColor, textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: inputBg,
                    border: inputBorder,
                    borderRadius: '12px',
                    color: textColor,
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = isDark ? 'var(--rose-taupe)' : '#AF8260')}
                  onBlur={(e) => (e.target.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(175, 130, 96, 0.38)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-m)', color: labelColor, textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: inputBg,
                    border: inputBorder,
                    borderRadius: '12px',
                    color: textColor,
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = isDark ? 'var(--rose-taupe)' : '#AF8260')}
                  onBlur={(e) => (e.target.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(175, 130, 96, 0.38)')}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-m)', color: labelColor, textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Your message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem',
                    background: inputBg,
                    border: inputBorder,
                    borderRadius: '12px',
                    color: textColor,
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = isDark ? 'var(--rose-taupe)' : '#AF8260')}
                  onBlur={(e) => (e.target.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(175, 130, 96, 0.38)')}
                />
              </div>

              <button
                type="submit"
                className="contact-submit-btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.92rem 1.8rem',
                  fontSize: '0.95rem',
                  marginTop: '0.6rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-b)',
                }}
              >
                {submitted ? (
                  <>
                    <Check size={16} />
                    <span>Transmission Received!</span>
                  </>
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          </SpatialGlassCard>
        </div>

      </div>
    </section>
  );
}
