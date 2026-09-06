# 📚 Autonomous Multi-Book Publishing Studio (v2.0)
### Powered by Jarvis & The 8-Specialist AI Agent Army

An industrial-grade digital publishing studio engineered to research, outline, author, typeset, audit, and compile high-value, authority-grade eBooks. 

Every book is maintained in **complete isolation within its own dedicated directory**, featuring automated Table of Contents generation, bespoke front/back covers, and a **Zero-Blank-Page headless Chrome PDF printing engine**.

---

## 🏛️ Multi-Book Repository Architecture

Every publication in this repository lives in a self-contained environment under `books/<book_slug>/`. No book shares or overwrites another book's manuscript, assets, or configurations.

```
Ebooks/
├── books/                                  # 📁 DEDICATED MULTI-BOOK WORKSPACES
│   ├── Google_Adsense_Ready_2026/          # 📗 Book 1: AdSense Approval Playbook
│   │   ├── book.config.json                # Book metadata & chapter ordering
│   │   ├── assets/                         # Front & Back cover artwork
│   │   │   ├── front_cover.jpg
│   │   │   └── back_cover.jpg
│   │   ├── manuscript/                     # Modular Markdown source files
│   │   │   ├── 00_frontmatter/             # Cover, title page, preface, value pledge
│   │   │   ├── 01_core/                    # Chapters 1 to 6
│   │   │   └── 99_backmatter/             # Swipe file, author bio, back cover
│   │   ├── dist/                           # Compiled standalone files
│   │   │   ├── Google_Adsense_Ready_2026.html
│   │   │   └── Google_Adsense_Ready_2026.pdf
│   │   └── index.html                      # Direct reading entry point
│   │
│   ├── Perfect_SEO_2026_October_Edition/   # 📘 Book 2: Senior Developer SEO Blueprint
│   │   ├── book.config.json
│   │   ├── assets/
│   │   │   ├── front_cover.jpg
│   │   │   └── back_cover.jpg
│   │   ├── manuscript/
│   │   │   ├── 00_frontmatter/
│   │   │   ├── 01_core/                    # Chapters 1 to 7
│   │   │   └── 99_backmatter/
│   │   ├── research/                       # Search intent & empirical case studies
│   │   ├── outline/                        # Master syllabus & chapter blueprints
│   │   ├── dist/
│   │   │   ├── Perfect_SEO_2026_October_Edition.html
│   │   │   └── Perfect_SEO_2026_October_Edition.pdf
│   │   └── index.html
│   │
│   └── [future_books...]/                  # Generated via 'npm.cmd run book:new'
│
├── book/                                   # 📦 Unified Global Distribution Portfolio
│   ├── Google_Adsense_Ready_2026.html
│   ├── Google_Adsense_Ready_2026.pdf
│   ├── Perfect_SEO_2026_October_Edition.html
│   └── Perfect_SEO_2026_October_Edition.pdf
│
├── agents/                                 # 🤖 Autonomous AI Agent Army Engine
│   ├── agent_roles.json                    # Specialist agent definitions & directives
│   ├── orchestrator.js                     # Jarvis task engine & quality gatekeeper
│   ├── task_board.json                     # State machine & task dependencies
│   └── audit_report.json                   # Google reviewer 10/10 audit scorecard
│
├── scripts/                                # ⚙️ Studio Tooling & Compilers
│   ├── build.js                            # Multi-book Markdown-to-HTML & dynamic TOC
│   ├── html-to-pdf.js                      # Headless Chrome/Edge zero-blank-page PDF engine
│   ├── create-book.js                      # Scaffolding generator for new books
│   ├── stats.js                            # Studio-wide & per-book analytics dashboard
│   ├── preview.js                          # Local reading server & web portal
│   └── run-army.js                         # AI Agent Army trigger
│
├── styles/                                 # 🎨 Paged Media & Typography Engine
│   └── book.css                            # Print CSS, font stacks, layout grids
│
├── package.json                            # Studio CLI commands
└── README.md                               # Complete studio operating manual
```

---

## 🤖 How Jarvis & The AI Agent Army Work

This repository operates an autonomous publication workflow led by **Jarvis (Commander)** and **8 Specialist Subagents**.

