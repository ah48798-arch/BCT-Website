const fs = require('fs');
const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const videoPath = 'C:/Users/AHMED/.gemini/antigravity/brain/2ad0e16b-9f63-404b-ae20-5426396b2498/.user_uploaded/media_1793730882405_45ed61c1.mp4';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const server = http.createServer((req, res) => {
  if (req.url === '/video.mp4') {
    const stat = fs.statSync(videoPath);
    res.writeHead(200, { 'Content-Length': stat.size, 'Content-Type': 'video/mp4' });
    fs.createReadStream(videoPath).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <body style="margin:0; background:#122137; display:flex; align-items:center; justify-content:center;">
        <video id="v" src="/video.mp4" autoplay loop muted playsinline style="width:100vw; height:100vh; object-fit:contain;"></video>
      </body>
      </html>
    `);
  }
});

server.listen(9876, async () => {
  console.log('Server running on 9876');
  for (const time of [800, 2000, 3500]) {
    await new Promise((resolve) => {
      const p = spawn(chromePath, [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--window-size=1280,720',
        `--virtual-time-budget=${time}`,
        `--screenshot=C:/Users/AHMED/.gemini/antigravity/brain/2ad0e16b-9f63-404b-ae20-5426396b2498/video_frame_${time}.png`,
        'http://localhost:9876/',
      ]);
      p.on('close', resolve);
    });
    console.log('Captured frame at', time);
  }
  server.close();
  console.log('Done');
});
