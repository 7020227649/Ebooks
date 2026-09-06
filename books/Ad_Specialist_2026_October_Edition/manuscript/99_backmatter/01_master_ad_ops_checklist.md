# Appendix A: The Master Ad Operations & Creative Launch Checklist
### Full 100-Point Pre-Flight Verification Suite

> [!IMPORTANT]
> Execute this deterministic 100-point audit before launching any media campaign, deploying new creatives, scaling spend, or releasing landing pages. Every item represents an empirically verified performance, tracking, or fraud mitigation factor.

---

### Part I: Server-Side Telemetry & Event Quality (Points 1–10)
- [ ] 1. Meta Conversions API (CAPI) is deployed via serverless Edge or server-to-server gateway (bypassing client ad-blockers).
- [ ] 2. Event Match Quality (EMQ) score on `Purchase` and `Lead` events is certified at **$\ge 8.5/10.0$** (ideally $> 9.0$).
- [ ] 3. SHA-256 cryptographic hashing is applied to all customer PII match parameters (`em`, `ph`, `fn`, `ln`, `ct`, `zp`).
- [ ] 4. Phone numbers are normalized strictly to E.164 international format (`+1xxxxxxxxxx`) before hashing.
- [ ] 5. Client/Server deduplication is verified using identical unique `event_id` values across both browser and server payloads.
- [ ] 6. Google Ads Enhanced Conversions via API or Server-Side GTM is configured with verified match rate $\ge 80\%$.
- [ ] 7. Google Consent Mode v2 is implemented with dynamic cookieless pings for unconsented European visitors.
- [ ] 8. Server-Side Google Tag Manager (sGTM) is hosted on a custom first-party subdomain (`api.yourdomain.com`).
- [ ] 9. Raw edge incoming `client_ip_address` and browser `client_user_agent` headers are forwarded untouched.
- [ ] 10. Automated health check monitors webhook responses from Meta Graph API and Google Ads API for HTTP 200 success.

---

### Part II: Account Architecture & Bidding Calibration (Points 11–20)
- [ ] 11. Consolidated account structure is enforced: maximum 1 to 3 active campaigns per business unit/country.
- [ ] 12. Single Keyword Ad Groups (SKAGs) and fragmented interest micro-targeting are completely purged.
- [ ] 13. Broad targeting (demographics only) is utilized on Meta Advantage+ campaigns with zero restrictive interest overlays.
- [ ] 14. Primary scaling campaigns generate at least **50 target conversion events per week** to sustain the algorithmic exploitation phase.
- [ ] 15. Bid strategy is aligned with unit economics: Target CPA or Target ROAS calibrated against true net contribution margin.
- [ ] 16. Target ROAS floor is computed using COGS, shipping, and payment fees rather than vanity top-line revenue.
- [ ] 17. Upper-funnel micro-conversions (AddToCart / InitiateCheckout) are used only when purchase volume is $< 30\text{ events/week}$.
- [ ] 18. Value-Based Bidding (VBB) incorporates offline 30-day Predicted LTV (pLTV) adjustments via API imports.
- [ ] 19. Budget changes are constrained to **$\le 20\%$ per 48-hour window** to prevent resetting the algorithmic learning phase.
- [ ] 20. Campaign Budget Optimization (CBO) is enabled to allow real-time auction liquidity across active ad sets.

---

### Part III: Visual Ad Design & Cognitive Pattern Interrupts (Points 21–30)
- [ ] 21. Creative hook initiates a visual pattern interrupt within the first **500 milliseconds** of feed exposure.
- [ ] 22. The "Color Clash Principle" is applied: high-contrast accents (safety yellow, neon cyan, ultraviolet) break feed monotony.
- [ ] 23. Text overlays maintain a minimum **4.5:1 contrast ratio** against backgrounds using semi-transparent gradient scrims.
- [ ] 24. Primary text overlays are strictly constrained to a maximum of **3 concise lines**.
- [ ] 25. Display typography pairs an ultra-bold headline font with a clean, high-legibility body font.
- [ ] 26. Visual scan hierarchy places primary hook copy in the mobile "Power Third" (center-top visual field).
- [ ] 27. Native UGC "lo-fi" aesthetics (iPhone camera grain, natural lighting) are tested alongside high-gloss 3D renders.
- [ ] 28. Subtitles/captions are hard-burned or dynamically rendered for $85\%+$ of mobile users viewing videos with audio muted.
- [ ] 29. Critical headlines and offers are positioned within the **Safe Zone**, clearing top 150px and bottom 320px UI overlays.
- [ ] 30. Visual clarity is verified under small 4-inch mobile screen previews before finalizing creative exports.

