"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useToast } from "./providers/ToastProvider";
import { Monogram } from "./Logo";

const COL_SHOP = [
  { label: "Diamond Jewellery", href: "/category/diamond" },
  { label: "Gold Jewellery", href: "/category/gold" },
  { label: "Platinum", href: "/category/platinum" },
  { label: "Gemstone", href: "/category/gemstone" },
  { label: "Bridal Collection", href: "/category/bridal" },
  { label: "Bestsellers", href: "/category/bestsellers" },
  { label: "Gifting", href: "/category/gifting" },
];

const COL_COMPANY = [
  { label: "Our Story", href: "/about" },
  { label: "Contact & Stores", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Account", href: "/account" },
  { label: "Wishlist", href: "/wishlist" },
];

const COL_POLICIES = [
  { label: "Shipping Policy", href: "/policies/shipping" },
  { label: "Returns & Exchange", href: "/policies/returns" },
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Terms of Use", href: "/policies/terms" },
  { label: "Buyback Promise", href: "/policies/buyback" },
];

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="mt-16 bg-cream text-ink">
      {/* promise strip */}
      <div className="border-b border-line bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 text-center md:grid-cols-4">
          {[
            ["BIS Hallmarked", "Certified purity in every piece"],
            ["Lifetime Buyback", "Best-value exchange, always"],
            ["Free Insured Delivery", "Doorstep shipping across India"],
            ["15-Day Returns", "Change your mind, worry-free"],
          ].map(([t, d]) => (
            <div key={t}>
              <p className="font-heading text-sm font-semibold text-gold">{t}</p>
              <p className="mt-1 text-xs text-muted">{d}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 text-brand">
            <Monogram size={36} className="text-gold" />
            <span className="font-heading text-xl font-semibold tracking-[0.18em]">KALAVANTI</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            A house of handcrafted fine jewellery since 1948 — where old-world karigar
            mastery meets contemporary design. Every diamond graded, every gram hallmarked,
            every piece made to be inherited.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes("@")) return toast("Please enter a valid email");
              toast("Welcome to the Kalavanti list ✦");
              setEmail("");
            }}
            className="mt-6 flex max-w-sm overflow-hidden rounded-full border border-line bg-card"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email for private previews"
              className="h-11 flex-1 bg-transparent px-4 text-sm outline-none"
            />
            <button className="btn-cta h-11 rounded-none px-5 text-xs uppercase tracking-wider">Join</button>
          </form>
        </div>

        {[
          ["The House", COL_SHOP] as const,
          ["Kalavanti", COL_COMPANY] as const,
          ["Customer Care", COL_POLICIES] as const,
        ].map(([title, links]) => (
          <nav key={title} aria-label={title}>
            <p className="eyebrow mb-4">{title}</p>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted md:flex-row">
          <p>© {year ?? ""} Kalavanti Fine Jewellery · GSTIN 27AABCK1234K1ZV · All prices inclusive of taxes</p>
          <div className="flex items-center gap-4">
            <span className="font-semibold tracking-wide text-gold">🛡 Secure payments</span>
            <div className="flex gap-1.5">
              {["VISA", "MC", "UPI", "RUPAY", "AMEX"].map((p) => (
                <span key={p} className="rounded border border-line bg-card px-2 py-1 text-[10px] font-semibold tracking-wide text-muted">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
