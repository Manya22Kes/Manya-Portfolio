import React, { useEffect, useState, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShaderGradientCanvas from './components/canvas/ShaderGradientCanvas';
import Preloader from './components/layout/Preloader';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import FlagshipProjects from './components/sections/FlagshipProjects';
import SkillsBento from './components/sections/SkillsBento';
import ApproachSection from './components/sections/ApproachSection';
import ExperienceTimeline from './components/sections/ExperienceTimeline';
import LabsWorkshop from './components/sections/LabsWorkshop';
import AchievementsGrid from './components/sections/AchievementsGrid';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/layout/Footer';
import CaseStudyModal from './components/modals/CaseStudyModal';
import CrtPowerOnReveal from './components/ui/CrtPowerOnReveal';
import { setupGlobalSoundListener } from './utils/soundEffects';

const THEME_STORAGE_KEY = 'manya_portfolio_theme_v4';

export default function App() {
  // Initialize global tactile micro-sounds listener (click and tap on buttons, links, cards)
  useEffect(() => {
    const cleanup = setupGlobalSoundListener();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [siteRevealed, setSiteRevealed] = useState(false);
  // CRT Power-On Trigger: Numeric counter incremented ONLY on initial load completion (or refresh) and on theme toggle
  const [crtTrigger, setCrtTrigger] = useState(0);

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      // Strictly default to 'dark' (Velvet Obsidian)
      return saved === 'light' ? 'light' : 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  // Sync document element attributes whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.style.colorScheme = 'light';
    }
  }, [theme]);

  const [isThemeSwitching, setIsThemeSwitching] = useState(false);

  const toggleTheme = () => {
    if (isThemeSwitching) return;
    setIsThemeSwitching(true);

    const next = theme === 'light' ? 'dark' : 'light';

    // Step 1: Fire CRT static tech cathode ray beam immediately
    setCrtTrigger((prev) => prev + 1);

    // Step 2: Delay actual mode switch to bloom (320ms)
    // The screen is enveloped in glowing phosphor energy, so the DOM and CSS variables flip seamlessly
    setTimeout(() => {
      setTheme(next);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch (e) {}
    }, 320);

    // Step 3: Unlock after CRT static sequence finishes (980ms)
    setTimeout(() => {
      setIsThemeSwitching(false);
    }, 980);
  };

  const handlePreloaderComplete = () => {
    setLoadingComplete(true);
    // Trigger CRT static tech power-on sequence ONLY once on initial page load / refresh
    setCrtTrigger(1);
    // Backup reveal: ensure content becomes visible even if CRT effect is delayed
    setTimeout(() => {
      setSiteRevealed(true);
    }, 850);
  };

  const handleCrtComplete = useCallback(() => {
    // Unveil website entrance promptly as static tech blooms
    setSiteRevealed(true);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  // Master safety guard: under no circumstances can the site remain unrevealed
  useEffect(() => {
    const masterSafety = setTimeout(() => {
      setLoadingComplete(true);
      setSiteRevealed(true);
      ScrollTrigger.refresh();
    }, 4500);
    return () => clearTimeout(masterSafety);
  }, []);

  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  // Pause Lenis smooth scroll and prevent background page movement while modal is open
  useEffect(() => {
    if (activeModalProject) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [activeModalProject]);

  return (
    <div className="app-container" data-theme={theme}>
      {/* Molten Dripping Gold MK Preloader */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Retro-Futuristic Tech CRT Screen Power-On Reveal (Only on load/refresh and theme switch) */}
      <CrtPowerOnReveal triggerCount={crtTrigger} theme={theme} onComplete={handleCrtComplete} />

      {/* 3D WebGL ShaderGradient Background Canvas (No blurry corners) */}
      <ShaderGradientCanvas theme={theme} />

      {/* Subtle Noise Texture */}
      <div className="noise-texture" />

      {/* Floating Glass Navigation with Theme Toggle */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} siteRevealed={siteRevealed} />

      {/* Main Flow */}
      <main
        style={{
          opacity: siteRevealed ? 1 : 0,
          transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: siteRevealed ? 'auto' : 'none',
        }}
      >
        <HeroSection theme={theme} siteRevealed={siteRevealed} />
        <FlagshipProjects theme={theme} onOpenModal={setActiveModalProject} />
        <SkillsBento theme={theme} />
        <ApproachSection theme={theme} />
        <ExperienceTimeline theme={theme} />
        <LabsWorkshop theme={theme} />
        <AchievementsGrid theme={theme} />
        <ContactSection theme={theme} />
      </main>

      {/* Footer */}
      <div
        style={{
          opacity: siteRevealed ? 1 : 0,
          transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: siteRevealed ? 'auto' : 'none',
        }}
      >
        <Footer theme={theme} />
      </div>

      {/* Deep Dive Case Study Spatial Glass Modal */}
      {activeModalProject && (
        <CaseStudyModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </div>
  );
}
