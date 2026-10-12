// app/api/products/route.ts
// Public listing API. Same rules as the sheet (LISTABLE_QUERY, boost order)
// via getFinds; returns only table rows, no database internals.

import { NextRequest, NextResponse } from 'next/server';
import { getFinds } from '@/lib/finds';
import { categoryBySlug } from '@/lib/categories';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const search = (sp.get('search') ?? '').trim().slice(0, 100) || undefined;
  const rawCategory = sp.get('category');
  const category = rawCategory && categoryBySlug(rawCategory) ? rawCategory.toLowerCase() : null;
  const creator = sp.get('creatorName')?.trim() || null;
  const page = Math.max(1, parseInt(sp.get('page') ?? '1', 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(sp.get('limit') ?? '50', 10) || 50));
  const rawSort = sp.get('sort');
  const sort = rawSort === 'newest' || rawSort === 'popular' ? rawSort : 'boost';

  try {
    const { rows, total, pages } = await getFinds({ search, category, creator, page, limit, sort });
    return NextResponse.json(
      { products: rows, total, page, pages },
      { headers: { 'Cache-Control': 'public, max-age=300' } },
    );
  } catch (err) {
    console.error('GET /api/products failed:', err);
    return NextResponse.json({ message: 'Failed to load products' }, { status: 500 });
  }
}
