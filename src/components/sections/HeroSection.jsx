import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Download, Sparkles, Terminal, Shield, Eye, Bot, Cpu } from 'lucide-react';

export default function HeroSection({ theme = 'dark', siteRevealed = true }) {
  const heroRef = useRef(null);
  const tiltContainerRef = useRef(null);

  // 3D Perspective Tilt state driven by cursor X position (-8deg to 8deg)
  const [tiltAngle, setTiltAngle] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTiltDisabled, setIsTiltDisabled] = useState(false);

  // Disable on touch devices and respect prefers-reduced-motion
  useEffect(() => {
    const checkDisabled = () => {
      const isTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(hover: none) or (pointer: coarse)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return isTouch || prefersReducedMotion;
    };

    setIsTiltDisabled(checkDisabled());

    const mqlMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqlHover = window.matchMedia('(hover: none)');
    const handleChange = () => setIsTiltDisabled(checkDisabled());

    mqlMotion.addEventListener?.('change', handleChange);
    mqlHover.addEventListener?.('change', handleChange);

    return () => {
      mqlMotion.removeEventListener?.('change', handleChange);
      mqlHover.removeEventListener?.('change', handleChange);
    };
  }, []);

  const handleTiltMouseMove = (e) => {
    if (isTiltDisabled || !tiltContainerRef.current) return;
    const rect = tiltContainerRef.current.getBoundingClientRect();
    if (rect.width === 0) return;
    const cursorX = e.clientX - rect.left;
    const normalized = (cursorX / rect.width) * 2 - 1; // -1 at left edge, +1 at right edge
    const clamped = Math.max(-1, Math.min(1, normalized));
    // Left edge (clamped = -1) tilts heading so left side leans towards viewer (+8deg)
    // Right edge (clamped = +1) tilts heading so right side leans towards viewer (-8deg)
    const angle = -clamped * 8;
    setTiltAngle(Number(angle.toFixed(2)));
    setIsHovering(true);
  };

  const handleTiltMouseLeave = () => {
    if (isTiltDisabled) return;
    setIsHovering(false);
    setTiltAngle(0);
  };

  // Scroll-linked continuous smooth transformation (matching reference interaction)
  // As the user scrolls down, the monumental name and subline smoothly shrink and glide up;
  // as the user scrolls up, it returns to original size with smooth scroll.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Monumental Name: scales down from 1 to 0.72 and glides upward smoothly
  const nameScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.72]);
  const nameY = useTransform(scrollYProgress, [0, 0.65], [0, -85]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);

  // Subline & Capability Chips: scales down from 1 to 0.84 and glides upward
  const sublineScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.84]);
  const sublineY = useTransform(scrollYProgress, [0, 0.65], [0, -55]);

  // Status console at top: glides upward
  const statusY = useTransform(scrollYProgress, [0, 0.45], [0, -35]);
  const statusOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0.55]);

  // Action Buttons & Metrics pill (sub items): smoothly shrinks and glides upward on scroll
  const actionsScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.86]);
  const actionsY = useTransform(scrollYProgress, [0, 0.65], [0, -50]);
  const actionsOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.4]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero-section-root"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        paddingTop: 'clamp(5.25rem, 11vh, 8.5rem)',
        paddingBottom: 'clamp(2rem, 5vh, 3.5rem)',
        overflow: 'hidden',
      }}
    >
      <div
        className="section-container"
        style={{
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Bespoke Architectural Engineering Telemetry Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={siteRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            alignSelf: 'center',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            y: statusY,
            opacity: statusOpacity,
            transformOrigin: 'center top',
          }}
        >
          <div className="hero-status-console">
            <div className="status-console-header">
              <span className="status-dot-radar" />
              <span className="status-console-tag" style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                SYS_STATUS // ACTIVE
              </span>
              <span className="status-console-separator" style={{ opacity: 0.35 }}>·</span>
              <span className="status-console-avail" style={{ color: 'var(--wine)', fontWeight: 600 }}>
                OPEN TO ROLES · 2026 INTERNSHIPS &amp; FULL-TIME ROLES
              </span>
              <span className="status-console-coords">
                25.4358° N, 81.8463° E
              </span>
            </div>
            <div className="status-sub-academic">
              B.Tech Artificial Intelligence &amp; Machine Learning
            </div>
          </div>
        </motion.div>

        {/* Grand Unified Architectural Typography with Scroll-Linked Shrink */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={siteRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.58, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
          style={{
            scale: nameScale,
            y: nameY,
            opacity: nameOpacity,
            transformOrigin: 'center center',
            width: '100%',
          }}
        >
          {/* 3D Perspective Tilt Container (perspective: 1200px) */}
          <div
            ref={tiltContainerRef}
            onMouseMove={handleTiltMouseMove}
            onMouseLeave={handleTiltMouseLeave}
            style={{
              perspective: '1200px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <h1
              className="hero-monumental-name"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
                transform: `rotateY(${tiltAngle}deg)`,
                transition: isHovering
                  ? 'transform 120ms cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                willChange: isHovering ? 'transform' : 'auto',
              }}
            >
              <span>
                M<span className="hero-fun-char">a</span>N<span className="hero-fun-char">y</span>A
              </span>
              <span style={{ letterSpacing: '-0.025em' }}>
                K<span className="hero-fun-char">e</span>S<span className="hero-fun-char">e</span>RW<span className="hero-fun-char">a</span>N<span className="hero-fun-char">i</span>
              </span>
            </h1>
          </div>
        </motion.div>

        {/* Balanced Engineering Subline & Capability Chips with Scroll-Linked Shrink */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={siteRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.58, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          style={{
            scale: sublineScale,
            y: sublineY,
            transformOrigin: 'center top',
          }}
        >
          <div className="hero-subline-container">
            <div className="hero-engineering-role">
              AI &amp; ML SOFTWARE ENGINEER <span style={{ opacity: 0.35, margin: '0 0.3rem' }}>/</span> FULL STACK SYSTEMS ARCHITECT
            </div>

            <p className="hero-editorial-desc">
              Engineering <strong>intelligent real-time ML microservices</strong>, autonomous developer agents, and high-throughput backend infrastructure with mathematically verified precision.
            </p>

            {/* Kinetic Capability Chips */}
            <div className="hero-capability-chips">
              <span className="capability-chip">[ 01 · COMPUTER VISION &amp; YOLOV8 ]</span>
              <span className="capability-chip">[ 02 · AUTONOMOUS AGENTS &amp; PGVECTOR ]</span>
              <span className="capability-chip">[ 03 · DISTRIBUTED QUEUES &amp; REDIS ]</span>
              <span className="capability-chip">[ 04 · REAL-TIME WEBSOCKETS ]</span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons & Quick Telemetry Metrics - Harmoniously Centered & Scroll-Transformed */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={siteRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.58, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="hero-actions-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            marginBottom: '3.5rem',
            scale: actionsScale,
            y: actionsY,
            opacity: actionsOpacity,
            transformOrigin: 'center top',
          }}
        >
          <a href="#projects" className="btn-primary hero-btn-main">
            <span>Explore Flagship Work</span>
            <ArrowDown size={15} />
          </a>
          <a
            href="/assets/Manya_Keserwani_Resume.pdf"
            download="Manya_Keserwani_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary hero-btn-sub"
          >
            <Download size={15} />
            <span>Download Resume</span>
          </a>

          <div
            className="hero-metrics-pill hex-chamfer-pill"
          >
            <div className="hero-metric-item">
              <div className="hero-metric-val">
                200+
              </div>
              <div className="hero-metric-lbl">
                LeetCode &amp; GFG Solved
              </div>
            </div>
            <div className="hero-metric-divider" />
            <div className="hero-metric-item">
              <div className="hero-metric-val">
                91.44%
              </div>
              <div className="hero-metric-lbl">
                YOLOv8 Test Precision
              </div>
            </div>
            <div className="hero-metric-divider" />
            <div className="hero-metric-item">
              <div className="hero-metric-val">
                5+ Production
              </div>
              <div className="hero-metric-lbl">
                AI &amp; Backend Systems
              </div>
            </div>
          </div>
        </motion.div>

        {/* Minimalist Editorial Scroll Cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={siteRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="hero-scroll-cue-row"
        >
          <div className="hero-scroll-cue-left">
            <span
              className="hero-scroll-cue-dot"
            />
            <span
              className="hero-scroll-cue-text"
            >
              SCROLL TO EXPLORE ARCHITECTURE &amp; SYSTEMS
            </span>
          </div>

          <a
            href="#projects"
            className="hero-scroll-cue-link"
          >
            <span>DISCOVER WORK</span>
            <ArrowDown size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
