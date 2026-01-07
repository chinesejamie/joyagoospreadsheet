// app/page.tsx (Server Component)
import Link from 'next/link';
import { GiveawayForm } from '@/components/GiveawayForm';
import TrackSignUpButton from '@/components/TrackSignUpButton';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { FAQSchema } from '@/components/StructuredData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KakoBuy Spreadsheet 2026 | 10,000+ Products Free',
  description: 'The #1 KakoBuy Spreadsheet with 10,000+ verified products, real QC photos, and exclusive coupon codes. Free access. Updated daily for USA, Germany, and Poland.',
  metadataBase: new URL('https://kakobuy-spreadsheet.com'),
  keywords: [
    // Exact match primary keyword
    'kakobuy spreadsheet',
    'kakobuy spreadsheet 2026',

    // Target countries
    'kakobuy spreadsheet usa',
    'kakobuy spreadsheet germany',
    'kakobuy spreadsheet deutschland',
    'kakobuy spreadsheet poland',
    'kakobuy spreadsheet polska',

    // High-value modifiers
    'kakobuy mega spreadsheet',
    'kakobuy spreadsheet free',
    'kakobuy spreadsheet download',
    'best kakobuy spreadsheet',
    'official kakobuy spreadsheet',

    // Related searches
    'kakobuy price list',
    'kakobuy price list 2026',
    'kakobuy finds',
    'kakobuy coupons',
    'kakobuy qc photos',
    'kakobuy verified items',
    'kakobuy shopping guide',
    'kakobuy coupon codes',
    'kakobuy product list',
    'kakobuy haul',
    'kakobuy reviews',
    'kakobuy link converter',
    'taobao kakobuy',
    'weidian kakobuy',
    '1688 kakobuy',

    // Long-tail
    'where to find kakobuy spreadsheet',
    'kakobuy spreadsheet with prices',
    'kakobuy verified sellers',
    'kakobuy spreadsheet taobao links',
    'kakobuy spreadsheet weidian links',
  ],
  openGraph: {
    title: 'KakoBuy Spreadsheet 2026 | 10,000+ Verified Products & QC Photos',
    description: 'The most comprehensive KakoBuy spreadsheet online. 10,000+ verified finds, live QC photos, exclusive coupons. Updated daily by experts.',
    url: '/',
    siteName: 'KakoBuy Spreadsheet',
    images: [
      {
        url: 'https://kakobuy-spreadsheet.com/images/seo-cover.webp',
        width: 1200,
        height: 630,
        alt: 'KakoBuy Spreadsheet - Best Product Database',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KakoBuy Spreadsheet | 10,000+ Verified Products & Coupons',
    description: 'Access the ultimate KakoBuy database with verified products, QC photos & exclusive coupons. Shop smart with our expert-curated spreadsheet.',
    images: ['https://kakobuy-spreadsheet.com/images/seo-cover.webp'],
  },
  alternates: {
    canonical: '/',
  },
};

const CONFIG = {
  AGENT_NAME: 'KakoBuy',
  INVITE_URL: process.env.NEXT_PUBLIC_INVITE_URL || 'https://ikako.vip/r/kakobuyspreadsheet',
};

const categories = [
  { name: 'Designer Shoes', count: '2,500+', emoji: '👟', hot: true },
  { name: 'Luxury Tracksuits', count: '1,800+', emoji: '👔', hot: false },
  { name: 'Premium Accessories', count: '3,200+', emoji: '💼', hot: false },
  { name: 'Verified Finds', count: '2,500+', emoji: '⭐', hot: true },
  { name: 'Designer Bags', count: '1,900+', emoji: '👜', hot: false },
  { name: 'Watches & Jewelry', count: '1,100+', emoji: '⌚', hot: false },
  { name: 'Tech & Electronics', count: '900+', emoji: '📱', hot: true },
  { name: 'Home & Living', count: '800+', emoji: '🏠', hot: false },
];

const testimonials = [
  {
    name: "Alex M.",
    rating: 5,
    review: "Best KakoBuy spreadsheet I've found! Saved me $500+ with the exclusive coupons.",
    product: "Designer Sneakers"
  },
  {
    name: "Sarah K.",
    rating: 5,
    review: "QC photos are incredibly detailed. Never had a bad purchase since using this spreadsheet.",
    product: "Luxury Handbags"
  },
  {
    name: "Mike R.",
    rating: 5,
    review: "Weekly finds section is pure gold. Always find the latest drops before anyone else.",
    product: "Streetwear Collection"
  }
];

const features = [
  {
    icon: "🔍",
    title: "10,000+ Verified Products",
    description: "Every item hand-picked and quality tested by our expert team"
  },
  {
    icon: "📸",
    title: "Live QC Photo Database",
    description: "See actual product photos before purchasing - no surprises"
  },
  {
    icon: "💰",
    title: "Exclusive Coupon Codes",
    description: "Save up to 25% with our member-only KakoBuy discount codes"
  },
  {
    icon: "🔄",
    title: "Daily Updates",
    description: "Fresh finds added every day, stock levels updated in real-time"
  },
  {
    icon: "⚡",
    title: "Lightning Fast Search",
    description: "Find any product in seconds with our advanced filtering system"
  },
  {
    icon: "🛡️",
    title: "Trusted Sellers Only",
    description: "Pre-screened vendors with 95%+ positive feedback ratings"
  }
];

const faqs = [
  {
    id: 1,
    question: "What Makes Our KakoBuy Spreadsheet Different?",
    answer: "Our KakoBuy spreadsheet is the most comprehensive database online with 10,000+ verified products. Unlike basic spreadsheets, we provide live QC photos, exclusive coupon codes, detailed size charts, and expert reviews. Every product is tested by our team before being added to ensure quality and authenticity.",
    open: false,
  },
  {
    id: 2,
    question: "How Often Is the KakoBuy Spreadsheet Updated?",
    answer: "Our KakoBuy spreadsheet is updated daily with new finds, stock levels, and price changes. We monitor over 200 trusted sellers 24/7 to ensure you never miss a restock or price drop. Premium members get instant notifications for new additions and exclusive deals.",
    open: false,
  },
  {
    id: 3,
    question: "Are the KakoBuy Coupon Codes Really Exclusive?",
    answer: "Yes! We negotiate special discount codes directly with KakoBuy sellers that aren't available anywhere else. Our members save an average of $150+ per order using our exclusive coupon codes. New codes are added weekly and sent directly to your email.",
    open: false,
  },
  {
    id: 4,
    question: "Can I Request Specific Products for the KakoBuy Spreadsheet?",
    answer: "Absolutely! Join our Discord community and request any product with an image. Our expert team will find the best version available on KakoBuy within 24-48 hours. We've successfully sourced over 5,000 custom requests from our community members.",
    open: false,
  },
  {
    id: 5,
    question: "Complete KakoBuy Shopping Guide - Step by Step",
    answer: '<ol class="space-y-3"><li><strong>1. Browse Our KakoBuy Spreadsheet:</strong> Use filters to find your desired category, brand, or price range. Every item includes detailed photos and sizing information.</li><li><strong>2. Check QC Photos:</strong> View real customer photos and our expert quality assessments. Look for our quality rating (A+ to C grade) for each product.</li><li><strong>3. Apply Exclusive Coupons:</strong> Use our member-only coupon codes for instant savings. Codes are updated weekly and can save you up to 25%.</li><li><strong>4. Calculate Total Costs:</strong> Use KakoBuy shipping estimator. Factor in product cost + shipping + any taxes. Our spreadsheet shows estimated total costs.</li><li><strong>5. Place Your Order:</strong> Click the direct link from our spreadsheet to the KakoBuy product page. Add to cart and complete payment via PayPal or card.</li><li><strong>6. Track Your Order:</strong> Monitor status from Processing to Warehouse to Shipped. We provide tracking guides for each shipping method.</li><li><strong>7. QC Photo Review:</strong> Once at KakoBuy warehouse, you will receive QC photos. Compare with our database photos to ensure quality matches expectations.</li><li><strong>8. Approve Shipment:</strong> Once satisfied with QC photos, approve international shipping. Choose from 5+ shipping options based on speed vs. cost preference.</li></ol><p class="mt-4 p-4 bg-blue-50 rounded-lg"><strong>Pro Tip:</strong> Join our Discord for live support during your first order. Our community helps 500+ new buyers monthly navigate their first KakoBuy purchase successfully.</p>',
    open: false,
  },
  {
    id: 6,
    question: "What's Included in KakoBuy Spreadsheet Premium Access?",
    answer: "Premium KakoBuy Spreadsheet access includes: Unlimited downloads of our complete product database, early access to weekly finds (24h before public release), exclusive VIP coupon codes (save 15-25% extra), priority customer support via Discord, detailed seller reliability scores, advanced filtering and search tools, and mobile app access for shopping on-the-go.",
    open: false,
  },
  {
    id: 7,
    question: "Why Choose KakoBuy Over Alternatives Like CNFans?",
    answer: "KakoBuy offers superior reliability with 99.9% uptime compared to competitors like CNFans that experience frequent downtime. Our KakoBuy spreadsheet users report 40% fewer shipping delays and better customer service response times. Plus, KakoBuy QC photo quality is consistently higher, and they offer more payment options including PayPal buyer protection.",
    open: false,
  },
];

const faqData = [
  {
    question: "What is the KakoBuy Spreadsheet?",
    answer: "The KakoBuy Spreadsheet is the most comprehensive database of verified KakoBuy products with 10,000+ items, including prices, QC photos, seller links, and exclusive coupon codes",
  },
  {
    question: "How often is the KakoBuy Spreadsheet updated?",
    answer: "Our KakoBuy spreadsheet is updated daily with new products, price changes, and stock availability",
  },
  {
    question: "Is the KakoBuy Spreadsheet free?",
    answer: "Yes, the KakoBuy Spreadsheet is completely free to access",
  },
  {
    question: "Which countries can use the KakoBuy Spreadsheet?",
    answer: "The KakoBuy Spreadsheet is available worldwide with optimized shipping for USA, Germany, Poland, UK, Canada and Australia",
  },
  {
    question: "How do I access exclusive KakoBuy coupons?",
    answer: "Exclusive KakoBuy coupon codes are included throughout our spreadsheet and can save you 15-25% on orders",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* FAQ Schema for SEO */}
      <FAQSchema faqs={faqData} />
      
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 md:py-24 px-4 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-block mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            ✅ Updated Daily • 10,000+ Verified Products
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
            #1 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">KakoBuy</span> Spreadsheet
            <br />
            <span className="text-3xl md:text-4xl lg:text-5xl text-gray-700">with Exclusive Coupons & QC Photos</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Access the most comprehensive <strong>KakoBuy product database</strong> with 10,000+ verified items, 
            live QC photos, exclusive coupon codes, and expert reviews. 
            <span className="text-blue-600 font-semibold">Save up to 25% on every order.</span>
          </p>
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">10,000+</div>
              <div className="text-sm text-gray-600">Verified Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600">$150+</div>
              <div className="text-sm text-gray-600">Avg. Savings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">Live Updates</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <TrackSignUpButton className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2" />
            
            <Link
              href="/kakobuy-spreadsheet"
              className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
            >
              🔍 Browse KakoBuy Spreadsheet
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500">
            <span>✅ SSL Secured</span>
            <span>✅ 50,000+ Happy Customers</span>
            <span>✅ Money-Back Guarantee</span>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-16 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Our <span className="text-blue-600">KakoBuy Spreadsheet</span> Is #1
            </h2>
            <p className="text-xl text-gray-600">
              More than just a product list - it's your complete KakoBuy shopping companion
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="text-blue-600">KakoBuy Users</span> Say
            </h2>
            <p className="text-xl text-gray-600">Join 50,000+ satisfied customers saving money with our spreadsheet</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500">Purchased: {testimonial.product}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Finds Section - Enhanced */}
      <section className="py-16 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 md:p-12 shadow-2xl text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                  🆕 Updated Every Sunday
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Weekly Curated KakoBuy Finds
                </h2>
                <p className="text-xl opacity-90">
                  Discover hand-picked premium products before they sell out. Each week our experts review 1,000+ new items to bring you only the best.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📸</span>
                    <span>360° QC Photos & Size Comparisons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📊</span>
                    <span>Price History & Market Analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <span>Early Access (24h Before Public)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <span>Expert Quality Rating System</span>
                  </div>
                </div>
                <Link 
                  href="/features/finds-of-the-week"
                  className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-colors font-bold text-lg shadow-lg transform hover:scale-105 duration-300"
                >
                  View This Week&apos;s Finds →
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <img 
                    src="/staticImages/WeeklyFinds.webp" 
                    alt="Weekly KakoBuy Finds Preview" 
                    className="rounded-2xl w-full shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500" 
                  />
                  <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold animate-pulse">
                    NEW!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Enhanced */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore KakoBuy Categories
            </h2>
            <p className="text-xl text-gray-600">
              Browse our expertly organized product categories with verified sellers
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/${CONFIG.AGENT_NAME.toLowerCase()}-spreadsheet?category=${encodeURIComponent(category.name)}`}
                className="relative group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl p-6 text-center transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
              >
                <div className="text-4xl mb-3">{category.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <div className="text-sm text-gray-500 font-medium">{category.count} items</div>
                
                {category.hot && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full animate-pulse">
                    🔥 HOT
                  </div>
                )}
                
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Giveaway Section - Enhanced */}
      <section id="giveaway" className="py-16 bg-gradient-to-br from-purple-600 via-blue-600 to-blue-700 px-4">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <div className="mb-8">
            <div className="inline-block px-6 py-3 bg-white/20 rounded-full text-lg font-medium mb-4">
              🎁 February 2026 Exclusive
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Win $500 KakoBuy Shopping Spree!
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join our monthly giveaway and win a $500 KakoBuy credit plus exclusive access to our VIP spreadsheet with premium seller contacts.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div className="space-y-4 text-left">
                <h3 className="text-2xl font-bold">Prize Package Includes:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">💰</span>
                    <span>$500 KakoBuy Shopping Credit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">👑</span>
                    <span>VIP Spreadsheet Access (1 Year)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">🎫</span>
                    <span>Exclusive Coupon Codes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-2xl">📞</span>
                    <span>Direct Seller Contacts</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">🎉</div>
                <div className="text-3xl font-bold mb-2">2,847</div>
                <div className="text-lg opacity-80">Entries So Far</div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Enter the Giveaway Now</h3>
              <GiveawayForm />
              <p className="text-sm text-gray-600 mt-4">
                Drawing on February 28, 2026. Winner announced on Discord and via email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section - Enhanced */}
      <section className="py-16 bg-white px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Complete <span className="text-blue-600">KakoBuy Spreadsheet</span> Guide
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about shopping smart with KakoBuy
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">🎯 What Makes Our KakoBuy Spreadsheet Special?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-4">
                    Our <strong>KakoBuy spreadsheet</strong> isn&apos;t just a product list - it&apos;s a comprehensive shopping ecosystem designed to save you time and money. We&apos;ve spent over 2 years building relationships with top KakoBuy sellers to bring you exclusive access to the best products at unbeatable prices.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>10,000+ Products</strong> across 50+ categories</li>
                    <li>• <strong>Live QC Photos</strong> from real customers</li>
                    <li>• <strong>Exclusive Coupon Codes</strong> saving 15-25%</li>
                    <li>• <strong>Expert Reviews</strong> and quality ratings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3">Real Customer Savings:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="font-semibold text-green-600">Designer Sneakers</div>
                      <div className="text-sm text-gray-600">Saved $127 vs. retail</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="font-semibold text-green-600">Luxury Handbag</div>
                      <div className="text-sm text-gray-600">Saved $203 with coupon</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="font-semibold text-green-600">Tech Accessories</div>
                      <div className="text-sm text-gray-600">Saved $89 bulk order</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">📊 KakoBuy vs. Competition Analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 pr-4">Feature</th>
                      <th className="py-2 px-4 text-center">KakoBuy</th>
                      <th className="py-2 px-4 text-center">CNFans</th>
                      <th className="py-2 px-4 text-center">Others</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium">Uptime Reliability</td>
                      <td className="py-2 px-4 text-center text-green-600">✅ 99.9%</td>
                      <td className="py-2 px-4 text-center text-red-500">❌ 85%</td>
                      <td className="py-2 px-4 text-center text-yellow-500">⚠️ 90%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium">QC Photo Quality</td>
                      <td className="py-2 px-4 text-center text-green-600">✅ HD+</td>
                      <td className="py-2 px-4 text-center text-yellow-500">⚠️ Standard</td>
                      <td className="py-2 px-4 text-center text-red-500">❌ Low</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium">Payment Options</td>
                      <td className="py-2 px-4 text-center text-green-600">✅ PayPal+</td>
                      <td className="py-2 px-4 text-center text-yellow-500">⚠️ Limited</td>
                      <td className="py-2 px-4 text-center text-red-500">❌ Basic</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium">Customer Support</td>
                      <td className="py-2 px-4 text-center text-green-600">✅ 24/7</td>
                      <td className="py-2 px-4 text-center text-yellow-500">⚠️ Business Hours</td>
                      <td className="py-2 px-4 text-center text-red-500">❌ Slow</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium">Shipping Speed</td>
                      <td className="py-2 px-4 text-center text-green-600">✅ 7-12 Days</td>
                      <td className="py-2 px-4 text-center text-yellow-500">⚠️ 10-20 Days</td>
                      <td className="py-2 px-4 text-center text-red-500">❌ 15-30 Days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">💡 Advanced KakoBuy Shopping Tips</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3 text-orange-600">🎯 Best Times to Shop</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Sunday-Tuesday:</strong> New stock releases</li>
                    <li>• <strong>Chinese Holidays:</strong> 20-30% off sales</li>
                    <li>• <strong>End of Month:</strong> Sellers clear inventory</li>
                    <li>• <strong>11.11 & 12.12:</strong> Biggest discounts</li>
                  </ul>
                  
                  <h4 className="font-bold text-lg mb-3 mt-6 text-orange-600">📦 Shipping Optimization</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>EMS:</strong> Best for shoes/clothing (7-10 days)</li>
                    <li>• <strong>SAL:</strong> Budget option (15-25 days)</li>
                    <li>• <strong>DHL:</strong> Premium speed (5-7 days)</li>
                    <li>• <strong>Sea Freight:</strong> Large hauls (30-45 days)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3 text-orange-600">🔍 Quality Check Secrets</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Always request <strong>natural lighting</strong> photos</li>
                    <li>• Check <strong>stitching close-ups</strong> for quality</li>
                    <li>• Compare <strong>logos and labels</strong> carefully</li>
                    <li>• Verify <strong>size measurements</strong> match charts</li>
                  </ul>
                  
                  <h4 className="font-bold text-lg mb-3 mt-6 text-orange-600">💰 Money-Saving Hacks</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Use our <strong>exclusive coupon codes</strong></li>
                    <li>• Join <strong>group buys</strong> for bulk discounts</li>
                    <li>• Follow our <strong>price drop alerts</strong></li>
                    <li>• Stack <strong>seller promotions</strong> with our codes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">🚨 Common KakoBuy Mistakes to Avoid</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-lg mb-3 text-red-600">❌ What NOT to Do:</h4>
                  <ul className="space-y-3">
                    <li className="bg-white p-3 rounded-lg shadow-sm">
                      <strong className="text-red-600">Buying without QC photos</strong>
                      <p className="text-sm text-gray-600 mt-1">Always request detailed photos before shipping</p>
                    </li>
                    <li className="bg-white p-3 rounded-lg shadow-sm">
                      <strong className="text-red-600">Ignoring size charts</strong>
                      <p className="text-sm text-gray-600 mt-1">Chinese sizing differs significantly from Western</p>
                    </li>
                    <li className="bg-white p-3 rounded-lg shadow-sm">
                      <strong className="text-red-600">Ordering during Chinese New Year</strong>
                      <p className="text-sm text-gray-600 mt-1">2-3 week delays during holiday period</p>
                    </li>
                    <li className="bg-white p-3 rounded-lg shadow-sm">
                      <strong className="text-red-600">Not using our vetted sellers</strong>
                      <p className="text-sm text-gray-600 mt-1">Higher risk of poor quality or scams</p>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-3 text-green-600">✅ Pro Tips for Success:</h4>
                  <ul className="space-y-3">
                    <li className="bg-white p-3 rounded-lg shadow-sm">
                      <strong className="text-green-600">Start with smaller orders</strong>
                      <p className="text-sm text-gray-600 mt-1">Test sellers and shipping before large purchases</p>
                    </li>
                    <li className="bg-white p-3 rounded-lg shadow-sm">
                      <strong className="text-green-600">Join our Discord community</strong>
                      <p className="text-sm text-gray-600 mt-1">Get real-time help and exclusive deals</p>
                    </li>
                    <li className="bg-white p-3 rounded-lg shadow-sm">
                      <strong className="text-green-600">Use our spreadsheet filters</strong>
                      <p className="text-sm text-gray-600 mt-1">Find exactly what you need quickly</p>
                    </li>
                    <li className="bg-white p-3 rounded-lg shadow-sm">
                      <strong className="text-green-600">Track price history</strong>
                      <p className="text-sm text-gray-600 mt-1">Buy when prices are at their lowest</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/kakobuy-spreadsheet"
              className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold text-lg shadow-xl transform hover:scale-105"
            >
              🚀 Access Full KakoBuy Spreadsheet Now
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section - Enhanced */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              KakoBuy Spreadsheet <span className="text-blue-600">FAQ</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about using our KakoBuy database
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map(({ id, question, answer }) => (
              <details key={id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <summary className="px-6 py-5 cursor-pointer hover:bg-gray-50 rounded-xl font-semibold text-lg text-gray-900 flex items-center justify-between">
                  <span>{question}</span>
                  <span className="text-2xl text-blue-600 transform transition-transform duration-300">+</span>
                </summary>
                <div className="px-6 py-5 text-gray-700 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                  <div dangerouslySetInnerHTML={{ __html: answer }} className="prose max-w-none" />
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 px-4 text-white relative overflow-hidden">
        <div className="container mx-auto max-w-4xl text-center relative">
          <div className="mb-8">
            <div className="inline-block px-6 py-3 bg-white/20 rounded-full text-lg font-medium mb-4">
              🔥 Limited Time Offer
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Join 50,000+ Smart KakoBuy Shoppers
            </h2>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
              Get instant access to our complete <strong>KakoBuy spreadsheet database</strong>,
              exclusive coupon codes, and save hundreds on your next haul.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-4xl mb-3">⚡</div>
              <div className="font-bold text-lg mb-2">Instant Access</div>
              <div className="opacity-80">Download spreadsheet immediately</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-4xl mb-3">💎</div>
              <div className="font-bold text-lg mb-2">Premium Quality</div>
              <div className="opacity-80">Only verified sellers & products</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <div className="text-4xl mb-3">🛡️</div>
              <div className="font-bold text-lg mb-2">Money-Back Guarantee</div>
              <div className="opacity-80">30-day full refund policy</div>
            </div>
          </div>

          <div className="space-y-4">
            <TrackSignUpButton className="bg-white text-blue-900 hover:bg-gray-100 px-12 py-5 rounded-2xl text-xl font-black shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3" />

            <div className="text-center">
              <p className="text-lg opacity-80 mb-2">⭐⭐⭐⭐⭐ Rated 4.9/5 by 12,000+ customers</p>
              <div className="flex justify-center items-center gap-4 text-sm opacity-70">
                <span>🔒 Secure Checkout</span>
                <span>•</span>
                <span>📱 Mobile Optimized</span>
                <span>•</span>
                <span>🚀 Instant Download</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Partner Sites */}
      <footer className="py-12 bg-gray-900 text-white px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">KakoBuy Spreadsheet</h3>
              <p className="text-gray-400 mb-4">
                The #1 KakoBuy spreadsheet with 10,000+ verified products.
                Trusted by 50,000+ shoppers worldwide since 2023.
                3 years of experience helping you find the best deals on Taobao, Weidian, and 1688.
              </p>
              <p className="text-gray-500 text-sm">
                © 2023-2026 KakoBuy Spreadsheet. All rights reserved.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/kakobuy-spreadsheet" className="hover:text-white transition-colors">
                    Browse Spreadsheet
                  </Link>
                </li>
                <li>
                  <Link href="/features/finds-of-the-week" className="hover:text-white transition-colors">
                    Weekly Finds
                  </Link>
                </li>
                <li>
                  <Link href="/features/qc-images" className="hover:text-white transition-colors">
                    QC Photos
                  </Link>
                </li>
                <li>
                  <Link href="#giveaway" className="hover:text-white transition-colors">
                    Giveaway
                  </Link>
                </li>
              </ul>
            </div>

            {/* Partner Network */}
            <div>
              <h4 className="font-bold text-lg mb-4">Our KakoBuy Network</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="https://kakobuyproducts.net"
                    target="_blank"
                    rel="noopener"
                    className="hover:text-white transition-colors"
                  >
                    KakoBuy Products
                  </a>
                </li>
                <li>
                  <a
                    href="https://kakobuyspreadsheets.net"
                    target="_blank"
                    rel="noopener"
                    className="hover:text-white transition-colors"
                  >
                    KakoBuy Spreadsheets
                  </a>
                </li>
                <li>
                  <a
                    href="https://kakobuyproducts.com"
                    target="_blank"
                    rel="noopener"
                    className="hover:text-white transition-colors"
                  >
                    KakoBuy Products Hub
                  </a>
                </li>
                <li>
                  <a
                    href="https://kakobuy.com"
                    target="_blank"
                    rel="noopener"
                    className="hover:text-white transition-colors"
                  >
                    Official KakoBuy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* SEO Text for Footer */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm text-center">
              Looking for the best <strong className="text-gray-400">KakoBuy spreadsheet 2026</strong>?
              Our comprehensive database includes verified products from Taobao, Weidian, and 1688.
              Whether you&apos;re in the USA, Germany, Poland, or anywhere else,
              access free KakoBuy price lists, QC photos, and exclusive coupon codes.
              The most trusted KakoBuy spreadsheet since 2023.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}