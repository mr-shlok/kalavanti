// Central premium imagery resolver.
// Maps the token keys already used across the app (e.g. "p-ring-solitaire",
// "/img/hero-bridal.jpg") to curated, high-resolution Unsplash photographs.
// Images are hot-linked (browser-fetched); host is allow-listed in next.config.

type PhotoId = string;

// Curated premium jewellery / bridal photography (Unsplash CDN photo ids).
const RINGS = [
  "photo-1605100804763-247f67b3557e", // two-tone diamond ring on black box
  "photo-1762505464756-adda1bd2a343", // luxury diamond rings on hand
  "photo-1603561591411-07134e71a2a9", // rose-gold gemstone ring
  "photo-1762505464779-17f78cbfa8b4", // pair of diamond rings
  "photo-1605100804567-1ffe942b5cd6", // pear-cut diamond ring / pendant
];
const EARRINGS = [
  "photo-1769151591224-2eee6793b885", // diamond studs on white
  "photo-1693212793204-bcea856c75fe", // drop earrings on black
];
const NECKLACES = [
  "photo-1722410180687-b05b50922362", // Indian gold bridal necklace set
  "photo-1783541507490-edb026e2a961", // gold designer necklace
  "photo-1786052337650-9e1c0dd01f5e", // gold chain with pendant
];
const BRACELETS = [
  "photo-1679156271456-d6068c543ee7", // gold bangles/bracelets
  "photo-1690175867343-2af70ea57537", // gold zircon bangles
];
const PENDANTS = [
  "photo-1589128777073-263566ae5e4d", // silver heart pendant on white
];
const LIFESTYLE = [
  "photo-1600685890506-593fdf55949b", // bride in red with ornate gold
  "photo-1617633150878-7df1d12a9a57", // woman in red & gold sari
  "photo-1756483560049-e7b2208f99a0", // smiling bride, traditional jewellery
  "photo-1610173826014-d131b02d69ca", // bride portrait, gold jewellery
];
// Premium men's / "boys" pieces — clean gold chains, bracelets, kada, rings.
const MEN = [
  "photo-1569397288884-4d43d6738fbd", // gold pendant + bracelet product, grey
  "photo-1585711715631-1e6bf224f092", // gold chain necklace macro
  "photo-1716537817238-13298c24016f", // gold & diamond bracelet, white
  "photo-1721034909472-390b9325f415", // rose-gold bracelet, white
  "photo-1786052348553-30d31062d6b6", // golden bracelet on mirror, luxe
  "photo-1723522938816-9c57a8c8ce61", // gold signet-style ring close-up
];
const MEN_LIFESTYLE = [
  "photo-1702707350409-5d9ff72a2e4a", // man wearing gold chain (portrait)
  "photo-1607121549082-fc4b2c049108", // man with gold chain (moody)
];

