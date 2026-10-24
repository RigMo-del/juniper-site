import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/states";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy · Juniper" }] }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Page>
      <h1 className="text-4xl">Privacy Policy (Draft)</h1>
      <p className="mt-4 max-w-2xl text-muted">
        This is a draft for launch readiness. It must be reviewed by legal counsel before production use.
      </p>
      <div className="mt-8 max-w-2xl space-y-4 text-sm leading-relaxed">
        <h2 className="text-2xl">Information we collect</h2>
        <p>
          Juniper is an affiliate storefront. We do not process payments. Product browsing, buy lists, and simulated click logs are stored locally in your browser (localStorage). We do not currently collect personal account information.
        </p>
        <h2 className="text-2xl">Affiliate links</h2>
        <p>
          When you click a verified retailer link, the retailer may set cookies or track the referral according to their own privacy policy. Juniper’s fixed affiliate tag is appended; visitors cannot override it.
        </p>
        <h2 className="text-2xl">Demonstration products</h2>
        <p>
          Current catalog items are demonstration only. Sample prices, ratings, and testimonials are illustrative and not real offers or reviews.
        </p>
        <h2 className="text-2xl">Contact</h2>
        <p>Questions: contact the site owner.</p>
        <p className="mt-6">
          <Link to="/" className="underline">
            Back to shop
          </Link>
        </p>
      </div>
    </Page>
  );
}
