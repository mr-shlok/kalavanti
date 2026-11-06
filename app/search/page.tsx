import { Suspense } from "react";
import SearchClient from "./SearchClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-10"><p className="text-muted">Loading search…</p></div>}>
      <SearchClient />
    </Suspense>
  );
}
