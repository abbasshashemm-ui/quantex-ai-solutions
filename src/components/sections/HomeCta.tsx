import Link from "next/link";

export function HomeCta() {
  return (
    <section className="spec-close">
      <p>Share the product, the goal, and the timeline.</p>
      <Link href="/contact" data-interactive className="btn-primary">
        Send a brief
      </Link>
    </section>
  );
}
