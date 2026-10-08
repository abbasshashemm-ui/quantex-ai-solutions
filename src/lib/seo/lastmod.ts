// Real modification dates for the sitemap. Articles carry their own
// `dateModified`; every other page uses the date below. Bump it when a
// page's content changes so crawlers see an honest signal, not the build time.
export const SITE_CONTENT_UPDATED = "2026-10-08";

export function toDate(day: string): Date {
  return new Date(`${day}T00:00:00Z`);
}
