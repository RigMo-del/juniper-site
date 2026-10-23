import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/states";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms · Juniper" }] }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <Page>
      <h1 className="text-4xl">Terms of Use (Draft)</h1>
      <p className="mt-4 max-w-2xl text-muted">
        This is a draft for launch readiness. It must be reviewed by legal counsel before production use.
      </p>
      <div className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed">
        <h2 className="text-2xl">Affiliate relationship</h2>
        <p>
          Juniper may earn commissions from qualifying purchases made through affiliate links. This does not increase the price you pay. Attribution uses a fixed owner tag that visitors cannot override.
        </p>
        <h2 className="text-2xl">Demonstration catalog</h2>
        <p>
          Products labeled as demonstration are not available for purchase through this site. Sample prices, ratings, reviews, stock status, and testimonials are illustrative only and must not be treated as real.
        </p>
        <h2 className="text-2xl">No checkout</h2>
        <p>
          Juniper does not process payments or fulfill orders. Checkout occurs on the retailer site under their terms.
        </p>
        <h2 className="text-2xl">Limitation</h2>
        <p>
          The site is provided as-is. Simulated Studio estimates are not verified earnings.
        </p>
        <p className="mt-6">
          <Link to="/" className="underline">
            Back to shop
          </Link>
        </p>
      </div>
    </Page>
  );
}
