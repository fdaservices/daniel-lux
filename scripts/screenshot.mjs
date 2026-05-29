/**
 * Capture screenshots of the running site using the locally installed Chrome.
 * Usage: node scripts/screenshot.mjs [baseUrl]
 */
import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const BASE = process.argv[2] || "http://localhost:3210";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const OUT = "scripts/.shots";

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function prep(page) {
  await page.goto(BASE, { waitUntil: "networkidle2", timeout: 60000 });
  await sleep(1200);
  // Dismiss the Iubenda cookie banner if present.
  await page.evaluate(() => {
    const sel = [
      ".iubenda-cs-accept-btn",
      "[class*='accept']",
    ];
    for (const s of sel) {
      const b = document.querySelector(s);
      if (b && /accept|accepte/i.test(b.textContent || "")) {
        b.click();
        break;
      }
    }
  });
  await sleep(600);
  // Auto-scroll to trigger lazy-loaded images, then back to top.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 220));
    }
    window.scrollTo(0, 0);
  });
  await sleep(800);
}

async function shoot(name, { width, height, fullPage = false, before }) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await prep(page);
  if (before) await before(page);
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage });
  console.log(`✓ ${name}.png`);
  await page.close();
}

await shoot("desktop-full", { width: 1440, height: 1000, fullPage: true });
await shoot("mobile-full", { width: 390, height: 844, fullPage: true });
await shoot("contact-map", {
  width: 1440,
  height: 900,
  before: async (page) => {
    await page.evaluate(() => {
      const f = document.querySelector('iframe[src*="maps"]');
      (f || document.getElementById("contact"))?.scrollIntoView({ block: "center" });
    });
    await sleep(2000);
  },
});
await shoot("lightbox", {
  width: 1440,
  height: 900,
  before: async (page) => {
    const btn = await page.$('[aria-label^="Agrandir"]');
    if (btn) {
      await btn.evaluate((el) => el.scrollIntoView({ block: "center" }));
      await sleep(400);
      await btn.click();
      await sleep(1000);
    }
  },
});

await browser.close();
console.log("done");
