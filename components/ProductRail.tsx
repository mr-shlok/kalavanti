"use client";

import React, { useRef } from "react";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

/** Horizontal product rail with circular prev/next arrows — like the homepage carousels. */
export default function ProductRail({ products }: { products: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dx: number) => ref.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <div className="relative">
      <div
        ref={ref}
        className="scrollbar-none flex gap-4 overflow-x-auto scroll-smooth px-1 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((p) => (
          <div key={p.slug} className="w-[240px] shrink-0 sm:w-[270px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <button
        aria-label="Scroll left"
        onClick={() => scrollBy(-560)}
        className="absolute -left-3 top-[38%] hidden h-10 w-10 items-center justify-center rounded-full bg-card text-brand shadow-md ring-1 ring-line hover:bg-softpink md:flex"
      >
        ‹
      </button>
      <button
        aria-label="Scroll right"
        onClick={() => scrollBy(560)}
        className="absolute -right-3 top-[38%] hidden h-10 w-10 items-center justify-center rounded-full bg-card text-brand shadow-md ring-1 ring-line hover:bg-softpink md:flex"
      >
        ›
      </button>
    </div>
  );
}
