"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, type TopNav } from "@/lib/categories";
import { useCart } from "./providers/CartProvider";
import { useWishlist } from "./providers/WishlistProvider";
import Logo from "./Logo";
import SearchOverlay from "./SearchOverlay";
import MobileMenu from "./MobileMenu";

/* Small line-icons for the top-level nav, keyed by label. */
const NAV_ICONS: Record<string, string> = {
  Diamond: "M6 3h12l4 6-10 12L2 9z",
  Gemstone: "M12 3l3.5 4H22l-3 5 3 5h-6.5L12 21l-3.5-5H2l3-5-3-5h6.5z",
  Gold: "M4 9l8-4 8 4v6l-8 4-8-4z",
  Platinum: "M5 12h14M7 8h10M9 16h6",
  Bridal: "M12 4l3 4-3 4-3-4zM12 12v8M9 20h6",
  Collections: "M4 7l8-4 8 4v10l-8 4-8-4z",
  Gifts: "M4 9h16v11H4zM4 9l2-4h12l2 4M12 5v15",
  Solitaire: "M12 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 12V7l2-3h-4l2 3",
  "By Price": "M7 5h10M7 9h10M16 5c0 4-3.5 5-7 5l6 8",
};

function NavIcon({ label }: { label: string }) {
  const d = NAV_ICONS[label] ?? "M12 3l3 6 6 1-4.5 4.5L18 21l-6-3-6 3 1.5-6.5L3 10l6-1z";
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 opacity-90"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

function IconBtn({
  label,
  href,
  onClick,
  badge,
  children,
}: {
  label: string;
  href?: string;
  onClick?: () => void;
  badge?: number;
  children: React.ReactNode;
}) {
  const inner = (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:text-brand"
    >
      {children}
      {badge != null && badge > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-semibold text-white">
          {badge > 99 ? "99+" : badge}
        </span>
      )}
    </button>
  );
  return href ? (
    <Link href={href} aria-label={label} className="contents">
      {inner}
    </Link>
  ) : (
    inner
  );
}

