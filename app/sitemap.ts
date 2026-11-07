import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/asset";
import { products } from "@/lib/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/shop/",
    "/collections/",
    "/about/",
    "/delivery/",
    "/contact/",
  ];
  const now = new Date();

  const pages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${SITE_URL}${r}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r === "" ? 1 : 0.7,
  }));

  const items: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...pages, ...items];
}
