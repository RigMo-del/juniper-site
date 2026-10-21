import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct } from "@/lib/catalog";
import { money } from "@/lib/format";
import { useShop, type Click } from "@/lib/shop-store";
import { useMounted } from "@/lib/use-mounted";
import { btnGhost } from "@/lib/ui";
import { Page } from "@/components/states";

export const Route = createFileRoute("/studio")({
  head: () => ({ meta: [{ title: "Studio · Juniper" }] }),
  component: StudioPage,
});

function StudioPage() {
  const tag = useShop((state) => state.tag);
  const ratePct = useShop((state) => state.ratePct);
  const clicks = useShop((state) => state.clicks);
  const setTag = useShop((state) => state.setTag);
  const setRatePct = useShop((state) => state.setRatePct);
  const clearClicks = useShop((state) => state.clearClicks);
  const mounted = useMounted();
  const commission = clicks.reduce((sum, click) => sum + click.commission, 0);
  const average = clicks.length ? commission / clicks.length : 0;
  const ranked = rollup(clicks).slice(0, 5);

  return (
    <Page>
      <p className="text-sm font-medium text-forest">Affiliate studio</p>
      <h1 className="mt-2 text-4xl">Your tag, your clicks.</h1>
      <p className="mt-3 max-w-xl text-muted">
        This is click value, not confirmed earnings. Networks report purchases on their own. Juniper only sees that
        someone left through your link.
      </p>

      <div className="mt-8 grid items-start gap-4 lg:grid-cols-[20rem_1fr]">
        <form className="rounded-2xl bg-paper p-4 shadow-border" onSubmit={(event) => event.preventDefault()}>
          <label className="block text-sm font-medium" htmlFor="tag">
            Tracking tag
          </label>
          <input
            id="tag"
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            placeholder="juniper-20"
            spellCheck={false}
            className="mt-2 h-12 w-full rounded-full border border-line bg-canvas px-4 text-base outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          />
          <p className="mt-2 text-sm text-muted">
            {tag ? "Links use this tag." : "Empty falls back to juniper-20."} Letters, numbers, and hyphens.
          </p>
          <label className="mt-5 block text-sm font-medium" htmlFor="rate">
            Commission rate
          </label>
          <div className="mt-2 flex items-center gap-3">
            <input
              id="rate"
              type="range"
              min={0}
              max={20}
              step={0.5}
              value={ratePct}
              onChange={(event) => setRatePct(Number(event.target.value))}
              className="w-full accent-forest"
            />
            <span className="w-14 text-right text-sm tabular-nums">{ratePct}%</span>
          </div>
          <p className="mt-2 text-sm text-muted">Applied to future clicks. Past rows keep the rate they were logged with.</p>
          <button
            type="button"
            className={`${btnGhost} mt-5`}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(`${window.location.origin}/`);
              } catch {
                /* ignore */
              }
            }}
          >
            Copy storefront link
          </button>
        </form>

        <div className="grid gap-3 sm:grid-cols-3">
          <Stat label="Clicks" value={String(clicks.length)} />
          <Stat label="Est. commission" value={money(commission)} />
          <Stat label="Avg per click" value={money(average)} />
        </div>
      </div>

      <section className="mt-6 rounded-2xl bg-paper p-4 shadow-border">
        <h2 className="text-2xl">Last 7 days</h2>
        <div className="mt-4 h-36">{mounted ? <WeekChart clicks={clicks} /> : null}</div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl bg-paper p-4 shadow-border">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl">Top pieces</h2>
          </div>
          {ranked.length === 0 ? (
            <p className="mt-4 text-sm text-muted">No outbound clicks yet. Open a partner link from any product.</p>
          ) : (
            <ul className="mt-3 divide-y divide-line">
              {ranked.map(([id, row]) => {
                const product = getProduct(id);
                if (!product) return null;
                return (
                  <li key={id} className="flex items-center justify-between gap-3 py-3">
                    <Link to="/p/$id" params={{ id }} className="min-w-0 truncate font-medium">
                      {product.name}
                    </Link>
                    <span className="shrink-0 text-sm text-muted tabular-nums">
                      {row.n} · {money(row.commission)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
        <section className="rounded-2xl bg-paper p-4 shadow-border">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl">Recent</h2>
            {clicks.length > 0 ? (
              <button type="button" className="text-sm text-muted underline" onClick={() => clearClicks()}>
                Clear log
              </button>
            ) : null}
          </div>
          {clicks.length === 0 ? (
            <p className="mt-4 text-sm text-muted">The log fills when a shop link is opened.</p>
          ) : (
            <ul className="mt-3 divide-y divide-line">
              {clicks.slice(0, 8).map((click) => {
                const product = getProduct(click.productId);
                return (
                  <li key={click.id} className="flex items-center justify-between gap-3 py-3">
                    <Link to="/p/$id" params={{ id: click.productId }} className="min-w-0 truncate">
                      {product?.name ?? click.productId}
                    </Link>
                    <span className="shrink-0 text-sm tabular-nums">{money(click.commission)}</span>
                    <When at={click.at} />
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </Page>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-paper p-4 shadow-border">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl tabular-nums">{value}</p>
    </div>
  );
}

function When({ at }: { at: number }) {
  const mounted = useMounted();
  if (!mounted) return <span className="w-16 shrink-0" />;
  const label = new Date(at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return <time className="w-24 shrink-0 text-right text-xs text-muted tabular-nums">{label}</time>;
}

function WeekChart({ clicks }: { clicks: Click[] }) {
  const days = last7(clicks);
  const max = Math.max(1, ...days.map((day) => day.value));
  return (
    <ul className="flex h-full items-end gap-2">
      {days.map((day) => (
        <li key={day.key} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1">
          <span className="text-xs text-muted tabular-nums">{day.value}</span>
          <div className="flex h-24 w-full items-end">
            <div
              className="w-full rounded-t-md bg-forest"
              style={{ height: day.value === 0 ? "0%" : `${Math.max(8, (day.value / max) * 100)}%` }}
            />
          </div>
          <span className="text-xs text-muted">{day.label}</span>
        </li>
      ))}
    </ul>
  );
}

function last7(clicks: Click[]) {
  const days = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  for (let i = 6; i >= 0; i -= 1) {
    const day = new Date(start);
    day.setDate(start.getDate() - i);
    const next = new Date(day);
    next.setDate(day.getDate() + 1);
    const value = clicks.filter((click) => click.at >= day.getTime() && click.at < next.getTime()).length;
    days.push({
      key: day.toISOString(),
      label: day.toLocaleDateString("en-US", { weekday: "short" }),
      value,
    });
  }
  return days;
}

function rollup(clicks: Click[]) {
  const map = new Map<string, { n: number; commission: number }>();
  for (const click of clicks) {
    const row = map.get(click.productId) ?? { n: 0, commission: 0 };
    row.n += 1;
    row.commission += click.commission;
    map.set(click.productId, row);
  }
  return [...map.entries()].sort((a, b) => b[1].n - a[1].n);
}
