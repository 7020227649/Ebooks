# Chapter 3: Core Web Vitals & Real-User Performance Engineering

> *"A website that responds in 600ms is not 'working'; to the user's nervous system and Google's ranking engine, it is stalling."*

---

## 1. The Modern Core Web Vitals Thresholds (2026)

Google measures real-world user experience via the **Chrome User Experience Report (CrUX)** across the 75th percentile of actual visitor sessions:

```
┌──────────────────────────────────────┬─────────────┬────────────────────┬───────────┐
│ Metric                               │ Good (Pass) │ Needs Improvement  │ Poor      │
├──────────────────────────────────────┼─────────────┼────────────────────┼───────────┤
│ INP (Interaction to Next Paint)      │ ≤ 200 ms    │ 200 ms – 500 ms    │ > 500 ms  │
│ LCP (Largest Contentful Paint)       │ ≤ 2.5 s     │ 2.5 s – 4.0 s      │ > 4.0 s   │
│ CLS (Cumulative Layout Shift)        │ ≤ 0.10      │ 0.10 – 0.25        │ > 0.25    │
│ TTFB (Time to First Byte)            │ ≤ 800 ms    │ 800 ms – 1800 ms   │ > 1800 ms │
└──────────────────────────────────────┴─────────────┴────────────────────┴───────────┘
```

---

## 2. Demystifying Interaction to Next Paint (INP)

In March 2024, Google permanently replaced First Input Delay (FID) with **Interaction to Next Paint (INP)**. 

While FID only measured the first click on a page, INP tracks **every single click, tap, and keyboard interaction throughout the entire session**, recording the slowest interaction.

### The 3 Anatomy Components of INP:
```
Total Interaction Duration = [Input Delay] + [Processing Time] + [Presentation Delay]
  ├── Input Delay: Time spent waiting for main thread tasks to finish before handler starts.
  ├── Processing Time: Time spent running your JavaScript event handlers.
  └── Presentation Delay: Time spent recalculating styles, reflowing layout, and painting pixels.
```

### Breaking Up Long Tasks with `scheduler.yield()`
Any JavaScript task that runs longer than **50ms** blocks the main browser thread. If a user clicks while a long task is executing, your INP immediately enters the "Needs Improvement" or "Poor" penalty zone.

In 2026, modern browsers support the native **`scheduler.yield()`** API, allowing long computational loops to yield control back to the browser compositor:

```typescript
// Production task chunker with native scheduler.yield() fallback
async function yieldToMain() {
  if ('scheduler' in window && 'yield' in (window as any).scheduler) {
    return await (window as any).scheduler.yield();
  }
  return new Promise((resolve) => setTimeout(resolve, 0));
}

// Processing heavy arrays without blocking INP
async function processLargeDataset(items: DataItem[]) {
  for (let i = 0; i < items.length; i++) {
    // Process item
    heavyCalculation(items[i]);

    // Yield control back to browser compositor every 25 items
    if (i % 25 === 0) {
      await yieldToMain();
    }
  }
}
```

---

## 3. LCP & CLS Optimization Protocols

### LCP Engineering: The `fetchpriority="high"` Directives
Your Largest Contentful Paint is usually an image or large typography block. Optimize the critical rendering path:

1. **Preload the Hero Asset**:
   ```html
   <link rel="preload" fetchpriority="high" as="image" href="/hero.avif" type="image/avif" />
   ```
2. **Eliminate Image Lazy-Loading on the Hero**:
   Never add `loading="lazy"` to your hero image. Lazy-loading the LCP element adds a 300ms to 800ms artificial delay to your LCP score!
   ```html
   <!-- ✅ CORRECT: Eager LCP Image -->
   <img src="/hero.avif" alt="Architecture" fetchpriority="high" loading="eager" width="1200" height="630" />
   ```

### CLS Engineering: Reserving Space & Aspect Ratio
Layout shifts happen when late-loading resources push existing DOM elements downward:
- Always enforce CSS `aspect-ratio` on responsive images:
  ```css
  img.responsive-banner {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }
  ```
- Always reserve fixed-height wrapper containers for dynamic ads, cookie banners, or asynchronous widgets:
  ```css
  .ad-slot-container {
    min-height: 250px;
    background: #f8fafc;
  }
  ```

<div class="callout callout-action">
  <strong>Action Item:</strong> Open Chrome DevTools $\rightarrow$ **Performance** tab $\rightarrow$ click **Record** $\rightarrow$ interact with your key navigation buttons and dropdowns. Check the **Interactions** track. If any interaction exceeds 200ms, inspect the associated Long Animation Frame (LoAF) trace and apply <code>yieldToMain()</code>.
</div>
