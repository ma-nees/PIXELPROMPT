import phone from "@/assets/d-phone.jpg";
import cinema from "@/assets/d-cinema.jpg";
import type_ from "@/assets/d-type.jpg";
import product from "@/assets/d-product.jpg";
import arch from "@/assets/d-arch.jpg";
import portrait from "@/assets/d-portrait.jpg";

export type Access = "free" | "premium";

// Public catalogue metadata only. Prompt text is never shipped to the browser;
// it will be served by an authorized server call once accounts are connected.
export interface Design {
  slug: string;
  title: string;
  category: string;
  access: Access;
  price?: number; // INR, individual purchase
  image: string;
  ratio: string; // tailwind aspect class
  author: string;
  tags: string[]; // public, decorative metadata
  freePrompt?: string; // only for FREE designs
}

export const categories = ["All", "Product", "Campaign", "Typography", "Architecture", "Portrait"] as const;

export const designs: Design[] = [
  {
    slug: "aurum-handset", title: "Aurum Handset", category: "Product", access: "premium", price: 149,
    image: phone, ratio: "aspect-[3/4]", author: "Studio Halde",
    tags: ["Lighting: studio key", "Backdrop: coral seamless", "Lens: 85mm"],
  },
  {
    slug: "salt-flat-dusk", title: "Salt Flat, Dusk", category: "Campaign", access: "premium", price: 199,
    image: cinema, ratio: "aspect-[16/10]", author: "M. Okafor",
    tags: ["Lighting: cinematic", "Composition: editorial", "Grade: cobalt hour"],
  },
  {
    slug: "riso-geometry", title: "Riso Geometry No.4", category: "Typography", access: "free",
    image: type_, ratio: "aspect-[3/4]", author: "Kiko Press",
    tags: ["Texture: risograph", "Palette: primary", "Grid: swiss"],
    freePrompt:
      "Abstract swiss-style poster built from bold geometric shapes — circles, half-moons, bars — printed in cobalt blue, coral red and acid lime on warm off-white paper, risograph grain, generous margins, no text.",
  },
  {
    slug: "stone-essence", title: "Stone Essence", category: "Product", access: "premium", price: 129,
    image: product, ratio: "aspect-square", author: "Atelier Nord",
    tags: ["Texture: precision", "Surface: travertine", "Light: warm side"],
  },
  {
    slug: "coral-pavilion", title: "Coral Pavilion", category: "Architecture", access: "free",
    image: arch, ratio: "aspect-[4/5]", author: "R. Valente",
    tags: ["Light: golden hour", "Material: concrete", "Mood: surreal"],
    freePrompt:
      "Surreal brutalist concrete pavilion opening to hills, a single sculptural coral tree on a low plinth at the center, long raking golden-hour shadows, polished floor reflections, editorial architecture photography.",
  },
  {
    slug: "chrome-cobalt", title: "Chrome / Cobalt", category: "Portrait", access: "premium", price: 179,
    image: portrait, ratio: "aspect-[4/5]", author: "Lena Fiore",
    tags: ["Lighting: rim", "Styling: chrome", "Backdrop: ink"],
  },
];

export const getDesign = (slug: string) => designs.find((d) => d.slug === slug);
