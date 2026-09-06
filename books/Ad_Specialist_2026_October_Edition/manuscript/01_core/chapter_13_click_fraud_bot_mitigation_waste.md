# Chapter 13: Click Fraud Detection, Bot Mitigation & Ad Waste Elimination

## 1. The Anatomy of Click Fraud in 2026

Ad fraud accounts for an estimated **$80+ billion in wasted ad spend globally**. If you run unshielded paid search or display campaigns, up to $20\% - 35\%$ of your budget is siphoned away by automated bot traffic.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   PRIMARY SOURCES OF DIGITAL AD FRAUD                  │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ 1. Competitor Bot │ 2. Click Farm     │ 3. Made-For-Advertising (MFA)  │
│    Scrapers       │    Networks       │    Display Domains             │
├───────────────────┼───────────────────┼────────────────────────────────┤
│ Automated Python/ │ Human and proxy   │ Low-quality spam websites with │
│ Playwright scripts│ networks paid to  │ 20+ auto-refreshing banner ads │
│ draining competitor│ generate fake lead│ that harvest programmatic ad   │
│ search budgets.   │ conversions.      │ impressions without human eyes.│
└───────────────────┴───────────────────┴────────────────────────────────┘
```

---

## 2. Technical Mitigation: Edge Bot Detection & IP Exclusions

### Step 1: Deploying Cloudflare Turnstile & Bot Management
Replace intrusive legacy CAPTCHAs with frictionless **Cloudflare Turnstile** on your landing page forms. Turnstile evaluates cryptographic proof-of-work in the background:
* If a visitor is flagged as an automated headless browser ($score < 0.3$), the conversion form rejects the submission silently.
* Prevents fake lead submissions from polluting your Meta CAPI and Google Offline Conversion Import (OCI) feeds with spam data.

### Step 2: Automated Google Ads API IP Exclusion Syncer
Run a backend script that monitors your landing page access logs. When an individual IP address generates more than 3 clicks within a 10-minute window without adding items to cart or initiating checkout, automatically push that IP to the Google Ads API **Campaign IP Exclusion list**.

---

## 3. Placement Hygiene: Purging Mobile Apps & MFA Networks

By default, Google Display and Performance Max campaigns dump budget onto mobile gaming apps (where children accidentally tap banner ads while playing games) and low-tier YouTube channels.

### Account-Level Placement Exclusion Protocol:
1. **Exclude All Mobile App Categories**: In Google Ads Account Settings, exclude all 140+ App categories under `googleads.googleapis.com/v18/customers/{id}/customerNegativeCriteria`.
2. **Exclude MFA Domains**: Upload a standardized list of $50,000+$ verified Made-For-Advertising domains to your shared placement exclusion list.
3. **Exclude Kids' YouTube Channels**: Apply shared YouTube channel negative lists blocking animated content, nursery rhymes, and toy unboxing channels.
