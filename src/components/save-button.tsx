import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useShop } from "@/lib/shop-store";

export function SaveButton({ id, label }: { id: string; label?: boolean }) {
  const saved = useShop((state) => state.saved.includes(id));
  const toggle = useShop((state) => state.toggleSaved);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved" : "Save"}
      className={
        label
          ? "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-paper px-5 text-sm font-medium text-ink shadow-border"
          : "grid size-11 place-items-center rounded-full bg-paper/95 text-ink shadow-border"
      }
      onClick={() => {
        toggle(id);
        toast(saved ? "Removed from saved" : "Saved");
      }}
    >
      <Heart className={saved ? "size-4 text-copper" : "size-4"} fill={saved ? "currentColor" : "none"} />
      {label ? (saved ? "Saved" : "Save") : null}
    </button>
  );
}
