// app/joyagoo-spreadsheet/products/[creatorName]/[productName]/page.tsx

import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import Product, { IProduct } from '@/models/Product';
import { Types } from 'mongoose';
import Image from 'next/image';
import type { Metadata } from 'next';
import BuyNowButton from '@/components/BuyNowButton';
import { ProductSchema, BreadcrumbSchema } from '@/components/StructuredData';

// Helper function to escape special regex characters
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Truncate string for filesystem-safe paths (max 100 chars to stay under OS limits)
function truncateForPath(str: string, maxLength = 100): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength);
}

export async function generateStaticParams() {
  await connectToDatabase();
  const products = await Product.find({}, { creatorName: 1, id: 1, slug: 1, name: 1, _id: 1 }).lean();

  return products.map((product: any) => ({
    creatorName: encodeURIComponent(product.creatorName),
    productName: encodeURIComponent(
      product.slug ||
      product.id ||
      truncateForPath(product.name?.toLowerCase().replace(/\s+/g, '-') || String(product._id))
    ),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ creatorName: string; productName: string }>;
}): Promise<Metadata> {
  const { creatorName: encCreator, productName: encProduct } = await params;
  const creatorName = decodeURIComponent(encCreator);
  const productName = decodeURIComponent(encProduct);

  await connectToDatabase();
  // Use case-insensitive regex queries
  let product = await Product.findOne({
    creatorName: { $regex: new RegExp(`^${escapeRegExp(creatorName)}$`, 'i') },
    $or: [
      { slug: { $regex: new RegExp(`^${escapeRegExp(productName)}$`, 'i') } },
      { id: { $regex: new RegExp(`^${escapeRegExp(productName)}$`, 'i') } },
      { name: { $regex: new RegExp(`^${escapeRegExp(productName)}$`, 'i') } },
    ],
  }).lean();

  // Fallback: if productName is truncated (100 chars), try prefix match
  if (!product && productName.length >= 100) {
    product = await Product.findOne({
      creatorName: { $regex: new RegExp(`^${escapeRegExp(creatorName)}$`, 'i') },
      name: { $regex: new RegExp(`^${escapeRegExp(productName)}`, 'i') },
    }).lean();
  }

  if (!product) return {};

  const usdPrice = (product.price * 0.14).toFixed(2);
  const seoTitle = `${product.name} - $${usdPrice} | JoyaGoo Spreadsheet ${new Date().getFullYear()}`;
  const seoDescription = `Buy ${product.name} on JoyaGoo. Best price: $${usdPrice} USD (¥${product.price} CNY). ${
    product.description?.slice(0, 140) || 'Verified seller, quality guaranteed.'
  } Free JoyaGoo Spreadsheet.`;
  const imageUrl =
    product.images?.[0] && typeof product.images[0] === 'string'
      ? product.images[0]
      : product.images?.[0]?.url || '/images/default-product.jpg';

  return {
    title: seoTitle,
    description: seoDescription,
    metadataBase: new URL('https://joyagoospreadsheet.com'),
    keywords: [
      'joyagoo spreadsheet',
      `${product.name}`,
      `${product.name} joyagoo`,
      `${creatorName} joyagoo`,
      'joyagoo price list',
      'joyagoo product',
      `${product.category || 'product'} joyagoo`,
      'joyagoo spreadsheet 2026',
      'buy on joyagoo',
      'joyagoo verified seller',
    ],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.name || 'Product image',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/joyagoo-spreadsheet/products/${encCreator}/${encProduct}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ creatorName: string; productName: string }>;
}) {
  const { creatorName: encCreator, productName: encProduct } = await params;
  const creatorName = decodeURIComponent(encCreator);
  const productName = decodeURIComponent(encProduct);

  await connectToDatabase();

  // Update the query to be case-insensitive
  let product = (await Product.findOne({
    creatorName: { $regex: new RegExp(`^${escapeRegExp(creatorName)}$`, 'i') },
    $or: [
      { slug: { $regex: new RegExp(`^${escapeRegExp(productName)}$`, 'i') } },
      { id: { $regex: new RegExp(`^${escapeRegExp(productName)}$`, 'i') } },
      { name: { $regex: new RegExp(`^${escapeRegExp(productName)}$`, 'i') } },
    ],
  })
    .lean()) as unknown as IProduct & { _id: Types.ObjectId } | null;

  // Fallback: if productName is truncated (100 chars), try prefix match
  if (!product && productName.length >= 100) {
    product = (await Product.findOne({
      creatorName: { $regex: new RegExp(`^${escapeRegExp(creatorName)}$`, 'i') },
      name: { $regex: new RegExp(`^${escapeRegExp(productName)}`, 'i') },
    })
      .lean()) as unknown as IProduct & { _id: Types.ObjectId } | null;
  }

  if (!product) notFound();

  await Product.updateOne(
    { _id: product._id },
    { $inc: { viewCount: 1 } }
  ).catch((err) => console.error('Error updating view count:', err));


  const usdPrice = (product.price * 0.14).toFixed(2);
  const mainImage =
    product.images?.[0] && typeof product.images[0] === 'string'
      ? product.images[0]
      : product.images?.[0]?.url || '/images/default-product.jpg';

  const linkToJoyaGoo = product.link
    ? `https://www.joyagoo.com/product?url=${encodeURI(
        product.link
      )}&ref=300000171`
    : null;

  // Breadcrumb data
  const breadcrumbs = [
    { name: 'Home', url: 'https://joyagoospreadsheet.com' },
    { name: 'JoyaGoo Spreadsheet', url: 'https://joyagoospreadsheet.com/joyagoo-spreadsheet' },
    { name: product.name || 'Product', url: `https://joyagoospreadsheet.com/joyagoo-spreadsheet/products/${encodeURIComponent(product.creatorName)}/${encodeURIComponent(product.name)}` },
  ];

  return (
    <div className="container mx-auto py-8 bg-white">
      {/* Schema.org Product structured data */}
      <ProductSchema
        name={product.name || 'JoyaGoo Product'}
        description={product.description || `Buy ${product.name} on JoyaGoo. Verified seller with quality guarantee.`}
        image={mainImage}
        price={parseFloat(usdPrice)}
        currency="USD"
        rating={4.8}
        reviewCount={product.purchased || 150}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <div className="rounded-lg overflow-hidden h-96 w-full relative">
              <Image
                src={mainImage}
                alt={
                  product.name
                    ? `${product.name} - JoyaGoo Spreadsheet`
                    : 'JoyaGoo Spreadsheet Product'
                }
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name || 'JoyaGoo Spreadsheet Product'}
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              Creator: <span className="font-semibold">{product.creatorName}</span>
            </p>

            <div className="mt-4">
              <span className="text-2xl font-bold text-gray-900">${usdPrice}</span>
              <span className="text-sm text-gray-500 ml-2">USD</span>
              <span className="text-sm text-gray-500 ml-2">
                (¥{product.price} CNY)
              </span>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Product Description
              </h2>
              <p className="text-gray-700">
                {product.description ||
                  'Explore this product on JoyaGoo Spreadsheet for detailed information and pricing.'}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Spreadsheet Details
              </h2>
              <div className="flex flex-col space-y-2">
                <DetailRow label="Store" value={product.store} />
                <DetailRow label="Category" value={product.category} />
                <DetailRow label="Views" value={product.viewCount} />
                <DetailRow
                  label="Purchases"
                  value={`${product.purchased || 0} times`}
                />
              </div>
            </div>

            {linkToJoyaGoo && (
              <div className="mt-8">
                <BuyNowButton
                  creatorName={product.creatorName}
                  productId={product._id.toString()}
                  href={linkToJoyaGoo}
                />
              </div>
            )}
          </div>
        </div>

        {product.images && product.images.length > 1 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Product Gallery
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {product.images.slice(1).map((img, index) => {
                const src = typeof img === 'string' ? img : img.url;
                return (
                  <div
                    key={index}
                    className="h-48 rounded-lg overflow-hidden relative"
                  >
                    <Image
                      src={src}
                      alt={`${product.name || 'JoyaGoo Product'} - Image ${
                        index + 2
                      }`}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-300"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="flex">
      <span className="w-24 text-gray-500">{label}:</span>
      <span className="text-gray-700">{value ?? 'N/A'}</span>
    </div>
  );
}