/** token -> photo id. Keys mirror the "/img/<token>.jpg" names used app-wide. */
const MAP: Record<string, PhotoId> = {
  // Rings
  "p-ring-solitaire": RINGS[0],
  "p-ring-cluster": RINGS[2],
  "p-ring-gold": RINGS[2],
  "p-ring-emerald": RINGS[4],
  "p-ring-platinum-band": RINGS[0],
  "p-ring-couple": RINGS[3],
  // Earrings
  "p-ear-studs": EARRINGS[0],
  "p-ear-hoops": EARRINGS[0],
  "p-ear-chandelier": EARRINGS[1],
  "p-ear-jhumka": EARRINGS[1],
  "p-ear-pearl-drop": EARRINGS[0],
  // Necklaces
  "p-neck-diamond": NECKLACES[1],
  "p-neck-ranihaar": NECKLACES[0],
  "p-neck-bridal-set": NECKLACES[0],
  "p-neck-choker": NECKLACES[1],
  // Pendants
  "p-pend-diamond": PENDANTS[0],
  "p-pend-ruby": RINGS[4],
  // Bracelets
  "p-brace-tennis": BRACELETS[1],
  "p-brace-kada": BRACELETS[0],
  "p-brace-charm": BRACELETS[0],
  // Bangles
  "p-bang-gold-set": BRACELETS[0],
  "p-bang-polki": BRACELETS[1],
  // Chains
  "p-chain-gold": NECKLACES[2],
  "p-chain-white": NECKLACES[2],
  // Ornaments & coin
  "p-orn-mangtika": NECKLACES[0],
  "p-orn-nosepin": EARRINGS[1],
  "p-gold-coin": NECKLACES[1],
  // Type rail
  "t-earrings": EARRINGS[0],
  "t-rings": RINGS[1],
  "t-necklaces": NECKLACES[0],
  "t-pendants": PENDANTS[0],
  "t-bracelets": BRACELETS[0],
  "t-bangles": BRACELETS[1],
  "t-chains": NECKLACES[2],
  "t-ornaments": NECKLACES[0],
  // Category tiles
  "cat-diamond": RINGS[1],
  "cat-gold": NECKLACES[1],
  "cat-platinum": RINGS[0],
  "cat-gemstone": RINGS[2],
  "cat-bridal": LIFESTYLE[0],
  "cat-gifting": LIFESTYLE[3],
  // Men / "Boys" — For Him house (distinct premium pieces)
  "m-chain-gold": MEN[1],
  "m-chain-twisted": MEN[0],
  "m-chain-rope": MEN[3],
  "m-kada-pair": MEN[2],
  "m-bracelet-bar": MEN[4],
  "m-bracelet-steel": BRACELETS[1],
  "m-ring-signet": MEN[5],
  "m-ring-onyx": RINGS[0],
  "m-ring-gold": RINGS[2],
  "m-pend-dogtag": NECKLACES[2],
  "m-pend-rose": RINGS[4],
  "m-stud-single": EARRINGS[0],
  "m-chain-solitaire": NECKLACES[1],
  "m-cufflink": MEN[3],
  "cat-men": MEN_LIFESTYLE[0],
  "banner-men": MEN_LIFESTYLE[1],
  // Extra women variety (fresh crops across the premium pool)
  "p-neck-pearl": NECKLACES[0],
  "p-neck-emerald": NECKLACES[1],
  "p-neck-rose": MEN[3],
  "p-pend-halo": PENDANTS[0],
  "p-ring-cocktail": RINGS[2],
  "p-ear-dangle": EARRINGS[1],
  // Hero carousel (wide)
  "hero-diamond": RINGS[0],
  "hero-bridal": LIFESTYLE[0],
  "hero-festive": LIFESTYLE[1],
  "hero-men": MEN_LIFESTYLE[0],
  // Banners
  "banner-bridal": LIFESTYLE[2],
  "banner-atelier": LIFESTYLE[3],
};

const DEFAULT_ID = RINGS[1];

// Premium Gemini velvet shots (crest baked over the watermark), served from /public.
// Cumulative pool — keep existing files and append new batches here as they arrive.
const V = {
  ring: "/images/velvet-ring.png",
  chain: "/images/velvet-chain.png",
  pendant: "/images/velvet-pendant.png",
  earrings: "/images/velvet-earrings.png",
  menset: "/images/velvet-menset.png",
  cufflink: "/images/velvet-cufflink.png",
  chainBlack: "/images/velvet-chain-black.png",
  mensetWine: "/images/velvet-menset-wine.png",
  bridal: "/images/velvet-bridal.png",
  necklace: "/images/velvet-necklace-green.png",
  bangleBlack: "/images/velvet-bangle-black.png",
  sapphire: "/images/velvet-sapphire.png",
  mensetNavy2: "/images/velvet-menset-navy2.png",
  ruby: "/images/velvet-ruby.png",
  mensOnyx: "/images/velvet-mens-onyx.png",
  mensChainIced: "/images/velvet-mens-chain-iced.png",
  mensLion: "/images/velvet-mens-lion.png",
  mensGeometric: "/images/velvet-mens-geometric.png",
  necklacePurple: "/images/velvet-necklace-purple.png",
  pinkTourmaline: "/images/velvet-pink-tourmaline.png",
  bangleWine: "/images/velvet-bangle-wine.png",
  sapphireGold: "/images/velvet-sapphire-gold.png",
  mensSilverGreen: "/images/velvet-mens-silver-green.png",
  mensCuffOnyx: "/images/velvet-mens-cufflink-onyx.png",
  rubyBlack: "/images/velvet-ruby-black.png",
  necklaceMagenta: "/images/velvet-necklace-magenta.png",
  bangleNavy: "/images/velvet-bangle-navy.png",
  mensCuffGold: "/images/velvet-mens-cuff-gold.png",
  mensShieldOnyx: "/images/velvet-mens-shield-onyx.png",
  mensSignetRuby: "/images/velvet-mens-signet-ruby.png",
};

