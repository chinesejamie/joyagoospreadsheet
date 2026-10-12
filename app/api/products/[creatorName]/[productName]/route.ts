// app/api/products/[creatorName]/[productName]/route.ts
// One find as a table row (same shape as /api/products), or 404.

import { NextRequest, NextResponse } from 'next/server';
import { findProduct, toRow } from '@/lib/finds';

export const dynamic = 'force-dynamic';

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ creatorName: string; productName: string }> },
) {
  const { creatorName, productName } = await params;
  try {
    const product = await findProduct(safeDecode(creatorName), safeDecode(productName));
    if (!product || product.hidden === true || !(Number(product.price) > 0)) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(
      { product: toRow(product) },
      { headers: { 'Cache-Control': 'public, max-age=300' } },
    );
  } catch (err) {
    console.error('GET /api/products/[creator]/[product] failed:', err);
    return NextResponse.json({ message: 'Failed to load product' }, { status: 500 });
  }
}
