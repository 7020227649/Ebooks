# Chapter 11: Cross-Channel Attribution, Marketing Mix Modeling (MMM) & Geo-Lift

## 1. The Fallacy of Multi-Touch Attribution (MTA) & Platform Bias

Every advertising platform operates as a walled garden that aggressively over-claims credit for sales:
* If a customer searches on Google, clicks an Instagram Retargeting Ad, and purchases: **Meta claims 100% of the sale, and Google claims 100% of the sale.**
* Adding reported dashboard revenues across Meta, Google, TikTok, and Klaviyo typically sums to $150\% - 200\%$ of actual bank cash receipts!

```
┌────────────────────────────────────────────────────────────────────────┐
│                     THE MODERN TRIANGULATION MODEL                     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ▼                          ▼                          ▼
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│ 1. Platform CAPI │       │ 2. Statistical   │       │ 3. Geo-Lift      │
│ In-Platform Day- │       │ Marketing Mix    │       │ Incrementality   │
│ to-Day Bidding & │       │ Modeling (MMM)   │       │ Experiments      │
│ Optimization     │       │ Macro Capital    │       │ Ground-Truth     │
│ (Fast & Local)   │       │ Allocation       │       │ Calibration      │
└──────────────────┘       └──────────────────┘       └──────────────────┘
```

In 2026, enterprise brands discard multi-touch attribution in favor of **The Triangulation Model**: combining Platform CAPI, Bayesian MMM, and Geo-Lift Experiments.

---

## 2. Open-Source Bayesian Marketing Mix Modeling (Robyn & Meridian)

Marketing Mix Modeling (MMM) uses econometric time-series regression to estimate the true marginal impact of marketing spend on sales, mathematically accounting for:
* **Adstock (Carryover Effect)**: The decay rate of advertising awareness over time:
  $$\text{Adstock}(t, \alpha, L) = \sum_{l=0}^{L} \alpha^l x_{t-l}$$
* **Diminishing Returns (Hill Function)**: Saturation curves modeling how each additional dollar yields smaller marginal revenue:
  $$\text{Hill}(x, K, S) = \frac{x^S}{K^S + x^S}$$

### Google Meridian & Meta Robyn
Both open-source packages run Bayesian statistical modeling via MCMC (Markov Chain Monte Carlo) sampling. They reveal your true **Marginal Cost Per Acquisition (mCPA)** across channels, preventing over-spending on saturated networks.

---

## 3. Designing Deterministic Geo-Lift Incrementality Experiments

Geo-Lift experiments provide the statistical "Ground Truth" used to calibrate Bayesian MMM models:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   GEO-LIFT EXPERIMENT ARCHITECTURE                     │
├──────────────────────────────────┬─────────────────────────────────────┤
│ Treatment Markets (Ads Active)   │ Control Markets (Ads Blacked Out)   │
│ • California, Texas, New York    │ • Florida, Illinois, Ohio           │
│ • Run scaled media campaigns     │ • Maintain zero ad spend            │
├──────────────────────────────────┴─────────────────────────────────────┤
│ Outcome Analysis: Synthetic Control Comparison                         │
│ Incrementality Lift = Actual Sales - Counterfactual Baseline            │
│ Statistical Significance: p-value < 0.05                               │
└────────────────────────────────────────────────────────────────────────┘
```

If your treatment markets show a statistically significant lift ($p < 0.05$) in organic and total revenue compared to the synthetic control markets, your ad spend is verified **incremental**.
