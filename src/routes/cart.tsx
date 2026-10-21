import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { getProduct, type Product } from "@/lib/catalog";
import { money } from "@/lib/format";
import { useShop, type CartLine } from "@/lib/shop-store";
import { btnPrimary } from "@/lib/ui";
import { ProductPhoto } from "@/components/product-photo";
import { ShopLink } from "@/components/shop-link";
import { EmptyState, Page } from "@/components/states";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Buy list · Juniper" }] }),
  component: CartPage,
});

function CartPage() {
  const cart = useShop((state) => state.cart);
  const setQty = useShop((state) => state.setQty);
  const remove = useShop((state) => state.remove);
  const ratePct = useShop((state) => state.ratePct);
  const lines = cart
    .map((line) => ({ line, product: getProduct(line.id) }))
    .filter((row): row is { line: CartLine; product: Product } => row.product != null);
  const subtotal = lines.reduce((sum, row) => sum + row.product.price * row.line.qty, 0);

  if (!lines.length) {
    return (
      <Page>
        <EmptyState
          title="Your buy list is empty."
          body="Add pieces, then open each partner when you are ready. Juniper never charges you."
        >
          <Link to="/deals" className={btnPrimary}>
            Shop markdowns
          </Link>
        </EmptyState>
      </Page>
    );
  }

  return (
    <Page>
      <h1 className="text-4xl">Buy list</h1>
      <p className="mt-2 max-w-xl text-muted">
        A list, not a checkout. Each shop button opens the partner with your tag. Quantity is for you — one click logs a
        single unit.
      </p>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_18rem]">
        <ul className="divide-y divide-line border-y border-line">
          {lines.map(({ line, product }) => (
            <li key={line.id} className="flex gap-3 py-4">
              <Link to="/p/$id" params={{ id: product.id }} className="shrink-0">
                <ProductPhoto src={product.image} alt="" className="size-20 rounded-xl object-cover sm:size-24" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link to="/p/$id" params={{ id: product.id }} className="font-medium">
                  {product.name}
                </Link>
                <p className="text-sm text-muted">{product.partner}</p>
                <p className="mt-1 tabular-nums">{money(product.price)}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center rounded-full border border-line">
                    <button
                      type="button"
                      className="grid size-11 place-items-center"
                      aria-label="Decrease quantity"
                      onClick={() => setQty(product.id, line.qty - 1)}
                    >
                      −
                    </button>
                    <span className="w-6 text-center tabular-nums">{line.qty}</span>
                    <button
                      type="button"
                      className="grid size-11 place-items-center"
                      aria-label="Increase quantity"
                      onClick={() => setQty(product.id, line.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-11 items-center gap-1 text-sm text-muted"
                    onClick={() => remove(product.id)}
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                    Remove
                  </button>
                </div>
                <div className="mt-2">
                  <ShopLink product={product} className="inline-flex h-11 items-center gap-1 text-sm font-medium text-forest">
                    Shop
                  </ShopLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <aside className="h-fit rounded-2xl bg-paper p-4 shadow-border">
          <p className="text-sm text-muted">If every unit converted</p>
          <p className="mt-2 flex items-baseline justify-between">
            <span>Subtotal</span>
            <span className="tabular-nums font-medium">{money(subtotal)}</span>
          </p>
          <p className="mt-2 flex items-baseline justify-between">
            <span>Est. commission</span>
            <span className="tabular-nums font-medium">{money((subtotal * ratePct) / 100)}</span>
          </p>
          <p className="mt-3 text-sm text-muted">At your {ratePct}% rate. Confirmed sales post in your network, not here.</p>
        </aside>
      </div>
    </Page>
  );
}
