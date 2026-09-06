# 📖 The Book Publishing Center

This folder contains your compiled eBook and the automated HTML-to-PDF generation tool.

---

## 📁 Files in This Folder

1. **`Google_Adsense_Ready_2026.html` / `index.html`**:
   - The complete, beautifully typeset digital eBook.
   - Includes a floating top toolbar with a **"Save / Print as PDF"** button.
   - Open this file in Google Chrome, Microsoft Edge, or any browser to read.

2. **`Google_Adsense_Ready_2026.pdf`**:
   - The high-resolution, print-ready PDF book compiled with professional margins, page breaks, and chapter formatting.

3. **`make-pdf.js`**:
   - The automated command-line tool that generates the PDF book.
   - Run anytime via:
     ```bash
     node book/make-pdf.js
     ```
     or
     ```bash
     npm.cmd run make:pdf
     ```

---

## 🖨️ PDF Generation Settings & Formatting

The tool automatically configures:
- **Paper Size**: A4 (standard international book format)
- **Margins**: 18mm top/bottom, 15mm left/right
- **Borders & Frame**: Classical double-ruled frame on the title page, clean modern dividers between sections
- **Page Break Controls**: Chapters always start on a fresh page; callout boxes and comparison tables are protected from split truncations.
