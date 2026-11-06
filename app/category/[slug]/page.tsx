import React from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Listing, { type FilterGroup } from "@/components/Listing";
import { PRODUCTS, productsFor } from "@/lib/products";
import { CATEGORY_LABELS } from "@/lib/categories";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(CATEGORY_LABELS).map((slug) => ({ slug }));
}

function filterGroupsFor(products: import("@/lib/types").Product[]): FilterGroup[] {
  const groups: FilterGroup[] = [];

  const metals = [...new Set(products.flatMap((p) => p.metals))];
  if (metals.length > 1)
    groups.push({
      key: "metal",
      label: "Metal",
      options: metals.map((m) => ({ value: m, label: m[0].toUpperCase() + m.slice(1) })),
    });

  const types = [...new Set(products.flatMap((p) => p.types))];
  if (types.length > 1)
    groups.push({
      key: "type",
      label: "Product Type",
      options: types.map((t) => ({ value: t, label: t[0].toUpperCase() + t.slice(1) + "s" })),
    });

  const purity = [...new Set(products.flatMap((p) => p.variants.map((v) => v.label).filter((l) => l.includes("K "))))];
  const purityKeys = [...new Set(purity.map((l) => l.split(" ")[0]))];
  if (purityKeys.length > 1)
    groups.push({
      key: "purity",
      label: "Purity",
      options: purityKeys.map((k) => ({ value: k, label: k })),
    });

  const occasions = [...new Set(products.flatMap((p) => p.tags))].filter((t) =>
    ["bridal", "festive", "everyday", "party", "gifting"].includes(t)
  );
  if (occasions.length)
    groups.push({
      key: "occasion",
      label: "Occasion",
      options: occasions.map((o) => ({ value: o, label: o[0].toUpperCase() + o.slice(1) })),
    });

  return groups;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug] ?? slug.replace(/-/g, " ");
  return { title: `${label.charAt(0).toUpperCase() + label.slice(1)}`, description: `Shop handcrafted ${label} at Kalavanti — hallmarked, certified, with lifetime buyback.` };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const label = CATEGORY_LABELS[slug];
  const products = productsFor(slug);
  if (!label && products.length === 0) notFound();

  const title = label ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-20 text-center text-muted">Loading designs…</div>}>
      <Listing
        title={title}
        basePath={`/category/${slug}`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: title, href: `/category/${slug}` }]}
        products={products}
        filterGroups={filterGroupsFor(products.length ? products : PRODUCTS)}
      />
    </Suspense>
  );
}
