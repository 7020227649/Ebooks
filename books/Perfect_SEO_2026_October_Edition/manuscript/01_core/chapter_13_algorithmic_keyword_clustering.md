# Chapter 13: Algorithmic Keyword Clustering & Semantic Graph Architecture

## 1. The Death of Manual Keyword Lists: Mathematical SERP Clustering

In traditional SEO, marketers grouped keywords using arbitrary spreadsheet filters or gut instinct. For enterprise web engineering, manual grouping is obsolete. When you target 50,000 queries, guessing whether `"react performance optimization"` and `"how to speed up react app"` should live on the same page or two separate pages leads to catastrophic **keyword cannibalization** or missed ranking opportunities.

Modern technical teams cluster keywords algorithmically using **SERP Overlap Similarity (Jaccard Index)**. 

Google’s search algorithm has already computed the semantic relationship between queries. If two distinct search queries return 4 or more identical ranking URLs in the top 10 results, Google considers their **Search Intent identical**, meaning **they must be served by a single unified URL**. If they share 0 to 2 overlapping URLs, they require separate dedicated pages.

```
Query A: "nextjs image optimization" ──► Top 10 SERP URLs: [U1, U2, U3, U4, U5, U6, U7, U8, U9, U10]
                                                                │   │   │   │
                                                                ▼   ▼   ▼   ▼  (4 Overlapping URLs)
Query B: "optimize images in nextjs"  ──► Top 10 SERP URLs: [U2, U3, U5, U7, X1, X2, X3, X4, X5, X6]

                         ┌────────────────────────────────────────┐
                         │   Jaccard Overlap: 4/16 = 25% (>= 40%) │
                         │   DECISION: UNIFY INTO SINGLE URL      │
                         └────────────────────────────────────────┘
```

---

## 2. Production Node.js SERP Overlap Clustering Script

Below is the automated algorithm that senior developers run against query datasets to generate deterministic topic clusters before creating routes:

```typescript
// scripts/serp-clustering.ts
interface SerpResult {
  query: string;
  urls: string[];
}

interface Cluster {
  primaryQuery: string;
  clusterUrls: string[];
  secondaryQueries: string[];
}

/**
 * Computes Jaccard Similarity between two sets of SERP URLs
 */
function calculateSerpOverlap(urlsA: string[], urlsB: string[]): number {
  const setA = new Set(urlsA.map(u => u.replace(/\/$/, '').toLowerCase()));
  const setB = new Set(urlsB.map(u => u.replace(/\/$/, '').toLowerCase()));

  const intersection = new Set([...setA].filter(x => setB.has(x)));
  return intersection.size; // Absolute overlapping URL count in Top 10
}

export function clusterKeywords(dataset: SerpResult[], overlapThreshold = 4): Cluster[] {
  const clusters: Cluster[] = [];
  const visited = new Set<string>();

  for (let i = 0; i < dataset.length; i++) {
    const candidate = dataset[i];
    if (visited.has(candidate.query)) continue;

    const currentCluster: Cluster = {
      primaryQuery: candidate.query,
      clusterUrls: candidate.urls,
      secondaryQueries: []
    };
    visited.add(candidate.query);

    for (let j = i + 1; j < dataset.length; j++) {
      const competitor = dataset[j];
      if (visited.has(competitor.query)) continue;

      const sharedUrls = calculateSerpOverlap(candidate.urls, competitor.urls);

      // If 4 or more identical URLs rank in Top 10, cluster them together!
      if (sharedUrls >= overlapThreshold) {
        currentCluster.secondaryQueries.push(competitor.query);
        visited.add(competitor.query);
      }
    }

    clusters.push(currentCluster);
  }

  return clusters;
}
```

---

## 3. The 3-Tier Semantic Graph Architecture: Pillars, Hubs & Leaves

Once queries are mathematically clustered into unified concepts, you must architect their physical URL hierarchy and internal link graph:

```
                            ┌────────────────────────────┐
                            │    TIER 1: PILLAR ROOT     │
                            │  /architecture/rendering   │
                            │ (Broad High-Volume Entity) │
                            └─────────────┬──────────────┘
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
     ┌────────────────────────────┐                  ┌────────────────────────────┐
     │      TIER 2: TOPIC HUB     │                  │      TIER 2: TOPIC HUB     │
     │ /rendering/server-side-ssr │                  │  /rendering/static-ssg     │
     │    (Core Sub-Entity)       │                  │    (Core Sub-Entity)       │
     └────────────┬───────────────┘                  └────────────┬───────────────┘
                  │                                               │
          ┌───────┴───────┐                               ┌───────┴───────┐
          ▼               ▼                               ▼               ▼
   ┌─────────────┐ ┌─────────────┐                 ┌─────────────┐ ┌─────────────┐
   │ TIER 3 LEAF │ │ TIER 3 LEAF │                 │ TIER 3 LEAF │ │ TIER 3 LEAF │
   │ /ssr/caching│ │ /ssr/stream │                 │ /ssg/build  │ │ /ssg/reval  │
   └─────────────┘ └─────────────┘                 └─────────────┘ └─────────────┘
          ▲               │
          └───────────────┘
       (Strict Sibling Link Mesh)
```

### Architectural Rules for Cluster Routing:
1. **The Strict Sibling Mesh:** Tier 3 leaves within the same parent hub must link to their immediate siblings using contextual anchor text. Leaves from `SSR` must **not** link directly to deep leaves in `SSG` without first routing through the parent hub. This preserves crisp topical boundaries for Google's Knowledge Graph.
2. **Deterministic Parent Up-Linking:** Every Tier 3 leaf page must feature a semantic breadcrumb linking directly up to Tier 2 and Tier 1.
3. **No Dangling Leaf Nodes:** An unlinked spoke page loses PageRank and is classified as "Crawled - currently not indexed" in Google Search Console.

---

## 4. Programmatic Topic Cluster Navigation Component

```tsx
// components/seo/ClusterBreadcrumbs.tsx
import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface ClusterBreadcrumbProps {
  items: BreadcrumbItem[];
}

export const ClusterBreadcrumbs: React.FC<ClusterBreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Topic Cluster Breadcrumb" className="py-3 text-sm text-slate-500">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-blue-600">Home</Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center space-x-2">
              <span className="text-slate-400">/</span>
              {isLast ? (
                <span className="font-semibold text-slate-900 dark:text-white" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-blue-600">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
```

---

## 5. Architectural Implementation Takeaways

1. **Rely on Mathematical SERP Overlap:** Never guess whether two queries warrant separate URLs; compute their Jaccard Index. If they share 4+ Top-10 SERP URLs, unify them into a single definitive URL.
2. **Enforce 3-Tier Cluster Hierarchy:** Organize technical documentation and content hubs into Pillar $\to$ Hub $\to$ Leaf structures.
3. **Guard Sibling Link Purity:** Maintain clean internal link equity flow by linking lateral siblings within the same sub-cluster.

> [!TIP]
> To verify topic cluster integrity, canonical routing, and internal link thresholds across your entire codebase, refer to the **100-Point Master Production Checklist** in Appendix A.
