# Chapter 7: The Developer's 50-Point CI/CD SEO Automation Suite

> *"If your SEO verification isn't running in your CI/CD pipeline, an innocent pull request will break your indexation on Friday evening."*

---

## 1. Automating Search Audits in GitHub Actions

The biggest failure mode in technical teams is regression. A junior engineer merges a pull request adding an unoptimized 4MB PNG or a typo in `robots.txt`, and organic traffic crashes the following week.

Automate your technical SEO guardrails directly within your GitHub Actions CI/CD workflow:

### `.github/workflows/seo-ci.yml`
```yaml
name: Production SEO & Performance Quality Gate

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  seo-audit:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Install Dependencies
        run: npm ci

      - name: Build Production Bundle
        run: npm run build

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          uploadArtifacts: true
          temporaryPublicStorage: true
          configPath: './lighthouserc.json'

      - name: Validate Schema JSON-LD Syntax
        run: npx schema-dts-lint ./public/schema.json
```

### `lighthouserc.json` (Assertion Rules)
```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:seo": ["error", { "minScore": 1.0 }],
        "categories:performance": ["error", { "minScore": 0.90 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "largest-contentful-paint": ["error", { "maxNumericValue": 2500 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }],
        "interaction-to-next-paint": ["error", { "maxNumericValue": 200 }]
      }
    }
  }
}
```

---

## 2. Automated End-to-End Crawler Testing with Playwright

Beyond static lighthouse tests, senior teams execute full headless crawler assertions using Playwright to traverse internal link paths, detect broken anchors, and verify critical SEO headers on every deploy preview.

### `tests/seo-crawler.spec.ts`
```typescript
import { test, expect } from '@playwright/test';

test.describe('Automated SEO & Semantic DOM Gatekeeper', () => {
  const targetRoutes = ['/', '/architecture', '/docs', '/pricing'];

  for (const route of targetRoutes) {
    test(`Verify technical SEO invariants for ${route}`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      // 1. Single H1 Enforcement
      const h1Count = await page.locator('h1').count();
      expect(h1Count, `Expected exactly 1 H1 on ${route}, found ${h1Count}`).toBe(1);

      // 2. Canonical Tag Presence and Validity
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();
      expect(canonical?.startsWith('https://')).toBe(true);

      // 3. Robots Meta Tag Directives
      const robots = await page.locator('meta[name="robots"]').getAttribute('content');
      expect(robots).toContain('max-image-preview:large');
      expect(robots).toContain('max-snippet:-1');

      // 4. Hero Image Priority (Zero Lazy Loading on LCP)
      const heroImage = page.locator('img[fetchpriority="high"]');
      if (await heroImage.count() > 0) {
        const loadingAttr = await heroImage.getAttribute('loading');
        expect(loadingAttr).not.toBe('lazy');
      }

      // 5. Schema JSON-LD Presence
      const schemaScripts = await page.locator('script[type="application/ld+json"]').count();
      expect(schemaScripts).toBeGreaterThanOrEqual(1);
    });
  }
});
```

> [!TIP]
> **Complete Production Verification Suite:**
> For the comprehensive, unabridged **100-Point Senior Developer SEO Production Checklist** aggregating all architectural, on-page, performance, schema, edge routing, and CI/CD criteria, refer to **Appendix A** at the conclusion of this publication.

