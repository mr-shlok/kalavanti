"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./providers/CartProvider";
import { useToast } from "./providers/ToastProvider";
import { inr, splitTax } from "@/lib/format";

export default function CartDrawer() {
  const { lines, drawerOpen, closeDrawer, setQty, remove, subtotal, coupon, applyCoupon, removeCoupon, discount, count } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [code, setCode] = useState("");

  const total = Math.max(0, subtotal - discount);
  const { taxable, tax } = splitTax(total);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-ink/40"
            onClick={closeDrawer}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-[85] flex w-[min(400px,92vw)] flex-col bg-card shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-heading text-lg font-semibold text-brand-dark">
                Your Cart {count > 0 && <span className="text-sm font-normal text-muted">({count} item{count > 1 ? "s" : ""})</span>}
              </h2>
              <button onClick={closeDrawer} aria-label="Close cart" className="p-1 text-muted hover:text-ink">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-champagne">
                  <path d="M7 2h10l5 7-10 13L2 9z" />
                  <path d="M7 2l3 7 2-7 2 7 3-7M2 9h20M12 22 8 9m4 13 4-13" strokeWidth="0.8" />
                </svg>
                <p className="font-heading text-lg text-ink">Your cart awaits its first treasure</p>
                <p className="text-sm text-muted">Free insured shipping · Lifetime buyback on all designs</p>
                <Link href="/category/diamond" onClick={closeDrawer} className="btn-maroon mt-2">
                  Explore Collections
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5">
                  {/* coupon unlock strip */}
                  {!coupon ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (applyCoupon(code)) toast(`Coupon ${code.toUpperCase()} applied 🎉`);
                        else toast("That code isn't valid — try KAL1500");
                        setCode("");
                      }}
                      className="mt-4 rounded-lg border border-dashed border-gold/50 bg-cream/60 p-3"
                    >
                      <p className="text-[11px] font-semibold tracking-wide text-brand">
                        ✦ Use code <span className="rounded bg-white px-1.5 py-0.5 font-mono text-brand ring-1 ring-brand/30">KAL1500</span> — flat ₹1,500 off your first order
                      </p>
                      <div className="mt-2 flex gap-2">
                        <input
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="Enter coupon code"
                          className="h-9 flex-1 rounded-md border border-line px-3 text-sm outline-none focus:border-brand"
                        />
                        <button type="submit" className="btn-maroon h-9 rounded-md px-4 text-xs">
                          Apply
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="mt-4 flex items-center justify-between rounded-lg bg-softpink px-3 py-2 text-sm text-brand">
                      <span>✓ {coupon} applied — you save {inr(discount)}</span>
                      <button onClick={removeCoupon} className="text-xs underline">
                        Remove
                      </button>
                    </div>
                  )}

                  <ul className="mt-4 divide-y divide-line">
                    {lines.map((l) => (
                      <li key={l.productSlug + l.variantLabel} className="flex gap-3 py-4">
                        <Link href={`/product/${l.productSlug}`} onClick={closeDrawer} className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-card ring-1 ring-line">
                          <Image src={l.product.images[0]} alt={l.product.name} fill sizes="80px" className="object-cover" />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <Link href={`/product/${l.productSlug}`} onClick={closeDrawer} className="block truncate font-heading text-sm hover:text-brand">
                            {l.product.name}
                          </Link>
                          <p className="mt-0.5 text-xs text-faint">{l.variantLabel}</p>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex items-center rounded border border-line">
                              <button onClick={() => setQty(l.productSlug, l.variantLabel, l.qty - 1)} aria-label="Decrease quantity" className="px-2 py-1 text-brand hover:bg-softpink">
                                −
                              </button>
                              <span className="w-7 text-center text-sm">{l.qty}</span>
                              <button onClick={() => setQty(l.productSlug, l.variantLabel, l.qty + 1)} aria-label="Increase quantity" className="px-2 py-1 text-brand hover:bg-softpink">
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => remove(l.productSlug, l.variantLabel)}
                              aria-label={`Remove ${l.product.name}`}
                              className="text-xs text-faint hover:text-cta-to"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <span className="text-sm font-semibold">{inr(l.unitPrice * l.qty)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* summary */}
                <div className="border-t border-line px-5 py-4">
                  <dl className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-muted">
                      <dt>Subtotal</dt>
                      <dd>{inr(subtotal)}</dd>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-brand">
                        <dt>Coupon ({coupon})</dt>
                        <dd>− {inr(discount)}</dd>
                      </div>
                    )}
                    <div className="flex justify-between text-muted">
                      <dt>Shipping & insurance</dt>
                      <dd className="text-brand">FREE</dd>
                    </div>
                    <div className="flex justify-between text-muted">
                      <dt>GST incl. ({taxable ? "on " + inr(taxable) : "—"})</dt>
                      <dd>{inr(tax)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-line pt-2 text-base font-bold text-brand-dark">
                      <dt>Grand Total</dt>
                      <dd>{inr(total)}</dd>
                    </div>
                  </dl>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Link href="/cart" onClick={closeDrawer} className="btn-ghost h-11 justify-center rounded-lg">
                      View Cart
                    </Link>
                    <button
                      onClick={() => {
                        closeDrawer();
                        router.push("/checkout");
                      }}
                      className="h-11 rounded-full bg-brand-dark text-sm font-semibold text-white transition-colors hover:bg-brand"
                    >
                      Quick Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
