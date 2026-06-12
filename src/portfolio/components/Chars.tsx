/**
 * Splits text into per-character spans for GSAP reveals.
 * Parent elements should carry an aria-label with the full text;
 * the split copy is hidden from assistive tech.
 */
export function Chars({text, className = ''}: {text: string; className?: string}) {
  return (
    <span
      className={`inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em] ${className}`}
      aria-hidden="true"
    >
      {text.split('').map((c, i) => (
        <span key={i} className="pp-char inline-block will-change-transform">
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </span>
  );
}
