"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/providers/CartProvider";
import { inr, splitTax } from "@/lib/format";

type Form = { name: string; phone: string; email: string; addr: string; city: string; state: string; pin: string };
const EMPTY: Form = { name: "", phone: "", email: "", addr: "", city: "", state: "", pin: "" };

const STATES = ["Maharashtra", "Karnataka", "Telangana", "Gujarat", "Tamil Nadu", "Delhi", "Rajasthan", "Uttar Pradesh", "West Bengal", "Kerala", "Madhya Pradesh", "Other"];

export default function CheckoutPage() {
  const { lines, subtotal, discount, coupon, clear, count } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Form>>({});
  const [pay, setPay] = useState<"card" | "upi" | "net" | "cod">("upi");

  const total = Math.max(0, subtotal - discount);
  const { tax } = splitTax(total);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <p className="font-heading text-xl">Nothing to check out yet</p>
        <Link href="/category/diamond" className="btn-maroon mt-5 inline-flex rounded-md">Browse Jewellery</Link>
      </div>
    );
  }

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const validate = () => {
    const err: Partial<Form> = {};
    if (form.name.trim().length < 3) err.name = "Please enter the recipient's full name";
    if (!/^[6-9]\d{9}$/.test(form.phone)) err.phone = "Enter a valid 10-digit mobile number";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email for order updates";
    if (form.addr.trim().length < 8) err.addr = "Add house/flat number and street";
    if (!form.city.trim()) err.city = "City is required";
    if (!/^\d{6}$/.test(form.pin)) err.pin = "Enter a valid 6-digit pincode";
    setErrors(err);
    return Object.values(err).every((v) => !v);
  };

  const field = (k: keyof Form, label: string, extra?: { type?: string; el?: "textarea" | "select"; options?: string[] }) => (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-ink">{label}</span>
      {extra?.el === "textarea" ? (
        <textarea value={form[k]} onChange={set(k)} rows={2} className="w-full rounded-md border border-line px-3 py-2.5 outline-none focus:border-brand" />
      ) : extra?.el === "select" ? (
        <select value={form[k]} onChange={set(k)} className="w-full rounded-md border border-line bg-card px-3 py-2.5 outline-none focus:border-brand">
          <option value="">Select state</option>
          {extra.options?.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={extra?.type ?? "text"} value={form[k]} onChange={set(k)} className="w-full rounded-md border border-line px-3 py-2.5 outline-none focus:border-brand" />
      )}
      {errors[k] && <span className="mt-1 block text-xs text-cta-to">{errors[k]}</span>}
    </label>
  );

  const placeOrder = () => {
    const order = {
      id: "KAL" + Date.now().toString().slice(-8),
      total,
      count,
      at: new Date().toISOString(),
      lines: lines.map((l) => ({ name: l.product.name, qty: l.qty, price: l.unitPrice })),
    };
    localStorage.setItem("kalavanti.lastOrder", JSON.stringify(order));
    clear();
    router.push("/checkout/success");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-1 font-heading text-2xl font-semibold sm:text-3xl">Checkout</h1>
      <p className="mb-6 text-sm text-muted">
        <button onClick={() => setStep(1)} className={step === 1 ? "font-semibold text-brand" : "text-muted hover:text-brand"}>1 · Delivery</button>
        <span className="mx-2 text-faint">→</span>
        <button onClick={() => step === 1 && validate() && setStep(2)} className={step === 2 ? "font-semibold text-brand" : "text-muted hover:text-brand"}>2 · Payment</button>
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {step === 1 ? (
          <div className="rounded-xl bg-card p-6 ring-1 ring-line">
            <h2 className="mb-5 font-heading text-lg font-semibold">Delivery Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {field("name", "Full name")}
              {field("phone", "Mobile number", { type: "tel" })}
              <div className="sm:col-span-2">{field("email", "Email", { type: "email" })}</div>
              <div className="sm:col-span-2">{field("addr", "Address (house, street, landmark)", { el: "textarea" })}</div>
              {field("city", "City")}
              {field("state", "State", { el: "select", options: STATES })}
              {field("pin", "Pincode")}
            </div>
            <button
              onClick={() => validate() && setStep(2)}
              className="btn-cta mt-6 h-12 w-full rounded-lg text-sm uppercase tracking-wider"
            >
              Continue to Payment
            </button>
          </div>
        ) : (
          <div className="rounded-xl bg-card p-6 ring-1 ring-line">
            <h2 className="mb-2 font-heading text-lg font-semibold">Payment</h2>
            <p className="mb-5 text-sm text-muted">Delivering to {form.name}, {form.city} {form.pin} · <button onClick={() => setStep(1)} className="text-brand underline">edit</button></p>
            <div className="space-y-3">
              {(
                [
                  ["upi", "UPI — GPay / PhonePe / Paytm", "Instant · recommended"],
                  ["card", "Credit / Debit Card", "Visa, Mastercard, RuPay, Amex"],
                  ["net", "Net Banking", "All major banks"],
                  ["cod", "Cash on Delivery", "Available up to ₹50,000"],
                ] as const
              ).map(([k, t, d]) => (
                <label key={k} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all ${pay === k ? "border-brand bg-softpink ring-1 ring-brand" : "border-line hover:border-brand/40"}`}>
                  <input type="radio" name="pay" checked={pay === k} onChange={() => setPay(k)} className="accent-[#85372b]" />
                  <span>
                    <span className="block text-sm font-semibold">{t}</span>
                    <span className="block text-xs text-muted">{d}</span>
                  </span>
                </label>
              ))}
            </div>
            {pay === "cod" && total > 50000 && (
              <p className="mt-3 rounded bg-softpink px-3 py-2 text-xs text-brand">COD isn’t available above ₹50,000 — please pick another method.</p>
            )}
            <button
              onClick={() => { if (pay !== "cod" || total <= 50000) placeOrder(); }}
              className="btn-cta mt-6 h-12 w-full rounded-lg text-sm uppercase tracking-wider"
            >
              Place Order · {inr(total)}
            </button>
          </div>
        )}

        {/* summary rail */}
        <aside className="h-fit rounded-xl bg-card p-6 ring-1 ring-line lg:sticky lg:top-40">
          <h3 className="mb-4 font-heading text-lg font-semibold">Order Summary</h3>
          <ul className="mb-4 max-h-64 space-y-3 overflow-auto">
            {lines.map((l) => (
              <li key={l.productSlug + l.variantLabel} className="flex items-center gap-3">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-card ring-1 ring-line">
                  <Image src={l.product.images[0]} alt={l.product.name} fill sizes="48px" className="object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm">{l.product.name}</span>
                  <span className="text-xs text-faint">{l.variantLabel} · ×{l.qty}</span>
                </span>
                <span className="text-sm font-medium">{inr(l.unitPrice * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="space-y-1.5 text-sm">
            <div className="flex justify-between text-muted"><dt>Subtotal</dt><dd>{inr(subtotal)}</dd></div>
            {discount > 0 && <div className="flex justify-between text-brand"><dt>Coupon ({coupon})</dt><dd>− {inr(discount)}</dd></div>}
            <div className="flex justify-between text-muted"><dt>Shipping & insurance</dt><dd className="text-brand">FREE</dd></div>
            <div className="flex justify-between text-muted"><dt>GST (incl.)</dt><dd>{inr(tax)}</dd></div>
            <div className="flex justify-between border-t border-line pt-2 font-bold text-brand-dark"><dt>Total</dt><dd>{inr(total)}</dd></div>
          </dl>
          <p className="mt-4 text-[11px] leading-4 text-faint">
            🔒 This is a demo storefront — no real payment is processed and no card data is stored.
          </p>
        </aside>
      </div>
    </div>
  );
}
