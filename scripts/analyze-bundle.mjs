#!/usr/bin/env node
// Parses the webpack bundle-analyzer report and prints the heaviest client
// chunks, individual modules and npm packages, so it is obvious which dependency
// is paying for the bytes.
//
//   node scripts/analyze-bundle.mjs .next/analyze/client.html

import { readFileSync } from "node:fs";

const file = process.argv[2] ?? ".next/analyze/client.html";
const html = readFileSync(file, "utf8");

const start = html.indexOf("window.chartData =");
if (start === -1) {
  console.error("could not find chartData in", file);
  process.exit(2);
}
const from = html.indexOf("[", start);
let depth = 0;
let end = -1;
for (let i = from; i < html.length; i++) {
  if (html[i] === "[") depth++;
  else if (html[i] === "]") {
    depth--;
    if (depth === 0) {
      end = i + 1;
      break;
    }
  }
}
const charts = JSON.parse(html.slice(from, end));

// chartData is a list of chunks; each has arbitrarily nested `groups`, and only
// the leaves carry an id + gzipSize. `path` is what tells us the owning package.
const leaves = [];
function walk(node, trail) {
  if (Array.isArray(node)) {
    for (const n of node) walk(n, trail);
    return;
  }
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node.groups) && node.groups.length > 0) {
    walk(node.groups, [...trail, node.label]);
    return;
  }
  if (node.gzipSize !== undefined && node.label) {
    leaves.push({
      chunk: trail[0] ?? "?",
      pkgTrail: trail.slice(1),
      name: node.path ?? node.label,
      gzip: node.gzipSize,
      raw: node.parsedSize ?? node.statSize ?? 0,
    });
  }
}
for (const chart of charts) walk(chart, []);

const kb = (n) => (n / 1024).toFixed(1);
const r9 = (s, n) => String(s).padStart(n);

console.log(`\n=== Top 12 heaviest client chunks (${file}) ===\n`);
console.log(r9("gzip kB", 9) + r9("raw kB", 9) + "  chunk");
const byChunk = new Map();
for (const a of leaves) {
  const c = byChunk.get(a.chunk) ?? { gz: 0, raw: 0 };
  c.gz += a.gzip;
  c.raw += a.raw;
  byChunk.set(a.chunk, c);
}
for (const [name, v] of [...byChunk.entries()].sort((a, b) => b[1].gz - a[1].gz).slice(0, 12)) {
  console.log(r9(kb(v.gz), 9) + r9(kb(v.raw), 9) + "  " + name);
}

console.log("\n=== Top 20 individual modules (gzip) ===\n");
console.log(r9("gzip kB", 9) + r9("raw kB", 9) + "  module");
const strip = (p) => p.replace(/^\.\//, "");
for (const a of [...leaves].sort((x, y) => y.gzip - x.gzip).slice(0, 20)) {
  console.log(r9(kb(a.gzip), 9) + r9(kb(a.raw), 9) + "  " + strip(a.name));
}

const pkgOf = (p) => {
  const i = p.indexOf("node_modules/");
  if (i === -1) return null;
  const rest = p.slice(i + "node_modules/".length).split("/");
  return rest[0].startsWith("@") ? `${rest[0]}/${rest[1] ?? ""}` : rest[0];
};

const byPkg = new Map();
for (const a of leaves) {
  const p = pkgOf(a.name);
  if (!p) continue;
  const cur = byPkg.get(p) ?? { gz: 0, raw: 0, n: 0 };
  cur.gz += a.gzip;
  cur.raw += a.raw;
  cur.n += 1;
  byPkg.set(p, cur);
}

console.log("\n=== Top 15 npm packages by gzipped size ===\n");
console.log(r9("gzip kB", 9) + r9("raw kB", 9) + r9("mods", 6) + "  package");
for (const [name, v] of [...byPkg.entries()].sort((a, b) => b[1].gz - a[1].gz).slice(0, 15)) {
  console.log(r9(kb(v.gz), 9) + r9(kb(v.raw), 9) + r9(v.n, 6) + "  " + name);
}

// Project code (components/, app/, lib/) is often the part we can actually edit.
const own = leaves.filter((a) => !a.name.includes("node_modules"));
console.log(`\n=== Top 12 project modules (gzip) ===\n`);
console.log(r9("gzip kB", 9) + r9("raw kB", 9) + "  module");
for (const a of own.sort((x, y) => y.gzip - x.gzip).slice(0, 12)) {
  console.log(r9(kb(a.gzip), 9) + r9(kb(a.raw), 9) + "  " + strip(a.name));
}

const total = leaves.reduce((n, a) => n + a.gzip, 0);
const ownTotal = own.reduce((n, a) => n + a.gzip, 0);
console.log(
  `\nTotal client JS: ${kb(total)} KB gz  (project code ${kb(ownTotal)} KB, deps ${kb(total - ownTotal)} KB)`
);