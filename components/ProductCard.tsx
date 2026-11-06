"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { inr } from "@/lib/format";
import { useCart } from "./providers/CartProvider";
import { useWishlist } from "./providers/WishlistProvider";
import { useToast } from "./providers/ToastProvider";

/** Card mirrors the reference PLP card: 1:1 image on white, pink corner
 *  ribbon, outlined heart, price + struck mkt price, serif one-line name. */
export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const { toast } = useToast();
  const [hover, setHover] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const alt = product.images[1];
  const wished = has(product.slug);

  // Alternate-view swap and hover affordances only make sense on pointer:hover
  // devices; on touch (mobile/tab) they would stick after a tap.
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  return (
    <div
      className="group relative bg-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        {/* ribbon */}
        {(product.discountLabel || product.isNew) && (
          <span className="absolute left-0 top-3 z-10 rounded-r-sm bg-softpink px-2.5 py-1 text-[10px] font-semibold tracking-wide text-ink">
            {product.discountLabel ?? "New Launch"}
          </span>
        )}

        <div className="relative aspect-square w-full overflow-hidden bg-card">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-500 ${
              hover && alt && canHover ? "opacity-0" : "opacity-100"
            } ${hover && canHover ? "scale-[1.03]" : ""}`}
          />
          {alt && (
            <Image
              src={alt}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
              className={`object-cover transition-opacity duration-500 ${
                hover && canHover ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* quick add */}
          <button
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={(e) => {
              e.preventDefault();
              add(product, product.variants[0]?.label ?? "Standard");
              toast(`${product.name} added to cart`);
            }}
            className={`absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white/95 px-4 py-2 text-xs font-semibold tracking-wide text-brand shadow-md ring-1 ring-line transition-all hover:bg-brand hover:text-white ${
              hover && canHover ? "opacity-100 translate-y-0" : canHover ? "opacity-0 translate-y-2" : "opacity-100"
            }`}
          >
            + Quick Add
          </button>
        </div>
      </Link>

      {/* wishlist heart */}
      <button
        type="button"
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggle(product.slug)}
        className={`absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 ring-1 transition-colors ${
          wished ? "text-brand ring-brand/30" : "text-ink/60 ring-line hover:text-brand"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
          <path d="M12 21c-4.8-3.6-8-6.6-8-10.2A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 8 3.8C20 14.4 16.8 17.4 12 21z" />
        </svg>
      </button>

      <div className="px-2 pb-4 pt-3">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-ink">{inr(product.price)}</span>
          <span className="text-[13px] text-faint line-through">{inr(product.mktPrice)}</span>
        </div>
        {product.express && (
          <span className="mt-1 inline-block rounded bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-muted">
            ⚡ Ready to Ship
          </span>
        )}
        <Link
          href={`/product/${product.slug}`}
          className="mt-1.5 block truncate font-heading text-sm text-ink transition-colors hover:text-brand"
          title={product.name}
        >
          {product.name}
        </Link>
        <p className="mt-0.5 text-[11px] text-faint">Style Code – {product.styleCode}</p>
      </div>
    </div>
  );
}
