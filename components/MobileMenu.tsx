"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { NAV } from "@/lib/categories";

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/40 lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.28 }}
            className="fixed inset-y-0 left-0 z-[65] flex w-[min(360px,88vw)] flex-col bg-card lg:hidden"
          >
            {/* header strip */}
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="font-heading text-lg tracking-[0.15em] text-brand">KALAVANTI</span>
              <button onClick={onClose} aria-label="Close menu" className="p-2 text-muted hover:text-ink">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* gold rate style strip */}
            <div className="bg-cream px-4 py-2 text-[11px] tracking-wide text-gold">
              ✦ Free insured shipping · Lifetime buyback · BIS hallmark guarantee
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-3">
              {NAV.map((n) => {
                const hasChildren = !!(n.rail || n.sections);
                return (
                  <div key={n.label} className="border-b border-line/60 last:border-0">
                    <div className="flex items-center">
                      <Link
                        href={n.href}
                        onClick={onClose}
                        className="flex-1 px-3 py-3 text-sm font-semibold uppercase tracking-wider text-ink"
                      >
                        {n.label}
                      </Link>
                      {hasChildren && (
                        <button
                          aria-label={`Expand ${n.label}`}
                          onClick={() => setExpanded(expanded === n.label ? null : n.label)}
                          className="p-3 text-brand"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`transition-transform ${expanded === n.label ? "rotate-90" : ""}`}
                          >
                            <path d="m9 6 6 6-6 6" strokeLinecap="round" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {expanded === n.label && hasChildren && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-page/60"
                        >
                          <div className="px-4 py-3">
                            {n.rail && (
                              <>
                                <p className="eyebrow mb-2">Products</p>
                                <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1.5">
                                  {n.rail.map((r) => (
                                    <Link key={r.href} href={r.href} onClick={onClose} className="text-[13px] text-muted hover:text-brand">
                                      {r.label}
                                    </Link>
                                  ))}
                                </div>
                              </>
                            )}
                            {n.sections?.map((s) => (
                              <div key={s.title} className="mb-3">
                                <p className="eyebrow mb-2">{s.title}</p>
                                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                                  {s.items.map((it) => (
                                    <Link
                                      key={it.href + it.label}
                                      href={it.href}
                                      onClick={onClose}
                                      className="text-[13px] text-muted hover:text-brand"
                                    >
                                      {it.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="mt-4 space-y-2 px-3 pb-6">
                <Link href="/about" onClick={onClose} className="block py-1.5 text-sm font-medium text-ink">Our Story</Link>
                <Link href="/contact" onClick={onClose} className="block py-1.5 text-sm font-medium text-ink">Contact & Stores</Link>
                <Link href="/faq" onClick={onClose} className="block py-1.5 text-sm font-medium text-ink">FAQ</Link>
                <Link href="/account" onClick={onClose} className="block py-1.5 text-sm font-medium text-ink">My Account</Link>
              </div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
