/* animations.js — Intersection Observer reveals + counters + scroll progress */
(function () {
  // ─── Scroll Progress ──────────────────────────────
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
  }, { passive: true });

  // ─── Reveal on Scroll ─────────────────────────────
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        // Stagger siblings within a parent
        const siblings = Array.from(e.target.parentElement.querySelectorAll('.reveal-up, .reveal-left, .reveal-right'));
        const idx = siblings.indexOf(e.target);
        e.target.style.transitionDelay = (idx * 0.08) + 's';
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach((el) => revealObs.observe(el));

  // ─── Number Counters ──────────────────────────────
  function animateCounter(el, target, duration = 1800) {
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    };
    requestAnimationFrame(update);
  }

  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.count, 10);
        animateCounter(e.target, target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count], .counter').forEach((el) => {
    const target = parseInt(el.dataset.count, 10);
    if (!isNaN(target)) counterObs.observe(el);
  });

  // ─── Navbar scroll behavior ───────────────────────
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ─── Active nav link ──────────────────────────────
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navLinks.forEach((a) => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach((s) => sectionObs.observe(s));
})();
