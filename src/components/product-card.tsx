import { Link } from "@tanstack/react-router";
import { getDepartment, type Product } from "@/lib/catalog";
import { offPercent } from "@/lib/format";
import { Price } from "@/components/price";
import { ProductPhoto } from "@/components/product-photo";
import { SaveButton } from "@/components/save-button";
import { ShopLink } from "@/components/shop-link";
import { Stars } from "@/components/stars";

export function ProductCard({ product }: { product: Product }) {
  const dept = getDepartment(product.department);
  const off = offPercent(product.price, product.compareAt);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-paper shadow-border transition-shadow duration-200 hover:shadow-lift">
      <div className="relative">
        <Link to="/p/$id" params={{ id: product.id }} className="block">
          <ProductPhoto src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
        </Link>
        {off > 0 ? (
          <span className="absolute top-2 left-2 rounded-full bg-copper-soft px-2 py-1 text-xs font-medium text-copper">
            −{off}%
          </span>
        ) : null}
        <div className="absolute top-2 right-2">
          <SaveButton id={product.id} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-xs text-muted">
          {dept?.name} · {product.partner}
        </p>
        <Link to="/p/$id" params={{ id: product.id }} className="mt-1 line-clamp-2 text-sm font-medium">
          {product.name}
        </Link>
        <div className="mt-2">
          <Stars value={product.rating} count={product.reviews} />
        </div>
        <div className="mt-2">
          <Price price={product.price} compareAt={product.compareAt} />
        </div>
        <div className="mt-auto pt-3">
          <ShopLink product={product} className="inline-flex h-11 items-center gap-1 text-sm font-medium text-forest">
            Shop
          </ShopLink>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
      {products.map((product) => (
        <li key={product.id} className="min-w-0">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
