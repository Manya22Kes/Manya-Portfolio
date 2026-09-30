import React from 'react';
import { motion } from 'framer-motion';

/**
 * ItalicFlipWord
 * Staggered 3D letter flip (rotateX with perspective) for italic words in section headings.
 * Triggers strictly ONCE per page refresh when the heading scrolls into view, then locks.
 * Subtle, luxury, editorial mechanical easing.
 */
export default function ItalicFlipWord({ text, delay = 0.55, color = 'var(--rose-taupe)', style = {} }) {
  if (!text) return null;

  const letters = text.split('');

  return (
    <span
      style={{
        display: 'inline-block',
        perspective: '1000px',
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        color: color,
        textTransform: 'none',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {letters.map((char, index) => (
        <motion.span
          key={`flip-char-${index}`}
          initial={{
            opacity: 0,
            rotateX: -90,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            rotateX: 0,
            y: 0,
          }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.85,
            delay: delay + index * 0.065,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: 'inline-block',
            transformOrigin: '50% 90%',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
