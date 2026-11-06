import React from "react";

/**
 * Kalavanti house mark — original artwork: a brilliant-cut diamond glyph
 * beneath a thin gold arch, paired with a letterspaced serif wordmark.
 */
export function Monogram({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* double-ring crest */}
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="24" cy="24" r="19.4" stroke="currentColor" strokeWidth="1.4" />
      {/* side setting dots */}
      <circle cx="4.3" cy="24" r="1.1" fill="currentColor" />
      <circle cx="43.7" cy="24" r="1.1" fill="currentColor" />
      {/* brilliant — table + crown */}
      <path d="M16.5 20.5h15l3.2 4.2H13.3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M13.3 24.7 24 38l10.7-13.3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      {/* facet lines */}
      <path d="M16.5 20.5 20 24.7 24 20.5 28 24.7 31.5 20.5" stroke="currentColor" strokeWidth="0.9" opacity="0.8" />
      <path d="M13.3 24.7h21.4M20 24.7 24 38 28 24.7" stroke="currentColor" strokeWidth="0.9" opacity="0.7" />
      {/* crown sparkle */}
      <path d="M22.4 15.4 24 12.4l1.6 3 3 1.6-3 1.6-1.6 3-1.6-3-3-1.6z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex flex-col items-center leading-none select-none">
      <span className="flex items-center gap-2 text-brand">
        <Monogram size={compact ? 30 : 38} className="text-gold" />
        <span
          className={`font-heading font-semibold tracking-[0.18em] text-brand ${
            compact ? "text-lg" : "text-xl sm:text-2xl"
          }`}
        >
          KALAVANTI
        </span>
      </span>
      {!compact && (
        <span className="mt-1 text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-gold">
          Handcrafted Brilliance · Since 1948
        </span>
      )}
    </span>
  );
}
