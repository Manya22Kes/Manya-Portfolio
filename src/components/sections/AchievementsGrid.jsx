import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Flame, Cloud, Cpu, BookOpen, Mic2 } from 'lucide-react';
import SectionAsterisk from '../ui/SectionAsterisk';
import ItalicFlipWord from '../ui/ItalicFlipWord';

// Achievements Data with standardized content for uniform card sizing
const ACHIEVEMENTS = [
  {
    id: 'leetcode',
    icon: Flame,
    stat: '200+',
    title: 'LeetCode Problems Solved',
    desc: 'Deep algorithmic practice spanning binary search, dynamic programming, trees, graphs, and greedy algorithms.',
    iconAccent: '#803D3B',
  },
  {
    id: 'arcade',
    icon: Cloud,
    stat: 'Top Tier',
    title: 'Google Cloud Arcade',
    desc: 'Active contributor mastering GCP IAM, Cloud Run, Cloud Storage, and BigQuery data engineering labs.',
    iconAccent: '#AF8260',
  },
  {
    id: 'genai',
    icon: Cpu,
    stat: 'GenAI',
    title: 'GDSC Study Jams',
    desc: 'Hands-on contributor exploring generative foundation models, vector embeddings, and prompt orchestration.',
    iconAccent: '#944E63',
  },
  {
    id: 'duo',
    icon: Flame,
    stat: '1,061 Days',
    title: 'Duolingo Daily Streak',
    desc: 'Unbroken daily habit learning Spanish — demonstrating relentless long-term focus, consistency, and dedication.',
    iconAccent: '#803D3B',
  },
  {
    id: 'editorial',
    icon: BookOpen,
    stat: 'Editorial',
    title: 'UNITIAN Newsletter Board',
    desc: 'Editorial contributor driving technical communication, student publications, and project features.',
    iconAccent: '#B47B84',
  },
  {
    id: 'orator',
    icon: Mic2,
    stat: 'Orator',
    title: 'House of Orators Speaker',
    desc: 'Active member participating in technical talks, public debating, and collaborative presentations.',
    iconAccent: '#322C2B',
  },
];

// 4-Sided Expanding Mask Stages (revealing smoothly across top, right, bottom, left)
// Stage 0: Center pinhole (closed)
const MASK_CLOSED =
  'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)';

// Stage 1: Expanding outward across all 4 sides with beveled corners (mid-reveal)
const MASK_MID_1 =
  'polygon(32% 16%, 68% 16%, 84% 32%, 84% 68%, 68% 84%, 32% 84%, 16% 68%, 16% 32%)';

// Stage 2: 4 sides reaching full outer edges with corner cuts
const MASK_MID_2 =
  'polygon(16% 0%, 84% 0%, 100% 16%, 100% 84%, 84% 100%, 16% 100%, 0% 84%, 0% 16%)';

// Stage 3: Fully unmasked across all 4 sides and corners (permanently covers entire card)
const MASK_FULL =
  'polygon(0% 0%, 100% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 100%, 0% 0%)';

