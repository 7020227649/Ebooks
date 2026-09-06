const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const BOOKS_DIR = path.join(ROOT_DIR, 'books');

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0].startsWith('--help') || args[0] === '-h') {
    console.log(`
Usage:
  node scripts/create-book.js "Book Title" [options]

Options:
  --subtitle="Sub Title"       Subtitle for the book
  --author="Author Name"       Author name (default: "Jarvis & The Strategy Lab")
  --slug="custom_slug"         Custom folder name under books/
  --audience="Target Audience" Target audience description
  --keyword="Target Keyword"   Primary SEO / research keyword

Examples:
  node scripts/create-book.js "Next.js 16 Mastery" --subtitle="Full-Stack Production Blueprint"
  node scripts/create-book.js "Zero-Defect DevOps" --keyword="DevOps CI/CD"
`);
    process.exit(0);
  }

  let title = '';
  const options = {
    subtitle: 'The Complete Field Guide & Tactical Implementation Playbook',
    author: 'Jarvis & The Strategy Lab',
    slug: null,
    audience: 'Professionals, developers, and practitioners seeking mastery.',
    keyword: ''
  };

  args.forEach(arg => {
    if (arg.startsWith('--subtitle=')) options.subtitle = arg.split('=').slice(1).join('=');
    else if (arg.startsWith('--author=')) options.author = arg.split('=').slice(1).join('=');
    else if (arg.startsWith('--slug=')) options.slug = arg.split('=').slice(1).join('=');
    else if (arg.startsWith('--audience=')) options.audience = arg.split('=').slice(1).join('=');
    else if (arg.startsWith('--keyword=')) options.keyword = arg.split('=').slice(1).join('=');
    else if (!arg.startsWith('--') && !title) title = arg;
  });

  if (!title) {
    console.error('❌ Error: Book title is required.');
    process.exit(1);
  }

  if (!options.slug) {
    options.slug = title.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
  }

  if (!options.keyword) {
    options.keyword = title;
  }

  return { title, ...options };
}

