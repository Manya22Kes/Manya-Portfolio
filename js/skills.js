/* skills.js — Tab switching for skill ecosystem */
(function () {
  const tabs   = document.querySelectorAll('.skill-tab');
  const panels = document.querySelectorAll('.skills-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t)   => t.classList.remove('active'));
      panels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) {
        target.classList.add('active');
        // Re-trigger node animations
        target.querySelectorAll('.skill-node').forEach((node, i) => {
          node.style.animation = 'none';
          node.offsetHeight; // reflow
          node.style.animation = `nodeEnter 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s both`;
        });
      }
    });
  });
})();
