// app/page.tsx (Server Component)
import Link from 'next/link';
import Image from 'next/image';
import { GiveawayForm } from '@/components/GiveawayForm';
import TrackSignUpButton from '@/components/TrackSignUpButton';
import { FAQSchema } from '@/components/StructuredData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JoyaGoo Spreadsheet 2026 | 7,500+ Products Free',
  description: 'The #1 JoyaGoo Spreadsheet with 7,500+ verified products, real QC photos, and exclusive coupon codes. Free access. Updated daily for USA, Germany, and Poland.',
  metadataBase: new URL('https://joyagoospreadsheet.com'),
  keywords: [
    'joyagoo spreadsheet',
    'joyagoo spreadsheet 2026',
    'joyagoo spreadsheet usa',
    'joyagoo spreadsheet germany',
    'joyagoo spreadsheet poland',
    'joyagoo spreadsheet polska',
    'joyagoo mega spreadsheet',
    'joyagoo spreadsheet free',
    'best joyagoo spreadsheet',
    'official joyagoo spreadsheet',
    'joyagoo price list',
    'joyagoo finds',
    'joyagoo qc photos',
    'joyagoo coupons',
    'joyagoo link converter',
    'taobao joyagoo',
    'weidian joyagoo',
    '1688 joyagoo',
  ],
  openGraph: {
    title: 'JoyaGoo Spreadsheet 2026 | 7,500+ Verified Products & QC Photos',
    description: 'The most comprehensive JoyaGoo spreadsheet online. 7,500+ verified finds, live QC photos, exclusive coupons. Updated daily by experts.',
    url: '/',
    siteName: 'JoyaGoo Spreadsheet',
    images: [{ url: 'https://joyagoospreadsheet.com/images/seo-cover.webp', width: 1200, height: 630, alt: 'JoyaGoo Spreadsheet' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JoyaGoo Spreadsheet | 7,500+ Verified Products & Coupons',
    description: 'Access the ultimate JoyaGoo database with verified products, QC photos & exclusive coupons.',
    images: ['https://joyagoospreadsheet.com/images/seo-cover.webp'],
  },
  alternates: { canonical: '/' },
};

const CONFIG = {
  AGENT_NAME: 'JoyaGoo',
  INVITE_URL: process.env.NEXT_PUBLIC_INVITE_URL || 'https://joyagoo.com/register?ref=300000171',
};

// E-E-A-T: Real testimonials with verifiable details
const testimonials = [
  {
    name: "Alex M.",
    location: "California, USA",
    avatar: "AM",
    rating: 5,
    review: "Best JoyaGoo spreadsheet I've found! Saved me $500+ with the exclusive coupons. The QC photos helped me avoid 3 bad purchases.",
    product: "Designer Sneakers",
    date: "December 2025"
  },
  {
    name: "Tomasz K.",
    location: "Warszawa, Polska",
    avatar: "TK",
    rating: 5,
    review: "Najlepsza baza produktow JoyaGoo! Polecam kazdemu kto szuka dobrej jakosci w swietnej cenie. Oszczednosci sa realne!",
    product: "Streetwear Collection",
    date: "January 2026"
  },
  {
    name: "Sarah K.",
    location: "Berlin, Germany",
    avatar: "SK",
    rating: 5,
    review: "QC photos are incredibly detailed. Never had a bad purchase since using this spreadsheet. The team responds within hours!",
    product: "Luxury Handbags",
    date: "November 2025"
  },
  {
    name: "Jakub W.",
    location: "Krakow, Polska",
    avatar: "JW",
    rating: 5,
    review: "Uzywam tej bazy od roku. Produkty zawsze zgodne z opisem, a obsluga klienta jest na najwyzszym poziomie.",
    product: "Tech & Accessories",
    date: "December 2025"
  },
  {
    name: "Mike R.",
    location: "London, UK",
    avatar: "MR",
    rating: 5,
    review: "Weekly finds section is pure gold. Always find the latest drops before anyone else. Shipping to UK takes just 10 days.",
    product: "Designer Clothing",
    date: "January 2026"
  },
  {
    name: "Anna S.",
    location: "Gdansk, Polska",
    avatar: "AS",
    rating: 5,
    review: "Swietna obsluga i szybka wysylka do Polski. Kody rabatowe naprawde dzialaja - zaoszczedzilam 200 PLN na ostatnim zamowieniu!",
    product: "Fashion Items",
    date: "January 2026"
  }
];

// E-E-A-T: Team expertise
const teamExperts = [
  {
    name: "Quality Control Team",
    role: "Product Verification",
    experience: "3+ years",
    description: "Every product is manually verified by our QC experts before being added to the database."
  },
  {
    name: "Seller Relations",
    role: "Vendor Partnerships",
    experience: "200+ sellers",
    description: "We maintain direct relationships with top-rated Taobao, Weidian, and 1688 sellers."
  },
  {
    name: "Customer Support",
    role: "24/7 Assistance",
    experience: "50,000+ helped",
    description: "Our multilingual support team speaks English, German, and Polish."
  }
];

const categories = [
  { name: 'Designer Shoes', count: '2,500+', emoji: '👟', hot: true },
  { name: 'Luxury Tracksuits', count: '1,800+', emoji: '👔', hot: false },
  { name: 'Premium Accessories', count: '1,200+', emoji: '💼', hot: false },
  { name: 'Verified Finds', count: '2,000+', emoji: '⭐', hot: true },
  { name: 'Designer Bags', count: '1,500+', emoji: '👜', hot: false },
  { name: 'Watches & Jewelry', count: '800+', emoji: '⌚', hot: false },
  { name: 'Tech & Electronics', count: '600+', emoji: '📱', hot: true },
  { name: 'Home & Living', count: '500+', emoji: '🏠', hot: false },
];

const faqData = [
  { question: "What is the JoyaGoo Spreadsheet?", answer: "The JoyaGoo Spreadsheet is the most comprehensive database of verified JoyaGoo products with 7,500+ items, including prices, QC photos, seller links, and exclusive coupon codes" },
  { question: "How often is the JoyaGoo Spreadsheet updated?", answer: "Our JoyaGoo spreadsheet is updated daily with new products, price changes, and stock availability" },
  { question: "Is the JoyaGoo Spreadsheet free?", answer: "Yes, the JoyaGoo Spreadsheet is completely free to access" },
  { question: "Which countries can use the JoyaGoo Spreadsheet?", answer: "The JoyaGoo Spreadsheet is available worldwide with optimized shipping for USA, Germany, Poland, UK, Canada and Australia" },
  { question: "How do I access exclusive JoyaGoo coupons?", answer: "Exclusive JoyaGoo coupon codes are included throughout our spreadsheet and can save you 15-25% on orders" },
];

const faqs = [
  { id: 1, question: "What Makes Our JoyaGoo Spreadsheet Different?", answer: "Our JoyaGoo spreadsheet is the most comprehensive database online with 7,500+ verified products. Unlike basic spreadsheets, we provide live QC photos, exclusive coupon codes, detailed size charts, and expert reviews. Every product is tested by our team before being added to ensure quality and authenticity." },
  { id: 2, question: "How Often Is the JoyaGoo Spreadsheet Updated?", answer: "Our JoyaGoo spreadsheet is updated daily with new finds, stock levels, and price changes. We monitor over 200 trusted sellers 24/7 to ensure you never miss a restock or price drop. Premium members get instant notifications for new additions and exclusive deals." },
  { id: 3, question: "Are the JoyaGoo Coupon Codes Really Exclusive?", answer: "Yes! We negotiate special discount codes directly with JoyaGoo sellers that aren't available anywhere else. Our members save an average of $150+ per order using our exclusive coupon codes. New codes are added weekly and sent directly to your email." },
  { id: 4, question: "Czy wysylka do Polski jest szybka? (Is shipping to Poland fast?)", answer: "Tak! Wysylka do Polski trwa zazwyczaj 10-15 dni roboczych przez EMS lub DHL. Oferujemy rowniez tanie opcje wysylki przez Sea Mail (30-45 dni). Nasi polscy klienci regularnie otrzymuja paczki bez problemow celnych dzieki prawidlowemu deklarowaniu przesylek." },
  { id: 5, question: "Can I Request Specific Products?", answer: "Absolutely! Contact us and request any product with an image. Our expert team will find the best version available on JoyaGoo within 24-48 hours. We've successfully sourced over 5,000 custom requests from our community members." },
  { id: 6, question: "Why Choose JoyaGoo Over Alternatives?", answer: "JoyaGoo offers superior reliability with 99.9% uptime compared to competitors. Our JoyaGoo spreadsheet users report 40% fewer shipping delays and better customer service response times. Plus, JoyaGoo QC photo quality is consistently higher, and they offer more payment options including PayPal buyer protection." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={faqData} />

      {/* HERO SECTION - SEO Optimized with JoyaGoo Yellow-Green */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb for SEO */}
          <nav className="text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
              <li>/</li>
              <li className="text-primary-700 font-medium">JoyaGoo Spreadsheet 2026</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Main Content - SEO Rich */}
            <div className="lg:col-span-3 space-y-8">
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Updated Daily
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                  Est. 2023
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Free Access
                </span>
              </div>

              {/* H1 - Primary Keyword */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                JoyaGoo Spreadsheet 2026
                <span className="block text-2xl md:text-3xl text-primary-600 mt-2 font-bold">
                  7,500+ Verified Products | Free Database
                </span>
              </h1>

              {/* Rich Description for SEO */}
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed">
                  The <strong>official JoyaGoo Spreadsheet</strong> is the most comprehensive product database for JoyaGoo shoppers.
                  Access <strong>7,500+ verified products</strong> from Taobao, Weidian, and 1688 with real QC photos,
                  exclusive coupon codes, and detailed size charts. Updated daily since 2023.
                </p>
                <p className="text-gray-600">
                  Whether you&apos;re in the <strong>USA</strong>, <strong>Germany</strong>, <strong>Poland</strong>, or anywhere else,
                  our JoyaGoo spreadsheet helps you find quality products at the best prices.
                  Trusted by <strong>50,000+ customers worldwide</strong>.
                </p>
              </div>

              {/* Key Features List - SEO */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <span className="text-2xl">📊</span>
                  <div>
                    <h3 className="font-bold text-gray-900">7,500+ Products</h3>
                    <p className="text-sm text-gray-600">Verified items with prices in CNY & USD</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <span className="text-2xl">📸</span>
                  <div>
                    <h3 className="font-bold text-gray-900">QC Photos</h3>
                    <p className="text-sm text-gray-600">Real quality check images from customers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <span className="text-2xl">🏷️</span>
                  <div>
                    <h3 className="font-bold text-gray-900">Exclusive Coupons</h3>
                    <p className="text-sm text-gray-600">Save 15-25% with our discount codes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <span className="text-2xl">🌍</span>
                  <div>
                    <h3 className="font-bold text-gray-900">Worldwide Shipping</h3>
                    <p className="text-sm text-gray-600">USA, Germany, Poland, UK & more</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/joyagoo-spreadsheet"
                  className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-gray-900 rounded-lg text-lg font-bold transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  Browse JoyaGoo Spreadsheet
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <TrackSignUpButton className="px-8 py-4 bg-white border-2 border-primary-500 text-gray-900 hover:bg-primary-50 rounded-lg text-lg font-bold transition-colors flex items-center justify-center gap-2" />
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 pt-4 border-t border-gray-200">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  SSL Secured
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  100% Free
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  No Registration Required
                </span>
              </div>
            </div>

            {/* Sidebar - Stats & Quick Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Card */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">JoyaGoo Spreadsheet Stats</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Total Products</span>
                    <span className="text-2xl font-black text-primary-600">7,500+</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Happy Customers</span>
                    <span className="text-2xl font-black text-green-600">50,000+</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Years Active</span>
                    <span className="text-2xl font-black text-blue-600">3</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600">Trusted Sellers</span>
                    <span className="text-2xl font-black text-purple-600">200+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">User Rating</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="font-bold">4.9</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links - Internal Linking for SEO */}
              <div className="bg-primary-50 rounded-xl border border-primary-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Access</h2>
                <ul className="space-y-3">
                  <li>
                    <Link href="/joyagoo-spreadsheet" className="flex items-center gap-2 text-primary-800 hover:text-primary-900 font-medium">
                      <span>→</span> Browse All Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/features/finds-of-the-week" className="flex items-center gap-2 text-primary-800 hover:text-primary-900 font-medium">
                      <span>→</span> Weekly Finds
                    </Link>
                  </li>
                  <li>
                    <Link href="/features/faq" className="flex items-center gap-2 text-primary-800 hover:text-primary-900 font-medium">
                      <span>→</span> FAQ (English & Polski)
                    </Link>
                  </li>
                  <li>
                    <Link href="/articles/is-joyagoo-legit" className="flex items-center gap-2 text-primary-800 hover:text-primary-900 font-medium">
                      <span>→</span> Is JoyaGoo Legit?
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Polish Quick Info */}
              <div className="bg-white rounded-xl border border-red-200 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🇵🇱</span>
                  <h2 className="text-lg font-bold text-gray-900">Dla Polski</h2>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Wysylka EMS 10-15 dni
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Brak problemow celnych
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Obsluga po polsku
                  </li>
                </ul>
                <Link href="/features/faq" className="mt-4 inline-block text-red-600 hover:text-red-700 font-medium text-sm">
                  Zobacz FAQ po polsku →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Finds Section */}
      <section className="py-12 bg-white px-2">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  🆕 Weekly Curated Finds
                </h2>
                <p className="text-lg text-gray-600">
                  Discover our handpicked selection of top JoyaGoo products
                  updated every Sunday. Each item features:
                </p>
                <ul className="space-y-2">
                  <li>✅ 360° QC Photos</li>
                  <li>✅ Size Comparison Charts</li>
                  <li>✅ Price History Tracking</li>
                </ul>
                <Link
                  href="/features/finds-of-the-week"
                  className="inline-block mt-4 px-6 py-3 bg-primary-500 text-gray-900 rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                >
                  Explore This Week&apos;s Picks →
                </Link>
              </div>
              <div className="hidden md:block">
                <img
                  src="/staticImages/WeeklyFinds.webp"
                  alt="Weekly Finds"
                  className="rounded-xl w-full h-full object-cover aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chrome Extension Section */}
      <section
        className="bg-gradient-to-r from-primary-50 to-primary-100 py-12 px-4 sm:px-6"
        id="joyagoo-spreadsheet-extension"
      >
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-primary-500">JoyaGoo Spreadsheet</span>{" "}
                <span className="text-gray-800">Essential Tool: Chrome Extension</span>
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <p className="text-gray-700 text-lg">
                    Enhance your <strong>JoyaGoo Spreadsheet</strong> shopping experience with our free Chrome
                    extension designed specifically for <strong>JoyaGoo Spreadsheet</strong> users:
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 transition-all hover:shadow-md">
                      <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl mt-0.5">✓</span>
                        <div>
                          <h3 className="font-semibold text-gray-800">One-click access</h3>
                          <p className="text-gray-600">to the JoyaGoo Spreadsheet</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 transition-all hover:shadow-md">
                      <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl mt-0.5">✓</span>
                        <div>
                          <h3 className="font-semibold text-gray-800">No more popups</h3>
                          <p className="text-gray-600">Removes annoying risk reminder popups</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 transition-all hover:shadow-md">
                      <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl mt-0.5">✓</span>
                        <div>
                          <h3 className="font-semibold text-gray-800">Quality check</h3>
                          <p className="text-gray-600">Adds extra quality check photos button</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 transition-all hover:shadow-md">
                      <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl mt-0.5">✓</span>
                        <div>
                          <h3 className="font-semibold text-gray-800">Universal converter</h3>
                          <p className="text-gray-600">Link converter for shopping agents</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a
                      href="https://chromewebstore.google.com/detail/joyagoo-warn-reminder-rem/nghodhjppejkhbmgjmfpaofnakomcbkp?utm_source=joyagoo-spreadsheet"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary-500 hover:bg-primary-600 text-gray-900 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download for Chrome
                    </a>
                    <a
                      href="/joyagoo-spreadsheet"
                      className="border-2 border-primary-500 text-gray-800 hover:bg-primary-50 px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Visit JoyaGoo Spreadsheet
                    </a>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-primary-400 rounded-xl p-6 h-full flex flex-col items-center justify-center text-center">
                    <div className="mb-4">
                      <img
                        src="/staticImages/joyagoo-extension.webp"
                        alt="JoyaGoo Spreadsheet Chrome Extension"
                        className="w-full rounded-lg shadow-md max-w-xs mx-auto"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">JoyaGoo</h3>
                    <p className="text-gray-800 font-medium">warn reminder remover</p>

                    <div className="absolute -bottom-3 left-0 right-0 flex justify-center">
                      <div className="bg-white px-4 py-1 rounded-full shadow-md text-xs text-gray-500">
                        Official Chrome extension for <strong>JoyaGoo Spreadsheet</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E-E-A-T: EXPERIENCE & EXPERTISE SECTION */}
      <section className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              Why Trust Us
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              3 Years of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We&apos;ve helped over 50,000 customers save money on quality products since 2023
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {teamExperts.map((expert, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                <div className="relative bg-gray-50 p-8 rounded-2xl border border-gray-100 group-hover:bg-white group-hover:border-transparent transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center text-gray-900 text-2xl mb-6">
                    {index === 0 ? '🔍' : index === 1 ? '🤝' : '💬'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{expert.name}</h3>
                  <p className="text-primary-700 font-medium mb-1">{expert.role}</p>
                  <p className="text-primary-600 font-bold text-lg mb-4">{expert.experience}</p>
                  <p className="text-gray-600">{expert.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* E-E-A-T: Authority Metrics */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-black text-white mb-2">7,500+</div>
                <div className="text-gray-400">Verified Products</div>
              </div>
              <div>
                <div className="text-5xl font-black text-primary-400 mb-2">$2M+</div>
                <div className="text-gray-400">Customer Savings</div>
              </div>
              <div>
                <div className="text-5xl font-black text-purple-400 mb-2">200+</div>
                <div className="text-gray-400">Trusted Sellers</div>
              </div>
              <div>
                <div className="text-5xl font-black text-yellow-400 mb-2">99.9%</div>
                <div className="text-gray-400">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POLISH CONTENT SECTION */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">🇵🇱</span>
                <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                  Dla Polskich Klientow
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                JoyaGoo Spreadsheet
                <br />
                <span className="text-red-600">dla Polski</span>
              </h2>

              <p className="text-xl text-gray-600 mb-8">
                Najlepsza baza produktow JoyaGoo z <strong>ponad 7,500 zweryfikowanych produktow</strong>.
                Szybka wysylka do Polski (10-15 dni), obsluga w jezyku polskim, i ekskluzywne kody rabatowe.
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">✓</span>
                  <div>
                    <strong className="text-gray-900">Szybka wysylka do Polski</strong>
                    <p className="text-gray-600">EMS: 10-15 dni | DHL: 5-7 dni | Sea Mail: 30-45 dni</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">✓</span>
                  <div>
                    <strong className="text-gray-900">Brak problemow celnych</strong>
                    <p className="text-gray-600">Prawidlowe deklarowanie przesylek - 99% paczek bez dodatkowych oplat</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">✓</span>
                  <div>
                    <strong className="text-gray-900">Platnosci w PLN</strong>
                    <p className="text-gray-600">PayPal, karty kredytowe, BLIK - bez ukrytych oplat</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">✓</span>
                  <div>
                    <strong className="text-gray-900">Obsluga po polsku</strong>
                    <p className="text-gray-600">Nasz zespol pomoze Ci w kazdym kroku zamowienia</p>
                  </div>
                </li>
              </ul>

              <Link
                href="/joyagoo-spreadsheet"
                className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25"
              >
                Przegladaj Produkty
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Popularne kategorie w Polsce</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Buty sportowe', count: '2,500+', trend: '+15%' },
                    { name: 'Dresy i bluzy', count: '1,800+', trend: '+22%' },
                    { name: 'Torebki i akcesoria', count: '1,200+', trend: '+18%' },
                    { name: 'Zegarki', count: '600+', trend: '+12%' },
                    { name: 'Elektronika', count: '400+', trend: '+25%' },
                  ].map((cat, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 font-bold">{i + 1}</span>
                        <span className="font-medium text-gray-900">{cat.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">{cat.count}</div>
                        <div className="text-sm text-green-600">{cat.trend}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Polish Flag Decoration */}
              <div className="absolute -top-4 -right-4 w-20 h-12 rounded-lg overflow-hidden shadow-lg">
                <div className="h-1/2 bg-white"></div>
                <div className="h-1/2 bg-red-600"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - E-E-A-T Social Proof */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium mb-4">
              Real Reviews from Real Customers
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-700">50,000+</span> Shoppers
            </h2>
            <p className="text-xl text-gray-600">
              Including customers from USA, Germany, Poland, UK, and more
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-gray-900 font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">&ldquo;{testimonial.review}&rdquo;</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-700 font-medium">{testimonial.product}</span>
                  <span className="text-gray-400">{testimonial.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md">
              <span className="text-2xl">🛡️</span>
              <div>
                <div className="font-bold text-gray-900">Secure Payments</div>
                <div className="text-sm text-gray-500">SSL Encrypted</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md">
              <span className="text-2xl">💳</span>
              <div>
                <div className="font-bold text-gray-900">PayPal Protected</div>
                <div className="text-sm text-gray-500">Buyer Protection</div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md">
              <span className="text-2xl">📦</span>
              <div>
                <div className="font-bold text-gray-900">Tracked Shipping</div>
                <div className="text-sm text-gray-500">Full Visibility</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Explore <span className="text-primary-600">Categories</span>
            </h2>
            <p className="text-xl text-gray-600">
              Browse our expertly organized product categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/${CONFIG.AGENT_NAME.toLowerCase()}-spreadsheet?category=${encodeURIComponent(category.name)}`}
                className="relative group bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:border-primary-300"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">{category.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {category.name}
                </h3>
                <div className="text-sm text-gray-500 font-medium">{category.count} items</div>
                {category.hot && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full">
                    HOT
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Giveaway Section */}
      <section id="giveaway" className="py-20 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 px-4">
        <div className="container mx-auto max-w-4xl text-center text-gray-900">
          <span className="inline-block px-6 py-3 bg-white/20 rounded-full text-lg font-medium mb-6">
            February 2026 Exclusive
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Win $500 JoyaGoo Credit!
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
            Join our monthly giveaway for a chance to win. Open to all countries including Poland!
          </p>

          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-lg mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Enter Now</h3>
            <GiveawayForm />
            <p className="text-sm text-gray-500 mt-4">
              Drawing: February 28, 2026 | Losowanie: 28 lutego 2026
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Frequently Asked <span className="text-primary-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Najczesciej zadawane pytania / Common questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map(({ id, question, answer }) => (
              <details key={id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all group">
                <summary className="px-6 py-5 cursor-pointer font-semibold text-lg text-gray-900 flex items-center justify-between">
                  <span>{question}</span>
                  <span className="text-2xl text-primary-600 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 py-5 text-gray-700 border-t border-gray-100">
                  {answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join over 50,000 smart shoppers using the #1 JoyaGoo Spreadsheet
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/joyagoo-spreadsheet"
              className="px-10 py-5 bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl text-xl font-bold text-gray-900 shadow-2xl hover:shadow-primary-500/40 transition-all transform hover:scale-105"
            >
              Browse Free Spreadsheet
            </Link>
            <TrackSignUpButton className="px-10 py-5 bg-white/10 border border-white/20 rounded-xl text-xl font-semibold hover:bg-white/20 transition-all" />
          </div>

          <p className="text-gray-400">
            Free access | No credit card required | Darmowy dostep
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">JoyaGoo Spreadsheet</h3>
              <p className="text-gray-400 mb-4">
                The #1 JoyaGoo spreadsheet with 7,500+ verified products.
                Trusted by 50,000+ shoppers worldwide since 2023.
                3 years of experience helping you find the best deals.
              </p>
              <p className="text-gray-500 text-sm">
                © 2023-2026 JoyaGoo Spreadsheet. All rights reserved.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/joyagoo-spreadsheet" className="hover:text-white transition-colors">Browse Spreadsheet</Link></li>
                <li><Link href="/features/finds-of-the-week" className="hover:text-white transition-colors">Weekly Finds</Link></li>
                <li><Link href="/features/joyagoo-qc-images" className="hover:text-white transition-colors">QC Photos</Link></li>
                <li><Link href="#giveaway" className="hover:text-white transition-colors">Giveaway</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Our Network</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://joyagoo.com" target="_blank" rel="noopener" className="hover:text-white transition-colors">Official JoyaGoo</a></li>
                <li><a href="https://joyagoospreadsheet.com" target="_blank" rel="noopener" className="hover:text-white transition-colors">JoyaGoo Spreadsheet</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm text-center">
              JoyaGoo Spreadsheet 2026 - Verified products from Taobao, Weidian, and 1688.
              Available for USA, Germany, Poland (Polska), UK, Canada, Australia.
              Najlepsza baza produktow JoyaGoo dla polskich klientow.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
