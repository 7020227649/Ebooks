const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const BOOKS_DIR = path.join(ROOT_DIR, 'books');
const GLOBAL_CSS_PATH = path.join(ROOT_DIR, 'styles', 'book.css');
const GLOBAL_BOOK_DIR = path.join(ROOT_DIR, 'book');

function parseMarkdown(md) {
  let html = md;

  // Protect code blocks
  const codeBlocks = [];
  html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    codeBlocks.push(`<pre><code class="language-${lang}">${escapedCode}</code></pre>`);
    return placeholder;
  });

  // Protect inline code
  const inlineCodes = [];
  html = html.replace(/`([^`]+)`/g, (match, code) => {
    const placeholder = `__INLINE_CODE_${inlineCodes.length}__`;
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    inlineCodes.push(`<code>${escaped}</code>`);
    return placeholder;
  });

  // Headers
  html = html.replace(/^######\s+(.*)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.*)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.*)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');

  // Blockquotes and Callouts
  html = html.replace(/^>\s+\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*)$/gm, '<div class="callout callout-$1"><strong>$1:</strong> $2</div>');
  html = html.replace(/^>\s+(.*)$/gm, '<blockquote><p>$1</p></blockquote>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr />');

  // Bold & Italic
  html = html.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Images & Links
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="book-img" />');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Unordered list items and checkboxes
  html = html.replace(/^\s*-\s*\[x\]\s*(.*)$/gm, '<li class="checklist-item checked"><input type="checkbox" checked disabled> $1</li>');
  html = html.replace(/^\s*-\s*\[ \]\s*(.*)$/gm, '<li class="checklist-item"><input type="checkbox" disabled> $1</li>');
  html = html.replace(/^\s*[-*]\s+(.*)$/gm, '<li>$1</li>');

  // Tables parsing (markdown table to HTML)
  html = html.replace(/((\|.+?\|\r?\n)+)/g, (tableText) => {
    const rows = tableText.trim().split(/\r?\n/).filter(r => r.trim().startsWith('|'));
    if (rows.length < 2) return tableText;
    
    let tableHtml = '<table>\n';
    rows.forEach((row, idx) => {
      if (idx === 1 && row.includes('---')) return; // delimiter row
      const cells = row.split('|').slice(1, -1).map(c => c.trim());
      const tag = idx === 0 ? 'th' : 'td';
      tableHtml += '  <tr>' + cells.map(c => `<${tag}>${c}</${tag}>`).join('') + '</tr>\n';
    });
    tableHtml += '</table>';
    return tableHtml;
  });

  // Paragraphs
  const lines = html.split(/\n\n+/);
  html = lines.map(block => {
    block = block.trim();
    if (!block) return '';
    if (block.startsWith('<h') ||
        block.startsWith('<pre') ||
        block.startsWith('<blockquote') ||
        block.startsWith('<div') ||
        block.startsWith('<hr') ||
        block.startsWith('<table') ||
        block.startsWith('<li') ||
        block.startsWith('<img') ||
        block.startsWith('__CODE_BLOCK_')) {
      return block;
    }
    return `<p>${block.replace(/\n/g, '<br />')}</p>`;
  }).join('\n\n');

  // Restore code blocks
  codeBlocks.forEach((code, idx) => {
    html = html.replace(`__CODE_BLOCK_${idx}__`, code);
  });

  // Restore inline codes
  inlineCodes.forEach((code, idx) => {
    html = html.replace(`__INLINE_CODE_${idx}__`, code);
  });

  return html;
}

// Generate dynamic Table of Contents from manuscript files
function generateDynamicTOC(chapters) {
  let tocItems = '';

  chapters.forEach(ch => {
    // Exclude cover and title pages from TOC
    if (ch.isCover || ch.isTitlePage) return;

    tocItems += `      <li class="toc-item"><a href="#${ch.sectionId}">${ch.title}</a> <span class="toc-badge">${ch.badge}</span></li>\n`;
  });

  return `
<section class="book-chapter" id="section-toc">
  <div class="toc-container">
    <div class="toc-title">Table of Contents</div>
    <ul class="toc-list">
${tocItems}    </ul>
  </div>
