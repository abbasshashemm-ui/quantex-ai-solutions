import type { Metadata } from "next";
import NotFound from "./(en)/not-found";
import { RootShell, rootViewport } from "./root-shell";

/**
 * The page for an address that matches no route. Each language has its own
 * root layout, so there is no single layout for Next.js to build a site-wide
 * 404 from; this file is that page, and renders the whole document itself.
 * (A missing item inside a real section, such as an unknown guide, uses the
 * not-found page of that language's layout instead.)
 */
export const viewport = rootViewport;

export const metadata: Metadata = {
  title: "Page not found | Quantex AI Solutions",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <RootShell lang="en">
      <NotFound />
    </RootShell>
  );
}
