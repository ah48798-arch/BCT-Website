const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const pdfPath = path.resolve('كتيب التقديم.pdf');
const buf = fs.readFileSync(pdfPath);
const start = buf.indexOf(Buffer.from([0xff, 0xd8, 0xff]));
let end = start + 3;
while (end < buf.length - 1) {
  if (buf[end] === 0xff && buf[end + 1] === 0xd9) {
    end += 2;
    break;
  }
  end++;
}
const rawBuf = buf.subarray(start, end);

async function runTests() {
  const baseSrgb = await sharp(rawBuf).toColourspace('srgb').negate({ alpha: false }).toBuffer();

  // Test 1: S-Curve contrast + rich warm skin tones
  await sharp(baseSrgb)
    .gamma(1.35)
    .modulate({ brightness: 0.90, saturation: 1.32 })
    .linear([1.18, 1.08, 0.98], [-15, -18, -15])
    .sharpen({ sigma: 1.0 })
    .jpeg({ quality: 95 })
    .toFile('test_hero_opt1.jpg');

  // Test 2: Deeper contrast + balanced warm tones
  await sharp(baseSrgb)
    .gamma(1.45)
    .modulate({ brightness: 0.88, saturation: 1.40 })
    .linear([1.22, 1.10, 0.96], [-20, -22, -18])
    .sharpen({ sigma: 1.2 })
    .jpeg({ quality: 95 })
    .toFile('test_hero_opt2.jpg');

  // Test 3: Natural photographic grade
  await sharp(baseSrgb)
    .gamma(1.55)
    .modulate({ brightness: 0.85, saturation: 1.45 })
    .linear([1.25, 1.12, 0.94], [-22, -24, -20])
    .sharpen({ sigma: 1.2 })
    .jpeg({ quality: 95 })
    .toFile('test_hero_opt3.jpg');

  console.log('Generated test_hero_opt1, opt2, opt3');
}

runTests().catch(console.error);
