import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/asset";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Корзина и оформление заказа не должны индексироваться.
        disallow: ["/cart/", "/checkout/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
