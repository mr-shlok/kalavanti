// Bakes the Kalavanti crest over the Gemini sparkle watermark at the bottom-right
// of the four hero carousel images, so no watermark is ever visible.
// A feathered medallion in each image's LOCAL velvet tone (opaque at the centre)
// fully hides the light-grey sparkle; the champagne crest sits on top as the logo.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "C:/Users/jrasi/AppData/Roaming/Qoder/SharedClientCache/cache/images/ce1e43fe/";
const OUT = "public/images";
fs.mkdirSync(OUT, { recursive: true });

// src file -> { out, [r,g,b] sampled velvet tone near the watermark }
const jobs = [
  { src: "fvpdiayf-5eea4733.png", out: "hero-navy-mens.png", tone: [10, 13, 22] },
  { src: "0g5mub4k-3871f625.png", out: "hero-black-mens.png", tone: [10, 10, 10] },
  { src: "xfqaoli9-27677f2e.png", out: "hero-purple-bridal.png", tone: [28, 20, 30] },
  { src: "jh2wcdc6-8da8dd8e.png", out: "hero-red-bridal.png", tone: [48, 18, 20] },
];

// Watermark centre measured consistently at ~(941, 356) in the 1024x434 space.
const CX = 941;
const CY = 356;
const FOOT = 132; // medallion footprint (px) — radius 66 comfortably covers the ~30px sparkle

const CHAMPAGNE = "#e6c3ad";

function badgeSvg(r, g, b) {
  const c = `rgb(${r},${g},${b})`;
  const half = FOOT / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${FOOT}" height="${FOOT}" viewBox="0 0 ${FOOT} ${FOOT}">
  <defs>
    <radialGradient id="m">
      <stop offset="0%" stop-color="${c}" stop-opacity="1"/>
      <stop offset="40%" stop-color="${c}" stop-opacity="1"/>
      <stop offset="66%" stop-color="${c}" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="${c}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="${half}" cy="${half}" r="${half}" fill="url(#m)"/>
  <g transform="translate(${half},${half}) scale(1.18) translate(-24,-24)" stroke="${CHAMPAGNE}" fill="none" opacity="0.96">
    <circle cx="24" cy="24" r="22" stroke-width="1" opacity="0.5"/>
    <circle cx="24" cy="24" r="19.4" stroke-width="1.4"/>
    <path d="M16.5 20.5h15l3.2 4.2H13.3z" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M13.3 24.7 24 38l10.7-13.3" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M16.5 20.5 20 24.7 24 20.5 28 24.7 31.5 20.5" stroke-width="0.9" opacity="0.8"/>
    <path d="M13.3 24.7h21.4M20 24.7 24 38 28 24.7" stroke-width="0.9" opacity="0.7"/>
    <path d="M22.4 15.4 24 12.4l1.6 3 3 1.6-3 1.6-1.6 3-1.6-3-3-1.6z" fill="${CHAMPAGNE}" stroke="none" opacity="0.9"/>
    <circle cx="4.3" cy="24" r="1.1" fill="${CHAMPAGNE}" stroke="none"/>
    <circle cx="43.7" cy="24" r="1.1" fill="${CHAMPAGNE}" stroke="none"/>
  </g>
</svg>`;
}

for (const { src, out, tone } of jobs) {
  const inPath = path.join(SRC, src);
  const meta = await sharp(inPath).metadata();
  const W = meta.width;
  const H = meta.height;
  // scale watermark centre if source isn't the measured 1024x434
  const cx = Math.round((CX / 1024) * W);
  const cy = Math.round((CY / 434) * H);
  const foot = Math.round((FOOT / 1024) * W);
  const badge = await sharp(Buffer.from(badgeSvg(...tone)), { density: 300 })
    .resize(foot, foot)
    .png()
    .toBuffer();
  await sharp(inPath)
    .composite([{ input: badge, left: Math.max(0, cx - foot / 2), top: Math.max(0, cy - foot / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, out));
  console.log("baked", out, `${W}x${H}`);
}
