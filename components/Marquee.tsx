export default function Marquee({
  text = "OKTASHOP® — УЛИЧНАЯ КУЛЬТУРА — НЕ СОЗДАНО ЧТОБЫ ВПИСАТЬСЯ — НЕЗАВИСИМЫЙ СТИЛЬ —",
  className = "",
}: {
  text?: string;
  className?: string;
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
      <div className="flex min-w-max animate-marquee whitespace-nowrap font-anton text-xl tracking-wide md:text-3xl">
        {item}
        {item}
        {item}
        {item}
      </div>
    </div>
  );
}
