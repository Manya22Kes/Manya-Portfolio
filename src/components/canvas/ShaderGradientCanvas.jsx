import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_themeDark;
  uniform float u_approach;
  varying vec2 vUv;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec2 mouse = u_mouse * 0.5 + 0.5;
    
    // Wave animation parameters - calm, graceful, fluid
    float t = u_time * 0.12;
    
    // Fluid noise octaves
    float n1 = snoise(st * 0.9 + vec2(t * 0.5, t * 0.3) + (mouse - 0.5) * 0.5);
    float n2 = snoise(st * 1.8 - vec2(t * 0.3, -t * 0.4) + n1 * 0.35);
    float n3 = snoise(st * 2.8 + vec2(-t * 0.2, t * 0.5) + n2 * 0.25);

    float combined = (n1 * 0.5 + n2 * 0.35 + n3 * 0.15) * 0.5 + 0.5;

    // Light Theme Palette: Luminous Warm Porcelain Silk Canvas (#FAF0F0)
    vec3 l_base       = vec3(0.984, 0.941, 0.941); // #FAF0F0 warm porcelain base
    vec3 l_blush      = vec3(0.933, 0.851, 0.851); // #ECD9D9 desert blush midtone
    vec3 l_rosetaupe  = vec3(0.867, 0.749, 0.765); // #DDBFC3 rose-taupe wave
    vec3 l_wine       = vec3(0.765, 0.529, 0.596); // #C38798 soft silk wine accent

    // Dark Theme Palette: Deep Velvet Obsidian Silk Canvas (#0C080B)
    vec3 d_base       = vec3(0.047, 0.031, 0.043); // #0C080B deep obsidian
    vec3 d_blush      = vec3(0.125, 0.055, 0.098); // #200E19 midnight mulberry
    vec3 d_rosetaupe  = vec3(0.247, 0.106, 0.165); // #3F1B2A velvet wine wave
    vec3 d_wine       = vec3(0.580, 0.306, 0.388); // #944E63 radiant wine crest

    // Approach Almond Palette (for Dark Theme when in Approach section: #EFE0CC background)
    vec3 a_base       = vec3(0.937, 0.878, 0.800); // #EFE0CC warm almond parchment
    vec3 a_blush      = vec3(0.870, 0.780, 0.700); // #DEC8B2
    vec3 a_rosetaupe  = vec3(0.706, 0.482, 0.518); // #B47B84 rose accent
    vec3 a_wine       = vec3(0.165, 0.059, 0.086); // #2A0F16 deep oxblood

    // Approach Espresso Palette (for Light Theme when in Approach section: #1E1216 background)
    vec3 e_base       = vec3(0.118, 0.071, 0.086); // #1E1216 deep espresso
    vec3 e_blush      = vec3(0.180, 0.100, 0.125); // #2E1920
    vec3 e_rosetaupe  = vec3(0.380, 0.160, 0.220); // #612938
    vec3 e_wine       = vec3(0.980, 0.941, 0.902); // #FAF0E6 cream

    // Smooth theme interpolation between normal modes
    vec3 c_base      = mix(l_base, d_base, u_themeDark);
    vec3 c_blush     = mix(l_blush, d_blush, u_themeDark);
    vec3 c_rosetaupe = mix(l_rosetaupe, d_rosetaupe, u_themeDark);
    vec3 c_wine      = mix(l_wine, d_wine, u_themeDark);

    // Smooth approach theme interpolation (Almond in dark / Espresso in light)
    vec3 app_base      = mix(e_base, a_base, u_themeDark);
    vec3 app_blush     = mix(e_blush, a_blush, u_themeDark);
    vec3 app_rosetaupe = mix(e_rosetaupe, a_rosetaupe, u_themeDark);
    vec3 app_wine      = mix(e_wine, a_wine, u_themeDark);

    c_base      = mix(c_base, app_base, u_approach);
    c_blush     = mix(c_blush, app_blush, u_approach);
    c_rosetaupe = mix(c_rosetaupe, app_rosetaupe, u_approach);
    c_wine      = mix(c_wine, app_wine, u_approach);

    // Fluid silk gradient blending
    vec3 color = c_base;
    color = mix(color, c_blush, smoothstep(0.18, 0.62, combined) * 0.7);
    color = mix(color, c_rosetaupe, smoothstep(0.42, 0.82, combined) * 0.55);
    color = mix(color, c_wine, smoothstep(0.68, 0.96, combined) * 0.35);

    // Ethereal pearlescent specular glint
    float specular = pow(max(0.0, combined - 0.75) * 1.5, 3.2);
    vec3 glintColor = mix(vec3(1.0, 0.98, 0.98), vec3(0.9, 0.65, 0.75), u_themeDark);
    color += glintColor * specular * (u_themeDark > 0.5 ? 0.22 : 0.35);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function ShaderGradientCanvas({ theme = 'light' }) {
  const containerRef = useRef(null);
  const uniformsRef = useRef(null);
  const targetDarkRef = useRef(theme === 'dark' ? 1.0 : 0.0);
  const targetApproachRef = useRef(0.0);

  // Sync theme changes
  useEffect(() => {
    targetDarkRef.current = theme === 'dark' ? 1.0 : 0.0;
  }, [theme]);

  // Expose global helper for ScrollTrigger 600ms synchronized shader morphing
  useEffect(() => {
    window.__setApproachShader = (active) => {
      targetApproachRef.current = active ? 1.0 : 0.0;
    };
    return () => {
      window.__setApproachShader = null;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: false,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_themeDark: { value: targetDarkRef.current },
      u_approach: { value: 0.0 },
    };
    uniformsRef.current = uniforms;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handlePointerMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize);

    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      uniforms.u_time.value = clock.getElapsedTime();

      // Smooth mouse follow
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;
      uniforms.u_mouse.value.set(currentMouseX, currentMouseY);

      // Smooth theme transitions between 0 (light) and 1 (dark)
      if (uniforms.u_themeDark) {
        uniforms.u_themeDark.value += (targetDarkRef.current - uniforms.u_themeDark.value) * 0.06;
      }

      // Smooth approach theme transitions (Almond / Espresso)
      if (uniforms.u_approach) {
        uniforms.u_approach.value += (targetApproachRef.current - uniforms.u_approach.value) * 0.06;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="shader-canvas-wrap" />;
}
