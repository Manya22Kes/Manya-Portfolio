/**
 * Tactile ASMR Sound Engine for Manya's Portfolio
 * Powered by Manya's uploaded custom recordings:
 * 1. Keystroke typing: '/assets/sound/virtualzero-keyboard-typing-fast-371229.mp3'
 * 2. Card mixing / shuffling: '/assets/sound/freesound_community-card-mixing-48088.mp3'
 *
 * Slices the recordings into clean, isolated transients with smooth cosine fade tails,
 * producing authentic physical keyboard clicks for buttons/nav and realistic card-mixing
 * sounds for Flagship project cards and Developer's Workshop 3D cards!
 */

let audioCtx = null;
const STORAGE_KEY = 'manya_portfolio_audio_muted_v2';
const KEYBOARD_AUDIO_PATH = `${import.meta.env.BASE_URL || '/'}assets/sound/virtualzero-keyboard-typing-fast-371229.mp3`.replace(/\/\//g, '/');
const CARD_AUDIO_PATH = `${import.meta.env.BASE_URL || '/'}assets/sound/freesound_community-card-mixing-48088.mp3`.replace(/\/\//g, '/');
const CAMERA_AUDIO_PATH = `${import.meta.env.BASE_URL || '/'}assets/sound/irinairinafomicheva-camera-13695.mp3`.replace(/\/\//g, '/');

let customClickBuffers = [];
let isLoadingKeyboardAudio = false;

let cardSoundBuffers = [];
let isLoadingCardAudio = false;

let cameraAudioBuffer = null;
let isLoadingCameraAudio = false;

export function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isAudioMuted() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

export function setAudioMuted(muted) {
  try {
    localStorage.setItem(STORAGE_KEY, muted ? 'true' : 'false');
  } catch (e) {}
}

/**
 * Loads the user's uploaded typing recording and slices individual keystrokes (~82ms each)
 */
async function loadAndTrimAudio() {
  if (typeof window === 'undefined' || customClickBuffers.length > 0 || isLoadingKeyboardAudio) return;
  isLoadingKeyboardAudio = true;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const res = await fetch(KEYBOARD_AUDIO_PATH);
    if (!res.ok) return;

    const arrayBuffer = await res.arrayBuffer();
    const fullBuffer = await ctx.decodeAudioData(arrayBuffer);

    const channelData = fullBuffer.getChannelData(0);
    const sampleRate = fullBuffer.sampleRate;
    const clickLength = Math.floor(sampleRate * 0.082); // 82ms single keystroke
    const minStep = Math.floor(sampleRate * 0.11); // minimum interval between distinct keystrokes

    // Detect peak volume to dynamically adapt threshold to user's MP3 file
    let maxAmp = 0;
    for (let k = 0; k < channelData.length; k += 8) {
      const a = Math.abs(channelData[k]);
      if (a > maxAmp) maxAmp = a;
    }

    const threshold = Math.max(0.035, maxAmp * 0.32);

    const slices = [];
    let i = Math.floor(sampleRate * 0.04); // start 40ms into recording

    while (i < channelData.length - clickLength && slices.length < 12) {
      const amp = Math.abs(channelData[i]);
      if (amp > threshold) {
        // Step back 2ms to capture the initial strike attack
        const onset = Math.max(0, i - Math.floor(sampleRate * 0.002));
        const buf = ctx.createBuffer(1, clickLength, sampleRate);
        const out = buf.getChannelData(0);

        const tailFadeStart = clickLength - Math.floor(sampleRate * 0.016); // 16ms smooth cosine fade

        let slicePeak = 0;
        for (let j = 0; j < clickLength; j++) {
          const val = Math.abs(channelData[onset + j]);
          if (val > slicePeak) slicePeak = val;
        }
        const gainMult = slicePeak > 0.01 ? Math.min(2.5, 0.85 / slicePeak) : 1.0;

        for (let j = 0; j < clickLength; j++) {
          let s = channelData[onset + j] * gainMult;
          if (j > tailFadeStart) {
            const prog = (j - tailFadeStart) / (clickLength - tailFadeStart);
            s *= Math.cos(prog * Math.PI * 0.5); // cosine decay to prevent edge clipping/popping
          }
          out[j] = s;
        }

        slices.push(buf);
        i += minStep;
      } else {
        i += 24;
      }
    }

    if (slices.length > 0) {
      customClickBuffers = slices;
    }
  } catch (e) {
    // Fallback gracefully to Web Audio synthesizer if audio file cannot be loaded
  } finally {
    isLoadingKeyboardAudio = false;
  }
}

/**
 * Loads the user's uploaded card mixing recording and slices individual card handling sounds (~240ms each)
 */
async function loadAndTrimCardAudio() {
  if (typeof window === 'undefined' || cardSoundBuffers.length > 0 || isLoadingCardAudio) return;
  isLoadingCardAudio = true;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const res = await fetch(CARD_AUDIO_PATH);
    if (!res.ok) return;

    const arrayBuffer = await res.arrayBuffer();
    const fullBuffer = await ctx.decodeAudioData(arrayBuffer);

    const channelData = fullBuffer.getChannelData(0);
    const sampleRate = fullBuffer.sampleRate;
    const sliceLength = Math.floor(sampleRate * 0.24); // 240ms card shuffle/slide sound
    const minStep = Math.floor(sampleRate * 0.32); // step between card sound bursts

    let maxAmp = 0;
    for (let k = 0; k < channelData.length; k += 16) {
      const a = Math.abs(channelData[k]);
      if (a > maxAmp) maxAmp = a;
    }

    const threshold = Math.max(0.035, maxAmp * 0.25);

    const slices = [];
    let i = Math.floor(sampleRate * 0.08); // start 80ms into recording

    while (i < channelData.length - sliceLength && slices.length < 10) {
      const amp = Math.abs(channelData[i]);
      if (amp > threshold) {
        const onset = Math.max(0, i - Math.floor(sampleRate * 0.004));
        const buf = ctx.createBuffer(1, sliceLength, sampleRate);
        const out = buf.getChannelData(0);

        const tailFadeStart = sliceLength - Math.floor(sampleRate * 0.045); // 45ms cosine decay tail

        let slicePeak = 0;
        for (let j = 0; j < sliceLength; j++) {
          const val = Math.abs(channelData[onset + j]);
          if (val > slicePeak) slicePeak = val;
        }
        const gainMult = slicePeak > 0.01 ? Math.min(2.8, 0.85 / slicePeak) : 1.0;

        for (let j = 0; j < sliceLength; j++) {
          let s = channelData[onset + j] * gainMult;
          if (j > tailFadeStart) {
            const prog = (j - tailFadeStart) / (sliceLength - tailFadeStart);
            s *= Math.cos(prog * Math.PI * 0.5);
          }
          out[j] = s;
        }

        slices.push(buf);
        i += minStep;
      } else {
        i += 32;
      }
    }

    // Safety fallback: if threshold was too strict, grab 4 slices evenly across the recording
    if (slices.length === 0 && channelData.length > sliceLength * 2) {
      const step = Math.floor((channelData.length - sliceLength) / 5);
      for (let s = 1; s <= 4; s++) {
        const onset = s * step;
        const buf = ctx.createBuffer(1, sliceLength, sampleRate);
        const out = buf.getChannelData(0);
        const tailFadeStart = sliceLength - Math.floor(sampleRate * 0.045);
        for (let j = 0; j < sliceLength; j++) {
          let val = channelData[onset + j];
          if (j > tailFadeStart) {
            const prog = (j - tailFadeStart) / (sliceLength - tailFadeStart);
            val *= Math.cos(prog * Math.PI * 0.5);
          }
          out[j] = val;
        }
        slices.push(buf);
      }
    }

    if (slices.length > 0) {
      cardSoundBuffers = slices;
    }
  } catch (e) {
    // Fallback gracefully
  } finally {
    isLoadingCardAudio = false;
  }
}

/**
 * Synthesizer fallback if MP3 is still loading during initial interaction
 */
function playSynthFallback(ctx, now, type) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  const f = type === 'spacebar' ? 220 : type === 'creamy' ? 440 : 340;
  osc.frequency.setValueAtTime(f, now);
  osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);
  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.045);
}

