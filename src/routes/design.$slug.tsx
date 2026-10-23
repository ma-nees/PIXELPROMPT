import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Check, Lock, Heart } from "lucide-react";
import { getDesign, designs } from "@/lib/designs";
import { DesignCard } from "@/components/design-card";

export const Route = createFileRoute("/design/$slug")({
  loader: ({ params }) => {
    const design = getDesign(params.slug);
    if (!design) throw notFound();
    return { design };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.design.title} — PIXELPROMPT` },
          { name: "description", content: `${loaderData.design.category} design by ${loaderData.design.author}. ${loaderData.design.access === "free" ? "Free prompt." : "Premium prompt."}` },
          { property: "og:title", content: `${loaderData.design.title} — PIXELPROMPT` },
          { property: "og:description", content: `A ${loaderData.design.category.toLowerCase()} design on PIXELPROMPT.` },
        ]
      : [{ title: "Design not found — PIXELPROMPT" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-32 text-center">
      <h1 className="display-lg">Not in the index.</h1>
      <Link to="/explore" className="mt-8 inline-block bg-ink px-6 py-4 text-sm text-porcelain">Back to Explore</Link>
    </div>
  ),
  component: DesignPage,
});

function DesignPage() {
  const { design: d } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);
  const [fav, setFav] = useState(false);
  const related = designs.filter((x) => x.slug !== d.slug).slice(0, 3);
  return (
    <>
      <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:grid-cols-12 md:px-10">
        <div className="md:col-span-7">
          <img src={d.image} alt={d.title} className="w-full object-cover" />
        </div>
        <aside className="md:col-span-5">
          <p className="label-meta text-graphite">{d.category} / {d.author}</p>
          <h1 className="display-lg mt-4">{d.title}</h1>
          <div className="mt-6 flex items-center gap-3">
            <span className={`label-meta px-2 py-1 ${d.access === "free" ? "bg-lime text-ink" : "bg-ink text-porcelain"}`}>{d.access === "free" ? "Free prompt" : "Premium prompt"}</span>
            <button onClick={() => setFav(!fav)} aria-pressed={fav} className="label-meta flex items-center gap-1.5 border border-border px-2 py-1 hover:border-ink">
              <Heart className={`size-3 ${fav ? "fill-coral text-coral" : ""}`} /> {fav ? "Saved" : "Save"}
            </button>
          </div>
          <ul className="mt-8 border-t border-border">
            {d.tags.map((t) => <li key={t} className="border-b border-border py-3 font-mono text-sm">{t}</li>)}
          </ul>

          {d.access === "free" && d.freePrompt ? (
            <div className="mt-8 border border-ink p-6">
              <div className="flex items-center justify-between">
                <p className="label-meta text-cobalt">Prompt</p>
                <button
                  onClick={() => { navigator.clipboard.writeText(d.freePrompt!); setCopied(true); setTimeout(() => setCopied(false), 1600); }}
                  className="label-meta flex items-center gap-1.5 hover:text-cobalt"
                >
                  {copied ? <Check className="size-3" /> : <Copy className="size-3" />} {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="mt-4 font-mono text-sm leading-relaxed">{d.freePrompt}</p>
            </div>
          ) : (
            <div className="mt-8 bg-ink p-6 text-porcelain">
              <p className="label-meta flex items-center gap-2 text-porcelain/70"><Lock className="size-3 text-cobalt" /> Locked prompt</p>
              <p className="mt-4 text-sm text-porcelain/70">The full prompt, parameters and negative prompt unlock with a membership or a single purchase.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/pricing" className="bg-porcelain px-5 py-3 text-center text-sm font-medium text-ink hover:bg-lime">Unlock with membership</Link>
                <Link to="/pricing" className="border border-porcelain/40 px-5 py-3 text-center text-sm hover:border-porcelain">Buy once · ₹{d.price}</Link>
              </div>
            </div>
          )}
        </aside>
      </section>
      <section className="mx-auto max-w-[1440px] border-t border-border px-5 py-16 md:px-10">
        <p className="label-meta text-graphite">More from the index</p>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {related.map((r) => <DesignCard key={r.slug} d={r} />)}
        </div>
      </section>
    </>
  );
}
