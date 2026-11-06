"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";

export type FilterGroup = { key: string; label: string; options: { value: string; label: string }[] };

const PRICE_BANDS: FilterGroup = {
  key: "price",
  label: "Price",
  options: [
    { value: "max-20000", label: "Under ₹20,000" },
    { value: "max-50000", label: "Under ₹50,000" },
    { value: "max-100000", label: "Under ₹1,00,000" },
    { value: "min-100000", label: "Above ₹1,00,000" },
  ],
};

/** Query params used by nav mega-menu links. They may not exist as server-built
 *  filter groups, so we apply them against the product text corpus ourselves. */
const EXTRA_FILTER_KEYS = ["style", "tone", "stone", "occasion"] as const;

function productHaystack(p: import("@/lib/types").Product): string {
  return [
    p.name,
    ...p.metals,
    ...p.types,
    ...p.tags,
    ...p.variants.map((x) => x.label),
    p.stone ?? "",
  ]
    .join(" ")
    .toLowerCase();
}

export default function Listing({
  title,
  basePath,
  breadcrumb,
  products,
  filterGroups,
}: {
  title: string;
  basePath: string;
  breadcrumb: { label: string; href: string }[];
  products: import("@/lib/types").Product[];
  filterGroups: FilterGroup[];
}) {
  const sp = useSearchParams();
  const [sort, setSort] = useState("featured");
  const [panelOpen, setPanelOpen] = useState(false);

  const active = useMemo(() => {
    const map: Record<string, string | null> = {};
    for (const g of [...filterGroups, PRICE_BANDS]) map[g.key] = sp.get(g.key);
    for (const k of EXTRA_FILTER_KEYS) if (!(k in map)) map[k] = sp.get(k);
    return map;
  }, [sp, filterGroups]);

  const results = useMemo(() => {
    let list = [...products];

    // price band
    const price = active.price;
    if (price?.startsWith("max-")) list = list.filter((p) => p.price <= Number(price.slice(4)));
    if (price?.startsWith("min-")) list = list.filter((p) => p.price >= Number(price.slice(4)));

    // other filters match against variant labels, metals, tags, stone
    for (const g of filterGroups) {
      const v = active[g.key];
      if (!v) continue;
      list = list.filter((p) => {
        const hay = productHaystack(p);
        if (g.key === "purity") return hay.includes(v.toLowerCase());
        if (g.key === "occasion") return p.tags.includes(v);
        if (g.key === "stone") return (p.stone ?? "").toLowerCase().includes(v) || p.metals.includes("gemstone");
        if (g.key === "metal") return p.metals.includes(v as never);
        return hay.includes(v.toLowerCase());
      });
    }

    // nav mega-menu params (style/tone/stone/occasion) not covered by server groups
    for (const k of EXTRA_FILTER_KEYS) {
      if (filterGroups.some((g) => g.key === k)) continue;
      const v = active[k];
      if (!v) continue;
      list = list.filter((p) => {
        const hay = productHaystack(p);
        if (k === "occasion") return p.tags.includes(v) || hay.includes(v);
        if (k === "stone") return (p.stone ?? "").toLowerCase().includes(v) || hay.includes(v);
        return hay.includes(v.toLowerCase());
      });
    }

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "newest") list.sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
    if (sort === "featured") list.sort((a, b) => Number(b.bestseller ?? false) - Number(a.bestseller ?? false));
    return list;
  }, [products, active, sort]);

  // anchors keep the current path + query
  const buildHref = (key: string, value: string) => {
    const next = new URLSearchParams(sp.toString());
    if (next.get(key) === value) next.delete(key);
    else next.set(key, value);
    const q = next.toString();
    return `${basePath}${q ? "?" + q : ""}`;
  };

  const clearHref = basePath;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-3 text-xs text-muted">
        {breadcrumb.map((b, i) => (
          <span key={b.href}>
            {i > 0 && " / "}
            <Link href={b.href} className="hover:text-brand">
              {b.label}
            </Link>
          </span>
        ))}
      </nav>

      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-muted">{results.length} designs</p>
        </div>
        {/* mobile filter button */}
        <button
          onClick={() => setPanelOpen((o) => !o)}
          className="btn-maroon rounded-md px-4 py-2 text-xs lg:hidden"
        >
          ⚙ Filters {panelOpen ? "▲" : "▼"}
        </button>
      </div>

      <div className="flex gap-8">
        {/* sidebar */}
        <aside className={`w-60 shrink-0 lg:block ${panelOpen ? "block" : "hidden"}`}>
          <div className="space-y-6 lg:sticky lg:top-40">
            <div>
              <p className="eyebrow mb-3">Refine By</p>
              {[...filterGroups, PRICE_BANDS].map((g) => (
                <div key={g.key} className="mb-5 border-b border-line pb-4 last:border-0">
                  <p className="mb-2 text-sm font-semibold text-ink">{g.label}</p>
                  <ul className="space-y-1.5">
                    {g.options.map((o) => {
                      const on = active[g.key] === o.value;
                      return (
                        <li key={o.value}>
                          <Link
                            href={buildHref(g.key, o.value)}
                            scroll
                            className={`flex items-center gap-2 text-sm transition-colors ${
                              on ? "font-semibold text-brand" : "text-muted hover:text-brand"
                            }`}
                          >
                            <span
                              className={`flex h-4 w-4 items-center justify-center rounded-sm border text-[10px] ${
                                on ? "border-brand bg-brand text-white" : "border-line bg-card"
                              }`}
                            >
                              {on && "✓"}
                            </span>
                            {o.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
              {Object.values(active).some(Boolean) && (
                <Link href={clearHref} className="text-xs font-semibold uppercase tracking-wide text-brand underline">
                  Reset all filters
                </Link>
              )}
            </div>

            {/* active nav-menu params (style/tone/stone) shown as removable chips */}
            {EXTRA_FILTER_KEYS.filter((k) => active[k] && !filterGroups.some((g) => g.key === k)).length > 0 && (
              <div className="border-t border-line pt-4">
                <p className="eyebrow mb-2">From Your Selection</p>
                <ul className="space-y-1.5">
                  {EXTRA_FILTER_KEYS.filter((k) => active[k] && !filterGroups.some((g) => g.key === k)).map((k) => (
                    <li key={k} className="flex items-center justify-between gap-2 text-sm">
                      <span className="text-ink">
                        <span className="capitalize text-muted">{k}:</span> {active[k]}
                      </span>
                      <Link href={buildHref(k, active[k]!)} className="text-xs font-semibold uppercase tracking-wide text-brand underline">
                        Clear
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>

        {/* grid + sort */}
        <div className="min-w-0 flex-1">
          <div className="mb-5 flex items-center justify-end gap-2">
            <label htmlFor="sort" className="text-xs uppercase tracking-wide text-muted">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-md border border-line bg-card px-3 py-2 text-sm outline-none focus:border-brand"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>

          {results.length === 0 ? (
            <div className="rounded-lg bg-card py-20 text-center ring-1 ring-line">
              <p className="font-heading text-lg text-ink">No designs match these filters yet.</p>
              <Link href={clearHref} className="btn-maroon mt-4 inline-flex rounded-md">
                Clear Filters
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
