import { useEffect, useRef, useState } from "react";
import milkyWay from "../assets/starry-sky-bg.webp";

/** Small seeded PRNG so the nebula looks the same on every visit. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Art-directed nebula: cloud positions are fractions of the viewport,
 * colors come from the site palette. Each cloud is built from many soft
 * blobs so it has texture instead of looking like a flat gradient.
 */
const CLOUDS = [
  { x: 0.8, y: 0.2, r: 0.55, rgb: [110, 60, 210], a: 0.5 }, // violet, behind the hero art
  { x: 0.98, y: 0.55, r: 0.35, rgb: [190, 60, 150], a: 0.32 }, // magenta edge
  { x: 0.62, y: 0.05, r: 0.3, rgb: [70, 90, 220], a: 0.3 }, // blue cap
  { x: 0.1, y: 0.9, r: 0.5, rgb: [55, 70, 200], a: 0.36 }, // indigo, lower left
  { x: 0.32, y: 1.0, r: 0.35, rgb: [140, 60, 200], a: 0.26 }, // violet floor
  { x: 0.02, y: 0.25, r: 0.28, rgb: [40, 60, 150], a: 0.22 }, // faint upper left
];

const BASE = "#070816"; // matches --color-base-100
const NEBULA_SCALE = 0.25; // painted at quarter size, then smoothed up = soft edges

function paintNebula(canvas: HTMLCanvasElement, width: number, height: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = Math.max(1, Math.round(width * NEBULA_SCALE));
  const h = Math.max(1, Math.round(height * NEBULA_SCALE));
  canvas.width = w;
  canvas.height = h;
  const rand = mulberry32(7);
  const minSide = Math.min(w, h);
  const maxSide = Math.max(w, h);

  // Paint onto the opaque base color. Building the glow out of many
  // near-transparent layers on a transparent canvas loses precision and
  // shows up as a crosshatch pattern once scaled up.
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = BASE;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";

  for (const cloud of CLOUDS) {
    const cx = cloud.x * w;
    const cy = cloud.y * h;
    const spread = cloud.r * maxSide;
    for (let i = 0; i < 70; i++) {
      // Bias blobs toward the cloud's center.
      const angle = rand() * Math.PI * 2;
      const dist = spread * 0.55 * Math.sqrt(rand()) * rand();
      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist * 0.7;
      const radius = (0.06 + rand() * 0.22) * (spread + minSide * 0.3);
      const alpha = cloud.a * (0.06 + rand() * 0.12);
      const [r, g, b] = cloud.rgb;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
      grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.45})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Dark dust lanes cut through the glow for depth.
  ctx.globalCompositeOperation = "source-over";
  for (let i = 0; i < 24; i++) {
    const x = (0.45 + rand() * 0.55) * w;
    const y = rand() * 0.6 * h;
    const radius = (0.03 + rand() * 0.08) * maxSide;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, "rgba(7,8,22,0.35)");
    grad.addColorStop(1, "rgba(7,8,22,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

interface Star {
  x: number;
  y: number;
  r: number;
  depth: number; // 0.2 (far) .. 1 (near): parallax + brightness
  phase: number;
  tint: string;
  sparkle: boolean; // brightest few get a 4-point flare
}

const STAR_TINTS = ["#ffffff", "#ffffff", "#ffffff", "#dfe6ff", "#ffe9f2", "#e5fff0"];

function makeStars(count: number): Star[] {
  const rand = mulberry32(42);
  return Array.from({ length: count }, (_, i) => {
    const depth = 0.2 + rand() ** 2.2 * 0.8;
    return {
      x: rand(),
      y: rand(),
      r: 0.35 + depth * 1.05,
      depth,
      phase: rand() * Math.PI * 2,
      tint: STAR_TINTS[Math.floor(rand() * STAR_TINTS.length)],
      sparkle: i < 7,
    };
  });
}

const STAR_DENSITY = 1 / 2800;
const MAX_STARS = 600;
const PARALLAX = 0.06;

/**
 * Fixed sky behind the whole page: painted nebula + milky-way texture +
 * an animated starfield with depth parallax. Motion stops for people who
 * prefer reduced motion. The nebula dims a little past the hero.
 */
export function Background() {
  const nebulaRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    const onScroll = () => setInHero(window.scrollY < window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nebula = nebulaRef.current;
    const canvas = starsRef.current;
    const ctx = canvas?.getContext("2d");
    if (!nebula || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (width === 0 || height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(MAX_STARS, Math.round(width * height * STAR_DENSITY));
      if (count !== stars.length) stars = makeStars(count);
      paintNebula(nebula, width, height);
    };

    const drawSparkle = (x: number, y: number, size: number, alpha: number) => {
      ctx.globalAlpha = alpha * 0.55;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x + size, y);
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y + size);
      ctx.stroke();
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const scroll = window.scrollY;
      for (const s of stars) {
        const x = s.x * width;
        const shift = (scroll * PARALLAX * s.depth) / height;
        const y = ((((s.y - shift) % 1) + 1) % 1) * height;
        const twinkle = reduceMotion
          ? 1
          : 0.6 + 0.4 * Math.sin(time * 0.0012 * (0.4 + s.depth) + s.phase);
        const alpha = (0.2 + 0.7 * s.depth) * twinkle;

        if (s.sparkle) drawSparkle(x, y, 5 + s.depth * 5, alpha);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.tint;
        ctx.beginPath();
        ctx.arc(x, y, s.sparkle ? s.r * 1.3 : s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const redrawStatic = () => draw(0);

    resize();
    window.addEventListener("resize", resize);
    if (reduceMotion) {
      redrawStatic();
      window.addEventListener("scroll", redrawStatic, { passive: true });
      window.addEventListener("resize", redrawStatic);
    } else {
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", redrawStatic);
      window.removeEventListener("resize", redrawStatic);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 bg-base-100">
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: inHero ? 1 : 0.6 }}
      >
        {/* The blur hides the browser's gradient dithering, which would
            otherwise show as a crosshatch once this quarter-size canvas is
            stretched to full screen. scale-110 pushes the blurred edges off-screen. */}
        <canvas ref={nebulaRef} className="absolute inset-0 h-full w-full scale-110 blur-md" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen"
          style={{ backgroundImage: `url(${milkyWay})` }}
        />
      </div>
      <canvas ref={starsRef} className="absolute inset-0 h-full w-full" />
      {/* Vignette keeps the edges deep and the content area calm. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(4,5,14,0.65)_100%)]" />
    </div>
  );
}
