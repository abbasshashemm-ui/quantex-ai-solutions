import { limit } from "@/lib/rate-limit";

const HOUR_MS = 60 * 60 * 1000;

/** At most `max` checks per visitor per hour. */
export async function allowSiteCheck(key: string, max = 8): Promise<boolean> {
  return (await limit(key, max, HOUR_MS)).allowed;
}
