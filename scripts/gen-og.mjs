import sharp from "sharp";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const heroPath = join(root, "src", "assets", "hero-marrakech.webp");
const outPath = join(root, "public", "og-image.jpg");

const overlay = Buffer.from(
  `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1a2f5e" stop-opacity="0.50"/>
        <stop offset="100%" stop-color="#1a2f5e" stop-opacity="0.88"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <text x="80" y="230" font-family="Arial,sans-serif" font-size="72" font-weight="bold" fill="white" letter-spacing="-1">ASOMOVIT SYNDIC</text>
    <text x="80" y="310" font-family="Arial,sans-serif" font-size="34" fill="rgba(255,255,255,0.90)">Syndic de copropriété professionnel à Marrakech</text>
    <text x="80" y="370" font-family="Arial,sans-serif" font-size="26" fill="rgba(255,255,255,0.75)">Gestion transparente · Loi 18-00 / 106-12 · Devis gratuit sous 48h</text>
    <rect x="80" y="420" width="240" height="56" rx="8" fill="#d97706"/>
    <text x="200" y="456" font-family="Arial,sans-serif" font-size="22" font-weight="bold" fill="white" text-anchor="middle">Demander un devis</text>
    <text x="80" y="580" font-family="Arial,sans-serif" font-size="20" fill="rgba(255,255,255,0.60)">syndic.asomovit.com</text>
  </svg>`,
);

await sharp(heroPath)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .composite([{ input: overlay, blend: "over" }])
  .jpeg({ quality: 90 })
  .toFile(outPath);

console.log("✓ public/og-image.jpg created (1200×630)");
