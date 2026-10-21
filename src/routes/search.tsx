import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { departments, listProducts, sorts, type SortId } from "@/lib/catalog";
import { ProductGrid } from "@/components/product-card";
import { Page } from "@/components/states";

type Search = { q: string; dept: string; sort: SortId };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const q = typeof search.q === "string" ? search.q : "";
    const dept = typeof search.dept === "string" ? search.dept : "";
    const sort = sorts.some((item) => item.id === search.sort) ? (search.sort as SortId) : "featured";
    return { q, dept, sort };
  },
  head: () => ({
    meta: [{ title: "Search · Juniper" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q, dept, sort } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const items = listProducts({ q, dept, sort });

  function update(patch: Partial<Search>) {
    navigate({ search: { q, dept, sort, ...patch } });
  }

  return (
    <Page>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-4xl">{q ? `Results for “${q}”` : "The whole aisle"}</h1>
          <p className="mt-2 text-sm text-muted tabular-nums">
            {items.length} {items.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
        <label className="text-sm text-muted">
          <span className="sr-only">Sort</span>
          <select
            value={sort}
            aria-label="Sort"
            onChange={(event) => update({ sort: event.target.value as SortId })}
            className="h-11 rounded-full border border-line bg-paper px-4 text-sm text-ink"
          >
            {sorts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        <button type="button" className={pill(dept === "")} onClick={() => update({ dept: "" })}>
          All
        </button>
        {departments.map((item) => (
          <button
            key={item.slug}
            type="button"
            className={pill(dept === item.slug)}
            onClick={() => update({ dept: item.slug })}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg">Nothing matched.</p>
            <p className="mt-2 text-sm text-muted">Try kettle, lamp, wool, headphones, or keyboard.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["kettle", "lamp", "wool", "headphones", "keyboard"].map((word) => (
                <button key={word} type="button" className={pill(false)} onClick={() => update({ q: word, dept: "" })}>
                  {word}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </Page>
  );
}

function pill(active: boolean) {
  return active
    ? "inline-flex h-11 shrink-0 items-center rounded-full bg-forest px-3 text-sm text-paper"
    : "inline-flex h-11 shrink-0 items-center rounded-full bg-paper px-3 text-sm text-ink shadow-border";
}
