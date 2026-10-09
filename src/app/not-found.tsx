import Link from "next/link";
import { PageEyebrow } from "@/components/ui/PageEyebrow";
import { SERVICES } from "@/lib/services/data";

export default function NotFound() {
  return (
    <article className="page-shell min-h-[100dvh]">
      <div className="page-grid-bg absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-3xl">
        <PageEyebrow>Error 404</PageEyebrow>
        <h1 className="alu-display page-title page-title--sm mt-4">Page not found.</h1>
        <p className="alu-lede max-w-xl">
          That page does not exist or has moved. Here is where to go next.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" data-interactive className="btn-primary">
            Back to home
          </Link>
          <Link href="/contact" data-interactive className="btn-secondary">
            Contact us
          </Link>
        </div>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <li key={service.id}>
              <Link href={`/services/${service.slug}`} data-interactive className="page-tile h-full">
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-foreground">{service.nav.label}</span>
                  <span className="block text-xs text-foreground/70">{service.nav.tagline}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-foreground/70">
          Or see our <Link href="/pricing" className="font-semibold underline underline-offset-4">pricing</Link>,{" "}
          <Link href="/insights" className="font-semibold underline underline-offset-4">guides</Link> and the{" "}
          <Link href="/site-check" className="font-semibold underline underline-offset-4">free site check</Link>.
        </p>
      </div>
    </article>
  );
}
