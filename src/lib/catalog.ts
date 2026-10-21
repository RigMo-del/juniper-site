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

export type Product = {
  id: string;
  name: string;
  department: DeptSlug;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  partner: string;
  image: string;
  featured?: boolean;
  tags: string[];
  blurb: string;
  why: string;
  highlights: string[];
  specs: [string, string][];
  quote: { by: string; text: string };
};

export const products: Product[] = [
  {
    id: "nimbus",
    name: "Nimbus Closed Cups",
    department: "sound",
    price: 129,
    compareAt: 189,
    rating: 4.6,
    reviews: 1840,
    partner: "Northline",
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
    quote: { by: "Elena V.", text: "I wore them through a delayed red-eye and forgot they were on. That is the review." },
  },
  {
    id: "drift",
    name: "Drift Open Case",
    department: "sound",
    price: 79,
    compareAt: 99,
    rating: 4.4,
    reviews: 960,
    partner: "Lumen Supply",
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
    quote: { by: "Marcus L.", text: "First pair I have not lost a bud from in a year. The case is the whole trick." },
  },
  {
    id: "oakline",
    name: "Oakline Sixty",
    department: "sound",
    price: 148,
    compareAt: 180,
    rating: 4.7,
    reviews: 640,
    partner: "Harbor & Co.",
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
    quote: { by: "Priya N.", text: "It sounds like a pencil on good paper. I stopped apologizing on calls." },
  },
  {
    id: "halo",
    name: "Halo Brass Lamp",
    department: "light",
    price: 84,
    rating: 4.5,
    reviews: 410,
    partner: "Field & Pine",
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
    quote: { by: "Jonah P.", text: "I moved it once and then never thought about it again, which is what a lamp should do." },
  },
  {
    id: "marlowe",
    name: "Marlowe Mushroom Lamp",
    department: "light",
    price: 96,
    compareAt: 120,
    rating: 4.8,
    reviews: 722,
    partner: "Field & Pine",
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
    quote: { by: "Alicia M.", text: "Guests assume I found it at an estate sale. I let them." },
  },
  {
    id: "cedar",
    name: "Cedar Stripe Throw",
    department: "light",
    price: 58,
    compareAt: 84,
    rating: 4.6,
    reviews: 1504,
    partner: "Harbor & Co.",
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
    quote: { by: "Chris D.", text: "It lives on the arm of the sofa and somehow never looks rumpled. Unfair, really." },
  },
  {
    id: "sable",
    name: "Sable Linen Sheets",
    department: "light",
    price: 128,
    rating: 4.5,
    reviews: 880,
    partner: "Northline",
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
    quote: { by: "Helen S.", text: "I stopped making the bed perfectly. The wrinkles are the point and I am at peace." },
  },
  {
    id: "kettle",
    name: "Copper Gooseneck",
    department: "table",
    price: 68,
    compareAt: 92,
    rating: 4.7,
    reviews: 2104,
    partner: "Lumen Supply",
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
    quote: { by: "Andre K.", text: "My pour-over stopped flooding the filter. That is a personality change for a kettle." },
  },
];

export function getDepartment(slug: string) {
  return departments.find((dept) => dept.slug === slug);
}

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function partnerHref(id: string, partner: string, tag: string) {
  const params = new URLSearchParams({
    tag: tag.trim() || "juniper-20",
    partner,
  });
  return `https://example.com/go/${encodeURIComponent(id)}?${params.toString()}`;
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
    if (opts.deals && offPercent(product.price, product.compareAt) <= 0) return false;
    if (!words.length) return true;
    const dept = getDepartment(product.department);
    const hay = [product.name, product.blurb, product.why, product.partner, dept?.name ?? "", ...product.tags, ...product.highlights]
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
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case "discount":
      return copy.sort(
        (a, b) => offPercent(b.price, b.compareAt) - offPercent(a.price, a.compareAt) || a.price - b.price,
      );
    default:
      return copy.sort(
        (a, b) =>
          Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
          offPercent(b.price, b.compareAt) - offPercent(a.price, a.compareAt) ||
          b.rating - a.rating,
      );
  }
}

export const partnerNames = [...new Set(products.map((product) => product.partner))];
