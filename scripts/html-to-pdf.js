const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const BOOKS_DIR = path.join(ROOT_DIR, 'books');
const GLOBAL_BOOK_DIR = path.join(ROOT_DIR, 'book');

// Browser discovery
function findBrowserExecutable() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];

  for (const p of candidates) {
    if (p && fs.existsSync(p)) {
      return p;
    }
  }
  return null;
}

function parseCliOptions() {
  const args = process.argv.slice(2);
  let targetBook = null;
  const options = {
    pageSize: 'A4',
    borderStyle: 'classic',
    margin: '18mm',
    includeHeaderFooter: true
  };

  args.forEach(arg => {
    if (arg.startsWith('--book=')) {
      targetBook = arg.split('=')[1];
    } else if (arg.startsWith('--size=')) {
      options.pageSize = arg.split('=')[1];
    } else if (arg.startsWith('--border=')) {
      options.borderStyle = arg.split('=')[1];
    } else if (arg.startsWith('--margin=')) {
      options.margin = arg.split('=')[1];
    } else if (arg === '--no-header') {
      options.includeHeaderFooter = false;
    } else if (!arg.startsWith('--') && !targetBook) {
      targetBook = arg;
    }
  });

  return { targetBook, options };
}

function renderBookPDF(bookDir, browser, options) {
  const bookSlug = path.basename(bookDir);
  const configPath = path.join(bookDir, 'book.config.json');

  if (!fs.existsSync(configPath)) {
    console.warn(`[Skip] No book.config.json found in ${bookDir}`);
    return false;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const sourceHtml = path.join(bookDir, 'index.html');
  const distDir = path.join(bookDir, 'dist');
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

  const targetDistPdf = path.join(distDir, `${bookSlug}.pdf`);
  const targetRootBookPdf = path.join(bookDir, `${bookSlug}.pdf`);
  const globalPdf = path.join(GLOBAL_BOOK_DIR, `${bookSlug}.pdf`);

  // Ensure source HTML is compiled
  if (!fs.existsSync(sourceHtml)) {
    console.log(`[!] Source HTML missing for ${bookSlug}. Running build...`);
    execSync(`node scripts/build.js --book=${bookSlug}`, { cwd: ROOT_DIR, stdio: 'inherit' });
  }

  console.log(`\n---------------------------------------------------------------`);
  console.log(` 🖨️  Rendering PDF: "${config.title}"`);
  console.log(` 📁 Book Folder:    books/${bookSlug}`);
  console.log(` 📄 Source HTML:    ${sourceHtml}`);
  console.log(` 🎯 Target PDF:     ${targetRootBookPdf}`);
  console.log(`---------------------------------------------------------------`);

  const fileUri = 'file:///' + sourceHtml.replace(/\\/g, '/');
  const cmd = `"${browser}" --headless=new --disable-gpu --no-pdf-header-footer --run-all-compositor-stages-before-draw --print-to-pdf="${targetRootBookPdf}" "${fileUri}"`;

  console.log('⏳ Generating layout, typography, covers, and page breaks...');
  try {
    execSync(cmd, { stdio: 'pipe' });

    if (fs.existsSync(targetRootBookPdf)) {
      // Copy to dist and global book/
      fs.copyFileSync(targetRootBookPdf, targetDistPdf);
      if (!fs.existsSync(GLOBAL_BOOK_DIR)) fs.mkdirSync(GLOBAL_BOOK_DIR, { recursive: true });
      fs.copyFileSync(targetRootBookPdf, globalPdf);

      const stats = fs.statSync(targetRootBookPdf);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`\n🎉 PDF Book Created Successfully!`);
      console.log(`📍 Output PDF:   books/${bookSlug}/${bookSlug}.pdf`);
      console.log(`📍 Dist Copy:    books/${bookSlug}/dist/${bookSlug}.pdf`);
      console.log(`📍 Global Copy:  book/${bookSlug}.pdf`);
      console.log(`📦 File Size:    ${sizeMB} MB (${stats.size.toLocaleString()} bytes)`);
      return true;
    } else {
      console.error(`❌ Error: PDF output file was not generated for ${bookSlug}`);
      return false;
    }
  } catch (err) {
    console.error(`❌ Error during PDF compilation: ${err.message}`);
    return false;
  }
}

function main() {
  console.log('===============================================================');
  console.log(' 📖 HTML-TO-PDF BOOK MAKER TOOL (JARVIS PRESS)');
  console.log('===============================================================');

  const browser = findBrowserExecutable();
  if (!browser) {
    console.error('❌ Error: Could not find Google Chrome or Microsoft Edge on your system.');
    console.error('Please open book/index.html in your browser and press Ctrl+P to save as PDF.');
    process.exit(1);
  }

  console.log(`[✓] Browser Engine: ${path.basename(browser)} (${browser})\n`);

  const { targetBook, options } = parseCliOptions();

  if (targetBook) {
    const targetDir = path.join(BOOKS_DIR, targetBook);
    if (!fs.existsSync(targetDir)) {
      console.error(`❌ Error: Book directory not found at ${targetDir}`);
      console.log(`Available books:`);
      fs.readdirSync(BOOKS_DIR).forEach(b => console.log(` - ${b}`));
      process.exit(1);
    }
    renderBookPDF(targetDir, browser, options);
  } else {
    // Render all books
    const bookFolders = fs.readdirSync(BOOKS_DIR).filter(item => {
      const p = path.join(BOOKS_DIR, item);
      return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'book.config.json'));
    });

    if (bookFolders.length === 0) {
      console.log('No books found in books/ directory.');
      return;
    }

    console.log(`Discovered ${bookFolders.length} book(s) to render into PDF:`);
    bookFolders.forEach(b => console.log(` • ${b}`));

    let successCount = 0;
    bookFolders.forEach(folder => {
      const ok = renderBookPDF(path.join(BOOKS_DIR, folder), browser, options);
      if (ok) successCount++;
    });

    console.log(`\n===============================================================`);
    console.log(` 🏆 Rendering Complete: ${successCount}/${bookFolders.length} PDF books ready!`);
    console.log(`===============================================================\n`);
  }
}

main();
