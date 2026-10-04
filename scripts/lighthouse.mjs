#!/usr/bin/env node
// Runs Lighthouse (mobile, throttled) against a list of routes and prints a
// comparable summary line per route.
//
//   node scripts/lighthouse.mjs http://127.0.0.1:4400 / /services/google-ads
//
// Uses the locally cached Playwright Chromium so this works without a system
// Chrome install, and writes the full JSON reports to .perf/ for later diffing.

import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import lighthouse from "lighthouse";
import defaultConfig from "lighthouse/core/config/default-config.js";

const base = process.argv[2] ?? "http://127.0.0.1:4400";
const routes = process.argv.slice(3);
const label = process.env.LH_LABEL ?? "run";
const outDir = ".perf";
mkdirSync(outDir, { recursive: true });

/** Locate a Chromium: Playwright's cache first, then the system Chrome. */
function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const cache = join(homedir(), "Library/Caches/ms-playwright");
  if (existsSync(cache)) {
    for (const d of readdirSync(cache)) {
      if (!d.startsWith("chromium")) continue;
      for (const p of [
        join(cache, d, "chrome-mac/Chromium.app/Contents/MacOS/Chromium"),
        join(cache, d, "chrome-mac/headless_shell"),
      ]) {
        if (existsSync(p)) return p;
      }
    }
  }
  const sys = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  return existsSync(sys) ? sys : null;
}

const chromePath = findChrome();
if (!chromePath) {
  console.error("No Chromium found. Set CHROME_PATH to a Chrome/Chromium binary.");
  process.exit(2);
}

// --remote-debugging-port on a fixed, free-ish port; Lighthouse talks over CDP.
const PORT = 9222 + Math.floor(Math.random() * 300);
const chrome = spawn(chromePath, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--no-first-run",
  "--no-default-browser-check",
  "--disable-gpu",
  "--hide-scrollbars",
  "about:blank",
]);
chrome.stderr.on("data", () => {});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await sleep(2500);

const rows = [];
const FLAGS = {
  formFactor: "mobile",
  screenEmulation: {
    mobile: true,
    width: 412,
    height: 823,
    deviceScaleFactor: 1.75,
    disabled: false,
  },
  throttlingMethod: "simulate",
  throttling: {
    rttMs: 150,
    throughputKbps: 1638.4,
    cpuSlowdownMultiplier: 4,
  },
};

try {
  for (const route of routes) {
    const url = `${base}${route}`;
    // The programmatic API needs an explicit config object: passing only `flags`
    // yields an empty artifact list ("No artifacts were defined on the config").
    // `extends` only accepts the "lighthouse:default" alias, so the mobile
    // simulation is applied as settings on top of the default config.
    const config = {
      extends: "lighthouse:default",
      settings: { ...defaultConfig.settings, ...FLAGS },
    };
    const result = await lighthouse(
      url,
      { port: PORT, output: "json", logLevel: "error" },
      config
    );
    const lhr = result.lhr;
    writeFileSync(join(outDir, `${label}${route.replace(/\W+/g, "_") || "_home"}.json`), JSON.stringify(lhr));

    const a = lhr.audits;
    rows.push({
      route,
      perf: Math.round(lhr.categories.performance.score * 100),
      lcp: Math.round(a["largest-contentful-paint"].numericValue),
      tbt: Math.round(a["total-blocking-time"].numericValue),
      inp: a["interaction-to-next-paint"]?.numericValue
        ? Math.round(a["interaction-to-next-paint"].numericValue)
        : null,
      cls: a["cumulative-layout-shift"].numericValue.toFixed(3),
      ttfb: Math.round(a["server-response-time"].numericValue),
      fcp: Math.round(a["first-contentful-paint"].numericValue),
      si: Math.round(a["speed-index"].numericValue),
      bytes: Math.round(a["total-byte-weight"].numericValue / 1024),
    });
  }
} finally {
  chrome.kill();
}

const pad = (s, n) => String(s).padEnd(n);
const rp = (s, n) => String(s).padStart(n);

console.log(
  pad("route", 24) +
    rp("perf", 6) +
    rp("LCP", 7) +
    rp("FCP", 7) +
    rp("TTFB", 7) +
    rp("TBT", 7) +
    rp("CLS", 8) +
    rp("SI", 7) +
    rp("KB", 8)
);
console.log("-".repeat(81));
for (const r of rows) {
  console.log(
    pad(r.route, 24) +
      rp(r.perf, 6) +
      rp(`${r.lcp}ms`, 7) +
      rp(`${r.fcp}ms`, 7) +
      rp(`${r.ttfb}ms`, 7) +
      rp(`${r.tbt}ms`, 7) +
      rp(r.cls, 8) +
      rp(`${r.si}`, 7) +
      rp(r.bytes, 8)
  );
}
console.log("\nFull reports in .perf/ — diff them across runs.");