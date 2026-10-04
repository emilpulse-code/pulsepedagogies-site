/** The orbital P emblem, for the /company nav and footer. Source and sizes in public/brand/. */
export function PulseLogo({ size = 44 }: { size?: number }) {
  return (
    <img
      src="/brand/emblem-128.webp"
      width={size}
      height={size}
      alt="Pulse Pedagogies"
      draggable={false}
      className="block shrink-0 select-none"
    />
  );
}
