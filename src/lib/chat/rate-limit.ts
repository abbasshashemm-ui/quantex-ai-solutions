import { limit, type LimitResult } from "@/lib/rate-limit";

const DEFAULT_LIMIT = 20;
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

function positiveInt(value: string | undefined): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : null;
}

/**
 * Two limits on the chat assistant, which costs money per message:
 * a per-visitor limit per hour, and an optional ceiling on all messages per
 * day (CHAT_DAILY_LIMIT). A per-visitor limit alone does not cap spend, because
 * requests can come from many addresses; the daily ceiling does.
 */
export async function checkChatRateLimit(key: string): Promise<LimitResult> {
  const perVisitor = await limit(
    `chat:${key}`,
    positiveInt(process.env.CHAT_RATE_LIMIT_PER_HOUR) ?? DEFAULT_LIMIT,
    HOUR_MS,
  );
  if (!perVisitor.allowed) return perVisitor;

  const daily = positiveInt(process.env.CHAT_DAILY_LIMIT);
  if (daily === null) return { allowed: true };
  return limit("chat:all", daily, DAY_MS);
}

// Prefer headers set by the platform edge over client-supplied values.
// On Vercel, x-real-ip / x-vercel-forwarded-for are overwritten at the edge.
// For a generic proxy chain, the last x-forwarded-for entry is the one added
// by our own proxy; earlier entries can be spoofed by the client.
export function getClientIp(request: Request): string {
  const trusted =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-real-ip");
  if (trusted?.trim()) return trusted.split(",")[0].trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",");
    return parts[parts.length - 1]?.trim() || "unknown";
  }
  return "unknown";
}
