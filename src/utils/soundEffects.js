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
const WATER_AUDIO_PATH = `${import.meta.env.BASE_URL || '/'}assets/sound/40727898-touching-the-water-176713.mp3`.replace(/\/\//g, '/');
const STATIC_AUDIO_PATH = `${import.meta.env.BASE_URL || '/'}assets/sound/universfield-tv-static-noise-152056.mp3`.replace(/\/\//g, '/');
const FILM_REEL_AUDIO_PATH = `${import.meta.env.BASE_URL || '/'}assets/sound/film-reel-tape-sound.mp3`.replace(/\/\//g, '/');
const FILM_REEL_STEPS = [
  `${import.meta.env.BASE_URL || '/'}assets/sound/film-reel-step-1.mp3`.replace(/\/\//g, '/'),
  `${import.meta.env.BASE_URL || '/'}assets/sound/film-reel-step-2.mp3`.replace(/\/\//g, '/'),
  `${import.meta.env.BASE_URL || '/'}assets/sound/film-reel-step-3.mp3`.replace(/\/\//g, '/'),
];
const WIND_CHIME_AUDIO_PATH = `${import.meta.env.BASE_URL || '/'}assets/sound/freesound_community-wind-chime-small-64660.mp3`.replace(/\/\//g, '/');

let customClickBuffers = [];
let isLoadingKeyboardAudio = false;

let cardSoundBuffers = [];
let isLoadingCardAudio = false;

let cameraAudioBuffer = null;
let isLoadingCameraAudio = false;

let waterSoundBuffers = [];
let isLoadingWaterAudio = false;

let staticAudioBuffer = null;
let isLoadingStaticAudio = false;

let filmReelBuffers = [];
let isLoadingFilmReel = false;

let windChimeBuffer = null;
let isLoadingWindChime = false;

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

// Eagerly prefetch and decode audio buffers so all sounds are ready before preloader finishes
if (typeof window !== 'undefined') {
  setTimeout(() => {
    loadStaticAudio();
    loadAndTrimAudio();
    loadAndTrimCardAudio();
    loadCameraAudio();
    loadWaterAudio();
    loadFilmReelAudio();
    loadWindChimeAudio();
  }, 10);
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
  try {
    const playTime = Math.max(now, ctx.currentTime);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    const f = type === 'spacebar' ? 240 : type === 'creamy' ? 480 : 360;
    osc.frequency.setValueAtTime(f, playTime);
    osc.frequency.exponentialRampToValueAtTime(140, playTime + 0.05);
    gain.gain.setValueAtTime(0.48, playTime);
    gain.gain.exponentialRampToValueAtTime(0.001, playTime + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(playTime);
    osc.stop(playTime + 0.055);
  } catch (e) {}
}

function playCardSynthFallback(ctx, now) {
  try {
    const playTime = Math.max(now, ctx.currentTime);
    const bufferSize = Math.floor(ctx.sampleRate * 0.16);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.06));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, playTime);
    filter.Q.setValueAtTime(1.8, playTime);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.45, playTime);
    gain.gain.exponentialRampToValueAtTime(0.001, playTime + 0.15);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(playTime);
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
  try {
    const audio = new Audio(CAMERA_AUDIO_PATH);
    audio.volume = 0.85;
    audio.play().catch(() => {
      playCameraSynthFallback(ctx, now);
    });
  } catch (e) {
    playCameraSynthFallback(ctx, now);
  }
}

/**
 * Loads the user's uploaded touching-water recording and slices individual water ripple / droplet sounds
 */
async function loadWaterAudio() {
  if (typeof window === 'undefined' || waterSoundBuffers.length > 0 || isLoadingWaterAudio) return;
  isLoadingWaterAudio = true;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const res = await fetch(WATER_AUDIO_PATH);
    if (!res.ok) return;

    const arrayBuffer = await res.arrayBuffer();
    const fullBuffer = await ctx.decodeAudioData(arrayBuffer);

    const channelData = fullBuffer.getChannelData(0);
    const sampleRate = fullBuffer.sampleRate;
    const sliceLen = Math.floor(sampleRate * 0.75); // 750ms natural water ripple
    const minStep = Math.floor(sampleRate * 0.95);

    let maxAmp = 0;
    for (let k = 0; k < channelData.length; k += 32) {
      const a = Math.abs(channelData[k]);
      if (a > maxAmp) maxAmp = a;
    }
    const threshold = Math.max(0.015, maxAmp * 0.16);

    const slices = [];
    let i = Math.floor(sampleRate * 0.04);

    while (i < channelData.length - sliceLen && slices.length < 8) {
      if (Math.abs(channelData[i]) > threshold) {
        const onset = Math.max(0, i - Math.floor(sampleRate * 0.006));
        const buf = ctx.createBuffer(1, sliceLen, sampleRate);
        const out = buf.getChannelData(0);
        const fadeStart = sliceLen - Math.floor(sampleRate * 0.12);

        let peak = 0;
        for (let j = 0; j < sliceLen; j++) {
          const v = Math.abs(channelData[onset + j]);
          if (v > peak) peak = v;
        }
        const mult = peak > 0.01 ? Math.min(3.2, 0.92 / peak) : 1.0;

        for (let j = 0; j < sliceLen; j++) {
          let s = channelData[onset + j] * mult;
          if (j > fadeStart) {
            const p = (j - fadeStart) / (sliceLen - fadeStart);
            s *= Math.cos(p * Math.PI * 0.5);
          }
          out[j] = s;
        }
        slices.push(buf);
        i += minStep;
      } else {
        i += 48;
      }
    }

    // Safety fallback: if threshold was strict, grab 4 slices evenly across the recording
    if (slices.length === 0 && channelData.length > sliceLen * 2) {
      const step = Math.floor((channelData.length - sliceLen) / 5);
      for (let s = 1; s <= 4; s++) {
        const onset = s * step;
        const buf = ctx.createBuffer(1, sliceLen, sampleRate);
        const out = buf.getChannelData(0);
        const fadeStart = sliceLen - Math.floor(sampleRate * 0.12);
        for (let j = 0; j < sliceLen; j++) {
          let s = channelData[onset + j];
          if (j > fadeStart) {
            const p = (j - fadeStart) / (sliceLen - fadeStart);
            s *= Math.cos(p * Math.PI * 0.5);
          }
          out[j] = s;
        }
        slices.push(buf);
      }
    }

    if (slices.length > 0) {
      waterSoundBuffers = slices;
    }
  } catch (e) {
    // Fallback gracefully
  } finally {
    isLoadingWaterAudio = false;
  }
}

function playWaterSynthFallback(ctx, now) {
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(680, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.16);
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.24);
  } catch (e) {}
}

let lastWaterPlayTime = 0;

/**
 * Play the user's uploaded water rippling sound for the Approach section background ripples
 */
export function playWaterRippleSound() {
  if (isAudioMuted()) return;
  const nowMs = performance.now();
  if (nowMs - lastWaterPlayTime < 75) return;
  lastWaterPlayTime = nowMs;

  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  // If sliced buffers are ready in Web Audio, play with natural pitch variance
  if (ctx && waterSoundBuffers.length > 0) {
    try {
      const randIdx = Math.floor(Math.random() * waterSoundBuffers.length);
      const source = ctx.createBufferSource();
      source.buffer = waterSoundBuffers[randIdx];

      const gain = ctx.createGain();
      const rate = 0.94 + (Math.random() - 0.5) * 0.12;
      source.playbackRate.value = rate;
      gain.gain.value = 0.88;

      source.connect(gain);
      gain.connect(ctx.destination);

      source.start(ctx.currentTime);
      return;
    } catch (e) {}
  }

  // Pre-load if not ready
  loadWaterAudio();

  // Instant HTML5 Audio fallback for immediate response
  try {
    const audio = new Audio(WATER_AUDIO_PATH);
    audio.volume = 0.85;
    audio.play().catch(() => {
      if (ctx) playWaterSynthFallback(ctx, ctx.currentTime);
    });
  } catch (e) {
    if (ctx) playWaterSynthFallback(ctx, ctx.currentTime);
  }
}

/**
 * Loads the user's uploaded film reel tape sound step variations
 */
async function loadFilmReelAudio() {
  if (typeof window === 'undefined' || filmReelBuffers.length > 0 || isLoadingFilmReel) return filmReelBuffers;
  isLoadingFilmReel = true;

  try {
    const ctx = getAudioContext();
    if (!ctx) return null;

    const buffers = [];
    for (const url of FILM_REEL_STEPS) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const arrayBuffer = await res.arrayBuffer();
          const buf = await ctx.decodeAudioData(arrayBuffer);
          buffers.push(buf);
        }
      } catch (e) {}
    }

    if (buffers.length > 0) {
      filmReelBuffers = buffers;
      return filmReelBuffers;
    }

    // Fallback: try loading the full recording
    const res = await fetch(FILM_REEL_AUDIO_PATH);
    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      const fullBuffer = await ctx.decodeAudioData(arrayBuffer);
      filmReelBuffers = [fullBuffer];
      return filmReelBuffers;
    }
  } catch (e) {
  } finally {
    isLoadingFilmReel = false;
  }
}

