import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, Sprout } from "lucide-react";
import { Toaster } from "sonner";
import { departments } from "@/lib/catalog";
import { useShop } from "@/lib/shop-store";
import { wrap } from "@/lib/ui";

export function Shell({ children }: { children: ReactNode }) {
  useEffect(() => {
    void useShop.persist.rehydrate();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <div className="bg-forest text-paper">
        <div className={`${wrap} flex items-center justify-between gap-3 py-2`}>
          <p className="text-sm">Partner links carry your tag.</p>
          <Link to="/studio" className="inline-flex h-11 shrink-0 items-center rounded-full bg-paper/15 px-3 text-sm">
            Edit tag
          </Link>
        </div>
      </div>
      <header className="sticky top-0 z-20 border-b border-line bg-canvas/90 backdrop-blur-md">
        <div className={wrap}>
          <div className="flex items-center gap-2 py-2">
            <Link to="/" className="flex h-11 items-center gap-2 pr-1">
              <span className="grid size-9 place-items-center rounded-full bg-forest text-paper">
                <Sprout className="size-5" aria-hidden="true" />
              </span>
              <span className="font-display text-xl leading-none">Juniper</span>
            </Link>
            <div className="hidden min-w-0 flex-1 sm:block">
              <SearchForm id="q-desktop" />
            </div>
            <Utility />
          </div>
          <div className="pb-2 sm:hidden">
            <SearchForm id="q-mobile" />
          </div>
          <nav className="flex gap-1 overflow-x-auto pb-2" aria-label="Departments">
            <DeptLinks />
          </nav>
        </div>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "var(--color-paper)",
            color: "var(--color-ink)",
            border: "1px solid var(--color-line)",
            boxShadow: "var(--shadow-lift)",
          },
        }}
      />
    </div>
  );
}

function Utility() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const saved = useShop((state) => state.saved.length);
  const count = useShop((state) => state.cart.reduce((sum, line) => sum + line.qty, 0));
  const tag = useShop((state) => state.tag);

  return (
    <div className="ml-auto flex items-center">
      <Link
        to="/studio"
        className="mr-1 hidden h-11 max-w-36 items-center truncate rounded-full bg-foam px-3 text-sm text-forest md:inline-flex"
      >
        {tag || "set tag"}
      </Link>
      <Link
        to="/saved"
        aria-current={pathname === "/saved" ? "page" : undefined}
        className="inline-flex h-11 items-center gap-1.5 rounded-full px-2 text-sm sm:px-3"
      >
        <Heart className="size-5" aria-hidden="true" />
        <span className="hidden sm:inline">Saved</span>
        {saved > 0 ? <span className="tabular-nums">{saved}</span> : null}
      </Link>
      <Link
        to="/cart"
        aria-current={pathname === "/cart" ? "page" : undefined}
        className="inline-flex h-11 items-center gap-1.5 rounded-full px-2 text-sm sm:px-3"
      >
        <ShoppingBag className="size-5" aria-hidden="true" />
        <span className="hidden sm:inline">Buy list</span>
        {count > 0 ? <span className="tabular-nums">{count}</span> : null}
      </Link>
    </div>
  );
}

function DeptLinks() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const links = [
    { to: "/deals" as const, label: "Markdowns", active: pathname === "/deals" },
    { to: "/studio" as const, label: "Studio", active: pathname === "/studio" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link key={link.to} to={link.to} className={chip(link.active)} aria-current={link.active ? "page" : undefined}>
          {link.label}
        </Link>
      ))}
      {departments.map((dept) => {
        const active = pathname === `/c/${dept.slug}`;
        return (
          <Link
            key={dept.slug}
            to="/c/$slug"
            params={{ slug: dept.slug }}
            className={chip(active)}
            aria-current={active ? "page" : undefined}
          >
            {dept.name}
          </Link>
        );
      })}
    </>
  );
}

function chip(active: boolean) {
  return active
    ? "inline-flex h-11 shrink-0 items-center rounded-full bg-forest px-3 text-sm text-paper"
    : "inline-flex h-11 shrink-0 items-center rounded-full px-3 text-sm text-ink hover:bg-foam";
}

function SearchForm({ id }: { id: string }) {
  const navigate = useNavigate();
  const qParam = useRouterState({
    select: (state) => {
      const raw = state.location.search as { q?: unknown } | string;
      if (typeof raw === "string") return new URLSearchParams(raw).get("q") ?? "";
      return typeof raw?.q === "string" ? raw.q : "";
    },
  });
  const [q, setQ] = useState(qParam);

  useEffect(() => {
    setQ(qParam);
  }, [qParam]);

  return (
    <form
      action="/search"
      method="get"
      role="search"
      className="relative"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        navigate({
          to: "/search",
          search: { q: String(data.get("q") ?? "").trim(), dept: "", sort: "featured" },
        });
      }}
    >
      <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" aria-hidden="true" />
      <label className="sr-only" htmlFor={id}>
        Search products
      </label>
      <input
        id={id}
        name="q"
        value={q}
        onChange={(event) => setQ(event.target.value)}
        placeholder="Search kettles, lamps, packs"
        autoComplete="off"
        enterKeyHint="search"
        className="h-11 w-full rounded-full border border-line bg-paper pr-4 pl-11 text-base outline-none placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
      />
    </form>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className={`${wrap} grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4`}>
        <div className="sm:col-span-2">
          <p className="font-display text-2xl">Juniper</p>
          <p className="mt-2 max-w-md text-sm text-muted">
            Juniper may earn a commission when someone buys through a partner link. Prices, ratings, and partners
            here are a sample catalog so you can try the aisle. Shoppers pay the partner, never Juniper.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Aisles</p>
          <ul className="mt-2 space-y-1 text-sm">
            {departments.map((dept) => (
              <li key={dept.slug}>
                <Link to="/c/$slug" params={{ slug: dept.slug }} className="text-muted hover:text-ink">
                  {dept.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">For you</p>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            <li>
              <Link to="/deals" className="hover:text-ink">
                Markdowns
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-ink">
                Buy list
              </Link>
            </li>
            <li>
              <Link to="/saved" className="hover:text-ink">
                Saved
              </Link>
            </li>
            <li>
              <Link to="/studio" className="hover:text-ink">
                Studio
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${wrap} border-t border-line py-4 text-xs text-muted`}>© 2026 Juniper. Sample affiliate storefront.</div>
    </footer>
  );
}
