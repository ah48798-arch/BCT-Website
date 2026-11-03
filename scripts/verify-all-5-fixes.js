const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

const artifactDir = path.resolve('C:/Users/AHMED/.gemini/antigravity/brain/2ad0e16b-9f63-404b-ae20-5426396b2498');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function runChrome(url, outPath, width, height, delayMs = 1800) {
  return new Promise((resolve, reject) => {
    const args = [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      `--window-size=${width},${height}`,
      `--virtual-time-budget=${delayMs}`,
      `--screenshot=${outPath}`,
      url,
    ];
    const proc = spawn(chromePath, args);
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Chrome failed with code ${code}`));
    });
    proc.on('error', reject);
  });
}

async function main() {
  console.log('🚀 Starting Next.js production server on 0.0.0.0:3000...');
  const server = spawn('node', ['./node_modules/next/dist/bin/next', 'start', '-H', '0.0.0.0', '-p', '3000'], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit',
  });

  // Wait for server to respond
  let ready = false;
  for (let i = 0; i < 30; i++) {
    await wait(400);
    try {
      const res = await httpGet('http://localhost:3000/');
      if (res.status === 200) {
        ready = true;
        break;
      }
    } catch {
      // Continue polling
    }
  }

  if (!ready) {
    server.kill();
    throw new Error('Server did not respond within timeout');
  }

  console.log('✅ Server is ready. Capturing verification screenshots for all 5 fixes...');

  const screenshots = [
    {
      name: 'screenshot-homepage.png',
      url: 'http://localhost:3000/?skipIntro=true',
      width: 1440,
      height: 950,
      delay: 2000,
    },
    {
      name: 'screenshot-floating-assistant.png',
      url: 'http://localhost:3000/?skipIntro=true',
      width: 1024,
      height: 700,
      delay: 2000,
    },
    {
      name: 'screenshot-subpage-universities.png',
      url: 'http://localhost:3000/universities',
      width: 1440,
      height: 950,
      delay: 1800,
    },
    {
      name: 'screenshot-journey-options.png',
      url: 'http://localhost:3000/start?step=2',
      width: 1440,
      height: 950,
      delay: 2000,
    },
    {
      name: 'screenshot-homepage-mobile.png',
      url: 'http://localhost:3000/?skipIntro=true',
      width: 512,
      height: 1000,
      delay: 2000,
    },
  ];

  for (const s of screenshots) {
    const dest = path.join(artifactDir, s.name);
    try {
      await runChrome(s.url, dest, s.width, s.height, s.delay);
      console.log(`  📸 Saved: ${s.name} (${s.width}x${s.height})`);
    } catch (err) {
      console.error(`  ❌ Failed: ${s.name}:`, err.message);
    }
  }

  server.kill('SIGINT');
  console.log('🏁 Screenshot capture complete!');
}

main().catch((err) => {
  console.error('Fatal in test script:', err);
  process.exit(1);
});
