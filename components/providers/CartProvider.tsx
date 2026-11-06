"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem, Product } from "@/lib/types";
import { getProduct } from "@/lib/products";

export type CartLine = CartItem & { product: Product; unitPrice: number };

type CartCtx = {
  lines: CartLine[];
  count: number;
  hydrated: boolean;
  subtotal: number; // INR, chosen-variant prices × qty
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  add: (product: Product, variantLabel: string, qty?: number) => void;
  setQty: (slug: string, variant: string, qty: number) => void;
  remove: (slug: string, variant: string) => void;
  clear: () => void;
  coupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discount: number;
};

const Ctx = createContext<CartCtx | null>(null);
export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
};

const KEY = "kalavanti.cart.v1";
const COUPONS: Record<string, number> = { KAL1500: 1500, FESTIVE10: 0.1, WELCOME2500: 2500 };

type Stored = { items: CartItem[]; coupon: string | null };

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s: Stored = JSON.parse(raw);
        setItems(s.items ?? []);
        setCoupon(s.coupon ?? null);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify({ items, coupon } satisfies Stored));
  }, [items, coupon, hydrated]);

  const lines = useMemo<CartLine[]>(
    () =>
      items
        .map((it) => {
          const product = getProduct(it.productSlug);
          if (!product) return null;
          const v = product.variants.find((x) => x.label === it.variantLabel);
          return { ...it, product, unitPrice: v ? v.price : product.price };
        })
        .filter((l): l is CartLine => !!l),
    [items]
  );

  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
  const discount = useMemo(() => {
    if (!coupon) return 0;
    const c = COUPONS[coupon];
    if (c == null) return 0;
    return c < 1 ? Math.round(subtotal * c) : Math.min(c, subtotal);
  }, [coupon, subtotal]);

  const add = useCallback((product: Product, variantLabel: string, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.productSlug === product.slug && x.variantLabel === variantLabel);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { productSlug: product.slug, variantLabel, qty }];
    });
    setDrawerOpen(true);
  }, []);

  const setQty = useCallback((slug: string, variant: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((x) => !(x.productSlug === slug && x.variantLabel === variant))
        : prev.map((x) => (x.productSlug === slug && x.variantLabel === variant ? { ...x, qty } : x))
    );
  }, []);

  const remove = useCallback((slug: string, variant: string) => {
    setItems((prev) => prev.filter((x) => !(x.productSlug === slug && x.variantLabel === variant)));
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const up = code.trim().toUpperCase();
    if (COUPONS[up] != null) {
      setCoupon(up);
      return true;
    }
    return false;
  }, []);

  const value: CartCtx = {
    lines,
    count: lines.reduce((s, l) => s + l.qty, 0),
    hydrated,
    subtotal,
    drawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    add,
    setQty,
    remove,
    clear: () => {
      setItems([]);
      setCoupon(null);
    },
    coupon,
    applyCoupon,
    removeCoupon: () => setCoupon(null),
    discount,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
