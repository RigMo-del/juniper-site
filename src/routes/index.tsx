import { createFileRoute, Link } from "@tanstack/react-router";
import { departments, getProduct, inDepartment, listProducts, products, partnerNames } from "@/lib/catalog";
import { money } from "@/lib/format";
import { useShop } from "@/lib/shop-store";
import { btnPrimary } from "@/lib/ui";
import { ProductCard, ProductGrid } from "@/components/product-card";
import { ProductPhoto } from "@/components/product-photo";
import { Page } from "@/components/states";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Juniper — shop the edit" }] }),
  component: Home,
});

function Home() {
  const deals = listProducts({ deals: true, sort: "discount" });
  const kettle = getProduct("kettle");
  const recentIds = useShop((state) => state.recent);
  const recent = recentIds.map((id) => getProduct(id)).filter((item) => item != null);

  return (
    <Page>
      <section className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="text-sm font-medium text-forest">Affiliate storefront</p>
          <h1 className="mt-3 text-4xl leading-[1.08] sm:text-6xl">Thoughtful finds, without the noise.</h1>
          <p className="mt-4 max-w-md text-lg text-muted">
            Explore a curated preview of useful products. Listings are demonstration-only until we verify each retailer, product, and shopping link.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/deals" className={btnPrimary}>
              Explore the preview
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">
            {products.length} demonstration pieces · {partnerNames.length} sample partners · no purchases available yet
          </p>
        </div>
        <div>
          <ProductPhoto
            src="/products/hero.jpg"
            alt="Matte copper kettle on a pale oak table"
            className="aspect-4/3 w-full rounded-3xl object-cover outline outline-1 -outline-offset-1 outline-ink/10"
          />
          {kettle ? (
            <Link
              to="/p/$id"
              params={{ id: kettle.id }}
              className="mt-3 flex items-center gap-3 rounded-2xl bg-paper p-3 shadow-border"
            >
              <ProductPhoto src={kettle.image} alt="" className="size-16 rounded-xl object-cover" />
              <span>
                <span className="block text-sm text-muted">From the table</span>
                <span className="block font-medium">{kettle.name}</span>
                <span className="block text-sm tabular-nums">Sample: {money(kettle.samplePrice)}</span>
              </span>
            </Link>
          ) : null}
        </div>
      </section>

      <ol className="mt-12 grid gap-6 border-y border-line py-8 sm:grid-cols-3">
        <li>
          <p className="font-display text-2xl">01</p>
          <h2 className="mt-2 font-sans text-base font-medium tracking-normal">Explore</h2>
          <p className="mt-1 text-sm text-muted">Browse preview products and save your favorites.</p>
        </li>
        <li>
          <p className="font-display text-2xl">02</p>
          <h2 className="mt-2 font-sans text-base font-medium tracking-normal">Know what is verified</h2>
          <p className="mt-1 text-sm text-muted">No shopping links are active until the exact product and retailer have been verified.</p>
        </li>
        <li>
          <p className="font-display text-2xl">03</p>
          <h2 className="mt-2 font-sans text-base font-medium tracking-normal">Shop later</h2>
          <p className="mt-1 text-sm text-muted">Once products are verified, purchases will happen on the retailer’s website.</p>
        </li>
      </ol>

      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl">Sample picks</h2>
            <p className="text-sm text-muted">Illustrative prices only — no real sale offers.</p>
          </div>
          <Link to="/deals" className="shrink-0 text-sm font-medium text-forest">
            See all
          </Link>
        </div>
        <ul className="flex gap-3 overflow-x-auto pb-2">
          {deals.map((product) => (
            <li key={product.id} className="w-56 shrink-0 sm:w-64">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>

      {departments.map((dept) => {
        const items = inDepartment(dept.slug).slice(0, 4);
        return (
          <section key={dept.slug} className="mt-12">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl">{dept.name}</h2>
                <p className="text-sm text-muted">{dept.blurb}</p>
              </div>
              <Link to="/c/$slug" params={{ slug: dept.slug }} className="shrink-0 text-sm font-medium text-forest">
                Shop all
              </Link>
            </div>
            <ProductGrid products={items} />
          </section>
        );
      })}

      {recent.length > 0 ? (
        <section className="mt-14">
          <h2 className="text-3xl">Recently viewed</h2>
          <div className="mt-4">
            <ProductGrid products={recent} />
          </div>
        </section>
      ) : null}
    </Page>
  );
}
