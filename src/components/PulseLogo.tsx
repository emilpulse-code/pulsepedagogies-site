export function PulseLogo({ size = 44 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Ring gradients */}
        <linearGradient id="pp-ring-top" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#29ABE2" />
          <stop offset="100%" stopColor="#8DC63F" />
        </linearGradient>
        <linearGradient id="pp-ring-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#662D91" />
          <stop offset="100%" stopColor="#F7941D" />
        </linearGradient>
        {/* Pulse line gradient */}
        <linearGradient id="pp-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#662D91" />
          <stop offset="50%" stopColor="#8DC63F" />
          <stop offset="100%" stopColor="#F7941D" />
        </linearGradient>
      </defs>

      {/* Outer ring — top arc: cyan → green */}
      <path
        d="M 8 50 A 42 42 0 0 1 92 50"
        fill="none"
        stroke="url(#pp-ring-top)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* Outer ring — bottom arc: purple → orange */}
      <path
        d="M 8 50 A 42 42 0 0 0 92 50"
        fill="none"
        stroke="url(#pp-ring-bottom)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* ── Art Palette (upper left) ── */}
      <g transform="translate(25, 28) rotate(-12)">
        <ellipse rx="11.5" ry="9" fill="#662D91" />
        {/* thumb hole */}
        <circle cx="3" cy="5.5" r="3" fill="white" />
        {/* paint dots */}
        <circle cx="-5.5" cy="-1.5" r="2.2" fill="#F7941D" />
        <circle cx="-0.5" cy="-6.5" r="2.2" fill="#29ABE2" />
        <circle cx="6" cy="-3" r="2.2" fill="#8DC63F" />
      </g>

      {/* ── Music Notes (upper right) ── */}
      <g fill="#8DC63F">
        {/* note 1 */}
        <ellipse cx="65" cy="31" rx="3.8" ry="3" transform="rotate(-10, 65, 31)" />
        <rect x="68.5" y="18" width="2.5" height="14" rx="1.25" />
        {/* note 2 */}
        <ellipse cx="74" cy="34.5" rx="3.8" ry="3" transform="rotate(-10, 74, 34.5)" />
        <rect x="77.5" y="21.5" width="2.5" height="14" rx="1.25" />
        {/* beam */}
        <rect x="68.5" y="18" width="11.5" height="3.5" rx="1.75" />
      </g>

      {/* ── EKG Heartbeat Line (center) ── */}
      <path
        d="M 14 50 L 27 50 L 32 36 L 38 62 L 43 41 L 47 50 L 62 50"
        fill="none"
        stroke="url(#pp-pulse)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Comedy / Theater Mask (lower left) ── */}
      <g transform="translate(27, 70)">
        <circle r="10.5" fill="#29ABE2" />
        {/* eyes */}
        <ellipse cx="-3.5" cy="-2.5" rx="2" ry="2.8" fill="white" />
        <ellipse cx="3.5" cy="-2.5" rx="2" ry="2.8" fill="white" />
        {/* smile */}
        <path
          d="M -5.5 3.5 Q 0 9 5.5 3.5"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* ── Dancing Figure (lower right) ── */}
      <g stroke="#F7941D" strokeWidth="2.8" strokeLinecap="round" fill="none">
        {/* head */}
        <circle cx="73" cy="59" r="4.5" fill="#F7941D" stroke="none" />
        {/* body */}
        <line x1="73" y1="63.5" x2="73" y2="75" />
        {/* left arm raised */}
        <line x1="73" y1="67" x2="64" y2="61" />
        {/* right arm out */}
        <line x1="73" y1="67" x2="82" y2="63" />
        {/* left leg */}
        <line x1="73" y1="75" x2="66" y2="84" />
        {/* right leg kick */}
        <line x1="73" y1="75" x2="81" y2="82" />
      </g>
    </svg>
  );
}