function playCardSynthFallback(ctx, now) {
  try {
    const bufferSize = Math.floor(ctx.sampleRate * 0.14);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.05));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(1.8, now);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  } catch (e) {}
}

/**
 * Loads the user's uploaded camera recording for the Approach section cards
 */
async function loadCameraAudio() {
  if (typeof window === 'undefined' || cameraAudioBuffer || isLoadingCameraAudio) return;
  isLoadingCameraAudio = true;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const res = await fetch(CAMERA_AUDIO_PATH);
    if (!res.ok) return;

    const arrayBuffer = await res.arrayBuffer();
    const fullBuffer = await ctx.decodeAudioData(arrayBuffer);

    const channelData = fullBuffer.getChannelData(0);
    const sampleRate = fullBuffer.sampleRate;

    // Detect first audio onset to skip silence and make response instantaneous
    let onset = 0;
    for (let k = 0; k < channelData.length; k += 8) {
      if (Math.abs(channelData[k]) > 0.02) {
        onset = Math.max(0, k - Math.floor(sampleRate * 0.002));
        break;
      }
    }

    // Keep up to 340ms for a punchy, mechanical shutter click
    const maxLen = Math.min(channelData.length - onset, Math.floor(sampleRate * 0.34));
    const buf = ctx.createBuffer(1, maxLen, sampleRate);
    const out = buf.getChannelData(0);

    const tailFadeStart = maxLen - Math.floor(sampleRate * 0.04); // 40ms decay

    let peak = 0;
    for (let j = 0; j < maxLen; j++) {
      const v = Math.abs(channelData[onset + j]);
      if (v > peak) peak = v;
    }
    const gainMult = peak > 0.01 ? Math.min(2.5, 0.88 / peak) : 1.0;

    for (let j = 0; j < maxLen; j++) {
      let s = channelData[onset + j] * gainMult;
      if (j > tailFadeStart) {
        const prog = (j - tailFadeStart) / (maxLen - tailFadeStart);
        s *= Math.cos(prog * Math.PI * 0.5);
      }
      out[j] = s;
    }

    cameraAudioBuffer = buf;
  } catch (e) {
    // Fallback gracefully
  } finally {
    isLoadingCameraAudio = false;
  }
}

