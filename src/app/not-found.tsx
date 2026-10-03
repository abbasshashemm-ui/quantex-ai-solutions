import type { Metadata } from "next";
import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative min-h-[100dvh] px-4 pb-24 pt-[calc(7.75rem+env(safe-area-inset-top))] sm:px-6 sm:pt-[9.75rem]">
      <div className="mx-auto max-w-7xl">
        <PageEyebrow>[ 404 / Not found ]</PageEyebrow>
        <h1 className="section-heading mt-3 max-w-3xl text-metallic-gradient">
          That page is not on this system.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-[1.75] text-foreground/75 sm:text-[1.0625rem]">
          The link may be old or mistyped. Head back to the main page, or tell
          us what you were looking for and we will point you to it.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" data-interactive className="btn-primary">
            Back to home
          </Link>
          <Link href="/contact" data-interactive className="btn-secondary">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
