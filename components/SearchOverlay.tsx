"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS } from "@/lib/products";
import { inr } from "@/lib/format";

const TRENDS = ["Diamond Studs", "Bridal Set", "Tennis Bracelet", "Gold Chain", "Solitaire Ring"];

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const router = useRouter();

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.metals.some((m) => m.includes(s)) ||
        p.types.some((t) => t.includes(s)) ||
        p.tags.some((t) => t.includes(s)) ||
        p.styleCode.toLowerCase().includes(s)
    ).slice(0, 6);
  }, [q]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-ink/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="mx-auto mt-2 w-[min(680px,94vw)] rounded-xl bg-card p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={submit} className="flex items-center gap-2 border-b-2 border-brand pb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-brand">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search rings, earrings, bridal sets, style codes…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-faint"
              />
              <button type="button" onClick={onClose} aria-label="Close search" className="text-faint hover:text-ink">
                ✕
              </button>
            </form>

            {!q && (
              <div className="flex flex-wrap gap-2 pt-3">
                <span className="text-xs font-medium text-muted">Trending:</span>
                {TRENDS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setQ(t)}
                    className="rounded-full bg-softpink px-3 py-1 text-xs text-brand hover:bg-brand hover:text-white transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            {results.length > 0 && (
              <ul className="mt-3 max-h-[50vh] divide-y divide-line overflow-auto">
                {results.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-3 py-2.5 hover:bg-cream/60"
                    >
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-card ring-1 ring-line">
                        <Image src={p.images[0]} alt={p.name} fill sizes="48px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-heading text-sm">{p.name}</p>
                        <p className="text-[11px] text-faint">{p.styleCode}</p>
                      </div>
                      <span className="text-sm font-semibold">{inr(p.price)}</span>
                    </Link>
                  </li>
                ))}
                <li className="pt-1">
                  <button type="button" onClick={submit} className="text-xs font-semibold uppercase tracking-wide text-brand hover:underline">
                    See all results →
                  </button>
                </li>
              </ul>
            )}
            {q && results.length === 0 && (
              <p className="py-6 text-center text-sm text-faint">
                No designs match “{q}”. Try “ring”, “jhumka” or “bridal”.
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
