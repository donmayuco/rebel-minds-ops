#!/usr/bin/env node
/**
 * IndexNow submitter.
 *
 * Pushes URLs to the IndexNow endpoint so Bing (and Yandex, Seznam, Naver, who
 * share the protocol) learn about changes immediately instead of waiting to
 * crawl. This matters here because ChatGPT reads Bing's index — see
 * 03-RMOps/GEO-BENCHMARK.md.
 *
 *   npm run indexnow                    # submit every URL in the live sitemap
 *   npm run indexnow -- /practice /faq  # submit specific paths
 *   npm run indexnow -- https://www.rebelmindsops.com/practice
 *
 * The key is public by design — it is served at /<key>.txt so the endpoint can
 * verify we own the host. Nothing here is a secret.
 */

const KEY = "89ff9554f06043039ea395544fb3b735";
const HOST = process.env.INDEXNOW_HOST || "www.rebelmindsops.com";
const ORIGIN = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const toUrl = (s) => (s.startsWith("http") ? s : `${ORIGIN}${s.startsWith("/") ? s : `/${s}`}`);

async function urlsFromSitemap() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function main() {
  const args = process.argv.slice(2);

  // Verify the key file is actually reachable before submitting; a 404 here is
  // the single most common reason IndexNow silently rejects everything.
  const keyUrl = `${ORIGIN}/${KEY}.txt`;
  const keyRes = await fetch(keyUrl);
  const keyBody = keyRes.ok ? (await keyRes.text()).trim() : "";
  if (!keyRes.ok || keyBody !== KEY) {
    console.error(`✗ Key file not verifiable at ${keyUrl}`);
    console.error(`  status ${keyRes.status}, body "${keyBody.slice(0, 40)}"`);
    console.error(`  Deploy before submitting — the endpoint fetches this to prove you own ${HOST}.`);
    process.exit(1);
  }
  console.log(`✓ Key verified at ${keyUrl}`);

  const urlList = args.length ? args.map(toUrl) : await urlsFromSitemap();
  if (!urlList.length) {
    console.error("✗ No URLs to submit.");
    process.exit(1);
  }

  console.log(`→ Submitting ${urlList.length} URL(s) for ${HOST}:`);
  urlList.forEach((u) => console.log(`    ${u}`));

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: keyUrl, urlList }),
  });

  // 200 accepted, 202 accepted but key still validating. Both are successes.
  if (res.status === 200 || res.status === 202) {
    console.log(`✓ Accepted (HTTP ${res.status})${res.status === 202 ? " — key validation pending, this is normal on first run" : ""}`);
    return;
  }
  const why = {
    400: "Bad request — malformed URL list",
    403: "Key not valid for this host — check the key file is deployed and matches",
    422: "URLs do not belong to the host, or the key does not match",
    429: "Too many requests — slow down",
  }[res.status];
  console.error(`✗ HTTP ${res.status}${why ? ` — ${why}` : ""}`);
  console.error(await res.text().catch(() => ""));
  process.exit(1);
}

main().catch((e) => {
  console.error(`✗ ${e.message}`);
  process.exit(1);
});