function createBook() {
  console.log('===============================================================');
  console.log(' 📚 NEW BOOK GENERATOR (JARVIS FACTORY)');
  console.log('===============================================================\n');

  const meta = parseArgs();
  const bookDir = path.join(BOOKS_DIR, meta.slug);

  if (fs.existsSync(bookDir)) {
    console.error(`❌ Error: A book folder already exists at: books/${meta.slug}`);
    console.error(`Please choose a different title or slug.`);
    process.exit(1);
  }

  console.log(`[+] Initializing new book repository:`);
  console.log(` • Title:    "${meta.title}"`);
  console.log(` • Subtitle: "${meta.subtitle}"`);
  console.log(` • Author:   "${meta.author}"`);
  console.log(` • Folder:   books/${meta.slug}\n`);

  // Directory layout
  const dirs = [
    bookDir,
    path.join(bookDir, 'manuscript', '00_frontmatter'),
    path.join(bookDir, 'manuscript', '01_core'),
    path.join(bookDir, 'manuscript', '99_backmatter'),
    path.join(bookDir, 'research'),
    path.join(bookDir, 'outline'),
    path.join(bookDir, 'assets'),
    path.join(bookDir, 'dist')
  ];

  dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

  // 1. Front Cover markdown
  fs.writeFileSync(
    path.join(bookDir, 'manuscript', '00_frontmatter', '00_cover.md'),
    `<div class="book-cover-wrapper">\n  <img src="assets/front_cover.jpg" alt="${meta.title} - Front Cover" class="book-cover-img" />\n</div>\n`,
    'utf8'
  );

  // 2. Title Page markdown
  fs.writeFileSync(
    path.join(bookDir, 'manuscript', '00_frontmatter', '00_title_page.md'),
    `<div class="title-page">\n  <h1 class="book-title">${meta.title}</h1>\n  <h2 class="book-subtitle">${meta.subtitle}</h2>\n  <div class="book-author">${meta.author}</div>\n  <div class="book-meta">First Edition &bull; Production Field Playbook</div>\n</div>\n`,
    'utf8'
  );

  // 3. Preface markdown
  fs.writeFileSync(
    path.join(bookDir, 'manuscript', '00_frontmatter', '01_preface.md'),
    `# Preface: The Mission

Welcome to **${meta.title}**.

In this guide, we dive straight into practical execution without fluff or generic filler. 
Designed specifically for: ${meta.audience}.
`,
    'utf8'
  );

  // 4. Value Pledge markdown
  fs.writeFileSync(
    path.join(bookDir, 'manuscript', '00_frontmatter', '02_the_100_percent_value_pledge.md'),
    `# The 100% Value Pledge & Reading Roadmap

Every page of this publication is engineered to deliver immediate, actionable value.

- [x] Tested, battle-proven architectures
- [x] Zero filler or recycled theory
- [x] Direct checklists and production templates
`,
    'utf8'
  );

  // 5. Core Chapter 1 markdown
  fs.writeFileSync(
    path.join(bookDir, 'manuscript', '01_core', 'chapter_01_core_architecture.md'),
    `# Chapter 1: Foundations & Core Architecture

## The High-Performance Paradigm

Every great system begins with rock-solid architectural fundamentals. In this chapter, we lay down the cornerstone principles that govern ${meta.keyword}.

> [!NOTE]
> Ensure all prerequisites are met before moving into automated pipeline deployment.

### Key Tactical Objectives:
- [ ] Understand the primary system bottlenecks
- [ ] Implement baseline telemetry and logging
- [ ] Configure the execution framework
`,
    'utf8'
  );

  // 6. Backmatter Swipe File
  fs.writeFileSync(
    path.join(bookDir, 'manuscript', '99_backmatter', '01_production_templates.md'),
    `# Appendix: Production Checklists & Swipe File

## 1. Pre-Deployment Diagnostic Checklist
- [ ] Verify core configuration variables
- [ ] Audit security permissions and certificates
- [ ] Ensure end-to-end automated test suites pass
`,
    'utf8'
  );

  // 7. About the Author
  fs.writeFileSync(
    path.join(bookDir, 'manuscript', '99_backmatter', '02_about_the_author.md'),
    `# About the Author

**${meta.author}** is an autonomous collective of engineers, researchers, and technical architects dedicated to producing zero-defect technical publications and battle-tested industry blue-prints.
`,
    'utf8'
  );

  // 8. Back Cover markdown
  fs.writeFileSync(
    path.join(bookDir, 'manuscript', '99_backmatter', '99_back_cover.md'),
    `<div class="book-cover-wrapper">\n  <img src="assets/back_cover.jpg" alt="${meta.title} - Back Cover" class="book-cover-img" />\n</div>\n`,
    'utf8'
  );

  // 9. Master Outline starter
  fs.writeFileSync(
    path.join(bookDir, 'outline', 'master_outline.md'),
    `# Master Outline: ${meta.title}

## Target Keyword: ${meta.keyword}
## Target Audience: ${meta.audience}

### Frontmatter
- Cover & Title Page
- Preface & Context
- 100% Value Pledge

### Core Chapters
- Chapter 1: Foundations & Core Architecture
- Chapter 2: Implementation Protocols
- Chapter 3: Advanced Optimization & Scaling

### Backmatter
- Production Swipe File & Templates
- About Author & Strategy Lab
- Back Cover
`,
    'utf8'
  );

  // 10. book.config.json
  const config = {
    title: meta.title,
    subtitle: meta.subtitle,
    author: meta.author,
    version: "1.0.0",
    targetKeyword: meta.keyword,
    targetAudience: meta.audience,
    language: "en",
    manuscriptOrder: [
      "manuscript/00_frontmatter/00_cover.md",
      "manuscript/00_frontmatter/00_title_page.md",
      "manuscript/00_frontmatter/01_preface.md",
      "manuscript/00_frontmatter/02_the_100_percent_value_pledge.md",
      "manuscript/01_core/chapter_01_core_architecture.md",
      "manuscript/99_backmatter/01_production_templates.md",
      "manuscript/99_backmatter/02_about_the_author.md",
      "manuscript/99_backmatter/99_back_cover.md"
    ]
  };

  fs.writeFileSync(
    path.join(bookDir, 'book.config.json'),
    JSON.stringify(config, null, 2),
    'utf8'
  );

  console.log(`\n🎉 Book Scaffolding Completed Successfully!`);
  console.log(`📁 Project Folder:  books/${meta.slug}/`);
  console.log(`⚙️  Config File:     books/${meta.slug}/book.config.json`);
  console.log(`\nNext Steps:`);
  console.log(` 1. Add your chapters in books/${meta.slug}/manuscript/01_core/`);
  console.log(` 2. Place front_cover.jpg and back_cover.jpg in books/${meta.slug}/assets/`);
  console.log(` 3. Build HTML:     npm.cmd run build -- --book=${meta.slug}`);
  console.log(` 4. Render PDF:     npm.cmd run make:pdf -- --book=${meta.slug}\n`);
}

createBook();
