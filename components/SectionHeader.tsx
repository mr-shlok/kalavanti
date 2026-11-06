import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";

/** Serif heading + gold rule + optional View-All, mirroring the reference section pattern. */
export default function SectionHeader({
  eyebrow,
  title,
  sub,
  viewAll,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  viewAll?: string;
}) {
  return (
    <Reveal className="mb-8 text-center">
      {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
      <h2 className="h2-serif rule-gold inline-block pb-4">{title}</h2>
      {sub && <p className="mx-auto mt-2 max-w-xl text-sm text-muted">{sub}</p>}
      {viewAll && (
        <Link
          href={viewAll}
          className="mx-auto mt-5 flex w-fit items-center gap-1 text-sm font-semibold uppercase tracking-wider text-brand hover:text-gold"
        >
          View All Products <span aria-hidden>→</span>
        </Link>
      )}
    </Reveal>
  );
}
