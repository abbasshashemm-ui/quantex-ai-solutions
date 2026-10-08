const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_KEYS = 5000;

/** Best-effort per-instance limiter; enough to stop casual abuse. */
export function allowSiteCheck(key: string, limit = 8): boolean {
  const now = Date.now();
  if (hits.size >= MAX_KEYS) {
    for (const [k, v] of hits) if (now >= v.resetAt) hits.delete(k);
    while (hits.size >= MAX_KEYS) {
      const oldest = hits.keys().next().value;
      if (oldest === undefined) break;
      hits.delete(oldest);
    }
  }
  const entry = hits.get(key);
  if (!entry || now >= entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}
