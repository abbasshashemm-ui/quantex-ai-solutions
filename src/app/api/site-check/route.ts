import { analyzeSite } from "@/lib/sitecheck/analyze";
import { allowSiteCheck } from "@/lib/sitecheck/rate-limit";
import { normalizeUserUrl, UnsafeUrlError } from "@/lib/sitecheck/safe-fetch";
import { getClientIp } from "@/lib/chat/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  if (!allowSiteCheck(`check:${getClientIp(request)}`)) {
    return Response.json(
      { error: "You have run several checks already. Please try again in an hour, or message us on WhatsApp." },
      { status: 429 },
    );
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const raw = (body as { url?: unknown })?.url;
  if (typeof raw !== "string") {
    return Response.json({ error: "Enter your website address." }, { status: 400 });
  }
  try {
    const report = await analyzeSite(normalizeUserUrl(raw));
    return Response.json(report);
  } catch (error) {
    if (error instanceof UnsafeUrlError) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json(
      { error: "We could not read that website. Check the address, or the site may be blocking automated visits." },
      { status: 502 },
    );
  }
}
