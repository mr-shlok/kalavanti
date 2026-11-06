export type MetalType = "diamond" | "gold" | "platinum" | "gemstone" | "solitaire";

export type ProductVariant = {
  /** e.g. "18K Yellow Gold", "PT950 Platinum" */
  label: string;
  price: number; // INR
};

export type Product = {
  slug: string;
  name: string;
  styleCode: string;
  /** metal-family tags: diamond | gold | platinum | gemstone | solitaire | bridal */
  metals: MetalType[];
  /** product-type slugs: rings | earrings | necklaces | pendants | bracelets | bangles | chains | ornaments */
  types: string[];
  /** extra collection/occasion tags: bridal | festive | everyday | party | gifting */
  tags: string[];
  price: number; // current selling price, INR
  mktPrice: number; // strike-through "market" price, INR
  variants: ProductVariant[];
  images: string[]; // [primary, alt, ...]
  desc: string;
  weightG: number; // approx gross weight in grams
  stone?: string;
  express?: boolean; // ready to ship
  isNew?: boolean;
  bestseller?: boolean;
  discountLabel?: string; // ribbon on card
};

export type CartItem = {
  productSlug: string;
  variantLabel: string;
  qty: number;
};
