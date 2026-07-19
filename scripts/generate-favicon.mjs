import sharp from 'sharp';
import { stat } from 'fs/promises';

async function generateTransparentFavicon() {
    const inputPath = 'public/assets/logo.png';
    const tempPngPath = 'public/assets/favicon_temp.png';
    const outWebpPath = 'public/assets/favicon.webp';
    const outPngPath = 'public/assets/favicon.png';

    // Check input image size
    const metadata = await sharp(inputPath).metadata();
    const w = metadata.width;
    const h = metadata.height;

    // 1. Crop 4 pixels from each side of the 326x254 image to remove borders
    const cropBorder = 4;
    const cropped = await sharp(inputPath)
        .extract({
            left: cropBorder,
            top: cropBorder,
            width: w - (cropBorder * 2),
            height: h - (cropBorder * 2)
        })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

    const cw = cropped.info.width;
    const ch = cropped.info.height;
    const data = cropped.data;

    // 2. Set all white/near-white pixels to transparent (alpha = 0)
    const threshold = 215;
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (r > threshold && g > threshold && b > threshold) {
            data[i + 3] = 0; // alpha = 0
        }
    }

    // 3. Save as transparent PNG
    await sharp(data, {
        raw: {
            width: cw,
            height: ch,
            channels: 4
        }
    })
        .png()
        .toFile(tempPngPath);

    // 4. Downscale and optimize to transparent favicon.webp (e.g. 64x64 or 48x48 is best for favicon)
    // Let's also crop/pad to a square so it won't stretch!
    // To make it square: we can use sharp's .resize() with fit: 'contain' and background: { r: 0, g: 0, b: 0, alpha: 0 }
    await sharp(tempPngPath)
        .resize(64, 64, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .webp({ quality: 90 })
        .toFile(outWebpPath);

    // Downscale and save as transparent favicon.png
    await sharp(tempPngPath)
        .resize(64, 64, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(outPngPath);

    // Also extract just the logo symbol (no text) to see if we want to save it
    // In the 326x254 logo, the symbol is the top part.
    // The bottom part is the "MEDYZIN" text.
    // Let's check sizes and report
    const webpSize = (await stat(outWebpPath)).size;
    const pngSize = (await stat(outPngPath)).size;
    console.log(`Generated favicon.webp (${webpSize} bytes)`);
    console.log(`Generated favicon.png (${pngSize} bytes)`);
}

generateTransparentFavicon().catch(console.error);
