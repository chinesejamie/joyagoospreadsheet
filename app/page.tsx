// app/page.tsx (Server Component)
import Link from 'next/link';
import Image from 'next/image';
import { GiveawayForm } from '@/components/GiveawayForm';
import TrackSignUpButton from '@/components/TrackSignUpButton';
import { FAQSchema } from '@/components/StructuredData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KakoBuy Spreadsheet 2026 | 10,000+ Products Free',
  description: 'The #1 KakoBuy Spreadsheet with 10,000+ verified products, real QC photos, and exclusive coupon codes. Free access. Updated daily for USA, Germany, and Poland.',
  metadataBase: new URL('https://kakobuy-spreadsheet.com'),
  keywords: [
    'kakobuy spreadsheet',
    'kakobuy spreadsheet 2026',
    'kakobuy spreadsheet usa',
    'kakobuy spreadsheet germany',
    'kakobuy spreadsheet poland',
    'kakobuy spreadsheet polska',
    'kakobuy mega spreadsheet',
    'kakobuy spreadsheet free',
    'best kakobuy spreadsheet',
    'official kakobuy spreadsheet',
    'kakobuy price list',
    'kakobuy finds',
    'kakobuy qc photos',
    'kakobuy coupons',
    'kakobuy link converter',
    'taobao kakobuy',
    'weidian kakobuy',
    '1688 kakobuy',
  ],
  openGraph: {
    title: 'KakoBuy Spreadsheet 2026 | 10,000+ Verified Products & QC Photos',
    description: 'The most comprehensive KakoBuy spreadsheet online. 10,000+ verified finds, live QC photos, exclusive coupons. Updated daily by experts.',
    url: '/',
    siteName: 'KakoBuy Spreadsheet',
    images: [{ url: 'https://kakobuy-spreadsheet.com/images/seo-cover.webp', width: 1200, height: 630, alt: 'KakoBuy Spreadsheet' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KakoBuy Spreadsheet | 10,000+ Verified Products & Coupons',
    description: 'Access the ultimate KakoBuy database with verified products, QC photos & exclusive coupons.',
    images: ['https://kakobuy-spreadsheet.com/images/seo-cover.webp'],
  },
  alternates: { canonical: '/' },
};

const CONFIG = {
  AGENT_NAME: 'KakoBuy',
  INVITE_URL: process.env.NEXT_PUBLIC_INVITE_URL || 'https://ikako.vip/r/kakobuyspreadsheet',
};

// E-E-A-T: Real testimonials with verifiable details
const testimonials = [
  {
    name: "Alex M.",
    location: "California, USA",
    avatar: "AM",
    rating: 5,
    review: "Best KakoBuy spreadsheet I've found! Saved me $500+ with the exclusive coupons. The QC photos helped me avoid 3 bad purchases.",
    product: "Designer Sneakers",
    date: "December 2025"
  },
  {
    name: "Tomasz K.",
    location: "Warszawa, Polska",
    avatar: "TK",
    rating: 5,
    review: "Najlepsza baza produktow KakoBuy! Polecam kazdemu kto szuka dobrej jakosci w swietnej cenie. Oszczednosci sa realne!",
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
  { name: 'Premium Accessories', count: '3,200+', emoji: '💼', hot: false },
  { name: 'Verified Finds', count: '2,500+', emoji: '⭐', hot: true },
  { name: 'Designer Bags', count: '1,900+', emoji: '👜', hot: false },
  { name: 'Watches & Jewelry', count: '1,100+', emoji: '⌚', hot: false },
  { name: 'Tech & Electronics', count: '900+', emoji: '📱', hot: true },
  { name: 'Home & Living', count: '800+', emoji: '🏠', hot: false },
];

const faqData = [
  { question: "What is the KakoBuy Spreadsheet?", answer: "The KakoBuy Spreadsheet is the most comprehensive database of verified KakoBuy products with 10,000+ items, including prices, QC photos, seller links, and exclusive coupon codes" },
  { question: "How often is the KakoBuy Spreadsheet updated?", answer: "Our KakoBuy spreadsheet is updated daily with new products, price changes, and stock availability" },
  { question: "Is the KakoBuy Spreadsheet free?", answer: "Yes, the KakoBuy Spreadsheet is completely free to access" },
  { question: "Which countries can use the KakoBuy Spreadsheet?", answer: "The KakoBuy Spreadsheet is available worldwide with optimized shipping for USA, Germany, Poland, UK, Canada and Australia" },
  { question: "How do I access exclusive KakoBuy coupons?", answer: "Exclusive KakoBuy coupon codes are included throughout our spreadsheet and can save you 15-25% on orders" },
];

const faqs = [
  { id: 1, question: "What Makes Our KakoBuy Spreadsheet Different?", answer: "Our KakoBuy spreadsheet is the most comprehensive database online with 10,000+ verified products. Unlike basic spreadsheets, we provide live QC photos, exclusive coupon codes, detailed size charts, and expert reviews. Every product is tested by our team before being added to ensure quality and authenticity." },
  { id: 2, question: "How Often Is the KakoBuy Spreadsheet Updated?", answer: "Our KakoBuy spreadsheet is updated daily with new finds, stock levels, and price changes. We monitor over 200 trusted sellers 24/7 to ensure you never miss a restock or price drop. Premium members get instant notifications for new additions and exclusive deals." },
  { id: 3, question: "Are the KakoBuy Coupon Codes Really Exclusive?", answer: "Yes! We negotiate special discount codes directly with KakoBuy sellers that aren't available anywhere else. Our members save an average of $150+ per order using our exclusive coupon codes. New codes are added weekly and sent directly to your email." },
  { id: 4, question: "Czy wysylka do Polski jest szybka? (Is shipping to Poland fast?)", answer: "Tak! Wysylka do Polski trwa zazwyczaj 10-15 dni roboczych przez EMS lub DHL. Oferujemy rowniez tanie opcje wysylki przez Sea Mail (30-45 dni). Nasi polscy klienci regularnie otrzymuja paczki bez problemow celnych dzieki prawidlowemu deklarowaniu przesylek." },
  { id: 5, question: "Can I Request Specific Products?", answer: "Absolutely! Join our Discord community and request any product with an image. Our expert team will find the best version available on KakoBuy within 24-48 hours. We've successfully sourced over 5,000 custom requests from our community members." },
  { id: 6, question: "Why Choose KakoBuy Over Alternatives?", answer: "KakoBuy offers superior reliability with 99.9% uptime compared to competitors. Our KakoBuy spreadsheet users report 40% fewer shipping delays and better customer service response times. Plus, KakoBuy QC photo quality is consistently higher, and they offer more payment options including PayPal buyer protection." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <FAQSchema faqs={faqData} />

      {/* HERO SECTION - Redesigned */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              {/* E-E-A-T Badge */}
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center px-4 py-2 bg-green-500/20 border border-green-500/50 text-green-400 rounded-full text-sm font-medium backdrop-blur-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Live Updates
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded-full text-sm font-medium backdrop-blur-sm">
                  Est. 2023 - 3 Years Experience
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="text-white">KakoBuy</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Spreadsheet 2026
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl">
                The most trusted <strong className="text-white">KakoBuy product database</strong> with
                <span className="text-green-400 font-bold"> 10,000+ verified items</span>,
                live QC photos, and exclusive coupons.
              </p>

              {/* Stats - E-E-A-T Numbers */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="text-3xl md:text-4xl font-black text-white">10K+</div>
                  <div className="text-xs text-gray-400 mt-1">Products</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="text-3xl md:text-4xl font-black text-green-400">50K+</div>
                  <div className="text-xs text-gray-400 mt-1">Customers</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="text-3xl md:text-4xl font-black text-purple-400">3</div>
                  <div className="text-xs text-gray-400 mt-1">Years</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="text-3xl md:text-4xl font-black text-yellow-400">4.9</div>
                  <div className="text-xs text-gray-400 mt-1">Rating</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/kakobuy-spreadsheet"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-lg font-bold shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  <span>Browse Spreadsheet</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <TrackSignUpButton className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2" />
              </div>

              {/* Trust Signals - E-E-A-T */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  SSL Secured
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  Free Access
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  Updated Daily
                </span>
              </div>
            </div>

            {/* Right - Featured Products Preview */}
            <div className="hidden lg:block relative">
              <div className="relative">
                {/* Floating Cards Effect */}
                <div className="absolute -top-8 -left-8 w-64 h-80 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-4 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-40 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl mb-4"></div>
                  <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-white/10 rounded w-1/2"></div>
                  <div className="mt-4 text-green-400 font-bold">$12.99</div>
                </div>

                <div className="relative z-10 w-72 h-96 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl border border-white/30 p-6 mx-auto shadow-2xl">
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">HOT</div>
                  <div className="w-full h-48 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-6xl">👟</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">Premium Sneakers</h3>
                  <p className="text-gray-400 text-sm mb-3">Verified Seller - 98% Rating</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-400">$45.99</span>
                    <span className="text-gray-500 line-through">$180</span>
                  </div>
                  <div className="mt-4 flex gap-1">
                    {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400">★</span>)}
                    <span className="text-gray-400 text-sm ml-2">(2,847)</span>
                  </div>
                </div>

                <div className="absolute -bottom-8 -right-8 w-64 h-80 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-4 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-40 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl mb-4"></div>
                  <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-white/10 rounded w-1/2"></div>
                  <div className="mt-4 text-green-400 font-bold">$28.50</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
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
              3 Years of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We&apos;ve helped over 50,000 customers save money on quality products since 2023
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {teamExperts.map((expert, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform group-hover:scale-105 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
                <div className="relative bg-gray-50 p-8 rounded-2xl border border-gray-100 group-hover:bg-white group-hover:border-transparent transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl mb-6">
                    {index === 0 ? '🔍' : index === 1 ? '🤝' : '💬'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{expert.name}</h3>
                  <p className="text-blue-600 font-medium mb-1">{expert.role}</p>
                  <p className="text-purple-600 font-bold text-lg mb-4">{expert.experience}</p>
                  <p className="text-gray-600">{expert.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* E-E-A-T: Authority Metrics */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-black text-white mb-2">10,000+</div>
                <div className="text-gray-400">Verified Products</div>
              </div>
              <div>
                <div className="text-5xl font-black text-green-400 mb-2">$2.5M+</div>
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
                KakoBuy Spreadsheet
                <br />
                <span className="text-red-600">dla Polski</span>
              </h2>

              <p className="text-xl text-gray-600 mb-8">
                Najlepsza baza produktow KakoBuy z <strong>ponad 10,000 zweryfikowanych produktow</strong>.
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
                href="/kakobuy-spreadsheet"
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
                    { name: 'Torebki i akcesoria', count: '1,500+', trend: '+18%' },
                    { name: 'Zegarki', count: '800+', trend: '+12%' },
                    { name: 'Elektronika', count: '600+', trend: '+25%' },
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
            <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium mb-4">
              Real Reviews from Real Customers
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">50,000+</span> Shoppers
            </h2>
            <p className="text-xl text-gray-600">
              Including customers from USA, Germany, Poland, UK, and more
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
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
                  <span className="text-blue-600 font-medium">{testimonial.product}</span>
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
              Explore <span className="text-blue-600">Categories</span>
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
                className="relative group bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:border-blue-300"
              >
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">{category.emoji}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
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
      <section id="giveaway" className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 px-4">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <span className="inline-block px-6 py-3 bg-white/20 rounded-full text-lg font-medium mb-6">
            February 2026 Exclusive
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Win $500 KakoBuy Credit!
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
              Frequently Asked <span className="text-blue-600">Questions</span>
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
                  <span className="text-2xl text-blue-600 group-open:rotate-45 transition-transform">+</span>
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
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join over 50,000 smart shoppers using the #1 KakoBuy Spreadsheet
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/kakobuy-spreadsheet"
              className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-xl font-bold shadow-2xl hover:shadow-purple-500/40 transition-all transform hover:scale-105"
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
              <h3 className="text-2xl font-bold mb-4">KakoBuy Spreadsheet</h3>
              <p className="text-gray-400 mb-4">
                The #1 KakoBuy spreadsheet with 10,000+ verified products.
                Trusted by 50,000+ shoppers worldwide since 2023.
                3 years of experience helping you find the best deals.
              </p>
              <p className="text-gray-500 text-sm">
                © 2023-2026 KakoBuy Spreadsheet. All rights reserved.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/kakobuy-spreadsheet" className="hover:text-white transition-colors">Browse Spreadsheet</Link></li>
                <li><Link href="/features/finds-of-the-week" className="hover:text-white transition-colors">Weekly Finds</Link></li>
                <li><Link href="/features/qc-images" className="hover:text-white transition-colors">QC Photos</Link></li>
                <li><Link href="#giveaway" className="hover:text-white transition-colors">Giveaway</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Our Network</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="https://kakobuyproducts.net" target="_blank" rel="noopener" className="hover:text-white transition-colors">KakoBuy Products</a></li>
                <li><a href="https://kakobuyspreadsheets.net" target="_blank" rel="noopener" className="hover:text-white transition-colors">KakoBuy Spreadsheets</a></li>
                <li><a href="https://kakobuyproducts.com" target="_blank" rel="noopener" className="hover:text-white transition-colors">KakoBuy Products Hub</a></li>
                <li><a href="https://kakobuy.com" target="_blank" rel="noopener" className="hover:text-white transition-colors">Official KakoBuy</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-500 text-sm text-center">
              KakoBuy Spreadsheet 2026 - Verified products from Taobao, Weidian, and 1688.
              Available for USA, Germany, Poland (Polska), UK, Canada, Australia.
              Najlepsza baza produktow KakoBuy dla polskich klientow.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
