import { img as resolveImg } from "./images";

export type NavNode = { label: string; href: string; img?: string };
export type NavSection = { title: string; items: NavNode[] };

export type TopNav = {
  label: string;
  href: string;
  /** mega-menu layout: left rail = product types, then style/metal/occasion columns */
  rail?: NavNode[];
  sections?: NavSection[];
  highlights?: { label: string; href: string; img: string }[];
};

const img = (name: string) => resolveImg(name);

/** Product-type rail shared by metal-family menus (mirrors the reference's left rail). */
const typeRail: NavNode[] = [
  { label: "Earrings", href: "/category/earrings", img: img("t-earrings") },
  { label: "Rings", href: "/category/rings", img: img("t-rings") },
  { label: "Necklaces", href: "/category/necklaces", img: img("t-necklaces") },
  { label: "Pendants", href: "/category/pendants", img: img("t-pendants") },
  { label: "Bracelets", href: "/category/bracelets", img: img("t-bracelets") },
  { label: "Bangles", href: "/category/bangles", img: img("t-bangles") },
  { label: "Chains", href: "/category/chains", img: img("t-chains") },
  { label: "Ornaments", href: "/category/ornaments", img: img("t-ornaments") },
];

const styleSection = (base: string): NavSection => ({
  title: "Shop By Style",
  items: [
    { label: "Studs", href: `/category/${base}?style=studs` },
    { label: "Drops", href: `/category/${base}?style=drops` },
    { label: "Chandeliers", href: `/category/${base}?style=chandeliers` },
    { label: "Hoops", href: `/category/${base}?style=hoops` },
    { label: "Solitaire", href: `/category/${base}?style=solitaire` },
    { label: "Vintage", href: `/category/${base}?style=vintage` },
  ],
});

const metalSection: NavSection = {
  title: "Shop By Metal",
  items: [
    { label: "Yellow Gold", href: "/category/gold?tone=yellow" },
    { label: "Rose Gold", href: "/category/gold?tone=rose" },
    { label: "White Gold", href: "/category/diamond?tone=white" },
    { label: "Platinum", href: "/category/platinum" },
  ],
};

const occasionSection: NavSection = {
  title: "Shop By Occasion",
  items: [
    { label: "Everyday", href: "/category/everyday" },
    { label: "Office", href: "/category/everyday?occasion=office" },
    { label: "Party", href: "/category/party" },
    { label: "Festive", href: "/category/festive" },
    { label: "Bridal", href: "/category/bridal" },
  ],
};

const genderSection: NavSection = {
  title: "Shop By Wearer",
  items: [
    { label: "Women", href: "/category/women" },
    { label: "Men", href: "/category/men" },
    { label: "Unisex", href: "/category/unisex" },
  ],
};