let lastFilmReelPlayTime = 0;

/**
 * Play the user's uploaded film reel tape sound as skill cards advance one by one
 */
export function playFilmReelSound() {
  if (isAudioMuted()) return;
  const nowMs = performance.now();
  if (nowMs - lastFilmReelPlayTime < 90) return;
  lastFilmReelPlayTime = nowMs;

  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  // Web Audio playback with authentic film reel tape advance buffer
  if (ctx && filmReelBuffers.length > 0 && ctx.state === 'running') {
    try {
      const randIdx = Math.floor(Math.random() * filmReelBuffers.length);
      const now = ctx.currentTime;
      const source = ctx.createBufferSource();
      source.buffer = filmReelBuffers[randIdx];

      const gain = ctx.createGain();
      const rate = 0.98 + (Math.random() - 0.5) * 0.05;
      source.playbackRate.value = rate;
      gain.gain.value = 0.88;

      source.connect(gain);
      gain.connect(ctx.destination);

      source.start(now);
      return;
    } catch (e) {}
  }

  // Pre-load in background if not yet cached
  loadFilmReelAudio().then((buffers) => {
    if (buffers && buffers.length > 0 && ctx && ctx.state === 'running') {
      try {
        const source = ctx.createBufferSource();
        source.buffer = buffers[0];
        const gain = ctx.createGain();
        gain.gain.value = 0.88;
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start(ctx.currentTime);
      } catch (e) {}
    }
  });

  // Authentic HTML5 audio fallback (starts immediately with film reel sound, no synth beep!)
  try {
    const randStep = Math.floor(Math.random() * FILM_REEL_STEPS.length);
    const audio = new Audio(FILM_REEL_STEPS[randStep] || FILM_REEL_AUDIO_PATH);
    audio.volume = 0.85;
    audio.play().catch(() => {});
  } catch (e) {}
}

