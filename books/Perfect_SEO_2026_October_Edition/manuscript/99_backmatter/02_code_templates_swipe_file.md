# Appendix: The Production Code Templates Swipe File

> Copy-paste these production-tested templates directly into your modern web stack.

---

## 1. High-Performance Next.js 15 SEO Metadata Generator

```typescript
// lib/seo.ts - Reusable Dynamic Metadata Factory
import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function constructMetadata({
  title,
  description,
  path,
  image = '/og-default.jpg',
  publishedTime,
  modifiedTime,
}: SEOProps): Metadata {
  const siteUrl = 'https://yourdomain.com';
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Acme Web Systems',
      images: [
        {
          url: `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}${image}`],
      creator: '@yourcompany',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
```

---

## 2. Production Nginx Performance & SEO Caching Config

```nginx
# /etc/nginx/conf.d/seo-performance.conf

# 1. Enforce HTTPS and canonical domain
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;
    return 301 https://example.com$request_uri;
}

# 2. Optimized Caching & Compression Headers
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.com;

    # Gzip & Brotli Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/rss+xml image/svg+xml;

    # Security Headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Static Assets Cache (Immutable 1 Year)
    location ~* \.(?:css|js|woff2?|avif|webp|png|jpg|jpeg|gif|ico)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
        access_log off;
    }

    # Dynamic HTML Pages (Stale While Revalidate)
    location / {
        add_header Cache-Control "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400";
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
