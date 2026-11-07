import type { Metadata } from "next";
import { asset } from "@/lib/asset";

// Страница каталога — клиентский компонент, поэтому метаданные живут в layout.
export const metadata: Metadata = {
  title: "Магазин",
  description:
    "Каталог OKTASHOP®: худи, свитшоты, комплекты, baggy jeans, куртки, кеды и аксессуары с реальными фото.",
  alternates: { canonical: asset("/shop/") },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
