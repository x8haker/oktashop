import Link from "next/link";
import { storeConfig } from "@/lib/config";

export default function Footer() {
  const s = storeConfig;
  return (
    <footer className="relative overflow-hidden border-t border-dirty/10 bg-void pt-16 md:pt-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-lime">МАГАЗИН</h3>
            <ul className="mt-4 space-y-2 text-sm text-dirty/70">
              <li><Link href="/shop" className="hover:text-lime">Все товары</Link></li>
              <li><Link href="/shop?new=1" className="hover:text-lime">Новый дроп</Link></li>
              <li><Link href="/collections" className="hover:text-lime">Коллекции</Link></li>
              <li><Link href="/cart" className="hover:text-lime">Корзина</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-lime">ИНФО</h3>
            <ul className="mt-4 space-y-2 text-sm text-dirty/70">
              <li><Link href="/about" className="hover:text-lime">О нас</Link></li>
              <li><Link href="/delivery" className="hover:text-lime">Доставка</Link></li>
              <li><Link href="/contact" className="hover:text-lime">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-lime">СОЦСЕТИ</h3>
            {s.contacts.instagram || s.contacts.telegram ? (
              <ul className="mt-4 space-y-2 text-sm text-dirty/70">
                {s.contacts.instagram && (
                  <li>
                    <a href={s.contacts.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-lime">
                      Instagram ↗
                    </a>
                  </li>
                )}
                {s.contacts.telegram && (
                  <li>
                    <a href={s.contacts.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-lime">
                      Telegram ↗
                    </a>
                  </li>
                )}
              </ul>
            ) : (
              <ul className="mt-4 space-y-2 text-sm text-dirty/70">
                <li>
                  <a href={`mailto:${s.contacts.email}`} className="hover:text-lime">
                    Написать на почту ↗
                  </a>
                </li>
              </ul>
            )}
          </div>

          <div>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-lime">КОНТАКТЫ</h3>
            <ul className="mt-4 space-y-2 text-sm text-dirty/70">
              <li>{s.contacts.email}</li>
              {s.contacts.phone && <li>{s.contacts.phone}</li>}
              <li>{s.contacts.address}</li>
              <li className="text-xs text-concrete">{s.delivery.note}</li>
            </ul>
          </div>
        </div>

        {/* огромный вордмарк */}
        <div data-reveal="mask" className="mt-16 select-none md:mt-24">
          <h2 className="whitespace-nowrap text-center font-anton text-[19vw] leading-[0.8] tracking-tighter text-dirty/90">
            OKTA<span className="text-lime">SHOP</span>
          </h2>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 border-t border-dirty/10 py-8 md:flex-row md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
            {/* suppressHydrationWarning: год на билде и год у клиента могут
                отличиться на стыке лет — предупреждение гидратации не нужно. */}
            <span suppressHydrationWarning>
              © {new Date().getFullYear()} {s.name} — {s.location}
            </span>
          </p>
          <p className="font-anton text-lg tracking-wide text-lime md:text-2xl">
            УВИДИМСЯ НА УЛИЦЕ.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-concrete">
            {s.slogan}
          </p>
        </div>
      </div>
    </footer>
  );
}
