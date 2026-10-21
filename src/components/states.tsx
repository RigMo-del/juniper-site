import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { btnPrimary } from "@/lib/ui";

export function Page({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-8 sm:px-6">{children}</div>;
}

export function EmptyState({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <h1 className="text-4xl">{title}</h1>
      <p className="mt-3 text-muted">{body}</p>
      {children ? <div className="mt-6 flex justify-center gap-3">{children}</div> : null}
    </div>
  );
}

export function NotFound() {
  return (
    <Page>
      <EmptyState title="That aisle is empty." body="Nothing is stocked at this address.">
        <Link to="/" className={btnPrimary}>
          Back home
        </Link>
      </EmptyState>
    </Page>
  );
}
