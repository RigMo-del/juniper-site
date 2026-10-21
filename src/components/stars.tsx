import { Star } from "lucide-react";

export function Stars({ value, count }: { value: number; count?: number }) {
  return (
    <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm text-muted">
      <span className="flex" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((index) => {
          const fill = Math.max(0, Math.min(1, value - index));
          return (
            <span key={index} className="relative size-3.5">
              <Star className="size-3.5 text-line" fill="currentColor" strokeWidth={0} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="size-3.5 text-copper" fill="currentColor" strokeWidth={0} />
              </span>
            </span>
          );
        })}
      </span>
      <span className="tabular-nums text-ink">{value.toFixed(1)}</span>
      {count != null ? <span className="tabular-nums">({count.toLocaleString("en-US")})</span> : null}
      <span className="sr-only">
        {value} out of 5{count != null ? `, ${count} reviews` : ""}
      </span>
    </p>
  );
}
