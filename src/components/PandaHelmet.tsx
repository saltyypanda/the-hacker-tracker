import { SVGProps, useId } from "react";

const INK = "#15162b";
const FUR = "#f4e5cd";

/** The panda-in-a-space-helmet mark, drawn as SVG so it stays crisp at any size. */
export function PandaHelmet(props: SVGProps<SVGSVGElement>) {
  const id = useId();
  const glass = `${id}-glass`;
  const inside = `${id}-inside`;

  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...props}>
      <defs>
        <radialGradient id={inside} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#2a2e5c" />
          <stop offset="100%" stopColor="#0e1028" />
        </radialGradient>
        <radialGradient id={glass} cx="32%" cy="26%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#b7ffc9" stopOpacity="0.1" />
        </radialGradient>
      </defs>

      {/* Helmet interior */}
      <circle cx="50" cy="50" r="42" fill={`url(#${inside})`} />

      {/* Ears */}
      <circle cx="31" cy="34" r="8.5" fill={INK} />
      <circle cx="69" cy="34" r="8.5" fill={INK} />

      {/* Face */}
      <ellipse cx="50" cy="55" rx="25" ry="22" fill={FUR} />

      {/* Eye patches */}
      <ellipse cx="40" cy="54" rx="6.4" ry="8.6" fill={INK} transform="rotate(28 40 54)" />
      <ellipse cx="60" cy="54" rx="6.4" ry="8.6" fill={INK} transform="rotate(-28 60 54)" />
      <circle cx="40.6" cy="52.6" r="2" fill={FUR} />
      <circle cx="59.4" cy="52.6" r="2" fill={FUR} />

      {/* Cheeks, nose, smile */}
      <circle cx="33.5" cy="62.5" r="3" fill="#ff8fb8" opacity="0.35" />
      <circle cx="66.5" cy="62.5" r="3" fill="#ff8fb8" opacity="0.35" />
      <ellipse cx="50" cy="61.6" rx="2.6" ry="1.8" fill={INK} />
      <path
        d="M46.5 64.6 q1.75 2.3 3.5 0 q1.75 2.3 3.5 0"
        fill="none"
        stroke={INK}
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      {/* Glass + rim */}
      <circle cx="50" cy="50" r="42" fill={`url(#${glass})`} />
      <ellipse cx="33" cy="24" rx="9" ry="3.2" fill="#ffffff" opacity="0.4" transform="rotate(-35 33 24)" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="#d3d9ec" strokeWidth="3.2" />
      <circle cx="50" cy="50" r="44.6" fill="none" stroke="#d3d9ec" strokeOpacity="0.25" strokeWidth="1" />
    </svg>
  );
}
