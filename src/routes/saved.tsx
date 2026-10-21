import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct, type Product } from "@/lib/catalog";
import { useShop } from "@/lib/shop-store";
import { btnPrimary } from "@/lib/ui";
import { ProductGrid } from "@/components/product-card";
import { EmptyState, Page } from "@/components/states";

export const Route = createFileRoute("/saved")({
  head: () => ({ meta: [{ title: "Saved · Juniper" }] }),
  component: SavedPage,
});

function SavedPage() {
  const ids = useShop((state) => state.saved);
  const items = ids.map((id) => getProduct(id)).filter((item): item is Product => item != null);

  if (!items.length) {
    return (
      <Page>
        <EmptyState title="Nothing saved yet." body="Hearts on a product stay in this browser, ready to share later.">
          <Link to="/" className={btnPrimary}>
            Browse the edit
          </Link>
        </EmptyState>
      </Page>
    );
  }

  return (
    <Page>
      <h1 className="text-4xl">Saved</h1>
      <p className="mt-2 text-sm text-muted tabular-nums">
        {items.length} {items.length === 1 ? "piece" : "pieces"}
      </p>
      <div className="mt-6">
        <ProductGrid products={items} />
      </div>
    </Page>
  );
}
