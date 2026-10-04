#!/usr/bin/env node
// Lists every script a route actually loads, with its gzipped size, and marks
// chunks containing a given marker string (e.g. "refresh_token" for Supabase).
//
//   node scripts/chunk-tokens.mjs http://127.0.0.1:4402 / /privacy "refresh_token"

import { gzipSync } from "node:zlib";

const base = process.argv[2];
const routes = process.argv.slice(3);
const marker = process.env.MARKER ?? "refresh_token";

for (const route of routes) {
  const html = await (await fetch(`${base}${route}`)).text();
  const srcs = [...new Set([...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map((m) => m[1]))];
  console.log(`\n=== ${route} (${srcs.length} scripts) ===`);

  let total = 0;
  const rows = [];
  for (const src of srcs) {
    const res = await fetch(new URL(src, base));
    const buf = Buffer.from(await res.arrayBuffer());
    const gz = gzipSync(buf, { level: 9 }).length;
    total += gz;
    const has = marker ? buf.includes(marker) : false;
    rows.push({ src: src.split("/").pop(), gz, has });
  }
  for (const r of rows.sort((a, b) => b.gz - a.gz)) {
    console.log(`${String(r.gz).padStart(9)}  ${r.src}${r.has ? "   <-- MATCHES MARKER" : ""}`);
  }
  console.log(`${String(total).padStart(9)}  TOTAL gzipped`);
}