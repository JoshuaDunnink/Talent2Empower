// One-shot: download all lh3.googleusercontent.com images referenced by pages/prototypes
// into src/assets/images/ and print a URL -> file mapping. Safe to re-run (skips existing).
import { readFile, writeFile, mkdir, readdir, access } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = join(ROOT, 'src', 'assets', 'images');

const SOURCES = [
  ...(await readdir(join(ROOT, 'src', 'pages'))).map((f) => join(ROOT, 'src', 'pages', f)),
  join(ROOT, 'stitch_talent2empower_website_redesign', 'turn_fotografie', 'code.html'),
  join(ROOT, 'stitch_talent2empower_website_redesign', 'watersport', 'code.html'),
  join(
    ROOT,
    'stitch_talent2empower_website_redesign',
    'focus_update_talent2empower_cofun',
    'code.html'
  ),
];

const URL_RE = /https:\/\/lh3\.googleusercontent\.com\/[A-Za-z0-9_\-./]+/g;

const found = new Map(); // url -> Set(sourceFile)
for (const file of SOURCES) {
  const text = await readFile(file, 'utf8').catch(() => null);
  if (!text) continue;
  for (const m of text.match(URL_RE) ?? []) {
    if (!found.has(m)) found.set(m, new Set());
    found.get(m).add(basename(file));
  }
}

await mkdir(OUT, { recursive: true });
const mapping = [];
for (const [url, sources] of found) {
  const page = [...sources][0].replace(/\.(astro|html)$/, '').replace('code', 'proto');
  const hash = createHash('sha1').update(url).digest('hex').slice(0, 8);
  const name = `${page}-${hash}.jpg`;
  const dest = join(OUT, name);
  let status = 'exists';
  try {
    await access(dest);
  } catch {
    const res = await fetch(url);
    if (!res.ok) {
      status = `FAILED ${res.status}`;
    } else {
      await writeFile(dest, Buffer.from(await res.arrayBuffer()));
      status = 'downloaded';
    }
  }
  mapping.push({ url, file: `src/assets/images/${name}`, sources: [...sources].join(','), status });
}

for (const m of mapping) console.log(`${m.status}\t${m.file}\t[${m.sources}]\n\t${m.url}`);
await writeFile(join(ROOT, 'scripts', 'image-map.json'), JSON.stringify(mapping, null, 2) + '\n');
console.log(`\n${mapping.length} unique images. Map written to scripts/image-map.json`);
