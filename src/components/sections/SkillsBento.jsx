import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Code2, Server, Database, Brain, Cloud, ChevronLeft, ChevronRight, Film, Play, Pause } from 'lucide-react';
import SectionAsterisk from '../ui/SectionAsterisk';
import ItalicFlipWord from '../ui/ItalicFlipWord';

const SKILL_CATEGORIES = [
  {
    id: 'aiml',
    category: 'AI / ML & Computer Vision',
    icon: Brain,
    isFeatured: true,
    reelNumber: '01',
    badge: 'CORE SPECIALIZATION',
    stockCode: 'KODAK 500T 5219',
    skills: [
      { name: 'Computer Vision', highlight: 'YOLOv8, OpenCV, Real-time Detection' },
      { name: 'LLM Integration', highlight: 'Gemini, OpenAI, Structured Function Calling' },
      { name: 'Prompt Engineering', highlight: 'Few-Shot, Chain-of-Thought, System Architecture' },
      { name: 'Semantic Search & Embeddings', highlight: 'Vector Embeddings, pgvector' },
      { name: 'NLP & Text Classification', highlight: 'Sentiment, Claim Extraction, Pipelines' },
      { name: 'Dual-Layer OCR', highlight: 'Google Cloud Vision, Tesseract.js' },
      { name: 'Speech-to-Text', highlight: 'Google Cloud Speech-to-Text' },
      { name: 'Scientific Computing', highlight: 'Scikit-Learn, Pandas, NumPy, Matplotlib' },
    ],
  },
  {
    id: 'backend',
    category: 'Backend & Distributed Systems',
    icon: Server,
    isFeatured: false,
    reelNumber: '02',
    badge: 'HIGH-THROUGHPUT',
    stockCode: 'EASTMAN VISION3',
    skills: [
      { name: 'Microservices Architecture', highlight: 'Decoupled Services, Event-Driven & Scalable Backends' },
      { name: 'Node.js & Express.js', highlight: 'Asynchronous Event-Driven Services' },
      { name: 'FastAPI (Python)', highlight: 'High-Performance ML Microservices' },
      { name: 'REST APIs & WebSockets', highlight: 'Real-Time Streaming & Zero-Polling Push' },
      { name: 'Job Queues & Workers', highlight: 'BullMQ, Celery, Redis Queues' },
      { name: 'Authentication & Security', highlight: 'JWT Rotation, bcrypt, OAuth 2.0, RBAC' },
    ],
  },
  {
    id: 'databases',
    category: 'Databases & Storage',
    icon: Database,
    isFeatured: false,
    reelNumber: '03',
    badge: 'PERSISTENCE & CACHE',
    stockCode: 'KODAK SAFETY 250D',
    skills: [
      { name: 'PostgreSQL', highlight: 'Relational Schema, pgvector Semantic Indexing' },
      { name: 'MongoDB', highlight: 'Mongoose ODM, Aggregations, Document Models' },
      { name: 'Redis', highlight: 'In-Memory Caching, Message Queues & Locks' },
      { name: 'Firebase & SQLite', highlight: 'Realtime Database, Lightweight Storage' },
    ],
  },
  {
    id: 'frontend',
    category: 'Languages & Frontend Core',
    icon: Code2,
    isFeatured: false,
    reelNumber: '04',
    badge: 'CREATIVE SPATIAL UI',
    stockCode: 'EASTMAN 5207',
    skills: [
      { name: 'TypeScript & JavaScript', highlight: 'Strict Type Safety, ES6+, Web APIs' },
      { name: 'Python & Java', highlight: 'FastAPI, Object-Oriented Architecture' },
      { name: 'SQL & C', highlight: 'Complex Queries, Memory & Core Foundations' },
      { name: 'React.js & Vite', highlight: 'Component Architecture, Hooks, Context API' },
      { name: 'Three.js & React Three Fiber', highlight: '3D Spatial Canvases, WebGL Shaders' },
      { name: 'Tailwind CSS & Modern CSS', highlight: 'High-Fidelity Responsive Design Systems' },
    ],
  },
  {
    id: 'devops',
    category: 'DevOps, Cloud & Testing',
    icon: Cloud,
    isFeatured: false,
    reelNumber: '05',
    badge: 'INFRASTRUCTURE & CI/CD',
    stockCode: 'KODAK VISION3 50D',
    skills: [
      { name: 'Docker & Docker Compose', highlight: 'Multi-service Containerization' },
      { name: 'CI/CD Pipelines', highlight: 'GitHub Actions Automated Testing & Deploy' },
      { name: 'Automated Testing', highlight: 'Jest, Vitest (180+ Test Suites)' },
      { name: 'Cloud Infrastructure', highlight: 'Google Cloud Platform (Top Arcade Contributor)' },
      { name: 'Reverse Proxy & Networking', highlight: 'Nginx, ngrok Tunnels' },
      { name: 'Deployment Platforms', highlight: 'Railway, Vercel, Render, Hostinger' },
    ],
  },
];

