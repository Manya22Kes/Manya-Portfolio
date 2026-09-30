import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from '../ui/Icons';
import BrandAvatar from '../ui/BrandAvatar';

// Configuration for hover reveal backgrounds with bold, high-contrast gradients
const FOOTER_BG_ITEMS = {
  avatar: {
    id: 'avatar',
    title: 'Manya Keserwani / AI & Full Stack Architecture',
    // When you have an image, set path e.g.: image: '/assets/footer/avatar-bg.jpg',
    image: null,
    gradient:
      'radial-gradient(circle at 25% 45%, #FF007A 0%, #7928CA 38%, #00F0FF 75%, #070014 100%)',
  },
  github: {
    id: 'github',
    title: 'GitHub / Autonomous Agents & Flagship Repos',
    image: null,
    gradient:
      'radial-gradient(circle at 65% 45%, #05FFA1 0%, #00C8FF 40%, #003882 75%, #020614 100%)',
  },
  linkedin: {
    id: 'linkedin',
    title: 'LinkedIn / Professional Engineering Network',
    image: null,
    gradient:
      'radial-gradient(circle at 72% 50%, #00F5D4 0%, #0066FF 42%, #5B00FF 75%, #03001C 100%)',
  },
  leetcode: {
    id: 'leetcode',
    title: 'LeetCode / Algorithmic Problem Solving & Data Structures',
    image: null,
    gradient:
      'radial-gradient(circle at 80% 50%, #FFDF00 0%, #FF5A00 42%, #FF0055 78%, #1F000A 100%)',
  },
};

export default function Footer({ theme = 'dark' }) {
  const isDark = theme === 'dark';
  const [activeKey, setActiveKey] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch devices to skip the effect
  useEffect(() => {
    const checkTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none) or (pointer: coarse)').matches
      );
    };
    setIsTouchDevice(checkTouch());
  }, []);

  // Preload any defined images to avoid flash on first hover
  useEffect(() => {
    Object.values(FOOTER_BG_ITEMS).forEach((item) => {
      if (item.image) {
        const img = new Image();
        img.src = item.image;
      }
    });
  }, []);

  const handleTriggerHover = (key) => {
    if (isTouchDevice) return;
    setActiveKey(key);
  };

  const handleTriggerLeave = () => {
    if (isTouchDevice) return;
    setActiveKey(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nameColor = isDark ? '#ffffff' : '#2D121F';
  const subtitleColor = isDark ? 'var(--text-tertiary)' : '#803D3B';
  const bottomTextColor = isDark ? 'var(--text-tertiary)' : 'rgba(128, 61, 59, 0.65)';
  const activeItem = activeKey ? FOOTER_BG_ITEMS[activeKey] : null;

  return (
    <footer
      style={{
        borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(175, 130, 96, 0.25)',
        background: isDark
          ? 'rgba(11, 7, 8, 0.92)'
          : 'linear-gradient(180deg, rgba(255, 231, 231, 0.65) 0%, rgba(245, 232, 216, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        padding: '3rem 0 2rem',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden', // Ensures background image is strictly clipped to the footer
        transition: 'background 0.35s ease, border-color 0.35s ease',
      }}
    >
      {/* Background Hover Reveal Layer with Cross-Fade */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              pointerEvents: 'none',
              overflow: 'hidden',
            }}
          >
            {activeItem.image ? (
              <img
                src={activeItem.image}
                alt={activeItem.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: activeItem.gradient,
                }}
              />
            )}

            {/* Dark readability scrim overlay so text & buttons stay 100% readable */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: isDark
                  ? 'linear-gradient(180deg, rgba(11, 7, 8, 0.45) 0%, rgba(11, 7, 8, 0.78) 100%)'
                  : 'linear-gradient(180deg, rgba(20, 10, 16, 0.35) 0%, rgba(20, 10, 16, 0.68) 100%)',
                pointerEvents: 'none',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="footer-main-row">
          {/* Brand & Status with BrandAvatar inside Precision Octagonal Chamfer Node */}
          <div className="footer-brand-wrap">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.4rem' }}>
              <div
                className="nav-node-brand nav-hex-brand hex-chamfer-oct"
                onMouseEnter={() => handleTriggerHover('avatar')}
                onMouseLeave={handleTriggerLeave}
                onFocus={() => handleTriggerHover('avatar')}
                onBlur={handleTriggerLeave}
                tabIndex={0}
                style={{
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                  cursor: 'pointer',
                }}
                aria-label="Manya Keserwani Brand Avatar"
              >
                <BrandAvatar size={30} theme={theme} />
              </div>
              <span
                onMouseEnter={() => handleTriggerHover('avatar')}
                onMouseLeave={handleTriggerLeave}
                style={{
                  fontFamily: 'var(--font-d)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: nameColor,
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                Manya Keserwani
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: subtitleColor, fontFamily: 'var(--font-m)' }}>
              AI &amp; ML Engineer · Prayagraj, India
            </div>
          </div>

          {/* Social Links & Scroll Top */}
          <div className="footer-links-wrap">
            <a
              href="https://github.com/Manya22Kes"
              target="_blank"
              rel="noopener noreferrer"
              className="badge-pill footer-link-pill"
              onMouseEnter={() => handleTriggerHover('github')}
              onMouseLeave={handleTriggerLeave}
              onFocus={() => handleTriggerHover('github')}
              onBlur={handleTriggerLeave}
              style={{ fontSize: '0.78rem', gap: '0.45rem', textDecoration: 'none', padding: '0.42rem 0.95rem' }}
            >
              <GithubIcon size={14} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/manya-keserwani-2b8686357"
              target="_blank"
              rel="noopener noreferrer"
              className="badge-pill footer-link-pill"
              onMouseEnter={() => handleTriggerHover('linkedin')}
              onMouseLeave={handleTriggerLeave}
              onFocus={() => handleTriggerHover('linkedin')}
              onBlur={handleTriggerLeave}
              style={{ fontSize: '0.78rem', gap: '0.45rem', textDecoration: 'none', padding: '0.42rem 0.95rem' }}
            >
              <LinkedinIcon size={14} />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://leetcode.com/u/Manya_Keserwani/"
              target="_blank"
              rel="noopener noreferrer"
              className="badge-pill footer-link-pill"
              onMouseEnter={() => handleTriggerHover('leetcode')}
              onMouseLeave={handleTriggerLeave}
              onFocus={() => handleTriggerHover('leetcode')}
              onBlur={handleTriggerLeave}
              style={{ fontSize: '0.78rem', gap: '0.45rem', textDecoration: 'none', padding: '0.42rem 0.95rem' }}
            >
              <LeetCodeIcon size={14} />
              <span>LeetCode</span>
            </a>

            <button
              onClick={scrollToTop}
              className="film-reel-nav-btn hex-chamfer-oct"
              style={{ width: '38px', height: '38px' }}
              title="Return to top"
              aria-label="Return to top"
            >
              <ArrowUp size={15} />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="footer-bottom-row"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '1.5rem',
            borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.04)' : '1px solid rgba(175, 130, 96, 0.15)',
            fontSize: '0.75rem',
            color: bottomTextColor,
            fontFamily: 'var(--font-m)',
          }}
        >
          <div>© {new Date().getFullYear()} Manya Keserwani. All rights reserved.</div>
          <div>Built with React, Three.js, GSAP &amp; Spatial Glassmorphism.</div>
        </div>
      </div>
    </footer>
  );
}

