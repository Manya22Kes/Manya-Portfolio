import React, { useState, useEffect } from 'react';
import { Play, Pause, Activity, RefreshCw, Cpu, Database, ShieldCheck, Zap } from 'lucide-react';

export default function ProjectTelemetryPreview({ projectId }) {
  const [isRunning, setIsRunning] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTick((t) => (t + 1) % 100);
    }, 120);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Vigilant: Real-time YOLOv8 Computer Vision HUD
  if (projectId === 'vigilant') {
    const box1X = 25 + Math.sin(tick * 0.1) * 12;
    const box1Y = 28 + Math.cos(tick * 0.08) * 8;
    const conf = (91.44 + Math.sin(tick * 0.2) * 1.8).toFixed(2);
    const latency = (38 + Math.abs(Math.sin(tick * 0.3) * 12)).toFixed(0);

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: '#0a0609',
          overflow: 'hidden',
          padding: 'clamp(0.55rem, 2vw, 0.9rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-m)',
          boxSizing: 'border-box',
        }}
      >
        {/* HUD Top Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 'clamp(0.6rem, 1.8vw, 0.68rem)',
            color: '#b47b84',
            borderBottom: '1px solid rgba(148,78,99,0.3)',
            paddingBottom: '0.35rem',
            flexWrap: 'wrap',
            gap: '0.35rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', flexShrink: 0 }} />
            <span>YOLOv8 STREAM // WEBSOCKET</span>
          </div>
          <div>FPS: 60.0 · {latency}ms</div>
        </div>

        {/* Video Canvas Simulation */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            margin: '0.45rem 0',
            minHeight: '120px',
            background: 'radial-gradient(circle at 50% 50%, #1a0f16 0%, #0d070b 100%)',
            borderRadius: '8px',
            border: '1px solid rgba(180,123,132,0.2)',
            overflow: 'hidden',
          }}
        >
          {/* Grid lines */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(148,78,99,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,78,99,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          {/* Polygon Surveillance Restricted Zone with scalable viewBox */}
          <svg viewBox="0 0 280 150" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <polygon points="35,25 240,35 210,130 50,120" fill="rgba(148,78,99,0.12)" stroke="#944e63" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x="65" y="55" fill="#caa6a6" fontSize="9" fontFamily="var(--font-m)">RESTRICTED ZONE ALPHA</text>
          </svg>

          {/* Simulated Moving Bounding Box */}
          <div
            style={{
              position: 'absolute',
              left: `${box1X}%`,
              top: `${box1Y}%`,
              width: 'clamp(65px, 22vw, 85px)',
              height: 'clamp(50px, 16vw, 65px)',
              border: '1.5px solid #22c55e',
              background: 'rgba(34, 197, 94, 0.08)',
              borderRadius: '4px',
              transition: 'all 0.1s linear',
              boxShadow: '0 0 10px rgba(34, 197, 94, 0.3)',
            }}
          >
            <div style={{ position: 'absolute', top: '-15px', left: 0, background: '#22c55e', color: '#000', fontSize: '8px', fontWeight: 700, padding: '1px 4px', borderRadius: '2px', whiteSpace: 'nowrap' }}>
              TARGET: {conf}%
            </div>
          </div>
        </div>

        {/* Telemetry Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 'clamp(0.58rem, 1.8vw, 0.66rem)',
            color: '#caa6a6',
            flexWrap: 'wrap',
            gap: '0.35rem',
          }}
        >
          <span>POLYGON: NORMALIZED</span>
          <button
            onClick={() => setIsRunning(!isRunning)}
            style={{
              background: 'rgba(148,78,99,0.25)',
              border: '1px solid #944e63',
              color: '#ffe7e7',
              padding: '2px 8px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: 'clamp(0.58rem, 1.6vw, 0.66rem)',
              whiteSpace: 'nowrap',
            }}
          >
            {isRunning ? 'PAUSE PIPELINE' : 'RESUME STREAM'}
          </button>
        </div>
      </div>
    );
  }

  // RepoPilot AI: BullMQ Queue & pgvector Similarity Telemetry
  if (projectId === 'repopilot') {
    const queueDepth = Math.max(0, 12 - Math.floor(tick * 0.15));
    const processed = 180 + Math.floor(tick * 1.2);
    const cosineSim = (0.89 + Math.sin(tick * 0.15) * 0.08).toFixed(3);

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: '#0a0609',
          overflow: 'hidden',
          padding: 'clamp(0.55rem, 2vw, 0.9rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-m)',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 'clamp(0.6rem, 1.8vw, 0.68rem)',
            color: '#b47b84',
            borderBottom: '1px solid rgba(148,78,99,0.3)',
            paddingBottom: '0.35rem',
            flexWrap: 'wrap',
            gap: '0.35rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8', boxShadow: '0 0 8px #38bdf8', flexShrink: 0 }} />
            <span>BULLMQ WORKER // PGVECTOR</span>
          </div>
          <div>QUEUE: {queueDepth}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', margin: '0.45rem 0' }}>
          <div style={{ padding: '0.5rem', background: 'rgba(56, 189, 248, 0.06)', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.25)', fontSize: '0.7rem' }}>
            <div style={{ color: '#38bdf8', fontWeight: 600 }}>WEBHOOK RECV: github.event.issues.opened</div>
            <div style={{ color: '#caa6a6', fontSize: '0.62rem', marginTop: '2px' }}>Payload deduplication via HNSW index (pgvector)</div>
          </div>

          <div style={{ padding: '0.5rem', background: 'rgba(148, 78, 99, 0.12)', borderRadius: '6px', border: '1px solid rgba(148, 78, 99, 0.3)', fontSize: '0.7rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#ffe7e7' }}>COSINE SIMILARITY</span>
              <span style={{ color: '#d4af37', fontWeight: 700 }}>{cosineSim}</span>
            </div>
            <div style={{ height: '3px', background: 'rgba(255,231,231,0.1)', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${parseFloat(cosineSim) * 100}%`, background: 'linear-gradient(90deg, #944e63, #38bdf8)' }} />
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 'clamp(0.58rem, 1.8vw, 0.66rem)',
            color: '#caa6a6',
            flexWrap: 'wrap',
            gap: '0.35rem',
          }}
        >
          <span>JOBS: {processed}</span>
          <span style={{ color: '#22c55e' }}>● FAILOVER HEALTHY</span>
        </div>
      </div>
    );
  }

  // PRISM: Multi-Modal Ingestion & Credibility Score Gauge
  if (projectId === 'prism') {
    const truthScore = (88.5 + Math.sin(tick * 0.1) * 4.5).toFixed(1);

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: '#0a0609',
          overflow: 'hidden',
          padding: 'clamp(0.55rem, 2vw, 0.9rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-m)',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 'clamp(0.6rem, 1.8vw, 0.68rem)',
            color: '#b47b84',
            borderBottom: '1px solid rgba(148,78,99,0.3)',
            paddingBottom: '0.35rem',
            flexWrap: 'wrap',
            gap: '0.35rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 8px #a855f7', flexShrink: 0 }} />
            <span>GEMINI + OCR // 7-FORMAT PIPELINE</span>
          </div>
          <div>LATENCY: 1.8s</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '0.45rem 0', flexWrap: 'wrap', gap: '0.5rem' }}>
          {/* Radial score gauge */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffe7e7', fontFamily: 'var(--font-d)' }}>
              {truthScore}%
            </div>
            <div style={{ fontSize: '0.6rem', color: '#caa6a6', letterSpacing: '0.08em' }}>CREDIBILITY INDEX</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.66rem' }}>
            <span style={{ color: '#22c55e' }}>✓ Cloud Vision OCR Pass</span>
            <span style={{ color: '#22c55e' }}>✓ Audio Whisper Transcribed</span>
            <span style={{ color: '#38bdf8' }}>✓ Gemini Claim Cross-Exam</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 'clamp(0.58rem, 1.8vw, 0.66rem)',
            color: '#caa6a6',
            flexWrap: 'wrap',
            gap: '0.35rem',
          }}
        >
          <span>INPUT: PDF + AUDIO + IMAGE</span>
          <span style={{ color: '#a855f7' }}>● DUAL OCR ACTIVE</span>
        </div>
      </div>
    );
  }

  // XPENSE: Real-Time Personal Finance & Budget Telemetry
  if (projectId === 'xpense') {
    const totalSpent = 24580 + Math.floor(Math.sin(tick * 0.1) * 320);
    const budgetMax = 40000;
    const pctUsed = ((totalSpent / budgetMax) * 100).toFixed(1);

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: '#0a0609',
          overflow: 'hidden',
          padding: 'clamp(0.55rem, 2vw, 0.9rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-m)',
          boxSizing: 'border-box',
        }}
      >
        {/* HUD Top Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 'clamp(0.6rem, 1.8vw, 0.68rem)',
            color: '#b47b84',
            borderBottom: '1px solid rgba(148,78,99,0.3)',
            paddingBottom: '0.35rem',
            flexWrap: 'wrap',
            gap: '0.35rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', flexShrink: 0 }} />
            <span>EXPENSE_ENGINE // TELEMETRY</span>
          </div>
          <div>REDIS · 38ms</div>
        </div>

        {/* Center: Live Budget & Dynamic Category Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', margin: '0.45rem 0' }}>
          {/* Main Budget Progress Row */}
          <div style={{ padding: '0.45rem 0.65rem', background: 'rgba(148, 78, 99, 0.12)', borderRadius: '6px', border: '1px solid rgba(148, 78, 99, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.2rem' }}>
              <div>
                <span style={{ fontSize: '0.62rem', color: '#caa6a6', textTransform: 'uppercase' }}>Month: </span>
                <span style={{ fontSize: '0.98rem', fontWeight: 800, color: '#ffe7e7', fontFamily: 'var(--font-d)' }}>₹{totalSpent.toLocaleString('en-IN')}</span>
              </div>
              <span style={{ fontSize: '0.64rem', color: '#22c55e', fontWeight: 700 }}>{pctUsed}% of ₹40k</span>
            </div>
            <div style={{ height: '3px', background: 'rgba(255,231,231,0.1)', borderRadius: '2px', marginTop: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pctUsed}%`, background: 'linear-gradient(90deg, #22c55e, #d4af37, #944e63)' }} />
            </div>
          </div>

          {/* Micro Category Gauges & Cloudinary Receipt Stream */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.35rem', fontSize: '0.65rem' }}>
            <div style={{ padding: '0.4rem', background: 'rgba(255, 231, 231, 0.03)', borderRadius: '6px', border: '1px solid rgba(180, 123, 132, 0.18)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffe7e7' }}>
                <span>🛒 Groceries</span>
                <span style={{ color: '#d4af37', fontWeight: 600 }}>₹8,420</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffe7e7', marginTop: '2px' }}>
                <span>⚡ Bills</span>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>₹2,660</span>
              </div>
            </div>

            <div style={{ padding: '0.4rem', background: 'rgba(255, 231, 231, 0.03)', borderRadius: '6px', border: '1px solid rgba(180, 123, 132, 0.18)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ color: '#22c55e', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span>☁️ CLOUDINARY</span>
              </div>
              <div style={{ color: '#caa6a6', fontSize: '0.6rem', marginTop: '2px' }}>
                Receipt OCR Active
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 'clamp(0.58rem, 1.8vw, 0.66rem)',
            color: '#caa6a6',
            flexWrap: 'wrap',
            gap: '0.35rem',
          }}
        >
          <span>AGGREGATION: ACTIVE</span>
          <button
            onClick={() => setIsRunning(!isRunning)}
            style={{
              background: 'rgba(148,78,99,0.25)',
              border: '1px solid #944e63',
              color: '#ffe7e7',
              padding: '2px 8px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: 'clamp(0.58rem, 1.6vw, 0.66rem)',
              whiteSpace: 'nowrap',
            }}
          >
            {isRunning ? 'PAUSE FEED' : 'RESUME FEED'}
          </button>
        </div>
      </div>
    );
  }

  // AUTHIFY: Dedicated Zero-Trust Authentication & Identity Defense
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#0a0609',
        overflow: 'hidden',
        padding: 'clamp(0.55rem, 2vw, 0.9rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-m)',
        boxSizing: 'border-box',
      }}
    >
      {/* HUD Top Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 'clamp(0.6rem, 1.8vw, 0.68rem)',
          color: '#b47b84',
          borderBottom: '1px solid rgba(148,78,99,0.3)',
          paddingBottom: '0.35rem',
          flexWrap: 'wrap',
          gap: '0.35rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e', flexShrink: 0 }} />
          <span>ZERO-TRUST AUTH ENGINE</span>
        </div>
        <div style={{ color: '#22c55e' }}>ONLINE</div>
      </div>

      {/* Defensive Architecture Pipeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', margin: '0.45rem 0' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.02rem', fontWeight: 800, color: '#ffe7e7', fontFamily: 'var(--font-d)', letterSpacing: '-0.02em' }}>
            DEFENSIVE ARCHITECTURE
          </div>
          <div style={{ fontSize: '0.64rem', color: '#caa6a6', marginTop: '0.1rem' }}>
            Zero-Trust Middleware &amp; Continuous Token Lifecycle
          </div>
        </div>

        {/* Middleware Flow Pipeline - Fluid Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(62px, 1fr))', gap: '0.3rem', textAlign: 'center', fontSize: '0.58rem' }}>
          <div style={{ padding: '0.3rem 0.15rem', background: 'rgba(148,78,99,0.15)', border: '1px solid rgba(148,78,99,0.3)', borderRadius: '4px', color: '#ffe7e7', whiteSpace: 'nowrap' }}>
            1. Rate Limiter
          </div>
          <div style={{ padding: '0.3rem 0.15rem', background: 'rgba(148,78,99,0.15)', border: '1px solid rgba(148,78,99,0.3)', borderRadius: '4px', color: '#ffe7e7', whiteSpace: 'nowrap' }}>
            2. Sanitizer
          </div>
          <div style={{ padding: '0.3rem 0.15rem', background: 'rgba(148,78,99,0.15)', border: '1px solid rgba(148,78,99,0.3)', borderRadius: '4px', color: '#ffe7e7', whiteSpace: 'nowrap' }}>
            3. JWT Verify
          </div>
          <div style={{ padding: '0.3rem 0.15rem', background: 'rgba(148,78,99,0.15)', border: '1px solid rgba(148,78,99,0.3)', borderRadius: '4px', color: '#ffe7e7', whiteSpace: 'nowrap' }}>
            4. RBAC Guard
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem 0.55rem', background: 'rgba(255,231,231,0.03)', borderRadius: '4px', border: '1px solid rgba(180,123,132,0.18)', fontSize: '0.62rem', flexWrap: 'wrap', gap: '0.3rem' }}>
          <span style={{ color: '#caa6a6' }}>ROTATION PROTOCOL:</span>
          <span style={{ color: '#22c55e', fontWeight: 600 }}>100% SILENT AXIOS QUEUE</span>
        </div>
      </div>

      {/* Telemetry Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 'clamp(0.58rem, 1.8vw, 0.66rem)',
          color: '#caa6a6',
          flexWrap: 'wrap',
          gap: '0.35rem',
        }}
      >
        <span>BCRYPT // HTTP-ONLY</span>
        <span style={{ color: '#38bdf8' }}>8+ ENDPOINTS SECURED</span>
      </div>
    </div>
  );
}