// 4-times repeated list for seamless continuous mechanical looping
const EXTENDED_CATEGORIES = [
  ...SKILL_CATEGORIES,
  ...SKILL_CATEGORIES,
  ...SKILL_CATEGORIES,
  ...SKILL_CATEGORIES,
];

// Compact dimensions refined from all four sides to fit desktop viewports perfectly
const CARD_WIDTH = 330;
const CARD_GAP = 20;
const STEP_WIDTH = CARD_WIDTH + CARD_GAP; // 350px

export default function SkillsBento({ theme = 'dark' }) {
  const isDark = theme === 'dark';
  const stageRef = useRef(null);

  // Stepper & Gate Weave State
  const [stepIndex, setStepIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [gateWeave, setGateWeave] = useState({ x: 0, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [suppressTransition, setSuppressTransition] = useState(false);
  const [stageWidth, setStageWidth] = useState(1200);
  const [activeCardKey, setActiveCardKey] = useState(0);

  // Timecode counter state (increments once per frame hold)
  const [timecodeFrames, setTimecodeFrames] = useState(24 * 60 * 4 + 18 * 24 + 12); // starts at 00:04:18:12

  const stepIndexRef = useRef(0);
  const isMovingRef = useRef(false);
  const isPausedRef = useRef(false);
  const isHoveredRef = useRef(false);

  // Measure stage width for exact center alignment
  useEffect(() => {
    const updateWidth = () => {
      if (stageRef.current) {
        setStageWidth(stageRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    isPausedRef.current = isPaused || isHovered;
    isHoveredRef.current = isHovered;
  }, [isPaused, isHovered]);

  // Intermittent Motion Engine: 400ms move with cubic-bezier(0.65, 0, 0.35, 1) + 900ms hold
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let timeoutId;
    let isMounted = true;

    const runStep = () => {
      if (!isMounted) return;

      if (!isPausedRef.current) {
        // Start move
        isMovingRef.current = true;
        setIsMoving(true);
        setSuppressTransition(false);
        setGateWeave({ x: 0, y: 0 });

        const nextStep = stepIndexRef.current + 1;
        stepIndexRef.current = nextStep;
        setStepIndex(nextStep);

        // Move completes in 400ms
        timeoutId = setTimeout(() => {
          if (!isMounted) return;
          isMovingRef.current = false;
          setIsMoving(false);

          // Update active card key for exposure flash
          setActiveCardKey(nextStep);

          // Increment timecode counter once per frame hold
          setTimecodeFrames((prev) => prev + 24);

          // Seamless loop normalization
          if (stepIndexRef.current >= SKILL_CATEGORIES.length * 2) {
            const normalized = stepIndexRef.current % SKILL_CATEGORIES.length;
            stepIndexRef.current = normalized;
            setSuppressTransition(true);
            setStepIndex(normalized);
          }

          // Hold for 900ms before next advance
          timeoutId = setTimeout(runStep, 900);
        }, 400);
      } else {
        timeoutId = setTimeout(runStep, 150);
      }
    };

    timeoutId = setTimeout(runStep, 900);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  // Gate Weave Jitter: random translate within +-1.5px, updated every 80ms during hold
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const jitterInterval = setInterval(() => {
      if (!isMovingRef.current && !isPausedRef.current) {
        const jx = (Math.random() * 3 - 1.5).toFixed(2);
        const jy = (Math.random() * 3 - 1.5).toFixed(2);
        setGateWeave({ x: Number(jx), y: Number(jy) });
      }
    }, 80);

    return () => clearInterval(jitterInterval);
  }, []);

  // Manual step buttons
  const handleStep = useCallback((direction = 'next') => {
    isMovingRef.current = true;
    setIsMoving(true);
    setSuppressTransition(false);
    setGateWeave({ x: 0, y: 0 });

    const delta = direction === 'next' ? 1 : -1;
    const nextStep = Math.max(0, stepIndexRef.current + delta);
    stepIndexRef.current = nextStep;
    setStepIndex(nextStep);

    setTimeout(() => {
      isMovingRef.current = false;
      setIsMoving(false);
      setActiveCardKey(nextStep);
      setTimecodeFrames((prev) => prev + 24);

      if (stepIndexRef.current >= SKILL_CATEGORIES.length * 2) {
        const normalized = stepIndexRef.current % SKILL_CATEGORIES.length;
        stepIndexRef.current = normalized;
        setSuppressTransition(true);
        setStepIndex(normalized);
      }
    }, 400);
  }, []);

  // Fluid Card Width & Step Calculation (adapts to mobile viewports down to 320px)
  const cardWidth = Math.min(330, Math.max(260, stageWidth - 36));
  const cardGap = 20;
  const stepWidth = cardWidth + cardGap;

  // Center alignment offset
  const centerOffset = Math.max(0, (stageWidth - cardWidth) / 2);
  const currentX = -(stepIndex * stepWidth) + centerOffset;

  const finalX = isMoving ? currentX : currentX + gateWeave.x;
  const finalY = isMoving ? 0 : gateWeave.y;
  const skewX = isMoving ? -1 : 0;

  const transformStyle = `translate3d(${finalX}px, ${finalY}px, 0) skewX(${skewX}deg)`;
  const transitionStyle = suppressTransition
    ? 'none'
    : isMoving
    ? 'transform 400ms cubic-bezier(0.65, 0, 0.35, 1), filter 400ms cubic-bezier(0.65, 0, 0.35, 1)'
    : 'transform 80ms linear, filter 150ms ease';
  const filterStyle = isMoving ? 'blur(1.5px)' : 'none';

  // Format timecode string HH:MM:SS:FF
  const totalSeconds = Math.floor(timecodeFrames / 24);
  const tcHours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const tcMinutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const tcSeconds = String(totalSeconds % 60).padStart(2, '0');
  const tcFrames = String(timecodeFrames % 24).padStart(2, '0');
  const formattedTimecode = `TC ${tcHours}:${tcMinutes}:${tcSeconds}:${tcFrames}`;

  // Active frame index (1 to 5)
  const activeFrameNumber = (stepIndex % SKILL_CATEGORIES.length) + 1;

  return (
    <section id="skills" style={{ overflow: 'hidden', position: 'relative' }}>
      <div className="section-container">
        {/* Section Header with Title on Left and 35mm Celluloid Controls on Right */}
        <div
          style={{
            marginBottom: '1.75rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.75rem' }}>
              <SectionAsterisk size={36} theme={theme} />
              <div className="section-tag" style={{ margin: 0 }}>
                Technical Competencies
              </div>
            </div>
            <h2 className="section-title">
              STACK &amp; <ItalicFlipWord text="Specializations" />
            </h2>
            <p className="section-desc" style={{ maxWidth: '620px', marginBottom: 0 }}>
              Production-tested technologies across artificial intelligence, distributed backend queues, databases, and DevOps automation.
            </p>
          </div>

          {/* Right-Aligned Film Controls & HUD Bar */}
          <div
            className="film-controls-hud-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              marginLeft: 'auto',
            }}
          >
            {/* HUD Timecode & Blinking REC Dot */}
            <div className="film-hud-box hex-chamfer-pill">
              <span className="hud-rec-dot" />
              <span>REC</span>
              <span style={{ opacity: 0.35 }}>|</span>
              <span>{formattedTimecode}</span>
            </div>

            {/* Frame Counter Pill */}
            <div className="film-reel-counter-pill hex-chamfer-pill">
              <Film size={12} />
              <span>35MM GATE · {String(activeFrameNumber).padStart(2, '0')} / 05</span>
            </div>

            {/* Pause/Play Toggle */}
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="film-reel-nav-btn hex-chamfer-oct"
              aria-label={isPaused ? 'Resume 35mm film stepping' : 'Pause 35mm film stepping'}
              title={isPaused ? 'Resume mechanical stepper' : 'Pause mechanical stepper'}
            >
              {isPaused ? <Play size={13} /> : <Pause size={13} />}
            </button>

            {/* Manual Advance / Rewind Buttons */}
            <button
              onClick={() => handleStep('prev')}
              className="film-reel-nav-btn hex-chamfer-oct"
              aria-label="Previous reel card"
              title="Previous skill frame"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => handleStep('next')}
              className="film-reel-nav-btn hex-chamfer-oct"
              aria-label="Next reel card"
              title="Next skill frame"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* 35mm Sprocket Tape Status Bar (Dashed Bar Layout) */}
        <div className="film-reel-sprockets">
          <div className="film-sprockets-meta-left">
            <span className="film-strip-badge" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              🎞️ 35MM CELLULOID PHYSICAL STRIP
            </span>
            <span className="film-sprockets-divider" style={{ opacity: 0.35 }}>·</span>
            <span className="film-gauge-tag" style={{ color: 'var(--text-secondary)' }}>
              OPTICAL GAUGE // 35MM
            </span>
          </div>

          <div className="film-sprockets-meta-right">
            {/* Desktop & Mobile text indicator (Normal clean text, no extra button) */}
            <span className="film-pause-hint-text" style={{ opacity: 0.85 }}>
              {isPaused || isHovered ? (
                'PAUSED'
              ) : (
                <>
                  <span className="film-hint-desktop">HOVER TO PAUSE</span>
                  <span className="film-hint-mobile">TAP TO PAUSE</span>
                </>
              )}
            </span>

            <span className="film-sprockets-divider" style={{ opacity: 0.35 }}>·</span>
            <span className="film-viewfinder-status" style={{ opacity: 0.85 }}>
              CENTER VIEWFINDER <span style={{ color: 'var(--rose-taupe)' }}>↔</span>
            </span>
          </div>
        </div>

        {/* Physical 35mm Celluloid Horizontal Stage Container (Tap or click moving cards to pause) */}
        <div
          ref={stageRef}
          className="film-horizontal-stage"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsPaused((prev) => !prev)}
          style={{ cursor: 'pointer' }}
          title={isPaused ? 'Click or tap moving cards to resume' : 'Click or tap moving cards to pause'}
        >
          {/* Film Grain Tiled Noise Overlay (8% opacity, animated steps(6), flicker) */}
          <div className="film-grain-overlay" aria-hidden="true" />

          {/* Film Strip Tape Track (Translates with intermittent motion & gate weave) */}
          <div
            className="film-tape-track"
            style={{
              transform: transformStyle,
              transition: transitionStyle,
              filter: filterStyle,
            }}
          >
            {/* Top Mono Edge Text Lane */}
            <div className="film-mono-edge-lane">
              {EXTENDED_CATEGORIES.map((cat, idx) => (
                <span key={`top-edge-${idx}`}>
                  {cat.stockCode} · ▶ {String((idx % SKILL_CATEGORIES.length) + 1).padStart(2, '0')}A · 35MM SAFETY FILM · ISO 500 · FRAME {cat.reelNumber}
                </span>
              ))}
            </div>

            {/* Top Horizontal Sprocket Lane (14x10px rounded rectangles, 28px pitch, scrolls with strip) */}
            <div className="film-sprocket-lane-h" />

            {/* Cards Row with Center Active Card Detection */}
            <div className="film-cards-row">
              {EXTENDED_CATEGORIES.map((cat, idx) => {
                const Icon = cat.icon;
                const isFeatured = cat.isFeatured;
                const isActive = idx === stepIndex;

                /* Color Palette Styling matching high-contrast Velvet / Creme System */
                let cardBg;
                let cardBorder;
                let cardShadow;
                let titleColor;
                let subtitleColor;
                let rowBg;
                let rowBorder;
                let rowTextColor;
                let rowHighlightColor;
                let badgeBg;
                let badgeColor;
                let iconBg;
                let iconColor;

                if (isDark) {
                  if (isFeatured) {
                    cardBg = 'linear-gradient(150deg, #9b475e 0%, #682335 100%)';
                    cardBorder = '1px solid rgba(255, 231, 231, 0.45)';
                    cardShadow = isActive
                      ? '0 22px 55px -10px rgba(148, 78, 99, 0.6), 0 0 30px rgba(180, 123, 132, 0.25)'
                      : '0 12px 35px -10px rgba(148, 78, 99, 0.3)';
                    titleColor = '#ffffff';
                    subtitleColor = '#ffe7e7';
                    badgeBg = 'rgba(255, 231, 231, 0.2)';
                    badgeColor = '#ffffff';
                    iconBg = 'rgba(255, 231, 231, 0.15)';
                    iconColor = '#ffffff';
                    rowBg = 'rgba(255, 255, 255, 0.1)';
                    rowBorder = 'rgba(255, 255, 255, 0.22)';
                    rowTextColor = '#ffffff';
                    rowHighlightColor = '#ffd2dc';
                  } else {
                    cardBg = 'linear-gradient(150deg, #fff7f7 0%, #f3e6e6 100%)';
                    cardBorder = '1px solid rgba(148, 78, 99, 0.28)';
                    cardShadow = isActive
                      ? '0 20px 50px -10px rgba(0, 0, 0, 0.65), 0 0 25px rgba(255, 231, 231, 0.18)'
                      : '0 12px 35px -10px rgba(0, 0, 0, 0.4)';
                    titleColor = '#160812';
                    subtitleColor = '#6e3040';
                    badgeBg = 'rgba(148, 78, 99, 0.1)';
                    badgeColor = '#8b3a50';
                    iconBg = 'rgba(148, 78, 99, 0.12)';
                    iconColor = '#944e63';
                    rowBg = 'rgba(148, 78, 99, 0.05)';
                    rowBorder = 'rgba(148, 78, 99, 0.16)';
                    rowTextColor = '#160812';
                    rowHighlightColor = '#8b3a50';
                  }
                } else {
                  if (isFeatured) {
                    cardBg = 'linear-gradient(150deg, #9b475e 0%, #682335 100%)';
                    cardBorder = '1px solid rgba(148, 78, 99, 0.35)';
                    cardShadow = isActive
                      ? '0 20px 48px -10px rgba(148, 78, 99, 0.4)'
                      : '0 12px 30px -10px rgba(148, 78, 99, 0.22)';
                    titleColor = '#ffffff';
                    subtitleColor = '#ffe7e7';
                    badgeBg = 'rgba(255, 231, 231, 0.2)';
                    badgeColor = '#ffffff';
                    iconBg = 'rgba(255, 231, 231, 0.15)';
                    iconColor = '#ffffff';
                    rowBg = 'rgba(255, 255, 255, 0.1)';
                    rowBorder = 'rgba(255, 255, 255, 0.22)';
                    rowTextColor = '#ffffff';
                    rowHighlightColor = '#ffd2dc';
                  } else {
                    cardBg = 'linear-gradient(150deg, #1d0e1c 0%, #120712 100%)';
                    cardBorder = '1px solid rgba(180, 123, 132, 0.35)';
                    cardShadow = isActive
                      ? '0 20px 48px -10px rgba(0, 0, 0, 0.5)'
                      : '0 12px 30px -10px rgba(0, 0, 0, 0.3)';
                    titleColor = '#ffe7e7';
                    subtitleColor = '#caa6a6';
                    badgeBg = 'rgba(255, 231, 231, 0.08)';
                    badgeColor = '#ffe7e7';
                    iconBg = 'rgba(255, 231, 231, 0.06)';
                    iconColor = '#ffe7e7';
                    rowBg = 'rgba(255, 231, 231, 0.04)';
                    rowBorder = 'rgba(180, 123, 132, 0.2)';
                    rowTextColor = '#ffe7e7';
                    rowHighlightColor = '#b47b84';
                  }
                }

                return (
                  <div
                    key={`card-${cat.id}-${idx}`}
                    className={`film-frame-card ${isActive ? 'is-active' : 'is-inactive'}`}
                    style={{
                      width: `${cardWidth}px`,
                      background: cardBg,
                      border: cardBorder,
                      boxShadow: cardShadow,
                    }}
                  >
                    {/* Viewfinder Corner Brackets for Active Card */}
                    {isActive && (
                      <div className="viewfinder-brackets" aria-hidden="true">
                        <span className="bracket bracket-tl" />
                        <span className="bracket bracket-tr" />
                        <span className="bracket bracket-bl" />
                        <span className="bracket bracket-br" />
                      </div>
                    )}

                    {/* Changeover Cue-Mark Circle in Top-Right */}
                    <div className="film-cue-mark" title="Changeover Cue Mark" aria-hidden="true" />

                    {/* Brief Exposure Fade Flash when Card Becomes Active (350ms) */}
                    {isActive && activeCardKey === idx && (
                      <div className="exposure-flash-overlay" aria-hidden="true" />
                    )}

                    {/* Top Film Frame Stamp */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.85rem',
                        fontSize: '0.62rem',
                        fontFamily: 'var(--font-m)',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                      }}
                    >
                      <span
                        style={{
                          padding: '0.18rem 0.5rem',
                          borderRadius: '999px',
                          background: badgeBg,
                          color: badgeColor,
                          textTransform: 'uppercase',
                        }}
                      >
                        {cat.badge}
                      </span>
                      <span style={{ color: subtitleColor, opacity: 0.85 }}>
                        FRAME {cat.reelNumber} // 35MM
                      </span>
                    </div>

                    {/* Category Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.95rem' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          background: iconBg,
                          border: `1px solid ${rowBorder}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: iconColor,
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3
                          style={{
                            fontSize: '1.05rem',
                            fontWeight: 800,
                            color: titleColor,
                            fontFamily: 'var(--font-d)',
                            letterSpacing: '-0.02em',
                            lineHeight: 1.2,
                          }}
                        >
                          {cat.category}
                        </h3>
                        <span
                          style={{
                            fontSize: '0.68rem',
                            color: subtitleColor,
                            fontFamily: 'var(--font-m)',
                            display: 'block',
                            marginTop: '0.1rem',
                          }}
                        >
                          {cat.skills.length} Validated Technologies
                        </span>
                      </div>
                    </div>

                    {/* Skills Rows */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.38rem', flex: 1 }}>
                      {cat.skills.map((skill) => (
                        <div
                          key={skill.name}
                          style={{
                            padding: '0.44rem 0.75rem',
                            background: rowBg,
                            border: `1px solid ${rowBorder}`,
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateX(3px)';
                            if (isDark && !isFeatured) {
                              e.currentTarget.style.background = 'rgba(148, 78, 99, 0.12)';
                              e.currentTarget.style.borderColor = 'var(--wine)';
                            } else {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateX(0)';
                            e.currentTarget.style.background = rowBg;
                            e.currentTarget.style.borderColor = rowBorder;
                          }}
                        >
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: rowTextColor }}>
                            {skill.name}
                          </span>
                          <span
                            style={{
                              fontSize: '0.66rem',
                              fontFamily: 'var(--font-m)',
                              color: rowHighlightColor,
                              textAlign: 'right',
                              fontWeight: 600,
                            }}
                          >
                            {skill.highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Horizontal Sprocket Lane */}
            <div className="film-sprocket-lane-h" />

            {/* Bottom Mono Edge Text Lane */}
            <div className="film-mono-edge-lane">
              {EXTENDED_CATEGORIES.map((cat, idx) => (
                <span key={`bottom-edge-${idx}`}>
                  EASTMAN SAFETY FILM · ECN-2 PROCESS · LATENT KEYCODE · 35MM · ▶ {String((idx % SKILL_CATEGORIES.length) + 1).padStart(2, '0')} · KODAK VISION3
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
