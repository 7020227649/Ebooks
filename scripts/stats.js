const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const BOOKS_DIR = path.join(ROOT_DIR, 'books');

function analyzeSingleBook(bookDir, isVerbose = true) {
  const bookSlug = path.basename(bookDir);
  const configPath = path.join(bookDir, 'book.config.json');

  if (!fs.existsSync(configPath)) {
    return null;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  let totalWords = 0;
  let totalCharacters = 0;
  const fileStats = [];

  for (const relativePath of (config.manuscriptOrder || [])) {
    const filePath = path.join(bookDir, relativePath);
    if (!fs.existsSync(filePath)) {
      fileStats.push({ file: path.basename(relativePath), words: 0, status: 'MISSING' });
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const chars = content.length;

    totalWords += words;
    totalCharacters += chars;
    fileStats.push({ file: path.basename(relativePath), words, status: 'OK' });
  }

  const readingTimeMinutes = Math.ceil(totalWords / 200);
  const estimatedPages = Math.ceil(totalWords / 250);

  if (isVerbose) {
    console.log(`\n===============================================================`);
    console.log(` 📊 Manuscript Analytics: "${config.title}"`);
    console.log(` 📁 Folder: books/${bookSlug}`);
    console.log(` 🎯 Target: "${config.targetKeyword || 'N/A'}"`);
    console.log(`===============================================================`);
    console.table(fileStats);
    console.log(`---------------------------------------------------------------`);
    console.log(` Total Words:            ${totalWords.toLocaleString()} words`);
    console.log(` Total Characters:       ${totalCharacters.toLocaleString()} chars`);
    console.log(` Estimated Reading Time: ~${readingTimeMinutes} minutes`);
    console.log(` Estimated Book Pages:   ~${estimatedPages} pages (standard layout)`);
    console.log(` Chapters & Sections:    ${fileStats.length}`);
    console.log(`---------------------------------------------------------------\n`);
  }

  return {
    slug: bookSlug,
    title: config.title,
    words: totalWords,
    chapters: fileStats.length,
    pages: estimatedPages,
    readingTime: `${readingTimeMinutes} min`
  };
}

function parseCli() {
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
  const target = parseCli();

  if (target) {
    const targetDir = path.join(BOOKS_DIR, target);
    if (!fs.existsSync(targetDir)) {
      console.error(`❌ Error: Book directory not found at ${targetDir}`);
      process.exit(1);
    }
    analyzeSingleBook(targetDir, true);
  } else {
    // Scan all books in books/
    const bookFolders = fs.readdirSync(BOOKS_DIR).filter(item => {
      const p = path.join(BOOKS_DIR, item);
      return fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'book.config.json'));
    });

    if (bookFolders.length === 0) {
      console.log('No books found in books/ directory.');
      return;
    }

    console.log(`\n===============================================================`);
    console.log(` 📚 STUDIO-WIDE EBOOK PORTFOLIO OVERVIEW`);
    console.log(`===============================================================`);

    const summaryData = [];
    bookFolders.forEach(folder => {
      const stats = analyzeSingleBook(path.join(BOOKS_DIR, folder), false);
      if (stats) {
        summaryData.push({
          'Book Slug': stats.slug,
          'Total Words': stats.words.toLocaleString(),
          'Sections': stats.chapters,
          'Est. Pages': stats.pages,
          'Est. Read Time': stats.readingTime
        });
      }
    });

    console.table(summaryData);

    // Also print detailed stats for each
    bookFolders.forEach(folder => {
      analyzeSingleBook(path.join(BOOKS_DIR, folder), true);
    });
  }
}

main();
