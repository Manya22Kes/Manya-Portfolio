import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCrtStaticSound } from '../../utils/soundEffects';

export default function CrtPowerOnReveal({ triggerCount = 0, theme = 'dark', onComplete }) {
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    if (triggerCount > 0) {
      setPhase('line');
      playCrtStaticSound();
      const t1 = setTimeout(() => setPhase('bloom'), 240);
      const tReveal = setTimeout(() => {
        onComplete?.();
      }, 560);
      const t2 = setTimeout(() => {
        setPhase('idle');
      }, 920);

      return () => {
        clearTimeout(t1);
        clearTimeout(tReveal);
        clearTimeout(t2);
      };
    }
  }, [triggerCount, onComplete]);

  if (phase === 'idle' || triggerCount === 0) return null;

  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      <motion.div
        key={`crt-beam-${triggerCount}`}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99990,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Phosphor Scanline Texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.45) 50%)',
            backgroundSize: '100% 4px',
            opacity: 0.35,
            zIndex: 3,
          }}
        />

        {/* Phase 1 & 2: Horizontal Cathode Ray Beam that Blooms into Full Frame */}
        <motion.div
          initial={{ scaleX: 0, scaleY: 0.004, opacity: 1 }}
          animate={
            phase === 'line'
              ? {
                  scaleX: [0, 1.05, 1],
                  scaleY: 0.005,
                  opacity: 1,
                  transition: { duration: 0.24, ease: [0.16, 1, 0.3, 1] },
                }
              : {
                  scaleX: 1,
                  scaleY: 1,
                  opacity: [1, 0.95, 0.85, 0],
                  transition: { duration: 0.72, ease: [0.76, 0, 0.24, 1] },
                }
          }
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background:
              phase === 'line'
                ? isDark
                  ? 'linear-gradient(90deg, transparent 5%, #ffe7e7 25%, #d4af37 50%, #944e63 75%, transparent 95%)'
                  : 'linear-gradient(90deg, transparent 5%, #944e63 25%, #d4af37 50%, #caa6a6 75%, transparent 95%)'
                : isDark
                ? 'radial-gradient(ellipse at center, rgba(255, 231, 231, 0.95) 0%, rgba(148, 78, 99, 0.6) 40%, rgba(12, 8, 11, 0.95) 85%)'
                : 'radial-gradient(ellipse at center, rgba(250, 240, 240, 0.95) 0%, rgba(180, 123, 132, 0.5) 45%, rgba(245, 226, 226, 0.92) 85%)',
            boxShadow:
              phase === 'line'
                ? '0 0 40px rgba(255, 231, 231, 0.95), 0 0 80px rgba(212, 175, 55, 0.8)'
                : '0 0 100px rgba(148, 78, 99, 0.5)',
            transformOrigin: 'center center',
          }}
        />

        {/* Micro-Telemetry Tech Stamp */}
        {phase === 'line' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: '48%',
              fontFamily: 'var(--font-m)',
              fontSize: '0.68rem',
              letterSpacing: '0.3em',
              color: isDark ? '#ffe7e7' : '#150811',
              textTransform: 'uppercase',
              textShadow: '0 0 10px rgba(212, 175, 55, 0.9)',
              zIndex: 4,
            }}
          >
            SYS_IGNITION // CRT APERTURE ONLINE
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
