// components/FindsTable.tsx
// Server component. The "sheet": a semantic table of finds. Used on the
// homepage (first rows) and on /joyagoo-spreadsheet (paginated). Each row
// links internally to the product page and externally to JoyaGoo with our
// invite code (rel="sponsored"). Boosted rows are labelled "Sponsored".

import Image from 'next/image';
import Link from 'next/link';
import type { FindRow } from '@/lib/finds';
import { AGENT_LINK_REL } from '@/lib/site';

interface Props {
  rows: FindRow[];
  startIndex?: number;        // row numbering offset for paginated pages
  showCategory?: boolean;
  compact?: boolean;          // homepage: fewer columns on mobile
  caption?: string;
}

function fmt(n: number, cur: 'eur' | 'usd' | 'cny'): string {
  if (cur === 'cny') return `¥${Math.round(n).toLocaleString('en-US')}`;
  const v = n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return cur === 'eur' ? `€${v}` : `$${v}`;
}

export default function FindsTable({ rows, startIndex = 0, showCategory = true, compact = false, caption }: Props) {
  if (!rows.length) {
    return (
      <p className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-600">
        No finds match this filter yet. <Link href="/joyagoo-spreadsheet" className="underline">Show all finds</Link>.
      </p>
    );
  }
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className={`w-full text-left text-sm ${compact ? "min-w-[440px]" : "min-w-[640px]"}`}>
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
          <tr>
            <th scope="col" className="px-3 py-2 w-10">#</th>
            <th scope="col" className="px-3 py-2">Find</th>
            {showCategory ? <th scope="col" className={`px-3 py-2 ${compact ? 'hidden md:table-cell' : ''}`}>Category</th> : null}
            <th scope="col" className="px-3 py-2 whitespace-nowrap">Price</th>
            <th scope="col" className={`px-3 py-2 ${compact ? 'hidden sm:table-cell' : ''}`}>Store</th>
            <th scope="col" className="px-3 py-2 text-right">Link</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((r, i) => (
            <tr key={r.mongoId} className={r.sponsored ? 'bg-primary-50/40' : 'hover:bg-gray-50'}>
              <td className="px-3 py-2 align-top text-gray-400">{startIndex + i + 1}</td>
              <td className="px-3 py-2 align-top">
                <div className="flex items-start gap-3">
                  <Link href={r.path} className="relative block h-12 w-12 flex-none overflow-hidden rounded bg-gray-100">
                    {r.image ? (
                      <Image src={r.image} alt={r.name} fill sizes="48px" className="object-cover" unoptimized={r.image.startsWith('/')} />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-[10px] text-gray-400">no photo</span>
                    )}
                  </Link>
                  <div className="min-w-0">
                    <Link href={r.path} className="block font-medium text-gray-900 hover:underline line-clamp-2">{r.name}</Link>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-gray-500">
                      <span>by {r.creatorName || 'unknown'}</span>
                      {r.sponsored ? <span className="rounded bg-gray-900 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-300">Sponsored</span> : null}
                      {r.purchased > 10 ? <span>{r.purchased} orders via this sheet</span> : null}
                    </div>
                  </div>
                </div>
              </td>
              {showCategory ? (
                <td className={`px-3 py-2 align-top text-gray-700 ${compact ? 'hidden md:table-cell' : ''}`}>
                  {r.categorySlug ? <Link href={`/joyagoo-spreadsheet?category=${r.categorySlug}`} className="hover:underline">{r.categoryName}</Link> : <span className="text-gray-400">—</span>}
                </td>
              ) : null}
              <td className="px-3 py-2 align-top whitespace-nowrap">
                <div className="font-semibold text-gray-900">{fmt(r.priceCny, 'cny')}</div>
                <div className="text-xs text-gray-500">≈ {fmt(r.priceEur, 'eur')} · {fmt(r.priceUsd, 'usd')}</div>
              </td>
              <td className={`px-3 py-2 align-top text-gray-700 ${compact ? 'hidden sm:table-cell' : ''}`}>{r.store}</td>
              <td className="px-3 py-2 align-top text-right whitespace-nowrap">
                {r.joyagooUrl ? (
                  <a href={r.joyagooUrl} target="_blank" rel={AGENT_LINK_REL} className="inline-block rounded-md bg-primary-500 px-3 py-1.5 text-xs font-bold text-gray-900 hover:bg-primary-600">
                    Open on JoyaGoo
                  </a>
                ) : (
                  <Link href={r.path} className="text-xs underline">Details</Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
