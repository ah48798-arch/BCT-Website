const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Find PDF in current or parent dir
let pdfPath = path.resolve(__dirname, '../../كتيب التقديم.pdf');
if (!fs.existsSync(pdfPath)) {
  pdfPath = path.resolve(__dirname, '../كتيب التقديم.pdf');
}
if (!fs.existsSync(pdfPath)) {
  pdfPath = path.resolve('كتيب التقديم.pdf');
}

const outDir = path.resolve(__dirname, '../public/assets');

async function extractAndRegenerate() {
  console.log('📖 Reading PDF source:', pdfPath);
  const buf = fs.readFileSync(pdfPath);

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  let pos = 0;
  let count = 0;
  let convertedCmyk = 0;
  let preservedSrgb = 0;

  while (pos < buf.length - 3) {
    if (buf[pos] === 0xff && buf[pos + 1] === 0xd8 && buf[pos + 2] === 0xff) {
      const start = pos;
      let end = start + 3;
      while (end < buf.length - 1) {
        if (buf[end] === 0xff && buf[end + 1] === 0xd9) {
          end += 2;
          break;
        }
        end++;
      }

      const imgLen = end - start;
      if (imgLen > 5000) {
        count++;
        const rawBuf = buf.subarray(start, end);
        const filename = `bct_asset_${String(count).padStart(2, '0')}.jpg`;
        const outPath = path.join(outDir, filename);

        try {
          const meta = await sharp(rawBuf).metadata();
          if (meta.space === 'cmyk' || meta.channels === 4) {
            // Adobe CMYK JPEG in PDF has inverted ink polarity
            // Converting to sRGB and negating restores authentic skin tones and true brand colors
            await sharp(rawBuf)
              .toColourspace('srgb')
              .negate({ alpha: false })
              .jpeg({ quality: 95 })
              .toFile(outPath);
            convertedCmyk++;
          } else {
            // Native sRGB asset: write directly
            await sharp(rawBuf)
              .jpeg({ quality: 95 })
              .toFile(outPath);
            preservedSrgb++;
          }
        } catch (err) {
          console.warn(`Warning on ${filename}:`, err.message);
          fs.writeFileSync(outPath, rawBuf);
        }
      }
      pos = end;
    } else {
      pos++;
    }
  }

  console.log(`✅ Regeneration complete:`);
  console.log(`   - Total assets extracted: ${count}`);
  console.log(`   - CMYK assets color-corrected to natural sRGB: ${convertedCmyk}`);
  console.log(`   - sRGB assets preserved: ${preservedSrgb}`);
  console.log(`   - Output directory: ${outDir}`);
}

extractAndRegenerate().catch((err) => {
  console.error('Fatal error during asset regeneration:', err);
  process.exit(1);
});
