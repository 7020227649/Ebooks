const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT_DIR = path.resolve(__dirname, '..');
const BOOKS_DIR = path.join(ROOT_DIR, 'books');

const args = process.argv.slice(2);
let targetBook = null;

args.forEach(arg => {
  if (arg.startsWith('--book=')) targetBook = arg.split('=')[1];
  else if (!arg.startsWith('--') && !targetBook) targetBook = arg;
});

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];

  // Serve static assets
  if (urlPath.includes('/assets/')) {
    const parts = urlPath.split('/');
    const bookName = parts[1] === 'books' ? parts[2] : (targetBook || fs.readdirSync(BOOKS_DIR)[0]);
    const assetName = path.basename(urlPath);
    const assetPath = path.join(BOOKS_DIR, bookName, 'assets', assetName);

    if (fs.existsSync(assetPath)) {
      const ext = path.extname(assetPath).toLowerCase();
      const contentType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : (ext === '.png' ? 'image/png' : 'application/octet-stream');
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(assetPath).pipe(res);
      return;
    }
  }

  // Dashboard list if no specific book requested and at root
  if (urlPath === '/' && !targetBook) {
    const books = fs.readdirSync(BOOKS_DIR).filter(item => {
      const p = path.join(BOOKS_DIR, item);
      return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'book.config.json'));
    });

    let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>eBook Studio Preview Portal</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; margin: 0; }
    h1 { color: #60a5fa; margin-bottom: 8px; }
    p { color: #94a3b8; font-size: 1.1rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px; margin-top: 30px; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 24px; transition: transform 0.2s, border-color 0.2s; }
    .card:hover { transform: translateY(-3px); border-color: #3b82f6; }
    .card h2 { font-size: 1.3rem; margin-top: 0; color: #ffffff; }
    .card p { font-size: 0.95rem; line-height: 1.5; color: #cbd5e1; }
    .actions { display: flex; gap: 12px; margin-top: 18px; }
    a.btn { background: #2563eb; color: #fff; padding: 10px 18px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem; }
    a.btn:hover { background: #1d4ed8; }
  </style>
</head>
<body>
  <h1>📚 eBook Studio Preview Portal</h1>
  <p>Select a book below to open the interactive reading and print environment:</p>
  <div class="grid">`;

    books.forEach(b => {
      const conf = JSON.parse(fs.readFileSync(path.join(BOOKS_DIR, b, 'book.config.json'), 'utf8'));
      html += `
    <div class="card">
      <h2>${conf.title}</h2>
      <p><strong>Subtitle:</strong> ${conf.subtitle || 'N/A'}</p>
      <p><strong>Author:</strong> ${conf.author || 'Jarvis'}</p>
      <div class="actions">
        <a class="btn" href="/books/${b}/">📖 Read Book</a>
      </div>
    </div>`;
    });

    html += `
  </div>
</body>
</html>`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }

  // Handle specific book route e.g. /books/:slug/ or root if targetBook set
  const slug = targetBook || (urlPath.startsWith('/books/') ? urlPath.split('/')[2] : null);
  if (slug) {
    const bookHtmlPath = path.join(BOOKS_DIR, slug, 'index.html');
    if (fs.existsSync(bookHtmlPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(bookHtmlPath).pipe(res);
      return;
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found. Please run "npm.cmd run build" first.');
});

server.listen(PORT, () => {
  console.log(`\n📖 eBook Studio Preview Server running at: http://localhost:${PORT}`);
  if (targetBook) {
    console.log(`Targeting: books/${targetBook}/`);
  } else {
    console.log(`Browse all books at: http://localhost:${PORT}/`);
  }
  console.log(`Press Ctrl+C to stop.\n`);
});
