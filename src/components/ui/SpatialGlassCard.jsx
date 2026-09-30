import React, { useRef, useState } from 'react';

export default function SpatialGlassCard({
  children,
  className = '',
  style = {},
  enableTilt = true,
  onClick,
  bgOverlay,
  ...props
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glowPos, setGlowPos] = useState({ x: -1000, y: -1000, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setGlowPos({ x, y, opacity: 1 });

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
      const rotateY = ((x - centerX) / centerX) * 6;  // max 6deg

      setTransform(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
      );
    }
  };

  const handleMouseLeave = () => {
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
    if (enableTilt) {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    }
  };

  return (
    <div
      ref={cardRef}
      className={`spatial-glass spotlight-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transform: enableTilt ? transform : undefined,
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, box-shadow 0.2s',
        '--mouse-x': `${glowPos.x}px`,
        '--mouse-y': `${glowPos.y}px`,
      }}
      {...props}
    >
      {/* Specular Edge Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          background: `radial-gradient(400px circle at ${glowPos.x}px ${glowPos.y}px, rgba(180, 123, 132, 0.25), transparent 70%)`,
          opacity: glowPos.opacity,
          transition: 'opacity 0.25s ease',
          zIndex: 1,
        }}
      />
      {/* Full-Box Background Overlay (covers entire card area edge-to-edge) */}
      {bgOverlay}
      <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
