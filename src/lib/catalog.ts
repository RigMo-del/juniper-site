import { offPercent } from "@/lib/format";

export const departments = [
  { slug: "sound", name: "Sound", blurb: "Cups, buds, and keys." },
  { slug: "light", name: "Light & linen", blurb: "Lamps, cloth, and quieter rooms." },
  { slug: "table", name: "The table", blurb: "The kettle the rest of the aisle is built around." },
] as const;

export type DeptSlug = (typeof departments)[number]["slug"];

export const sorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low" },
  { id: "price-desc", label: "Price: high" },
  { id: "rating", label: "Top rated" },
  { id: "discount", label: "Biggest save" },
] as const;

export type SortId = (typeof sorts)[number]["id"];

/** Retailer with verified affiliate attribution support. */
export type Retailer = {
  id: string;
  name: string;
  /** Verified base product or search URL. Only present when verified. */
  verifiedBaseUrl?: string;
  /** Query param name used for affiliate tag (e.g. "tag", "ref", "aff"). */
  affiliateParam?: string;
  verified: boolean;
};

export const retailers: Retailer[] = [
  // Placeholder structure. Real verified URLs and params must be added by the owner
  // after confirming affiliate program membership and link formats.
  // Do not invent retailer URLs or tags.
  {
    id: "northline",
    name: "Northline",
    verified: false,
  },
  {
    id: "lumen-supply",
    name: "Lumen Supply",
    verified: false,
  },
  {
    id: "harbor-co",
    name: "Harbor & Co.",
    verified: false,
  },
  {
    id: "field-pine",
    name: "Field & Pine",
    verified: false,
  },
];

export type Product = {
  id: string;
  name: string;
  department: DeptSlug;
  /** Sample price for demonstration only. Not a real offer. */
  samplePrice: number;
  sampleCompareAt?: number;
  /** Sample rating for demonstration only. */
  sampleRating?: number;
  sampleReviews?: number;
  retailerId: string;
  image: string;
  featured?: boolean;
  tags: string[];
  blurb: string;
  why: string;
  highlights: string[];
  specs: [string, string][];
  /** Sample testimonial for demonstration only. */
  sampleQuote?: { by: string; text: string };
  /** Product-specific URL, confirmed against the actual retailer listing. */
  verifiedProductUrl?: string;
  /** Every current entry is still a demonstration, but future entries may be verified. */
  isDemonstration: boolean;
  verified: boolean;
};

