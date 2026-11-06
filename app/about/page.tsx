import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { img as R } from "@/lib/images";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The Kalavanti house story — three generations of handcrafted fine jewellery since 1948.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative bg-brand-dark py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <p className="eyebrow text-champagne">Since 1948</p>
            <h1 className="mt-3 font-heading text-3xl font-semibold sm:text-5xl">A House Built by Hands, Not Machines</h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
              Kalavanti began as a single workbench in a lane of goldsmiths. Three generations later,
              the benches have multiplied — but every piece still leaves the house the way it arrived:
              by hand, shaped by someone who will tell you exactly how.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image src={R("banner-atelier")} alt="Inside the Kalavanti atelier" fill sizes="500px" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h2-serif text-left pb-4">The Karigar Way</h2>
            <p className="mt-2 text-sm leading-7 text-muted">
              Our setters, polishers and enamellers are apprentices of the old gharana system — trained
              for years before a single stone sits in a mounting. That patience is why a Kalavanti
              chain lies flat after a decade, why a polki edge never snags a sari, and why our
              hallmarks are set in metal you can trust with your eye closed.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              We buy diamonds and gold directly, price by transparent weight-plus-craft formulas, and
              publish our making charges — because trust, like brilliance, is something you can verify.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-card py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHeader eyebrow="What We Stand For" title="The Kalavanti Promise" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Certified Always", "Every diamond ships with its IGI/GIA certificate; every gram carries the BIS mark."],
              ["Lifetime Buyback", "Exchange or sell back at the day's best valuation — the promise never expires."],
              ["Honest Pricing", "Weight, making charge and GST shown separately. No inflated discounts, ever."],
              ["Made by Hand", "Bespoke commissions welcomed — bring a sketch, an heirloom, or just a story."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.07}>
                <div className="h-full rounded-xl border border-line p-6 text-center">
                  <p className="font-heading text-lg text-gold">{t}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <Reveal>
          <h2 className="font-heading text-2xl font-semibold text-brand-dark">Come see how it’s made.</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted">
            Atelier tours, gemology evenings and private viewings are hosted weekly at all five showrooms.
          </p>
          <Link href="/contact" className="btn-maroon mt-6 inline-flex rounded-full px-8">Visit a Showroom</Link>
        </Reveal>
      </section>
    </div>
  );
}
