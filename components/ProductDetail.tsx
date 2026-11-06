"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { inr } from "@/lib/format";
import { useCart } from "./providers/CartProvider";
import { useWishlist } from "./providers/WishlistProvider";
import { useToast } from "./providers/ToastProvider";

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-3.5 text-left text-sm font-semibold text-ink"
        aria-expanded={open}
      >
        {title}
        <span className="text-brand">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="pb-4 text-sm leading-6 text-muted">{children}</div>}
    </div>
  );
}

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [variant, setVariant] = useState(product.variants[0]?.label ?? "Standard");
  const [price, setPrice] = useState(product.variants[0]?.price ?? product.price);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [pin, setPin] = useState("");
  const [pinMsg, setPinMsg] = useState<string | null>(null);
  const imgWrap = useRef<HTMLDivElement>(null);

  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const { toast } = useToast();
  const wished = has(product.slug);

  const chooseVariant = (label: string, p: number) => {
    setVariant(label);
    setPrice(p);
  };

  const onMove = (e: React.MouseEvent) => {
    const r = imgWrap.current?.getBoundingClientRect();
    if (!r) return;
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  const checkPin = () => {
    if (!/^\d{6}$/.test(pin)) return setPinMsg("Please enter a valid 6-digit pincode");
    const ship = 3 + (Number(pin[pin.length - 1]) % 5); // deterministic mock: 3–7 days
    setPinMsg(`✓ Delivers to ${pin} in ${ship}–${ship + 2} working days · Free insured shipping`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-brand">Home</Link> /{" "}
        <Link href={`/category/${product.metals[0]}`} className="hover:text-brand capitalize">
          {product.metals[0]}
        </Link>{" "}
        /{" "}
        <Link href={`/category/${product.types[0] ?? "diamond"}`} className="hover:text-brand capitalize">
          {product.types[0] ?? "jewellery"}
        </Link>{" "}
        / <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* gallery */}
        <div>
          <div
            ref={imgWrap}
            onMouseMove={onMove}
            onMouseLeave={() => setZoom(null)}
            className="relative aspect-square overflow-hidden rounded-lg bg-card ring-1 ring-line cursor-zoom-in"
          >
            <Image
              src={product.images[active]}
              alt={product.name}
              fill
              priority
              sizes="(max-width:1024px) 92vw, 46vw"
              className="object-cover transition-transform duration-200"
              style={zoom ? { transform: "scale(1.9)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
            />
            {product.discountLabel && (
              <span className="absolute left-0 top-4 rounded-r bg-softpink px-3 py-1 text-xs font-semibold">{product.discountLabel}</span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative h-16 w-16 overflow-hidden rounded bg-card transition-all ${
                    i === active ? "ring-2 ring-brand" : "ring-1 ring-line opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="64px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
          <p className="mt-3 text-xs text-faint">Hover over the image to zoom · Move your cursor to explore details</p>
        </div>

        {/* buy box */}
        <div>
          <div className="mb-4 rounded-lg bg-softpink px-4 py-3 text-sm text-brand">
            ✦ Certified diamonds & BIS hallmarked metal · 100% buyback on exchange
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-ink">{inr(price)}</span>
            <span className="text-base text-faint line-through">{inr(product.mktPrice)}</span>
            <span className="text-xs font-semibold text-brand">
              {Math.round(((product.mktPrice - price) / product.mktPrice) * 100)}% off
            </span>
          </div>
          <p className="mt-1 text-xs text-muted">Inclusive of all taxes · Making charges baked in</p>

          <h1 className="mt-4 font-heading text-2xl font-semibold text-ink">{product.name}</h1>
          <p className="mt-1 text-sm text-faint">Style Code – {product.styleCode}</p>
          {product.express && (
            <span className="mt-2 inline-block rounded bg-neutral-100 px-2 py-1 text-[11px] font-medium text-muted">⚡ Ready to Ship in 3–5 days</span>
          )}

          <p className="mt-4 text-sm leading-6 text-muted">{product.desc}</p>

          {/* variant selector */}
          {product.variants.length > 1 && (
            <div className="mt-6">
              <p className="eyebrow mb-2">Metal & Purity</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.label}
                    onClick={() => chooseVariant(v.label, v.price)}
                    className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                      variant === v.label
                        ? "border-brand bg-softpink font-semibold text-brand ring-1 ring-brand"
                        : "border-line bg-card text-muted hover:border-brand/50"
                    }`}
                  >
                    {v.label}
                    <span className="ml-2 text-xs">{inr(v.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="mt-4 text-xs text-muted">
            Approx. gross weight {product.weightG} g{product.stone ? ` · ${product.stone}` : ""} · Made to order in 10–14 days unless marked Ready to Ship
          </p>

          {/* qty + add */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-line bg-card">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="px-3.5 py-2.5 text-brand hover:bg-softpink">−</button>
              <span className="w-8 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity" className="px-3.5 py-2.5 text-brand hover:bg-softpink">+</button>
            </div>
            <button onClick={() => { add(product, variant, qty); toast(`${product.name} added to cart`); }} className="btn-cta h-12 flex-1 text-sm uppercase tracking-wider">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 7h12l-1.2 12.2a1.5 1.5 0 0 1-1.5 1.35H8.7a1.5 1.5 0 0 1-1.5-1.35z" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
              Add to Cart
            </button>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <button onClick={() => toggle(product.slug)} className="btn-ghost h-10">
              <svg width="15" height="15" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                <path d="M12 21c-4.8-3.6-8-6.6-8-10.2A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 8 3.8C20 14.4 16.8 17.4 12 21z" />
              </svg>
              {wished ? "Wishlisted" : "Wishlist"}
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                toast("Product link copied");
              }}
              className="btn-ghost h-10"
            >
              ↗ Share
            </button>
            <Link href={`/contact?subject=${encodeURIComponent(`Enquiry: ${product.name} (${product.styleCode})`)}`} className="btn-ghost h-10 justify-center">
              ✉ Enquiry
            </Link>
          </div>

          {/* delivery check */}
          <div className="mt-6 rounded-lg border border-line bg-card p-4">
            <p className="text-sm font-semibold text-ink">Check delivery to your pincode</p>
            <div className="mt-2 flex gap-2">
              <input
                value={pin}
                onChange={(e) => { setPin(e.target.value.replace(/\D/g, "").slice(0, 6)); setPinMsg(null); }}
                placeholder="6-digit pincode"
                inputMode="numeric"
                className="h-10 w-40 rounded-md border border-line px-3 text-sm outline-none focus:border-brand"
              />
              <button onClick={checkPin} className="btn-maroon h-10 rounded-md px-5 text-xs uppercase tracking-wide">Check</button>
            </div>
            {pinMsg && <p className={`mt-2 text-xs ${pinMsg.startsWith("✓") ? "text-brand" : "text-cta-to"}`}>{pinMsg}</p>}
          </div>

          {/* accordions */}
          <div className="mt-6">
            <Accordion title="Craftsmanship & Certification" defaultOpen>
              Hand-assembled in our atelier and finished by master karigars. Diamonds are IGI/GIA graded
              with a copy of the certificate shipped alongside your order; gold and platinum carry the
              BIS hallmark with laser-etched purity marks.
            </Accordion>
            <Accordion title="Shipping & Insurance">
              Free insured delivery across India via secure partners. Ready-to-ship designs arrive in
              3–5 working days; made-to-order pieces in 10–14 working days. Every parcel is tamper-sealed
              and fully insured door-to-door.
            </Accordion>
            <Accordion title="Returns, Exchange & Lifetime Buyback">
              15-day easy returns on non-custom pieces. Exchange anytime with transparent weight-based
              valuation, and enjoy lifetime buyback at the prevailing gold rate — the promise the house
              was built on.
            </Accordion>
          </div>
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="h2-serif rule-gold mb-8 inline-block pb-3 text-center block">You May Also Adore</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {related.map((p) => (
              <Link key={p.slug} href={`/product/${p.slug}`} className="group bg-card p-2">
                <div className="relative aspect-square overflow-hidden bg-card">
                  <Image src={p.images[0]} alt={p.name} fill sizes="280px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="mt-2 truncate font-heading text-sm group-hover:text-brand">{p.name}</p>
                <p className="text-sm font-semibold">{inr(p.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