export const products: Product[] = [
  {
    id: "nimbus",
    name: "Nimbus Closed Cups",
    department: "sound",
    samplePrice: 129,
    sampleCompareAt: 189,
    sampleRating: 4.6,
    sampleReviews: 1840,
    retailerId: "northline",
    image: "/products/nimbus.jpg",
    featured: true,
    tags: ["headphones", "anc", "audio", "wireless"],
    blurb: "Over-ear headphones with a hinge that stays put and a clamp that eases off after the first song.",
    why: "Most pairs at this price are gloss black and loud about it. Nimbus is matte sage, lighter on the jaw, and the charge covers a flight plus the layover.",
    highlights: ["About 32 hours on a charge", "Pads swap without a screwdriver", "Folds into a slim sleeve"],
    specs: [
      ["Weight", "248 g"],
      ["Battery", "32 hours"],
      ["Finish", "Matte sage"],
    ],
    sampleQuote: { by: "Elena V.", text: "I wore them through a delayed red-eye and forgot they were on. That is the review." },
    isDemonstration: true,
    verified: false,
  },
  {
    id: "drift",
    name: "Drift Open Case",
    department: "sound",
    samplePrice: 79,
    sampleCompareAt: 99,
    sampleRating: 4.4,
    sampleReviews: 960,
    retailerId: "lumen-supply",
    image: "/products/drift.jpg",
    tags: ["earbuds", "wireless", "audio"],
    blurb: "Stone-colored earbuds in a pebble case that actually stays shut in a coat pocket.",
    why: "The case is the product. It is small, it does not pop open in a bag, and the buds sit without that cheap plastic squeak.",
    highlights: ["Case closes with a real click", "Six hours in the buds, four extra in the case", "Touch controls you can turn off"],
    specs: [
      ["Driver", "10 mm"],
      ["Case", "Warm stone"],
      ["Charge", "USB-C"],
    ],
    sampleQuote: { by: "Marcus L.", text: "First pair I have not lost a bud from in a year. The case is the whole trick." },
    isDemonstration: true,
    verified: false,
  },
  {
    id: "oakline",
    name: "Oakline Sixty",
    department: "sound",
    samplePrice: 148,
    sampleCompareAt: 180,
    sampleRating: 4.7,
    sampleReviews: 640,
    retailerId: "harbor-co",
    image: "/products/oakline.jpg",
    featured: true,
    tags: ["keyboard", "mechanical", "desk"],
    blurb: "A compact mechanical keyboard in walnut, with cream keycaps that do not shout.",
    why: "Full-size boards eat the mouse. This one leaves room for a cup and still has the arrow keys people actually miss.",
    highlights: ["Walnut case, not a sticker", "Hot-swap sockets", "Quiet enough for a shared room"],
    specs: [
      ["Layout", "65%"],
      ["Case", "Walnut"],
      ["Switch", "Tactile, pre-lubed"],
    ],
    sampleQuote: { by: "Priya N.", text: "It sounds like a pencil on good paper. I stopped apologizing on calls." },
    isDemonstration: true,
    verified: false,
  },
  {
    id: "halo",
    name: "Halo Brass Lamp",
    department: "light",
    samplePrice: 84,
    sampleRating: 4.5,
    sampleReviews: 410,
    retailerId: "field-pine",
    image: "/products/halo.jpg",
    featured: true,
    tags: ["lamp", "desk", "brass", "light"],
    blurb: "An articulated desk lamp in brushed brass with a small oatmeal linen shade.",
    why: "The arm holds its place. Cheap joints sag by Thursday. This one stays where you put it, and the shade takes the glare off the page.",
    highlights: ["Jointed arm that holds", "Linen shade, warm bulb included", "Base heavy enough for a bump"],
    specs: [
      ["Height", "18 in"],
      ["Shade", "Oatmeal linen"],
      ["Bulb", "E12, included"],
    ],
    sampleQuote: { by: "Jonah P.", text: "I moved it once and then never thought about it again, which is what a lamp should do." },
    isDemonstration: true,
    verified: false,
  },
  {
    id: "marlowe",
    name: "Marlowe Mushroom Lamp",
    department: "light",
    samplePrice: 96,
    sampleCompareAt: 120,
    sampleRating: 4.8,
    sampleReviews: 722,
    retailerId: "field-pine",
    image: "/products/marlowe.jpg",
    featured: true,
    tags: ["lamp", "ceramic", "table", "light"],
    blurb: "A glazed ceramic lamp with a rounded shade that throws light down, not into your eyes.",
    why: "It is the piece people ask about. Sage glaze, no logo, and it does not look like it came from a lighting aisle.",
    highlights: ["Hand-glazed ceramic", "Inline dimmer", "Shade is part of the body"],
    specs: [
      ["Height", "11 in"],
      ["Glaze", "Sage"],
      ["Cord", "Cloth, 6 ft"],
    ],
    sampleQuote: { by: "Alicia M.", text: "Guests assume I found it at an estate sale. I let them." },
    isDemonstration: true,
    verified: false,
  },
  {
    id: "cedar",
    name: "Cedar Stripe Throw",
    department: "light",
    samplePrice: 58,
    sampleCompareAt: 84,
    sampleRating: 4.6,
    sampleReviews: 1504,
    retailerId: "harbor-co",
    image: "/products/cedar.jpg",
    tags: ["blanket", "wool", "throw", "linen"],
    blurb: "A wool throw in rust and cream stripes, heavy enough to stay on a couch.",
    why: "Thin throws slide off. This one has weight, the stripe is wide enough to read across a room, and it does not pill in the first month.",
    highlights: ["Wool blend that breathes", "Wide stripe, not a micro pattern", "Gets softer, not shabby"],
    specs: [
      ["Size", "50 × 60 in"],
      ["Fiber", "Wool blend"],
      ["Care", "Cold wash, dry flat"],
    ],
    sampleQuote: { by: "Chris D.", text: "It lives on the arm of the sofa and somehow never looks rumpled. Unfair, really." },
    isDemonstration: true,
    verified: false,
  },
  {
    id: "sable",
    name: "Sable Linen Sheets",
    department: "light",
    samplePrice: 128,
    sampleRating: 4.5,
    sampleReviews: 880,
    retailerId: "northline",
    image: "/products/sable.jpg",
    featured: true,
    tags: ["sheets", "linen", "bed", "bedding"],
    blurb: "Oatmeal linen sheets with a hem you can see. They start crisp and settle in a week.",
    why: "Percale is fine. Linen is the one that still feels like cloth in August. This set is a calm color and a real queen, not a skimpy full.",
    highlights: ["Stone-washed, not scratchy", "Deep pockets for a thick mattress", "Gets better after the third wash"],
    specs: [
      ["Size", "Queen"],
      ["Fiber", "European linen"],
      ["Color", "Oatmeal"],
    ],
    sampleQuote: { by: "Helen S.", text: "I stopped making the bed perfectly. The wrinkles are the point and I am at peace." },
    isDemonstration: true,
    verified: false,
  },
  {
    id: "kettle",
    name: "Copper Gooseneck",
    department: "table",
    samplePrice: 68,
    sampleCompareAt: 92,
    sampleRating: 4.7,
    sampleReviews: 2104,
    retailerId: "lumen-supply",
    image: "/products/kettle.jpg",
    featured: true,
    tags: ["kettle", "coffee", "copper", "tea"],
    blurb: "A matte copper gooseneck kettle with a slow pour and a handle that stays cool.",
    why: "The spout is the whole reason to own one. It pours where you aim it, which matters more for Saturday coffee than any thermometer gadget.",
    highlights: ["Gooseneck you can actually aim", "Matte copper, not mirror-bright", "Whistle you can leave off"],
    specs: [
      ["Capacity", "1 liter"],
      ["Finish", "Matte copper"],
      ["Heat", "Stovetop, all types"],
    ],
    sampleQuote: { by: "Andre K.", text: "My pour-over stopped flooding the filter. That is a personality change for a kettle." },
    isDemonstration: true,
    verified: false,
  },
];

