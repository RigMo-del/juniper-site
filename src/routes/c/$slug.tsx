import { createFileRoute, Link } from "@tanstack/react-router";
import { getDepartment, inDepartment } from "@/lib/catalog";
import { btnPrimary } from "@/lib/ui";
import { ProductGrid } from "@/components/product-card";
import { EmptyState, Page } from "@/components/states";

export const Route = createFileRoute("/c/$slug")({
  head: ({ params }) => {
    const dept = getDepartment(params.slug);
    return { meta: [{ title: dept ? `${dept.name} · Juniper` : "Aisle · Juniper" }] };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const dept = getDepartment(slug);
  if (!dept) {
    return (
      <Page>
        <EmptyState title="No such aisle." body="That department is not on the floor.">
          <Link to="/" className={btnPrimary}>
            Back home
          </Link>
        </EmptyState>
      </Page>
    );
  }
  const items = inDepartment(slug);
  return (
    <Page>
      <p className="text-sm font-medium text-forest">Department</p>
      <h1 className="mt-2 text-4xl">{dept.name}</h1>
      <p className="mt-2 text-muted">{dept.blurb}</p>
      <div className="mt-6">
        <ProductGrid products={items} />
      </div>
    </Page>
  );
}
