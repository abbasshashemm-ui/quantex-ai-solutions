/**
 * Request limits that hold across serverless instances.
 *
 * On Vercel every instance has its own memory and instances come and go, so a
 * counter kept in memory limits almost nothing. When an Upstash Redis store is
 * configured (the Vercel Marketplace integration sets the variables below),
 * counts live there and every instance sees the same number. Without one, or
 * if the store cannot be reached, each instance falls back to its own
 * in-memory counter, which is the old behaviour: enough for local development,
 * not a real limit in production.
 */

export type LimitResult = { allowed: boolean; retryAfterSeconds?: number };

const STORE_TIMEOUT_MS = 1500;
const MAX_TRACKED_KEYS = 5000;

function storeConfig(): { url: string; token: string } | null {
  const url =
    process.env.UPSTASH_REDIS_REST_URL?.trim() ||
    process.env.KV_REST_API_URL?.trim();
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
    process.env.KV_REST_API_TOKEN?.trim();
  return url && token ? { url: url.replace(/\/+$/, ""), token } : null;
}

/** True when limits are shared across instances. */
export function hasSharedStore(): boolean {
  return storeConfig() !== null;
}

/**
 * Count one request against `key` in a fixed window. The first request opens
 * the window; the counter expires with it.
 */
async function countInStore(
  store: { url: string; token: string },
  key: string,
  windowMs: number,
): Promise<{ count: number; ttlMs: number }> {
  const response = await fetch(`${store.url}/pipeline`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${store.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", key],
      // NX: only set the expiry when there is none, so the window is not extended.
      ["PEXPIRE", key, String(windowMs), "NX"],
      ["PTTL", key],
    ]),
    signal: AbortSignal.timeout(STORE_TIMEOUT_MS),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`rate-limit store answered ${response.status}`);

  const results = (await response.json()) as { result?: unknown; error?: string }[];
  const count = Number(results[0]?.result);
  const ttl = Number(results[2]?.result);
  if (!Number.isFinite(count)) throw new Error("rate-limit store sent no count");
  return { count, ttlMs: Number.isFinite(ttl) && ttl > 0 ? ttl : windowMs };
}

const memory = new Map<string, { count: number; resetAt: number }>();

function countInMemory(key: string, windowMs: number) {
  const now = Date.now();
  if (memory.size >= MAX_TRACKED_KEYS) {
    for (const [k, entry] of memory) if (now >= entry.resetAt) memory.delete(k);
    // Still full of live entries: drop the oldest to keep memory bounded.
    while (memory.size >= MAX_TRACKED_KEYS) {
      const oldest = memory.keys().next().value;
      if (oldest === undefined) break;
      memory.delete(oldest);
    }
  }
  const entry = memory.get(key);
  if (!entry || now >= entry.resetAt) {
    memory.set(key, { count: 1, resetAt: now + windowMs });
    return { count: 1, ttlMs: windowMs };
  }
  entry.count += 1;
  return { count: entry.count, ttlMs: entry.resetAt - now };
}

let warned = false;

/** Allow at most `max` requests per `windowMs` for `key`. */
export async function limit(
  key: string,
  max: number,
  windowMs: number,
): Promise<LimitResult> {
  const store = storeConfig();
  let counted: { count: number; ttlMs: number };

  if (store) {
    try {
      counted = await countInStore(store, `rl:${key}`, windowMs);
    } catch (error) {
      // The store being down must not take the site's tools down with it.
      if (!warned) {
        warned = true;
        console.error("[rate-limit] store unavailable, using per-instance limits:", error);
      }
      counted = countInMemory(key, windowMs);
    }
  } else {
    counted = countInMemory(key, windowMs);
  }

  if (counted.count > max) {
    return { allowed: false, retryAfterSeconds: Math.ceil(counted.ttlMs / 1000) };
  }
  return { allowed: true };
}
