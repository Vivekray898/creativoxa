#!/usr/bin/env node
// Performance budget: fails the build when a route ships more gzipped JS than
// the agreed ceiling.
//
// This exists because the interesting regression is silent. Nothing in the app
// breaks when 40 KB of JS is added; the page just gets slower, and by the time
// Lighthouse is run by hand the number has already moved. A budget turns that
// into a build failure.
//
//   node scripts/perf-budget.mjs http://127.0.0.1:3000

import { gzipSync } from "node:zlib";

const base = process.argv[2] ?? "http://127.0.0.1:3000";
const BUDGET_KB = Number(process.env.JS_BUDGET_KB ?? 185);

const ROUTES = [
  "/",
  "/services",
  "/services/google-ads",
  "/work",
  "/work/safar-tour",
  "/insights",
  "/tools",
  "/tools/word-counter",
  "/about",
  "/contact",
  "/privacy",
  "/disclaimer",
];

const attrs = (tag) => {
  const out = {};
  for (const m of tag.matchAll(/([a-zA-Z-:]+)\s*=\s*"([^"]*)"/g)) {
    out[m[1].toLowerCase()] = m[2];
  }
  return out;
};

// Chunk contents are cached across routes: they are shared, so re-downloading
// them would both waste time and double-count nothing useful.
const cache = new Map();
async function sizeOf(url) {
  if (!cache.has(url)) {
    cache.set(
      url,
      (async () => {
        const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
        return gzipSync(buf, { level: 9 }).length;
      })()
    );
  }
  return cache.get(url);
}

const results = [];
for (const route of ROUTES) {
  const html = await (await fetch(`${base}${route}`)).text();
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((m) => ({
    ...attrs(m[0]),
    body: m[1] ?? "",
  }));
  // `nomodule` polyfills are never fetched by a browser that can run React, so
  // charging them to the budget would be measuring the wrong thing.
  const srcs = scripts
    .filter((s) => s.src && !("nomodule" in s))
    .map((s) => new URL(s.src, base).toString());

  let total = 0;
  for (const src of new Set(srcs)) total += await sizeOf(src);
  results.push({ route, kb: total / 1024 });
}

const rp = (s, n) => String(s).padStart(n);

console.log(`\nJS budget: ${BUDGET_KB} KB gzipped per route\n`);
console.log(rp("KB", 9) + "  route");
let failed = 0;
for (const r of results.sort((a, b) => b.kb - a.kb)) {
  const over = r.kb > BUDGET_KB;
  if (over) failed++;
  console.log(rp(r.kb.toFixed(1), 9) + "  " + r.route + (over ? "   OVER BUDGET" : ""));
}

if (failed > 0) {
  console.error(
    `\n${failed} route(s) exceed the ${BUDGET_KB} KB gzipped JS budget. ` +
      `If the growth is intentional, raise JS_BUDGET_KB deliberately.`
  );
  process.exit(1);
}
console.log("\nAll routes within budget.");