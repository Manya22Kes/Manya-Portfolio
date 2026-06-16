/* main.js — Loader, mobile nav, misc interactions */
(function () {
  // ─── Loader ───────────────────────────────────────
  const loader = document.getElementById('loader');
  const fill   = document.querySelector('.loader-fill');

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      fill.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('done');
        document.body.classList.remove('loading');
        // Trigger hero reveals
        document.querySelectorAll('#hero .reveal-up').forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 120);
        });
      }, 300);
    } else {
      fill.style.width = progress + '%';
    }
  }, 60);

  // ─── Mobile Menu ──────────────────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.getElementById('mobile-menu');

  toggle?.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    menu.classList.toggle('open', isOpen);
  });

  // Close on link click
  menu?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      menu.classList.remove('open');
    });
  });

  // ─── Smooth scroll offset for fixed nav ───────────
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
