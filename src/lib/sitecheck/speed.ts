import type { SpeedReport } from "@/lib/sitecheck/types";

type PsiAudit = { displayValue?: string };
type PsiResponse = {
  lighthouseResult?: {
    categories?: { performance?: { score?: number | null } };
    audits?: Record<string, PsiAudit>;
  };
  error?: { message?: string };
};

/** Mobile speed via the free Google PageSpeed Insights API. */
export async function fetchSpeed(url: string): Promise<SpeedReport> {
  const params = new URLSearchParams({ url, strategy: "mobile", category: "performance" });
  const key = process.env.PAGESPEED_API_KEY?.trim();
  if (key) params.set("key", key);
  try {
    const res = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`,
      { signal: AbortSignal.timeout(55_000) },
    );
    const data = (await res.json()) as PsiResponse;
    if (!res.ok || !data.lighthouseResult) {
      return { score: null, lcp: null, cls: null, tbt: null, error: "Speed test is busy right now. Try again in a minute." };
    }
    const lh = data.lighthouseResult;
    const raw = lh.categories?.performance?.score;
    const audits = lh.audits ?? {};
    return {
      score: typeof raw === "number" ? Math.round(raw * 100) : null,
      lcp: audits["largest-contentful-paint"]?.displayValue ?? null,
      cls: audits["cumulative-layout-shift"]?.displayValue ?? null,
      tbt: audits["total-blocking-time"]?.displayValue ?? null,
    };
  } catch {
    return { score: null, lcp: null, cls: null, tbt: null, error: "The speed test timed out. Try again in a minute." };
  }
}