function playCameraSynthFallback(ctx, now) {
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.05);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.055);
  } catch (e) {}
}

let lastCameraPlayTime = 0;

/**
 * Play the user's uploaded camera shutter sound for the Approach section cards
 */
export function playApproachCameraSound() {
  if (isAudioMuted()) return;
  const nowMs = performance.now();
  if (nowMs - lastCameraPlayTime < 130) return;
  lastCameraPlayTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;

  if (cameraAudioBuffer) {
    try {
      const source = ctx.createBufferSource();
      source.buffer = cameraAudioBuffer;

      const gain = ctx.createGain();
      const rate = 0.97 + (Math.random() - 0.5) * 0.06;
      source.playbackRate.value = rate;
      gain.gain.value = 0.85;

      source.connect(gain);
      gain.connect(ctx.destination);

      source.start(now);
      return;
    } catch (e) {}
  }

  loadCameraAudio();
  playCameraSynthFallback(ctx, now);
}

let lastPlayCallTime = 0;
let lastCardPlayTime = 0;

/**
 * Play a card mixing / shuffling sound from the user's uploaded freesound recording
 */
export function playCardSound(type = 'default') {
  if (isAudioMuted()) return;
  const nowMs = performance.now();
  if (nowMs - lastCardPlayTime < 100) return;
  lastCardPlayTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;

  if (cardSoundBuffers.length > 0) {
    try {
      const randIdx = Math.floor(Math.random() * cardSoundBuffers.length);
      const chosenBuffer = cardSoundBuffers[randIdx];

      const source = ctx.createBufferSource();
      source.buffer = chosenBuffer;

      const gain = ctx.createGain();

      // Pitch variation for natural physical card touch feel
      const rate = 0.96 + (Math.random() - 0.5) * 0.12;
      const vol = 0.72;

      source.playbackRate.value = rate;
      gain.gain.value = vol;

      source.connect(gain);
      gain.connect(ctx.destination);

      source.start(now);
      return;
    } catch (e) {}
  }

  // Pre-load if not yet cached, fallback to crisp swoosh
  loadAndTrimCardAudio();
  playCardSynthFallback(ctx, now);
}