</section>
`;
}

function extractChapterMetadata(relativePath, content, sectionIndex) {
  const isCover = relativePath.includes('cover');
  const isTitlePage = relativePath.includes('title_page');

  // Extract first h1 or h2 or title
  let title = '';
  const h1Match = content.match(/^#\s+(.*)$/m) || content.match(/<h1[^>]*>(.*?)<\/h1>/);
  if (h1Match) {
    title = h1Match[1].replace(/<[^>]+>/g, '').trim();
  } else {
    const h2Match = content.match(/^##\s+(.*)$/m) || content.match(/<h2[^>]*>(.*?)<\/h2>/);
    if (h2Match) {
      title = h2Match[1].replace(/<[^>]+>/g, '').trim();
    } else {
      title = path.basename(relativePath, path.extname(relativePath)).replace(/_/g, ' ');
    }
  }

  // Determine badge
  let badge = 'Chapter';
  if (relativePath.includes('00_frontmatter')) {
    if (relativePath.includes('preface')) badge = 'Frontmatter';
    else if (relativePath.includes('pledge')) badge = 'Framework';
    else badge = 'Frontmatter';
  } else if (relativePath.includes('01_core')) {
    const chNumMatch = relativePath.match(/chapter_(\d+)/i);
    badge = chNumMatch ? `Chapter ${parseInt(chNumMatch[1], 10)}` : 'Chapter';
  } else if (relativePath.includes('99_backmatter')) {
    if (relativePath.includes('swipe') || relativePath.includes('template')) badge = 'Appendix';
    else if (relativePath.includes('author')) badge = 'Backmatter';
    else badge = 'Backmatter';
  }

  return {
    sectionId: `section-${sectionIndex}`,
    relativePath,
    title,
    badge,
    isCover,
    isTitlePage
  };
}

function buildBook(bookDir) {
  const bookSlug = path.basename(bookDir);
  const configPath = path.join(bookDir, 'book.config.json');

  if (!fs.existsSync(configPath)) {
    console.warn(`[Skip] No book.config.json found in ${bookDir}`);
    return false;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  console.log(`\n---------------------------------------------------------------`);
  console.log(` 📚 Compiling Book: "${config.title}"`);
  console.log(` 📁 Location:       books/${bookSlug}`);
  console.log(`---------------------------------------------------------------`);

  const distDir = path.join(bookDir, 'dist');
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

  const bookAssetsDir = path.join(bookDir, 'assets');
  const distAssetsDir = path.join(distDir, 'assets');

  if (fs.existsSync(bookAssetsDir)) {
    if (!fs.existsSync(distAssetsDir)) fs.mkdirSync(distAssetsDir, { recursive: true });
    fs.readdirSync(bookAssetsDir).forEach(f => {
      fs.copyFileSync(path.join(bookAssetsDir, f), path.join(distAssetsDir, f));
    });
    console.log(` [✓] Synced ${fs.readdirSync(bookAssetsDir).length} assets to dist/assets`);
  }

  // CSS resolution: Book-specific CSS overrides global CSS
  const bookCssPath = path.join(bookDir, 'styles', 'book.css');
  let css = '';
  if (fs.existsSync(bookCssPath)) {
    css = fs.readFileSync(bookCssPath, 'utf8');
  } else if (fs.existsSync(GLOBAL_CSS_PATH)) {
    css = fs.readFileSync(GLOBAL_CSS_PATH, 'utf8');
  }

  // First pass: extract metadata for TOC
  const chapterMetadatas = [];
  config.manuscriptOrder.forEach((relPath, idx) => {
    const fullPath = path.join(bookDir, relPath);
    if (!fs.existsSync(fullPath)) return;
    const raw = fs.readFileSync(fullPath, 'utf8');
    chapterMetadatas.push(extractChapterMetadata(relPath, raw, idx));
  });

  const tocHtml = generateDynamicTOC(chapterMetadatas);

  // Second pass: compile HTML
  let parsedChaptersHtml = '';
  config.manuscriptOrder.forEach((relPath, index) => {
    const fullPath = path.join(bookDir, relPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(` [!] Warning: File missing: ${relPath}`);
      return;
    }

    const rawMarkdown = fs.readFileSync(fullPath, 'utf8');
    const parsedHtml = parseMarkdown(rawMarkdown);
    const isFirst = index === 0;

    parsedChaptersHtml += `\n<section class="book-chapter ${isFirst ? 'first-section' : ''}" id="section-${index}">\n${parsedHtml}\n</section>\n`;
    console.log(` [✓] Loaded ${relPath}`);

    // Insert TOC immediately after title page
    if (relPath.includes('00_title_page.md')) {
      parsedChaptersHtml += tocHtml;
      console.log(` [✓] Injected Dynamic Table of Contents (${chapterMetadatas.filter(c => !c.isCover && !c.isTitlePage).length} items)`);
    }
  });

  const fullHtml = `<!DOCTYPE html>
