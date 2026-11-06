"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Monogram } from "./Logo";

/**
 * Kalavanti grand entry — deep oxblood velvet curtains part to reveal the site,
 * with the house crest and wordmark held centre-stage. Plays once on full load.
 */
const velvet = (dir: 1 | -1): CSSProperties => ({
  backgroundImage: `repeating-linear-gradient(${
    dir === 1 ? 90 : -90
  }deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.05) 16px, rgba(233,199,173,0.06) 26px, rgba(0,0,0,0.5) 46px), linear-gradient(180deg, #4a2328 0%, #2a1013 55%, #140a0c 100%)`,
});

export default function IntroCurtain() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = prev;
    }, 3100);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [reduce]);

  if (done || reduce) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
      {/* backdrop prevents any white flash behind the curtains */}
      <div className="absolute inset-0 bg-[#140a0c]" />

      {/* left + right velvet panels */}
      <motion.div
        style={velvet(1)}
        className="absolute top-0 left-0 h-full w-1/2"
        initial={{ x: "0%" }}
        animate={{ x: "-101%" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 1.55 }}
      />
      <motion.div
        style={velvet(-1)}
        className="absolute top-0 right-0 h-full w-1/2"
        initial={{ x: "0%" }}
        animate={{ x: "101%" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 1.55 }}
      />
      {/* centre gold seam where the curtains meet */}
      <motion.div
        className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#c68a5b]/60 to-transparent"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.4, delay: 1.55 }}
      />

      {/* crest + wordmark, held centre then released */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.92, 1, 1, 1.05] }}
        transition={{ duration: 2.6, times: [0, 0.26, 0.66, 1], ease: "easeInOut" }}
      >
        <Monogram size={72} className="text-[#e6c3ad]" />
        <div className="mt-5 font-heading text-3xl font-semibold tracking-[0.34em] text-[#f2e2d2] sm:text-5xl">
          KALAVANTI
        </div>
        <motion.div
          className="mt-4 h-px bg-gradient-to-r from-transparent via-[#c68a5b] to-transparent"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 240, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }}
        />
        <div className="mt-4 text-[10px] uppercase tracking-[0.42em] text-[#c9a98f] sm:text-[11px]">
          Handcrafted Brilliance · Since 1948
        </div>
      </motion.div>
    </div>
  );
}
