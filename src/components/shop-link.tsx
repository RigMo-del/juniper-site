import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { buildAffiliateUrl, getRetailer, type Product } from "@/lib/catalog";
import { money } from "@/lib/format";
import { btnPrimary } from "@/lib/ui";
import { useShop } from "@/lib/shop-store";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";

/** Amazon Associates tracking ID for Juniper.
 *  Configurable via VITE_OWNER_AFFILIATE_TAG. Defaults to the approved Juniper ID.
 *  Invalid (non-matching) values fall back to the approved ID so a bad env
 *  cannot produce a broken or foreign tracking tag. Empty/unset also uses the approved ID.
 */
const APPROVED_JUNIPER_TAG = "juniperfinds6-20";
const rawTag = import.meta.env.VITE_OWNER_AFFILIATE_TAG?.trim() ?? "";
const OWNER_AFFILIATE_TAG = /^[a-zA-Z0-9_-]{1,64}$/.test(rawTag) ? rawTag : APPROVED_JUNIPER_TAG;

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
  const href = buildAffiliateUrl(product, OWNER_AFFILIATE_TAG);
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
