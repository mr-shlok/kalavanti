import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Policy = { title: string; updated: string; body: { h: string; ps: string[] }[] };

const POLICIES: Record<string, Policy> = {
  shipping: {
    title: "Shipping Policy",
    updated: "October 2026",
    body: [
      { h: "Dispatch", ps: ["Ready-to-Ship designs leave our vault within 24 working hours of payment confirmation.", "Made-to-order and bespoke pieces are dispatched in 10–14 working days, after final polishing and hallmarking."] },
      { h: "Delivery", ps: ["We ship across India via insured, GPS-tracked secure couriers. Typical transit is 3–5 working days metro, 5–7 for other pincodes.", "Every parcel is tamper-evident sealed and fully insured to the invoice value at no cost to you."] },
      { h: "Tracking", ps: ["You will receive a tracking link by email and SMS at dispatch. The toll-free concierge 1800-KALAVANTI can quote live status any time."] },
    ],
  },
  returns: {
    title: "Returns & Exchange",
    updated: "October 2026",
    body: [
      { h: "15-Day Returns", ps: ["Non-customised pieces may be returned within 15 days of delivery in unworn condition with original packaging, invoice and certificates.", "Refunds are processed to the original payment method within 7 working days of receiving the returned item and passing our intake check."] },
      { h: "What Can’t Be Returned", ps: ["Bespoke commissions, resized-to-spec rings, engraving-personalised items and gold coins are not eligible for return, though standard warranty and buyback still apply."] },
      { h: "Exchange & Buyback", ps: ["Any Kalavanti piece can be exchanged for a new design at any time under the Lifetime Buyback promise — see the Buyback Policy."] },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    updated: "October 2026",
    body: [
      { h: "What We Collect", ps: ["Name, contact details and delivery address to fulfil orders, and browsing preferences to personalise the storefront. This demo site stores cart, wishlist and session data only in your own browser (localStorage)."] },
      { h: "How We Use It", ps: ["Order fulfilment, insurance and statutory compliance only. We never sell customer data, and marketing emails are strictly opt-in with one-tap unsubscribe."] },
      { h: "Your Rights", ps: ["Request a copy, correction or deletion of your data any time via care@kalavanti.example. Grievance officer details are furnished on request."] },
    ],
  },
  terms: {
    title: "Terms of Use",
    updated: "October 2026",
    body: [
      { h: "Pricing", ps: ["All prices are in Indian Rupees and inclusive of GST and making charges. Weight-based designs settle at actual finished weight, with any difference adjusted at dispatch."] },
      { h: "Certificates", ps: ["Diamond grading reports are issued by independent labs (IGI/GIA); Kalavanti guarantees the stone matches its certificate and accepts responsibility for that guarantee."] },
      { h: "Use of the Site", ps: ["This storefront is a demonstration project for a fictional brand. Content, imagery and copy may not be reused without permission. Nothing here constitutes financial or jewellery-trading advice."] },
    ],
  },
  buyback: {
    title: "Buyback Promise",
    updated: "October 2026",
    body: [
      { h: "Lifetime, No Conditions", ps: ["Every Kalavanti piece can be sold back or exchanged at any of our showrooms, at any point in its life — the promise does not expire."] },
      { h: "Transparent Valuation", ps: ["Gold is valued at the day's spot rate for its hallmarked purity. Certified diamonds are valued against the current Rapaport-based list, minus only the published, pre-agreed deductions."] },
      { h: "No Lock-ins", ps: ["No vouchers, no store-credit-only terms, no making-charge forfeits on gold buyback. You may take cash or credit it toward a new design — your choice."] },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: POLICIES[slug]?.title ?? "Policy" };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = POLICIES[slug];
  if (!policy) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <nav aria-label="Breadcrumb" className="mb-3 text-xs text-muted">
        <Link href="/" className="hover:text-brand">Home</Link> / <Link href="/faq" className="hover:text-brand">Customer Care</Link> / <span>{policy.title}</span>
      </nav>
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">{policy.title}</h1>
      <p className="mt-1 text-xs uppercase tracking-wider text-faint">Last updated · {policy.updated}</p>

      <div className="mt-8 space-y-8">
        {policy.body.map((s) => (
          <section key={s.h}>
            <h2 className="font-heading text-lg font-semibold text-brand">{s.h}</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-7 text-muted">
              {s.ps.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
      {Object.entries(POLICIES)
        .filter(([k]) => k !== slug)
        .map(([k, p]) => (
          <Link key={k} href={`/policies/${k}`} className="rounded-lg border border-line bg-card px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-brand/40 hover:text-brand">
            {p.title} →
          </Link>
        ))}
      </div>
    </div>
  );
}
