const fs = require('fs');
const path = require('path');

const pages = [
  'about',
  'admissions',
  'contact',
  'fees',
  'requirements',
  'services',
  'student-guide',
  'universities',
];

for (const p of pages) {
  const file = path.resolve(__dirname, `../src/app/${p}/page.tsx`);
  let content = fs.readFileSync(file, 'utf8');

  // Remove import lines
  content = content.replace(/import\s*\{\s*Navbar\s*\}\s*from\s*["']@\/components\/Navbar["'];\r?\n?/g, '');
  content = content.replace(/import\s*\{\s*Footer\s*\}\s*from\s*["']@\/components\/Footer["'];\r?\n?/g, '');

  // Remove JSX elements
  content = content.replace(/^[ \t]*<Navbar\s*\/>\r?\n?/gm, '');
  content = content.replace(/^[ \t]*<Footer\s*\/>\r?\n?/gm, '');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Cleaned duplicate Navbar/Footer from: ${p}`);
}
