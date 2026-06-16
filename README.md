# Manya Keserwani — Portfolio

A premium, multi-file portfolio website built with vanilla HTML, CSS, and JavaScript.  
Inspired by Apple, Linear, Vercel, and Stripe design aesthetics.

---

## Project Structure

```
manya-portfolio/
├── index.html              # Main HTML entry point
├── css/
│   ├── reset.css           # Box-sizing + base reset
│   ├── tokens.css          # Design tokens (colors, type, spacing)
│   ├── layout.css          # Base layout, containers, grid
│   ├── components.css      # Navbar, buttons, cursor, chips, footer
│   ├── animations.css      # Reveal animations, keyframes
│   ├── sections.css        # Per-section styles (hero → contact)
│   └── responsive.css      # Breakpoints: mobile / tablet / large
├── js/
│   ├── cursor.js           # Custom cursor + magnetic buttons
│   ├── neural.js           # Hero canvas neural network animation
│   ├── animations.js       # Scroll reveal, counters, nav highlight
│   ├── skills.js           # Skills tab switcher
│   ├── contact.js          # Contact form handler
│   └── main.js             # Loader, mobile menu, smooth scroll
└── assets/
    └── Manya_Keserwani_Resume.pdf   ← Place resume PDF here
```

---

## Setup

1. **No build step required.** Just open `index.html` in a browser.
2. **Resume:** Drop `Manya_Keserwani_Resume.pdf` into `assets/`.
3. **Profile photo:** Replace the `.photo-placeholder` div in `index.html` with an `<img>` tag pointing to `assets/images/profile.jpg`.
4. **Live links:** Search for `href="#"` in `index.html` and replace with real deployed URLs (PRISM, AUTHIFY, XPENSE).
5. **GitHub / LinkedIn links:** Search for `github.com/manya` and `linkedin.com/in/manya` and replace.
6. **Contact form:** In `js/contact.js`, replace the `setTimeout` mock with a real form handler (Formspree, EmailJS, etc.).

---

## Deploying to Vercel / Netlify

```bash
# Drag and drop the manya-portfolio/ folder into:
# https://vercel.com/new or https://app.netlify.com/drop
```

No configuration needed — it's a static site.

---

## Design System

| Token          | Value                  |
|----------------|------------------------|
| Background     | `#0D1117`              |
| Surface 1      | `#161B22`              |
| Surface 2      | `#1F2937`              |
| Accent         | `#C68A3B` (Warm Copper)|
| Accent Light   | `#E7D3A1` (Champagne)  |
| Text           | `#F5F5F5`              |
| Muted Text     | `#A8B3CF`              |
| Display Font   | Playfair Display       |
| Body Font      | Inter                  |
| Mono Font      | DM Mono                |

---

## Customization

- All colors live in `css/tokens.css` — change them in one place.
- Section content lives in `index.html` — clearly commented.
- Animations are in `css/animations.css` and `js/animations.js`.
- Add new skills by copying a `.skill-node` block in the relevant panel.
- Add new projects by copying an `<article class="project-card">` block.
