import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import SectionHeader from "@/components/SectionHeader";
import ProductRail from "@/components/ProductRail";
import ProductCard from "@/components/ProductCard";
import GenderShowcase from "@/components/GenderShowcase";
import Reveal from "@/components/Reveal";
import { PRODUCTS } from "@/lib/products";
import { img as R } from "@/lib/images";

const CIRCLES = [
  { label: "Rings", href: "/category/rings", img: "/img/p-ring-solitaire.jpg" },
  { label: "Earrings", href: "/category/earrings", img: "/img/p-ear-studs.jpg" },
  { label: "Necklaces", href: "/category/necklaces", img: "/img/p-neck-diamond.jpg" },
  { label: "Bangles", href: "/category/bangles", img: "/img/p-bang-gold-set.jpg" },
  { label: "Pendants", href: "/category/pendants", img: "/img/p-pend-diamond.jpg" },
  { label: "Bridal", href: "/category/bridal", img: "/img/p-neck-bridal-set.jpg" },
];

const SLIDES = [
  {
    img: "/images/hero-purple-bridal.png",
    eyebrow: "The Bridal House",
    title: "Heirloom Bridal Suites",
    sub: "Polki, emerald & temple craft, made to be inherited.",
    cta: "Explore Bridal",
    href: "/category/bridal",
    tone: "dark" as const,
  },
  {
    img: "/images/hero-red-bridal.png",
    eyebrow: "Solitaire Season",
    title: "One Stone, One Lifetime",
    sub: "IGI-certified solitaires & ruby suites.",
    cta: "Shop Solitaires",
    href: "/category/solitaire",
    tone: "dark" as const,
  },
  {
    img: "/images/hero-navy-mens.png",
    eyebrow: "For Him",
    title: "The Gentleman's Edit",
    sub: "Chains, kada & sapphire sets in heavy gold.",
    cta: "Shop For Him",
    href: "/category/men",
    tone: "dark" as const,
  },
  {
    img: "/images/hero-black-mens.png",
    eyebrow: "Iced Diamonds",
    title: "Brilliance, Cut for Him",
    sub: "Rope chains, tennis & cuff sets in PT950.",
    cta: "Explore Diamonds",
    href: "/category/diamond",
    tone: "dark" as const,
  },
];

const SERVICES = [
  { label: "Virtual Consultation", href: "/contact", icon: "M4 6h16v10H8l-4 3zM8 3h8" },
  { label: "Bespoke Design", href: "/about", icon: "M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.6 5.7 21l2.3-7.2-6-4.4h7.6z" },
  { label: "Find a Store", href: "/contact", icon: "M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11zm0-8.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" },
  { label: "Lifetime Buyback", href: "/policies/buyback", icon: "M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6z" },
  { label: "Certified Diamonds", href: "/faq", icon: "M7 2h10l5 7-10 13L2 9z" },
];

const TRENDING = [
  { label: "Sindoor Saga", sub: "Bridal heirlooms", href: "/collection/sindoor-saga", img: "/img/p-neck-bridal-set.jpg" },
  { label: "Illumination", sub: "Everyday diamonds", href: "/collection/illumination", img: "/img/p-ear-studs.jpg" },
  { label: "Heritage Bloom", sub: "Traditional gold", href: "/collection/heritage-bloom", img: "/img/p-bang-gold-set.jpg" },
  { label: "Prism", sub: "Modern clusters", href: "/collection/prism", img: "/img/p-ring-cluster.jpg" },
  { label: "Zaroorat", sub: "Gifting & coins", href: "/collection/zaroorat", img: "/img/p-gold-coin.jpg" },
];

const METAL_TILES = [
  { label: "Diamond Jewellery", sub: "Brilliance, graded and certified", href: "/category/diamond", img: "/img/cat-diamond.jpg" },
  { label: "Gold Jewellery", sub: "22K & 18K hallmarked classics", href: "/category/gold", img: "/img/cat-gold.jpg" },
  { label: "Gemstone Jewellery", sub: "Ruby, emerald, sapphire, pearl", href: "/category/gemstone", img: "/img/cat-gemstone.jpg" },
  { label: "Platinum Jewellery", sub: "The white metal of forever", href: "/category/platinum", img: "/img/cat-platinum.jpg" },
];

