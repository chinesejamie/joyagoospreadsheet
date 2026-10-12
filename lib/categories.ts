// lib/categories.ts
// Public category slugs → raw values in the shared productList collection.
// Raw values are chaotic (casing, DE/ES variants, "Not Assigned" ≈ 31 %), so
// every count, chip, filter and category page must go through this map.
// Counts read on 2026-10-12 are in the comments; re-check after imports.

export interface CategoryDef {
  slug: string;
  name: string;
  dbValues: string[];
}

export const CATEGORIES: CategoryDef[] = [
  { slug: 'shoes',       name: 'Shoes',       dbValues: ['Shoes', 'shoes', 'Zapatos', 'Schuhe'] },                // ~1,530
  { slug: 't-shirts',    name: 'T-Shirts',    dbValues: ['T-Shirts', 'tShirts', 'T', 'camisetas', 'Polos'] },     // ~1,430
  { slug: 'pants',       name: 'Pants & Shorts', dbValues: ['Pants', 'pants', 'Pantalones', 'Shorts', 'shorts'] }, // ~750
  { slug: 'hoodies',     name: 'Hoodies & Zips', dbValues: ['Hoodies', 'hoodies', 'Zipper', 'Crewneck'] },      // ~485
  { slug: 'accessories', name: 'Accessories', dbValues: ['Accessories', 'accessories', 'Accesorios', 'Zubehör', 'Hats', 'Watch', 'Watches'] }, // ~625
  { slug: 'jackets',     name: 'Jackets',     dbValues: ['Jackets'] },                                            // ~180
  { slug: 'tracksuits',  name: 'Tracksuits',  dbValues: ['Tracksuits', 'tracksuits', 'Chándales'] },              // ~103
  { slug: 'jerseys',     name: 'Jerseys',     dbValues: ['Jerseys', 'jerseys'] },                                 // ~84
  { slug: 'electronics', name: 'Electronics', dbValues: ['Electronics', 'Consumer Electronics', 'apple'] },       // ~31
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

export function categoryBySlug(slug?: string | null): CategoryDef | null {
  if (!slug) return null;
  return CATEGORIES.find((c) => c.slug === slug.toLowerCase()) ?? null;
}

// Mongo filter for a public slug (exact raw values, no regex → index-friendly).
export function categoryFilter(slug?: string | null): Record<string, unknown> | null {
  const def = categoryBySlug(slug);
  return def ? { category: { $in: def.dbValues } } : null;
}

// Raw DB value → public category, or null for junk ("Not Assigned", "", "Example", "Verified Finds").
export function categoryForRaw(raw?: string | null): CategoryDef | null {
  if (!raw) return null;
  const needle = raw.trim();
  return CATEGORIES.find((c) => c.dbValues.some((v) => v.toLowerCase() === needle.toLowerCase())) ?? null;
}
