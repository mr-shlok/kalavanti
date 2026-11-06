"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export type Slide = {
  img: string;
  eyebrow: string;
  title: string;
  sub: string;
  cta: string;
  href: string;
  tone: "light" | "dark";
};

export default function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setI((x) => (x + 1) % slides.length);
    }, 5200);
    return () => clearInterval(t);
  }, [slides.length]);

  const go = (n: number) => {
    setDir(n > i ? 1 : -1);
    setI(n);
  };

  const s = slides[i];

  return (
    <section className="relative overflow-hidden bg-brand-dark">
      <div className="relative mx-auto aspect-[16/10] max-h-[560px] w-full sm:aspect-[21/9]">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={i}
            custom={dir}
            initial={{ opacity: 0, x: 60 * dir }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 * dir }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image src={s.img} alt={s.title} fill priority={i === 0} sizes="100vw" className="object-cover" />
            {/* bottom + left scrims keep the caption on shadowed velvet, never on the jewellery */}
            <div
              className={`absolute inset-0 ${
                s.tone === "dark"
                  ? "bg-gradient-to-t from-black/90 via-black/45 to-transparent"
                  : "bg-gradient-to-t from-white/95 via-white/45 to-transparent"
              }`}
            />
            <div
              className={`absolute inset-0 ${
                s.tone === "dark"
                  ? "bg-gradient-to-r from-black/75 via-black/20 to-transparent"
                  : "bg-gradient-to-r from-white/85 via-white/15 to-transparent"
              }`}
            />
            <div className="absolute inset-0 flex items-end">
              <div className="mx-auto w-full max-w-7xl px-5 pb-14 sm:pb-16 lg:px-8">
                <div className="max-w-md">
                  <p
                    className={`eyebrow flex items-center gap-2 ${
                      s.tone === "dark" ? "text-champagne" : "text-gold"
                    }`}
                  >
                    <span className={`inline-block h-px w-6 ${s.tone === "dark" ? "bg-champagne" : "bg-gold"}`} />
                    {s.eyebrow}
                  </p>
                  <h1
                    className={`mt-2 font-heading text-2xl font-semibold leading-[1.12] sm:text-3xl lg:text-[2.5rem] ${
                      s.tone === "dark" ? "text-white" : "text-brand-dark"
                    }`}
                  >
                    {s.title}
                  </h1>
                  <p
                    className={`mt-2 max-w-md text-sm ${
                      s.tone === "dark" ? "text-white/85" : "text-ink/75"
                    }`}
                  >
                    {s.sub}
                  </p>
                  <Link
                    href={s.href}
                    className={`mt-6 inline-flex h-11 items-center justify-center rounded-full px-7 text-sm font-semibold tracking-wide transition-all ${
                      s.tone === "dark"
                        ? "bg-champagne text-brand-dark hover:bg-white"
                        : "btn-cta rounded-full px-8"
                    }`}
                  >
                    {s.cta}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* arrows + dots */}
      <button
        aria-label="Previous slide"
        onClick={() => go((i - 1 + slides.length) % slides.length)}
        className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand shadow ring-1 ring-line hover:bg-white sm:flex"
      >
        ‹
      </button>
      <button
        aria-label="Next slide"
        onClick={() => go((i + 1) % slides.length)}
        className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand shadow ring-1 ring-line hover:bg-white sm:flex"
      >
        ›
      </button>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, n) => (
          <button
            key={n}
            aria-label={`Go to slide ${n + 1}`}
            onClick={() => go(n)}
            className={`h-2 rounded-full transition-all ${n === i ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  );
}
