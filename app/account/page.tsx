"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useWishlist } from "@/components/providers/WishlistProvider";
import { useToast } from "@/components/providers/ToastProvider";

type Session = { name: string; email: string };
const KEY = "kalavanti.session.v1";

export default function AccountPage() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [session, setSession] = useState<Session | null>(null);
  const [form, setForm] = useState({ name: "", email: "", pass: "", pass2: "" });
  const [err, setErr] = useState<string | null>(null);
  const { items } = useWishlist();
  const { toast } = useToast();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSession(JSON.parse(raw) as Session);
    } catch {}
  }, []);

  const save = (s: Session) => {
    localStorage.setItem(KEY, JSON.stringify(s));
    setSession(s);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setErr("Enter a valid email address");
    if (form.pass.length < 4) return setErr("Password must be at least 4 characters");
    if (tab === "register") {
      if (form.name.trim().length < 2) return setErr("Please enter your name");
      if (form.pass !== form.pass2) return setErr("Passwords don’t match");
      save({ name: form.name.trim(), email: form.email });
      toast("Welcome to the Kalavanti family ✦");
    } else {
      save({ name: form.email.split("@")[0].replace(/[._]/g, " "), email: form.email });
      toast("Signed in");
    }
  };

  if (session) {
    const pretty = session.name.replace(/\b\w/g, (c) => c.toUpperCase());
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="font-heading text-3xl font-semibold">Namaste, {pretty} ✦</h1>
        <p className="mt-1 text-sm text-muted">{session.email}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Link href="/wishlist" className="rounded-xl bg-card p-6 ring-1 ring-line transition-shadow hover:shadow-md">
            <p className="font-heading text-lg">My Wishlist</p>
            <p className="mt-1 text-sm text-muted">{items.length} saved design{items.length === 1 ? "" : "s"}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-brand">View →</span>
          </Link>
          <Link href="/category/new-arrivals" className="rounded-xl bg-card p-6 ring-1 ring-line transition-shadow hover:shadow-md">
            <p className="font-heading text-lg">New Arrivals</p>
            <p className="mt-1 text-sm text-muted">Fresh from the atelier</p>
            <span className="mt-3 inline-block text-sm font-semibold text-brand">Explore →</span>
          </Link>
          <Link href="/contact" className="rounded-xl bg-card p-6 ring-1 ring-line transition-shadow hover:shadow-md">
            <p className="font-heading text-lg">Concierge</p>
            <p className="mt-1 text-sm text-muted">Book a consult or enquiry</p>
            <span className="mt-3 inline-block text-sm font-semibold text-brand">Contact →</span>
          </Link>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem(KEY);
            setSession(null);
            toast("Signed out");
          }}
          className="btn-ghost mt-8 rounded-md"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="overflow-hidden rounded-xl bg-card ring-1 ring-line">
        <div className="grid grid-cols-2">
          {(["login", "register"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setErr(null); }}
              className={`py-4 text-sm font-semibold uppercase tracking-wide transition-colors ${
                tab === t ? "bg-brand text-white" : "bg-card text-muted hover:text-brand"
              }`}
            >
              {t === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="space-y-4 p-6">
          {tab === "register" && (
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Full name</span>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border border-line px-3 py-2.5 outline-none focus:border-brand" />
            </label>
          )}
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Email</span>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-md border border-line px-3 py-2.5 outline-none focus:border-brand" />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Password</span>
            <input type="password" value={form.pass} onChange={(e) => setForm({ ...form, pass: e.target.value })} className="w-full rounded-md border border-line px-3 py-2.5 outline-none focus:border-brand" />
          </label>
          {tab === "register" && (
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Confirm password</span>
              <input type="password" value={form.pass2} onChange={(e) => setForm({ ...form, pass2: e.target.value })} className="w-full rounded-md border border-line px-3 py-2.5 outline-none focus:border-brand" />
            </label>
          )}
          {err && <p className="rounded bg-softpink px-3 py-2 text-xs text-brand">{err}</p>}
          <button className="btn-cta h-11 w-full rounded-lg text-sm uppercase tracking-wider">
            {tab === "login" ? "Sign In" : "Join Kalavanti"}
          </button>
          <p className="text-center text-[11px] text-faint">
            Demo storefront — sessions are stored locally in your browser only.
          </p>
        </form>
      </div>
    </div>
  );
}
