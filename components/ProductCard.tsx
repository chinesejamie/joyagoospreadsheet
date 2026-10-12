// components/ProductCard.tsx – server component.
// One find as a card: photo, name, seller, price (CNY ≈ EUR/USD), category,
// "Sponsored" badge for paid placements, link to the product page and a
// direct "Open on JoyaGoo" link with our invite code (rel="sponsored").

import Image from 'next/image';
import Link from 'next/link';
import type { FindRow } from '@/lib/finds';
import { AGENT_LINK_REL } from '@/lib/site';

function money(n: number, cur: 'eur' | 'usd'): string {
  const v = n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return cur === 'eur' ? `€${v}` : `$${v}`;
}

export default function ProductCard({ row }: { row: FindRow }) {
  return (
    <article className={`group flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${row.sponsored ? 'border-primary-300 ring-1 ring-primary-200' : 'border-gray-200'}`}>
      <Link href={row.path} className="relative block aspect-square w-full overflow-hidden bg-gray-100">
        {row.image ? (
          <Image
            src={row.image}
            alt={row.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            unoptimized={row.image.startsWith('/')}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-xs text-gray-400">no photo yet</span>
        )}
        <div className="absolute left-0 top-0 flex w-full justify-between p-2">
          {row.sponsored ? (
            <span className="rounded bg-gray-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary-300">Sponsored</span>
          ) : <span />}
          {row.purchased > 10 ? (
            <span className="rounded bg-white/90 px-2 py-0.5 text-[10px] font-medium text-gray-700 shadow-sm">{row.purchased} orders</span>
          ) : null}
        </div>
        <span className="absolute bottom-2 right-2 rounded-full bg-white px-3 py-1 text-sm font-bold text-gray-900 shadow-sm">
          ¥{Math.round(row.priceCny).toLocaleString('en-US')}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-tight text-gray-900">
          <Link href={row.path} className="hover:text-primary-800">{row.name}</Link>
        </h3>
        <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
          <span className="truncate">by {row.creatorName || 'unknown'}</span>
          <span className="whitespace-nowrap">≈ {money(row.priceEur, 'eur')}</span>
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {row.categoryName ? (
            <Link href={`/joyagoo-spreadsheet?category=${row.categorySlug}`} className="hover:underline">{row.categoryName}</Link>
          ) : <span>{row.store}</span>}
        </div>
        <div className="mt-auto pt-3">
          {row.joyagooUrl ? (
            <a
              href={row.joyagooUrl}
              target="_blank"
              rel={AGENT_LINK_REL}
              className="block w-full rounded-lg bg-primary-500 px-3 py-2 text-center text-xs font-bold text-gray-900 hover:bg-primary-600"
            >
              Open on JoyaGoo
            </a>
          ) : (
            <Link href={row.path} className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-xs font-semibold text-gray-900 hover:bg-gray-50">
              Details
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
