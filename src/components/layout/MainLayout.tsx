import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="layer-pass-through relative z-10 w-full flex-1"
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
