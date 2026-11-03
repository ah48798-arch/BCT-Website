const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

let pdfPath = path.resolve(__dirname, '../../كتيب التقديم.pdf');
if (!fs.existsSync(pdfPath)) pdfPath = path.resolve(__dirname, '../كتيب التقديم.pdf');
if (!fs.existsSync(pdfPath)) pdfPath = path.resolve('كتيب التقديم.pdf');

const outDir = path.resolve(__dirname, '../public/assets');

async function recalibrate() {
  console.log('🔄 Recalibrating assets with photographic contrast and natural skin tones...');
  const buf = fs.readFileSync(pdfPath);

  let pos = 0;
  let count = 0;

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
            // High-precision photographic grade:
            // 1. Convert inverted Adobe CMYK polarity to standard sRGB
            // 2. Apply contrast curve (gamma 1.35, linear contrast, rich saturation)
            // 3. Subtle edge enhancement
            const baseSrgb = await sharp(rawBuf)
              .toColourspace('srgb')
              .negate({ alpha: false })
              .toBuffer();

            await sharp(baseSrgb)
              .gamma(1.3)
              .linear([1.16, 1.10, 1.02], [-14, -16, -12])
              .modulate({
                brightness: 0.92,
                saturation: 1.28,
              })
              .sharpen({ sigma: 1.1, m1: 1.0, m2: 2.0 })
              .jpeg({ quality: 96, chromaSubsampling: '4:4:4' })
              .toFile(outPath);

            console.log(`  ✨ Color-calibrated CMYK asset: ${filename}`);
          } else {
            // sRGB asset: write directly with high quality
            await sharp(rawBuf)
              .jpeg({ quality: 96 })
              .toFile(outPath);
          }
        } catch (err) {
          console.warn(`Warning on ${filename}:`, err.message);
        }
      }
      pos = end;
    } else {
      pos++;
    }
  }

  console.log('✅ All assets recalibrated with rich contrast and natural color fidelity!');
}

recalibrate().catch(console.error);
