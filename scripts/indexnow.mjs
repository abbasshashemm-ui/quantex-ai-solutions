// Tell Bing, Yandex and other IndexNow engines which URLs exist / changed.
// Usage: node scripts/indexnow.mjs [https://www.quantexai.solutions]
const KEY = "52a02058ec76951f55fe56c79286a416";
const origin = (process.argv[2] ?? "https://www.quantexai.solutions").replace(/\/$/, "");
const host = new URL(origin).host;

const xml = await (await fetch(`${origin}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) throw new Error("No URLs found in sitemap");

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key: KEY, keyLocation: `${origin}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${res.status}`);
if (!res.ok && res.status !== 202) process.exit(1);
