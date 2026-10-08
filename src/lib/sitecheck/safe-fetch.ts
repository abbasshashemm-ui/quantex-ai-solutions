import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

const MAX_BYTES = 1_500_000;
const MAX_REDIRECTS = 4;
const TIMEOUT_MS = 8000;
const USER_AGENT = "QuantexSiteCheck/1.0 (+https://www.quantexai.solutions/site-check)";

export class UnsafeUrlError extends Error {}

export function normalizeUserUrl(input: string): URL {
  const trimmed = input.trim().slice(0, 300);
  if (!trimmed) throw new UnsafeUrlError("Enter your website address.");
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    throw new UnsafeUrlError("That does not look like a website address.");
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new UnsafeUrlError("Only http and https addresses can be checked.");
  }
  if (url.username || url.password) {
    throw new UnsafeUrlError("Remove the username or password from the address.");
  }
  if (url.port && url.port !== "80" && url.port !== "443") {
    throw new UnsafeUrlError("Only standard web ports can be checked.");
  }
  url.hash = "";
  return url;
}

function isPrivateIPv4(ip: string): boolean {
  const [a, b] = ip.split(".").map(Number);
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 192 && b === 0) ||
    (a === 198 && (b === 18 || b === 19)) ||
    a >= 224
  );
}

function isPrivateAddress(ip: string): boolean {
  const v = isIP(ip);
  if (v === 4) return isPrivateIPv4(ip);
  if (v === 6) {
    const lower = ip.toLowerCase();
    if (lower === "::1" || lower === "::") return true;
    const mapped = lower.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (mapped) return isPrivateIPv4(mapped[1]);
    return (
      lower.startsWith("fc") ||
      lower.startsWith("fd") ||
      lower.startsWith("fe8") ||
      lower.startsWith("fe9") ||
      lower.startsWith("fea") ||
      lower.startsWith("feb")
    );
  }
  return true;
}

async function assertPublicHost(url: URL): Promise<void> {
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (isIP(host)) {
    if (isPrivateAddress(host)) {
      throw new UnsafeUrlError("That address is not a public website.");
    }
    return;
  }
  if (!host.includes(".") || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new UnsafeUrlError("That address is not a public website.");
  }
  let addresses: { address: string }[];
  try {
    addresses = await lookup(host, { all: true });
  } catch {
    throw new UnsafeUrlError("We could not find that website. Check the spelling.");
  }
  if (addresses.length === 0 || addresses.some((a) => isPrivateAddress(a.address))) {
    throw new UnsafeUrlError("That address is not a public website.");
  }
}

export type FetchedPage = {
  url: string;
  status: number;
  headers: Headers;
  text: string;
};

/** GET with manual redirects, host validation on every hop, size and time caps. */
export async function safeFetchText(
  start: URL,
  { accept = "text/html,*/*" }: { accept?: string } = {},
): Promise<FetchedPage> {
  let current = start;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertPublicHost(current);
    const res = await fetch(current, {
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "user-agent": USER_AGENT, accept },
    });
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) break;
      const next = new URL(location, current);
      if (next.protocol !== "https:" && next.protocol !== "http:") {
        throw new UnsafeUrlError("The website redirected somewhere we cannot check.");
      }
      if (next.port && next.port !== "80" && next.port !== "443") {
        throw new UnsafeUrlError("The website redirected somewhere we cannot check.");
      }
      current = next;
      continue;
    }
    const reader = res.body?.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;
    if (reader) {
      while (total < MAX_BYTES) {
        const { done, value } = await reader.read();
        if (done || !value) break;
        chunks.push(value);
        total += value.byteLength;
      }
      await reader.cancel().catch(() => {});
    }
    const text = new TextDecoder("utf-8", { fatal: false }).decode(
      Buffer.concat(chunks.map((c) => Buffer.from(c))),
    );
    return { url: current.toString(), status: res.status, headers: res.headers, text };
  }
  throw new UnsafeUrlError("The website redirects too many times.");
}
