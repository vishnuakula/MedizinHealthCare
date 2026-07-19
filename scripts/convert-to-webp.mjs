/**
 * Convert all PNG images in public/assets to WebP format.
 * Usage: node scripts/convert-to-webp.mjs
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const DIRS = [
    join(ROOT, 'public', 'assets'),
    join(ROOT, 'public', 'assets', 'brands'),
];

async function convertDir(dir) {
    let files;
    try {
        files = await readdir(dir);
    } catch {
        console.log(`  Skipping ${dir} (not found)`);
        return;
    }

    for (const file of files) {
        const filePath = join(dir, file);
        const s = await stat(filePath);
        if (s.isDirectory()) continue;
        if (extname(file).toLowerCase() !== '.png') continue;

        const outPath = filePath.replace(/\.png$/i, '.webp');
        const originalSize = s.size;

        try {
            await sharp(filePath)
                .webp({ quality: 80 })
                .toFile(outPath);

            const newStat = await stat(outPath);
            const savings = (((originalSize - newStat.size) / originalSize) * 100).toFixed(1);
            console.log(`  ✅ ${basename(file)} (${(originalSize / 1024).toFixed(0)}KB) → ${basename(outPath)} (${(newStat.size / 1024).toFixed(0)}KB) — ${savings}% smaller`);
        } catch (err) {
            console.error(`  ❌ ${file}: ${err.message}`);
        }
    }
}

console.log('Converting PNGs to WebP...\n');
for (const dir of DIRS) {
    console.log(`Processing: ${dir}`);
    await convertDir(dir);
    console.log('');
}

// Also convert the root favicon
const faviconPath = join(ROOT, 'public', 'favicon.png');
try {
    const s = await stat(faviconPath);
    const outPath = faviconPath.replace('.png', '.webp');
    await sharp(faviconPath).webp({ quality: 80 }).toFile(outPath);
    const newStat = await stat(outPath);
    console.log(`  ✅ favicon.png (${(s.size / 1024).toFixed(0)}KB) → favicon.webp (${(newStat.size / 1024).toFixed(0)}KB)`);
} catch (err) {
    console.log(`  ⚠️ favicon.png: ${err.message}`);
}

console.log('\nDone! 🎉');
