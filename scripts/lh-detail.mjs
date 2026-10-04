#!/usr/bin/env node
// Digs the useful details out of a saved Lighthouse report: what the LCP
// element actually is, what caused layout shift, which resources are
// render-blocking, and where the main-thread time went.
//
//   node scripts/lh-detail.mjs .perf/before_home.json

import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("usage: lh-detail.mjs <report.json>");
  process.exit(2);
}

const lhr = JSON.parse(readFileSync(file, "utf8"));
const a = lhr.audits;
const items = lhr.audits["network-requests"]?.details?.items ?? [];

const url = lhr.finalDisplayedUrl ?? lhr.finalUrl;
console.log(`\n=== ${url}\n`);
console.log(
  `perf ${Math.round(lhr.categories.performance.score * 100)}  ` +
    `LCP ${Math.round(a["largest-contentful-paint"].numericValue)}ms  ` +
    `CLS ${a["cumulative-layout-shift"].numericValue}  ` +
    `TBT ${Math.round(a["total-blocking-time"].numericValue)}ms\n`
);

// ── LCP element ─────────────────────────────────────────────────────────────
const lcpEl = a["largest-contentful-paint-element"]?.details?.items?.[0];
if (lcpEl) {
  const node = lcpEl.node ?? {};
  console.log("LCP element:");
  console.log(`  tag     ${node.snippet ?? node.selector ?? "?"}`);
  if (node.nodeLabel) console.log(`  label   ${node.nodeLabel}`);
  for (const p of lcpEl.items ?? []) console.log(`  ${p.timing ?? p.phase}: ${Math.round(p.timing ?? 0)}`);
  const phases = lcpEl.items ?? [];
  console.log(
    "  phases  " +
      phases
        .map((p) => `${p.phase}=${Math.round(p.timing ?? 0)}ms`)
        .join(" ")
  );
}

for (const k of ["lcp-lazy-loaded", "prioritize-lcp-image", "render-blocking-resources", "render-blocking-insight"]) {
  const au = a[k];
  if (!au) continue;
  if (au.score !== null && au.score >= 1) continue;
  const d = au.details?.items ?? [];
  console.log(`\n${k}: ${au.title}`);
  for (const it of d.slice(0, 8)) {
    console.log(
      `  ${Math.round((it.wastedMs ?? it.wastedBytes / 100) ?? 0)}ms  ${it.url ?? it.node?.snippet ?? ""}`.slice(0, 140)
    );
  }
}

// ── Render blocking ─────────────────────────────────────────────────────────
console.log("\nrender-blocking / high-priority requests:");
const blocking = items.filter(
  (i) => i.resourceType === "Script" || i.resourceType === "Stylesheet"
);
for (const i of blocking.slice(0, 14)) {
  console.log(
    `  ${String(i.resourceType).padEnd(11)} ${String(Math.round(i.transferSize / 1024)).padStart(6)}KB  ${i.url.replace(url, "") || "/"}`.slice(0, 130)
  );
}

// ── Long tasks ──────────────────────────────────────────────────────────────
const lt = a["long-tasks"]?.details?.items ?? [];
if (lt.length) {
  console.log("\nlong tasks (>50ms):");
  for (const t of lt.slice(0, 8)) {
    console.log(`  ${Math.round(t.duration)}ms  ${(t.url ?? "").replace(url, "") || "(anonymous)"}`);
  }
}

// ── Opportunities / savings ─────────────────────────────────────────────────
console.log("\ntop opportunities by savings:");
const opps = Object.values(a)
  .filter((x) => x.details?.overallSavingsMs > 0)
  .sort((x, y) => y.details.overallSavingsMs - x.details.overallSavingsMs);
for (const o of opps.slice(0, 10)) {
  console.log(`  ${String(Math.round(o.details.overallSavingsMs)).padStart(6)}ms  ${o.title}`);
}

const diag = a["diagnostics"]?.details?.items?.[0] ?? {};
if (diag.numRequests) console.log(`\nrequests ${diag.numRequests}, total ${Math.round((diag.totalByteWeight ?? 0) / 1024)}KB`);