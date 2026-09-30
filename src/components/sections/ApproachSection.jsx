import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionAsterisk from '../ui/SectionAsterisk';
import ApproachLiquidRipples from '../ui/ApproachLiquidRipples';
import { playApproachCameraSound } from '../../utils/soundEffects';

gsap.registerPlugin(ScrollTrigger);

const APPROACH_CARDS = [
  {
    num: '001',
    dots: 1,
    title: 'ANALYSING OBJECTIVE',
    desc: "I START BY PINPOINTING CORE REQUIREMENTS, DATA FLOWS, AND EDGE CASES BEFORE TOUCHING CODE, SO EVERY COMPONENT HAS A CLEAR PURPOSE.",
  },
  {
    num: '002',
    dots: 2,
    title: 'SEEKING INSPIRATION',
    desc: "I LOOK AT PROVEN ARCHITECTURAL PATTERNS, MODERN RESEARCH, AND OPEN-SOURCE ECOSYSTEMS TO DISCOVER ELEGANT, BATTLE-TESTED WAYS TO SOLVE THE PROBLEM.",
  },
  {
    num: '003',
    dots: 3,
    title: 'BRAINSTORMING SOLUTIONS',
    desc: "I WEIGH TRADEOFFS BETWEEN MODELS, API CONTRACTS, AND DATABASE SCHEMAS TO ARCHITECT A SYSTEM THAT RUNS FAST AND SCALES WITHOUT FRICTION.",
  },
  {
    num: '004',
    dots: 4,
    title: 'TRIAL & ERROR',
    desc: "I BUILD RAPID PROTOTYPES, TEST UNDER REAL WORKLOADS, AND STRESS-TEST FAIL-SILENT LOGIC UNTIL THE ARCHITECTURE IS ROCK SOLID.",
  },
  {
    num: '005',
    dots: 5,
    title: 'POLISHED & DEPENDABLE',
    desc: "FROM DEFENSIVE APIS AND RESPONSIVE INTERFACES TO PRECISE METRICS, I REFINE EVERY LAYER UNTIL THE DEPLOYMENT IS SMOOTH AND DEPENDABLE.",
  },
];

const STATEMENT_LINES = [
  'I CRAFT ROBUST, INTELLIGENT SYSTEMS',
  'AND INTUITIVE EXPERIENCES ENGINEERED',
  'TO SOLVE REAL CHALLENGES WITH PURPOSE.',
];

