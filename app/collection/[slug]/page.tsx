import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Listing from "@/components/Listing";
import { productsForCollection } from "@/lib/products";
import { COLLECTION_LABELS } from "@/lib/categories";

export const instant = false;

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const label = COLLECTION_LABELS[slug] ?? slug;
  return { title: `${label} Collection`, description: `The ${label} collection by Kalavanti — handcrafted, hallmarked and heirloom-grade.` };
}

export default async function CollectionPage({ params }: Params) {
  const { slug } = await params;
  const label = COLLECTION_LABELS[slug];
  const products = productsForCollection(slug);
  if (!label || products.length === 0) notFound();

  const groups = [...new Set(products.flatMap((p) => p.types))];
  const filterGroups = groups.length > 1
    ? [{ key: "type", label: "Product Type", options: groups.map((t) => ({ value: t, label: t[0].toUpperCase() + t.slice(1) })) }]
    : [];

  return (
    <div>
      {/* collection masthead */}
      <section className="bg-brand-dark px-4 py-14 text-center">
        <p className="eyebrow text-champagne">Signature Collection</p>
        <h1 className="mt-2 font-heading text-3xl font-semibold text-white sm:text-4xl">{label}</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-white/75">
          A curated family of designs from the Kalavanti atelier — unified by one motif,
          perfected over generations of karigar craft.
        </p>
      </section>
      <Suspense fallback={<div className="py-20 text-center text-muted">Loading…</div>}>
        <Listing
          title={`${label} — All Designs`}
          basePath={`/collection/${slug}`}
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Collections", href: "/collections" }, { label, href: `/collection/${slug}` }]}
          products={products}
          filterGroups={filterGroups}
        />
      </Suspense>
    </div>
  );
}
