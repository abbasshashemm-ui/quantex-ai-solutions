import { allowSiteCheck } from "@/lib/sitecheck/rate-limit";
import { normalizeUserUrl, UnsafeUrlError } from "@/lib/sitecheck/safe-fetch";
import { fetchSpeed } from "@/lib/sitecheck/speed";
import { getClientIp } from "@/lib/chat/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!allowSiteCheck(`speed:${getClientIp(request)}`)) {
    return Response.json({ error: "Too many checks. Please try again in an hour." }, { status: 429 });
  }
  let raw: unknown;
  try {
    raw = ((await request.json()) as { url?: unknown })?.url;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (typeof raw !== "string") {
    return Response.json({ error: "Enter your website address." }, { status: 400 });
  }
  try {
    const url = normalizeUserUrl(raw);
    // Google fetches the page itself; we only pass a public http(s) URL through.
    return Response.json(await fetchSpeed(url.toString()));
  } catch (error) {
    const message = error instanceof UnsafeUrlError ? error.message : "Speed test failed.";
    return Response.json({ error: message }, { status: 400 });
  }
}
