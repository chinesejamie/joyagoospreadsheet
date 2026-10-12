// components/ProductGrid.tsx – server component. The sheet as a card grid.
import Link from 'next/link';
import type { FindRow } from '@/lib/finds';
import ProductCard from './ProductCard';

export default function ProductGrid({ rows, label }: { rows: FindRow[]; label?: string }) {
  if (!rows.length) {
    return (
      <p className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-600">
        No finds match this filter yet. <Link href="/joyagoo-spreadsheet" className="underline">Open the JoyaGoo Spreadsheet</Link>.
      </p>
    );
  }
  return (
    <section aria-label={label ?? 'Finds'} className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {rows.map((r) => <ProductCard key={r.mongoId} row={r} />)}
    </section>
  );
}
