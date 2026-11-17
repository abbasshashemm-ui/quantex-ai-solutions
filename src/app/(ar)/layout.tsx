import { rootMetadata } from "@/lib/seo/metadata";
import { RootShell, rootViewport } from "../root-shell";

export const viewport = rootViewport;
export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="ar">{children}</RootShell>;
}