/**
 * Loads the user's uploaded TV static noise recording for the CRT power-on & theme switch
 */
async function loadStaticAudio() {
  if (typeof window === 'undefined' || staticAudioBuffer || isLoadingStaticAudio) return staticAudioBuffer;
  isLoadingStaticAudio = true;

  try {
    const ctx = getAudioContext();
    if (!ctx) return null;

    const res = await fetch(STATIC_AUDIO_PATH);
    if (!res.ok) return null;

    const arrayBuffer = await res.arrayBuffer();
    const fullBuffer = await ctx.decodeAudioData(arrayBuffer);
    staticAudioBuffer = fullBuffer;
    return staticAudioBuffer;
  } catch (e) {
    // Fallback gracefully
    return null;
  } finally {
    isLoadingStaticAudio = false;
  }
}

function playStaticSynthFallback(ctx, now) {
  try {
    const playTime = Math.max(now, ctx.currentTime);
    const bufferSize = Math.floor(ctx.sampleRate * 0.38);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.18));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, playTime);
    filter.Q.setValueAtTime(1.1, playTime);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.42, playTime);
    gain.gain.exponentialRampToValueAtTime(0.001, playTime + 0.35);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(playTime);
  } catch (e) {}
}

function playStaticBuffer(ctx, now) {
  if (!staticAudioBuffer) return;
  try {
    const playTime = Math.max(now, ctx.currentTime);
    const source = ctx.createBufferSource();
    source.buffer = staticAudioBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(140, playTime);

    const gain = ctx.createGain();
    // CRT cathode beam envelope: starts with punchy static burst and smoothly fades as screen blooms
    // STRICT DURATION: lasts ~800ms matching CRT power-on animation
    gain.gain.setValueAtTime(0.05, playTime);
    gain.gain.linearRampToValueAtTime(0.68, playTime + 0.04);
    gain.gain.setValueAtTime(0.68, playTime + 0.35);
    gain.gain.exponentialRampToValueAtTime(0.0001, playTime + 0.78);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start(playTime);
    source.stop(playTime + 0.80);
  } catch (e) {}
}

