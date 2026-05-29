/**
 * Build-time image generation for Daniel-Lux.
 *
 * Generates photorealistic illustrations via the OpenAI Images API (GPT Image),
 * then derives WebP variants, the 1200×630 Open Graph image and the PWA icons
 * with sharp.
 *
 * Run:  node --env-file=.env.local scripts/generate-images.mjs
 *       node --env-file=.env.local scripts/generate-images.mjs --force   (regenerate all)
 *
 * Env:  OPENAI_API_KEY        (required)
 *       OPENAI_IMAGE_MODEL    (optional, default "gpt-image-1")
 */
import { writeFile, mkdir, readFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMG = path.join(ROOT, "public", "images");
const SERVICES_DIR = path.join(IMG, "services");
const REALISATIONS_DIR = path.join(IMG, "realisations");
const TMP = path.join(ROOT, ".image-cache");

const API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";
const FORCE = process.argv.includes("--force");

if (!API_KEY) {
  console.error("✗ OPENAI_API_KEY is missing. Run with: node --env-file=.env.local scripts/generate-images.mjs");
  process.exit(1);
}

const STYLE =
  "Ultra-modern professional architectural photography, Luxembourg, bright natural daylight, " +
  "clean high-end finish, shallow depth of field, photorealistic, 35mm, crisp detail. " +
  "No text, no lettering, no captions, no logos, no watermark, no signage.";

/** name → { prompt, size, quality, out (relative to public/images), webp } */
const JOBS = [
  {
    name: "hero-daniel-lux",
    prompt:
      "A beautifully renovated, contemporary open-plan living space with freshly painted walls in soft white and a deep blue accent wall, " +
      "large windows, elegant tiled flooring, minimalist furniture, sense of craftsmanship and quality construction. " +
      STYLE,
    size: "1536x1024",
    quality: "high",
    out: "hero-daniel-lux.webp",
  },
  {
    name: "about-daniel-lux",
    prompt:
      "Professional construction and renovation craftsmen at work on a modern interior building site, " +
      "wearing clean workwear, plastering and finishing a wall, tools neatly arranged, bright site, teamwork and precision. " +
      STYLE,
    size: "1536x1024",
    quality: "high",
    out: "about-daniel-lux.webp",
  },
  {
    name: "gros-oeuvre",
    prompt:
      "Structural construction work: concrete foundations and brick masonry walls of a new modern building under a clear sky, rebar and formwork, solid groundwork. " +
      STYLE,
    size: "1536x1024",
    quality: "medium",
    out: "services/gros-oeuvre.webp",
  },
  {
    name: "renovation",
    prompt:
      "Interior renovation of a modern apartment in progress, half-finished elegant room being transformed, fresh surfaces, contrast of old and renewed. " +
      STYLE,
    size: "1536x1024",
    quality: "medium",
    out: "services/renovation.webp",
  },
  {
    name: "isolation",
    prompt:
      "Thermal insulation being installed on an interior wall and roof, mineral wool and insulation boards neatly fitted between wooden battens, energy efficiency. " +
      STYLE,
    size: "1536x1024",
    quality: "medium",
    out: "services/isolation.webp",
  },
  {
    name: "carrelage-parquet",
    prompt:
      "Close-up of a craftsman laying large modern floor tiles and elegant wood parquet in a bright contemporary room, precise alignment, premium materials. " +
      STYLE,
    size: "1536x1024",
    quality: "medium",
    out: "services/carrelage-parquet.webp",
  },
  {
    name: "nettoyage",
    prompt:
      "Spotless freshly cleaned modern interior after construction, gleaming tiled floor and clean windows, sunlight, immaculate move-in-ready space. " +
      STYLE,
    size: "1536x1024",
    quality: "medium",
    out: "services/nettoyage.webp",
  },
  {
    name: "peinture",
    prompt:
      "A painter using a roller to apply smooth fresh paint on an interior wall, crisp clean edges, paint tray and brushes, soft modern color palette with a blue accent. " +
      STYLE,
    size: "1536x1024",
    quality: "medium",
    out: "services/peinture.webp",
  },
  {
    name: "faux-plafonds",
    prompt:
      "Modern suspended false ceiling with integrated recessed LED lighting in a contemporary room, clean geometric panels, sleek architectural detail. " +
      STYLE,
    size: "1536x1024",
    quality: "medium",
    out: "services/faux-plafonds.webp",
  },
  {
    name: "demolition",
    prompt:
      "Safe interior demolition and renovation strip-out of an old room, dust controlled, debris being sorted, workers in safety gear, preparing for rebuild. " +
      STYLE,
    size: "1536x1024",
    quality: "medium",
    out: "services/demolition.webp",
  },

  // ----- Réalisations gallery: finished, polished results (no people) -----
  {
    name: "realisation-1",
    prompt:
      "Finished modern kitchen renovation, handleless matte cabinets, large-format tiled floor, island with quartz worktop, warm under-cabinet lighting, a subtle deep-blue accent, magazine-quality result. " +
      STYLE,
    size: "1536x1024",
    quality: "medium",
    out: "realisations/realisation-1.webp",
  },
  {
    name: "realisation-2",
    prompt:
      "Finished elegant bathroom, large rectified wall and floor tiles, walk-in glass shower, floating vanity, brushed fixtures, soft natural light, premium finish. " +
      STYLE,
    size: "1536x1024",
    quality: "medium",
    out: "realisations/realisation-2.webp",
  },
  {
    name: "realisation-3",
    prompt:
      "Finished bright living room after renovation, freshly painted walls with one deep-blue accent wall, herringbone wood parquet, minimalist decor, large windows, airy and luminous. " +
      STYLE,
    size: "1536x1024",
    quality: "medium",
    out: "realisations/realisation-3.webp",
  },
  {
    name: "realisation-4",
    prompt:
      "Finished contemporary house facade after exterior renovation, clean rendered walls, modern windows, neat entrance, landscaped front, blue sky, Luxembourg residential architecture. " +
      STYLE,
    size: "1536x1024",
    quality: "medium",
    out: "realisations/realisation-4.webp",
  },
  {
    name: "realisation-5",
    prompt:
      "Finished modern interior staircase with oak treads and a glass-and-steel balustrade, polished concrete and parquet flooring, architectural detail, refined craftsmanship. " +
      STYLE,
    size: "1536x1024",
    quality: "medium",
    out: "realisations/realisation-5.webp",
  },
  {
    name: "realisation-6",
    prompt:
      "Finished stylish room with a modern suspended ceiling, recessed LED lighting, smooth painted walls, designer flooring, sophisticated calm atmosphere. " +
      STYLE,
    size: "1536x1024",
    quality: "medium",
    out: "realisations/realisation-6.webp",
  },
];

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function generate(job) {
  const cachePng = path.join(TMP, `${job.name}.png`);
  const outPath = path.join(IMG, job.out);

  if (!FORCE && (await exists(outPath))) {
    console.log(`• skip   ${job.out} (exists)`);
    return cachePng;
  }

  // Reuse a cached raw PNG if we already paid for it (unless --force).
  let buf;
  if (!FORCE && (await exists(cachePng))) {
    buf = await readFile(cachePng);
    console.log(`• cached ${job.name}.png`);
  } else {
    console.log(`→ generate ${job.name} (${job.quality}, ${job.size})…`);
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        prompt: job.prompt,
        size: job.size,
        quality: job.quality,
        n: 1,
      }),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`OpenAI ${res.status}: ${txt.slice(0, 400)}`);
    }
    const data = await res.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) throw new Error("No image data returned");
    buf = Buffer.from(b64, "base64");
    await writeFile(cachePng, buf);
  }

  await sharp(buf).webp({ quality: 82 }).toFile(outPath);
  console.log(`✓ wrote  ${job.out}`);
  return cachePng;
}

