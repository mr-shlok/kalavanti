import type { Product, MetalType } from "./types";
import { velvetPool } from "./images";

type Opt = {
  tags?: string[];
  stone?: string;
  express?: boolean;
  isNew?: boolean;
  bestseller?: boolean;
  discount?: string;
  altImg?: string;
};

/** Build a product with sensible metal variants derived from its families. */
function P(
  slug: string,
  name: string,
  styleCode: string,
  metals: MetalType[],
  types: string[],
  price: number,
  imgMain: string,
  opts: Opt = {}
): Product {
  const mktPrice = Math.round((price * 1.12) / 100) * 100 + 100; // ~11-12% off market price
  const variants: { label: string; price: number }[] = [];
  if (metals.includes("gold")) {
    variants.push({ label: "18K Yellow Gold", price });
    variants.push({ label: "22K Yellow Gold", price: Math.round((price * 1.19) / 100) * 100 });
  }
  if (metals.includes("diamond") || metals.includes("solitaire")) {
    variants.push({ label: "14K White Gold", price });
    if (!metals.includes("gold")) variants.push({ label: "18K White Gold", price: Math.round((price * 1.1) / 100) * 100 });
  }
  if (metals.includes("platinum")) {
    variants.push({ label: "PT950 Platinum", price: Math.round((price * 1.24) / 100) * 100 });
    if (!variants.length) variants.push({ label: "PT950 Platinum", price });
  }
  if (metals.includes("gemstone")) {
    if (!variants.length) variants.push({ label: "18K Yellow Gold", price });
    variants.push({ label: "Silver Dusted", price: Math.round((price * 0.42) / 100) * 100 });
  }
  const images = [imgMain, ...(opts.altImg ? [opts.altImg] : [])];
  return {
    slug,
    name,
    styleCode,
    metals,
    types,
    tags: opts.tags ?? [],
    price,
    mktPrice,
    variants,
    images,
    desc: `${name} from the Kalavanti atelier — hand-set stones, a flawless finish and a BIS hallmark guarantee. Designed for everyday grace and occasion sparkle alike, each piece is crafted by master karigars with decades at the bench.`,
    weightG: Math.max(2, Math.round(price / 2600)),
    stone: opts.stone,
    express: opts.express,
    isNew: opts.isNew,
    bestseller: opts.bestseller,
    discountLabel: opts.discount,
  };
}

// Assign each product a DISTINCT velvet image by cycling its category pool in
// source order (runs once at module init → SSR-safe, deterministic). As more
// unique shots are added to the pools in lib/images.ts, repetition disappears.
const _cursor: Record<"men" | "women", number> = { men: 0, women: 0 };
const I = (n: string): string => {
  const cat: "men" | "women" =
    /^m-/.test(n) || /men|him|kada|signet|dogtag|cuff|lion|onyx/.test(n) ? "men" : "women";
  const pool = velvetPool(cat);
  return pool[_cursor[cat]++ % pool.length];
};

