import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, ArrowRight, Check } from "lucide-react";
import { designs } from "@/lib/designs";
import { DesignCard } from "@/components/design-card";
import { EditorialReveal, MaskedReveal, Rise, motion, ease, useParallax } from "@/components/motion";
import { useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import phone from "@/assets/d-phone.jpg";
import cinema from "@/assets/d-cinema.jpg";
import typeImg from "@/assets/d-type.jpg";
import product from "@/assets/d-product.jpg";
import portrait from "@/assets/d-portrait.jpg";
import arch from "@/assets/d-arch.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PIXELPROMPT — Every great image starts with a hidden idea" },
      { name: "description", content: "A premium marketplace of extraordinary AI images. Discover the visual, unlock the prompt behind it." },
      { property: "og:title", content: "PIXELPROMPT — The Creative Index" },
      { property: "og:description", content: "Discover the visual. Unlock the thinking behind it." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <ChapterInspiration />
      <ChapterCraft />
      <ChapterEngine />
      <ChapterUnlock />
      <ChapterCollection />
    </>
  );
}

function ChapterLabel({ n, title, tone = "ink" }: { n: string; title: string; tone?: "ink" | "light" }) {
  return (
    <div className={`label-meta flex items-center gap-3 ${tone === "light" ? "text-porcelain/70" : "text-graphite"}`}>
      <span className={tone === "light" ? "text-lime" : "text-cobalt"}>Chapter {n}</span>
      <span className="h-px w-10 bg-current opacity-40" />
      {title}
    </div>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -30]);
  const prints = [
    { src: phone, cls: "left-[4%] top-[6%] w-[38%] aspect-[3/4] z-20", y: y2, label: "A-01 / Product" },
    { src: cinema, cls: "right-0 top-0 w-[56%] aspect-[16/10] z-10", y: y1, label: "A-02 / Campaign" },
    { src: typeImg, cls: "right-[6%] top-[40%] w-[34%] aspect-[3/4] z-30", y: y3, label: "A-03 / Type" },
    { src: product, cls: "left-[18%] bottom-0 w-[36%] aspect-square z-10", y: y1, label: "A-04 / Still life" },
  ];
  return (
    <section ref={ref} className="relative overflow-hidden border-b border-border">
      <div className="grid-marks pointer-events-none absolute inset-0 text-ink" />
      <motion.span
        aria-hidden
        className="absolute top-0 hidden h-full w-px bg-cobalt md:block"
        initial={{ left: "8.33%" }}
        animate={{ left: "50%" }}
        transition={{ duration: 2.4, ease, delay: 0.4 }}
      />
      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 pb-20 pt-12 md:grid-cols-12 md:px-10 md:pb-28 md:pt-20">
        <div className="md:col-span-6 md:pt-10">
          <p className="label-meta text-graphite">01 / The Creative Index</p>
          <h1 className="display-xl mt-8">
            <EditorialReveal
              lines={["Every great", "image starts", "with a ", <span key="h" className="text-cobalt">hidden idea.</span>]}
            />
          </h1>
          <Rise delay={0.5}>
            <p className="mt-8 max-w-sm text-lg text-graphite">Discover the visual. Unlock the thinking behind it.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/explore" className="group inline-flex items-center gap-3 bg-ink px-6 py-4 text-sm font-medium text-porcelain transition-colors hover:bg-cobalt">
                Explore the Collection <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/pricing" className="inline-flex items-center border border-ink px-6 py-4 text-sm font-medium transition-colors hover:bg-coral hover:border-coral">
                Discover Premium
              </Link>
            </div>
          </Rise>
        </div>
        <div className="relative h-[460px] md:col-span-6 md:h-[640px]">
          {prints.map((p, i) => (
            <motion.figure
              key={p.label}
              style={{ y: p.y }}
              className={`absolute ${p.cls}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease, delay: 0.3 + i * 0.14 }}
            >
              <img src={p.src} alt="" className="print-shadow size-full object-cover" />
              <figcaption className="label-meta mt-2 text-graphite">{p.label}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChapterInspiration() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.92, 1]);
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <ChapterLabel n="01" title="The Inspiration" />
      <Rise><h2 className="display-lg mt-6">First, you see it.</h2></Rise>
      <div ref={ref} className="mt-14">
        <motion.div style={{ scale }} className="relative aspect-[16/10] origin-center overflow-hidden">
          <img src={cinema} alt="Figure standing on a cobalt salt flat at dusk" loading="lazy" className="size-full object-cover" />
        </motion.div>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {["Salt Flat, Dusk", "Campaign", "M. Okafor", "Premium"].map((m, i) => (
            <Rise key={m} delay={i * 0.08} y={10}>
              <p className="label-meta border-t border-border pt-3 text-graphite">{m}</p>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChapterCraft() {
  const frags = ["Lighting: cinematic", "Composition: editorial", "Texture: precision", "Grade: cobalt hour"];
  return (
    <section className="bg-cobalt text-porcelain">
      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <div className="md:col-span-12">
          <ChapterLabel n="02" title="The Hidden Craft" tone="light" />
          <Rise><h2 className="display-lg mt-6 max-w-4xl">Then, you discover what made it.</h2></Rise>
        </div>
        <MaskedReveal className="md:col-span-6" from="left">
          <img src={portrait} alt="Portrait with cobalt makeup and chrome jewelry" loading="lazy" className="aspect-[4/5] w-full object-cover" />
        </MaskedReveal>
        <div className="md:col-span-5 md:col-start-8">
          <div className="border border-porcelain/30 p-6">
            <p className="label-meta text-lime">Prompt anatomy — public metadata</p>
            <ul className="mt-6 space-y-0">
              {frags.map((f, i) => (
                <Rise key={f} delay={i * 0.12} y={12}>
                  <li className="flex items-center justify-between border-b border-porcelain/20 py-4 font-mono text-sm">
                    {f} <span className="text-porcelain/50">0{i + 1}</span>
                  </li>
                </Rise>
              ))}
            </ul>
            <div className="mt-6 space-y-2" aria-hidden>
              {[90, 70, 82].map((w) => (
                <div key={w} className="h-3 bg-porcelain/15" style={{ width: `${w}%` }} />
              ))}
            </div>
            <p className="label-meta mt-6 flex items-center gap-2 text-porcelain/70"><Lock className="size-3" /> Full prompt held on our servers</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChapterEngine() {
  const variations = [
    { id: "a", src: typeImg, name: "Riso / Primary" },
    { id: "b", src: arch, name: "Coral / Golden" },
    { id: "c", src: product, name: "Stone / Warm" },
  ];
  const [active, setActive] = useState("a");
  const current = variations.find((v) => v.id === active)!;
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
      <ChapterLabel n="03" title="The Creative Engine" />
      <Rise><h2 className="display-lg mt-6">One idea. Infinite directions.</h2></Rise>
      <div className="mt-16 grid gap-10 md:grid-cols-12">
        <div className="relative md:col-span-7">
          <motion.img
            key={current.id}
            src={current.src}
            alt={current.name}
            className="aspect-[4/5] w-full object-cover"
            initial={{ opacity: 0.4, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
          />
          <span className="label-meta absolute bottom-4 left-4 bg-porcelain px-2 py-1">Original seed → {current.name}</span>
        </div>
        <div className="flex flex-col justify-between md:col-span-5">
          <p className="max-w-sm text-graphite">One prompt seed, steered three ways. Choose a direction to see how a single idea travels.</p>
          <div className="mt-8 space-y-4">
            {variations.map((v, i) => (
              <Rise key={v.id} delay={i * 0.1} y={20}>
                <button
                  onClick={() => setActive(v.id)}
                  aria-pressed={active === v.id}
                  className={`group flex w-full items-center gap-5 border-l-2 py-2 pl-4 text-left transition-colors ${active === v.id ? "border-coral" : "border-border hover:border-ink"}`}
                >
                  <img src={v.src} alt="" loading="lazy" className={`size-20 object-cover transition-transform ${i === 1 ? "-rotate-2" : i === 2 ? "rotate-2" : ""}`} />
                  <span>
                    <span className="label-meta text-graphite">Variation 0{i + 1}</span>
                    <span className="block font-display text-xl">{v.name}</span>
                  </span>
                </button>
              </Rise>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const tiers = [
  { name: "Free", price: "₹0", note: "Free prompts, saved favourites" },
  { name: "Creator", price: "₹499/mo", note: "40 premium unlocks a month" },
  { name: "Pro", price: "₹1,299/mo", note: "Unlimited unlocks + commercial use" },
];

function ChapterUnlock() {
  const [ref, y] = useParallax(30);
  return (
    <section className="bg-ink text-porcelain">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <ChapterLabel n="04" title="The Unlock" tone="light" />
        <Rise><h2 className="display-lg mt-6 max-w-5xl">The vision is visible. <span className="text-porcelain/50">The prompt is yours to unlock.</span></h2></Rise>
        <div className="mt-16 grid gap-10 md:grid-cols-12">
          <div ref={ref} className="overflow-hidden md:col-span-6">
            <motion.img style={{ y }} src={phone} alt="Gold handset on coral" loading="lazy" className="aspect-[4/5] w-full scale-110 object-cover" />
          </div>
          <MaskedReveal className="md:col-span-6">
            <div className="flex h-full flex-col border border-porcelain/20 p-6 md:p-8">
              <div className="flex items-center justify-between">
                <p className="label-meta text-porcelain/60">Prompt / Aurum Handset</p>
                <span className="relative flex size-9 items-center justify-center border border-cobalt">
                  <Lock className="size-4 text-cobalt" />
                  <motion.span className="absolute inset-0 border border-cobalt" animate={{ opacity: [0.8, 0], scale: [1, 1.5] }} transition={{ duration: 2.2, repeat: 2, ease }} />
                </span>
              </div>
              <p className="mt-6 font-mono text-sm text-porcelain/50">This prompt is locked. Members receive the full text, parameters and negative prompt — delivered securely from our servers, never hidden in the page.</p>
              <div className="mt-8 grid gap-px bg-porcelain/15 sm:grid-cols-3">
                {tiers.map((t) => (
                  <div key={t.name} className={`p-4 ${t.name === "Pro" ? "bg-cobalt" : "bg-ink"}`}>
                    <p className="label-meta text-porcelain/70">{t.name}</p>
                    <p className="mt-2 font-display text-2xl">{t.price}</p>
                    <p className="mt-2 text-xs text-porcelain/60">{t.note}</p>
                  </div>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap gap-3 pt-8">
                <Link to="/pricing" className="bg-porcelain px-6 py-4 text-sm font-medium text-ink transition-colors hover:bg-lime">Become a member</Link>
                <Link to="/design/$slug" params={{ slug: "aurum-handset" }} className="border border-porcelain/40 px-6 py-4 text-sm transition-colors hover:border-porcelain">Buy this prompt · ₹149</Link>
              </div>
            </div>
          </MaskedReveal>
        </div>
      </div>
    </section>
  );
}

function ChapterCollection() {
  return (
    <>
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <ChapterLabel n="05" title="Your Creative Collection" />
        <Rise><h2 className="display-lg mt-6">Build your next great idea.</h2></Rise>
        <div className="mt-16 columns-1 gap-8 sm:columns-2 lg:columns-3 [&>*]:mb-10 [&>*]:break-inside-avoid">
          {designs.map((d, i) => (
            <Rise key={d.slug} delay={(i % 3) * 0.1}>
              <DesignCard d={d} />
            </Rise>
          ))}
        </div>
      </section>
      <section className="bg-cobalt text-porcelain">
        <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-40">
          <p className="label-meta text-lime">Fin.</p>
          <h2 className="display-xl mt-6 max-w-5xl">
            <EditorialReveal lines={["Your next idea", "is already here."]} />
          </h2>
          <div className="mt-12 flex flex-wrap gap-3">
            <Link to="/explore" className="bg-porcelain px-6 py-4 text-sm font-medium text-ink transition-colors hover:bg-lime">Explore All Designs</Link>
            <Link to="/pricing" className="flex items-center gap-2 bg-coral px-6 py-4 text-sm font-medium text-ink transition-colors hover:bg-porcelain">
              <Check className="size-4" /> Unlock Premium
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
