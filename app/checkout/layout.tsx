import type { Metadata } from "next";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Оформление заказа",
  description: "Оформление заказа OKTASHOP®: доставка по Душанбе, оплата при получении.",
  alternates: { canonical: asset("/checkout/") },
  robots: { index: false, follow: true },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
