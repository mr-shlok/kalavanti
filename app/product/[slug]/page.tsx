import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getProduct, PRODUCTS } from "@/lib/products";

export const instant = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.name} by Kalavanti — ${p.styleCode}. Hallmarked, certified, free insured delivery with lifetime buyback.`,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) =>
      p.slug !== product.slug &&
      (p.types.some((t) => product.types.includes(t)) || p.metals.some((m) => product.metals.includes(m)))
  ).slice(0, 4);

  return <ProductDetail product={product} related={related} />;
}
