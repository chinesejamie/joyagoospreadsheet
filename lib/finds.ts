// lib/finds.ts
// Data layer for the sheet. Server-only (Mongoose). Every page that lists
// finds uses these helpers so the listing rule, the boost order, the image
// fallback and the product URL are identical everywhere.

import connectToDatabase from './mongodb';
import Product from '@/models/Product';
import { buildJoyaGooLink } from './joyagooLink';
import { BOOST_PAGE_ID, CNY_TO_EUR, CNY_TO_USD } from './site';
import { categoryFilter, categoryForRaw } from './categories';

export interface FindRow {
  id: string;            // marketplace item id (or _id fallback) – used in the URL
  mongoId: string;
  name: string;
  creatorName: string;
  store: string;         // Weidian | Taobao | 1688 | Unknown
  categorySlug: string | null;
  categoryName: string | null;
  priceCny: number;
  priceEur: number;
  priceUsd: number;
  image: string | null;  // first usable image, null → UI shows placeholder
  imageCount: number;
  purchased: number;
  viewCount: number;
  sponsored: boolean;    // has an active paid boost on this site
  createdAt: string | null;
  joyagooUrl: string | null;
  path: string;          // internal product page path
}

// Only rows a reader can act on: a name, a positive price, not hidden, a link.
// Also drops obviously unusable rows (bare "Replica"/"1:1" names, empty names).
export const LISTABLE_QUERY: Record<string, unknown> = {
  hidden: { $ne: true },
  price: { $gt: 0 },
  link: { $type: 'string', $ne: '' },
  name: { $type: 'string', $regex: /\S{2,}/ },
  $nor: [{ name: { $regex: /^\s*(replica|rep|1:1)\b/i } }],
};

// Image paths under /assets/productImages/ are dead on the file server
// (checked 2026-10-12, HTTP 404); /uploads/ and /assets/images/ are alive.
const DEAD_IMAGE_PREFIXES = ['/assets/productImages/'];