export const NAV: TopNav[] = [
  {
    label: "Diamond",
    href: "/category/diamond",
    rail: typeRail,
    sections: [styleSection("diamond"), metalSection, occasionSection, genderSection],
    highlights: [
      { label: "Solitaire Rings", href: "/category/solitaire", img: img("p-ring-solitaire") },
      { label: "Diamond Studs", href: "/category/earrings?style=studs", img: img("p-ear-studs") },
      { label: "Tennis Bracelets", href: "/category/bracelets", img: img("p-brace-tennis") },
    ],
  },
  {
    label: "Gemstone",
    href: "/category/gemstone",
    rail: typeRail,
    sections: [
      {
        title: "Shop By Stone",
        items: [
          { label: "Ruby", href: "/category/gemstone?stone=ruby" },
          { label: "Emerald", href: "/category/gemstone?stone=emerald" },
          { label: "Sapphire", href: "/category/gemstone?stone=sapphire" },
          { label: "Pearl", href: "/category/gemstone?stone=pearl" },
        ],
      },
      metalSection,
      occasionSection,
    ],
  },
  {
    label: "Gold",
    href: "/category/gold",
    rail: typeRail,
    sections: [
      {
        title: "Shop By Purity",
        items: [
          { label: "22K Gold", href: "/category/gold?purity=22K" },
          { label: "18K Gold", href: "/category/gold?purity=18K" },
          { label: "14K Gold", href: "/category/gold?purity=14K" },
        ],
      },
      styleSection("gold"),
      occasionSection,
      genderSection,
    ],
    highlights: [
      { label: "Bridal Sets", href: "/category/bridal", img: img("p-neck-bridal-set") },
      { label: "Gold Bangles", href: "/category/bangles", img: img("p-bang-gold-set") },
      { label: "Men’s Chains", href: "/category/men", img: img("cat-men") },
    ],
  },
  {
    label: "Platinum",
    href: "/category/platinum",
    rail: typeRail,
    sections: [styleSection("platinum"), occasionSection],
  },
  {
    label: "Bridal",
    href: "/category/bridal",
    rail: [
      { label: "Bridal Sets", href: "/category/bridal", img: img("t-necklaces") },
      { label: "Necklaces", href: "/category/necklaces?occasion=bridal", img: img("t-necklaces") },
      { label: "Earrings", href: "/category/earrings?occasion=bridal", img: img("t-earrings") },
      { label: "Bangles", href: "/category/bangles?occasion=bridal", img: img("t-bangles") },
      { label: "Rings", href: "/category/rings?occasion=bridal", img: img("t-rings") },
      { label: "Headpieces", href: "/category/ornaments", img: img("t-ornaments") },
    ],
    sections: [
      {
        title: "Bridal Collections",
        items: [
          { label: "Sindoor Saga", href: "/collection/sindoor-saga" },
          { label: "Anmol Adhyay", href: "/collection/anmol-adhyay" },
          { label: "Rang Mahal", href: "/collection/rang-mahal" },
          { label: "Vows & Beyond", href: "/collection/vows-and-beyond" },
        ],
      },
      occasionSection,
    ],
    highlights: [
      { label: "The Bridal Edit", href: "/category/bridal", img: img("p-neck-ranihaar") },
    ],
  },
  {
    label: "Collections",
    href: "/collections",
    sections: [
      {
        title: "Signature Collections",
        items: [
          { label: "Illumination", href: "/collection/illumination" },
          { label: "Heritage Bloom", href: "/collection/heritage-bloom" },
          { label: "Prism", href: "/collection/prism" },
          { label: "Nakhra", href: "/collection/nakhra" },
          { label: "Rudra", href: "/collection/rudra" },
          { label: "Eternity Marks", href: "/collection/eternity-marks" },
          { label: "Zaroorat", href: "/collection/zaroorat" },
          { label: "Muse", href: "/collection/muse" },
          { label: "Ranajit · For Him", href: "/collection/ranajit" },
          { label: "For Him", href: "/category/men" },
          { label: "Bestsellers", href: "/category/bestsellers" },
          { label: "New Arrivals", href: "/category/new-arrivals" },
        ],
      },
    ],
  },
  {
    label: "Gifts",
    href: "/category/gifting",
    sections: [
      {
        title: "Gift By Occasion",
        items: [
          { label: "Wedding", href: "/category/gifting?occasion=bridal" },
          { label: "Birthday", href: "/category/gifting?occasion=birthday" },
          { label: "Anniversary", href: "/category/gifting?occasion=anniversary" },
          { label: "Festivals", href: "/category/festive" },
        ],
      },
      {
        title: "Gift For",
        items: [
          { label: "Her", href: "/category/women" },
          { label: "Him", href: "/category/men" },
          { label: "Kids", href: "/category/unisex" },
        ],
      },
      {
        title: "More",
        items: [
          { label: "Gift Cards", href: "/gift-cards" },
          { label: "Gold Coins", href: "/category/gold?style=coins" },
          { label: "Under ₹5,000", href: "/category/gifting?price=max-5000" },
        ],
      },
    ],
  },
  {
    label: "Solitaire",
    href: "/category/solitaire",
    rail: typeRail,
    sections: [styleSection("solitaire"), occasionSection],
  },
  {
    label: "By Price",
    href: "/category/by-price",
    sections: [
      {
        title: "Curated By Price",
        items: [
          { label: "Under ₹20,000", href: "/category/by-price?price=max-20000" },
          { label: "Under ₹30,000", href: "/category/by-price?price=max-30000" },
          { label: "Under ₹50,000", href: "/category/by-price?price=max-50000" },
          { label: "Above ₹50,000", href: "/category/by-price?price=min-50000" },
        ],
      },
    ],
  },
];

/** Human labels for slugs, used in breadcrumbs / PLP headers. */
export const CATEGORY_LABELS: Record<string, string> = {
  diamond: "Diamond Jewellery",
  gold: "Gold Jewellery",
  platinum: "Platinum Jewellery",
  gemstone: "Gemstone Jewellery",
  solitaire: "Solitaire Jewellery",
  bridal: "Bridal Jewellery",
  rings: "Rings",
  earrings: "Earrings",
  necklaces: "Necklaces",
  pendants: "Pendants",
  bracelets: "Bracelets",
  bangles: "Bangles",
  chains: "Chains",
  ornaments: "Ornaments",
  everyday: "Everyday Elegance",
  party: "Party Wear",
  festive: "Festive Jewellery",
  gifting: "Gifting",
  bestsellers: "Bestsellers",
  "new-arrivals": "New Arrivals",
  "express-delivery": "Ready to Ship",
  women: "For Her",
  men: "For Him",
  unisex: "Unisex",
  "by-price": "Curated By Price",
};

export const COLLECTION_LABELS: Record<string, string> = {
  "sindoor-saga": "Sindoor Saga",
  "anmol-adhyay": "Anmol Adhyay",
  "rang-mahal": "Rang Mahal",
  "vows-and-beyond": "Vows & Beyond",
  illumination: "Illumination",
  "heritage-bloom": "Heritage Bloom",
  prism: "Prism",
  nakhra: "Nakhra",
  rudra: "Rudra",
  "eternity-marks": "Eternity Marks",
  zaroorat: "Zaroorat",
  muse: "Muse",
  ranajit: "Ranajit · For Him",
};
