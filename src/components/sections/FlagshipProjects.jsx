import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Shield, BarChart3, Layers, ArrowUpRight, Eye, Bot, Terminal, Image as ImageIcon } from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import SpatialGlassCard from '../ui/SpatialGlassCard';
import ProjectTelemetryPreview from '../ui/ProjectTelemetryPreview';
import ProjectImageSlider from '../ui/ProjectImageSlider';
import SectionAsterisk from '../ui/SectionAsterisk';
import ItalicFlipWord from '../ui/ItalicFlipWord';
import { playCardSound, playAsmrKeyboardClick } from '../../utils/soundEffects';

const BASE_ASSET_URL = import.meta.env.BASE_URL || '/';
const getProjectImg = (name) => `${BASE_ASSET_URL}assets/images/${encodeURI(name)}`.replace(/\/\//g, '/');

export const FLAGSHIP_PROJECTS = [
  {
    id: 'vigilant',
    num: '01',
    title: 'VIGILANT',
    badge: 'Computer Vision & Real-Time ML',
    tagline: 'AI-Powered Real-Time Video Surveillance & Alert System',
    description:
      'Three-service distributed architecture (Python/FastAPI ML microservice, Node.js/Express backend, React/TypeScript frontend) deploying a custom-trained YOLOv8 model achieving 91.44% precision. Features a resolution-independent polygon zone editor and instantaneous WebSocket telemetry pushes.',
    images: [
      getProjectImg('vigilant 1.png'),
      getProjectImg('vigilant 2.png'),
      getProjectImg('vigilant 3.png'),
    ],
    image: getProjectImg('vigilant 1.png'),
    highlights: [
      { label: 'Model Precision', text: 'Custom YOLOv8 pipeline achieving 91.44% precision on held-out test data.' },
      { label: 'Zone Architecture', text: 'Resolution-independent zone editor using normalized vector coordinates.' },
      { label: 'Real-Time Streaming', text: 'Zero-polling sub-100ms alert propagation directly over WebSockets.' },
    ],
    stack: ['Python', 'FastAPI', 'YOLOv8', 'OpenCV', 'Node.js', 'Express', 'WebSockets', 'React', 'TypeScript'],
    liveUrl: null,
    githubUrl: 'https://github.com/Manya22Kes/VIGILANT--REAL-TIME-VIDEO-SURVEILLANCE-AND-ALERT-SYSTEM',
    metrics: { stat1: '91.44%', stat1Label: 'Test Precision', stat2: 'Real-Time', stat2Label: 'WebSocket Alerts' },
  },
  {
    id: 'repopilot',
    num: '02',
    title: 'REPOPILOT AI',
    badge: 'Autonomous Developer Tooling',
    tagline: 'AI-Powered GitHub Workflow & Issue Automation Agent',
    description:
      'Full-stack automation platform integrating GitHub Apps API to auto-triage issues, summarize pull requests, and detect duplicates via pgvector semantic search. Engineered with an asynchronous BullMQ + Redis job pipeline with idempotency guarantees and automatic Gemini model failover.',
    images: [
      getProjectImg('repo 1.png'),
      getProjectImg('repo 2.png'),
      getProjectImg('repo 3.png'),
    ],
    image: getProjectImg('repo 1.png'),
    highlights: [
      { label: 'Semantic Deduplication', text: 'Vector embeddings with pgvector replacing fragile keyword regex matching.' },
      { label: 'Resilient Queue', text: 'Decoupled webhook ingestion via BullMQ & Redis with dead-letter recovery.' },
      { label: 'DevOps & Testing', text: 'Containerized with Docker, deployed to Railway with 180+ Jest/Vitest automated tests.' },
    ],
    stack: ['Node.js', 'Express', 'BullMQ', 'Redis', 'PostgreSQL', 'pgvector', 'Gemini API', 'Docker', 'Railway'],
    liveUrl: 'https://repopilot-ai-production.up.railway.app',
    githubUrl: 'https://github.com/Manya22Kes/RepoPilot-AI',
    metrics: { stat1: '180+ Tests', stat1Label: 'CI/CD Automated Suite', stat2: 'pgvector', stat2Label: 'Semantic Search' },
  },
  {
    id: 'prism',
    num: '03',
    title: 'PRISM',
    badge: 'Multi-Modal AI & NLP Pipeline',
    tagline: 'AI-Powered Misinformation & Credibility Analyzer',
    description:
      'Multi-modal credibility platform ingesting 7 content formats (text, URLs, PDFs, DOCX, PPTX, images, audio). Uses Google Gemini API to extract claims and detect bias in real time, backed by a dual-layer OCR and speech-to-text pipeline (Cloud Vision, Tesseract.js, Cloud Speech-to-Text).',
    images: [
      getProjectImg('prism 1.png'),
      getProjectImg('prism 2.png'),
      getProjectImg('prism 3.png'),
    ],
    image: getProjectImg('prism 1.png'),
    highlights: [
      { label: '7-Format Ingestion', text: 'Scans text, URLs, PDFs, DOCX, PPTX, images, and audio files.' },
      { label: 'Dual-Layer OCR', text: 'Google Cloud Vision with automatic Tesseract.js fallback pipeline.' },
      { label: 'Infrastructure', text: 'Containerized via Docker Compose with Nginx reverse proxy and Three.js frontend.' },
    ],
    stack: ['React', 'Three.js', 'Node.js', 'Express', 'MongoDB', 'Gemini API', 'Google Cloud Vision', 'Docker'],
    liveUrl: 'https://prism-ai-powered-misinformation-cre.vercel.app',
    githubUrl: 'https://github.com/Manya22Kes/Prism---AI-Powered-Misinformation-Credibility-Analyzer',
    metrics: { stat1: '7 Formats', stat1Label: 'Multi-Modal Input', stat2: '< 2.1s', stat2Label: 'Inference Latency' },
  },
  {
    id: 'authify',
    num: '04',
    title: 'AUTHIFY',
    badge: 'Zero-Trust Security & Identity',
    tagline: 'Production-Grade Full Stack Authentication System',
    description:
      'Production-grade auth platform featuring automatic JWT refresh token rotation, Google OAuth 2.0, bcrypt hashing, email OTP verification, role-based access control, and silent Axios interceptor queuing across 8+ REST endpoints and 4 defensive middleware layers.',
    images: [
      getProjectImg('Authify 1.png'),
      getProjectImg('Authify 2.png'),
      getProjectImg('Authify 3.png'),
    ],
    image: getProjectImg('Authify 1.png'),
    highlights: [
      { label: 'Security', text: 'Zero-trust token lifecycle with HTTP-only cookies and bcrypt hashing.' },
      { label: 'Architecture', text: '8+ REST endpoints, 4 middleware layers, Axios silent refresh queuing.' },
      { label: 'RBAC Guards', text: 'Multi-role RBAC authorizing protected dashboards and profiles.' },
    ],
    stack: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'JWT Rotation', 'Google OAuth', 'Cloudinary'],
    liveUrl: 'https://authify-authentication-system.vercel.app/',
    githubUrl: 'https://github.com/Manya22Kes/Authify---Authentication-System',
    metrics: { stat1: '8+ Endpoints', stat1Label: 'Defensive Architecture', stat2: '100% Silent', stat2Label: 'Token Refresh' },
  },
  {
    id: 'xpense',
    num: '05',
    title: 'XPENSE',
    badge: 'Financial Analytics & Management',
    tagline: 'Personal Finance Analytics & Budget Tracker',
    description:
      'High-performance expense management web application with dark/light spatial themes, dynamic analytical charts, receipt asset uploads via Cloudinary, and conversational AI financial assistant.',
    images: [
      getProjectImg('xpense 1.png'),
      getProjectImg('xpense 2.png'),
      getProjectImg('xpense 3.png'),
    ],
    image: getProjectImg('xpense 1.png'),
    highlights: [
      { label: 'Analytics', text: 'Real-time expenditure charts categorized across custom budget limits.' },
      { label: 'Receipt Storage', text: 'Direct image upload pipelines integrated with Cloudinary CDN.' },
      { label: 'UX Design', text: 'Mobile-first fluid UI with instant balance recalculation.' },
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Cloudinary', 'Chart Analytics'],
    liveUrl: 'https://xpensemanager-one.vercel.app/',
    githubUrl: 'https://github.com/Manya22Kes/budget-tracker',
    metrics: { stat1: '₹50K+ Tracked', stat1Label: 'Simulated Volume', stat2: 'Sub-100ms', stat2Label: 'Analytics Rendering' },
  },
];

function FlagshipProjectCard({ proj, idx, onOpenModal, theme = 'dark' }) {
  const [showTelemetry, setShowTelemetry] = React.useState(false);
  const isReversed = idx % 2 === 1;
  const touchStartRef = React.useRef({ x: 0, y: 0, swiped: false });

  const handleTouchStart = (e) => {
    const t = e.touches && e.touches[0];
    if (t) {
      touchStartRef.current = { x: t.clientX, y: t.clientY, swiped: false };
    }
  };

  const handleTouchMove = (e) => {
    if (touchStartRef.current.swiped) return;
    const t = e.touches && e.touches[0];
    if (t) {
      const dist = Math.hypot(t.clientX - touchStartRef.current.x, t.clientY - touchStartRef.current.y);
      if (dist > 18) {
        touchStartRef.current.swiped = true;
        playCardSound();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="project-card-wrap"
      data-project-idx={idx}
      style={{
        top: `calc(75px + ${idx * 14}px)`,
        zIndex: idx + 10,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div
        className="project-card-inner"
        onClick={(e) => {
          if (!e.target.closest('a, button, input')) {
            playCardSound();
          }
        }}
      >
        <div className="project-card-grid">
          {/* Content Column */}
          <div className="project-card-content-col" style={{ order: isReversed ? 2 : 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
              <span className="project-card-num">
                {proj.num}
              </span>
              <span className="project-card-badge">
                {proj.badge}
              </span>
            </div>

            <h3 className="project-card-title">
              {proj.title}
            </h3>
            
            <p className="project-card-tagline">
              {proj.tagline}
            </p>

            <p className="project-card-desc">
              {proj.description}
            </p>

            {/* Technical Highlights Grid - Guaranteed Zero Overlap */}
            <div className="project-highlights-grid">
              {proj.highlights.map((hl) => (
                <div key={hl.label} className="project-highlight-row">
                  <span className="project-highlight-label">
                    {hl.label}:
                  </span>
                  <span className="project-highlight-text">
                    {hl.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Stack Pills */}
            <div className="project-stack-wrap">
              {proj.stack.map((t) => (
                <span key={t} className="project-stack-pill">
                  {t}
                </span>
              ))}
            </div>

            {/* Compact Mobile Telemetry Metrics (Replaces long preview on mobile) */}
            <div className="project-mobile-metrics-row">
              <div className="project-mobile-metric-item">
                <span className="project-mobile-metric-lbl">{proj.metrics.stat1Label}</span>
                <span className="project-mobile-metric-val">{proj.metrics.stat1}</span>
              </div>
              <div className="project-mobile-metric-divider" />
              <div className="project-mobile-metric-item" style={{ textAlign: 'right' }}>
                <span className="project-mobile-metric-lbl">{proj.metrics.stat2Label}</span>
                <span className="project-mobile-metric-val">{proj.metrics.stat2}</span>
              </div>
            </div>

            {/* Action Links */}
            <div className="project-actions-row">
              {proj.liveUrl ? (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn-primary"
                >
                  <span>Launch Live</span>
                  <ExternalLink size={13} />
                </a>
              ) : (
                <span className="project-btn-undeployed">
                  <span>Edge / Local ML Engine</span>
                </span>
              )}
              <a
                href={proj.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn-secondary"
              >
                <GithubIcon size={14} />
                <span>Code Repository</span>
              </a>
              <button
                onClick={() => {
                  playAsmrKeyboardClick('spacebar');
                  onOpenModal(proj);
                }}
                className="project-btn-study"
              >
                <span>Deep Dive Case Study</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>

          {/* Visual Showcase Column with Surprise Interactive Telemetry Toggle */}
          <div
            className="project-card-preview-col"
            style={{
              order: isReversed ? 1 : 2,
            }}
          >
            <div className="project-preview-wrap">
              {/* Top Bar with Interactive Mode Switch */}
              <div className="project-preview-topbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ff5f56' }} />
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#27c93f' }} />
                  </div>
                  <span className="project-preview-domain">
                    {proj.id}.manya.dev
                  </span>
                </div>

                {/* Interactive Mode Switch Button */}
                <button
                  type="button"
                  onClick={() => {
                    playAsmrKeyboardClick('default');
                    setShowTelemetry(!showTelemetry);
                  }}
                  style={{
                    background: showTelemetry ? 'var(--wine)' : 'rgba(148, 78, 99, 0.16)',
                    color: showTelemetry ? '#ffe7e7' : 'var(--text-primary)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: '999px',
                    padding: '0.2rem 0.65rem',
                    fontSize: '0.66rem',
                    fontFamily: 'var(--font-m)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {showTelemetry ? <ImageIcon size={11} /> : <Terminal size={11} />}
                  <span>{showTelemetry ? '🖼️ SCREENSHOTS' : '⚡ LIVE ARCHITECTURE'}</span>
                </button>
              </div>

              {/* View Area: Switchable between Image Slider and Interactive Telemetry */}
              <div style={{ aspectRatio: '16/10', overflow: 'hidden', position: 'relative' }}>
                {showTelemetry ? (
                  <ProjectTelemetryPreview projectId={proj.id} />
                ) : (
                  <ProjectImageSlider
                    images={proj.images}
                    title={proj.title}
                    onImageClick={() => onOpenModal(proj)}
                  />
                )}
              </div>

              {/* Metrics Footer */}
              <div className="project-preview-metrics">
                <div>
                  <div className="project-metric-lbl">
                    {proj.metrics.stat1Label}
                  </div>
                  <div className="project-metric-val">
                    {proj.metrics.stat1}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="project-metric-lbl">
                    {proj.metrics.stat2Label}
                  </div>
                  <div className="project-metric-val">
                    {proj.metrics.stat2}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FlagshipProjects({ theme = 'dark', onOpenModal }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    let lastActiveIdx = -1;
    let isInitial = true;
    let userInteracting = false;
    let userTimeout = null;

    const onUserInteraction = () => {
      userInteracting = true;
      clearTimeout(userTimeout);
      userTimeout = setTimeout(() => {
        userInteracting = false;
      }, 400);
    };

    window.addEventListener('scroll', onUserInteraction, { passive: true });
    window.addEventListener('touchmove', onUserInteraction, { passive: true });
    window.addEventListener('wheel', onUserInteraction, { passive: true });

    const initTimer = setTimeout(() => {
      isInitial = false;
    }, 800);

    const observer = new IntersectionObserver(
      (entries) => {
        if (isInitial || !userInteracting) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            const cardIdx = Number(entry.target.getAttribute('data-project-idx'));
            if (!isNaN(cardIdx) && cardIdx !== lastActiveIdx) {
              lastActiveIdx = cardIdx;
              playCardSound();
            }
          }
        });
      },
      {
        threshold: [0.4, 0.7],
        rootMargin: '-10% 0px -15% 0px',
      }
    );

    const cardEls = containerRef.current?.querySelectorAll('.project-card-wrap');
    cardEls?.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(initTimer);
      clearTimeout(userTimeout);
      window.removeEventListener('scroll', onUserInteraction);
      window.removeEventListener('touchmove', onUserInteraction);
      window.removeEventListener('wheel', onUserInteraction);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="projects">
      <div className="section-container">
        {/* Section Header */}
        <div className="projects-header-block" style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.9rem' }}>
            <SectionAsterisk size={42} theme={theme} />
            <div className="section-tag" style={{ margin: 0 }}>
              Flagship Engineering
            </div>
          </div>
          <h2 className="section-title">
            SELECTED <ItalicFlipWord text="Works" /> &amp; ARCHITECTURE
          </h2>
          <p className="section-desc">
            Production-deployed systems spanning computer vision, autonomous developer agents, multi-modal LLM pipelines, and secure backend microservices.
          </p>
        </div>

        {/* Project Cards Stack — Foldex-inspired Sticky Stacking Deck with High-Contrast Porcelain & Viewport-Fitting Geometry */}
        <div ref={containerRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          {FLAGSHIP_PROJECTS.map((proj, idx) => (
            <FlagshipProjectCard
              key={proj.id}
              proj={proj}
              idx={idx}
              theme={theme}
              onOpenModal={onOpenModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
