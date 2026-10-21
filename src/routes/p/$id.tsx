import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Check, Copy } from "lucide-react";
import { getDepartment, getProduct, listProducts, partnerHref } from "@/lib/catalog";
import { money } from "@/lib/format";
import { useShop } from "@/lib/shop-store";
import { btnGhost, btnPrimary } from "@/lib/ui";
import { Price } from "@/components/price";
import { ProductGrid } from "@/components/product-card";
import { ProductPhoto } from "@/components/product-photo";
import { SaveButton } from "@/components/save-button";
import { ShopLink } from "@/components/shop-link";
import { Stars } from "@/components/stars";
import { EmptyState, Page } from "@/components/states";

export const Route = createFileRoute("/p/$id")({
  head: ({ params }) => {
    const product = getProduct(params.id);
    return { meta: [{ title: product ? `${product.name} · Juniper` : "Product · Juniper" }] };
  },
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = getProduct(id);
  const view = useShop((state) => state.view);

  useEffect(() => {
    if (product) view(product.id);
  }, [product, view]);

  if (!product) {
    return (
      <Page>
        <EmptyState title="This piece is gone." body="It is not in the sample catalog.">
          <Link to="/" className={btnPrimary}>
            Browse the edit
          </Link>
        </EmptyState>
      </Page>
    );
  }

  const dept = getDepartment(product.department);
  const related = listProducts({ dept: product.department }).filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <Page>
      <div className="pb-24 lg:pb-0">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link to="/" className="hover:text-ink">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          {dept ? (
            <Link to="/c/$slug" params={{ slug: dept.slug }} className="hover:text-ink">
              {dept.name}
            </Link>
          ) : null}
        </nav>
        <div className="mt-4 grid min-w-0 gap-8 lg:grid-cols-2">
          <div className="min-w-0 lg:sticky lg:top-36 lg:self-start">
            <ProductPhoto
              src={product.image}
              alt={product.name}
              className="aspect-square w-full rounded-3xl object-cover outline outline-1 -outline-offset-1 outline-ink/10"
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-muted">
              {dept?.name} · Sold by {product.partner}
            </p>
            <h1 className="mt-2 text-4xl">{product.name}</h1>
            <div className="mt-3">
              <Stars value={product.rating} count={product.reviews} />
            </div>
            <div className="mt-4">
              <Price price={product.price} compareAt={product.compareAt} size="lg" />
            </div>
            <p className="mt-4 text-muted">{product.blurb}</p>
            <BuyBox productId={product.id} />
            <ul className="mt-6 space-y-2">
              {product.highlights.map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-forest" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <h2 className="mt-8 text-2xl">Why it is here</h2>
            <p className="mt-2 text-muted">{product.why}</p>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {product.specs.map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                  <dt className="text-muted">{label}</dt>
                  <dd className="text-right font-medium">{value}</dd>
                </div>
              ))}
            </dl>
            <figure className="mt-6">
              <blockquote className="text-lg">“{product.quote.text}”</blockquote>
              <figcaption className="mt-2 text-sm text-muted">{product.quote.by}</figcaption>
            </figure>
          </div>
        </div>
        {related.length > 0 ? (
          <section className="mt-14">
            <h2 className="text-3xl">Also in {dept?.name}</h2>
            <div className="mt-4">
              <ProductGrid products={related} />
            </div>
          </section>
        ) : null}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper p-3 lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <p className="font-display text-2xl tabular-nums">{money(product.price)}</p>
          <ShopLink product={product} className={`${btnPrimary} min-w-0 flex-1 px-4`}>
            Shop
          </ShopLink>
        </div>
      </div>
    </Page>
  );
}

function BuyBox({ productId }: { productId: string }) {
  const product = getProduct(productId);
  const add = useShop((state) => state.add);
  const qty = useShop((state) => state.cart.find((line) => line.id === productId)?.qty ?? 0);
  const tag = useShop((state) => state.tag);
  const ratePct = useShop((state) => state.ratePct);
  const [copied, setCopied] = useState(false);
  if (!product) return null;
  const href = partnerHref(product.id, product.partner, tag);
  const estimate = (product.price * ratePct) / 100;

  return (
    <div className="mt-6 rounded-2xl bg-paper p-4 shadow-border">
      <p className="text-sm text-forest">In stock at {product.partner}</p>
      <div className="mt-3 hidden lg:block">
        <ShopLink product={product} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className={btnGhost}
          onClick={() => {
            add(product.id);
            toast.success(qty > 0 ? "Added another" : "Added to your buy list");
          }}
        >
          {qty > 0 ? `In your list · ${qty}` : "Add to buy list"}
        </button>
        <SaveButton id={product.id} label />
      </div>
      <p className="mt-4 text-sm text-muted">
        Tag <span className="font-medium text-ink">{tag || "juniper-20"}</span> is on this link. If it converts at{" "}
        {ratePct}%, that is about <span className="tabular-nums text-ink">{money(estimate)}</span>. Juniper does not
        take payment.
      </p>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-canvas px-3 py-2">
        <p className="min-w-0 flex-1 truncate text-xs text-muted">{href}</p>
        <button
          type="button"
          className="grid size-11 shrink-0 place-items-center"
          aria-label="Copy partner link"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(href);
              setCopied(true);
              toast.success("Partner link copied");
              window.setTimeout(() => setCopied(false), 1500);
            } catch {
              toast.error("Clipboard blocked");
            }
          }}
        >
          {copied ? <Check className="size-4 text-forest" /> : <Copy className="size-4" />}
        </button>
      </div>
    </div>
  );
}
