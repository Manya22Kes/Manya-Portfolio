import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CloudSun,
  Link2,
  DollarSign,
  Grid,
  Play,
  Terminal,
  ExternalLink,
  Layers,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Code2,
  Zap,
} from 'lucide-react';
import { GithubIcon } from '../ui/Icons';
import SectionAsterisk from '../ui/SectionAsterisk';
import ItalicFlipWord from '../ui/ItalicFlipWord';
import { playAsmrKeyboardClick, playCardSound } from '../../utils/soundEffects';

/* ═════════════════════════════════════════════════════════════════════
   DEDICATED APPLICATION UI PREVIEWS (Authentic Project Screen Mockups)
   ═════════════════════════════════════════════════════════════════════ */

/* ═════════════════════════════════════════════════════════════════════
   DEDICATED APPLICATION UI PREVIEWS (Authentic Project Screen Mockups)
   Simplified, authentic beginner projects (JavaScript & Node.js)
   ═════════════════════════════════════════════════════════════════════ */

function WeatherCardUI() {
  return (
    <div style={{ padding: '0.85rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.68rem', color: '#93c5fd', fontFamily: 'var(--font-m)' }}>
          <MapPin size={11} />
          <span>Prayagraj, IN</span>
        </div>
        <span style={{ fontSize: '0.62rem', background: 'rgba(56, 189, 248, 0.18)', color: '#38bdf8', padding: '0.15rem 0.45rem', borderRadius: '999px', fontFamily: 'var(--font-m)', fontWeight: 600 }}>
          OpenWeather API
        </span>
      </div>

      <div style={{ textAlign: 'center', margin: '0.2rem 0' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <CloudSun size={44} color="#38bdf8" style={{ filter: 'drop-shadow(0 0 16px rgba(56, 189, 248, 0.5))' }} />
        </div>
        <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-d)', lineHeight: 1, marginTop: '0.25rem' }}>
          28°<span style={{ fontSize: '0.95rem', color: '#93c5fd' }}>C</span>
        </div>
        <div style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 500, marginTop: '0.2rem' }}>
          Clear Sky · Feels 30°
        </div>
      </div>

      {/* Hourly forecast mini pills */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.25rem', background: 'rgba(0, 0, 0, 0.45)', padding: '0.35rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        {[
          { time: '12h', temp: '28°' },
          { time: '15h', temp: '30°' },
          { time: '18h', temp: '27°' },
          { time: '21h', temp: '24°' },
        ].map((h) => (
          <div key={h.time} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.58rem', color: '#94a3b8', fontFamily: 'var(--font-m)' }}>{h.time}</div>
            <div style={{ fontSize: '0.68rem', color: '#fff', fontWeight: 700 }}>{h.temp}</div>
          </div>
        ))}
      </div>

      {/* Current Conditions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: '#93c5fd', fontFamily: 'var(--font-m)', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '0.4rem' }}>
        <span>💨 Wind: 14 km/h</span>
        <span>💧 Humidity: 62%</span>
        <span>👁️ Visibility: 10 km</span>
      </div>
    </div>
  );
}

function UrlShortenerCardUI() {
  return (
    <div style={{ padding: '0.85rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-m)', color: '#c084fc', background: 'rgba(168, 85, 247, 0.18)', padding: '0.15rem 0.45rem', borderRadius: '6px' }}>
          Node.js + Express
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.62rem', color: '#4ade80', fontFamily: 'var(--font-m)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
          Online
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', margin: '0.2rem 0' }}>
        <div style={{ background: 'rgba(0, 0, 0, 0.55)', padding: '0.4rem 0.55rem', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.25)', fontSize: '0.62rem', color: '#94a3b8', fontFamily: 'var(--font-m)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          🔗 https://github.com/Manya22...
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(168, 85, 247, 0.22)', padding: '0.45rem 0.6rem', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#f3e8ff', fontFamily: 'var(--font-m)' }}>
            short.ly/m8K9z
          </span>
          <span style={{ fontSize: '0.58rem', background: '#a855f7', color: '#fff', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 600 }}>
            COPIED
          </span>
        </div>
      </div>

      {/* Analytics Table Simulation */}
      <div style={{ background: 'rgba(0, 0, 0, 0.45)', padding: '0.45rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
          <span style={{ fontSize: '0.6rem', color: '#94a3b8', fontFamily: 'var(--font-m)' }}>CLICK ANALYTICS TABLE</span>
          <span style={{ fontSize: '0.66rem', color: '#e9d5ff', fontWeight: 700 }}>1,482 Clicks</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.25rem', height: '22px' }}>
          {[35, 65, 45, 80, 55, 95, 75, 100].map((val, i) => (
            <div key={i} style={{ flex: 1, height: `${val}%`, background: `linear-gradient(to top, #7e22ce, #c084fc)`, borderRadius: '2px' }} />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: '#c084fc', fontFamily: 'var(--font-m)' }}>
        <span>SSR Server Rendering</span>
        <span>MongoDB Database</span>
      </div>
    </div>
  );
}

function CurrencyCardUI() {
  return (
    <div style={{ padding: '0.85rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-m)', color: '#34d399', background: 'rgba(16, 185, 129, 0.18)', padding: '0.15rem 0.45rem', borderRadius: '6px' }}>
          LIVE EXCHANGE RATE
        </span>
        <span style={{ fontSize: '0.64rem', color: '#10b981', fontWeight: 700, fontFamily: 'var(--font-m)' }}>
          ▲ +0.42%
        </span>
      </div>

      <div style={{ textAlign: 'center', margin: '0.15rem 0' }}>
        <div style={{ fontSize: '0.68rem', color: '#6ee7b7', fontFamily: 'var(--font-m)', marginBottom: '0.15rem' }}>
          USD ⇄ INR
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-d)', lineHeight: 1 }}>
          ₹84.25
        </div>
        <div style={{ fontSize: '0.64rem', color: '#a7f3d0', marginTop: '0.2rem' }}>
          $1.00 USD = ₹84.2514 INR
        </div>
      </div>

      {/* SVG Wave Sparkline chart */}
      <div style={{ background: 'rgba(0, 0, 0, 0.45)', padding: '0.4rem', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
        <div style={{ fontSize: '0.58rem', color: '#6ee7b7', fontFamily: 'var(--font-m)', marginBottom: '0.15rem' }}>7-DAY RATE TREND</div>
        <svg viewBox="0 0 100 26" style={{ width: '100%', height: '26px', overflow: 'visible' }}>
          <path d="M 0,20 Q 15,16 28,12 T 55,14 T 78,7 T 100,4" fill="none" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 0,20 Q 15,16 28,12 T 55,14 T 78,7 T 100,4 L 100,26 L 0,26 Z" fill="url(#emeraldGrad)" opacity="0.25" />
          <defs>
            <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: '#6ee7b7', fontFamily: 'var(--font-m)' }}>
        <span>170+ Currencies</span>
        <span>Instant Conversion</span>
      </div>
    </div>
  );
}

function TicTacToeCardUI() {
  return (
    <div style={{ padding: '0.85rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-m)', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.18)', padding: '0.15rem 0.45rem', borderRadius: '6px' }}>
          2-PLAYER GAME
        </span>
        <span style={{ fontSize: '0.64rem', color: '#f59e0b', fontWeight: 700, fontFamily: 'var(--font-m)' }}>
          ROUND 05
        </span>
      </div>

      {/* 3x3 Grid simulation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem', margin: '0.2rem auto', width: '124px', height: '124px', position: 'relative' }}>
        {['X', 'O', 'X', '', 'X', 'O', 'O', '', 'X'].map((cell, idx) => (
          <div
            key={idx}
            style={{
              background: 'rgba(0, 0, 0, 0.55)',
              borderRadius: '8px',
              border: '1px solid rgba(245, 158, 11, 0.28)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 800,
              fontFamily: 'var(--font-d)',
              color: cell === 'X' ? '#f43f5e' : '#38bdf8',
              textShadow: cell === 'X' ? '0 0 10px rgba(244, 63, 94, 0.6)' : '0 0 10px rgba(56, 189, 248, 0.6)',
            }}
          >
            {cell}
          </div>
        ))}
        {/* Diagonal winning strike line */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '-8%',
            width: '116%',
            height: '3px',
            background: 'linear-gradient(90deg, #f43f5e, #fbbf24)',
            boxShadow: '0 0 12px #fbbf24',
            transform: 'rotate(45deg)',
            borderRadius: '999px',
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(0,0,0,0.4)', padding: '0.35rem 0.55rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.62rem', fontFamily: 'var(--font-m)' }}>
        <span style={{ color: '#f43f5e', fontWeight: 700 }}>PLAYER X: 04</span>
        <span style={{ color: '#cbd5e1' }}>TIES: 02</span>
        <span style={{ color: '#38bdf8', fontWeight: 700 }}>PLAYER O: 03</span>
      </div>
    </div>
  );
}

function RpsCardUI() {
  return (
    <div style={{ padding: '0.85rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-m)', color: '#f472b6', background: 'rgba(236, 72, 153, 0.18)', padding: '0.15rem 0.45rem', borderRadius: '6px' }}>
          VS COMPUTER
        </span>
        <span style={{ fontSize: '0.6rem', background: '#ec4899', color: '#fff', padding: '0.12rem 0.4rem', borderRadius: '4px', fontWeight: 700 }}>
          ROUND 5
        </span>
      </div>

      {/* 3 Game Tokens */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.55rem', margin: '0.35rem 0' }}>
        {[
          { emoji: '🪨', label: 'ROCK', color: '#e2e8f0', active: true },
          { emoji: '📄', label: 'PAPER', color: '#a5b4fc', active: false },
          { emoji: '✂️', label: 'SCISSORS', color: '#f472b6', active: false },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              padding: '0.55rem 0.4rem',
              borderRadius: '12px',
              textAlign: 'center',
              background: item.active ? 'rgba(236, 72, 153, 0.28)' : 'rgba(0, 0, 0, 0.45)',
              border: item.active ? '1.5px solid #ec4899' : '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: item.active ? '0 0 16px rgba(236, 72, 153, 0.4)' : 'none',
              transform: item.active ? 'scale(1.08)' : 'scale(1)',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ fontSize: '1.35rem' }}>{item.emoji}</div>
            <div style={{ fontSize: '0.54rem', color: item.color, fontFamily: 'var(--font-m)', marginTop: '0.15rem', fontWeight: 700 }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* Score status */}
      <div style={{ background: 'rgba(0, 0, 0, 0.45)', padding: '0.4rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', fontFamily: 'var(--font-m)' }}>
        <span style={{ color: '#f472b6', fontWeight: 700 }}>YOU: 3 WINS</span>
        <span style={{ color: '#94a3b8' }}>COMPUTER: RANDOM</span>
        <span style={{ color: '#4ade80', fontWeight: 700 }}>CPU: 2 WINS</span>
      </div>

      <div style={{ textAlign: 'center', fontSize: '0.62rem', color: '#4ade80', fontWeight: 700, fontFamily: 'var(--font-m)' }}>
        ✨ YOU CHOSE ROCK · CPU CHOSE SCISSORS → YOU WIN!
      </div>
    </div>
  );
}

function ElectricityBillingCardUI() {
  return (
    <div style={{ padding: '0.85rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.64rem', fontFamily: 'var(--font-m)', color: '#a5b4fc', background: 'rgba(129, 140, 248, 0.18)', padding: '0.15rem 0.45rem', borderRadius: '6px', fontWeight: 600 }}>
          JAVA SWING // AWT
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.62rem', color: '#facc15', fontFamily: 'var(--font-m)' }}>
          <Zap size={11} color="#facc15" />
          METER #E-8924
        </span>
      </div>

      {/* Desktop Utility Billing Invoice Simulation */}
      <div style={{ background: 'rgba(0, 0, 0, 0.55)', padding: '0.5rem', borderRadius: '10px', border: '1px solid rgba(129, 140, 248, 0.28)', margin: '0.2rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.3rem', marginBottom: '0.35rem' }}>
          <div>
            <div style={{ fontSize: '0.54rem', color: '#94a3b8', fontFamily: 'var(--font-m)' }}>CONSUMER ACCOUNT</div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#f8fafc' }}>Manya K. #4082</div>
          </div>
          <span style={{ fontSize: '0.55rem', background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '0.1rem 0.35rem', borderRadius: '4px', fontWeight: 700, fontFamily: 'var(--font-m)' }}>
            ACTIVE
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem', background: 'rgba(0, 0, 0, 0.35)', padding: '0.35rem', borderRadius: '6px' }}>
          <div>
            <div style={{ fontSize: '0.52rem', color: '#94a3b8', fontFamily: 'var(--font-m)' }}>UNITS CONSUMED</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#a5b4fc', fontFamily: 'var(--font-m)' }}>342 kWh</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.52rem', color: '#94a3b8', fontFamily: 'var(--font-m)' }}>NET PAYABLE</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#facc15', fontFamily: 'var(--font-m)' }}>₹2,480.00</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.52rem', color: '#cbd5e1', fontFamily: 'var(--font-m)', marginTop: '0.3rem' }}>
          <span>Tariff: Commercial</span>
          <span>Due: 15 Oct</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: '#a5b4fc', fontFamily: 'var(--font-m)' }}>
        <span>MySQL Database</span>
        <span>Bill Auto-Generate</span>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   MASTER LABS DATA (Simplified Authentic Projects)
   ═════════════════════════════════════════════════════════════════════ */

const LABS = [
  {
    id: 'weather',
    title: 'Weather App',
    badge: 'OpenWeather API',
    desc: 'Real-time weather application built with JavaScript and OpenWeather API, featuring dynamic condition icons, temperature readouts, and an interactive UI.',
    icon: CloudSun,
    color: '#38bdf8',
    cardGradient: 'linear-gradient(165deg, #0f1f38 0%, #1e3a5f 45%, #0d1527 100%)',
    stack: ['JavaScript', 'OpenWeather API', 'CSS'],
    demo: 'https://weather-app-iota-brown-71.vercel.app/',
    github: 'https://github.com/Manya22Kes/Weather-App',
    previewComponent: WeatherCardUI,
  },
  {
    id: 'urlShortener',
    title: 'URL Shortener',
    badge: 'Node.js & MongoDB',
    desc: 'Link shortening web app built with Node.js and Express using server-side rendering, MongoDB storage, and an analytics table tracking link clicks.',
    icon: Link2,
    color: '#a855f7',
    cardGradient: 'linear-gradient(165deg, #1f102e 0%, #351a4f 45%, #12081d 100%)',
    stack: ['Node.js', 'Express', 'MongoDB', 'EJS'],
    demo: 'https://url-shortener-d6jy.onrender.com/',
    github: 'https://github.com/Manya22Kes/url-shortener',
    previewComponent: UrlShortenerCardUI,
  },
  {
    id: 'currency',
    title: 'Currency Converter',
    badge: 'ExchangeRate API',
    desc: 'Real-time currency converter that fetches live foreign exchange rates from an online API to convert values across global currencies.',
    icon: DollarSign,
    color: '#10b981',
    cardGradient: 'linear-gradient(165deg, #0a261d 0%, #134e3a 45%, #051a13 100%)',
    stack: ['JavaScript', 'Online API', 'CSS'],
    demo: '#',
    github: 'https://github.com/Manya22Kes/Currency-Converter',
    previewComponent: CurrencyCardUI,
  },
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe Game',
    badge: 'Vanilla JavaScript',
    desc: 'Classic 2-player Tic Tac Toe web game with turn switching, win condition checking, score tracking, and instant board reset.',
    icon: Grid,
    color: '#f59e0b',
    cardGradient: 'linear-gradient(165deg, #2b1419 0%, #4f1d2a 45%, #1c0a10 100%)',
    stack: ['JavaScript', 'HTML5', 'CSS'],
    demo: '#',
    github: 'https://github.com/Manya22Kes/Tic-Tac-Toe',
    previewComponent: TicTacToeCardUI,
  },
  {
    id: 'rps',
    title: 'Rock Paper Scissors',
    badge: 'JavaScript Game',
    desc: 'Interactive game against the computer with randomized computer choices, player move selection, live score counter, and round feedback.',
    icon: Play,
    color: '#ec4899',
    cardGradient: 'linear-gradient(165deg, #2e1022 0%, #54193d 45%, #1a0815 100%)',
    stack: ['JavaScript', 'HTML5', 'CSS'],
    demo: '#',
    github: 'https://github.com/Manya22Kes/Rock-Paper-Scissors',
    previewComponent: RpsCardUI,
  },
  {
    id: 'electricity',
    title: 'Electricity Billing System',
    badge: 'Desktop App',
    desc: 'Automated desktop billing and consumer management system built with Java Swing and AWT for meter reading records, tariff computations, and payment receipts.',
    icon: Zap,
    color: '#818cf8',
    cardGradient: 'linear-gradient(165deg, #141738 0%, #242966 45%, #0b0d21 100%)',
    stack: ['Java', 'Java Swing', 'AWT', 'MySQL'],
    demo: '#',
    github: 'https://github.com/Manya22Kes/Electricity-Billing-System.git',
    previewComponent: ElectricityBillingCardUI,
  },
];

/* ═════════════════════════════════════════════════════════════════════
   3D PERSPECTIVE STACK CONFIGURATION (EXACT MATCH TO REFERENCE PHOTO)
   6 Cards in symmetrical chevron/fan convergence:
   - Center two cards (2 & 3) tilt inward into the center seam (V-shape)
   - Outer cards tuck cleanly behind their inner neighbor
   - Pure zIndex layering without polygon intersection slicing
   ═════════════════════════════════════════════════════════════════════ */
const STACK_CONFIGS = [
  // Card 0: Weather App (far left, flat, tucked behind card 1)
  { x: -360, rotateY: 0,   scale: 0.88, zIndex: 10 },
  // Card 1: URL Shortener (mid left, subtle inward tilt, tucked behind card 2)
  { x: -230, rotateY: 8,   scale: 0.94, zIndex: 20 },
  // Card 2: Currency Converter (center left, inward tilt, front of left side)
  { x: -95,  rotateY: 24,  scale: 1.0,  zIndex: 30 },
  // Card 3: Tic Tac Toe (center right, inward tilt, front of right side)
  { x: 95,   rotateY: -24, scale: 1.0,  zIndex: 30 },
  // Card 4: Rock Paper Scissors (mid right, subtle inward tilt, tucked behind card 3)
  { x: 230,  rotateY: -8,  scale: 0.94, zIndex: 20 },
  // Card 5: Markdown Previewer (far right, flat, tucked behind card 4)
  { x: 360,  rotateY: 0,   scale: 0.88, zIndex: 10 },
];

export default function LabsWorkshop({ theme = 'dark' }) {
  const isDark = theme === 'dark';
  // viewMode: 'stack' (default 3D perspective fan like reference picture) | 'grid' (original multi-column layout before edit)
  const [viewMode, setViewMode] = useState('stack');
  const [hoveredIdx, setHoveredIdx] = useState(null);
  // unstackedCards: Set of card indexes that are pulled out/unstacked in place with motion
  const [unstackedCards, setUnstackedCards] = useState(new Set());
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute responsive spread multiplier for smaller screens
  const spreadScale = Math.min(1, Math.max(0.25, (windowWidth - 70) / 1100));

  // Selecting an individual card from the 3D stack fan pulls out/tucks that card in its place with motion
  const handleStackCardClick = (idx) => {
    playCardSound();
    setUnstackedCards((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  // Keep master toggle button intact to stack and unstack all at once (spreading into grid / folding into 3D stack)
  const toggleViewMode = () => {
    playAsmrKeyboardClick('spacebar');
    setViewMode((prev) => (prev === 'stack' ? 'grid' : 'stack'));
  };

  return (
    <section id="labs" style={{ overflow: 'hidden' }}>
      <div className="section-container">
        {/* Section Header with Mode Toggle & Unstack Controls */}
        <div
          style={{
            marginBottom: '2.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.9rem' }}>
              <SectionAsterisk size={42} theme={theme} />
              <div className="section-tag" style={{ margin: 0 }}>
                Experiments &amp; Prototypes
              </div>
            </div>
            <h2 className="section-title">
              DEVELOPER'S <ItalicFlipWord text="Workshop" />
            </h2>
            <p className="section-desc" style={{ maxWidth: '640px', marginBottom: 0 }}>
              Practical utility tools, API integrations, and interactive logic projects built with JavaScript and Node.js.
            </p>
            {viewMode === 'stack' && (
              <div
                className="workshop-tip-pill hex-chamfer-pill"
                style={{
                  marginTop: '0.65rem',
                }}
              >
                <span>💡 Click any card in the fan to pull it out in place · Click again to fold back</span>
              </div>
            )}
          </div>

          {/* View Mode Toggle Button & Individual Reset Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            {viewMode === 'stack' && unstackedCards.size > 0 && (
              <button
                onClick={() => {
                  playAsmrKeyboardClick('creamy');
                  setUnstackedCards(new Set());
                }}
                className="workshop-stage-control-btn hex-chamfer-pill"
                style={{
                  padding: '0.45rem 0.95rem',
                  fontSize: '0.78rem',
                  gap: '0.35rem',
                }}
                title="Tuck all unstacked cards back into the 3D fan"
              >
                <span>↩ Fold All ({unstackedCards.size})</span>
              </button>
            )}

            <button
              onClick={toggleViewMode}
              className="workshop-stage-control-btn hex-chamfer-pill"
              style={{
                padding: '0.45rem 1.15rem',
                fontSize: '0.8rem',
                gap: '0.5rem',
              }}
              title={viewMode === 'stack' ? 'Spread cards into full grid layout' : 'Fold cards into 3D perspective stack'}
            >
              {viewMode === 'stack' ? (
                <>
                  <Grid size={14} />
                  <span>🃏 Spread into Grid</span>
                </>
              ) : (
                <>
                  <Layers size={14} />
                  <span>🗂️ 3D Stack View</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Presentation Stage: 3D Stack OR Spread Grid */}
        <AnimatePresence mode="wait">
          {viewMode === 'stack' ? (
            /* ════════════════════════════════════════════════════════════════
               MODE 1: 3D PERSPECTIVE STACK (WITH INDIVIDUAL PULL-OUT MOTION)
               ════════════════════════════════════════════════════════════════ */
            <motion.div
              key="stack-mode"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, filter: 'blur(4px)' }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="workshop-stage-3d">
                {LABS.map((lab, idx) => {
                  const PreviewComponent = lab.previewComponent;
                  const cfg = STACK_CONFIGS[idx];
                  const isUnstacked = unstackedCards.has(idx);
                  const isHovered = hoveredIdx === idx;

                  let targetX = cfg.x * spreadScale;
                  let targetY = isUnstacked
                    ? (isHovered ? -54 : -46)
                    : (isHovered ? -20 : [0, -9, 0]);
                  let targetRotateY = isUnstacked
                    ? 0
                    : (isHovered ? cfg.rotateY * 0.35 : cfg.rotateY);
                  let targetScale = isUnstacked
                    ? (isHovered ? cfg.scale * 1.15 : cfg.scale * 1.1)
                    : (isHovered ? cfg.scale * 1.08 : cfg.scale);
                  let cardZIndex = isUnstacked
                    ? (isHovered ? 100 : 80 + idx)
                    : (isHovered ? 60 : cfg.zIndex);

                  const cardTransition = {
                    x: { type: 'spring', stiffness: 130, damping: 17, mass: 0.85 },
                    rotateY: { type: 'spring', stiffness: 130, damping: 17, mass: 0.85 },
                    scale: { type: 'spring', stiffness: 130, damping: 17, mass: 0.85 },
                    y: (isHovered || isUnstacked)
                      ? { type: 'spring', stiffness: 130, damping: 17, mass: 0.85 }
                      : {
                          repeat: Infinity,
                          duration: 3.2,
                          ease: 'easeInOut',
                          delay: idx * 0.42,
                        },
                  };

                  return (
                    <motion.div
                      key={lab.id}
                      className="workshop-card-3d interactive"
                      role="button"
                      tabIndex={0}
                      aria-label={`Workshop project: ${lab.title}. Click to pull out or fold card.`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleStackCardClick(idx);
                        }
                      }}
                      initial={false}
                      animate={{
                        x: targetX,
                        y: targetY,
                        rotateY: targetRotateY,
                        scale: targetScale,
                      }}
                      transition={cardTransition}
                      style={{
                        zIndex: cardZIndex,
                        background: isDark
                          ? lab.cardGradient
                          : 'linear-gradient(155deg, #f2dec5 0%, #e4c59e 60%, #d8b688 100%)',
                        border: isUnstacked
                          ? `2px solid ${lab.color}`
                          : isHovered
                          ? `2px solid ${lab.color}`
                          : `1.5px solid ${lab.color}${isDark ? '85' : '95'}`,
                        boxShadow: isUnstacked
                          ? `0 35px 85px -12px ${lab.color}90, 0 0 45px ${lab.color}55, inset 0 1px 0 rgba(255, 255, 255, 0.45)`
                          : isHovered
                          ? `0 30px 80px -15px ${lab.color}70, 0 0 35px ${lab.color}50, inset 0 1px 0 rgba(255, 255, 255, 0.4)`
                          : isDark
                          ? `0 25px 65px -12px rgba(0, 0, 0, 0.75), 0 0 25px ${lab.color}35, inset 0 1px 0 rgba(255, 231, 231, 0.15)`
                          : `0 16px 40px -10px ${lab.color}35, 0 0 20px ${lab.color}25, inset 0 1px 0 rgba(255, 255, 255, 0.45)`,
                      }}
                      onClick={() => handleStackCardClick(idx)}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      {/* Visual Card Face */}
                      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        {/* Top Glassy Pill with Project Badge & Icon */}
                        <div
                          style={{
                            padding: '0.65rem 0.85rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            background: isDark ? 'rgba(0, 0, 0, 0.38)' : 'rgba(255, 255, 255, 0.52)',
                            backdropFilter: 'blur(10px)',
                            borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(128, 61, 59, 0.18)',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                            <div
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '8px',
                                background: `${lab.color}25`,
                                border: `1px solid ${lab.color}60`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: lab.color,
                              }}
                            >
                              <lab.icon size={13} />
                            </div>
                            <span
                              style={{
                                fontSize: '0.66rem',
                                fontFamily: 'var(--font-m)',
                                fontWeight: 700,
                                color: isDark ? '#ffffff' : lab.color,
                                letterSpacing: '0.04em',
                              }}
                            >
                              {lab.badge.toUpperCase()}
                            </span>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            {isUnstacked && (
                              <span
                                style={{
                                  fontSize: '0.56rem',
                                  fontFamily: 'var(--font-m)',
                                  fontWeight: 700,
                                  padding: '0.1rem 0.38rem',
                                  borderRadius: '999px',
                                  background: `${lab.color}25`,
                                  color: isDark ? '#ffffff' : '#322c2b',
                                  border: `1px solid ${lab.color}70`,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.2rem',
                                }}
                              >
                                <span
                                  style={{
                                    width: 4,
                                    height: 4,
                                    borderRadius: '50%',
                                    background: lab.color,
                                    boxShadow: `0 0 5px ${lab.color}`,
                                  }}
                                />
                                ACTIVE
                              </span>
                            )}
                            <span
                              style={{
                                fontSize: '0.68rem',
                                fontFamily: 'var(--font-m)',
                                color: isDark ? 'rgba(255, 255, 255, 0.45)' : '#803d3b',
                                fontWeight: 700,
                              }}
                            >
                              0{idx + 1}
                            </span>
                          </div>
                        </div>

                        {/* Center: Dedicated Project Application UI Preview */}
                        <div
                          style={{
                            flex: 1,
                            position: 'relative',
                            overflow: 'hidden',
                            ...(isDark ? {} : {
                              background: 'linear-gradient(160deg, #150c18 0%, #0d0610 100%)',
                              borderRadius: '12px',
                              margin: '0.35rem 0.55rem',
                              border: '1px solid rgba(128, 61, 59, 0.18)',
                              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 4px 15px rgba(0, 0, 0, 0.15)',
                            })
                          }}
                        >
                          <PreviewComponent accentColor={lab.color} />
                        </div>

                        {/* Bottom Glassy Drawer: Project Title & Quick Expand Hint or Active Controls */}
                        <div
                          style={{
                            padding: '0.65rem 0.85rem',
                            background: isDark ? 'rgba(0, 0, 0, 0.62)' : 'rgba(255, 255, 255, 0.55)',
                            backdropFilter: 'blur(12px)',
                            borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(128, 61, 59, 0.18)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}
                        >
                          <div
                            style={{
                              fontSize: '0.86rem',
                              fontWeight: 700,
                              color: isDark ? '#ffffff' : '#322c2b',
                              fontFamily: 'var(--font-d)',
                              lineHeight: 1.2,
                              marginBottom: isUnstacked ? '0.2rem' : '0.15rem',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {lab.title}
                          </div>

                          {isUnstacked ? (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                marginTop: '0.2rem',
                              }}
                            >
                              {lab.demo !== '#' && (
                                <a
                                  href={lab.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  style={{
                                    padding: '0.22rem 0.55rem',
                                    fontSize: '0.64rem',
                                    fontFamily: 'var(--font-m)',
                                    fontWeight: 700,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    borderRadius: '999px',
                                    color: '#ffffff',
                                    background: 'linear-gradient(135deg, var(--wine), var(--rose-taupe))',
                                    border: 'none',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 8px rgba(148, 78, 99, 0.4)',
                                  }}
                                >
                                  <span>Demo</span>
                                  <ExternalLink size={9} />
                                </a>
                              )}
                              <a
                                href={lab.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                  padding: '0.22rem 0.55rem',
                                  fontSize: '0.64rem',
                                  fontFamily: 'var(--font-m)',
                                  fontWeight: 700,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  borderRadius: '999px',
                                  color: isDark ? '#ffe7e7' : 'var(--wine)',
                                  background: isDark ? 'rgba(255, 231, 231, 0.12)' : '#ffffff',
                                  border: isDark ? '1px solid rgba(180, 123, 132, 0.45)' : '1.5px solid rgba(148, 78, 99, 0.35)',
                                  textDecoration: 'none',
                                  cursor: 'pointer',
                                }}
                              >
                                <GithubIcon size={10} />
                                <span>Code</span>
                              </a>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStackCardClick(idx);
                                }}
                                style={{
                                  marginLeft: 'auto',
                                  padding: '0.2rem 0.48rem',
                                  fontSize: '0.6rem',
                                  fontFamily: 'var(--font-m)',
                                  fontWeight: 600,
                                  borderRadius: '999px',
                                  color: isDark ? 'rgba(255, 255, 255, 0.8)' : '#4a1525',
                                  background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(148, 78, 99, 0.12)',
                                  border: isDark ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(148, 78, 99, 0.28)',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.2rem',
                                }}
                                title="Tuck back into stack"
                              >
                                ✕ Fold
                              </button>
                            </div>
                          ) : (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}
                            >
                              <span
                                style={{
                                  fontSize: '0.64rem',
                                  fontFamily: 'var(--font-m)',
                                  color: lab.color,
                                  fontWeight: 600,
                                }}
                              >
                                {lab.stack[0]} · {lab.stack[1]}
                              </span>

                              <span
                                style={{
                                  fontSize: '0.62rem',
                                  color: isDark ? '#ffe7e7' : 'var(--wine)',
                                  fontFamily: 'var(--font-m)',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  fontWeight: 600,
                                }}
                              >
                                <span>Pull Out</span> ↗
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* ════════════════════════════════════════════════════════════════
               MODE 2: EXPANDED GRID LAYOUT (WHERE IT WAS BEFORE EDITING)
               With Warm Porcelain in Studio & Glowing Colored Borders on All Cards
               ════════════════════════════════════════════════════════════════ */
            <motion.div
              key="grid-mode"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="workshop-grid-layout">
                {LABS.map((lab, idx) => {
                  const PreviewComponent = lab.previewComponent;

                  return (
                    <motion.div
                      key={lab.id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: idx * 0.06 }}
                      className="workshop-grid-card interactive"
                      role="button"
                      tabIndex={0}
                      onClick={() => playCardSound()}
                      style={{
                        animationDelay: `${idx * 0.25}s`,
                        background: isDark
                          ? lab.cardGradient
                          : 'linear-gradient(155deg, #f2dec5 0%, #e4c59e 60%, #d8b688 100%)',
                        border: `1.5px solid ${lab.color}`,
                        boxShadow: isDark
                          ? `0 16px 45px -10px rgba(0, 0, 0, 0.75), 0 0 22px ${lab.color}30, inset 0 1px 0 rgba(255, 231, 231, 0.15)`
                          : `0 14px 35px -8px ${lab.color}25, 0 0 18px ${lab.color}18, inset 0 1px 0 rgba(255, 255, 255, 0.45)`,
                      }}
                    >
                      {/* Top Header Pill with Icon & Badge */}
                      <div
                        style={{
                          padding: '0.75rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          background: isDark ? 'rgba(0, 0, 0, 0.42)' : 'rgba(255, 255, 255, 0.52)',
                          backdropFilter: 'blur(10px)',
                          borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(128, 61, 59, 0.18)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div
                            style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '8px',
                              background: `${lab.color}22`,
                              border: `1px solid ${lab.color}60`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: lab.color,
                            }}
                          >
                            <lab.icon size={14} />
                          </div>
                          <span
                            style={{
                              fontSize: '0.68rem',
                              fontFamily: 'var(--font-m)',
                              fontWeight: 700,
                              color: isDark ? '#ffffff' : lab.color,
                              letterSpacing: '0.04em',
                            }}
                          >
                            {lab.badge.toUpperCase()}
                          </span>
                        </div>

                        <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-m)', color: isDark ? 'rgba(255, 255, 255, 0.45)' : '#803d3b', fontWeight: 700 }}>
                          0{idx + 1}
                        </span>
                      </div>

                      {/* Center: Dedicated Project Application UI Preview */}
                      <div
                        style={{
                          height: '195px',
                          position: 'relative',
                          overflow: 'hidden',
                          ...(isDark ? {} : {
                            background: 'linear-gradient(160deg, #150c18 0%, #0d0610 100%)',
                            borderRadius: '12px',
                            margin: '0.4rem 0.75rem',
                            border: '1px solid rgba(128, 61, 59, 0.18)',
                            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 4px 15px rgba(0, 0, 0, 0.15)',
                          })
                        }}
                      >
                        <PreviewComponent accentColor={lab.color} />
                      </div>

                      {/* Bottom Info: Title, Description, Stack Pills & Action Buttons */}
                      <div
                        style={{
                          padding: '1.25rem 1.4rem',
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1,
                          justifyContent: 'space-between',
                          background: isDark ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.55)',
                          borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(128, 61, 59, 0.18)',
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                            <h3
                              style={{
                                fontSize: '1.15rem',
                                fontWeight: 700,
                                color: isDark ? '#ffffff' : '#322c2b',
                                fontFamily: 'var(--font-d)',
                                lineHeight: 1.3,
                                margin: 0,
                              }}
                            >
                              {lab.title}
                            </h3>
                          </div>

                          <p
                            style={{
                              fontSize: '0.82rem',
                              color: isDark ? '#cbd5e1' : '#322c2b',
                              lineHeight: 1.6,
                              marginBottom: '1rem',
                            }}
                          >
                            {lab.desc}
                          </p>

                          {/* Tech Stack Pills */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.2rem' }}>
                            {lab.stack.map((t) => (
                              <span
                                key={t}
                                style={{
                                  fontSize: '0.68rem',
                                  fontFamily: 'var(--font-m)',
                                  color: isDark ? '#ffe7e7' : '#322c2b',
                                  background: isDark ? 'rgba(255, 231, 231, 0.08)' : 'rgba(255, 255, 255, 0.7)',
                                  border: isDark ? '1px solid rgba(180, 123, 132, 0.28)' : '1px solid rgba(128, 61, 59, 0.25)',
                                  padding: '0.18rem 0.55rem',
                                  borderRadius: '999px',
                                  fontWeight: 600,
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Links (Live & Repo) */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.65rem',
                            paddingTop: '0.75rem',
                            borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(128, 61, 59, 0.14)',
                          }}
                        >
                          {lab.demo !== '#' && (
                            <a
                              href={lab.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                padding: '0.45rem 1rem',
                                fontSize: '0.76rem',
                                fontFamily: 'var(--font-m)',
                                fontWeight: 600,
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.45rem',
                                borderRadius: '999px',
                                color: '#ffffff',
                                background: 'linear-gradient(135deg, var(--wine), var(--rose-taupe))',
                                border: 'none',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(148, 78, 99, 0.35)',
                                transition: 'all 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(148, 78, 99, 0.55)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(148, 78, 99, 0.35)';
                              }}
                            >
                              <span>Live Demo</span>
                              <ExternalLink size={12} />
                            </a>
                          )}
                          <a
                            href={lab.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '0.45rem 1rem',
                              fontSize: '0.76rem',
                              fontFamily: 'var(--font-m)',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.45rem',
                              borderRadius: '999px',
                              color: isDark ? '#ffe7e7' : 'var(--wine)',
                              background: isDark ? 'rgba(255, 231, 231, 0.08)' : '#ffffff',
                              border: isDark ? '1px solid rgba(180, 123, 132, 0.38)' : '1.5px solid rgba(148, 78, 99, 0.3)',
                              textDecoration: 'none',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = isDark ? 'rgba(255, 231, 231, 0.18)' : 'rgba(148, 78, 99, 0.12)';
                              e.currentTarget.style.borderColor = isDark ? '#ffffff' : 'var(--wine)';
                              e.currentTarget.style.color = isDark ? '#ffffff' : 'var(--wine)';
                              e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = isDark ? 'rgba(255, 231, 231, 0.08)' : '#ffffff';
                              e.currentTarget.style.borderColor = isDark ? 'rgba(180, 123, 132, 0.38)' : '1.5px solid rgba(148, 78, 99, 0.3)';
                              e.currentTarget.style.color = isDark ? '#ffe7e7' : 'var(--wine)';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            <GithubIcon size={13} />
                            <span>Code</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
