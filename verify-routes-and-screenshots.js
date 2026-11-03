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
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function runChrome(url, outPath, width, height, delayMs = 1500) {
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
  console.log('🚀 Starting Next.js server on 0.0.0.0:3000...');
  const server = spawn('node', ['./node_modules/next/dist/bin/next', 'start', '-H', '0.0.0.0', '-p', '3000'], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'inherit',
  });

  // Wait for server to be responsive
  let ready = false;
  for (let i = 0; i < 30; i++) {
    await wait(500);
    try {
      const res = await httpGet('http://localhost:3000/');
      if (res.status === 200) {
        ready = true;
        break;
      }
    } catch {
      // Keep polling
    }
  }

  if (!ready) {
    server.kill();
    throw new Error('Server failed to start within timeout');
  }

  console.log('✅ Next.js server is UP and responding!');

  // Route verification list
  const routes = [
    '/',
    '/start',
    '/universities',
    '/about',
    '/admissions',
    '/requirements',
    '/fees',
    '/student-guide',
    '/contact',
    '/bct-logo.png',
    '/assets/bct_asset_01.jpg',
    '/assets/bct_asset_06.jpg',
    '/assets/bct_asset_10.jpg',
    '/assets/bct_asset_84.jpg',
  ];

  console.log('\n🔍 Verifying all application routes & assets:');
  const results = [];
  for (const r of routes) {
    try {
      const res = await httpGet(`http://localhost:3000${r}`);
      console.log(`  [${res.status}] http://localhost:3000${r} (${res.body.length} bytes)`);
      results.push({ route: r, status: res.status, ok: res.status === 200 });
    } catch (err) {
      console.error(`  [FAIL] http://localhost:3000${r}:`, err.message);
      results.push({ route: r, status: 0, ok: false, error: err.message });
    }
  }

  // Also verify LAN IP route if reachable locally
  try {
    const lanRes = await httpGet('http://192.168.1.2:3000/');
    console.log(`  [${lanRes.status}] http://192.168.1.2:3000/ (LAN IP reachability confirmed!)`);
  } catch (err) {
    console.log(`  [NOTE] LAN IP direct loopback test: ${err.message} (normal if Windows loopback isolation applies)`);
  }

  // Capture Screenshots
  console.log('\n📸 Capturing high-resolution verification screenshots...');
  const screenshots = [
    {
      name: 'intro-screen-desktop.png',
      url: 'http://localhost:3000/',
      width: 1440,
      height: 900,
    },
    {
      name: 'intro-screen-mobile.png',
      url: 'http://localhost:3000/',
      width: 512,
      height: 915,
    },
    {
      name: 'homepage-desktop.png',
      url: 'http://localhost:3000/?skipIntro=true',
      width: 1440,
      height: 1080,
    },
    {
      name: 'homepage-mobile.png',
      url: 'http://localhost:3000/?skipIntro=true',
      width: 512,
      height: 1080,
    },
    {
      name: 'universities-desktop.png',
      url: 'http://localhost:3000/universities',
      width: 1440,
      height: 900,
    },
    {
      name: 'start-interactive-desktop.png',
      url: 'http://localhost:3000/start',
      width: 1440,
      height: 900,
    },
  ];

  for (const s of screenshots) {
    const dest = path.join(artifactDir, s.name);
    try {
      await runChrome(s.url, dest, s.width, s.height, 2000);
      console.log(`  ✅ Captured: ${s.name} (${s.width}x${s.height})`);
    } catch (e) {
      console.error(`  ❌ Failed screenshot ${s.name}:`, e.message);
    }
  }

  server.kill('SIGINT');
  console.log('\n🏁 Verification and screenshot capture complete!');
}

main().catch((err) => {
  console.error('Fatal in test script:', err);
  process.exit(1);
});
