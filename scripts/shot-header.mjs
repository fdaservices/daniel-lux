import puppeteer from "puppeteer-core";
const BASE = process.argv[2] || "http://localhost:3210";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 360 });
await page.goto(BASE, { waitUntil: "networkidle2", timeout: 60000 });
await sleep(1500);
await page.evaluate(() => {
  const el = document.getElementById("iubenda-cs-banner");
  if (el) el.style.display = "none";
  document.querySelectorAll('[class*="iubenda"]').forEach((n) => {
    if (n instanceof HTMLElement && n.style) n.style.display = "none";
  });
});
await sleep(400);
await page.screenshot({ path: "scripts/.shots/header.png" });
console.log("✓ header.png");
await browser.close();