const PRICE_TILES = [
  { label: "Under ₹20,000", href: "/category/by-price?price=max-20000", img: "/img/p-pend-diamond.jpg" },
  { label: "Under ₹50,000", href: "/category/by-price?price=max-50000", img: "/img/p-ear-hoops.jpg" },
  { label: "Under ₹1,00,000", href: "/category/by-price?price=max-100000", img: "/img/p-brace-tennis.jpg" },
  { label: "Above ₹1,00,000", href: "/category/by-price?price=min-100000", img: "/img/p-neck-ranihaar.jpg" },
];

const TESTIMONIALS = [
  { name: "Meera S.", city: "Bengaluru", text: "The bridal set arrived beyond our expectations — the polki work is museum-grade and the hallmark paperwork was spotless." },
  { name: "Arjun & Nida", city: "Pune", text: "We designed our wedding bands in a virtual consultation. Three sittings, zero guesswork, and they were delivered in ten days." },
  { name: "Lakshmi R.", city: "Chennai", text: "Traded in an old chain for the Ranihaar — the buyback value was transparent and better than two local jewellers." },
];

const INSTA = [
  "/img/p-neck-choker.jpg",
  "/img/p-ear-chandelier.jpg",
  "/img/p-ring-couple.jpg",
  "/img/p-bang-polki.jpg",
];