export const PRODUCTS: Product[] = [
  // ── Rings ────────────────────────────────────────────────────────────
  P("ananya-solitaire-ring", "Ananya Solitaire Ring", "KR2417", ["diamond", "solitaire"], ["rings"], 128500, I("p-ring-solitaire"), { stone: "0.90 ct Solitaire", express: true, bestseller: true, discount: "New Launch" }),
  P("isha-cluster-ring", "Isha Cluster Diamond Ring", "KR2455", ["diamond"], ["rings"], 74200, I("p-ring-cluster"), { altImg: I("p-ring-solitaire"), isNew: true }),
  P("meera-temple-ring", "Meera Temple Gold Ring", "KR2312", ["gold"], ["rings"], 38400, I("p-ring-gold"), { tags: ["festive"] }),
  P("rani-emerald-ring", "Rani Emerald Solitaire Ring", "KR2489", ["gemstone", "solitaire"], ["rings"], 96800, I("p-ring-emerald"), { stone: "1.25 ct Emerald", discount: "20% OFF" }),
  P("vows-platinum-band", "Vows Platinum Band", "KR2501", ["platinum"], ["rings"], 56200, I("p-ring-platinum-band"), { tags: ["bridal"] }),
  P("sangam-couple-bands", "Sangam Couple Bands (Set of 2)", "KR2508", ["gold"], ["rings"], 64900, I("p-ring-couple"), { tags: ["gifting", "anniversary"], altImg: I("p-ring-platinum-band") }),
  P("noor-vintage-ring", "Noor Vintage Cut-Diamond Ring", "KR2377", ["diamond"], ["rings"], 118200, I("p-ring-cluster"), { bestseller: true }),
  P("sunehra-chunk-ring", "Sunehra Chunky Gold Ring", "KR2290", ["gold"], ["rings"], 45600, I("p-ring-gold"), { express: true }),

  // ── Earrings ─────────────────────────────────────────────────────────
  P("adiya-diamond-studs", "Adiya Diamond Studs", "KE3101", ["diamond"], ["earrings"], 52400, I("p-ear-studs"), { express: true, bestseller: true, discount: "New Launch" }),
  P("zoya-huggie-hoops", "Zoya Huggie Hoops", "KE3145", ["diamond"], ["earrings"], 41800, I("p-ear-hoops"), { altImg: I("p-ear-studs") }),
  P("moyna-chandelier-earrings", "Moyna Chandelier Earrings", "KE3210", ["diamond"], ["earrings"], 134600, I("p-ear-chandelier"), { tags: ["party", "bridal"] }),
  P("jhumka-classic", "Classic Gold Jhumkas", "KE3077", ["gold"], ["earrings"], 36900, I("p-ear-jhumka"), { tags: ["festive"], express: true }),
  P("moti-pearl-drops", "Moti Pearl Drop Earrings", "KE3189", ["gemstone"], ["earrings"], 28500, I("p-ear-pearl-drop"), { stone: "Freshwater Pearl", isNew: true }),
  P("swarna-gold-studs", "Swarna Granulated Gold Studs", "KE3002", ["gold"], ["earrings"], 22400, I("p-ear-studs"), { tags: ["everyday"], express: true }),
  P("rang-bridal-earrings", "Rang Bridal Earrings", "KE3260", ["gold", "diamond"], ["earrings"], 89400, I("p-ear-chandelier"), { tags: ["bridal"], altImg: I("p-ear-jhumka") }),

  // ── Necklaces ────────────────────────────────────────────────────────
  P("aisha-diamond-solitaire-necklace", "Aisha Solitaire Diamond Necklace", "KN4101", ["diamond", "solitaire"], ["necklaces"], 214800, I("p-neck-diamond"), { stone: "1.05 ct Centre", bestseller: true }),
  P("ranihaar-gold", "Ranihaar Layered Gold Necklace", "KN4077", ["gold"], ["necklaces"], 168200, I("p-neck-ranihaar"), { tags: ["bridal", "festive"] }),
  P("sindoor-bridal-set", "Sindoor Bridal Necklace Set", "KN4222", ["gold", "diamond"], ["necklaces", "ornaments"], 342600, I("p-neck-bridal-set"), { tags: ["bridal"], discount: "New Launch" }),
  P("choker-velvet", "Velvet Rose-Gold Choker", "KN4190", ["diamond"], ["necklaces"], 98700, I("p-neck-choker"), { altImg: I("p-neck-diamond"), isNew: true }),
  P("nath-temple-necklace", "Nath Temple-Jewellery Necklace", "KN4033", ["gold"], ["necklaces"], 128900, I("p-neck-ranihaar"), { tags: ["festive"] }),
  P("litika-daily-necklace", "Litika Everyday Diamond Necklet", "KN4155", ["diamond"], ["necklaces"], 46800, I("p-neck-choker"), { express: true, tags: ["everyday"] }),

  // ── Pendants ─────────────────────────────────────────────────────────
  P("sitara-diamond-pendant", "Sitara Diamond Pendant", "KP5101", ["diamond"], ["pendants"], 32600, I("p-pend-diamond"), { express: true, bestseller: true }),
  P("manik-pendant", "Manik Ruby Pendant", "KP5140", ["gemstone"], ["pendants"], 28900, I("p-pend-ruby"), { stone: "0.75 ct Ruby" }),
  P("pankh-pendant", "Pankh Feather Pendant", "KP5177", ["diamond"], ["pendants"], 41200, I("p-pend-diamond"), { isNew: true, altImg: I("p-pend-ruby") }),

  // ── Bracelets ────────────────────────────────────────────────────────
  P("rivaa-tennis-bracelet", "Rivaa Tennis Bracelet", "KB6101", ["diamond", "solitaire"], ["bracelets"], 156400, I("p-brace-tennis"), { stone: "3.20 ctw", bestseller: true }),
  P("kada-classic", "Classic Gold Kada (Pair)", "KB6044", ["gold"], ["bracelets"], 84600, I("p-brace-kada"), { express: true }),
  P("charm-story-bracelet", "Charm Story Bracelet", "KB6190", ["gold"], ["bracelets"], 38200, I("p-brace-charm"), { tags: ["gifting", "birthday"], isNew: true }),
  P("diamond-line-bracelet", "Zariya Line Bracelet", "KB6155", ["diamond"], ["bracelets"], 68900, I("p-brace-tennis"), { altImg: I("p-brace-charm") }),

  // ── Bangles ──────────────────────────────────────────────────────────
  P("sohni-gold-bangles", "Sohni Gold Bangles (Set of 4)", "KG7010", ["gold"], ["bangles"], 118400, I("p-bang-gold-set"), { bestseller: true, discount: "20% OFF" }),
  P("polki-bangles-pair", "Meenakari Polki Bangles (Pair)", "KG7088", ["gemstone", "gold"], ["bangles"], 142800, I("p-bang-polki"), { tags: ["bridal"] }),
  P("sparkle-diamond-bangle", "Sparkle Half-Eternity Bangle", "KG7120", ["diamond"], ["bangles"], 72600, I("p-bang-gold-set"), { express: true, isNew: true }),

  // ── Chains ───────────────────────────────────────────────────────────
  P("mohr-gold-chain", "Mohr 22K Gold Chain, 60cm", "KC8001", ["gold"], ["chains"], 96200, I("p-chain-gold"), { express: true }),
  P("silverline-chain", "Silverline White-Gold Chain", "KC8040", ["diamond"], ["chains"], 28400, I("p-chain-white"), { tags: ["everyday", "men"] }),
  P("platinum-solitaire-chain", "Platinum Solitaire Chain", "KC8077", ["platinum", "solitaire"], ["chains", "pendants"], 122500, I("p-chain-white"), { altImg: I("p-chain-gold") }),

  // ── Ornaments & gifting ──────────────────────────────────────────────
  P("maang-tikka", "Shagun Maang Tikka", "KO9101", ["gemstone", "gold"], ["ornaments"], 34800, I("p-orn-mangtika"), { tags: ["bridal", "festive"] }),
  P("nath-nosepin", "Nath Nosepin with Chain", "KO9044", ["gemstone"], ["ornaments"], 8900, I("p-orn-nosepin"), { tags: ["bridal"], express: true }),
  P("kiran-earring-ornament", "Kiran Traditional Ear Ornament", "KO9120", ["gold"], ["ornaments", "earrings"], 26700, I("p-orn-mangtika"), { tags: ["bridal"] }),
  P("shree-gold-coin", "Shree Gold Coin, 8g (24K)", "GC1001", ["gold"], ["gifting"], 78800, I("p-gold-coin"), { tags: ["gifting", "festive"], express: true }),
  P("blessing-charm-kit", "Blessing Charm Gifting Kit", "GC1040", ["gold"], ["gifting"], 24500, I("p-brace-charm"), { tags: ["gifting", "birthday"], isNew: true }),

  // ── Platinum family ──────────────────────────────────────────────────
  P("ever-platinum-ring", "Ever Platinum Solitaire Ring", "KR2560", ["platinum", "solitaire"], ["rings"], 148900, I("p-ring-platinum-band"), { stone: "0.80 ct", altImg: I("p-ring-solitaire") }),
  P("platinum-studs", "Platinum Diamond Studs", "KE3290", ["platinum", "diamond"], ["earrings"], 74800, I("p-ear-studs"), { tags: ["everyday"] }),

  // ── More gemstone ────────────────────────────────────────────────────
  P("pukhraj-necklace", "Pukhraj Emerald Necklace", "KN4288", ["gemstone"], ["necklaces"], 186400, I("p-neck-diamond"), { stone: "Colombian Emerald", tags: ["party"], altImg: I("p-neck-choker") }),
  P("neelam-ring", "Neelam Sapphire Ring", "KR2599", ["gemstone"], ["rings"], 62800, I("p-ring-emerald"), { stone: "1.10 ct Sapphire", discount: "15% OFF" }),

  // ── The Men's House (For Him / Boys) ─────────────────────────────────
  P("viraj-22k-chain", "Viraj 22K Gold Chain, 60cm", "KMC8101", ["gold"], ["chains"], 132400, I("m-chain-gold"), { tags: ["men", "festive"], express: true, bestseller: true }),
  P("arjun-curb-chain", "Arjun Curb Link Chain", "KMC8140", ["gold"], ["chains"], 88600, I("m-chain-twisted"), { tags: ["men", "everyday"] }),
  P("veer-rope-chain", "Veer Twisted Rope Chain", "KMC8177", ["gold"], ["chains"], 74200, I("m-chain-rope"), { tags: ["men"], isNew: true }),
  P("rudra-kada-pair", "Rudra Gold Kada (Pair)", "KMB6210", ["gold"], ["bracelets"], 102800, I("m-kada-pair"), { tags: ["men", "festive"], bestseller: true }),
  P("ranjit-bar-bracelet", "Ranjit Bar Link Bracelet", "KMB6244", ["gold"], ["bracelets"], 68900, I("m-bracelet-bar"), { tags: ["men"] }),
  P("veer-line-bracelet", "Veer Diamond Line Bracelet", "KMB6288", ["diamond"], ["bracelets"], 96400, I("m-bracelet-steel"), { altImg: I("m-bracelet-bar"), tags: ["men", "party"] }),
  P("aarav-signet-ring", "Aarav Signet Gold Ring", "KMR2611", ["gold"], ["rings"], 42800, I("m-ring-signet"), { tags: ["men", "everyday"], express: true }),
  P("kabir-onyx-ring", "Kabir Onyx Signet Ring", "KMR2644", ["gemstone"], ["rings"], 36400, I("m-ring-onyx"), { stone: "Black Onyx", tags: ["men", "party"], isNew: true }),
  P("dev-heavy-band", "Dev Heavy Gold Band", "KMR2680", ["gold"], ["rings"], 58200, I("m-ring-gold"), { tags: ["men"] }),
  P("samrat-dogtag", "Samrat Dog Tag Pendant", "KMP5210", ["gold"], ["pendants"], 46400, I("m-pend-dogtag"), { altImg: I("m-chain-gold"), tags: ["men", "gifting"] }),
  P("yuvi-rose-pendant", "Yuvi Rose-Gold Pendant", "KMP5244", ["gold"], ["pendants"], 32800, I("m-pend-rose"), { tags: ["men"], isNew: true }),
  P("aditya-solitaire-stud", "Aditya Solitaire Ear Stud", "KME3311", ["platinum", "solitaire"], ["earrings"], 54600, I("m-stud-single"), { stone: "0.50 ct", tags: ["men", "everyday"] }),
  P("nakul-solitaire-chain", "Nakul Platinum Solitaire Chain", "KMC8210", ["platinum", "solitaire"], ["chains", "pendants"], 156800, I("m-chain-solitaire"), { altImg: I("m-chain-gold"), tags: ["men"], bestseller: true }),
  P("raaj-cufflink-set", "Raaj Gold Cufflinks (Set of 2)", "KGC1101", ["gold"], ["ornaments"], 28400, I("m-cufflink"), { tags: ["men", "gifting", "office"], express: true }),

  // ── More for Her (girls variety) ─────────────────────────────────────
  P("nandini-pearl-surge", "Nandini Pearl Strand Necklace", "KN4311", ["gemstone"], ["necklaces"], 64800, I("p-neck-pearl"), { stone: "Freshwater Pearl", tags: ["everyday", "party"], isNew: true }),
  P("radhika-emerald-ranihaar", "Radhika Emerald Ranihaar", "KN4344", ["gold", "gemstone"], ["necklaces"], 228400, I("p-neck-emerald"), { stone: "Emerald", altImg: I("p-neck-ranihaar"), tags: ["bridal", "party"], bestseller: true }),
  P("ishani-rose-choker", "Ishani Rose-Gold Choker", "KN4377", ["gold"], ["necklaces"], 86200, I("p-neck-rose"), { tags: ["party"], isNew: true }),
  P("trisha-halo-pendant", "Trisha Halo Diamond Pendant", "KP5210", ["diamond"], ["pendants"], 38600, I("p-pend-halo"), { altImg: I("p-pend-diamond"), tags: ["everyday"] }),
  P("kavya-cocktail-ring", "Kavya Cocktail Ring", "KR2620", ["gemstone"], ["rings"], 72400, I("p-ring-cocktail"), { stone: "Multi-gem", tags: ["party"], isNew: true }),
  P("saya-crystal-dangles", "Saya Crystal Dangle Earrings", "KE3322", ["diamond"], ["earrings"], 49800, I("p-ear-dangle"), { altImg: I("p-ear-chandelier"), tags: ["party", "bridal"] }),
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Resolve a category/collection slug to its products. */
export function productsFor(slug: string): Product[] {
  const s = slug.replace(/-/g, "");
  return PRODUCTS.filter((p) => {
    if (slug === "bestsellers") return p.bestseller;
    if (slug === "new-arrivals") return p.isNew;
    if (slug === "express-delivery") return p.express;
    if (slug === "by-price") return true;
    if (p.metals.includes(s as MetalType)) return true;
    if (p.types.includes(s)) return true;
    if (p.tags.includes(s)) return true;
    if (slug === "women") return !p.tags.includes("men");
    if (slug === "men") return p.tags.includes("men") || p.types.includes("chains");
    if (slug === "unisex") return p.tags.includes("gifting");
    if (slug.startsWith("collection")) return true;
    return false;
  });
}

/** Collections (signature houses) map to explicit product slugs. */
const COLLECTION_MAP: Record<string, string[]> = {
  "sindoor-saga": ["sindoor-bridal-set", "rang-bridal-earrings", "polki-bangles-pair", "maang-tikka"],
  "anmol-adhyay": ["ananya-solitaire-ring", "aisha-diamond-solitaire-necklace", "rivaa-tennis-bracelet"],
  "rang-mahal": ["jhumka-classic", "ranihaar-gold", "nath-temple-necklace", "kiran-earring-ornament"],
  "vows-and-beyond": ["vows-platinum-band", "ever-platinum-ring", "sangam-couple-bands"],
  illumination: ["adiya-diamond-studs", "litika-daily-necklace", "sitara-diamond-pendant", "zoya-huggie-hoops"],
  "heritage-bloom": ["meera-temple-ring", "swarna-gold-studs", "sohni-gold-bangles", "mohr-gold-chain"],
  prism: ["isha-cluster-ring", "diamond-line-bracelet", "choker-velvet", "pankh-pendant"],
  nakhra: ["moyna-chandelier-earrings", "sparkle-diamond-bangle", "pukhraj-necklace"],
  rudra: ["sunehra-chunk-ring", "kada-classic", "silverline-chain"],
  "eternity-marks": ["rivaa-tennis-bracelet", "aisha-diamond-solitaire-necklace", "ananya-solitaire-ring"],
  zaroorat: ["shree-gold-coin", "blessing-charm-kit", "charm-story-bracelet", "nath-nosepin"],
  muse: ["noor-vintage-ring", "rani-emerald-ring", "neelam-ring", "manik-pendant", "moti-pearl-drops"],
  ranajit: ["viraj-22k-chain", "nakul-solitaire-chain", "rudra-kada-pair", "aarav-signet-ring", "kabir-onyx-ring", "samrat-dogtag", "raaj-cufflink-set", "aditya-solitaire-stud"],
};

export function productsForCollection(slug: string): Product[] {
  const slugs = COLLECTION_MAP[slug];
  if (!slugs) return [];
  return slugs.map(getProduct).filter((p): p is Product => !!p);
}

export const ALL_STONES = ["Solitaire", "Emerald", "Ruby", "Sapphire", "Pearl"];
