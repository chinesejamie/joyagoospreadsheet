// components/relatedArticles.tsx
// Links to the other articles in the registry (content/articles.ts).
import Link from 'next/link';
import articles, { formatDate } from '@/content/articles';

export default function RelatedArticles({ currentSlug }: { currentSlug?: string }) {
  const others = articles.filter((a) => a.slug !== currentSlug);
  if (others.length === 0) return null;

  return (
    <section className="mt-12 border-t border-gray-200 pt-8" aria-labelledby="related-articles">
      <h2 id="related-articles" className="mb-4 text-xl font-bold text-gray-900">More guides</h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {others.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}`}
              className="block h-full rounded-xl border border-gray-200 bg-white p-4 transition hover:border-primary-500"
            >
              <span className="block font-semibold text-gray-900">{a.title}</span>
              <span className="mt-1 block text-sm text-gray-600">{a.description}</span>
              <span className="mt-2 block text-xs text-gray-500">Last reviewed {formatDate(a.dateModified)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
