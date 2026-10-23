import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/explore", label: "Explore" },
  { to: "/pricing", label: "Membership" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="inline-block size-3 bg-cobalt" />
          PIXELPROMPT
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="label-meta text-graphite transition-colors hover:text-ink" activeProps={{ className: "text-ink" }}>
              {n.label}
            </Link>
          ))}
          <Link to="/pricing" className="label-meta bg-ink px-4 py-2.5 text-porcelain transition-colors hover:bg-cobalt">
            Discover Premium
          </Link>
        </nav>
        <button className="md:hidden" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col border-t border-border px-5 py-4 md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b border-border py-4 font-display text-2xl">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-porcelain">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 md:grid-cols-12 md:px-10">
        <div className="md:col-span-6">
          <p className="font-display text-3xl font-semibold tracking-tight">PIXELPROMPT</p>
          <p className="mt-3 max-w-sm text-sm text-porcelain/60">The creative index of images and the hidden ideas behind them.</p>
        </div>
        <div className="label-meta flex flex-col gap-3 text-porcelain/60 md:col-span-3">
          <Link to="/explore" className="hover:text-lime">Explore</Link>
          <Link to="/pricing" className="hover:text-lime">Membership</Link>
        </div>
        <p className="label-meta text-porcelain/40 md:col-span-3">© 2026 Chromatic Atelier</p>
      </div>
    </footer>
  );
}
