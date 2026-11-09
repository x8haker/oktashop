import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetail from "@/components/ProductDetail";
import { getBySlug, catLabel, products } from "@/lib/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getBySlug(slug);
  if (!product) return { title: "Товар не найден" };
  return {
    title: product.name,
    description: `${product.description} — ${catLabel(product.category)}, OKTASHOP®.`,
    openGraph: {
      title: `${product.name} — OKTASHOP®`,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getBySlug(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
