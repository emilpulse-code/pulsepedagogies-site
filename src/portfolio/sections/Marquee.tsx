const ITEMS = [
  'UI/UX Design',
  'Design Systems',
  'Mobile-First',
  'K–12 EdTech',
  'AI-Powered',
  'Accessibility',
  'COPPA · FERPA',
];

function Row() {
  return (
    <div className="flex items-center shrink-0">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center shrink-0">
          <span className="font-serif italic font-light text-3xl md:text-5xl whitespace-nowrap px-6 md:px-10">
            {item}
          </span>
          <span className="text-brand-ink/40 text-xl" aria-hidden="true">
            ✺
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div
      className="relative z-10 bg-brand-orange text-brand-ink py-6 md:py-8 overflow-hidden"
      aria-label="UI/UX Design, Design Systems, Mobile-First, K–12 EdTech, AI-Powered, Accessibility, COPPA and FERPA"
    >
      <div className="pp-marquee-track flex w-max" aria-hidden="true">
        <Row />
        <Row />
      </div>
    </div>
  );
}
