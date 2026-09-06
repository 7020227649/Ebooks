# Appendix B: Production Ad Ops Code Templates & Swipe File

> Copy-paste these production-tested scripts and cloud workers directly into your ad operations infrastructure.

---

## 1. Cloudflare Worker: Edge Meta CAPI Serverless Gateway

```typescript
// workers/edge-meta-capi.ts - Serverless CAPI Dispatcher
import crypto from 'crypto';

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const payload = await request.json();
    const pixelId = env.META_PIXEL_ID;
    const token = env.META_CAPI_TOKEN;

    const hash = (v: string) => crypto.createHash('sha256').update(v.trim().toLowerCase()).digest('hex');

    const capiBody = {
      data: [
        {
          event_name: payload.eventName || 'Purchase',
          event_time: Math.floor(Date.now() / 1000),
          event_id: payload.orderId,
          event_source_url: payload.url,
          action_source: 'website',
          user_data: {
            em: payload.email ? [hash(payload.email)] : undefined,
            ph: payload.phone ? [hash(payload.phone)] : undefined,
            client_ip_address: request.headers.get('cf-connecting-ip'),
            client_user_agent: request.headers.get('user-agent'),
            fbc: payload.fbc,
            fbp: payload.fbp,
          },
          custom_data: {
            currency: payload.currency || 'USD',
            value: payload.value || 0,
            order_id: payload.orderId,
          },
        },
      ],
    };

    const res = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(capiBody),
    });

    return new Response(await res.text(), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
```

---

## 2. Google Ads Script: Automated 404 URL Dead-Link Pauser

```javascript
// scripts/google-ads-404-checker.js
function main() {
  const adIterator = AdsApp.ads()
    .withCondition("Status = ENABLED")
    .withCondition("CampaignStatus = ENABLED")
    .get();

  const brokenAds = [];

  while (adIterator.hasNext()) {
    const ad = adIterator.next();
    const finalUrl = ad.urls().getFinalUrl();
    if (!finalUrl) continue;

    try {
      const response = UrlFetchApp.fetch(finalUrl, { muteHttpExceptions: true });
      const code = response.getResponseCode();
      if (code >= 400) {
        ad.pause();
        brokenAds.push(finalUrl + " (HTTP " + code + ")");
      }
    } catch (e) {
      ad.pause();
      brokenAds.push(finalUrl + " (FETCH ERROR)");
    }
  }

  if (brokenAds.length > 0) {
    Logger.warn("Paused " + brokenAds.length + " broken ads!");
  }
}
```
