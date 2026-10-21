import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { partnerHref, type Product } from "@/lib/catalog";
import { money } from "@/lib/format";
import { btnPrimary } from "@/lib/ui";
import { useShop } from "@/lib/shop-store";

export function ShopLink({
  product,
  className,
  children,
}: {
  product: Product;
  className?: string;
  children?: ReactNode;
}) {
  const tag = useShop((state) => state.tag);
  const ratePct = useShop((state) => state.ratePct);
  const track = useShop((state) => state.track);
  const href = partnerHref(product.id, product.partner, tag);

  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={className ?? `${btnPrimary} w-full`}
      onClick={() => {
        track(product.id, product.price, ratePct);
        toast.success("Click logged", {
          description: `${money((product.price * ratePct) / 100)} estimated if it converts`,
        });
      }}
    >
      {children ?? `Shop at ${product.partner}`}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </a>
  );
}