<html lang="${config.language || 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${config.title} - ${config.subtitle || ''}</title>
  <meta name="author" content="${config.author || ''}">
  <meta name="description" content="${config.targetAudience || ''}">
  <style>
${css}
  </style>
</head>
<body>

  <!-- Floating Reader Toolbar -->
  <div class="reader-toolbar">
    <div class="toolbar-brand">
      <span>📖</span>
      <span>${config.title}</span>
    </div>
    <div class="toolbar-actions">
      <button class="btn-print" onclick="window.print()">
        <span>🖨️</span>
        <span>Save / Print as PDF</span>
      </button>
    </div>
  </div>

  <!-- Main Book Container -->
  <div class="book-container">
${parsedChaptersHtml}
  </div>

</body>
</html>`;

  // Output paths
  const distHtmlPath = path.join(distDir, `${bookSlug}.html`);
  const localIndexHtmlPath = path.join(bookDir, 'index.html');
  const localSlugHtmlPath = path.join(bookDir, `${bookSlug}.html`);

  fs.writeFileSync(distHtmlPath, fullHtml, 'utf8');
  fs.writeFileSync(localIndexHtmlPath, fullHtml, 'utf8');
  fs.writeFileSync(localSlugHtmlPath, fullHtml, 'utf8');

  // Also sync to global root book/ folder for unified access
  if (!fs.existsSync(GLOBAL_BOOK_DIR)) fs.mkdirSync(GLOBAL_BOOK_DIR, { recursive: true });
  fs.writeFileSync(path.join(GLOBAL_BOOK_DIR, `${bookSlug}.html`), fullHtml, 'utf8');

  // Copy book assets to global book/assets if not present
  if (fs.existsSync(bookAssetsDir)) {
    const globalBookAssets = path.join(GLOBAL_BOOK_DIR, 'assets');
    if (!fs.existsSync(globalBookAssets)) fs.mkdirSync(globalBookAssets, { recursive: true });
    fs.readdirSync(bookAssetsDir).forEach(f => {
      fs.copyFileSync(path.join(bookAssetsDir, f), path.join(globalBookAssets, f));
    });
  }

  console.log(`\n🎉 Book Compiled Successfully!`);
  console.log(`📄 Local HTML:  books/${bookSlug}/index.html`);
  console.log(`📄 Dist HTML:   books/${bookSlug}/dist/${bookSlug}.html`);
  return true;
}

function parseTargetBook() {
  const args = process.argv.slice(2);
  let targetBook = null;

  args.forEach(arg => {
    if (arg.startsWith('--book=')) {
      targetBook = arg.split('=')[1];
    } else if (!arg.startsWith('--') && !targetBook) {
      targetBook = arg;
    }
  });

  return targetBook;
}

function main() {
  console.log('===============================================================');
  console.log(' 🚀 EBOOK PUBLISHING ENGINE - MULTI-BOOK BUILD PIPELINE');
  console.log('===============================================================');

  if (!fs.existsSync(BOOKS_DIR)) {
    console.error(`Books directory not found at ${BOOKS_DIR}`);
    process.exit(1);
  }

  const target = parseTargetBook();

  if (target) {
    const targetDir = path.join(BOOKS_DIR, target);
    if (!fs.existsSync(targetDir)) {
      console.error(`❌ Error: Book directory not found at ${targetDir}`);
      console.log(`Available books:`);
      fs.readdirSync(BOOKS_DIR).forEach(b => console.log(` - ${b}`));
      process.exit(1);
    }
    buildBook(targetDir);
  } else {
    // Build all books in books/
    const bookFolders = fs.readdirSync(BOOKS_DIR).filter(item => {
      const p = path.join(BOOKS_DIR, item);
      return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'book.config.json'));
    });

    if (bookFolders.length === 0) {
      console.log('No books found in books/ directory.');
      return;
    }

    console.log(`Discovered ${bookFolders.length} book(s) in books/:`);
    bookFolders.forEach(b => console.log(` • ${b}`));

    bookFolders.forEach(folder => {
      buildBook(path.join(BOOKS_DIR, folder));
    });

    console.log(`\n===============================================================`);
    console.log(` ✅ All ${bookFolders.length} book(s) compiled successfully!`);
    console.log(`===============================================================\n`);
  }
}

main();
