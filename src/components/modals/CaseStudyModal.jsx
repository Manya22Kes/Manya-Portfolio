import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, ShieldAlert, Cpu, Terminal } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import SpatialGlassCard from '../ui/SpatialGlassCard';
import ProjectTelemetryPreview from '../ui/ProjectTelemetryPreview';
import ProjectImageSlider from '../ui/ProjectImageSlider';

export default function CaseStudyModal({ project, onClose }) {
  const [activeView, setActiveView] = useState('architecture');

  useEffect(() => {
    setActiveView('architecture');
  }, [project?.id]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Stop Lenis smoothly while modal is open
    if (window.__lenis) {
      window.__lenis.stop();
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      if (window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        onWheel={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(0.5rem, 2.5vw, 1.5rem)',
        }}
      >
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(6, 3, 5, 0.88)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
          }}
        />

        {/* Modal Window with Pointer Scroll Isolation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
          className="modal-scroll-container"
          style={{
            position: 'relative',
            zIndex: 10,
            width: '100%',
            maxWidth: '860px',
            maxHeight: 'min(90dvh, 880px)',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            touchAction: 'pan-y',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <SpatialGlassCard
            enableTilt={false}
            style={{
              padding: 'clamp(1.15rem, 3.5vw, 2.5rem)',
              background: 'linear-gradient(155deg, rgba(28, 14, 25, 0.95) 0%, rgba(14, 7, 13, 0.97) 100%)',
              borderColor: 'rgba(180, 123, 132, 0.4)',
              boxShadow: '0 30px 90px -20px rgba(0, 0, 0, 0.85), 0 0 40px rgba(148, 78, 99, 0.25)',
              position: 'relative',
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 'clamp(0.75rem, 2.5vw, 1.5rem)',
                right: 'clamp(0.75rem, 2.5vw, 1.5rem)',
                width: '40px',
                height: '40px',
                minWidth: '40px',
                minHeight: '40px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s',
                zIndex: 20,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div style={{ marginBottom: '1.25rem', paddingRight: '2.5rem' }}>
              <span className="badge-pill" style={{ marginBottom: '0.75rem' }}>
                {project.badge}
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-d)',
                  fontSize: 'clamp(1.5rem, 5vw, 2.8rem)',
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  marginBottom: '0.4rem',
                  lineHeight: 1.15,
                }}
              >
                {project.title}
              </h2>
              <p style={{ fontFamily: 'var(--font-m)', color: 'var(--rose-taupe)', fontSize: 'clamp(0.82rem, 2vw, 0.92rem)' }}>
                {project.tagline}
              </p>
            </div>

            {/* Live Actions */}
            <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.8rem' }}>
                  <span>Launch Live Product</span>
                  <ExternalLink size={14} />
                </a>
              ) : (
                <span className="badge-pill" style={{ padding: '0.5rem 0.9rem', fontSize: '0.75rem', background: 'rgba(255,231,231,0.06)', color: 'var(--text-tertiary)' }}>
                  Edge / Local ML Engine (Undeployed)
                </span>
              )}
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '0.5rem 1.1rem', fontSize: '0.8rem' }}>
                <GithubIcon size={14} />
                <span>View Source Code</span>
              </a>
            </div>

            {/* Media & Live Architecture Interactive Viewport */}
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.85rem',
                  flexWrap: 'wrap',
                  gap: '0.65rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-m)',
                    color: 'var(--rose-taupe)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontWeight: 600,
                  }}
                >
                  <Terminal size={14} color="var(--wine)" />
                  <span>
                    {activeView === 'architecture'
                      ? 'Live System Architecture & Telemetry'
                      : 'Production UI Interface Preview'}
                  </span>
                </div>

                {/* View Switcher Pill */}
                <div
                  style={{
                    display: 'inline-flex',
                    background: 'rgba(255, 231, 231, 0.06)',
                    borderRadius: '999px',
                    padding: '3px',
                    border: '1px solid rgba(180, 123, 132, 0.28)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveView('architecture')}
                    style={{
                      padding: '0.32rem 0.85rem',
                      borderRadius: '999px',
                      border: 'none',
                      background: activeView === 'architecture' ? 'var(--wine)' : 'transparent',
                      color: activeView === 'architecture' ? '#ffe7e7' : 'var(--text-secondary)',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-m)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      transition: 'all 0.2s ease',
                      boxShadow: activeView === 'architecture' ? '0 2px 10px rgba(148, 78, 99, 0.45)' : 'none',
                    }}
                  >
                    <span>⚡ Live Architecture</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveView('image')}
                    style={{
                      padding: '0.32rem 0.85rem',
                      borderRadius: '999px',
                      border: 'none',
                      background: activeView === 'image' ? 'var(--wine)' : 'transparent',
                      color: activeView === 'image' ? '#ffe7e7' : 'var(--text-secondary)',
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-m)',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: activeView === 'image' ? '0 2px 10px rgba(148, 78, 99, 0.45)' : 'none',
                    }}
                  >
                    <span>📸 Screenshots</span>
                  </button>
                </div>
              </div>

              {/* Viewport Screen */}
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(180, 123, 132, 0.32)',
                  aspectRatio: '16/10',
                  minHeight: 'clamp(200px, 45vw, 280px)',
                  width: '100%',
                  boxSizing: 'border-box',
                  background: '#0a0609',
                  position: 'relative',
                  boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.8), 0 10px 30px rgba(0, 0, 0, 0.5)',
                }}
              >
                {activeView === 'architecture' ? (
                  <ProjectTelemetryPreview projectId={project.id} />
                ) : (
                  <ProjectImageSlider
                    images={project.images || (project.image ? [project.image] : [])}
                    title={project.title}
                  />
                )}
              </div>
            </div>

            {/* Architectural Deep Dive */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div>
                <h4 style={{ fontSize: '0.82rem', fontFamily: 'var(--font-m)', color: 'var(--rose-taupe)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.65rem' }}>
                  System Overview &amp; Problem Statement
                </h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: 'clamp(0.85rem, 2vw, 0.92rem)' }}>
                  {project.description} In production environments, standard approaches either sacrifice throughput or produce opaque black-box recommendations. {project.title} was engineered from ground-up with explainable decision scoring and modular middleware components.
                </p>
              </div>

              {/* Highlights Breakdown */}
              <div>
                <h4 style={{ fontSize: '0.82rem', fontFamily: 'var(--font-m)', color: 'var(--blush-sand)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.65rem' }}>
                  Key Engineering Innovations
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {project.highlights.map((hl) => (
                    <div
                      key={hl.label}
                      style={{
                        padding: 'clamp(0.75rem, 2.5vw, 1rem)',
                        background: 'rgba(255, 231, 231, 0.03)',
                        border: '1px solid rgba(180, 123, 132, 0.18)',
                        borderRadius: '12px',
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'flex-start',
                      }}
                    >
                      <CheckCircle2 size={18} color="var(--wine)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong style={{ color: '#fff', fontSize: '0.88rem', display: 'block', marginBottom: '2px' }}>
                          {hl.label}
                        </strong>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.55 }}>
                          {hl.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Applied */}
              <div>
                <h4 style={{ fontSize: '0.82rem', fontFamily: 'var(--font-m)', color: 'var(--rose-taupe)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.65rem' }}>
                  Stack &amp; Ecosystem
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="badge-pill"
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SpatialGlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