/**
 * Play a single trimmed keyboard click from the user's uploaded MP3
 */
export function playAsmrKeyboardClick(type = 'default') {
  if (isAudioMuted()) return;
  const nowMs = performance.now();
  if (nowMs - lastPlayCallTime < 28) return;
  lastPlayCallTime = nowMs;

  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const now = ctx.currentTime;

  // If trimmed buffers are ready, play a random keystroke from Manya's file!
  if (customClickBuffers.length > 0) {
    try {
      const randIdx = Math.floor(Math.random() * customClickBuffers.length);
      const chosenBuffer = customClickBuffers[randIdx];

      const source = ctx.createBufferSource();
      source.buffer = chosenBuffer;

      const gain = ctx.createGain();

      // Pitch & volume tuning
      let rate = 1.0 + (Math.random() - 0.5) * 0.08;
      let vol = 0.65;

      if (type === 'spacebar') {
        rate = 0.88; // Deeper key for primary buttons
        vol = 0.75;
      } else if (type === 'creamy') {
        rate = 1.12; // Snappy for pills / badges
        vol = 0.52;
      }

      source.playbackRate.value = rate;
      gain.gain.value = vol;

      source.connect(gain);
      gain.connect(ctx.destination);

      source.start(now);
      return;
    } catch (e) {}
  }

  // If not yet cached, start loading in background and play immediate synth fallback
  loadAndTrimAudio();
  playSynthFallback(ctx, now, type);
}

export function playAsmrDoubleKey() {
  playAsmrKeyboardClick('default');
  setTimeout(() => {
    playAsmrKeyboardClick('spacebar');
  }, 52);
}

// Aliases
export const playTactileClick = () => playAsmrKeyboardClick('default');
export const playSubtlePop = () => playAsmrKeyboardClick('creamy');
export const playToggleSound = () => playAsmrDoubleKey();
export const playFilmGateSound = () => playAsmrKeyboardClick('default');

/**
 * Global delegated click and touch listener for interactive ASMR feedback.
 * Works across both desktop and mobile touchscreens.
 */
let lastSoundTime = 0;