export default function ApproachSection({ theme = 'dark' }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 640 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDark = theme === 'dark';
  const targetTheme = isDark ? 'almond' : 'mulberry';
  const targetBg = isDark ? '#efe0cc' : '#200e19';
  const defaultTextColor = isDark ? 'rgba(240, 230, 232, 0.55)' : 'rgba(42, 15, 22, 0.55)';
  const textPrimary = isDark ? '#2a0f16' : '#ffe7e7';
  const cardBorder = isDark ? '1px solid #2a0f16' : '1px solid rgba(255, 231, 231, 0.4)';

  // Statement 3-line colors: Pistachio in Almond background, Rose Gold in Creme theme
  const statementTargetColor = isDark ? '#35523c' : '#e2a9ab';
  const statementDefaultColor = isDark ? 'rgba(53, 82, 60, 0.4)' : 'rgba(226, 169, 171, 0.4)';

  // ═════════════════════════════════════════════════════════════════════
  // 1. PIN THE BACKGROUND STAGE (Mobile GSAP Pinning; Desktop uses native CSS sticky)
  // ═════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!isMobile || !sectionRef.current || !stageRef.current) return;

    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: stageRef.current,
      pinSpacing: false,
      anticipatePin: 1,
    });

    return () => {
      pinTrigger.kill();
    };
  }, [isMobile]);

  const { scrollYProgress: globalScrollProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Desktop original values vs Mobile values
  const globalWashOpacityDesktop = useTransform(
    globalScrollProgress,
    [0.06, 0.28, 0.72, 0.94],
    [0, 1, 1, 0]
  );
  const globalWashOpacityMobile = useTransform(
    globalScrollProgress,
    [0.03, 0.14, 0.88, 0.98],
    [0, 1, 1, 0]
  );
  const globalWashOpacity = isMobile ? globalWashOpacityMobile : globalWashOpacityDesktop;

  const globalTextColorDesktop = useTransform(
    globalScrollProgress,
    [0.08, 0.28, 0.72, 0.92],
    [defaultTextColor, textPrimary, textPrimary, defaultTextColor]
  );
  const globalTextColorMobile = useTransform(
    globalScrollProgress,
    [0.04, 0.14, 0.88, 0.98],
    [defaultTextColor, textPrimary, textPrimary, defaultTextColor]
  );
  const globalTextColor = isMobile ? globalTextColorMobile : globalTextColorDesktop;

  // ═════════════════════════════════════════════════════════════════════
  // 2. PINNED STAGE SCROLL: Drives cards pull-up and text opacity
  // ═════════════════════════════════════════════════════════════════════
  const { scrollYProgress: stageScrollProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Desktop original: starts at 65vh and glides all the way up to -150%
  const cardsYDesktop = useTransform(stageScrollProgress, [0, 1], ['65vh', '-150%']);
  // Mobile tuned: physical track starts in view and glides to -70% so Card 005 is fully displayed
  const cardsYMobile = useTransform(stageScrollProgress, [0, 0.88, 1], ['0%', '-70%', '-72%']);
  const cardsY = isMobile ? cardsYMobile : cardsYDesktop;

  const textOpacityDesktop = useTransform(stageScrollProgress, [0.15, 0.75], [0.2, 1]);
  const textOpacityMobile = useTransform(stageScrollProgress, [0.08, 0.72], [0.25, 1]);
  const textOpacity = isMobile ? textOpacityMobile : textOpacityDesktop;

  const statementTextColorDesktop = useTransform(
    stageScrollProgress,
    [0.15, 0.75],
    [statementDefaultColor, statementTargetColor]
  );
  const statementTextColorMobile = useTransform(
    stageScrollProgress,
    [0.08, 0.72],
    [statementDefaultColor, statementTargetColor]
  );
  const statementTextColor = isMobile ? statementTextColorMobile : statementTextColorDesktop;

  // ═════════════════════════════════════════════════════════════════════
  // Camera shutter sound when Approach square cards are scrolled up or down
  // ═════════════════════════════════════════════════════════════════════
  useEffect(() => {
    let lastBand = -1;
    let lastSoundTime = 0;
    let isInitialized = false;

    const timer = setTimeout(() => {
      isInitialized = true;
    }, 700);

    const unsubscribe = stageScrollProgress.on('change', (progress) => {
      if (!isInitialized) return;
      if (progress < 0.02 || progress > 0.98) return;

      // 5 cards correspond to 5 distinct progression bands (0, 1, 2, 3, 4)
      const currentBand = Math.min(4, Math.max(0, Math.floor(progress * 5)));
      if (currentBand !== lastBand) {
        lastBand = currentBand;
        const now = performance.now();
        if (now - lastSoundTime > 140) {
          lastSoundTime = now;
          playApproachCameraSound();
        }
      }
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [stageScrollProgress]);

  // ═════════════════════════════════════════════════════════════════════
  // 3. THEME BOUNDARIES: Reverts to original theme when Experience starts
  // ═════════════════════════════════════════════════════════════════════
  useEffect(() => {
    const approachEl = sectionRef.current;
    const experienceEl = document.getElementById('experience');

    const handleScroll = () => {
      if (!approachEl) return;
      const approachRect = approachEl.getBoundingClientRect();
      const expRect = experienceEl?.getBoundingClientRect();

      let inApproach = false;
      if (isMobile) {
        inApproach = approachRect.top <= 120 && (!expRect || expRect.top > 80);
      } else {
        const desktopActive = approachRect.top <= window.innerHeight * 0.4 && approachRect.bottom > 80;
        const expStarted = expRect ? expRect.top <= 120 : false;
        inApproach = desktopActive && !expStarted;
      }

      if (inApproach) {
        document.documentElement.setAttribute('data-approach-theme', targetTheme);
        document.body.setAttribute('data-approach-theme', targetTheme);
      } else {
        document.documentElement.removeAttribute('data-approach-theme');
        document.body.removeAttribute('data-approach-theme');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.removeAttribute('data-approach-theme');
      document.body.removeAttribute('data-approach-theme');
    };
  }, [theme, targetTheme, isMobile]);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="approach-section"
      style={{
        backgroundColor: 'transparent',
        color: textPrimary,
        height: isMobile ? '240vh' : '270vh',
        position: 'relative',
        paddingBlock: 0,
        margin: 0,
      }}
    >
      {/* GLOBAL FULL-SCREEN WASH: Entire screen washes from dark to almond with zero edge */}
      <motion.div
        className="approach-global-wash"
        style={{
          backgroundColor: targetBg,
          opacity: globalWashOpacity,
        }}
        aria-hidden="true"
      >
        <div className="approach-tech-grid-overlay" />
        {/* Option A: Subtle interactive liquid water ripples on the almond backdrop */}
        <ApproachLiquidRipples theme={theme} isDark={isDark} />
        <div className="approach-tech-scanlines" />
        <div className="approach-tech-noise" />
        <div className="approach-tech-stamp approach-tech-tl">
          <span>+ LAT.03 // SYS.ACTIVE</span>
        </div>
        <div className="approach-tech-stamp approach-tech-tr">
          <span>+ 35MM.FRAME // OPTICAL</span>
        </div>
        <div className="approach-tech-stamp approach-tech-bl">
          <span>+ GRID.PRECISION // STATIC_TECH</span>
        </div>
      </motion.div>

      {/* Sticky Stage: Freezes at top: 0 while scrolling through the track */}
      <div
        ref={stageRef}
        className="approach-pinned-stage"
        style={{
          position: 'sticky',
          top: 0,
          height: isMobile ? '100dvh' : '100vh',
          minHeight: isMobile ? 0 : '680px',
          overflow: 'hidden',
          backgroundColor: 'transparent',
          zIndex: 10,
        }}
      >
        <div className="approach-stage-inner">
          {/* TOP ROW: Heading left margin EXACTLY EQUAL to other headings on the website via section-container */}
          <div className="section-container approach-top-row" style={{ paddingInline: 0 }}>
            <div
              className="approach-header-block"
              style={{
                marginLeft: 0,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  marginBottom: '0.65rem',
                }}
              >
                <SectionAsterisk
                  size={34}
                  style={{ color: textPrimary }}
                  theme={isDark ? 'light' : 'dark'}
                />
                <motion.div
                  className="section-tag"
                  style={{
                    margin: 0,
                    color: globalTextColor,
                  }}
                >
                  Thought Process
                </motion.div>
              </div>
              <motion.h2
                className="section-title approach-clean-heading"
                style={{
                  color: globalTextColor,
                  margin: 0,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                APPROACH
              </motion.h2>
            </div>
          </div>

          {/* STAGE AREA: Center Cards scrolling OVER the right-aligned 3-line statement */}
          <div className="approach-content-stage">
            {/* Right-Aligned 3-Line Statement Text with Framer Motion opacity scrub */}
            <div
              className="approach-statement-right-box"
              style={{
                right: isMobile ? undefined : 'clamp(2rem, 4vw, 4.5rem)',
              }}
            >
              <motion.div
                className="approach-statement-three-lines"
                style={{
                  color: statementTextColor,
                  opacity: textOpacity,
                }}
              >
                {STATEMENT_LINES.map((line, lineIdx) => (
                  <div key={lineIdx} className="approach-statement-line-row">
                    {line}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Scrolling Center Column of Small Square Cards centered in the page */}
            <div
              className="approach-cards-track-lane"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <motion.div
                style={{ y: cardsY }}
                className="approach-cards-track-inner"
              >
                {APPROACH_CARDS.map((card) => (
                  <div
                    key={card.num}
                    className="approach-small-square-card interactive"
                    role="button"
                    tabIndex={0}
                    onClick={() => playApproachCameraSound()}
                    style={{
                      backgroundColor: targetBg,
                      border: cardBorder,
                      color: textPrimary,
                      cursor: 'pointer',
                    }}
                  >
                    {/* Top line with dots in top-left */}
                    <div
                      className="approach-small-card-topbar"
                      style={{ borderBottom: cardBorder }}
                    >
                      <div className="approach-small-dots">
                        {Array.from({ length: card.dots }).map((_, i) => (
                          <span
                            key={i}
                            className="approach-small-dot"
                            style={{ backgroundColor: textPrimary }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="approach-small-card-body">
                      <span
                        className="approach-small-card-num"
                        style={{ color: textPrimary }}
                      >
                        {card.num}
                      </span>
                      <h3
                        className="approach-small-card-title"
                        style={{ color: textPrimary }}
                      >
                        {card.title}
                      </h3>
                      <p
                        className="approach-small-card-desc"
                        style={{ color: textPrimary }}
                      >
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