```
                           ┌─────────────────────────────────┐
                           │      🎖️ JARVIS (Commander)      │
                           │  Orchestrator & Quality Arbiter │
                           └────────────────┬────────────────┘
                                            │
        ┌──────────────┬────────────────────┼───────────────────┬──────────────┐
        ▼              ▼                    ▼                   ▼              ▼
 ┌──────────────┐┌──────────────┐   ┌──────────────┐    ┌──────────────┐┌──────────────┐
 │ 📡 RADAR     ││ 🛡️ VANGUARD  │   │ 📐 BLUEPRINT │    │ 🔬 FACTFINDER││ ✍️ WORDSMITH │
 │ Intent Scout ││ Gap Profiler │   │ Outliner     │    │ Case Studies ││ Lead Author  │
 └──────────────┘└──────────────┘   └──────────────┘    └──────────────┘└──────┬───────┘
                                                                               │
                                                                               ▼
 ┌──────────────┐┌──────────────┐                                       ┌──────────────┐
 │ 🖨️ PRESSMAN  ││ ⚖️ SENTINEL  │◄──────────────────────────────────────┤ 🎨 ARTISAN   │
 │ PDF Master   ││ Auditor(10/10│     Iterative Quality Gate           │ Visuals & Art│
 └──────────────┘└──────────────┘     (Must score 90+ to pass)         └──────────────┘
```

### The 8 Specialist Agents & Their Roles

| Agent | Codename | Role & Responsibility | Primary Deliverable |
| :--- | :--- | :--- | :--- |
| **Jarvis** | `Commander` | Super Orchestrator & Task Arbiter | Manages task dependencies, monitors quality scores, coordinates release |
| **Radar** | `Keyword Scout` | Analyzes search volumes, intent clusters, and queries | `research/01_keyword_search_intent.md` |
| **Vanguard** | `Competitive Scout` | Deconstructs competing books/blogs and identifies value gaps | `research/02_competitive_gap_analysis.md` |
| **Blueprint** | `Master Architect`| Designs pedagogical frameworks, chapter flow, and syllabus | `outline/master_outline.md` |
| **FactFinder**| `Evidence Scout` | Collects empirical benchmarks, RFCs, and verified case studies | `research/03_data_and_case_studies.md` |
| **Wordsmith** | `Lead Author` | Drafts senior-grade, actionable prose with code & checklists | `manuscript/01_core/chapter_*.md` |
| **Artisan** | `Visual Designer`| Generates front/back cover art, typography, and diagram styling | `assets/front_cover.jpg`, `assets/back_cover.jpg` |
| **Sentinel** | `Reviewer / Auditor`| Simulates Google Quality Raters; audits accuracy and zero-fluff | `agents/audit_report.json` (Enforces 10/10) |
| **Pressman** | `Publishing Master`| Compiles Markdown to HTML and renders pristine PDFs | `dist/*.html`, `dist/*.pdf` |

### The Production Cycle

1. **Phase 1: Intelligence (Radar + Vanguard)**: Scans search intent and audits existing publications to identify high-value gaps.
2. **Phase 2: Architecture (Blueprint + FactFinder)**: Assembles a master outline and gathers real-world telemetry, production code, and empirical benchmarks.
3. **Phase 3: Authoring (Wordsmith)**: Drafts modular Markdown chapters containing practical frameworks, code blocks, and action checklists.
4. **Phase 4: Cover & Visual Art (Artisan)**: Creates photorealistic front and back covers via AI image generation.
5. **Phase 5: 10/10 Quality Gate (Sentinel)**: Audits every word against Google's Helpful Content standards, Search Quality Evaluator Guidelines, and developer rigor. If any chapter scores below 90/100, it is rejected back to Wordsmith for revision.
6. **Phase 6: Print Compilation (Pressman)**: Headless Chrome compiles the book with full-page covers, dynamic Table of Contents, and zero blank pages.

---

## 🖨️ Zero-Blank-Page Headless PDF Engine

Traditional HTML-to-PDF generators frequently introduce unwanted blank pages between sections due to conflicting `page-break` and `margin-collapse` behaviors. 

Our engine solves this at the architectural level:
- **Single Source of Truth**: Uses CSS3 Paged Media (`break-before: page !important;`) exclusively on `.book-chapter:not(:first-child)`.
- **First Section Immunity**: `.book-chapter:first-of-type` and `.first-section` strictly avoid breaking before, keeping the front cover immediately on Page 1.
- **Heading Orphans Prevention**: Headings enforce `break-after: avoid !important;`, ensuring no section title is ever separated from its body text.
- **Atomic Block Protection**: `pre`, `blockquote`, `.callout`, `table`, and `img` enforce `break-inside: avoid !important;` to prevent awkward splitting mid-element across page cuts.
- **Chromium Print Pipeline**: Uses modern Headless Chrome (`--headless=new --disable-gpu --no-pdf-header-footer --run-all-compositor-stages-before-draw`) to print directly to PDF.

---

## ⚡ Command Reference

> [!NOTE]
> On Windows PowerShell, execution policies require using `npm.cmd` rather than `npm`.

### 1. Create a New Book
Generate a completely isolated book folder with starter configurations, frontmatter, core chapter, backmatter, and assets folder:
```powershell
npm.cmd run book:new -- "My Book Title" --subtitle="My Subtitle" --author="My Name"
```
*Example:*
```powershell
npm.cmd run book:new -- "Kubernetes in Production 2026" --subtitle="Zero-Downtime Infrastructure Playbook"
```

