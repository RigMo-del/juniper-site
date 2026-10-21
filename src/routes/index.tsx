import { createFileRoute, Link } from "@tanstack/react-router";
import { departments, getProduct, inDepartment, listProducts, products, partnerNames } from "@/lib/catalog";
import { money } from "@/lib/format";
import { useShop } from "@/lib/shop-store";
import { btnGhost, btnPrimary } from "@/lib/ui";
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
          <h1 className="mt-3 text-4xl leading-[1.08] sm:text-6xl">Shop the edit. Earn on the way out.</h1>
          <p className="mt-4 max-w-md text-lg text-muted">
            A curated aisle of partner goods. Paste your tracking tag once. Every shop link carries it, and Studio
            turns the click into an estimated commission.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/deals" className={btnPrimary}>
              Shop markdowns
            </Link>
            <Link to="/studio" className={btnGhost}>
              Open Studio
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">
            {products.length} pieces · {partnerNames.length} partners · checkout happens on their site
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
                <span className="block text-sm tabular-nums">{money(kettle.price)}</span>
              </span>
            </Link>
          ) : null}
        </div>
      </section>

      <ol className="mt-12 grid gap-6 border-y border-line py-8 sm:grid-cols-3">
        <li>
          <p className="font-display text-2xl">01</p>
          <h2 className="mt-2 font-sans text-base font-medium tracking-normal">Paste a tag</h2>
          <p className="mt-1 text-sm text-muted">Any partner ID. It stays in this browser and rides on every outbound link.</p>
        </li>
        <li>
          <p className="font-display text-2xl">02</p>
          <h2 className="mt-2 font-sans text-base font-medium tracking-normal">Share or shop</h2>
          <p className="mt-1 text-sm text-muted">Send a product link, or open the partner yourself. Both count as a click.</p>
        </li>
        <li>
          <p className="font-display text-2xl">03</p>
          <h2 className="mt-2 font-sans text-base font-medium tracking-normal">Read Studio</h2>
          <p className="mt-1 text-sm text-muted">Clicks and estimated commission. Purchases still post in your network, not here.</p>
        </li>
      </ol>

      <section className="mt-12">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl">Markdowns</h2>
            <p className="text-sm text-muted">Sample prices, marked down so the aisle has a pulse.</p>
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
