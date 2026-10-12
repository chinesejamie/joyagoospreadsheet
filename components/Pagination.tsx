// components/Pagination.tsx
// Server component. Plain crawlable links (?page=N plus the other params),
// no client router, no useSearchParams.

import Link from 'next/link';

interface Props {
  currentPage: number;
  totalPages: number;
  basePath: string;
  params?: Record<string, string>;
}

function hrefFor(basePath: string, params: Record<string, string>, page: number): string {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (k !== 'page' && v) qs.set(k, v);
  }
  if (page > 1) qs.set('page', String(page));
  const s = qs.toString();
  return s ? `${basePath}?${s}` : basePath;
}

export default function Pagination({ currentPage, totalPages, basePath, params = {} }: Props) {
  if (totalPages <= 1) return null;

  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const end = Math.min(totalPages, start + maxVisible - 1);
  start = Math.max(1, end - maxVisible + 1);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const base = 'rounded-md px-3 py-1.5 text-sm';
  const idle = `${base} bg-gray-100 text-gray-800 hover:bg-gray-200`;

  return (
    <nav aria-label="Pagination" className="mt-6 flex flex-col items-center gap-3">
      <div className="flex flex-wrap justify-center gap-2">
        {currentPage > 1 ? (
          <Link href={hrefFor(basePath, params, currentPage - 1)} rel="prev" className={idle}>
            ← Previous
          </Link>
        ) : null}
        {start > 1 ? (
          <>
            <Link href={hrefFor(basePath, params, 1)} className={idle}>1</Link>
            {start > 2 ? <span className="px-1 py-1.5 text-sm text-gray-400">…</span> : null}
          </>
        ) : null}
        {pages.map((p) =>
          p === currentPage ? (
            <span key={p} aria-current="page" className={`${base} bg-primary-500 font-semibold text-gray-900`}>
              {p}
            </span>
          ) : (
            <Link key={p} href={hrefFor(basePath, params, p)} className={idle}>
              {p}
            </Link>
          ),
        )}
        {end < totalPages ? (
          <>
            {end < totalPages - 1 ? <span className="px-1 py-1.5 text-sm text-gray-400">…</span> : null}
            <Link href={hrefFor(basePath, params, totalPages)} className={idle}>{totalPages}</Link>
          </>
        ) : null}
        {currentPage < totalPages ? (
          <Link href={hrefFor(basePath, params, currentPage + 1)} rel="next" className={idle}>
            Next →
          </Link>
        ) : null}
      </div>
      <p className="text-xs text-gray-500">
        Page {currentPage} of {totalPages}
      </p>
    </nav>
  );
}
