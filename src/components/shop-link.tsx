import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { buildAffiliateUrl, getRetailer, type Product } from "@/lib/catalog";
import { money } from "@/lib/format";
import { btnPrimary } from "@/lib/ui";
import { useShop } from "@/lib/shop-store";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";

/** Amazon Associates tracking ID for Juniper.
 *  Only the approved ID "juniperfinds6-20" is accepted.
 *  Unset or empty env uses the approved ID.
 *  Any other value (including other correctly formatted IDs) is rejected;
 *  the system never silently substitutes a different affiliate ID.
 */
const APPROVED_JUNIPER_TAG = "juniperfinds6-20";
const rawTag = import.meta.env.VITE_OWNER_AFFILIATE_TAG?.trim() ?? "";
const OWNER_AFFILIATE_TAG = rawTag === "" || rawTag === APPROVED_JUNIPER_TAG ? APPROVED_JUNIPER_TAG : null;

export function ShopLink({
  product,
  className,
  children,
}: {
  product: Product;
  className?: string;
  children?: ReactNode;
}) {
  const ratePct = useShop((state) => state.ratePct);
  const track = useShop((state) => state.track);
  const href = OWNER_AFFILIATE_TAG ? buildAffiliateUrl(product, OWNER_AFFILIATE_TAG) : null;
  const retailer = getRetailer(product.retailerId);
  const isDemo = product.isDemonstration || !product.verified || !href;

  if (isDemo) {
    return (
      <div className="flex flex-col gap-2">
        <button
          type="button"
          disabled
          className={`${className ?? `${btnPrimary} w-full`} opacity-60 cursor-not-allowed`}
          aria-disabled="true"
        >
          {"Demo only — shopping unavailable"}
        </button>
        <AffiliateDisclosure />
        <p className="text-xs text-muted">
          Sample product for demonstration. Not available for purchase. Prices, ratings, and reviews shown are illustrative only.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className={className ?? `${btnPrimary} w-full`}
        onClick={() => {
          track(product.id, product.samplePrice, ratePct);
          toast.success("Click logged (simulated)", {
            description: `${money((product.samplePrice * ratePct) / 100)} estimated if it converts — not verified network earnings`,
          });
        }}
      >
        {children ?? `Shop at ${retailer?.name ?? "retailer"}`}
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </a>
      <AffiliateDisclosure />
    </div>
  );
}
