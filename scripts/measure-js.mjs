#!/usr/bin/env node
// Measures what actually reaches the browser for each route: gzipped JS bytes,
// script request count, render-blocking resources and total requests.
//
// This is the honest version of the "First Load JS" number: it reads the built
// HTML, follows every <script src>, and sums the compressed transfer size the
// network would see -- which is the metric Lighthouse actually scores.
//
//   node scripts/measure-js.mjs http://127.0.0.1:3000 / /services /tools/word-counter

import { gzipSync, brotliCompressSync, constants } from "node:zlib";

const base = process.argv[2] ?? "http://127.0.0.1:3000";
const paths = process.argv.slice(3);

if (paths.length === 0) {
  console.error("usage: measure-js.mjs <baseUrl> <path...>");
  process.exit(2);
}

// Content is fetched once and reused across routes: chunks are shared, so
// re-downloading them per route would both slow this down and misreport the
// per-page total.
const cache = new Map();

async function fetchBody(url) {
  if (cache.has(url)) return cache.get(url);
  const promise = (async () => {
    const res = await fetch(url, { redirect: "follow" });
    const buf = Buffer.from(await res.arrayBuffer());
    return { buf, type: res.headers.get("content-type") ?? "" };
  })();
  cache.set(url, promise);
  return promise;
}

const gzipSize = (buf) => gzipSync(buf, { level: 9 }).length;
const brotliSize = (buf) =>
  brotliCompressSync(buf, {
    params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
  }).length;

function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([a-zA-Z-:]+)\s*=\s*"([^"]*)"/g)) {
    // Lower-case the keys: React emits `noModule`, the HTML spec says
    // `nomodule`, and callers should not have to care which one arrived.
    out[m[1].toLowerCase()] = m[2];
  }
  return out;
}

const kb = (n) => (n / 1024).toFixed(1).padStart(7);

const rows = [];

for (const path of paths) {
  const url = `${base}${path}`;
  const res = await fetch(url, { redirect: "follow" });
  const html = Buffer.from(await res.arrayBuffer()).toString("utf8");

  // --- scripts -----------------------------------------------------------
  const all = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map((m) => ({
    ...attrs(m[0]),
    body: m[1] ?? "",
  }));
  // `noModule` scripts are legacy-browser polyfills: every current browser skips
  // them, so charging their bytes to "JS per page" would overstate the real
  // transfer by tens of kB. They are reported separately.
  const legacy = all.filter((s) => "nomodule" in s);
  const scripts = all.filter((s) => !("nomodule" in s));
  const srcs = scripts.map((s) => s.src).filter(Boolean);
  // Inline scripts ship inside the HTML document, so they are counted as part of
  // the HTML/br column rather than as separate JS chunks.
  const inlineBytes = scripts.reduce((n, s) => (s.src ? n : n + s.body.length), 0);

  let jsRaw = 0;
  let jsGz = 0;
  let jsBr = 0;
  for (const src of new Set(srcs)) {
    const { buf } = await fetchBody(new URL(src, url).toString());
    jsRaw += buf.length;
    jsGz += gzipSize(buf);
    jsBr += brotliSize(buf);
  }

  // --- css ---------------------------------------------------------------
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attrs(m[0]));
  const cssHrefs = links
    .filter((l) => (l.rel ?? "").includes("stylesheet") && l.href)
    .map((l) => l.href);
  let cssBr = 0;
  for (const href of new Set(cssHrefs)) {
    const { buf } = await fetchBody(new URL(href, url).toString());
    cssBr += brotliSize(buf);
  }

  // --- render-blocking ---------------------------------------------------
  // A stylesheet in <head> blocks first paint. A <script src> in <head>
  // without async/defer blocks the parser.
  const head = html.split("</head>")[0] ?? html;
  const renderBlockingCss = cssHrefs.filter((h) =>
    head.includes(`<link rel="stylesheet" href="${h}"`)
  ).length;
  const renderBlockingJs = [...head.matchAll(/<script\b[^>]*src=[^>]*>/g)]
    .map((m) => attrs(m[0]))
    .filter((s) => s.async === undefined && s.defer === undefined).length;

  const preloadImages = [...html.matchAll(/<link\b[^>]*>/g)]
    .map((m) => attrs(m[0]))
    .filter((l) => l.rel === "preload" && (l.as === "image" || l.as === "font")).length;

  rows.push({
    path,
    htmlBr: brotliSize(Buffer.from(html)),
    scripts: new Set(srcs).size,
    jsRaw,
    jsGz,
    jsBr,
    cssBr,
    renderBlockingCss,
    renderBlockingJs,
    preloadImages,
    requests: new Set(srcs).size + new Set(cssHrefs).size,
    inlineBytes,
    legacyBytes: legacy.reduce((n, s) => n + (s.src?.length ?? 0), 0),
    legacyCount: legacy.filter((s) => s.src).length,
  });
}

const pad = (s, n) => String(s).padEnd(n);
const rpad = (s, n) => String(s).padStart(n);

console.log(
  pad("route", 26) +
    rpad("HTML br", 10) +
    rpad("JS gz", 10) +
    rpad("JS br", 10) +
    rpad("JS raw", 11) +
    rpad("CSS br", 9) +
    rpad("scripts", 8) +
    rpad("reqs", 6) +
    rpad("inline", 8) +
    rpad("rblock", 8)
);
console.log("-".repeat(106));

let worst = { jsBr: 0 };
for (const r of rows) {
  const flag =
    r.jsGz > 150 * 1024 ? "  <-- OVER 150KB gz target" : r.renderBlockingJs > 0 ? "  <-- blocking JS" : "";
  console.log(
    pad(r.path, 26) +
      rpad(kb(r.htmlBr), 10) +
      rpad(kb(r.jsGz), 10) +
      rpad(kb(r.jsBr), 10) +
      rpad(kb(r.jsRaw), 11) +
      rpad(kb(r.cssBr), 9) +
      rpad(r.scripts, 8) +
      rpad(r.requests, 6) +
      rpad(kb(r.inlineBytes), 8) +
      rpad(`${r.renderBlockingCss}c${r.renderBlockingJs}j`, 8) +
      flag
  );
  if (r.jsGz > worst.jsBr) worst = r;
}

console.log("\n(kB. js gz = gzip -9, js br = brotli q11, css br = brotli q11.)");console.log(
  `Heaviest route: ${worst.path} at ${(worst.jsGz / 1024).toFixed(1)} KB gzipped JS.`
);
console.log(
  `Excluded from these totals: ${rows[0].legacyCount} noModule (legacy-polyfill) script(s) ` +
    `which no modern browser downloads.`
);