export function setupGlobalSoundListener() {
  if (typeof window === 'undefined') return;

  // Pre-load and trim audio tracks
  loadAndTrimAudio();
  loadAndTrimCardAudio();
  loadCameraAudio();

  const handlePointerDown = (e) => {
    // Unlock AudioContext immediately inside user gesture
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = performance.now();
    if (now - lastSoundTime < 35) return; // Debounce rapid multi-events

    const target = e.target.closest(
      'button, a, [role="button"], input[type="submit"], .badge-pill, .interactive, .tab-pill, .project-card-wrap, .project-card-inner, .workshop-grid-card, .workshop-card-3d, .workshop-stage-control-btn, .workshop-tip-pill, .approach-small-square-card, .film-horizontal-stage, .film-reel-nav-btn'
    );

    if (target) {
      lastSoundTime = now;

      // Flagship card buttons & links -> First sound (ASMR keyboard typing sound)
      const isCardButton = target.closest(
        '.project-card-wrap button, .project-card-wrap a, .project-card-inner button, .project-card-inner a, .project-btn-study, .project-btn-primary, .project-btn-secondary'
      );
      if (isCardButton) {
        if (target.classList.contains('project-btn-study') || target.classList.contains('project-btn-primary')) {
          playAsmrKeyboardClick('spacebar');
        } else {
          playAsmrKeyboardClick('default');
        }
        return;
      }

      // 1. Approach Section square cards -> User's uploaded camera shutter sound
      if (
        target.classList.contains('approach-small-square-card') ||
        target.closest('.approach-small-square-card')
      ) {
        playApproachCameraSound();
        return;
      }

      // 2. 3D stacked workshop cards & Flagship project card bodies -> Card mixing / shuffle sound
      if (
        target.classList.contains('workshop-card-3d') ||
        target.closest('.workshop-card-3d') ||
        target.classList.contains('workshop-grid-card') ||
        target.closest('.workshop-grid-card') ||
        target.classList.contains('project-card-inner') ||
        target.classList.contains('project-card-wrap')
      ) {
        if (!target.closest('a, button')) {
          playCardSound();
          return;
        }
      }

      if (
        target.classList.contains('nav-theme-toggle-btn') ||
        target.getAttribute('aria-label')?.toLowerCase().includes('theme')
      ) {
        playAsmrDoubleKey();
      } else if (
        target.classList.contains('btn-primary') ||
        target.classList.contains('nav-connect-btn') ||
        target.classList.contains('nav-resume-btn') ||
        target.classList.contains('case-study-btn')
      ) {
        playAsmrKeyboardClick('spacebar');
      } else if (
        target.classList.contains('badge-pill') ||
        target.classList.contains('capability-chip') ||
        target.classList.contains('tab-pill')
      ) {
        playAsmrKeyboardClick('creamy');
      } else {
        // Standard buttons, links, other cards
        playAsmrKeyboardClick('default');
      }
    }
  };

  let touchStartCard = null;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchHasSwiped = false;

  const handleGlobalTouchStart = (e) => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const touch = e.touches && e.touches[0];
    if (!touch) return;

    if (e.target.closest('button, a, input, [role="button"]:not(.workshop-card-3d)')) {
      touchStartCard = null;
      return;
    }

    const card = e.target.closest(
      '.project-card-wrap, .project-card-inner, .workshop-card-3d, .workshop-grid-card'
    );
    if (card) {
      touchStartCard = card;
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchHasSwiped = false;
    } else {
      touchStartCard = null;
    }
  };

  const handleGlobalTouchMove = (e) => {
    if (!touchStartCard || touchHasSwiped) return;
    const touch = e.touches && e.touches[0];
    if (!touch) return;

    const dist = Math.hypot(touch.clientX - touchStartX, touch.clientY - touchStartY);
    if (dist > 18) {
      touchHasSwiped = true;
      playCardSound();
    }
  };

  const handleGlobalTouchEnd = () => {
    touchStartCard = null;
    touchHasSwiped = false;
  };

  window.addEventListener('pointerdown', handlePointerDown, { passive: true, capture: true });
  window.addEventListener('click', handlePointerDown, { passive: true, capture: true });
  window.addEventListener('touchstart', handleGlobalTouchStart, { passive: true, capture: true });
  window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true, capture: true });
  window.addEventListener('touchend', handleGlobalTouchEnd, { passive: true, capture: true });
  window.addEventListener('touchcancel', handleGlobalTouchEnd, { passive: true, capture: true });

  return () => {
    window.removeEventListener('pointerdown', handlePointerDown, { capture: true });
    window.removeEventListener('click', handlePointerDown, { capture: true });
    window.removeEventListener('touchstart', handleGlobalTouchStart, { capture: true });
    window.removeEventListener('touchmove', handleGlobalTouchMove, { capture: true });
    window.removeEventListener('touchend', handleGlobalTouchEnd, { capture: true });
    window.removeEventListener('touchcancel', handleGlobalTouchEnd, { capture: true });
  };
}
