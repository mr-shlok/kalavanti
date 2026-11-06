"use client";

import React, { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { useToast } from "@/components/providers/ToastProvider";
import { inr } from "@/lib/format";

const DENOMS = [5000, 10000, 25000, 50000, 100000];

export default function GiftCardsPage() {
  const { toast } = useToast();
  const [sel, setSel] = useState(10000);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav aria-label="Breadcrumb" className="mb-3 text-xs text-muted">
        <Link href="/" className="hover:text-brand">Home</Link> / <span>Gift Cards</span>
      </nav>
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">The Gift of Gold & Light</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        A Kalavanti gift card never expires, works online and in all five showrooms, and can be topped
        up against any purchase — including buyback exchanges.
      </p>

      <div className="mt-8 grid items-start gap-8 md:grid-cols-2">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-dark via-brand to-gold p-6 text-white shadow-xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-champagne">Kalavanti · Since 1948</p>
            <p className="mt-8 font-heading text-3xl font-semibold">{inr(sel)}</p>
            <p className="mt-1 text-xs text-white/80">Fine Jewellery Gift Certificate</p>
            <div className="mt-10 flex items-end justify-between text-[11px]">
              <div>
                <p className="text-white/60">TO</p>
                <p className="font-medium">{to.trim() || "A loved one"}</p>
              </div>
              <div className="text-right">
                <p className="text-white/60">FROM</p>
                <p className="font-medium">{from.trim() || "You"}</p>
              </div>
            </div>
            <svg viewBox="0 0 24 24" className="absolute -right-4 -top-4 h-32 w-32 text-white/10" fill="currentColor">
              <path d="M7 2h10l5 7-10 13L2 9z" />
            </svg>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl bg-card p-6 ring-1 ring-line">
            <p className="eyebrow mb-3">Choose Value</p>
            <div className="flex flex-wrap gap-2">
              {DENOMS.map((d) => (
                <button
                  key={d}
                  onClick={() => setSel(d)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-all ${
                    sel === d ? "border-brand bg-softpink text-brand ring-1 ring-brand" : "border-line text-muted hover:border-brand/40"
                  }`}
                >
                  {inr(d)}
                </button>
              ))}
            </div>
            <div className="mt-5 space-y-4">
              <label className="block text-sm">
                <span className="mb-1 block font-medium">Recipient name</span>
                <input value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-md border border-line px-3 py-2.5 outline-none focus:border-brand" placeholder="e.g. Ananya" />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium">Your name</span>
                <input value={from} onChange={(e) => setFrom(e.target.value)} className="w-full rounded-md border border-line px-3 py-2.5 outline-none focus:border-brand" placeholder="Who is gifting?" />
              </label>
            </div>
            <button
              onClick={() => toast(`Gift card for ${inr(sel)} generated ✦ (demo — emailed instantly)`)}
              className="btn-cta mt-6 h-12 w-full rounded-lg text-sm uppercase tracking-wider"
            >
              Create Gift Card · {inr(sel)}
            </button>
            <p className="mt-3 text-center text-[11px] text-faint">Demo storefront — no payment is processed.</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