let lastStaticPlayTime = 0;
let currentStaticAudio = null;

/**
 * Play the user's uploaded static tech sound whenever CRT power-on reveals or mode changes
 * Strictly active for the static tech animation duration (~800ms) only!
 */
export function playCrtStaticSound() {
  if (isAudioMuted()) return;
  const nowMs = performance.now();
  if (nowMs - lastStaticPlayTime < 350) return;
  lastStaticPlayTime = nowMs;

  const ctx = getAudioContext();

  // If previous HTML5 static audio is playing, stop and reset immediately
  if (currentStaticAudio) {
    try {
      currentStaticAudio.pause();
      currentStaticAudio.currentTime = 0;
    } catch (e) {}
    currentStaticAudio = null;
  }

  // Priority 1: Web Audio if buffer is ready and context is running (Frame-accurate 800ms stop)
  if (ctx && staticAudioBuffer && ctx.state === 'running') {
    playStaticBuffer(ctx, ctx.currentTime);
    return;
  }

  // Priority 2: HTML5 Audio fallback with strict fade & stop at 800ms
  try {
    const audio = new Audio(STATIC_AUDIO_PATH);
    currentStaticAudio = audio;
    audio.volume = 0.72;
    audio.play().catch(() => {
      if (ctx) playStaticSynthFallback(ctx, ctx.currentTime);
    });

    // Smoothly fade out starting at 580ms and strictly stop by 780ms
    setTimeout(() => {
      let vol = audio.volume;
      const fadeInterval = setInterval(() => {
        vol = Math.max(0, vol - 0.12);
        audio.volume = vol;
        if (vol <= 0.04) {
          clearInterval(fadeInterval);
          try {
            audio.pause();
            audio.currentTime = 0;
          } catch (e) {}
          if (currentStaticAudio === audio) currentStaticAudio = null;
        }
      }, 20);
    }, 580);
  } catch (e) {
    if (ctx) playStaticSynthFallback(ctx, ctx.currentTime);
  }

  // Trigger decoding if not yet cached
  loadStaticAudio();
}

/**
 * Loads the user's uploaded wind chime sound for landing page smooth scroll up.
 * The audio file is now pre-processed to the loud, crystal-clear mid-part crescendo.
 */
async function loadWindChimeAudio() {
  if (typeof window === 'undefined' || windChimeBuffer || isLoadingWindChime) return windChimeBuffer;
  isLoadingWindChime = true;

  try {
    const ctx = getAudioContext();
    if (!ctx) return null;

    const res = await fetch(WIND_CHIME_AUDIO_PATH);
    if (!res.ok) return null;

    const arrayBuffer = await res.arrayBuffer();
    const fullBuffer = await ctx.decodeAudioData(arrayBuffer);

    // Normalize buffer to 0.98 peak for loud, pristine audibility
    const numChannels = fullBuffer.numberOfChannels;
    let maxPeak = 0;
    for (let c = 0; c < numChannels; c++) {
      const data = fullBuffer.getChannelData(c);
      for (let i = 0; i < data.length; i++) {
        const val = Math.abs(data[i]);
        if (val > maxPeak) maxPeak = val;
      }
    }

    if (maxPeak > 0.01 && maxPeak < 0.95) {
      const scale = 0.98 / maxPeak;
      for (let c = 0; c < numChannels; c++) {
        const data = fullBuffer.getChannelData(c);
        for (let i = 0; i < data.length; i++) {
          data[i] *= scale;
        }
      }
    }

    windChimeBuffer = fullBuffer;
    return windChimeBuffer;
  } catch (e) {
    return null;
  } finally {
    isLoadingWindChime = false;
  }
}

let currentWindChimeAudio = null;
let lastWindChimePlayTime = 0;

/**
 * Play ethereal wind chime sound ONLY when smoothly scrolling UP on the landing page
 */