export default function Home() {
  const newIn = PRODUCTS.filter((p) => p.isNew);
  const express = PRODUCTS.filter((p) => p.express);
  const best = PRODUCTS.filter((p) => p.bestseller);
  const men = PRODUCTS.filter((p) => p.tags.includes("men") || p.types.includes("chains"));

  return (
    <main className="pb-4">
      <HeroCarousel slides={SLIDES} />

      {/* circular category shortcuts */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="-mt-8 grid grid-cols-6 gap-2 rounded-xl bg-card p-3 shadow-[0_16px_30px_-20px_rgba(33,37,41,0.35)] ring-1 ring-line sm:-mt-12 sm:gap-4 sm:p-5">
          {CIRCLES.map((c) => (
            <Link key={c.href} href={c.href} className="group flex flex-col items-center gap-1.5 text-center">
              <span className="relative aspect-square w-full max-w-[74px] overflow-hidden rounded-full ring-2 ring-transparent transition-all group-hover:ring-gold/60">
                <Image src={R(c.img)} alt={c.label} fill sizes="80px" className="object-cover" />
              </span>
              <span className="text-[11px] font-medium text-ink group-hover:text-brand sm:text-xs">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* services row */}
      <section className="mx-auto mt-10 max-w-7xl px-4">
        <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-5 border-b border-line pb-8 text-center">
          {SERVICES.map((s) => (
            <Link key={s.label} href={s.href} className="group flex w-24 flex-col items-center gap-2 sm:w-28">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream text-gold ring-1 ring-champagne/60 transition-colors group-hover:bg-brand group-hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.icon} />
                </svg>
              </span>
              <span className="text-[11px] font-medium leading-tight text-muted group-hover:text-brand">{s.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* trending collections */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeader eyebrow="Craft Houses" title="Our Trending Collections" viewAll="/collections" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {TRENDING.map((t, idx) => (
            <Reveal key={t.href} delay={idx * 0.06}>
              <Link href={t.href} className="group relative block aspect-[3/4] overflow-hidden rounded-lg">
                <Image src={R(t.img)} alt={t.label} fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                  <p className="font-heading text-lg text-white">{t.label}</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-champagne">{t.sub}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* just in */}
      <section className="bg-card py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="Fresh at the Atelier" title="Just In — The Latest from Kalavanti" viewAll="/category/new-arrivals" />
          <ProductRail products={newIn.length ? newIn : PRODUCTS.slice(0, 8)} />
        </div>
      </section>

      {/* for her / for him velvet showcase */}
      <GenderShowcase />

      {/* the gentleman's edit — For Him / Boys wide variety */}
      <section className="bg-card py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="For Him · The Men’s House" title="The Gentleman’s Edit" viewAll="/category/men" />
          <ProductRail products={men} />
        </div>
      </section>

      {/* metal showcase tiles */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {METAL_TILES.map((t, idx) => (
            <Reveal key={t.href} delay={(idx % 2) * 0.1}>
              <Link href={t.href} className="group relative block aspect-[2/1] overflow-hidden rounded-lg">
                <Image src={R(t.img)} alt={t.label} fill sizes="600px" className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-6">
                  <p className="font-heading text-xl text-white sm:text-2xl">{t.label}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-champagne">{t.sub}</p>
                </div>
                <span className="absolute right-5 top-5 rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
                  Explore →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ready to ship */}
      <section className="bg-card py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="Delivered in 3–5 Days" title="Ready to Ship" viewAll="/category/express-delivery" />
          <ProductRail products={express} />
        </div>
      </section>

      {/* curated by price */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeader eyebrow="Start With a Budget" title="Curated By Price" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PRICE_TILES.map((t, idx) => (
            <Reveal key={t.href} delay={idx * 0.07}>
              <Link href={t.href} className="group block overflow-hidden rounded-lg bg-card ring-1 ring-line transition-shadow hover:shadow-lg">
                <div className="relative aspect-square overflow-hidden">
                  <Image src={R(t.img)} alt={t.label} fill sizes="300px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <p className="py-3.5 text-center font-heading text-base text-ink group-hover:text-brand">{t.label}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* bestsellers grid */}
      <section className="bg-card py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="Loved Across India" title="House Bestsellers" viewAll="/category/bestsellers" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {best.slice(0, 8).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* bridal promo banner */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <Reveal>
          <Link href="/category/bridal" className="group relative block aspect-[21/8] min-h-[220px] overflow-hidden rounded-xl">
            <Image src={R("banner-bridal", 1920)} alt="Kalavanti bridal atelier" fill sizes="1200px" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/30 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-lg flex-col justify-center p-8 sm:p-12">
              <p className="eyebrow text-champagne">The Bridal Atelier</p>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-white sm:text-4xl">
                Build Your Wedding Trousseau, One Heirloom at a Time
              </h3>
              <p className="mt-3 text-sm text-white/80">
                Private viewings, lifetime buyback and free exchanges across every future collection.
              </p>
              <span className="btn-maroon mt-6 w-fit rounded-full px-8 py-3">Book a Private Viewing</span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* testimonials */}
      <section className="bg-page py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader eyebrow="In Their Words" title="The Kalavanti Promise" />
          <div className="grid gap-4 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-lg bg-card p-6 ring-1 ring-line">
                  <div className="mb-3 text-gold" aria-label="5 star rating">
                    {"★★★★★"}
                  </div>
                  <blockquote className="flex-1 font-heading text-[15px] leading-6 text-ink">“{t.text}”</blockquote>
                  <figcaption className="mt-4 text-xs text-muted">
                    <span className="font-semibold text-brand">{t.name}</span> · {t.city}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* stores CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <Reveal className="overflow-hidden rounded-xl bg-brand-dark px-8 py-12 text-center">
          <p className="eyebrow text-champagne">Visit The House</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-heading text-2xl font-semibold text-white sm:text-3xl">
            Showrooms in Mumbai · Pune · Bengaluru · Hyderabad · Lucknow
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/75">
            Or speak with a gemologist from home — toll-free 1800-KALAVANTI, WhatsApp concierge,
            and virtual try-on for over 2,000 designs.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-maroon rounded-full bg-white !text-brand hover:bg-champagne">
              Find a Store Near You
            </Link>
            <Link href="/contact" className="inline-flex items-center rounded-full border border-white/40 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Book Virtual Consultation
            </Link>
          </div>
        </Reveal>
      </section>

      {/* instagram strip */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <SectionHeader eyebrow="@kalavanti.finejewels" title="As Worn By You" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {INSTA.map((src, i) => (
            <Reveal key={src + i} delay={i * 0.06}>
              <a
                href="https://www.instagram.com/explore/tags/jewellery/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-lg"
                aria-label="Kalavanti on social"
              >
                <Image src={R(src)} alt="Customer wearing Kalavanti jewellery" fill sizes="300px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 hidden items-center justify-center bg-brand-dark/40 text-white group-hover:flex">♥</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
