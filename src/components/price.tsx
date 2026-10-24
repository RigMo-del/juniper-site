import { money, offPercent } from "@/lib/format";

export function Price({
  price,
  compareAt,
  size = "md",
  illustrative = false,
}: {
  price: number;
  compareAt?: number;
  size?: "md" | "lg";
  illustrative?: boolean;
}) {
  const visibleCompareAt = illustrative ? undefined : compareAt;
  const off = offPercent(price, visibleCompareAt);
  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className={size === "lg" ? "font-display text-4xl tabular-nums" : "text-base font-semibold tabular-nums"}>
        {money(price)}
      </span>
      {off > 0 && visibleCompareAt ? (
        <span className="text-sm text-muted line-through tabular-nums">{money(visibleCompareAt)}</span>
      ) : null}
      {off > 0 ? (
        <span className="rounded-full bg-copper-soft px-2 py-0.5 text-xs font-medium text-copper">Save {off}%</span>
      ) : null}
    </p>
  );
}
