import puppeteer from "puppeteer-core";
const BASE = process.argv[2] || "http://localhost:3210";
const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto(BASE, { waitUntil: "networkidle2", timeout: 60000 });
await sleep(1000);
// dismiss cookie banner
await page.evaluate(() => {
  const b = document.querySelector(".iubenda-cs-accept-btn");
  if (b) b.click();
});
await sleep(500);
// open the services dropdown
const btn = await page.$('button[aria-labelledby="services-label"]');
if (btn) {
  await btn.evaluate((el) => el.scrollIntoView({ block: "center" }));
  await sleep(400);
  await btn.click();
  await sleep(500);
  // check a few services
  const boxes = await page.$$('[role="group"][aria-labelledby="services-label"] input[type="checkbox"]');
  for (const i of [5, 1, 3]) if (boxes[i]) await boxes[i].click();
  await sleep(500);
}
await page.screenshot({ path: "scripts/.shots/form-dropdown.png" });
console.log("✓ form-dropdown.png");
await browser.close();
