import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Membership — PIXELPROMPT" },
      { name: "description", content: "Free, Creator and Pro memberships to unlock premium image prompts on PIXELPROMPT." },
      { property: "og:title", content: "PIXELPROMPT Membership" },
      { property: "og:description", content: "Compare Free, Creator and Pro plans." },
    ],
  }),
  component: Pricing,
});

const plans = [
  { name: "Free", price: "₹0", per: "forever", features: ["All free prompts", "Save favourites", "Personal collections"], cta: "Start free", hi: false },
  { name: "Creator", price: "₹499", per: "/ month", features: ["Everything in Free", "40 premium unlocks / month", "Personal-use licence", "Early access drops"], cta: "Choose Creator", hi: false },
  { name: "Pro", price: "₹1,299", per: "/ month", features: ["Everything in Creator", "Unlimited premium unlocks", "Commercial licence", "Download parameters & seeds"], cta: "Choose Pro", hi: true },
];

function Pricing() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-20">
      <p className="label-meta text-graphite">Membership</p>
      <h1 className="display-lg mt-4 max-w-3xl">Unlock the thinking behind every image.</h1>
      <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name} className={`flex flex-col p-8 ${p.hi ? "bg-cobalt text-porcelain" : "bg-background"}`}>
            <p className={`label-meta ${p.hi ? "text-lime" : "text-cobalt"}`}>{p.name}</p>
            <p className="mt-6 font-display text-5xl font-medium tracking-tight">{p.price}<span className="ml-1 text-base opacity-60">{p.per}</span></p>
            <ul className="mt-8 space-y-3 text-sm">
              {p.features.map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0" />{f}</li>)}
            </ul>
            <button disabled className={`mt-10 py-4 text-sm font-medium disabled:cursor-not-allowed ${p.hi ? "bg-porcelain text-ink" : "bg-ink text-porcelain"}`}>
              {p.cta} — checkout coming soon
            </button>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col justify-between gap-4 border-t border-border pt-8 md:flex-row">
        <p className="max-w-lg text-graphite">Prefer just one? Individual prompts are available on each design page from ₹129, yours to keep.</p>
        <Link to="/explore" className="label-meta self-start border border-ink px-4 py-3 hover:bg-ink hover:text-porcelain">Browse designs</Link>
      </div>
    </section>
  );
}
