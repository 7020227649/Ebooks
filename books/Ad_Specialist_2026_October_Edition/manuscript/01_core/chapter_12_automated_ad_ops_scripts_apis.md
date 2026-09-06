# Chapter 12: Automated Ad Ops: Google Ads Scripts & Meta Marketing API Infrastructure

## 1. The Autonomous Operations Imperative

Manual campaign management is prone to human error, missed budget burn anomalies, and broken landing page leaks. Enterprise ad operations require **automated code-level guardrails**.

---

## 2. Production Google Ads Script: 24/7 Automated Budget Pacing & Anomaly Breaker

Deploy this Google Ads Script inside your Google Ads account to monitor daily spend velocity. If spend accelerates unexpectedly or a runaway bid inflates CPCs, the script pauses underperforming ad groups and pings your Slack emergency webhook.

```javascript
// scripts/google-ads-pacing-guardrail.js
function main() {
  const DAILY_BUDGET_CAP = 5000.0; // Max allowed spend per day
  const MAX_ALLOWED_CPC = 15.0;     // Safety ceiling for runaway CPCs
  const SLACK_WEBHOOK = 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL';

  const todaySpend = AdsApp.currentAccount().getStatsFor('TODAY').getCost();
  Logger.log('Current Spend Today: $' + todaySpend);

  // 1. Emergency Circuit Breaker: Hard Spend Cap
  if (todaySpend > DAILY_BUDGET_CAP) {
    Logger.warn('EMERGENCY: Daily budget cap exceeded! Pausing non-brand campaigns.');
    const campaignIterator = AdsApp.campaigns()
      .withCondition("Name DOES_NOT_CONTAIN_IGNORE_CASE 'Brand'")
      .withCondition("Status = ENABLED")
      .get();

    while (campaignIterator.hasNext()) {
      const campaign = campaignIterator.next();
      campaign.pause();
      Logger.log('Paused campaign: ' + campaign.getName());
    }

    sendSlackNotification(SLACK_WEBHOOK, '🚨 *EMERGENCY BREAK TRIGGERED*: Daily cap of $' + DAILY_BUDGET_CAP + ' exceeded. Non-brand campaigns paused.');
  }

  // 2. High CPC Anomaly Detection
  const keywordIterator = AdsApp.keywords()
    .withCondition("Status = ENABLED")
    .withCondition("AverageCpc > " + MAX_ALLOWED_CPC)
    .forDateRange("TODAY")
    .get();

  while (keywordIterator.hasNext()) {
    const kw = keywordIterator.next();
    Logger.warn('Keyword ' + kw.getText() + ' exceeded max CPC: $' + kw.getStatsFor('TODAY').getAverageCpc());
    sendSlackNotification(SLACK_WEBHOOK, '⚠️ High CPC Warning: Keyword "' + kw.getText() + '" averaged $' + kw.getStatsFor('TODAY').getAverageCpc() + ' today.');
  }
}

function sendSlackNotification(url, message) {
  UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ text: message })
  });
}
```

---

## 3. Automated 404 URL Checker Script
Broken landing pages destroy conversion rates while Google and Meta happily continue burning your ad spend. Run an hourly script that fetches every active ad's final destination URL and pauses ads returning HTTP 404, 500, or 503 immediately.
