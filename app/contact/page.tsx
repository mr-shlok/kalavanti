"use client";

import React, { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { useToast } from "@/components/providers/ToastProvider";

const STORES = [
  { city: "Mumbai", addr: "Kalavanti House, Turner Road, Bandra West", hours: "10:30 – 20:30 · Daily" },
  { city: "Pune", addr: "Lane 7, Camp Junction", hours: "10:00 – 21:00 · Tue closed" },
  { city: "Bengaluru", addr: "100 Feet Road, Indiranagar", hours: "10:30 – 20:30 · Daily" },
  { city: "Hyderabad", addr: "Banjara Hills, Road No. 12", hours: "11:00 – 21:00 · Daily" },
  { city: "Lucknow", addr: "Hazratganj, KD Avenue", hours: "10:30 – 20:00 · Sun closed" },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [f, setF] = useState({ name: "", email: "", phone: "", msg: "" });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (f.name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(f.email) || f.msg.trim().length < 5) {
      toast("Please fill name, a valid email and your message");
      return;
    }
    setSent(true);
    toast("Message received — our concierge will call within 24h");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <nav aria-label="Breadcrumb" className="mb-3 text-xs text-muted">
        <Link href="/" className="hover:text-brand">Home</Link> / <span>Contact</span>
      </nav>
      <h1 className="font-heading text-3xl font-semibold sm:text-4xl">Talk to the House</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Toll-free <span className="font-semibold text-brand">1800-KALAVANTI</span> · WhatsApp concierge ·
        email <span className="font-semibold text-brand">care@kalavanti.example</span> — or write to us below.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="rounded-xl bg-card p-6 ring-1 ring-line">
            <h2 className="font-heading text-lg font-semibold">Send an Enquiry</h2>
            {sent ? (
              <div className="mt-6 rounded-lg bg-softpink p-5 text-sm text-brand">
                ✓ Thank you, {f.name.split(" ")[0]}. A gemologist will reach out within one working day.
                <button onClick={() => { setSent(false); setF({ name: "", email: "", phone: "", msg: "" }); }} className="mt-3 block font-semibold underline">
                  Write another
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1 block font-medium">Name</span>
                    <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} required className="w-full rounded-md border border-line px-3 py-2.5 outline-none focus:border-brand" />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1 block font-medium">Mobile (optional)</span>
                    <input value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} className="w-full rounded-md border border-line px-3 py-2.5 outline-none focus:border-brand" />
                  </label>
                </div>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">Email</span>
                  <input type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} required className="w-full rounded-md border border-line px-3 py-2.5 outline-none focus:border-brand" />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">How can we help? (bespoke design, bridal trousseau, buyback…)</span>
                  <textarea rows={4} value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} required className="w-full rounded-md border border-line px-3 py-2.5 outline-none focus:border-brand" />
                </label>
                <button className="btn-cta h-11 w-full rounded-lg text-sm uppercase tracking-wider">Submit Enquiry</button>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl bg-card p-6 ring-1 ring-line">
            <h2 className="font-heading text-lg font-semibold">Showrooms</h2>
            <ul className="mt-4 divide-y divide-line">
              {STORES.map((s) => (
                <li key={s.city} className="flex items-start justify-between gap-4 py-3.5">
                  <div>
                    <p className="text-sm font-semibold text-brand">{s.city}</p>
                    <p className="text-sm text-muted">{s.addr}</p>
                  </div>
                  <p className="whitespace-nowrap text-right text-xs text-faint">{s.hours}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex aspect-[16/8] items-center justify-center rounded-lg bg-cream text-sm text-gold ring-1 ring-champagne/50">
              ✦ Store map loads in the showroom finder on our mobile app — or ask the concierge for directions.
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
