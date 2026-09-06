# Chapter 4: Semantic Graph Architecture & Structured Data (JSON-LD)

> *"Keywords are strings. Entities are things. Google indexes things, not strings."*

---

## 1. Moving Beyond Isolated Schema Tags to Unified Entity Graphs

Most developers implement structured data incorrectly: they paste multiple separate `<script type="application/ld+json">` tags onto a page—one for the Article, one for the Organization, and one for the Breadcrumbs.

To Google’s parser, these appear as disconnected data islands.

The modern standard is to construct a **Unified Entity Graph** using JSON-LD’s `@graph` array. Every entity (Company, Author, Article, WebPage) is declared with an explicit `@id` URI, creating an interconnected knowledge mesh:

```
[ Organization (@id: #org) ] 
       │ (publisher)
       ▼
[ Article (@id: #article) ] ◄── (author) ── [ Person / Author (@id: #author) ]
       │ (isPartOf)                                │ (sameAs: Wikidata, GitHub)
       ▼
[ WebPage (@id: #webpage) ]
       │ (breadcrumb)
       ▼
[ BreadcrumbList (@id: #breadcrumb) ]
```

---

## 2. Entity Disambiguation via Wikidata & `sameAs`

Google connects websites to its global Knowledge Graph using unambiguous entity identifiers. 

If your author's name is "John Smith", Google has no idea which of the 100,000 John Smiths authored the code. By adding `sameAs` links pointing to canonical Wikidata entities, Wikipedia pages, or verified GitHub profiles, you achieve **100% Entity Disambiguation**:

```json
{
  "@type": "Person",
  "@id": "https://yourdomain.com/#author-alex",
  "name": "Alex Mercer",
  "jobTitle": "Principal Systems Architect",
  "sameAs": [
    "https://www.wikidata.org/wiki/Q115862841",
    "https://github.com/alexmercer",
    "https://www.linkedin.com/in/alexmercer"
  ]
}
```

---

## 3. Production Code: The Unified Schema Graph Component

Here is a production-ready, TypeScript-typed Entity Graph for technical blogs, software documentation, and architectural guides:

```tsx
export function TechnicalArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  authorUrl
}: SchemaProps) {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://yourdomain.com/#organization",
        "name": "Acme Web Systems",
        "url": "https://yourdomain.com",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://yourdomain.com/#logo",
          "url": "https://yourdomain.com/logo.png"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        "url": url,
        "name": title,
        "isPartOf": { "@id": "https://yourdomain.com/#website" }
      },
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        "isPartOf": { "@id": `${url}#webpage` },
        "headline": title,
        "description": description,
        "datePublished": datePublished,
        "dateModified": dateModified,
        "mainEntityOfPage": `${url}#webpage`,
        "publisher": { "@id": "https://yourdomain.com/#organization" },
        "author": {
          "@type": "Person",
          "name": authorName,
          "url": authorUrl
        },
        "inLanguage": "en-US"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}
```

<div class="callout callout-tip">
  <strong>Engineering Pro Tip:</strong> Always validate your output using both the official <strong>Schema.org Validator</strong> (validator.schema.org) and the <strong>Google Rich Results Test</strong>. Rich Results Test verifies Google feature eligibility, while Schema.org Validator verifies semantic graph correctness.
</div>
