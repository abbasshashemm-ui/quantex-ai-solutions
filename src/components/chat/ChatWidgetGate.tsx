"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const ChatWidget = dynamic(
  () => import("./ChatWidget").then((module) => ({ default: module.ChatWidget })),
  { ssr: false },
);

export function ChatWidgetGate() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <ChatWidget />;
}
