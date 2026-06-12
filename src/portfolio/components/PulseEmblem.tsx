/**
 * Full-color brand emblem for the portfolio nav: ink coin, gradient arcs,
 * EKG pulse line, and a periodic shine sweep (SMIL, no JS).
 * Sits outside the nav's mix-blend layer so the colors stay true.
 */
export function PulseEmblem({size = 34}: {size?: number}) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <defs>
        <linearGradient id="pp-em-top" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#29ABE2" />
          <stop offset="100%" stopColor="#8DC63F" />
        </linearGradient>
        <linearGradient id="pp-em-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#662D91" />
          <stop offset="100%" stopColor="#FF6321" />
        </linearGradient>
        <linearGradient id="pp-em-shine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <clipPath id="pp-em-clip">
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>

      {/* Ink coin keeps the EKG line legible over light and dark sections */}
      <circle cx="50" cy="50" r="48" fill="#1A1A1A" />

      {/* Ring — top arc: cyan → green */}
      <path
        d="M 7 50 A 43 43 0 0 1 93 50"
        fill="none"
        stroke="url(#pp-em-top)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* Ring — bottom arc: purple → orange */}
      <path
        d="M 7 50 A 43 43 0 0 0 93 50"
        fill="none"
        stroke="url(#pp-em-bottom)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* EKG pulse line */}
      <path
        d="M 7 50 L 26 50 L 33 38 L 40 72 L 47 29 L 54 50 L 93 50"
        fill="none"
        stroke="#F5F2ED"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Brand-orange accent node at peak */}
      <circle cx="47" cy="29" r="5.5" fill="#FF6321" />

      {/* Shine sweep — diagonal band glides across the coin, then rests */}
      <g clipPath="url(#pp-em-clip)">
        <rect
          x="-100"
          y="-25"
          width="44"
          height="150"
          fill="url(#pp-em-shine)"
          transform="rotate(20 50 50)"
        >
          <animate
            attributeName="x"
            values="-100;160;160"
            keyTimes="0;0.32;1"
            dur="3.6s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </svg>
  );
}