export default function AchievementsGrid({ theme = 'dark' }) {
  const isDark = theme === 'dark';
  const sectionRef = useRef(null);
  const chainHasStartedRef = useRef(false);

  // Framer Motion controllers for the physical card nudge motions
  const card0 = useAnimation();
  const card1 = useAnimation();
  const card2 = useAnimation();
  const card3 = useAnimation();
  const card4 = useAnimation();
  const card5 = useAnimation();
  const cardControllers = [card0, card1, card2, card3, card4, card5];

  // Framer Motion controllers for the 4-sided masked content reveals
  const content0 = useAnimation();
  const content1 = useAnimation();
  const content2 = useAnimation();
  const content3 = useAnimation();
  const content4 = useAnimation();
  const content5 = useAnimation();
  const contentControllers = [content0, content1, content2, content3, content4, content5];

  // InView detection to trigger sequence only once when scrolled into view (re-runs on page refresh)
  const inView = useInView(sectionRef, { amount: 0.15, once: true });

  useEffect(() => {
    if (!inView) {
      chainHasStartedRef.current = false;
      contentControllers.forEach((ctrl) => ctrl.set({ opacity: 0, clipPath: MASK_CLOSED }));
      cardControllers.forEach((ctrl) => ctrl.set({ x: 0, y: 0, scale: 1 }));
      return;
    }
    if (chainHasStartedRef.current) return;
    chainHasStartedRef.current = true;

    let isMounted = true;

    // Helper: 4-sided masked reveal at relaxed, cinematic speed (1.35s) that STAYS permanently
    const revealCard = async (ctrl) => {
      await ctrl.start({
        opacity: 1,
        clipPath: [MASK_CLOSED, MASK_MID_1, MASK_MID_2, MASK_FULL],
        transition: {
          duration: 1.35,
          ease: [0.22, 1, 0.36, 1],
          times: [0, 0.35, 0.72, 1],
        },
      });
      // Explicitly lock at full mask so it covers the card
      if (isMounted) {
        ctrl.set({ opacity: 1, clipPath: MASK_FULL });
      }
    };

    async function runDominoChain() {
      // Crisp 180ms breathing space before Card 1 begins its reveal
      await new Promise((resolve) => setTimeout(resolve, 180));
      if (!isMounted) return;

      // STEP 1: Card 1 (idx 0) 4-sided masked reveal on its own (1.35s) - stays permanently
      await revealCard(content0);
      if (!isMounted) return;

      // Gentle pause before physical nudge begins
      await new Promise((resolve) => setTimeout(resolve, 120));
      if (!isMounted) return;

      // Card 1 physically nudges Card 2 (to its right) - relaxed 0.55s
      await card0.start({
        x: [0, 24, -4, 0],
        transition: { duration: 0.55, ease: 'easeInOut' },
      });
      if (!isMounted) return;

      // STEP 2: Card 2 (idx 1) recoils from the strike AND unmasks at the exact same 1.35s speed - stays
      card1.start({
        x: [0, 10, -3, 0],
        transition: { duration: 0.5, ease: 'easeOut' },
      });
      await revealCard(content1);
      if (!isMounted) return;

      // Gentle pause before next nudge
      await new Promise((resolve) => setTimeout(resolve, 120));
      if (!isMounted) return;

      // Card 2 physically nudges Card 5 (directly below it) - relaxed 0.55s
      await card1.start({
        y: [0, 24, -4, 0],
        transition: { duration: 0.55, ease: 'easeInOut' },
      });
      if (!isMounted) return;

      // STEP 3: Card 5 (idx 4) recoils from above AND unmasks at the exact same 1.35s speed - stays
      card4.start({
        y: [0, 10, -3, 0],
        transition: { duration: 0.5, ease: 'easeOut' },
      });
      await revealCard(content4);
      if (!isMounted) return;

      // Gentle pause before lateral impulse
      await new Promise((resolve) => setTimeout(resolve, 120));
      if (!isMounted) return;

      // Card 5 nudges BOTH Card 4 (left) and Card 6 (right) with dual outward impulse - relaxed 0.58s
      await card4.start({
        scale: [1, 1.03, 1],
        x: [0, -10, 10, 0],
        transition: { duration: 0.58, ease: 'easeInOut' },
      });
      if (!isMounted) return;

      // STEP 4: Card 4 (idx 3) & Card 6 (idx 5) both recoil AND unmask simultaneously (1.35s) - stay
      card3.start({
        x: [0, -10, 3, 0],
        transition: { duration: 0.5, ease: 'easeOut' },
      });
      card5.start({
        x: [0, 10, -3, 0],
        transition: { duration: 0.5, ease: 'easeOut' },
      });

      await Promise.all([revealCard(content3), revealCard(content5)]);
      if (!isMounted) return;

      // Gentle pause before final upward nudge
      await new Promise((resolve) => setTimeout(resolve, 120));
      if (!isMounted) return;

      // Card 6 nudges UPWARDS into Card 3 (directly above it) - relaxed 0.55s
      await card5.start({
        y: [0, -24, 4, 0],
        transition: { duration: 0.55, ease: 'easeInOut' },
      });
      if (!isMounted) return;

      // STEP 5: Card 3 (idx 2) recoils from below AND unmasks as grand finale (1.35s) - stays permanently
      card2.start({
        y: [0, -10, 3, 0],
        transition: { duration: 0.5, ease: 'easeOut' },
      });
      await revealCard(content2);
    }

    runDominoChain();

    return () => {
      isMounted = false;
    };
  }, [inView]);

  // Card Palette Colors directly requested by user:
  // Velvet Mode: #C599B6
  // Studio Mode: #FFEDFA
  const cardBg = isDark
    ? 'linear-gradient(155deg, #C599B6 0%, #B88AA9 100%)'
    : 'linear-gradient(155deg, #FFEDFA 0%, #FCE4F3 100%)';

  const cardBorder = isDark
    ? '1.5px solid rgba(197, 153, 182, 0.75)'
    : '1.5px solid rgba(197, 153, 182, 0.45)';

  const cardBoxShadow = isDark
    ? '0 0 24px -2px rgba(197, 153, 182, 0.48), 0 12px 35px rgba(0, 0, 0, 0.5)'
    : '0 0 20px -2px rgba(197, 153, 182, 0.35), 0 10px 26px rgba(128, 61, 59, 0.08)';

  const statColor = isDark ? '#1A0A14' : '#26101B';
  const titleColor = isDark ? '#2E1220' : '#63263C';
  const descColor = isDark ? '#3E1C2C' : '#4A2534';
  const indexColor = isDark ? 'rgba(26, 10, 20, 0.45)' : 'rgba(128, 61, 59, 0.45)';
  const iconBoxBg = isDark ? 'rgba(26, 10, 20, 0.09)' : 'rgba(148, 78, 99, 0.08)';
  const iconBoxBorder = isDark ? '1px solid rgba(26, 10, 20, 0.18)' : '1px solid rgba(148, 78, 99, 0.22)';

  return (
    <section id="achievements" ref={sectionRef} style={{ overflow: 'hidden' }}>
      <div className="section-container">
        {/* Section Header with Asterisk Emblem & Editorial Ligature Font */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.9rem' }}>
            <SectionAsterisk size={42} theme={theme} />
            <div className="section-tag" style={{ margin: 0 }}>
              Beyond The Terminal
            </div>
          </div>
          <h2 className="section-title">
            MILESTONES &amp; <ItalicFlipWord text="Recognition" />
          </h2>
          <p className="section-desc" style={{ maxWidth: '640px' }}>
            Algorithmic dedication, cloud certifications, leadership roles, and consistent self-directed growth.
          </p>
        </div>

        {/* 6-Card Kinetic Chain-Reaction Grid: All 6 Blank Cards are always visible on screen */}
        <div
          className="achievements-grid-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.75rem',
            alignItems: 'stretch',
          }}
        >
          {ACHIEVEMENTS.map((ach, idx) => {
            const Icon = ach.icon;

            return (
              <motion.div
                key={ach.id}
                animate={cardControllers[idx]}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  height: '100%',
                  minHeight: '235px',
                  display: 'flex',
                }}
              >
                {/* The Blank Card Shell: ALWAYS rendered and visible in requested shade with soft matte blur outline */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '235px',
                    borderRadius: '22px',
                    border: cardBorder,
                    background: cardBg,
                    boxShadow: cardBoxShadow,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'border 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  {/* Subtle Blank Card Base Layer: visible while card is blank waiting for its nudge */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      padding: 'clamp(1.25rem, 3.5vw, 2.1rem) clamp(1rem, 3vw, 1.85rem)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pointerEvents: 'none',
                    }}
                  >
                    {/* Faint Card Index in Corner of Blank Card */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '20px',
                        fontFamily: 'var(--font-m)',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: indexColor,
                        opacity: 0.45,
                        letterSpacing: '0.08em',
                      }}
                    >
                      0{idx + 1}
                    </div>

                    {/* Faint Watermark of Icon inside the Blank Card */}
                    <Icon
                      size={44}
                      style={{
                        color: isDark ? 'rgba(26, 10, 20, 0.16)' : 'rgba(148, 78, 99, 0.16)',
                      }}
                    />
                  </div>

                  {/* 4-Sided Masked Reveal Layer: Expands across all 4 sides and STAYS permanently */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      clipPath: MASK_CLOSED,
                    }}
                    animate={contentControllers[idx]}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      padding: 'clamp(1.25rem, 3.5vw, 2.1rem) clamp(1rem, 3vw, 1.85rem)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: cardBg,
                    }}
                  >
                    {/* Soft Ambient Inner Specular Matte Glaze */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '110px',
                        background: isDark
                          ? 'radial-gradient(ellipse 90% 50% at 30% 0%, rgba(255, 255, 255, 0.28) 0%, transparent 70%)'
                          : 'radial-gradient(ellipse 90% 50% at 30% 0%, rgba(255, 255, 255, 0.6) 0%, transparent 70%)',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Architectural Blueprint Index */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '16px',
                        right: '20px',
                        fontFamily: 'var(--font-m)',
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        color: indexColor,
                        letterSpacing: '0.08em',
                      }}
                    >
                      0{idx + 1}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', position: 'relative', zIndex: 1 }}>
                      {/* Soft Matte Icon Box */}
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '14px',
                          background: iconBoxBg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isDark ? '#1A0A14' : ach.iconAccent,
                          flexShrink: 0,
                          border: iconBoxBorder,
                          boxShadow: isDark
                            ? '0 2px 8px rgba(0, 0, 0, 0.12)'
                            : '0 2px 8px rgba(128, 61, 59, 0.06)',
                        }}
                      >
                        <Icon size={22} />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: '1.85rem',
                            fontWeight: 800,
                            color: statColor,
                            fontFamily: 'var(--font-d)',
                            lineHeight: 1.1,
                            marginBottom: '0.35rem',
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {ach.stat}
                        </div>
                        <h3
                          style={{
                            fontSize: '1.02rem',
                            fontWeight: 700,
                            color: titleColor,
                            marginBottom: '0.5rem',
                            fontFamily: 'var(--font-d)',
                          }}
                        >
                          {ach.title}
                        </h3>
                        <p
                          style={{
                            fontSize: '0.84rem',
                            color: descColor,
                            lineHeight: 1.65,
                            margin: 0,
                            fontWeight: 500,
                          }}
                        >
                          {ach.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
