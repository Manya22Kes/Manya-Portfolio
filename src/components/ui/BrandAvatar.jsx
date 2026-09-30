import React from 'react';

/**
 * BrandAvatar: Clean, minimal architectural monogram avatar for Manya Keserwani (MK).
 * Simple, perfectly centered MK fitting inside a polished circular emblem.
 */
export default function BrandAvatar({ size = 30, theme = 'dark', className = '' }) {
  const isDark = theme === 'dark';

  return (
    <div
      className={`brand-avatar-emblem ${className}`}
      style={{
        width: `var(--brand-avatar-size, ${size}px)`,
        height: `var(--brand-avatar-size, ${size}px)`,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        cursor: 'pointer',
        background: isDark
          ? 'linear-gradient(145deg, #241220 0%, #150913 100%)'
          : 'linear-gradient(145deg, #FFF7F7 0%, #F5E5E5 100%)',
        border: isDark
          ? '1px solid rgba(180, 123, 132, 0.42)'
          : '1px solid rgba(148, 78, 99, 0.32)',
        boxShadow: isDark
          ? '0 2px 8px rgba(0, 0, 0, 0.4), 0 0 10px rgba(148, 78, 99, 0.2)'
          : '0 2px 8px rgba(148, 78, 99, 0.12)',
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease',
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.08)';
        e.currentTarget.style.borderColor = isDark ? '#FFE7E7' : 'var(--wine)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.borderColor = isDark ? 'rgba(180, 123, 132, 0.42)' : 'rgba(148, 78, 99, 0.32)';
      }}
      title="Manya Keserwani"
    >
      <span
        style={{
          fontFamily: 'var(--font-d)',
          fontWeight: 800,
          fontSize: `var(--brand-avatar-font, ${Math.round(size * 0.42)}px)`,
          color: isDark ? 'var(--porcelain)' : 'var(--wine)',
          letterSpacing: '-0.035em',
          lineHeight: 1,
          display: 'block',
          transform: 'translateY(-0.5px)',
        }}
      >
        MK
      </span>
    </div>
  );
}
