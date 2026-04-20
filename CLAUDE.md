# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application built with TypeScript that serves as a product spreadsheet/marketplace for JoyaGoo. It connects to MongoDB to manage product listings, implements view/purchase tracking, and includes features like "Finds of the Week", QC image galleries, and giveaway signup.

## Development Commands

```bash
# Start development server (uses Turbopack)
npm run dev
# Server runs on http://localhost:3010

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm lint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode disabled)
- **Styling**: Tailwind CSS v4 with custom theme
- **Database**: MongoDB with Mongoose ODM
- **Analytics**: Google Tag Manager (GTM-5Z56S4H7), TikTok Pixel, Vercel Speed Insights
- **Image Handling**: Next.js Image component with remote patterns

### Database Connection
- MongoDB connection uses singleton pattern with cached connections (`lib/mongodb.ts`)
- Connection is cached globally to prevent exhaustion in serverless environment
- Always use `connectToDatabase()` before any database operation
- Collection name is hardcoded as `'productList'` in Product model

### Product Model (`models/Product.ts`)
Key fields:
- `name`, `description`, `price` (CNY), `link`, `category`, `images[]`
- `creatorName`: The seller/creator identifier
- `viewCount`, `purchased`: Tracking metrics
- `purchaseHistory[]`: Array of purchase events with timestamps
- `findsOfTheWeekUntil`: Date field for featured products
- `boosts[]`: Paid promotion system (filtered by page ID)
- `hidden`: Boolean to hide products from listing

**Important**: Schema uses `strict: false` to allow flexible fields

### API Routes

**GET `/api/products`**
- Main product listing endpoint with search, filtering, and pagination
- Query params: `search`, `creatorName`, `category`, `page`, `limit`
- Uses MongoDB aggregation pipeline for:
  - Boost calculation (pageId: `6799584fbc65b3b31ece3bc6`)
  - Sorting by boost → purchases → views
  - CNY to USD conversion (rate: 0.14)
- Returns products with metadata about collection size

**POST `/api/products/purchase`**
- Increments purchase counter and adds to purchaseHistory
- Requires: `creatorName`, `productId`
- Updates both `purchased` counter and `purchaseHistory` array

**Other API routes**:
- `/api/finds-of-the-week`: Featured products
- `/api/giveaway-signup`: Newsletter/giveaway subscriptions
- `/api/qc-images`: QC (Quality Check) photo fetching
- `/api/report-dead-link`: Link reporting functionality
- `/api/products/[creatorName]/[productName]`: Individual product data

### Routing & Pages

**Main Pages**:
- `/` - Homepage with hero, features, testimonials, FAQ
- `/joyagoo-spreadsheet` - Main product listing (server-side rendered)
- `/joyagoo-spreadsheet/products/[creatorName]/[productName]` - Product detail pages
- `/articles/*` - Blog/article content
- `/features/*` - Special features (finds of the week, QC images, dead link reporting)

**Product Detail Pages**:
- Use `generateStaticParams()` for static generation
- Case-insensitive product/creator name matching via regex
- Auto-increment view count on page load
- Generate affiliate links with `ref=300000171`

### Special Sorting Logic

**Shoes Category**:
- Products with `creatorName` containing "manyouyisi" are sorted to the top
- Implemented in `/joyagoo-spreadsheet/page.tsx`

**General Sorting**:
1. Boost amount (highest first)
2. Purchase count (most purchased first)
3. View count (most viewed first)
4. _id (for consistency)

### Image Handling

- Remote images allowed from all HTTP/HTTPS URLs (`next.config.mjs`)
- Asset rewrites proxy to `localhost:4501` and `localhost:4200` in development
- Encrypted image URLs can be decrypted using `lib/cryptoUtils.ts`
- Default fallback: `/images/default-product.jpg`

### Environment Variables

Required:
- `MONGODB_URI` - MongoDB connection string
- `NEXT_PUBLIC_APP_URL` - Base URL (defaults to https://joyagoospreadsheet.com)

Optional:
- `AGENT_NAME` - Defaults to "JoyaGoo"
- `INVITE_URL` - Defaults to JoyaGoo registration URL
- `NEXT_PUBLIC_INVITE_URL` - Public facing invite URL
- `NEXT_PUBLIC_AGENT_NAME` - Public agent name

### Styling System

- Tailwind CSS v4 with inline theme configuration in `app/globals.css`
- Custom primary color palette (yellow-green based: #e3fc00)
- Custom animations: `cta-pop`, `page-fade-in`
- Uses Inter font from Google Fonts

### Content Management

- Markdown articles stored in `/content/articles/`
- Processed with `gray-matter`, `remark`, `remark-gfm`, `remark-html`
- Articles include: JoyaGoo reviews, legitimacy checks, coupons, how-to guides

## Development Guidelines

### When Adding New Products
1. Ensure MongoDB connection is established first
2. Price should be stored in CNY (will auto-convert to USD)
3. Always set `viewCount: 0` and `purchased: 0` for new products
4. Images array should contain URLs (strings) or objects with `url` property

### When Modifying Product Listing
- Remember the boost system affects sorting on specific page IDs
- CNY → USD conversion rate is hardcoded at 0.14
- "Shoes" category has special sorting logic for manyouyisi products
- Products can be hidden via `hidden: true` field

### When Working with Images
- All remote image URLs are allowed (security consideration)
- Use Next.js Image component with proper `sizes` attribute
- Handle both string URLs and objects with `.url` property
- Always provide fallback to default image

### API Response Patterns
- Use `NextResponse.json()` for all API responses
- Return 404 with descriptive message when no products found
- Include metadata about database state in responses (collection name, counts)

### TypeScript Notes
- `strict` mode is disabled globally
- Use type assertions for Mongoose lean() queries
- Product interface is exported from model file
- Server components use Promise-based searchParams (Next.js 15)

### Analytics & Tracking

**Google Tag Manager (GTM)**:
- GTM Container ID: `GTM-5Z56S4H7`
- Integrated in `app/layout.tsx` (head script + noscript fallback)
- Uses dataLayer to push events for tracking
- All analytics tags managed through GTM dashboard

**Google Ads Conversion Tracking via GTM**:
- Event name: `conversion_event_signup_1`
- Pushed to dataLayer using utilities in `lib/gtag-ads.ts`
- Helper functions:
  - `pushToDataLayer()` - Generic dataLayer push
  - `trackSignupConversion()` - For button clicks with navigation delay
  - `trackConversionOnly()` - For form submissions without navigation
- Conversion tracking fires on:
  - TrackSignUpButton clicks (all signup button clicks)
  - GiveawayForm successful submissions
- Setup guide available in `GTM_SETUP.md` and `GOOGLE_ADS_SETUP.md`
- No environment variables required (managed in GTM dashboard)

**Other Analytics**:
- TikTok Pixel embedded in root layout
- View counts auto-increment on product page visits
- Purchase tracking via client-side button component
- Google Analytics component available for custom events

### SEO Optimization

**Target Keyword**: "joyagoo spreadsheet" (USA, Germany, Poland + International)

**Implemented SEO Features**:
- Comprehensive Schema.org structured data (Organization, WebSite, Product, FAQ, Breadcrumb, Collection)
- Hreflang tags for international targeting (en-US, de-DE, pl-PL)
- Optimized meta tags with geographic and semantic modifiers
- XML sitemap with image data for Google Images
- robots.txt with proper crawl directives
- Breadcrumb navigation for better internal linking
- FAQ schema for featured snippets
- Product schema with pricing and ratings
- Mobile-first responsive design
- Image alt tags with keyword optimization

**SEO Files**:
- `SEO_OPTIMIZATION.md` - Complete SEO strategy and implementation guide
- `components/StructuredData.tsx` - Reusable schema components
- `public/robots.txt` - Search engine crawl directives
- Enhanced sitemap with image data and proper priorities

**SEO Best Practices**:
- Target keyword in first 30 characters of title
- Meta descriptions 150-160 characters
- H1 tags on all major pages
- Internal linking with keyword-rich anchor text
- Image optimization with Next.js Image component
- FAQ section for "People Also Ask" feature
- Geographic modifiers for local SEO

### Common Pitfalls
- Development server runs on port 3010
- Product URL slugs use `creatorName` and `productName` (URL-encoded)
- Case-insensitive searches require regex with 'i' flag
- MongoDB lean() queries return POJOs, not Mongoose documents
- Always escape regex special characters in user input (use `escapeRegExp` helper)
- Schema components must be imported in pages where used
- Update year references annually (2025 → 2026)