export function imageUrlOf(img: unknown): string | null {
  const raw = typeof img === 'string' ? img : (img as { url?: string } | null)?.url;
  if (!raw || typeof raw !== 'string') return null;
  const u = raw.trim();
  if (!u) return null;
  if (DEAD_IMAGE_PREFIXES.some((p) => u.startsWith(p))) return null;
  if (u.startsWith('/') || u.startsWith('https://')) return u;
  if (u.startsWith('http://')) return u.replace(/^http:\/\//, 'https://');
  return null;
}

export function usableImages(images: unknown): string[] {
  if (!Array.isArray(images)) return [];
  const out: string[] = [];
  for (const img of images) {
    const u = imageUrlOf(img);
    if (u && !out.includes(u)) out.push(u);
  }
  return out;
}

export function productId(p: { id?: string; _id?: unknown }): string {
  return (p.id && String(p.id).trim()) || String(p._id);
}

export function productPath(p: { id?: string; _id?: unknown; creatorName?: string }): string {
  return `/joyagoo-spreadsheet/products/${encodeURIComponent(p.creatorName ?? 'unknown')}/${encodeURIComponent(productId(p))}`;
}

function hasActiveBoost(p: any, now: Date): boolean {
  if (!Array.isArray(p.boosts)) return false;
  return p.boosts.some(
    (b: any) => b && String(b.boostPage) === BOOST_PAGE_ID && b.validUntil && new Date(b.validUntil) > now,
  );
}

export function toRow(p: any, now = new Date()): FindRow {
  const imgs = usableImages(p.images);
  const cat = categoryForRaw(p.category);
  const priceCny = Number(p.price) || 0;
  return {
    id: productId(p),
    mongoId: String(p._id),
    name: String(p.name ?? '').trim(),
    creatorName: String(p.creatorName ?? ''),
    store: String(p.store ?? 'Unknown'),
    categorySlug: cat?.slug ?? null,
    categoryName: cat?.name ?? null,
    priceCny,
    priceEur: Math.round(priceCny * CNY_TO_EUR * 100) / 100,
    priceUsd: Math.round(priceCny * CNY_TO_USD * 100) / 100,
    image: imgs[0] ?? null,
    imageCount: imgs.length,
    purchased: Number(p.purchased) || 0,
    viewCount: Number(p.viewCount) || 0,
    sponsored: hasActiveBoost(p, now),
    createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : (typeof p.createdAt === 'string' ? p.createdAt : null),
    joyagooUrl: buildJoyaGooLink(p.link),
    path: productPath(p),
  };
}

const ROW_PROJECTION = {
  name: 1, price: 1, link: 1, category: 1, images: 1, store: 1, id: 1, creatorName: 1,
  viewCount: 1, purchased: 1, boosts: 1, createdAt: 1,
};

export interface FindsQuery {
  search?: string;
  category?: string | null;   // public slug
  creator?: string | null;
  page?: number;              // 1-based
  limit?: number;
  sort?: 'boost' | 'newest' | 'popular';
}

function buildMatch(q: FindsQuery): Record<string, unknown> {
  const match: Record<string, unknown> = { ...LISTABLE_QUERY };
  const cf = categoryFilter(q.category);
  if (cf) Object.assign(match, cf);
  if (q.creator) match.creatorName = q.creator;
  if (q.search && q.search.trim()) {
    const rx = new RegExp(q.search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    match.$and = [{ $or: [{ name: rx }, { creatorName: rx }, { id: rx }] }];
  }
  return match;
}

// Boost-first ordering (sellers pay for placement on this site), then newest.
function boostStages(now: Date) {
  return [
    {
      $addFields: {
        boostTotal: {
          $sum: {
            $map: {
              input: {
                $filter: {
                  input: { $ifNull: ['$boosts', []] },
                  as: 'b',
                  cond: { $and: [{ $eq: ['$$b.boostPage', BOOST_PAGE_ID] }, { $gt: ['$$b.validUntil', now] }] },
                },
              },
              as: 'v',
              in: { $ifNull: ['$$v.amount', 0] },
            },
          },
        },
      },
    },
  ];
}

export async function getFinds(q: FindsQuery = {}): Promise<{ rows: FindRow[]; total: number; page: number; pages: number }> {
  await connectToDatabase();
  const now = new Date();
  const limit = Math.min(Math.max(q.limit ?? 50, 1), 200);
  const page = Math.max(q.page ?? 1, 1);
  const match = buildMatch(q);
  const sort: Record<string, 1 | -1> =
    q.sort === 'newest' ? { _id: -1 }
    : q.sort === 'popular' ? { purchased: -1, viewCount: -1, _id: -1 }
    : { boostTotal: -1, _id: -1 };

  const [docs, total] = await Promise.all([
    Product.aggregate([
      { $match: match },
      ...(q.sort === 'boost' || !q.sort ? boostStages(now) : []),
      { $sort: sort },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      { $project: ROW_PROJECTION },
    ]),
    Product.countDocuments(match),
  ]);
  return { rows: docs.map((d: any) => toRow(d, now)), total, page, pages: Math.max(1, Math.ceil(total / limit)) };
}

// Homepage mix: a few sponsored rows (mixed sellers) plus the newest listable
// finds, so the first screen is not one seller's wall.
export async function getHomepageRows(sponsoredCount = 8, newestCount = 16): Promise<FindRow[]> {
  await connectToDatabase();
  const now = new Date();
  const sponsoredDocs = await Product.aggregate([
    { $match: { ...LISTABLE_QUERY, boosts: { $elemMatch: { boostPage: BOOST_PAGE_ID, validUntil: { $gt: now } } } } },
    { $sample: { size: sponsoredCount * 3 } },
    { $project: ROW_PROJECTION },
  ]);
  // spread across creators
  const byCreator = new Map<string, any[]>();
  for (const d of sponsoredDocs) {
    const k = String(d.creatorName);
    if (!byCreator.has(k)) byCreator.set(k, []);
    byCreator.get(k)!.push(d);
  }
  const sponsored: any[] = [];
  while (sponsored.length < sponsoredCount && byCreator.size) {
    for (const [k, arr] of byCreator) {
      const d = arr.shift();
      if (d) sponsored.push(d);
      if (!arr.length) byCreator.delete(k);
      if (sponsored.length >= sponsoredCount) break;
    }
  }
  const seen = new Set(sponsored.map((d) => String(d._id)));
  const newest = await Product.find({ ...LISTABLE_QUERY, images: { $exists: true, $ne: [] } }, ROW_PROJECTION)
    .sort({ _id: -1 })
    .limit(newestCount + sponsored.length)
    .lean();
  const rows = [...sponsored, ...newest.filter((d: any) => !seen.has(String(d._id))).slice(0, newestCount)];
  return rows.map((d) => toRow(d, now)).filter((r) => r.image);
}

export async function getListableCount(): Promise<number> {
  await connectToDatabase();
  return Product.countDocuments(LISTABLE_QUERY);
}

export async function getLatestCreatedAt(): Promise<Date | null> {
  await connectToDatabase();
  const d: any = await Product.findOne({ ...LISTABLE_QUERY, createdAt: { $type: 'date' } }, { createdAt: 1 })
    .sort({ createdAt: -1 })
    .lean();
  return d?.createdAt instanceof Date ? d.createdAt : null;
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  await connectToDatabase();
  const agg = await Product.aggregate([
    { $match: LISTABLE_QUERY },
    { $group: { _id: '$category', n: { $sum: 1 } } },
  ]);
  const out: Record<string, number> = {};
  for (const g of agg) {
    const cat = categoryForRaw(g._id);
    if (cat) out[cat.slug] = (out[cat.slug] ?? 0) + g.n;
  }
  return out;
}

export async function getCreatorCount(): Promise<number> {
  await connectToDatabase();
  const r = await Product.distinct('creatorName', LISTABLE_QUERY);
  return r.filter(Boolean).length;
}

// Find one product by creator + id (preferred) or by legacy name/slug form.
export async function findProduct(creatorName: string, key: string): Promise<any | null> {
  await connectToDatabase();
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const creatorRx = new RegExp(`^${esc(creatorName)}$`, 'i');
  const byId = await Product.findOne({ creatorName: creatorRx, id: key }).lean();
  if (byId) return byId;
  if (/^[a-f0-9]{24}$/i.test(key)) {
    const byMongo = await Product.findOne({ _id: key, creatorName: creatorRx }).lean();
    if (byMongo) return byMongo;
  }
  const keyRx = new RegExp(`^${esc(key)}$`, 'i');
  return Product.findOne({ creatorName: creatorRx, $or: [{ slug: keyRx }, { name: keyRx }] }).lean();
}
