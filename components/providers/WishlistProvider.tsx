"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/types";
import { getProduct } from "@/lib/products";
import { useToast } from "./ToastProvider";

type WishlistCtx = {
  slugs: string[];
  items: Product[];
  hydrated: boolean;
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
};

const Ctx = createContext<WishlistCtx | null>(null);
export const useWishlist = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useWishlist must be used inside WishlistProvider");
  return c;
};

const KEY = "kalavanti.wishlist.v1";

export default function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSlugs(JSON.parse(raw) as string[]);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(slugs));
  }, [slugs, hydrated]);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);

  const toggle = useCallback(
    (slug: string) => {
      const on = slugs.includes(slug);
      setSlugs(on ? slugs.filter((s) => s !== slug) : [...slugs, slug]);
      toast(on ? "Removed from wishlist" : "Saved to wishlist ♥");
    },
    [slugs, toast]
  );

  const items = useMemo(
    () => slugs.map(getProduct).filter((p): p is Product => !!p),
    [slugs]
  );

  return <Ctx.Provider value={{ slugs, items, hydrated, has, toggle }}>{children}</Ctx.Provider>;
}
