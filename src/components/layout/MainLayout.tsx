import type { ReactNode } from "react";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { SiteMotion } from "@/components/providers/SiteMotion";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <div className="site-grain" aria-hidden />
      <div className="site-ambient" aria-hidden />
      <Navbar />
      <SiteMotion>
        <main
          id="main-content"
          className="layer-pass-through relative z-10 w-full flex-1"
        >
          {children}
        </main>
        <Footer />
      </SiteMotion>
      <ChatWidget />
    </>
  );
}
