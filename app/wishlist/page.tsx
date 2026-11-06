"use client";

import React from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/components/providers/WishlistProvider";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-3 text-xs text-muted">
        <Link href="/" className="hover:text-brand">Home</Link> / <span>Wishlist</span>
      </nav>
      <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
        My Wishlist <span className="text-base font-normal text-muted">· {items.length} saved</span>
      </h1>

      {items.length === 0 ? (
        <div className="mt-10 rounded-xl bg-card py-20 text-center ring-1 ring-line">
          <p className="font-heading text-lg">Nothing saved here yet</p>
          <p className="mt-2 text-sm text-muted">Tap the ♥ on any design to keep it for later.</p>
          <Link href="/category/bestsellers" className="btn-maroon mt-6 inline-flex rounded-md">See Bestsellers</Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
