export default function Marquee({
  text = "OKTASHOP® — STREET CULTURE — NOT MADE TO FIT IN — INDEPENDENT STYLE —",
  className = "",
  reverse = false,
}: {
  text?: string;
  className?: string;
  reverse?: boolean;
}) {
  const item = (
    <span className="flex shrink-0 items-center gap-6 pr-6">
      <span>{text}</span>
      <span className="text-lime">✦</span>
    </span>
  );

  return (
    <div
      className={`relative flex overflow-hidden border-y border-dirty/10 py-4 ${className}`}
      aria-hidden
    >
      <div
        className={`flex min-w-max animate-marquee whitespace-nowrap font-anton text-xl tracking-wide md:text-3xl ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        {item}
        {item}
        {item}
        {item}
      </div>
    </div>
  );
}
