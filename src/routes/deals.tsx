import { createFileRoute } from "@tanstack/react-router";
import { listProducts } from "@/lib/catalog";
import { ProductGrid } from "@/components/product-card";
import { Page } from "@/components/states";

export const Route = createFileRoute("/deals")({
  head: () => ({ meta: [{ title: "Markdowns · Juniper" }] }),
  component: DealsPage,
});

function DealsPage() {
  const items = listProducts({ deals: true, sort: "discount" });
  return (
    <Page>
      <h1 className="text-4xl">Markdowns</h1>
      <p className="mt-2 max-w-xl text-muted">
        Pieces with a higher sample price crossed out. The partner still sets the real number at checkout.
      </p>
      <div className="mt-6">
        <ProductGrid products={items} />
      </div>
    </Page>
  );
}