### 2. Build HTML & Dynamic Table of Contents
Compile Markdown chapters into standalone, styled HTML files:
```powershell
# Compile ALL books in the repository:
npm.cmd run build

# Compile a SPECIFIC book:
npm.cmd run build -- --book=Google_Adsense_Ready_2026
npm.cmd run build -- --book=Perfect_SEO_2026_October_Edition
```

### 3. Generate High-Resolution PDF Books
Render publication-quality PDFs via headless Chrome with zero blank pages and embedded covers:
```powershell
# Render PDFs for ALL books:
npm.cmd run make:pdf

# Render PDF for a SPECIFIC book:
npm.cmd run make:pdf -- --book=Google_Adsense_Ready_2026
npm.cmd run make:pdf -- --book=Perfect_SEO_2026_October_Edition
```

### 4. Manuscript Analytics & Word Counts
Inspect reading time, word counts, and page estimations across the studio:
```powershell
# Studio-wide portfolio overview + all books:
npm.cmd run stats

# Detailed analytics for a single book:
node scripts/stats.js --book=Perfect_SEO_2026_October_Edition
```

### 5. Interactive Reading Portal & Web Preview
Start the local preview server with interactive book selection dashboard:
```powershell
npm.cmd run preview
```
Visit `http://localhost:3000` to browse and read any book directly in your browser.

### 6. AI Agent Army Control Center
Inspect task board progress or run autonomous production iterations:
```powershell
# Check current task board and quality scores:
npm.cmd run army:status

# Run an autonomous iteration cycle:
npm.cmd run army:start

# Reset task board for a new production run:
npm.cmd run army:reset
```

---

## 📖 Current Active Publications

### 1. Google Adsense Ready 2026 October Edition
- **Directory**: `books/Google_Adsense_Ready_2026/`
- **Output PDF**: `books/Google_Adsense_Ready_2026/Google_Adsense_Ready_2026.pdf` (2.85 MB)
- **Target Audience**: Digital publishers, niche site builders, bloggers seeking first-time approval without policy strikes.
- **Word Count**: 5,676 words across 13 modular sections.
- **Features**: 14-day step-by-step roadmap, CMP consent architecture, crawl optimization, rejection appeal protocols, legal swipe files, front & back covers.
- **Rating**: 10/10 (Audited against Google AdSense Onboarding Review Pipeline).

### 2. Perfect SEO 2026 October Edition
- **Directory**: `books/Perfect_SEO_2026_October_Edition/`
- **Output PDF**: `books/Perfect_SEO_2026_October_Edition/Perfect_SEO_2026_October_Edition.pdf` (4.09 MB)
- **Target Audience**: Senior web developers, frontend architects, and engineering leads.
- **Word Count**: 18,041 words across 26 modular sections (~73 pages).
- **Features**: The 18-Chapter Definitive Developer Bible: Googlebot V8 rendering pipeline, SSR/SSG/ISR crawl hygiene, sub-100ms INP engineering, Semantic HTML5 DOM optimization, Meta tag pixel-width engineering, Dynamic Edge OG image generation, Vector/BM25 keyword intent architecture, Unified JSON-LD `@graph` Schema playbook, Off-page link equity infrastructure, Algorithmic Keyword Clustering (SERP Overlap Jaccard Index), Multi-Regional i18n & XML-Only Hreflang Architecture, Edge SEO & Serverless CDN Execution (DoH Reverse DNS Bot Verification), Enterprise Faceted Navigation & Crawl Trap Neutralization, Enterprise Organic Traffic Engineering & Google Discover Scaling (100k Concurrent User Shield), **Algorithmic Backlink Strategy, Programmatic Link Magnets & Digital PR Engineering**, **The Full 100-Point Senior Developer SEO Production Checklist in Appendix A**, Playwright automated crawl tests, production code swipe files, front & back covers.
- **Rating**: 10/10 (Audited against Google Search Central & Core Web Vitals Standards).

---

## ✍️ How to Author a Book in This Studio

1. **Run the generator**:
   ```powershell
   npm.cmd run book:new -- "Your Title"
   ```
2. **Add or edit chapters**:
   Place markdown files inside `books/<your_book_slug>/manuscript/01_core/`.
3. **Configure chapter sequence**:
   Update `books/<your_book_slug>/book.config.json` in `manuscriptOrder` to reflect your desired reading sequence.
4. **Add covers**:
   Place `front_cover.jpg` and `back_cover.jpg` into `books/<your_book_slug>/assets/`.
5. **Compile & export**:
   ```powershell
   npm.cmd run build -- --book=<your_book_slug>
   npm.cmd run make:pdf -- --book=<your_book_slug>
   ```
   Your publication is immediately ready in `books/<your_book_slug>/<your_book_slug>.pdf`!

---

*Engineered with precision by Jarvis & The AI Publishing Collective.*
