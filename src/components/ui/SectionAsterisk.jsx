import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export default function SectionAsterisk({
  size = 42,
  theme = 'dark',
  className = '',
  style = {},
}) {
  const isDark = theme === 'dark';
  // Palette rules:
  // In Velvet theme (dark): Cream color from palette (#ffe7e7 / porcelain)
  // In Studio theme (light): Opposite color from palette (#150811 / wine)
  const color = isDark ? '#ffe7e7' : '#150811';

  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { amount: 0.2, once: false });

  useEffect(() => {
    let isCancelled = false;

    async function runSpinSequence() {
      if (inView) {
        // Fast start then gradual slowdown:
        // Whips through 720 degrees rapidly (1.3s), decelerating smoothly
        await controls.start({
          rotate: 720,
          scale: [0.85, 1.15, 1],
          opacity: 1,
          transition: {
            duration: 1.3,
            ease: [0.05, 0.8, 0.15, 1], // Rapid explosive spin -> gentle glide
          },
        });

        if (isCancelled) return;

        // Alternating Clockwise <-> Anticlockwise kinetic rotation at an energetic, elegant speed
        // 0.0s -> 1.2s: Rotates clockwise (+180°)
        // 1.2s -> 2.4s: Returns to center
        // 2.4s -> 3.6s: Rotates anticlockwise (-180°)
        // 3.6s -> 4.8s: Returns to center and loops seamlessly
        controls.start({
          rotate: [720, 900, 720, 540, 720],
          transition: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 4.8,
            ease: 'easeInOut',
            times: [0, 0.25, 0.5, 0.75, 1],
          },
        });
      } else {
        // Soft reset when out of view so re-scrolling triggers the fast-to-slow spin again
        controls.set({ rotate: 0, opacity: 0.8 });
      }
    }

    runSpinSequence();

    return () => {
      isCancelled = true;
    };
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className={`section-asterisk-wrap ${className}`}
      animate={controls}
      initial={{ rotate: 0, scale: 0.85, opacity: 0.8 }}
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        cursor: 'pointer',
        flexShrink: 0,
        ...style,
      }}
      title="Section Emblem (Click or hover to spin)"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* 8-pointed starburst / asterisk lines matching the reference design */}
        <line
          x1="24"
          y1="5"
          x2="24"
          y2="43"
          stroke="currentColor"
          strokeWidth="4.8"
          strokeLinecap="round"
        />
        <line
          x1="5"
          y1="24"
          x2="43"
          y2="24"
          stroke="currentColor"
          strokeWidth="4.8"
          strokeLinecap="round"
        />
        <line
          x1="10.5"
          y1="10.5"
          x2="37.5"
          y2="37.5"
          stroke="currentColor"
          strokeWidth="4.8"
          strokeLinecap="round"
        />
        <line
          x1="10.5"
          y1="37.5"
          x2="37.5"
          y2="10.5"
          stroke="currentColor"
          strokeWidth="4.8"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}