---

### Part IV: Comprehensive Format Specs & Platform Safe Zones (Points 31–40)
- [ ] 31. Video assets are delivered in native **$9:16$ (1080x1920px)** for Stories, Reels, TikTok, and YouTube Shorts.
- [ ] 32. Feed static graphics and carousels are delivered in native **$1:1$ (1080x1080px)** or **$4:5$ (1080x1350px)**.
- [ ] 33. Google Responsive Display / Demand Gen packages include Landscape ($1.91:1$), Square ($1:1$), and Vertical ($9:16$).
- [ ] 34. Dynamic Product Ads (DPA) utilize automated image feeds with clean white backgrounds and promotional overlays.
- [ ] 35. Micro-carousels enforce 3 to 10 sequential cards with a clear narrative progression and closing CTA button slide.
- [ ] 36. Video bitrate is encoded at **$\ge 15\text{ Mbps}$** using H.264 / AAC audio to prevent platform re-compression blur.
- [ ] 37. Audio tracks feature crisp voiceover normalized to **-14 LUFS** with ducked background music (-18dB).
- [ ] 38. High-resolution vector logos are uploaded in both square (1:1) and transparent horizontal formats.
- [ ] 39. Interactive instant canvas and lead forms are pre-cached for zero-latency mobile instant open.
- [ ] 40. Video length is calibrated: 15 to 30 seconds for direct-response conversions; 6 seconds for bumper awareness.

---

### Part V: High-Converting Design Framework Execution (Points 41–50)
- [ ] 41. At least one *"Us vs. Them"* comparative matrix ad is active in every prospecting ad set.
- [ ] 42. Product features are visually proven using an Anatomic Callout Diagram with radiating pointer vectors.
- [ ] 43. Verified 5-star customer review screenshot cards are superimposed over lifestyle product imagery.
- [ ] 44. Visual problem/agony creatives showcase the customer's acute daily frustration before introducing the solution.
- [ ] 45. Before/After transformation splits comply strictly with health, cosmetic, and financial ad network policies.
- [ ] 46. Tier-1 press and media publication quotes/logos are integrated as third-party authority accelerators.
- [ ] 47. Minimalist Apple-style negative space creative is deployed for high-ticket / enterprise positioning.
- [ ] 48. Organic-style "Notes App / Tweet" screenshot ads are tested to counter feed banner blindness.
- [ ] 49. Every static ad communicates exactly **one clear value proposition** rather than confusing multiple offers.
- [ ] 50. Call-to-action buttons feature prominent, pill-shaped designs with direct imperative verbs ("Get Instant Access").

---

### Part VI: Dynamic Creative Optimization (DCO) & Systems (Points 51–60)
- [ ] 51. Modular creative assets are built in Figma using reusable Auto-Layout components and design tokens.
- [ ] 52. Meta 3:2:2 Dynamic Creative testing sandbox is operational (3 creatives, 2 primary texts, 2 headlines).
- [ ] 53. Standardized creative naming taxonomy is enforced (`[Channel]_[Product]_[Angle]_[Format]_[Date]`).
- [ ] 54. Creative Fatigue Velocity is tracked: creative refreshed when **First-Time Impression Ratio (FTIR) drops $< 45\%$**.
- [ ] 55. Winning DCO permutations are graduated into the primary ASC scaling campaign with historical Post IDs preserved.
- [ ] 56. AI-assisted asset pipelines (Flux, Midjourney, ElevenLabs) produce at least 10 new test variations weekly.
- [ ] 57. Dynamic creative copy variations cover both short-form punchy text ($< 150$ chars) and long-form storytelling.
- [ ] 58. Headlines test both direct feature benefits and social proof / metric proof points.
- [ ] 59. Automated FFmpeg rendering scripts composite localized text and voiceovers across multiple aspect ratios.
- [ ] 60. Creative testing budget is isolated at **$10\% - 20\%$ of total spend**, protecting the 80% scaling engine.

---