// Ordered pools used to give every product a distinct image (cycled at data-build
// time in products.ts). Grow these as new unique shots arrive.
const WOMEN_POOL = [
  V.ring, V.chain, V.pendant, V.earrings, V.bridal, V.necklace, V.necklacePurple,
  V.bangleBlack, V.bangleWine, V.sapphire, V.ruby, V.pinkTourmaline, V.chainBlack,
  V.rubyBlack, V.necklaceMagenta, V.bangleNavy,
];
const MEN_POOL = [
  V.menset, V.mensetWine, V.mensetNavy2, V.mensOnyx, V.mensChainIced, V.mensLion,
  V.mensGeometric, V.cufflink, V.sapphireGold, V.mensSilverGreen, V.mensCuffOnyx,
  V.mensCuffGold, V.mensShieldOnyx, V.mensSignetRuby,
];

/** Category image pools for per-product unique assignment. */
export function velvetPool(cat: "men" | "women"): string[] {
  return cat === "men" ? MEN_POOL : WOMEN_POOL;
}

/** Deterministic pick so SSR/hydration stay stable and men's tiles rotate. */
function hashPick(key: string, arr: string[]): string {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return arr[h % arr.length];
}

/** Pick a velvet image by keyword so pieces land in sensible slots. */
function velvetFor(key: string): string {
  if (/cuff/.test(key)) return V.cufflink;
  if (/platinum/.test(key)) return V.chainBlack;
  if (/(bridal|ranihaar|choker|polki|temple|surge)/.test(key)) return V.bridal;
  if (/ruby/.test(key)) return V.ruby;
  if (/(sapphire|blue|gemstone)/.test(key)) return V.sapphire;
  // Men's house — rotate across the dedicated men's velvet shots.
  if (/^m-|men|him|kada|signet|dogtag|lion|onyx/.test(key)) {
    if (/lion/.test(key)) return V.mensLion;
    if (/onyx/.test(key)) return V.mensOnyx;
    if (/(geo|collar|chevron|tip)/.test(key)) return V.mensGeometric;
    if (/(chain|brace|kada|rope|curb|twisted)/.test(key)) return hashPick(key, [V.mensChainIced, V.mensetNavy2, V.menset, V.sapphireGold]);
    if (/(ring|signet)/.test(key)) return hashPick(key, [V.mensetWine, V.mensOnyx, V.sapphireGold]);
    if (/(pend|dogtag)/.test(key)) return hashPick(key, [V.mensLion, V.mensChainIced, V.menset, V.mensOnyx]);
    return hashPick(key, MEN_POOL);
  }
  if (/(ear|jhumka|stud|drop|hoop|chandelier|nosepin|dangle)/.test(key)) return hashPick(key, [V.earrings, V.pinkTourmaline, V.ruby, V.rubyBlack]);
  if (/(ring|band|solitaire|cocktail)/.test(key)) return V.ring;
  if (/(bangle|bang)/.test(key)) return hashPick(key, [V.bangleBlack, V.bangleWine, V.bangleNavy]);
  if (/(chain|brace|rope|curb|twisted|tennis|white|black|two)/.test(key))
    return /(white|black|two|curb)/.test(key) ? V.chainBlack : V.chain;
  if (/(neck|rani|collar)/.test(key)) return hashPick(key, [V.necklace, V.necklacePurple, V.necklaceMagenta, V.bridal]);
  return V.pendant;
}

/** Resolve a token or a legacy "/img/token.jpg" path to a premium image URL. */
export function img(tokenOrPath: string, width = 1200): string {
  const key = tokenOrPath
    .replace(/^\/?img\//, "")
    .replace(/\.(jpg|jpeg|png|webp)$/i, "");
  void width;
  return velvetFor(key);
}
