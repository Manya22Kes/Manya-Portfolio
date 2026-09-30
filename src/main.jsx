import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// TypeGPU-Inspired Real-Time Specular Refraction Mouse Tracking
if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      const target = e.target.closest(
        '.jelly-glass-btn, .btn-primary, .btn-secondary, .badge-pill, .nav-node-brand, .nav-node-links, .nav-node-actions, .hero-metrics-pill, .capability-chip, .filter-chip, .spotlight-card'
      );
      if (target) {
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        target.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }
    },
    { passive: true }
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