### Part VII: Google Performance Max & Search Discipline (Points 61–70)
- [ ] 61. Account-level Negative Keyword Lists block all brand search terms from generic PMax campaigns.
- [ ] 62. Negative placement exclusions purge all mobile app categories (140+ categories) from PMax and Display.
- [ ] 63. Shared exclusion lists block verified Made-For-Advertising (MFA) spam websites and kids' YouTube channels.
- [ ] 64. Feed-Only PMax campaigns are deployed for pure e-commerce Google Shopping intent without video waste.
- [ ] 65. Asset-Packed PMax campaigns include full asset quotas: 20 high-res images, 5 videos, 5 logos, and complete copy.
- [ ] 66. Audience signals are configured using high-value First-Party Customer Match lists and high-intent Search Themes.
- [ ] 67. URL Expansion settings are reviewed: non-transactional routes (blog, careers, terms) are explicitly excluded.
- [ ] 68. Google Search campaigns pair Broad Match with Smart Bidding (Target CPA/ROAS) and strict negative filters.
- [ ] 69. Responsive Search Ads (RSAs) maintain "Good" or "Excellent" Ad Strength with pinned brand disclaimers only when legally required.
- [ ] 70. Search query reports are mined weekly via automated scripts to harvest new negative keywords.

---

### Part VIII: Fraud Elimination & Bot Defense (Points 71–80)
- [ ] 71. Cloudflare Turnstile or invisible bot scoring protects all public lead generation forms.
- [ ] 72. Automated IP exclusion scripts detect click bursts ($> 3$ clicks in 10 minutes without cart adds) and block offending IPs.
- [ ] 73. Display Network click-through rates are audited: placements with anomalous $> 5\%$ CTR are flagged and purged as click farms.
- [ ] 74. Traffic geography is constrained strictly to target countries; "Presence or Interest" is changed to **"Presence Only"**.
- [ ] 75. Proxy and VPN traffic is filtered at the Edge CDN layer before conversions are counted.
- [ ] 76. Form field honeypots are deployed to catch automated scraper submissions silently.
- [ ] 77. Competitor brand search bidding is monitored for negative search arbitrage and click retaliation.
- [ ] 78. Invalid click credit refunds from Google Ads are audited monthly against server log records.
- [ ] 79. Lead validation APIs verify email deliverability and phone line status in real-time before syncing to CRM.
- [ ] 80. Zero bot leads are allowed to trigger conversion pixels, preventing the bidding algorithm from optimizing for spam.

---

### Part IX: High-Converting Post-Click Landing Pages (Points 81–90)
- [ ] 81. Landing page mobile Largest Contentful Paint (LCP) is benchmarked at **$\le 1.2\text{ seconds}$** under mobile 4G throttling.
- [ ] 82. Edge Dynamic Text Replacement (DTR) via Cloudflare Workers dynamically matches the ad headline to page H1.
- [ ] 83. Message match is certified: the exact hook, price anchor, and discount promised in the ad is visible above the fold.
- [ ] 84. Above-the-fold mobile screen features a prominent CTA button, primary value claim, and social proof badge.
- [ ] 85. One-click express checkout options (Apple Pay, Google Pay, Shop Pay) are operational on mobile checkout.
- [ ] 86. Multi-step micro-commitment forms replace long single-page lead capture forms.
- [ ] 87. Automated 404 URL checker script tests all active ad destination links hourly, pausing ads if pages fail.
- [ ] 88. Exit-intent overlays or abandonment recovery prompts capture leads before visitors bounce.
- [ ] 89. Live chat or instant FAQ accordions address top 3 pre-purchase objections directly on the landing page.
- [ ] 90. Full-funnel UTM tracking parameters are preserved across all internal button clicks and checkout steps.

---

### Part X: Attribution, Governance & Enterprise Scaling (Points 91–100)
- [ ] 91. Blended Contribution Margin and Marketing Efficiency Ratio (MER) are tracked daily in an executive financial dashboard.
- [ ] 92. Bayesian Marketing Mix Modeling (Robyn or Meridian) estimates channel-level saturation and marginal CAC monthly.
- [ ] 93. Geo-Lift matched-market incrementality experiments validate true causal revenue lift ($p < 0.05$).
- [ ] 94. Automated budget pacing scripts enforce hard daily spend caps and alert on runaway CPC spikes via Slack.
- [ ] 95. Horizontal scaling roadmap is deployed across distinct psychological angles before vertical budget doubling.
- [ ] 96. First-party zero-party data quiz funnels capture customer segmentation tags for personalized retargeting.
- [ ] 97. Customer Match audience lists are updated via automated CRM webhooks at least once every 24 hours.
- [ ] 98. Auction overlap across ad sets is audited in Meta Delivery Insights, keeping overlap below $15\%$.
- [ ] 99. Campaign scaling increments are restricted to $+15\% \text{ to } +20\%$ every 48 hours to preserve neural stability.
- [ ] 100. Weekly post-mortem audits archive underperforming creative concepts and double down on validated winning angles.
