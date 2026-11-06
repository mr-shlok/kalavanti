import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { COLLECTION_LABELS } from "@/lib/categories";
import { productsForCollection } from "@/lib/products";
import { img as R } from "@/lib/images";

export const metadata: Metadata = {
  title: "Collections",
  description: "Every Kalavanti signature collection — bridal houses, contemporary lines and gifting edits.",
};

const COVER: Record<string, string> = {
  "sindoor-saga": "/img/p-neck-bridal-set.jpg",
  "anmol-adhyay": "/img/p-ring-solitaire.jpg",
  "rang-mahal": "/img/p-ear-jhumka.jpg",
  "vows-and-beyond": "/img/p-ring-platinum-band.jpg",
  illumination: "/img/p-ear-studs.jpg",
  "heritage-bloom": "/img/p-bang-gold-set.jpg",
  prism: "/img/p-ring-cluster.jpg",
  nakhra: "/img/p-ear-chandelier.jpg",
  rudra: "/img/p-brace-kada.jpg",
  "eternity-marks": "/img/p-brace-tennis.jpg",
  zaroorat: "/img/p-gold-coin.jpg",
  muse: "/img/p-ring-emerald.jpg",
  ranajit: "/img/m-chain-gold.jpg",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <SectionHeader
        eyebrow="The Atelier"
        title="Signature Collections"
        sub="Twelve curated houses of design — each with its own motif, metal story and mood."
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Object.entries(COLLECTION_LABELS).map(([slug, label], i) => {
          const count = productsForCollection(slug).length;
          return (
            <Reveal key={slug} delay={(i % 4) * 0.06}>
              <Link href={`/collection/${slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-lg bg-brand-dark">
                <Image src={R(COVER[slug])} alt={label} fill sizes="300px" className="object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                  <p className="font-heading text-lg text-white">{label}</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-champagne">{count} designs · View →</p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-12 rounded-xl bg-cream p-8 text-center ring-1 ring-champagne/50">
        <p className="eyebrow">Can’t find your story?</p>
        <h2 className="mt-2 font-heading text-xl font-semibold text-brand-dark">Commission a bespoke piece with our design desk</h2>
        <Link href="/contact" className="btn-maroon mt-4 inline-flex rounded-full px-8">Book a Consultation</Link>
      </div>
    </div>
  );
}
