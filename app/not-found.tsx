import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-lime">
        ОШИБКА / 404
      </p>
      <h1 className="mt-6 font-anton text-[25vw] leading-[0.8] tracking-tight md:text-[18vw]">
        ПОТЕРЯЛСЯ<span className="text-lime">.</span>
      </h1>
      <p className="mt-4 max-w-md text-sm text-concrete">
        Эта страница ушла на улицу и не вернулась. Проверьте адрес или вернитесь в магазин.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-3 bg-lime px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-void transition-colors hover:bg-dirty"
      >
        НА ГЛАВНУЮ <ArrowRight size={15} />
      </Link>
    </div>
  );
}
