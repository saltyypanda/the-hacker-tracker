import { useEffect, useRef } from "react";
import { PandaHelmet } from "./PandaHelmet";
import { ProjectInfos } from "../project-constants";

const SIZE = 640;
const C = SIZE / 2; // center
const TILT = (-16 * Math.PI) / 180; // orbit plane tilt
const FLATTEN = 0.42; // ellipse height / width
const RADII = [168, 214, 260, 302];
const PANDA_R = 98; // occlusion radius of the helmet

const planets = ProjectInfos.slice(0, RADII.length).map((p, i) => ({
  slug: p.slug,
  name: p.project_name,
  color: p.accent,
  radius: RADII[i],
  size: 7 + (i % 2) * 2,
  speed: 0.16 / (1 + i * 0.45), // radians per second, outer orbits slower
  phase: 0.6 + i * 1.75,
}));

/** Position on a tilted, flattened orbit. `front` = passing in front of the panda. */
function orbitPoint(radius: number, theta: number) {
  const lx = radius * Math.cos(theta);
  const ly = radius * FLATTEN * Math.sin(theta);
  return {
    x: C + lx * Math.cos(TILT) - ly * Math.sin(TILT),
    y: C + lx * Math.sin(TILT) + ly * Math.cos(TILT),
    front: Math.sin(theta) > 0,
    depth: (Math.sin(theta) + 1) / 2, // 0 = farthest, 1 = nearest
  };
}

const tiltDeg = (TILT * 180) / Math.PI;

/** Hero centerpiece: the panda astronaut with each project orbiting as a planet. */
export function OrbitSystem() {
  const svgRef = useRef<SVGSVGElement>(null);
  const planetRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let visible = true;
    let last = performance.now();
    let elapsed = 0;

    const place = () => {
      planets.forEach((planet, i) => {
        const el = planetRefs.current[i];
        if (!el) return;
        const p = orbitPoint(planet.radius, planet.phase + elapsed * planet.speed);
        const scale = 0.8 + p.depth * 0.35;
        const hidden =
          !p.front && Math.hypot(p.x - C, p.y - C) < PANDA_R + planet.size;
        el.setAttribute("transform", `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)}) scale(${scale.toFixed(3)})`);
        el.style.opacity = hidden ? "0.08" : p.front ? "1" : "0.7";
        // Keep labels inside the chart: put them on the left when the planet is on the right.
        const label = el.querySelector("text");
        if (label) {
          const flip = p.x > C + 60;
          label.setAttribute("x", String(flip ? -(planet.size + 9) : planet.size + 9));
          label.setAttribute("text-anchor", flip ? "end" : "start");
        }
      });
    };

    const loop = (now: number) => {
      // Clamp the step so a backgrounded tab doesn't jump planets around.
      elapsed += Math.min(now - last, 50) / 1000;
      last = now;
      place();
      if (visible) frame = requestAnimationFrame(loop);
    };

    place();
    if (reduceMotion) return;

    // Pause the animation while the hero is scrolled out of view.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        last = performance.now();
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(loop);
      }
    });
    if (svgRef.current) observer.observe(svgRef.current);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="h-auto w-full overflow-visible max-lg:-my-[17%]"
      role="group"
      aria-label="Project orbit map. Each planet links to a project."
    >
      <defs>
        <radialGradient id="orbit-core-glow">
          <stop offset="0%" stopColor="#b7ffc9" stopOpacity="0.28" />
          <stop offset="45%" stopColor="#7c5cff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
        </radialGradient>
        {planets.map((p) => (
          <radialGradient key={p.slug} id={`planet-${p.slug}`} cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="35%" stopColor={p.color} />
            <stop offset="100%" stopColor={p.color} stopOpacity="0.55" />
          </radialGradient>
        ))}
      </defs>

      {/* Star-chart reticle */}
      <g aria-hidden="true" className="max-lg:hidden" stroke="#e6e8f5" fill="none">
        <circle cx={C} cy={C} r={312} strokeOpacity="0.08" />
        {Array.from({ length: 72 }, (_, i) => {
          const a = (i * 5 * Math.PI) / 180;
          const long = i % 6 === 0;
          const r1 = 312;
          const r2 = long ? 300 : 306;
          return (
            <line
              key={i}
              x1={C + r1 * Math.cos(a)}
              y1={C + r1 * Math.sin(a)}
              x2={C + r2 * Math.cos(a)}
              y2={C + r2 * Math.sin(a)}
              strokeOpacity={long ? 0.25 : 0.12}
            />
          );
        })}
        <line x1={C - 330} y1={C} x2={C - 240} y2={C} strokeOpacity="0.12" />
        <line x1={C + 240} y1={C} x2={C + 330} y2={C} strokeOpacity="0.12" />
        <line x1={C} y1={C - 330} x2={C} y2={C - 260} strokeOpacity="0.12" />
        <line x1={C} y1={C + 260} x2={C} y2={C + 330} strokeOpacity="0.12" />
      </g>
      <g aria-hidden="true" className="max-lg:hidden" fill="#e6e8f5" fillOpacity="0.35" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="1.5">
        <text x={C + 6} y={C - 316}>000°</text>
        <text x={C + 318} y={C - 6}>090°</text>
        <text x={C + 6} y={C + 326}>180°</text>
        <text x={C - 352} y={C - 6}>270°</text>
      </g>

      {/* Back halves of the orbits */}
      <g aria-hidden="true" transform={`translate(${C} ${C}) rotate(${tiltDeg})`} fill="none" stroke="#e6e8f5">
        {planets.map((p) => (
          <ellipse key={p.slug} rx={p.radius} ry={p.radius * FLATTEN} strokeOpacity="0.14" strokeDasharray="2 6" />
        ))}
      </g>

      {/* Panda core */}
      <circle cx={C} cy={C} r={230} fill="url(#orbit-core-glow)" aria-hidden="true" />
      <PandaHelmet x={C - 112} y={C - 112} width={224} height={224} />

      {/* Front halves drawn over the panda, so the rings wrap around it */}
      <g aria-hidden="true" transform={`translate(${C} ${C}) rotate(${tiltDeg})`} fill="none" stroke="#e6e8f5">
        {planets.map((p) => (
          <path
            key={p.slug}
            d={`M ${p.radius} 0 A ${p.radius} ${p.radius * FLATTEN} 0 0 1 ${-p.radius} 0`}
            strokeOpacity="0.28"
          />
        ))}
      </g>

      {/* Planets */}
      {planets.map((p, i) => (
        <g
          key={p.slug}
          ref={(el) => {
            planetRefs.current[i] = el;
          }}
          className="transition-opacity duration-300"
        >
          <a href={`#project-${p.slug}`} aria-label={`${p.name} project`} className="group">
            <circle r={p.size * 3} fill={p.color} opacity="0.14" />
            <circle r={p.size} fill={`url(#planet-${p.slug})`} />
            <circle r={18} fill="transparent" />
            <text
              x={p.size + 9}
              y={4}
              fill="#e6e8f5"
              fontFamily="JetBrains Mono, monospace"
              fontSize="12.5"
              letterSpacing="1.5"
              className="opacity-60 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 max-lg:text-[21px] max-lg:opacity-80"
            >
              {p.name.toUpperCase()}
            </text>
          </a>
        </g>
      ))}
    </svg>
  );
}
