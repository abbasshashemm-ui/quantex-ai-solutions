import { ImageResponse } from "next/og";
import { getOgPages } from "@/lib/seo/og-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(getOgPages()).map((key) => ({ key }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;
  const page = getOgPages()[key];
  if (!page) return new Response("Not found", { status: 404 });

  const size = page.title.length > 60 ? 58 : page.title.length > 36 ? 72 : 92;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#eef0f4",
          background:
            "linear-gradient(135deg, #1b1f26 0%, #0f1115 55%, #0a0b0e 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#a3abb7",
          }}
        >
          <div style={{ display: "flex", color: "#eef0f4", fontWeight: 800, letterSpacing: 4 }}>
            QUANTEX
          </div>
          <div style={{ display: "flex" }}>{page.eyebrow}</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: size,
            fontWeight: 800,
            lineHeight: 1.05,
            textTransform: "uppercase",
            letterSpacing: -1,
            maxWidth: 1000,
          }}
        >
          {page.title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(238,240,244,0.18)",
            paddingTop: 24,
            fontSize: 26,
            color: "#a3abb7",
          }}
        >
          <div style={{ display: "flex" }}>quantexai.solutions</div>
          <div style={{ display: "flex", color: "#47c99a" }}>Beirut · Lebanon</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
