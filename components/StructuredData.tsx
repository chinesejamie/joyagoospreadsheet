// components/StructuredData.tsx
// Schema.org JSON-LD. Honest by design: no ratings, no offers, no brand
// claims on product pages, no sameAs without living profiles.
import {
  SITE_URL,
  SITE_NAME,
  CONTACT_EMAIL,
  AUTHOR_NAME,
  AUTHOR_URL,
  AGENT_NAME,
} from '@/lib/site';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': ORG_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/staticImages/JoyaGooSpreadSheet.webp`,
        email: CONTACT_EMAIL,
        description: `Independent, community-maintained ${AGENT_NAME} spreadsheet with finds, prices and buying guides. Not operated by or affiliated with ${AGENT_NAME}.`,
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_NAME,
        alternateName: [`${AGENT_NAME} Sheet`],
        url: SITE_URL,
        publisher: { '@id': ORG_ID },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/joyagoo-spreadsheet?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

interface FAQSchemaProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }}
    />
  );
}

export interface CollectionPageSchemaProps {
  name: string;
  description: string;
  url: string;
  itemUrls: string[];
}

export function CollectionPageSchema({ name, description, url, itemUrls }: CollectionPageSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name,
        description,
        url,
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: itemUrls.length,
          itemListElement: itemUrls.map((itemUrl, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: itemUrl,
          })),
        },
      }}
    />
  );
}

export interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
}

export function ArticleSchema({ headline, description, url, datePublished, dateModified, image }: ArticleSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline,
        description,
        url,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        datePublished,
        dateModified,
        ...(image ? { image } : {}),
        author: { '@type': 'Person', name: AUTHOR_NAME, url: AUTHOR_URL },
        publisher: { '@id': ORG_ID },
        isPartOf: { '@id': WEBSITE_ID },
      }}
    />
  );
}

export interface ItemPageSchemaProps {
  name: string;
  url: string;
  image?: string;
}

export function ItemPageSchema({ name, url, image }: ItemPageSchemaProps) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ItemPage',
        name,
        url,
        ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: image } } : {}),
        isPartOf: { '@id': WEBSITE_ID },
      }}
    />
  );
}
