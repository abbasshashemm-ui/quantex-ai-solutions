type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();

const DEFAULT_LIMIT = 20;
const WINDOW_MS = 60 * 60 * 1000;

const MAX_TRACKED_KEYS = 5000;

function pruneExpired(now: number) {
  if (store.size < MAX_TRACKED_KEYS) return;
  for (const [key, entry] of store) {
    if (now >= entry.resetAt) store.delete(key);
  }
  // Still full of live entries: drop the oldest to keep memory bounded.
  while (store.size >= MAX_TRACKED_KEYS) {
    const oldest = store.keys().next().value;
    if (oldest === undefined) break;
    store.delete(oldest);
  }
}

function getLimit(): number {
  const parsed = Number(process.env.CHAT_RATE_LIMIT_PER_HOUR);
  if (Number.isFinite(parsed) && parsed > 0) return Math.floor(parsed);
  return DEFAULT_LIMIT;
}

export function checkChatRateLimit(key: string): {
  allowed: boolean;
  retryAfterSeconds?: number;
} {
  const now = Date.now();
  const limit = getLimit();
  const entry = store.get(key);

  if (!entry || now >= entry.resetAt) {
    pruneExpired(now);
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  store.set(key, entry);
  return { allowed: true };
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
