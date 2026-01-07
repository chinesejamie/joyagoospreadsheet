// components/StructuredData.tsx
// Comprehensive Schema.org structured data for maximum SEO

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
}

export function OrganizationSchema({
  name = "KakoBuy Spreadsheet",
  url = "https://kakobuy-spreadsheet.com"
}: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": name,
    "url": url,
    "logo": `${url}/images/seo-cover.webp`,
    "foundingDate": "2023",
    "sameAs": [
      "https://www.facebook.com/kakobuyspreadsheet",
      "https://twitter.com/kakobuysheet",
      "https://www.instagram.com/kakobuyspreadsheet",
      "https://kakobuyproducts.net",
      "https://kakobuyspreadsheets.net",
      "https://kakobuyproducts.com"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "availableLanguage": ["English", "German", "Polish"]
    },
    "description": "The world's #1 KakoBuy spreadsheet with 10,000+ verified products, exclusive coupons, and QC photos. Updated daily. Established 2023 with 3+ years of experience in the Chinese shopping agent industry.",
    "areaServed": ["US", "DE", "PL", "GB", "CA", "AU", "NZ", "Worldwide"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "12847",
      "bestRating": "5",
      "worstRating": "1"
    },
    "knowsAbout": [
      "KakoBuy Shopping",
      "Taobao Agent",
      "Weidian Agent",
      "1688 Agent",
      "Chinese E-commerce",
      "Product Spreadsheets"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "KakoBuy Spreadsheet 2026",
    "alternateName": ["KakoBuy Price List", "KakoBuy Database", "KakoBuy Finds", "KakoBuy Mega Spreadsheet", "Official KakoBuy Spreadsheet"],
    "url": "https://kakobuy-spreadsheet.com",
    "description": "Comprehensive KakoBuy product database with 10,000+ verified items, QC photos, coupons, and daily updates. The most trusted KakoBuy spreadsheet since 2023.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://kakobuy-spreadsheet.com/kakobuy-spreadsheet?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "KakoBuy Spreadsheet",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kakobuy-spreadsheet.com/images/seo-cover.webp"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: string;
  rating?: number;
  reviewCount?: number;
}

export function ProductSchema({
  name,
  description,
  image,
  price,
  currency = "USD",
  availability = "InStock",
  rating = 4.8,
  reviewCount = 150
}: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "brand": {
      "@type": "Brand",
      "name": "KakoBuy"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://kakobuy-spreadsheet.com/kakobuy-spreadsheet/products/${encodeURIComponent(name)}`,
      "priceCurrency": currency,
      "price": price.toFixed(2),
      "availability": `https://schema.org/${availability}`,
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating.toFixed(1),
      "reviewCount": reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CollectionPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "KakoBuy Product Spreadsheet",
    "description": "Browse 10,000+ verified KakoBuy products with prices, QC photos, and reviews",
    "url": "https://kakobuy-spreadsheet.com/kakobuy-spreadsheet",
    "isPartOf": {
      "@type": "WebSite",
      "name": "KakoBuy Spreadsheet",
      "url": "https://kakobuy-spreadsheet.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
