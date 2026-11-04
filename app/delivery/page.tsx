import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Truck } from "lucide-react";

import { storeConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Доставка",
  description: "Доставка OKTASHOP®: бесплатно по Душанбе, в другие города — такси.",
};

export default function DeliveryPage() {
  const d = storeConfig.delivery;
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-32 md:px-8 md:pt-44">
      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-lime">
        INFO / DELIVERY
      </p>
      <h1
        data-reveal="mask"
        className="mt-4 font-anton text-[15vw] leading-[0.85] tracking-tight md:text-[9vw]"
      >
        DELIVERY
      </h1>

      <div className="mt-14 grid gap-px bg-dirty/10 md:grid-cols-3">
        {[
          { icon: Truck, t: "ДУШАНБЕ — БЕСПЛАТНО", d: d.dushanbe },
          { icon: MapPin, t: "ДРУГИЕ ГОРОДА", d: d.otherCities },
          { icon: MessageCircle, t: "СНАЧАЛА СВЯЖИТЕСЬ", d: d.note },
        ].map(({ icon: Icon, t, d: text }) => (
          <div key={t} data-stagger-item className="bg-void p-8 transition-colors hover:bg-asphalt">
            <Icon size={26} strokeWidth={1.5} className="text-lime" />
            <h2 className="mt-5 font-anton text-3xl tracking-tight">{t}</h2>
            <p className="mt-3 text-sm leading-relaxed text-concrete">{text}</p>
          </div>
        ))}
      </div>

      <section className="mt-16 border-t border-dirty/10 pt-10">
        <h2 className="font-anton text-4xl tracking-tight md:text-5xl">ОПЛАТА</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-dirty/70">
          Онлайн-оплаты на сайте нет. Заказ подтверждается в переписке, оплата — при
          получении, наличными или переводом по договорённости. Никаких предоплат «вперёд»
          мы не просим.
        </p>

        <h2 className="mt-10 font-anton text-4xl tracking-tight md:text-5xl">ВОЗВРАТ</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-dirty/70">
          Проверяйте размер при получении. Если вещь не подошла — напишите нам в течение 24
          часов, решим обмен. Главное — сохранить товарный вид и упаковку.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-lime px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-void transition-colors hover:bg-dirty"
          >
            SHOP THE DROP <ArrowRight size={15} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border border-dirty/25 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.25em] transition-colors hover:border-lime hover:text-lime"
          >
            ЗАДАТЬ ВОПРОС
          </Link>
        </div>
      </section>
    </div>
  );
}
