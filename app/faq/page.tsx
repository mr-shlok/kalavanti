"use client";

import React, { useState } from "react";
import Link from "next/link";

const FAQS: { q: string; a: string }[] = [
  { q: "Are all diamonds certified?", a: "Yes. Every loose diamond above 0.30 ct ships with an IGI or GIA grading report, and the certificate number is laser-inscribed on the girdle so you can verify it under a loupe or online." },
  { q: "What does the BIS hallmark guarantee?", a: "The BIS mark certifies the exact purity of gold and platinum used — 22K, 18K, 14K or PT950. You can verify any hallmark at a BIS-recognised assaying centre, and we fund re-assay if you ever doubt a piece." },
  { q: "How does lifetime buyback work?", a: "Bring any Kalavanti piece back to us, any time, for any reason. We value it on the day's gold/diamond rates plus the residual value of certified stones, and credit it against a new purchase or pay you directly. No expiry, no fine print." },
  { q: "Can I exchange my old jewellery?", a: "Absolutely. We weigh and test your old gold in front of you at the counter (or via insured pickup at home), quote transparently, and adjust the value instantly against your new order." },
  { q: "What are your delivery times?", a: "Ready-to-Ship designs leave the vault in 24 hours and arrive in 3–5 working days. Made-to-order and bespoke pieces take 10–14 working days. All shipments are fully insured and tamper-sealed." },
  { q: "What is your return policy?", a: "Non-customised pieces can be returned within 15 days of delivery in unworn condition with all certificates and packaging, for a full refund to the original payment method." },
  { q: "Do you make bespoke or replica-style commissions?", a: "We do. Our design desk will sketch, model in wax, and cast a one-of-one piece from your idea, sketch or heirloom. Book a consultation at any showroom or over video call." },
  { q: "How do I resize a ring or shorten a chain?", a: "Complimentary for life at any showroom. For customers away from our cities, we arrange insured two-way pickup for the adjustment." },
  { q: "Are the prices on the website final?", a: "Yes — all prices include GST and making charges, and are shown alongside a reference market price. Weight-based designs may vary a few rupees with the actual finished weight; we settle the difference at dispatch." },
  { q: "Is payment secure on this site?", a: "This is a demonstration storefront, so no real transaction occurs. In production we would use PCI-DSS compliant gateways with 3-D Secure on every card and net-banking transaction." },
];

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <nav aria-label="Breadcrumb" className="mb-3 text-xs text-muted">
        <Link href="/" className="hover:text-brand">Home</Link> / <span>FAQ</span>
      </nav>
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Questions, Answered</h1>
      <p className="mt-2 text-sm text-muted">Everything about certificates, buyback, delivery and care.</p>

      <div className="mt-8 divide-y divide-line rounded-xl bg-card ring-1 ring-line">
        {FAQS.map((f, i) => (
          <div key={f.q} className="px-5">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-sm font-semibold text-ink">{f.q}</span>
              <span className={`text-lg text-brand transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            {open === i && <p className="pb-5 text-sm leading-7 text-muted">{f.a}</p>}
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        Still curious? <Link href="/contact" className="font-semibold text-brand hover:underline">Ask a gemologist →</Link>
      </p>
    </div>
  );
}
