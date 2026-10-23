import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { categories, designs } from "@/lib/designs";
import { DesignCard } from "@/components/design-card";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore designs — PIXELPROMPT" },
      { name: "description", content: "Search and filter the PIXELPROMPT collection of free and premium AI image designs." },
      { property: "og:title", content: "Explore the PIXELPROMPT collection" },
      { property: "og:description", content: "Search free and premium image designs by category." },
    ],
  }),
  component: Explore,
});

function Explore() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [access, setAccess] = useState<"all" | "free" | "premium">("all");
  const list = useMemo(
    () =>
      designs.filter(
        (d) =>
          (cat === "All" || d.category === cat) &&
          (access === "all" || d.access === access) &&
          (d.title + d.author + d.tags.join(" ")).toLowerCase().includes(q.toLowerCase()),
      ),
    [q, cat, access],
  );
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-10">
      <p className="label-meta text-graphite">Index / {list.length} designs</p>
      <h1 className="display-lg mt-4">Explore</h1>
      <div className="mt-10 flex flex-col gap-4 border-y border-border py-4 md:flex-row md:items-center md:justify-between">
        <label className="flex flex-1 items-center gap-3">
          <Search className="size-4 text-graphite" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search titles, creators, styles…" className="w-full bg-transparent py-2 outline-none placeholder:text-graphite" />
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`label-meta border px-3 py-2 transition-colors ${cat === c ? "border-ink bg-ink text-porcelain" : "border-border hover:border-ink"}`}>{c}</button>
          ))}
          <span className="mx-2 w-px bg-border" />
          {(["all", "free", "premium"] as const).map((a) => (
            <button key={a} onClick={() => setAccess(a)} aria-pressed={access === a} className={`label-meta border px-3 py-2 transition-colors ${access === a ? "border-cobalt bg-cobalt text-porcelain" : "border-border hover:border-ink"}`}>{a}</button>
          ))}
        </div>
      </div>
      {list.length === 0 ? (
        <p className="py-24 text-center text-graphite">No designs match. Try another search.</p>
      ) : (
        <div className="mt-10 columns-1 gap-8 sm:columns-2 lg:columns-3 [&>*]:mb-10 [&>*]:break-inside-avoid">
          {list.map((d, i) => <DesignCard key={d.slug} d={d} eager={i < 3} />)}
        </div>
      )}
    </section>
  );
}
