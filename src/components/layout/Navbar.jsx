import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Send, Menu, X, Sun, Moon, Download, Volume2, VolumeX } from 'lucide-react';
import BrandAvatar from '../ui/BrandAvatar';
import { isAudioMuted, setAudioMuted, playAsmrKeyboardClick } from '../../utils/soundEffects';

const NAV_LINKS = [
  { num: '01', label: 'Projects', href: '#projects' },
  { num: '02', label: 'Skills', href: '#skills' },
  { num: '03', label: 'Approach', href: '#approach' },
  { num: '04', label: 'Experience', href: '#experience' },
  { num: '05', label: 'Labs', href: '#labs' },
  { num: '06', label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme = 'dark', onToggleTheme, siteRevealed = true }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [muted, setMuted] = useState(() => isAudioMuted());

  const handleToggleSound = () => {
    const next = !muted;
    setMuted(next);
    setAudioMuted(next);
    if (!next) {
      setTimeout(() => {
        playAsmrKeyboardClick('spacebar');
      }, 50);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['projects', 'skills', 'approach', 'experience', 'labs', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 'clamp(0.65rem, 2vh, 1.25rem)',
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          padding: '0 clamp(0.65rem, 2.5vw, 1.25rem)',
        }}
      >
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={siteRevealed ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="nav-dock-container"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            maxWidth: '100%',
          }}
        >
          {/* Node 1: Standalone Precision Octagonal MK Brand Node with Corner Crosshair Accents */}
          <a
            href="#"
            aria-label="Return to top"
            className="nav-node-brand nav-hex-brand"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            {/* Top-left & bottom-right micro corner markers */}
            <span
              style={{
                position: 'absolute',
                top: '3px',
                left: '6px',
                fontSize: '0.55rem',
                color: isDark ? 'rgba(255, 231, 231, 0.45)' : 'rgba(148, 78, 99, 0.45)',
                fontFamily: 'var(--font-m)',
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              +
            </span>
            <span
              style={{
                position: 'absolute',
                bottom: '3px',
                right: '6px',
                fontSize: '0.55rem',
                color: isDark ? 'rgba(255, 231, 231, 0.45)' : 'rgba(148, 78, 99, 0.45)',
                fontFamily: 'var(--font-m)',
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              +
            </span>
            <BrandAvatar size={34} theme={theme} />
          </a>

          {/* Node 2: Floating Precision Chamfered Center Navigation Deck */}
          <nav
            className="nav-node-links nav-hex-deck"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
              padding: '0.38rem 0.65rem',
              position: 'relative',
            }}
          >
            {/* Corner Crosshair Micro-Vertices */}
            <span
              style={{
                position: 'absolute',
                top: '2px',
                left: '6px',
                fontSize: '0.55rem',
                color: isDark ? 'rgba(255, 231, 231, 0.4)' : 'rgba(148, 78, 99, 0.4)',
                fontFamily: 'var(--font-m)',
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              +
            </span>
            <span
              style={{
                position: 'absolute',
                bottom: '2px',
                right: '6px',
                fontSize: '0.55rem',
                color: isDark ? 'rgba(255, 231, 231, 0.4)' : 'rgba(148, 78, 99, 0.4)',
                fontFamily: 'var(--font-m)',
                lineHeight: 1,
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              +
            </span>

            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-hex-link"
                  style={{
                    position: 'relative',
                    padding: '0.45rem 0.85rem',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-m)',
                    letterSpacing: '0.04em',
                    color: isActive
                      ? isDark
                        ? '#ffffff'
                        : 'var(--wine)'
                      : isDark
                      ? 'var(--blush-sand)'
                      : 'var(--text-secondary)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'color 0.2s ease',
                    textTransform: 'uppercase',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = isDark ? '#ffffff' : 'var(--wine)')
                  }
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = isDark
                        ? 'var(--blush-sand)'
                        : 'var(--text-secondary)';
                    }
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)',
                        background: isDark
                          ? 'radial-gradient(120% 120% at 50% 20%, rgba(210, 110, 135, 0.5) 0%, rgba(148, 78, 99, 0.65) 60%, rgba(63, 27, 42, 0.85) 100%)'
                          : 'radial-gradient(120% 120% at 50% 20%, rgba(255, 255, 255, 0.98) 0%, rgba(238, 205, 215, 0.85) 55%, rgba(215, 175, 185, 0.75) 100%)',
                        border: isDark
                          ? '1px solid rgba(255, 231, 231, 0.55)'
                          : '1px solid rgba(148, 78, 99, 0.4)',
                        boxShadow: isDark
                          ? 'inset 0 0 0 1px rgba(255, 231, 231, 0.4), inset 0 1.5px 2px rgba(255, 231, 231, 0.8), 0 4px 16px rgba(148, 78, 99, 0.45)'
                          : 'inset 0 0 0 1px rgba(255, 255, 255, 0.95), inset 0 1.5px 2px #ffffff, 0 4px 14px rgba(148, 78, 99, 0.2)',
                        zIndex: -1,
                      }}
                      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                    />
                  )}
                  <span style={{ opacity: 0.65, fontSize: '0.68rem' }}>{link.num}</span>
                  <span style={{ opacity: 0.45, fontSize: '0.62rem', color: isDark ? 'var(--rose-taupe)' : 'var(--wine)' }}>◆</span>
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Node 3: Floating Chamfered Action Console */}
          <div
            className="nav-node-actions nav-hex-actions"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.38rem 0.65rem',
            }}
          >
            {/* Dynamic One-Click Theme Switcher */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                title={`Switch to ${isDark ? 'Radiant Creme Mode' : 'Velvet Obsidian Dark Mode'}`}
                className="badge-pill nav-theme-toggle-btn"
                style={{
                  padding: '0.42rem 0.85rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                }}
              >
                {!isDark ? (
                  <>
                    <Sun size={13} style={{ color: '#d4af37' }} />
                    <span className="nav-theme-label">Creme</span>
                  </>
                ) : (
                  <>
                    <Moon size={13} style={{ color: '#caa6a6' }} />
                    <span className="nav-theme-label">Velvet</span>
                  </>
                )}
              </button>
            )}

            {/* Tactile Audio SFX Mute/Unmute Toggle */}
            <button
              type="button"
              onClick={handleToggleSound}
              title={muted ? 'Unmute Tactile SFX' : 'Mute Tactile SFX'}
              aria-label={muted ? 'Unmute Tactile SFX' : 'Mute Tactile SFX'}
              className="badge-pill nav-sound-toggle-btn"
              style={{
                padding: '0.42rem 0.65rem',
                fontSize: '0.78rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {muted ? (
                <VolumeX size={13} style={{ color: 'var(--text-tertiary)' }} />
              ) : (
                <Volume2 size={13} style={{ color: isDark ? 'var(--blush-sand)' : 'var(--wine)' }} />
              )}
            </button>

            <a
              href="/assets/Manya_Keserwani_Resume.pdf"
              download="Manya_Keserwani_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="badge-pill nav-resume-btn"
              style={{
                padding: '0.42rem 0.85rem',
                fontSize: '0.8rem',
              }}
            >
              <FileText size={13} />
              <span>Resume</span>
            </a>

            <a
              href="#contact"
              className="btn-primary nav-connect-btn"
              style={{
                padding: '0.42rem 1.05rem',
                fontSize: '0.8rem',
                gap: '0.4rem',
              }}
            >
              <span>Connect</span>
              <Send size={12} />
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="nav-mobile-toggle hex-chamfer-oct"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '0.35rem',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '5rem',
              left: '1.25rem',
              right: '1.25rem',
              background: isDark
                ? 'rgba(16, 9, 15, 0.96)'
                : 'rgba(255, 245, 245, 0.96)',
              backdropFilter: 'blur(30px)',
              border: isDark
                ? '1px solid rgba(180, 123, 132, 0.35)'
                : '1px solid rgba(148, 78, 99, 0.22)',
              clipPath: 'polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)',
              boxShadow: isDark
                ? 'inset 0 0 0 1px rgba(180, 123, 132, 0.35), 0 20px 60px rgba(0, 0, 0, 0.8)'
                : 'inset 0 0 0 1px rgba(148, 78, 99, 0.2), 0 20px 60px rgba(148, 78, 99, 0.15)',
              padding: '1.5rem',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-m)',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>{link.num}</span>
                <span style={{ opacity: 0.4, fontSize: '0.7rem', color: isDark ? 'var(--rose-taupe)' : 'var(--wine)' }}>◆</span>
                <span>{link.label}</span>
              </a>
            ))}

            {/* Mobile Drawer Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
              {/* Quick controls for Theme and Sound SFX */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {onToggleTheme && (
                  <button
                    onClick={() => {
                      onToggleTheme();
                    }}
                    className="badge-pill"
                    style={{
                      flex: 1,
                      padding: '0.55rem 0.75rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      cursor: 'pointer',
                      borderRadius: '8px',
                    }}
                  >
                    {!isDark ? (
                      <>
                        <Sun size={14} style={{ color: '#d4af37' }} />
                        <span>Creme</span>
                      </>
                    ) : (
                      <>
                        <Moon size={14} style={{ color: '#caa6a6' }} />
                        <span>Velvet</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleToggleSound}
                  className="badge-pill"
                  style={{
                    flex: 1,
                    padding: '0.55rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.45rem',
                    cursor: 'pointer',
                    borderRadius: '8px',
                  }}
                >
                  {muted ? (
                    <>
                      <VolumeX size={14} style={{ color: 'var(--text-tertiary)' }} />
                      <span>Sound: Off</span>
                    </>
                  ) : (
                    <>
                      <Volume2 size={14} style={{ color: isDark ? 'var(--blush-sand)' : 'var(--wine)' }} />
                      <span>Sound: On</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href="/assets/Manya_Keserwani_Resume.pdf"
                download="Manya_Keserwani_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  fontSize: '0.85rem',
                  width: '100%',
                  textDecoration: 'none',
                  borderRadius: '10px',
                }}
              >
                <Download size={14} />
                <span>Download Resume</span>
              </a>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1rem',
                  fontSize: '0.85rem',
                  width: '100%',
                  textDecoration: 'none',
                  borderRadius: '10px',
                }}
              >
                <span>Connect With Me</span>
                <Send size={13} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

