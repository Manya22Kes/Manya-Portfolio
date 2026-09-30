import React, { useRef, useEffect } from 'react';

/**
 * ApproachLiquidRipples
 * Option A: Subtle interactive water ripples / liquid silk mesh for the Approach section background.
 * Creates gentle, viscous water ripples and a soft specular sheen as the cursor glides across
 * the almond/mulberry backdrop, settling to mirror stillness when idle.
 */
export default function ApproachLiquidRipples({ theme = 'dark', isDark = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let ripples = [];
    let mouse = { x: -1000, y: -1000, active: false };
    let lastSpawn = 0;
    let isSectionActive = true;

    // Handle high-DPI crisp canvas sizing
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Track mouse over approach area
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      const now = performance.now();
      // Throttle ripple spawn to every 65ms for a clean, non-cluttered liquid wake
      if (now - lastSpawn > 65) {
        lastSpawn = now;
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 8,
          maxRadius: 160,
          alpha: isDark ? 0.36 : 0.32,
          speed: 2.2,
          decay: 0.955,
        });
        // Limit active ripples to 15 for optimal 60fps performance
        if (ripples.length > 15) ripples.shift();
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Color tokens matching current theme mode:
      // Dark mode: Almond background (#efe0cc) -> Subtle Pistachio liquid ripples
      // Light mode: Creme theme (Mulberry background #200e19) -> Shimmering Rose Gold liquid ripples
      const rippleR = isDark ? 64 : 226;
      const rippleG = isDark ? 108 : 169;
      const rippleB = isDark ? 78 : 171;

      // 1. Soft viscous cursor sheen pool
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const glow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          140
        );
        glow.addColorStop(0, `rgba(${rippleR}, ${rippleG}, ${rippleB}, ${isDark ? 0.12 : 0.14})`);
        glow.addColorStop(0.5, `rgba(${rippleR}, ${rippleG}, ${rippleB}, ${isDark ? 0.04 : 0.05})`);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 140, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Propagating circular water caustics rings
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.alpha *= r.decay;

        if (r.alpha < 0.008 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Primary outer ripple wave
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rippleR}, ${rippleG}, ${rippleB}, ${r.alpha})`;
        ctx.lineWidth = Math.max(1, 2.2 * (1 - r.radius / r.maxRadius));
        ctx.stroke();

        // Secondary harmonic trailing wave
        if (r.radius > 24) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius * 0.68, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${rippleR}, ${rippleG}, ${rippleB}, ${r.alpha * 0.45})`;
          ctx.lineWidth = Math.max(0.8, 1.4 * (1 - r.radius / r.maxRadius));
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme, isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: 0.85,
      }}
    />
  );
}
