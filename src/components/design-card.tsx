import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import type { Design } from "@/lib/designs";

export function DesignCard({ d, eager = false }: { d: Design; eager?: boolean }) {
  return (
    <Link to="/design/$slug" params={{ slug: d.slug }} className="group block">
      <div className={`relative overflow-hidden bg-muted ${d.ratio}`}>
        <img
          src={d.image}
          alt={d.title}
          loading={eager ? "eager" : "lazy"}
          className="absolute inset-0 size-full scale-[1.04] object-cover transition-transform duration-700 ease-[var(--ease-editorial)] group-hover:scale-100"
        />
        <span className={`label-meta absolute left-3 top-3 flex items-center gap-1.5 px-2 py-1 ${d.access === "free" ? "bg-lime text-ink" : "bg-ink text-porcelain"}`}>
          {d.access === "premium" && <Lock className="size-3" />}
          {d.access}
        </span>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-border pt-3">
        <h3 className="font-display text-lg font-medium leading-tight group-hover:text-cobalt">{d.title}</h3>
        <span className="label-meta shrink-0 text-graphite">{d.category}</span>
      </div>
    </Link>
  );
}
