/**
 * Load the running site in headless Chrome and report console errors/warnings,
 * specifically hydration mismatches. Usage: node scripts/check-console.mjs [url]
 */
import puppeteer from "puppeteer-core";

const BASE = process.argv[2] || "http://localhost:3210";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox"],
});
const page = await browser.newPage();

const messages = [];
page.on("console", (m) => {
  const t = m.type();
  if (t === "error" || t === "warning" || t === "warn") {
    messages.push(`[${t}] ${m.text()}`);
  }
});
page.on("pageerror", (e) => messages.push(`[pageerror] ${e.message}`));

await page.goto(BASE, { waitUntil: "networkidle2", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));

const hydration = messages.filter((m) => /hydrat/i.test(m));
console.log(`Total console errors/warnings: ${messages.length}`);
console.log(`Hydration-related: ${hydration.length}`);
console.log("--- messages (first 20) ---");
messages.slice(0, 20).forEach((m) => console.log(m.slice(0, 200)));

await browser.close();
process.exit(hydration.length > 0 ? 2 : 0);
