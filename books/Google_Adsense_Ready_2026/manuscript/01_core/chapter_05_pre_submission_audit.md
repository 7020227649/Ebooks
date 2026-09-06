# Chapter 5: The Pre-Submission Diagnostic Audit (Day 14)


> *"Measure twice, cut once."*






---


## 1. The 40-Point Zero-Defect AdSense Checklist


Before clicking **"Submit Site"**, run this line-by-line inspection. Every single box must be checked.



### A. Technical & Infrastructure (10 Points)

- [ ] 1. Domain is on an authority TLD (`.com`, `.net`, `.org`) without hyphens or spam prefixes.
- [ ] 2. Valid SSL certificate is active across all URLs (HTTPS forced site-wide).
- [ ] 3. Homepage loads in under 2.5 seconds on mobile (checked via PageSpeed Insights).
- [ ] 4. XML Sitemap is submitted and successfully read in Google Search Console.
- [ ] 5. `robots.txt` does NOT disallow `Mediapartners-Google` or general Googlebots.
- [ ] 6. Zero 404 broken internal or external links (verified with a broken link checker).
- [ ] 7. Mobile viewport meta tag is properly configured; site renders cleanly on smartphones.
- [ ] 8. No intrusive popups, fullscreen interstitials, or aggressive overlay scripts.
- [ ] 9. Caching and CDN settings (e.g. Cloudflare) do NOT block Google user agents.
- [ ] 10. Favicon and clean site title/tagline are properly set.

### B. Navigation & User Experience (10 Points)

- [ ] 11. Header menu contains links to all active content categories.
- [ ] 12. Every category in the navigation menu contains **at least 5 published articles**.
- [ ] 13. Zero empty category, archive, or tag pages.
- [ ] 14. Zero dead `#` or placeholder links in header, sidebar, or footer.
- [ ] 15. Functional search bar is present in header or sidebar and returns clean results.
- [ ] 16. Working pagination or "Load More" controls on archive pages.
- [ ] 17. Clean typography: readable font size (at least 16px body), high-contrast text.
- [ ] 18. Default template demo posts ("Hello World!") and sample pages are deleted.
- [ ] 19. Default CMS widgets ("Meta", "Recent Comments", "Calendar") are removed.
- [ ] 20. Breadcrumb navigation is functional and displays correct hierarchy.

### C. Content & Editorial Standards (10 Points)

- [ ] 21. At least 20 comprehensive pillar articles are published.
- [ ] 22. Average word count across all published posts exceeds 1,200 words.
- [ ] 23. Every article contains at least one formatted table, numbered checklist, or diagram.
- [ ] 24. Zero watermarked, copyrighted, or low-resolution stock images.
- [ ] 25. All articles feature an author bio box with author name and credentials.
- [ ] 26. Content is strictly original, educational, and passes duplicate content scanners.
- [ ] 27. Every article includes contextual internal links to related posts.
- [ ] 28. No grammar or spelling anomalies; high readability throughout.
- [ ] 29. Niche is 100% compliant with Google Publisher Policies (no gambling, adult, hacking).
- [ ] 30. Headings follow clean semantic hierarchy (`h1`, `h2`, `h3`).

### D. Legal & Compliance (10 Points)

- [ ] 31. Privacy Policy is live, linked in the footer, and mentions Google AdSense/cookies.
- [ ] 32. Terms of Service page is live and linked in the footer.
- [ ] 33. Disclaimer page is live and linked in the footer.
- [ ] 34. About Us page details the website mission, editorial standards, and author bio.
- [ ] 35. Contact Us page features a working form and dedicated domain email address.
- [ ] 36. Cookie consent mechanism complies with Google-Certified CMP / IAB TCF v2.2 standard.
- [ ] 37. Zero third-party ad networks or disruptive affiliate banners currently active.
- [ ] 38. Site search query `site:yourdomain.com` confirms $\ge 85\%$ indexation in Google.
- [ ] 39. AdSense verification code is placed cleanly inside `&lt;head&gt;...&lt;/head&gt;` tags.
- [ ] 40. `ads.txt` is accessible at `https://yourdomain.com/ads.txt`.


---


## 2. Proper Account Setup & Code Integration


When registering your Google AdSense account:<br />- **Payee Name**: Must **exactly match** your government-issued ID and tax documentation. Discrepancies between your bank account name and AdSense account name will trigger verification holds later.<br />- **Account Type**: Select **Individual** unless you have registered a legal corporate entity with formal business tax documentation.<br />- **Verification Code Placement**: Insert the snippet into your theme's header. Verify that caching plugins do not defer or break the script tag.



<div class="callout callout-tip">
  **Pro Tip (Submission Timing):** Submit your application on **Tuesday or Wednesday morning (between 9:00 AM and 11:00 AM EST)**. Avoid submitting on Friday afternoons or weekends, which frequently leads to queuing backlogs over the weekend.
</div>


---


## 3. The "Site Pulse" Protocol (What to Do While in the Review Queue)


Once your site status flips to **"Getting Ready..."**, your application enters Google's review queue. This review typically takes between **48 hours and 14 days**.



The fatal mistake 90% of webmasters make is **freezing their site completely** the moment they apply.



When Google's crawl scheduler schedules a re-crawl to verify traffic consistency and content health, it checks your XML sitemap's `&lt;lastmod&gt;` timestamps. If the site appears abandoned, the application can stall in the queue.



### The Active Review Routine:

1. **Maintain the Editorial Pulse**: Publish **exactly one new high-value pillar post (1,200+ words) every 3 to 4 days** while waiting for review.
2. **Never Modify Theme or Header Code**: Do not switch themes, clear DNS zones, or experiment with caching configurations while the review tag is active. Any temporary server 500 error or missing tag during a bot sweep results in an immediate *"Site Down or Unavailable"* rejection.
3. **Monitor Google Search Console**: Check the **Pages** report daily. Ensure all newly published posts transition to "Indexed" without crawl anomalies.