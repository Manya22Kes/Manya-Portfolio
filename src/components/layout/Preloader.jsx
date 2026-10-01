import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [meltFactor, setMeltFactor] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Cinematic progression curve:
  // 1. Hold crisp typography for ~1.1s so user can clearly see and appreciate the initial sculpture
  // 2. Exactly 2.0 seconds (2000ms) for the slow, viscous metal drip effect
  // 3. Brief settle at 100% fully formed before entering studio
  useEffect(() => {
    const startTime = Date.now();
    const HOLD_CRISP_MS = 1100;
    const DRIP_DURATION_MS = 2000; // Takes 2 seconds to make it drip
    const SETTLE_MS = 600;
    const totalDuration = HOLD_CRISP_MS + DRIP_DURATION_MS + SETTLE_MS; // 3700ms

    let frameId;
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(1, elapsed / totalDuration);

      // Smooth custom easing for progress bar
      let eased;
      if (rawProgress < 0.3) {
        eased = (rawProgress / 0.3) * 0.28;
      } else if (rawProgress < 0.85) {
        const t = (rawProgress - 0.3) / 0.55;
        eased = 0.28 + Math.sin(t * (Math.PI / 2)) * 0.58;
      } else {
        const t = (rawProgress - 0.85) / 0.15;
        eased = 0.86 + (1 - Math.cos(t * (Math.PI / 2))) * 0.14;
      }

      const current = Math.min(100, Math.floor(eased * 100));
      setProgress(current);

      // Drip factor: starts after HOLD_CRISP_MS, takes exactly 2000ms (2 seconds)
      const dripElapsed = Math.max(0, elapsed - HOLD_CRISP_MS);
      const rawDrip = Math.min(1, dripElapsed / DRIP_DURATION_MS);
      // Smooth viscous easing
      const currentMelt = rawDrip === 0 ? 0 : rawDrip === 1 ? 1 : Math.sin(rawDrip * (Math.PI / 2));
      setMeltFactor(currentMelt);

      if (rawProgress < 1) {
        frameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setMeltFactor(1);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 750);
        }, 350);
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    // Guaranteed fail-safe: if tab is backgrounded or requestAnimationFrame is paused
    const safetyTimer = setTimeout(() => {
      setProgress(100);
      setMeltFactor(1);
      setIsDone(true);
      onComplete?.();
    }, 3800);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(safetyTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setProgress(100);
    setMeltFactor(1);
    setIsDone(true);
    onComplete?.();
  };

  // Determine stage description
  const stageText =
    meltFactor === 0
      ? 'INITIALIZING SCULPTURE · CRISP TYPOGRAPHY'
      : meltFactor < 0.95
      ? 'VISUALLY MELTING · THERMAL CHROMIUM FLUIDITY'
      : 'SCULPTURE FULLY FORMED · ENTERING STUDIO';

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100%',
            height: '100dvh',
            minHeight: '100vh',
            zIndex: 99999,
            background: '#0d080c',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            padding: 'max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1.25rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left))',
            boxSizing: 'border-box',
            cursor: 'pointer',
          }}
          onClick={handleSkip}
          title="Click to enter portfolio"
        >
          {/* Editorial Top Monogram Label */}
          <div
            style={{
              fontFamily: 'var(--font-m)',
              fontSize: 'clamp(0.6rem, 2.2vw, 0.72rem)',
              letterSpacing: 'clamp(0.16em, 1.4vw, 0.3em)',
              color: 'var(--blush-sand)',
              opacity: 0.7,
              marginBottom: 'clamp(0.6rem, 2vh, 1.25rem)',
              textTransform: 'uppercase',
              textAlign: 'center',
              paddingInline: '0.75rem',
            }}
          >
            MANYA KESERWANI
          </div>

          {/* The Visual Melting Stage */}
          <div
            style={{
              position: 'relative',
              width: 'min(380px, 82vw)',
              height: 'min(445px, 96vw)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
            }}
          >
            {/* LAYER 1: Pristine Crisp 3D Font */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                opacity: 1 - meltFactor * 0.9,
                transition: 'opacity 0.15s ease-out',
              }}
            >
              <img
                src="/mk_crisp_loader.png"
                alt="MK Crisp Font Monogram"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  // Contour-hugging golden & rose-gold glow just around the letter
                  filter: `drop-shadow(0 15px 35px rgba(148, 78, 99, 0.45)) drop-shadow(0 0 ${
                    8 + meltFactor * 22
                  }px rgba(212, 175, 55, ${0.25 + meltFactor * 0.55}))`,
                  transition: 'filter 0.2s ease-out',
                }}
              />

              {/* Gleaming Specular Light Sweep masked strictly to the letter contours (zero square artifact) */}
              {meltFactor === 0 && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    maskImage: 'url(/mk_crisp_loader.png)',
                    WebkitMaskImage: 'url(/mk_crisp_loader.png)',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'top center',
                    WebkitMaskPosition: 'top center',
                    mixBlendMode: 'screen',
                  }}
                >
                  <motion.div
                    initial={{ x: '-120%', opacity: 0 }}
                    animate={{ x: '140%', opacity: [0, 0.9, 0] }}
                    transition={{ duration: 1.0, ease: 'easeInOut', delay: 0.1 }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background:
                        'linear-gradient(105deg, transparent 20%, rgba(255, 235, 235, 0.75) 50%, transparent 80%)',
                      transform: 'skewX(-24deg)',
                    }}
                  />
                </div>
              )}
            </div>

            {/* LAYER 2: Slow Viscous Melting Droplets & Long Drips (takes 2 seconds to drip) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                pointerEvents: 'none',
                opacity: meltFactor,
                transformOrigin: 'top center',
                transform: `scaleY(${0.93 + meltFactor * 0.07})`,
                transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
              }}
            >
              <img
                src="/mk_drip_elongated.png"
                alt="Molten Dripping Monogram with Elongated Droplets"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  // Glow sits STRICTLY around the letter contours and melting drips, with zero square
                  filter: `drop-shadow(0 20px 40px rgba(148, 78, 99, 0.55)) drop-shadow(0 0 ${
                    14 + meltFactor * 26
                  }px rgba(212, 175, 55, ${0.45 + meltFactor * 0.55}))`,
                  transition: 'filter 0.2s ease-out',
                }}
              />
            </div>
          </div>

          {/* Minimalist Progress Counter & Status */}
          <div
            style={{
              marginTop: 'clamp(0.85rem, 2.4vh, 1.5rem)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(0.45rem, 1.4vh, 0.75rem)',
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '380px',
              paddingInline: '1rem',
              boxSizing: 'border-box',
            }}
          >
            {/* Percentage Display */}
            <div
              style={{
                fontFamily: 'var(--font-m)',
                fontSize: 'clamp(0.82rem, 2.5vw, 0.95rem)',
                letterSpacing: '0.2em',
                color: 'var(--porcelain)',
                fontWeight: 600,
              }}
            >
              {String(progress).padStart(2, '0')} <span style={{ opacity: 0.35 }}>/</span> 100%
            </div>

            {/* Glowing Molten Progress Bar */}
            <div
              style={{
                width: 'clamp(140px, 44vw, 175px)',
                height: '3px',
                background: 'rgba(255, 231, 231, 0.12)',
                borderRadius: '999px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #944e63, #d4af37, #ffe7e7)',
                  borderRadius: '999px',
                  boxShadow: '0 0 12px rgba(212, 175, 55, 0.85)',
                  transition: 'width 0.06s linear',
                }}
              />
            </div>

            {/* Dynamic Status Text */}
            <motion.div
              key={stageText}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: 'var(--font-m)',
                fontSize: 'clamp(0.55rem, 1.8vw, 0.66rem)',
                letterSpacing: 'clamp(0.08em, 1vw, 0.22em)',
                color: meltFactor === 0 ? 'var(--blush-sand)' : meltFactor < 0.95 ? '#d4af37' : 'var(--porcelain)',
                textTransform: 'uppercase',
                fontWeight: 500,
                textAlign: 'center',
                maxWidth: 'min(92vw, 360px)',
                lineHeight: 1.35,
              }}
            >
              {stageText}
            </motion.div>

            {/* Quick Skip Prompt */}
            <div
              style={{
                marginTop: '0.45rem',
                fontSize: '0.58rem',
                fontFamily: 'var(--font-m)',
                color: 'rgba(255, 231, 231, 0.45)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              Tap or click to skip ↵
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
