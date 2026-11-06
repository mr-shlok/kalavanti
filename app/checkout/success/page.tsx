"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { inr } from "@/lib/format";

type Order = { id: string; total: number; count: number; at: string; lines: { name: string; qty: number; price: number }[] };

export default function CheckoutSuccess() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("kalavanti.lastOrder");
      if (raw) setOrder(JSON.parse(raw) as Order);
    } catch {}
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <Reveal>
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-softpink ring-2 ring-brand">
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#85372b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mt-6 font-heading text-3xl font-semibold text-brand-dark">Order Confirmed ✦</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          Thank you for choosing Kalavanti. Our atelier will handcraft and hallmark your piece with care.
          A confirmation has been sent to your email, and our concierge will call to schedule delivery.
        </p>

        {order ? (
          <div className="mt-8 rounded-xl bg-card p-6 text-left ring-1 ring-line">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-faint">Order Number</p>
                <p className="font-mono text-lg font-semibold text-brand">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wider text-faint">Amount Paid</p>
                <p className="text-lg font-semibold">{inr(order.total)}</p>
              </div>
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {order.lines.map((l, i) => (
                <li key={i} className="flex justify-between text-muted">
                  <span>{l.name} × {l.qty}</span>
                  <span>{inr(l.price * l.qty)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded bg-cream px-3 py-2 text-xs text-gold">
              🚚 Free insured dispatch · Track via the toll-free line 1800-KALAVANTI
            </p>
          </div>
        ) : (
          <p className="mt-8 text-sm text-muted">Recent orders will appear here once you check out.</p>
        )}

        <div className="mt-8 flex justify-center gap-3">
          <Link href="/category/new-arrivals" className="btn-maroon rounded-full px-8">Keep Exploring</Link>
          <Link href="/" className="btn-ghost rounded-full px-8">Back Home</Link>
        </div>
      </Reveal>
    </div>
  );
}