function MegaPanel({ nav }: { nav: TopNav }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      /* Anchored to the full-width <nav> (position:relative) with top-full, so the
         panel begins exactly at the nav bar's bottom edge — it can never overlap or
         slice the nav labels. It is centred on the nav (which is centred in the
         viewport) and clamped to the viewport width, so it never spills off-screen. */
      className="absolute left-1/2 top-full z-40 max-h-[calc(100vh-160px)] w-[max(320px,calc(100vw-2rem))] max-w-[1100px] -translate-x-1/2 overflow-y-auto rounded-b-xl border border-line bg-card shadow-[0_24px_40px_-24px_rgba(33,37,41,0.25)]"
    >
      <div className="flex">
        {/* Left rail only when the panel is at full 1100px width; below that it
            would push sections off-screen, so it is hidden and content stays centered. */}
        {nav.rail && (
          <div className="hidden w-52 shrink-0 border-r border-line p-5 xl:block">
            <p className="eyebrow mb-3">Shop By Product</p>
            <ul className="space-y-1.5">
              {nav.rail.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-ink transition-colors hover:bg-softpink hover:text-brand"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" className="shrink-0 text-gold" fill="currentColor">
                      <path d="M7 2h10l5 7-10 13L2 9z" opacity=".85" />
                    </svg>
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="min-w-0 flex-1 p-6">
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(130px,1fr))]">
            {nav.sections?.map((s) => (
              <div key={s.title}>
                <p className="eyebrow mb-3">{s.title}</p>
                <ul className="space-y-2">
                  {s.items.map((it) => (
                    <li key={it.href + it.label}>
                      <Link href={it.href} className="text-sm text-muted transition-colors hover:text-brand">
                        {it.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {nav.highlights && (
            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5 xl:grid-cols-6">
              {nav.highlights.map((h) => (
                <Link key={h.href + h.label} href={h.href} className="group relative block overflow-hidden rounded-lg">
                  <div className="relative aspect-[4/3] w-full bg-softpink">
                    <Image
                      src={h.img}
                      alt={h.label}
                      fill
                      sizes="300px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="mt-2 block text-center font-heading text-sm text-ink group-hover:text-brand">
                    {h.label}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { count, openDrawer, hydrated } = useCart();
  const w = useWishlist();
  const wCount = w.hydrated ? w.slugs.length : undefined;
  const [openNav, setOpenNav] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    setOpenNav(null);
    setSearchOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const enter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenNav(label);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpenNav(null), 120);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-line bg-surface shadow-[0_8px_6px_-6px_rgba(228,232,237,0.9)]">
        {/* top row: gold rate · logo · actions */}
        <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-3 py-2.5 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:text-brand lg:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
            </button>
            <span className="hidden items-center gap-2 text-[13px] font-medium tracking-wide text-ink lg:flex">
              <svg width="16" height="16" viewBox="0 0 24 24" className="text-gold" fill="currentColor" aria-hidden="true">
                <path d="M13 2c1 4-2 5-2 8a3 3 0 0 0 6 0c0-1 0-2-1-3 3 2 5 5 5 8a8 8 0 1 1-16 0c0-5 5-7 8-13z" />
              </svg>
              <span className="text-muted">GOLD RATE</span>
              <span className="font-semibold text-brand">22K&nbsp;₹7,290/g</span>
            </span>
          </div>

          <Link href="/" aria-label="Kalavanti home" className="flex justify-center">
            <Logo />
          </Link>

          <div className="flex items-center justify-end gap-0.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="mr-1 hidden h-10 items-center gap-2 rounded-full bg-card px-4 text-sm text-faint ring-1 ring-line transition-colors hover:text-brand md:flex"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              Search designs…
            </button>
            <IconBtn label="Search" onClick={() => setSearchOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="md:hidden">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </IconBtn>
            <IconBtn label="Account" href="/account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
              </svg>
            </IconBtn>
            <IconBtn label="Wishlist" href="/wishlist" badge={mounted ? wCount : undefined}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 21c-4.8-3.6-8-6.6-8-10.2A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 8 3.8C20 14.4 16.8 17.4 12 21z" />
              </svg>
            </IconBtn>
            <IconBtn label="Cart" onClick={openDrawer} badge={mounted && hydrated ? count : undefined}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 7h12l-1.2 12.2a1.5 1.5 0 0 1-1.5 1.35H8.7a1.5 1.5 0 0 1-1.5-1.35z" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
            </IconBtn>
          </div>
        </div>

        {/* desktop icon nav */}
        <nav className="relative hidden border-t border-line/60 lg:block" onMouseLeave={leave}>
          <ul className="mx-auto flex max-w-7xl items-center justify-center gap-0.5 px-4">
            {NAV.map((n) => (
              <li key={n.label} className="relative" onMouseEnter={() => enter(n.label)}>
                <Link
                  href={n.href}
                  className={`group relative flex items-center gap-1.5 px-3 py-2.5 text-[12.5px] font-medium uppercase tracking-[0.08em] transition-colors ${
                    openNav === n.label ? "text-gold font-bold" : "text-muted hover:text-gold"
                  }`}
                >
                  <NavIcon label={n.label} />
                  {n.label}
                  <span
                    className={`absolute inset-x-2.5 bottom-1 h-[3px] rounded-md bg-gold transition-transform duration-300 ${
                      openNav === n.label ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* single mega panel, anchored to the <nav> so it drops below the whole
              bar instead of below an individual (left-shifted) item */}
          <AnimatePresence>
            {(() => {
              const n = NAV.find((x) => x.label === openNav && (x.sections || x.rail));
              return n ? <MegaPanel key={n.label} nav={n} /> : null;
            })()}
          </AnimatePresence>
        </nav>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
