/* neural.js — Animated neural network canvas background */
(function () {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const ACCENT = '#C68A3B';
  const ACCENT_DIM = 'rgba(198,138,59,0.15)';

  let W, H, nodes = [], mouse = { x: -999, y: -999 };
  const NODE_COUNT = 55;
  const MAX_DIST = 160;

  class Node {
    constructor() { this.reset(); }
    reset() {
      this.x   = Math.random() * W;
      this.y   = Math.random() * H;
      this.vx  = (Math.random() - 0.5) * 0.4;
      this.vy  = (Math.random() - 0.5) * 0.4;
      this.r   = Math.random() * 1.5 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(198,138,59,${this.alpha})`;
      ctx.fill();
    }
  }

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function init() {
    nodes = Array.from({ length: NODE_COUNT }, () => new Node());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.3;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(198,138,59,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      // Mouse interaction
      const dx = nodes[i].x - mouse.x;
      const dy = nodes[i].y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const alpha = (1 - dist / 120) * 0.6;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(198,138,59,${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      nodes[i].update();
      nodes[i].draw();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); });
  document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  resize();
  init();
  draw();
})();
