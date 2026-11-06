"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/providers/CartProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { inr, splitTax } from "@/lib/format";

export default function CartPage() {
  const { lines, subtotal, discount, coupon, applyCoupon, removeCoupon, setQty, remove, count } = useCart();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [tab, setTab] = useState<"promo" | "gift">("promo");
  const [gift, setGift] = useState("");

  const total = Math.max(0, subtotal - discount);
  const { tax } = splitTax(total);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* hero strip */}
      <div className="mb-8 rounded-xl bg-brand-dark px-6 py-8 text-center sm:py-10">
        <p className="eyebrow text-champagne">The Kalavanti Standard · Since 1948</p>
        <h1 className="mt-2 font-heading text-2xl font-semibold text-white sm:text-3xl">
          Diamonds You Love. Prices You’ll Adore.
        </h1>
      </div>

      {lines.length === 0 ? (
        <div className="rounded-xl bg-card py-20 text-center ring-1 ring-line">
          <p className="font-heading text-xl text-ink">Your cart is empty</p>
          <p className="mt-2 text-sm text-muted">Every heirloom starts with a first look.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/category/diamond" className="btn-maroon rounded-md">Shop Diamonds</Link>
            <Link href="/category/gold" className="btn-ghost rounded-md px-6">Shop Gold</Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold">Cart Items ({count})</h2>
            <ul className="divide-y divide-line rounded-xl bg-card ring-1 ring-line">
              {lines.map((l) => (
                <li key={l.productSlug + l.variantLabel} className="flex gap-4 p-5">
                  <Link href={`/product/${l.productSlug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-card ring-1 ring-line">
                    <Image src={l.product.images[0]} alt={l.product.name} fill sizes="96px" className="object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${l.productSlug}`} className="font-heading text-base hover:text-brand">
                      {l.product.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-faint">{l.variantLabel} · Style Code {l.product.styleCode}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <div className="flex items-center rounded border border-line">
                        <button onClick={() => setQty(l.productSlug, l.variantLabel, l.qty - 1)} aria-label="Decrease quantity" className="px-3 py-1.5 text-brand hover:bg-softpink">−</button>
                        <span className="w-8 text-center text-sm">{l.qty}</span>
                        <button onClick={() => setQty(l.productSlug, l.variantLabel, l.qty + 1)} aria-label="Increase quantity" className="px-3 py-1.5 text-brand hover:bg-softpink">+</button>
                      </div>
                      <button onClick={() => { remove(l.productSlug, l.variantLabel); toast("Removed from cart"); }} className="text-xs font-medium text-faint underline hover:text-cta-to">
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{inr(l.unitPrice * l.qty)}</p>
                    {l.product.express && <p className="mt-1 text-[11px] text-brand">⚡ Ships in 3–5 days</p>}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-card p-5 ring-1 ring-line">
              <div className="flex gap-6 border-b border-line pb-3 text-sm font-semibold">
                <button onClick={() => setTab("promo")} className={tab === "promo" ? "border-b-2 border-brand text-brand" : "text-muted"}>
                  Promo Code
                </button>
                <button onClick={() => setTab("gift")} className={tab === "gift" ? "border-b-2 border-brand text-brand" : "text-muted"}>
                  Gift Card
                </button>
              </div>
              {tab === "promo" ? (
                coupon ? (
                  <p className="mt-3 text-sm text-brand">
                    ✓ {coupon} applied — you save {inr(discount)}.{" "}
                    <button onClick={removeCoupon} className="underline">Remove</button>
                  </p>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast(applyCoupon(code) ? `Coupon ${code.toUpperCase()} applied 🎉` : "Invalid code — try KAL1500");
                      setCode("");
                    }}
                    className="mt-3 flex gap-2"
                  >
                    <input
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter promo code (e.g. KAL1500)"
                      className="h-10 flex-1 rounded-md border border-dashed border-gold/60 bg-cream/50 px-3 font-mono text-sm uppercase outline-none focus:border-brand"
                    />
                    <button className="btn-maroon h-10 rounded-md px-5 text-xs uppercase">Apply</button>
                  </form>
                )
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast(gift.length > 5 ? "Gift card balance added to checkout ✦" : "Please enter a valid gift card number");
                    setGift("");
                  }}
                  className="mt-3 flex gap-2"
                >
                  <input
                    value={gift}
                    onChange={(e) => setGift(e.target.value)}
                    placeholder="Kalavanti gift card number"
                    className="h-10 flex-1 rounded-md border border-line px-3 text-sm outline-none focus:border-brand"
                  />
                    <button className="btn-maroon h-10 rounded-md px-5 text-xs uppercase">Link</button>
                </form>
              )}
            </div>

            <Link href="/category/diamond" className="mt-6 inline-block text-sm font-semibold text-brand hover:underline">
              ← Continue Shopping
            </Link>
          </div>

          {/* summary */}
          <aside className="h-fit rounded-xl bg-card p-6 ring-1 ring-line lg:sticky lg:top-40">
            <h3 className="font-heading text-lg font-semibold text-brand-dark">Order Summary</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Subtotal ({count} item{count > 1 ? "s" : ""})</dt><dd>{inr(subtotal)}</dd></div>
              {discount > 0 && <div className="flex justify-between text-brand"><dt>Coupon ({coupon})</dt><dd>− {inr(discount)}</dd></div>}
              <div className="flex justify-between"><dt className="text-muted">Shipping & insurance</dt><dd className="text-brand font-medium">FREE</dd></div>
              <div className="flex justify-between"><dt className="text-muted">GST (incl.)</dt><dd>{inr(tax)}</dd></div>
              <div className="flex justify-between border-t border-line pt-3 text-base font-bold text-brand-dark">
                <dt>Total Payable</dt><dd>{inr(total)}</dd>
              </div>
            </dl>
            <Link href="/checkout" className="btn-cta mt-5 h-12 w-full rounded-full text-sm uppercase tracking-wider">
              Proceed to Checkout
            </Link>
            <p className="mt-3 text-center text-[11px] text-faint">
              🛡 100% secure payments · UPI, cards, net-banking & COD on eligible designs
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