export function playWindChimeSound() {
  if (isAudioMuted()) return;
  const nowMs = performance.now();
  // Comfortable cooldown to prevent overlapping chimes (2.0s)
  if (nowMs - lastWindChimePlayTime < 2000) return;
  lastWindChimePlayTime = nowMs;

  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  // Web Audio playback with loud, crystal-clear chime buffer
  if (ctx && windChimeBuffer && ctx.state === 'running') {
    try {
      const now = ctx.currentTime;
      const source = ctx.createBufferSource();
      source.buffer = windChimeBuffer;

      // Gentle highpass to filter low sub-rumble while keeping all the chime tones
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(120, now);

      const gain = ctx.createGain();
      // Full volume for clear audibility
      gain.gain.setValueAtTime(1.0, now);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      source.start(now);
      return;
    } catch (e) {}
  }

  // If buffer not decoded yet, load in background
  loadWindChimeAudio().then((buf) => {
    if (buf && ctx && ctx.state === 'running') {
      try {
        const source = ctx.createBufferSource();
        source.buffer = buf;
        const gain = ctx.createGain();
        gain.gain.value = 1.0;
        source.connect(gain);
        gain.connect(ctx.destination);
        source.start(ctx.currentTime);
      } catch (e) {}
    }
  });

  // Instant HTML5 Audio fallback at full volume (starts at 0.0s where loud chimes ring out)
  try {
    if (currentWindChimeAudio) {
      try {
        currentWindChimeAudio.pause();
        currentWindChimeAudio.currentTime = 0;
      } catch (e) {}
      currentWindChimeAudio = null;
    }
    const audio = new Audio(WIND_CHIME_AUDIO_PATH);
    currentWindChimeAudio = audio;
    audio.volume = 1.0;
    audio.currentTime = 0;
    audio.play().catch(() => {});

    // Natural fade out near the end of 3.8s clip
    setTimeout(() => {
      let vol = audio.volume;
      const t = setInterval(() => {
        vol = Math.max(0, vol - 0.15);
        audio.volume = vol;
        if (vol <= 0.05) {
          clearInterval(t);
          try {
            audio.pause();
            audio.currentTime = 0;
          } catch (e) {}
          if (currentWindChimeAudio === audio) currentWindChimeAudio = null;
        }
      }, 30);
    }, 3200);
  } catch (e) {}
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

  // Pre-load if not yet cached, fallback to immediate audio
  loadAndTrimCardAudio();
  try {
    const audio = new Audio(CARD_AUDIO_PATH);
    audio.volume = 0.72;
    audio.play().catch(() => {
      playCardSynthFallback(ctx, now);
    });
  } catch (e) {
    playCardSynthFallback(ctx, now);
  }
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

  // If not yet cached, start loading in background and play immediate HTML5 audio / synth fallback
  loadAndTrimAudio();
  try {
    const audio = new Audio(KEYBOARD_AUDIO_PATH);
    audio.volume = type === 'spacebar' ? 0.75 : 0.62;
    audio.play().catch(() => {
      playSynthFallback(ctx, now, type);
    });
  } catch (e) {
    playSynthFallback(ctx, now, type);
  }
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
  loadWaterAudio();
  loadStaticAudio();
  loadFilmReelAudio();
  loadWindChimeAudio();

  const handlePointerDown = (e) => {
    // Unlock AudioContext immediately inside user gesture
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = performance.now();
    if (now - lastSoundTime < 35) return; // Debounce rapid multi-events

    // 0. Approach section background click -> Authentic water ripple sound!
    const isApproachBg = e.target.closest(
      '#approach, .approach-section, .approach-pinned-stage, .approach-global-wash'
    );
    if (
      isApproachBg &&
      !e.target.closest('button, a, [role="button"], input, .approach-small-square-card')
    ) {
      lastSoundTime = now;
      playWaterRippleSound();
      return;
    }

    const target = e.target.closest(
      'button, a, [role="button"], input[type="submit"], .badge-pill, .interactive, .tab-pill, .project-card-wrap, .project-card-inner, .workshop-grid-card, .workshop-card-3d, .workshop-stage-control-btn, .workshop-tip-pill, .approach-small-square-card, .film-horizontal-stage'
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
