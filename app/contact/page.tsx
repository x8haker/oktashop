import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";

import { storeConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Связаться с OKTASHOP®: почта, адрес. Душанбе.",
};

export default function ContactPage() {
  const c = storeConfig.contacts;
  const tgHandle = storeConfig.telegram.username
    ? `@${storeConfig.telegram.username}`
    : "";
  const rows = [
    // Пустые значения (соцсеть не настроена) не рендерятся — нет мёртвых ссылок.
    tgHandle && { icon: Send, label: "TELEGRAM", value: tgHandle, href: c.telegram },
    c.instagram && { icon: Instagram, label: "INSTAGRAM", value: "oktashop", href: c.instagram },
    { icon: Mail, label: "EMAIL", value: c.email, href: `mailto:${c.email}` },
    { icon: MapPin, label: "ADDRESS", value: c.address, href: undefined },
    ...(c.phone
      ? [{ icon: Phone, label: "PHONE", value: c.phone, href: `tel:${c.phone}` }]
      : []),
  ].filter(Boolean) as { icon: typeof Send; label: string; value: string; href?: string }[];

  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-8 md:pt-44">
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-lime">
        CONTACT / SAY HELLO
      </p>
      <h1
        data-reveal="mask"
        className="mt-4 font-anton text-[15vw] leading-[0.85] tracking-tight md:text-[9vw]"
      >
        GET IN TOUCH
      </h1>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div data-stagger className="divide-y divide-dirty/10 border-y border-dirty/10">
          {rows.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <span className="flex w-full items-center justify-between gap-4 py-5">
                <span className="flex items-center gap-4">
                  <Icon size={18} className="text-lime" strokeWidth={1.5} />
                  <span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
                      {label}
                    </span>
                    <span className="mt-1 block text-sm">{value}</span>
                  </span>
                </span>
                {href && <ArrowUpRight size={16} className="text-concrete transition-colors group-hover:text-lime" />}
              </span>
            );

            return href ? (
              <Link
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                data-stagger-item
                className="group block transition-colors hover:text-lime"
              >
                {inner}
              </Link>
            ) : (
              <div key={label} data-stagger-item>
                {inner}
              </div>
            );
          })}
        </div>

        <div data-reveal className="border border-dirty/10 bg-asphalt p-7">
          <h2 className="font-anton text-4xl tracking-tight">
            WRITE US
            <span className="text-lime">.</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-dirty/70">
            Быстрее всего отвечаем в Telegram: напишите, какой товар и размер вас
            интересует — подтвердим наличие и доставку.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            {c.telegram ? (
              <a
                href={c.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-lime py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-void transition-colors hover:bg-dirty"
              >
                <Send size={15} /> ОТКРЫТЬ TELEGRAM
              </a>
            ) : (
              <a
                href={`mailto:${c.email}?subject=${encodeURIComponent("Вопрос по товару OKTASHOP")}`}
                className="flex items-center justify-center gap-3 bg-lime py-4 font-mono text-[11px] uppercase tracking-[0.3em] text-void transition-colors hover:bg-dirty"
              >
                <Mail size={15} /> НАПИСАТЬ НА ПОЧТУ
              </a>
            )}
            {c.instagram && (
              <a
                href={c.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 border border-dirty/25 py-4 font-mono text-[11px] uppercase tracking-[0.3em] transition-colors hover:border-lime hover:text-lime"
              >
                <Instagram size={15} /> INSTAGRAM
              </a>
            )}
            <a
              href={`mailto:${c.email}`}
              className="flex items-center justify-center gap-3 border border-dirty/25 py-4 font-mono text-[11px] uppercase tracking-[0.3em] transition-colors hover:border-lime hover:text-lime"
            >
              <Mail size={15} /> {c.email}
            </a>
          </div>

          <p className="mt-6 border-l-2 border-lime pl-3 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-concrete">
            Контакты задаются в одном месте: lib/config.ts
          </p>
        </div>
      </div>
    </div>
  );
}