export function getDepartment(slug: string) {
  return departments.find((dept) => dept.slug === slug);
}

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function getRetailer(id: string) {
  return retailers.find((r) => r.id === id);
}

/**
 * Fail closed until the owner has verified BOTH the merchant and the exact product page.
 * Never send a shopper to an unverified/placeholder destination.
 */
export function buildAffiliateUrl(product: Product, ownerTag: string): string | null {
  if (!product.verified || product.isDemonstration || !product.verifiedProductUrl) return null;
  const retailer = getRetailer(product.retailerId);
  if (!retailer?.verified || !retailer.verifiedBaseUrl || !retailer.affiliateParam) return null;
  const tag = ownerTag.trim();
  // Only Juniper's approved Amazon Associates ID is permitted.
  // Any other value (including other correctly formatted tags) is rejected.
  if (tag !== "juniperfinds6-20") return null;
  if (!/^[a-zA-Z][a-zA-Z0-9_-]{0,63}$/.test(retailer.affiliateParam)) return null;
  try {
    const approved = new URL(retailer.verifiedBaseUrl);
    const destination = new URL(product.verifiedProductUrl);
    if (
      approved.protocol !== "https:" ||
      destination.protocol !== "https:" ||
      !approved.hostname ||
      destination.hostname !== approved.hostname ||
      destination.username ||
      destination.password ||
      approved.username ||
      approved.password
    ) return null;
    // Exact-host requirement is intentional; retailer shortlinks require separate verification.
    destination.searchParams.set(retailer.affiliateParam, tag);
    return destination.toString();
  } catch {
    return null;
  }
}

export function inDepartment(slug: string) {
  return products.filter((product) => product.department === slug);
}

export function listProducts(opts: { q?: string; dept?: string; sort?: SortId; deals?: boolean } = {}) {
  const words = (opts.q ?? "")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  const filtered = products.filter((product) => {
    if (opts.dept && product.department !== opts.dept) return false;
    if (opts.deals && offPercent(product.samplePrice, product.sampleCompareAt) <= 0) return false;
    if (!words.length) return true;
    const dept = getDepartment(product.department);
    const retailer = getRetailer(product.retailerId);
    const hay = [product.name, product.blurb, product.why, retailer?.name ?? "", dept?.name ?? "", ...product.tags, ...product.highlights]
      .join(" ")
      .toLowerCase();
    return words.every((word) => hay.includes(word));
  });
  return sortProducts(filtered, opts.sort ?? "featured");
}

function sortProducts(list: Product[], sort: SortId) {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.samplePrice - b.samplePrice);
    case "price-desc":
      return copy.sort((a, b) => b.samplePrice - a.samplePrice);
    case "rating":
      return copy.sort((a, b) => (b.sampleRating ?? 0) - (a.sampleRating ?? 0) || (b.sampleReviews ?? 0) - (a.sampleReviews ?? 0));
    case "discount":
      return copy.sort(
        (a, b) => offPercent(b.samplePrice, b.sampleCompareAt) - offPercent(a.samplePrice, a.sampleCompareAt) || a.samplePrice - b.samplePrice,
      );
    default:
      return copy.sort(
        (a, b) =>
          Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
          offPercent(b.samplePrice, b.sampleCompareAt) - offPercent(a.samplePrice, a.sampleCompareAt) ||
          (b.sampleRating ?? 0) - (a.sampleRating ?? 0),
      );
  }
}

export const partnerNames = [...new Set(products.map((product) => getRetailer(product.retailerId)?.name ?? product.retailerId))];
