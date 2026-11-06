"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { img as R } from "@/lib/images";
import SectionHeader from "./SectionHeader";

type Card = { label: string; href: string; img: string; sku: string };

const HER: Card[] = [
  { label: "Earrings", href: "/category/earrings", img: "p-ear-studs", sku: "VD_ST09977" },
  { label: "Pendants", href: "/category/pendants", img: "p-pend-diamond", sku: "VD_PN03447" },
  { label: "Necklace", href: "/category/necklaces", img: "p-neck-diamond", sku: "NK08509_VD" },
  { label: "Rings", href: "/category/rings", img: "p-ring-cocktail", sku: "RG12110_VD" },
];

const HIM: Card[] = [
  { label: "Rings", href: "/category/men", img: "m-ring-signet", sku: "VD_RG06080" },
  { label: "Chains", href: "/category/chains", img: "m-chain-gold", sku: "VD_CH00227" },
  { label: "Bracelets", href: "/category/men", img: "m-kada-pair", sku: "VD_BR01803" },
  { label: "Pendants", href: "/category/men", img: "m-pend-dogtag", sku: "PN17595" },
];

export default function GenderShowcase() {
  const [tab, setTab] = useState<"her" | "him">("her");
  const cards = tab === "her" ? HER : HIM;
  const velvet = tab === "her" ? "velvet-her" : "velvet-him";

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader eyebrow="For Everyone, For Every Style" title="Two Worlds of Wonder" />

      {/* toggle */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full bg-card p-1 shadow-sm ring-1 ring-line">
          {(["her", "him"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className="rounded-full px-8 py-2.5 text-sm font-semibold tracking-wide transition-all"
              style={
                tab === t
                  ? { background: "linear-gradient(90deg,#8a464c,#c68a5b)", color: "#fff" }
                  : { color: "#4a2328" }
              }
            >
              {t === "her" ? "For Her" : "For Him"}
            </button>
          ))}
        </div>
      </div>

      {/* velvet category cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {cards.map((c) => (
            <Link
              key={tab + c.label}
              href={c.href}
              className="group relative block aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-black/10"
            >
              <Image
                src={R(c.img, 800)}
                alt={c.label}
                fill
                sizes="(max-width:640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              {/* subtle velvet hue + bottom scrim: piece stays bright, background reads dark */}
              <div className={`absolute inset-0 ${velvet} opacity-20`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />
              <span className="absolute bottom-5 left-5 font-heading text-2xl text-white drop-shadow">
                {c.label}
              </span>
              <span className="absolute bottom-4 right-3 text-[10px] uppercase tracking-[0.2em] text-white/70 [writing-mode:vertical-rl]">
                {c.sku}
              </span>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
