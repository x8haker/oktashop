import type { Metadata } from "next";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Корзина",
  description: "Корзина OKTASHOP® — ваши товары и оформление заказа.",
  alternates: { canonical: asset("/cart/") },
  robots: { index: false, follow: true },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
