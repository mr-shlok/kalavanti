"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";

export default function SearchClient() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const s = q.trim().toLowerCase();

  const results = useMemo(
    () =>
      s
        ? PRODUCTS.filter(
            (p) =>
              p.name.toLowerCase().includes(s) ||
              p.metals.some((m) => m.includes(s)) ||
              p.types.some((t) => t.includes(s)) ||
              p.tags.some((t) => t.includes(s)) ||
              p.styleCode.toLowerCase().includes(s) ||
              (p.stone ?? "").toLowerCase().includes(s),
          )
        : [],
    [s],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="mb-3 text-xs text-muted">
        <Link href="/" className="hover:text-brand">Home</Link> / <span>Search</span>
      </nav>
      <h1 className="font-heading text-2xl font-semibold sm:text-3xl">
        {s ? (
          <>Results for &ldquo;{q}&rdquo; <span className="text-base font-normal text-muted">&middot; {results.length} designs</span></>
        ) : (
          "Search Kalavanti"
        )}
      </h1>

      {!s && (
        <p className="mt-3 text-sm text-muted">
          Try &ldquo;solitaire&rdquo;, &ldquo;jhumka&rdquo;, &ldquo;bridal set&rdquo;, &ldquo;tennis&rdquo; or a style code like KR2417 &mdash; or use the search
          icon in the header.
        </p>
      )}

      {s && results.length === 0 && (
        <div className="mt-10 rounded-xl bg-card py-16 text-center ring-1 ring-line">
          <p className="font-heading text-lg">Nothing matched &ldquo;{q}&rdquo;.</p>
          <p className="mt-2 text-sm text-muted">Our gemologists can source any stone or style on request.</p>
          <div className="mt-5 flex justify-center gap-3">
            <Link href="/category/diamond" className="btn-maroon rounded-md">Browse Diamonds</Link>
            <Link href="/contact" className="btn-ghost rounded-md px-6">Ask a Gemologist</Link>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {results.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
