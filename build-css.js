const path = require('path');
const fs = require('fs');

const baseDir = path.resolve(__dirname, '..');
const { compile } = require(path.join(baseDir, 'node_modules/@tailwindcss/node/dist/index.js'));

async function buildCss() {
  console.log('⚡ Generating Tailwind CSS bundle...');
  const globalsPath = path.join(baseDir, 'src/app/globals.css');
  const cssInput = fs.readFileSync(globalsPath, 'utf-8');

  // Strip @import "tailwindcss"; so compiler doesn't recurse if present
  const compiler = await compile('@import "tailwindcss";', {
    base: baseDir,
    onDependency: () => {}
  });

  const candidates = new Set();

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '.next') {
          scanDir(fullPath);
        }
      } else if (/\.(tsx|ts|js|jsx|html|css)$/.test(entry.name)) {
        const text = fs.readFileSync(fullPath, 'utf-8');
        // Extract all possible class candidates
        const tokens = text.match(/[a-zA-Z0-9_\-\/\[\]#:.%]+/g) || [];
        for (const t of tokens) {
          candidates.add(t);
        }
      }
    }
  }

  scanDir(path.join(baseDir, 'src'));
  console.log(`🔍 Scanned src directory: found ${candidates.size} candidate tokens`);

  const builtCss = compiler.build(Array.from(candidates));
  const outputPath = path.join(baseDir, 'src/app/tailwind-built.css');
  fs.writeFileSync(outputPath, builtCss, 'utf-8');
  console.log(`✅ Tailwind CSS successfully compiled to ${outputPath} (${Math.round(builtCss.length / 1024)} KB)`);
}

buildCss().catch(err => {
  console.error('❌ Failed to compile Tailwind CSS:', err);
  process.exit(1);
});
