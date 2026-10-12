// app/articles/_components/ArticleShell.tsx
// Shared frame for every article: breadcrumb, H1, byline with real dates,
// Article + Breadcrumb schema, disclosure and related articles.
import Link from 'next/link';
import { ArticleSchema, BreadcrumbSchema } from '@/components/StructuredData';
import Disclosure from '@/components/Disclosure';
import RelatedArticles from '@/components/relatedArticles';
import { SITE_URL, AUTHOR_NAME, AUTHOR_URL } from '@/lib/site';
import { getArticle, articleUrl, formatDate } from '@/content/articles';

export default function ArticleShell({
  slug,
  lead,
  children,
}: {
  slug: string;
  lead?: React.ReactNode;
  children: React.ReactNode;
}) {
  const a = getArticle(slug);
  const url = articleUrl(slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <ArticleSchema
        headline={a.title}
        description={a.description}
        url={url}
        datePublished={a.datePublished}
        dateModified={a.dateModified}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Articles', url: `${SITE_URL}/articles` },
          { name: a.title, url },
        ]}
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/articles" className="hover:text-gray-900">Articles</Link>
      </nav>

      <header className="mb-8 border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{a.title}</h1>
        {lead ? <div className="mt-4 text-lg text-gray-700">{lead}</div> : null}
        <p className="mt-4 text-sm text-gray-600">
          By <a href={AUTHOR_URL} className="font-semibold underline underline-offset-2">{AUTHOR_NAME}</a>
          {' · '}Published <time dateTime={a.datePublished}>{formatDate(a.datePublished)}</time>
          {' · '}Last reviewed <time dateTime={a.dateModified}>{formatDate(a.dateModified)}</time>
        </p>
        <Disclosure className="mt-2 text-xs text-gray-500" />
      </header>

      <div className="article-body space-y-5 text-[17px] leading-relaxed text-gray-800 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-gray-900 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>

      <RelatedArticles currentSlug={slug} />
    </div>
  );
}

// "Source: … (read 12 Oct 2026)" line under a factual statement.
export function Source({ href, label, read = '12 Oct 2026' }: { href: string; label: string; read?: string }) {
  return (
    <p className="text-sm text-gray-500">
      Source:{' '}
      <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
        {label}
      </a>{' '}
      (read {read})
    </p>
  );
}
