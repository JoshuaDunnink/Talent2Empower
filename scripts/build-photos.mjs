// Fotografie pipeline: reads source photos (synced from Google Drive via
// `npm run photos:fetch`, or any folder via PHOTOS_SRC), resizes them,
// stamps a watermark, and emits webp + manifest for /turn-fotografie.
// Full originals never leave the source folder — the site only ships
// downsized, watermarked derivatives ("volledige foto's op aanvraag").
import sharp from 'sharp';
import { readdir, rm, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SRC = process.env.PHOTOS_SRC ?? join(ROOT, '.photos-src');
const OUT = join(ROOT, 'public', 'fotografie');
const THUMBS = join(OUT, 'thumbs');
const MANIFEST = join(ROOT, 'src', 'data', 'fotografie-manifest.json');

const MAX_WIDTH = 1600;
const THUMB_WIDTH = 400;
const QUALITY = 78;

// RAW extensions sharp/libvips cannot decode — we pull the embedded full-size
// JPEG preview out with exiftool instead (no demosaic, no quality loss for web).
const RAW_RE = /\.(nef|nrw|cr2|cr3|arw|raf|rw2|dng|orf|pef)$/i;

const EXIFTOOL =
  process.env.EXIFTOOL ??
  [
    `${process.env.LOCALAPPDATA}\\Programs\\ExifTool\\ExifTool.exe`,
    'C:\\Program Files\\ExifTool\\exiftool.exe',
  ].find((p) => p && existsSync(p)) ??
  'exiftool';

// Returns a decodable image buffer for any source file. For RAW, extracts the
// largest embedded JPEG (JpgFromRaw preferred, PreviewImage as fallback).
function toImageBuffer(srcPath) {
  if (!RAW_RE.test(srcPath)) return srcPath; // sharp reads it directly
  for (const tag of ['-JpgFromRaw', '-PreviewImage']) {
    try {
      const buf = execFileSync(EXIFTOOL, ['-b', tag, srcPath], { maxBuffer: 256 * 1024 * 1024 });
      if (buf && buf.length > 1024) return buf;
    } catch {
      /* try next tag */
    }
  }
  throw new Error(`No embedded JPEG found in ${srcPath} (need exiftool; set EXIFTOOL to its path)`);
}

const slugify = (name) =>
  name
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

const altFromFilename = (name) => {
  const words = name
    .replace(/\.\w+$/, '')
    .replace(/^(kopie van|copy of)\s+/i, '')
    .replace(/[-_]+/g, ' ')
    .trim();
  // Generic camera codes (DSC 0849, IMG 1234) carry no meaning — use a brand fallback.
  if (/^(dsc|img|_?dsc|p)\s*\d+$/i.test(words)) return 'Turnfotografie Talent2Empower';
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const watermarkSvg = (w) => {
  const fontSize = Math.max(18, Math.round(w * 0.028));
  const pad = Math.round(fontSize * 0.8);
  const h = fontSize + pad * 2;
  return Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <text x="${w - pad}" y="${h - pad}" text-anchor="end"
            font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="600"
            fill="#ffffff" fill-opacity="0.55" stroke="#000000" stroke-opacity="0.2" stroke-width="1">© Talent2Empower</text>
    </svg>`
  );
};

let files;
try {
  files = (await readdir(SRC))
    .filter((f) => /\.(jpe?g|png|webp|heic|tiff?)$/i.test(f) || RAW_RE.test(f))
    .sort();
} catch {
  console.error(`Source folder not found: ${SRC}`);
  console.error(
    'Run "npm run photos:fetch" first (rclone), or set PHOTOS_SRC to a folder with photos.'
  );
  process.exit(1);
}
if (files.length === 0) {
  console.error(`No photos found in ${SRC} — manifest left untouched.`);
  process.exit(1);
}

await rm(OUT, { recursive: true, force: true });
await mkdir(THUMBS, { recursive: true });

const manifest = [];
for (const file of files) {
  const base = slugify(file.replace(/\.\w+$/, ''));
  const input = toImageBuffer(join(SRC, file));

  const resized = await sharp(input)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .toBuffer();
  const { width, height } = await sharp(resized).metadata();

  await sharp(resized)
    .composite([{ input: await sharp(watermarkSvg(width)).png().toBuffer(), gravity: 'southeast' }])
    .webp({ quality: QUALITY })
    .toFile(join(OUT, `${base}.webp`));

  await sharp(input)
    .rotate()
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: 60 })
    .toFile(join(THUMBS, `${base}.webp`));

  manifest.push({
    src: `/fotografie/${base}.webp`,
    thumb: `/fotografie/thumbs/${base}.webp`,
    width,
    height,
    alt: altFromFilename(file),
  });
  console.log(`✓ ${file} -> ${base}.webp (${width}x${height})`);
}

await mkdir(join(ROOT, 'src', 'data'), { recursive: true });
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(
  `\n${manifest.length} photos processed -> public/fotografie + src/data/fotografie-manifest.json`
);
