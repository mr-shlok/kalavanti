import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "C:/Users/jrasi/AppData/Roaming/Qoder/SharedClientCache/cache/images/b77229c2/";
const OUT = "public/images";
fs.mkdirSync(OUT, { recursive: true });

// Kalavanti crest (champagne lines on transparent) — same artwork as the Monogram.
const crestSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
  <g stroke="#e6c3ad" fill="none" opacity="0.96">
    <circle cx="24" cy="24" r="22" stroke-width="1"/>
    <circle cx="24" cy="24" r="19.4" stroke-width="1.4"/>
    <path d="M16.5 20.5h15l3.2 4.2H13.3z" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M13.3 24.7 24 38l10.7-13.3" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M16.5 20.5 20 24.7 24 20.5 28 24.7 31.5 20.5" stroke-width="0.9" opacity="0.85"/>
    <path d="M13.3 24.7h21.4M20 24.7 24 38 28 24.7" stroke-width="0.9" opacity="0.75"/>
  </g>
  <g fill="#e6c3ad">
    <circle cx="4.3" cy="24" r="1.1"/>
    <circle cx="43.7" cy="24" r="1.1"/>
    <path d="M22.4 15.4 24 12.4l1.6 3 3 1.6-3 1.6-1.6 3-1.6-3-3-1.6z"/>
  </g>
</svg>`;

// Cumulative batch — only these new files are written; existing velvet PNGs are untouched.
const map = {
  "eq5t9616-454dae43.png": "velvet-bangle-navy.png",
  "6pfebtjx-6a9292ed.png": "velvet-mens-cuff-gold.png",
  "5rz19wkd-c685109c.png": "velvet-mens-shield-onyx.png",
  "4ak031vk-ee08fc71.png": "velvet-mens-signet-ruby.png",
};

for (const [src, dst] of Object.entries(map)) {
  const inPath = path.join(SRC, src);
  const meta = await sharp(inPath).metadata();
  const W = meta.width;
  const H = meta.height;
  const size = Math.round(W * 0.17);
  const margin = Math.round(W * 0.05);
  const crest = await sharp(Buffer.from(crestSvg), { density: 300 })
    .resize(size, size)
    .png()
    .toBuffer();
  await sharp(inPath)
    .composite([{ input: crest, left: W - size - margin, top: H - size - margin }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, dst));
  console.log("baked", dst, `${W}x${H}`);
}