async function makeOg(heroCachePng) {
  const out = path.join(IMG, "og-daniel-lux.jpg");
  if (!FORCE && (await exists(out))) {
    console.log("• skip   og-daniel-lux.jpg (exists)");
    return;
  }
  if (!(await exists(heroCachePng))) {
    console.log("• skip   og (hero source missing)");
    return;
  }
  await sharp(await readFile(heroCachePng))
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .jpeg({ quality: 86 })
    .toFile(out);
  console.log("✓ wrote  og-daniel-lux.jpg (1200×630)");
}

async function makeIcons() {
  const svg = path.join(ROOT, "src", "app", "icon.svg");
  if (!(await exists(svg))) return;
  const src = await readFile(svg);
  const targets = [
    { size: 192, out: path.join(IMG, "icon-192.png") },
    { size: 512, out: path.join(IMG, "icon-512.png") },
    { size: 180, out: path.join(ROOT, "src", "app", "apple-icon.png") },
  ];
  for (const t of targets) {
    if (!FORCE && (await exists(t.out))) {
      console.log(`• skip   ${path.basename(t.out)} (exists)`);
      continue;
    }
    await sharp(src, { density: 384 })
      .resize(t.size, t.size)
      .png()
      .toFile(t.out);
    console.log(`✓ wrote  ${path.basename(t.out)} (${t.size}px)`);
  }
}

async function main() {
  await mkdir(SERVICES_DIR, { recursive: true });
  await mkdir(REALISATIONS_DIR, { recursive: true });
  await mkdir(TMP, { recursive: true });

  console.log(`Daniel-Lux image generation — model: ${MODEL}\n`);

  let heroCache = null;
  const failures = [];

  // Small concurrency to stay within rate limits.
  const queue = [...JOBS];
  const CONCURRENCY = 3;
  async function worker() {
    while (queue.length) {
      const job = queue.shift();
      try {
        const cache = await generate(job);
        if (job.name === "hero-daniel-lux") heroCache = cache;
      } catch (err) {
        console.error(`✗ ${job.name}: ${err.message}`);
        failures.push(job.name);
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  await makeOg(heroCache ?? path.join(TMP, "hero-daniel-lux.png"));
  await makeIcons();

  console.log("\nDone.");
  if (failures.length) {
    console.log(`⚠ ${failures.length} image(s) failed: ${failures.join(", ")}`);
    process.exitCode = 2;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
