export function PulseLogo({ size = 44 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Top arc: cyan → green */}
        <linearGradient id="pp-logo-ring-top" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#29ABE2" />
          <stop offset="100%" stopColor="#8DC63F" />
        </linearGradient>
        {/* Bottom arc: purple → orange */}
        <linearGradient id="pp-logo-ring-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#662D91" />
          <stop offset="100%" stopColor="#FF6321" />
        </linearGradient>
      </defs>

      {/* Ring — top arc: cyan → green */}
      <path
        d="M 7 50 A 43 43 0 0 1 93 50"
        fill="none"
        stroke="url(#pp-logo-ring-top)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* Ring — bottom arc: purple → orange */}
      <path
        d="M 7 50 A 43 43 0 0 0 93 50"
        fill="none"
        stroke="url(#pp-logo-ring-bottom)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* EKG pulse line — flat, spike up, drop below, return flat */}
      <path
        d="M 7 50 L 26 50 L 33 38 L 40 72 L 47 29 L 54 50 L 93 50"
        fill="none"
        stroke="#1A1A1A"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Brand-orange accent node at peak */}
      <circle cx="47" cy="29" r="5.5" fill="#FF6321" />
    </svg>
  );
}
