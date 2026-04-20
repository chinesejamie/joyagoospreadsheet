'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// FAQ Data - English
const faqsEnglish = [
  {
    id: 1,
    category: "Getting Started",
    question: "What is the JoyaGoo Spreadsheet?",
    answer: "The JoyaGoo Spreadsheet is the most comprehensive database of verified JoyaGoo products with 10,000+ items. It includes prices in CNY and USD, QC (Quality Check) photos, direct seller links, size charts, and exclusive coupon codes. We've been curating this database since 2023, helping over 50,000 customers find quality products."
  },
  {
    id: 2,
    category: "Getting Started",
    question: "Is the JoyaGoo Spreadsheet free to access?",
    answer: "Yes! The JoyaGoo Spreadsheet is completely free to access. You can browse all 10,000+ products, view QC photos, and use our coupon codes without any payment. We make money through affiliate partnerships, not user fees."
  },
  {
    id: 3,
    category: "Getting Started",
    question: "How do I use the JoyaGoo Spreadsheet?",
    answer: "Simply visit our spreadsheet page and use the search bar or category filters to find products. Each listing shows the price, seller rating, QC photos, and a direct link to purchase. Click on any product to see more details, then click 'Buy Now' to go directly to JoyaGoo."
  },
  {
    id: 4,
    category: "Products & Quality",
    question: "How are products verified?",
    answer: "Our Quality Control team manually reviews every product before adding it to the database. We check seller ratings (minimum 95% positive), review actual QC photos from previous customers, verify pricing accuracy, and test seller responsiveness. Only products meeting our standards are included."
  },
  {
    id: 5,
    category: "Products & Quality",
    question: "What are QC Photos?",
    answer: "QC (Quality Check) photos are real photographs taken of products at the JoyaGoo warehouse before shipping. These show the actual item you'll receive, including details like stitching, materials, and overall quality. Our database includes thousands of QC photos from real customers to help you make informed decisions."
  },
  {
    id: 6,
    category: "Products & Quality",
    question: "How often is the spreadsheet updated?",
    answer: "Our spreadsheet is updated daily. We add new products, remove out-of-stock items, update prices, and add new QC photos continuously. Our team monitors over 200 trusted sellers 24/7 to ensure the database stays current."
  },
  {
    id: 7,
    category: "Shipping & Delivery",
    question: "What shipping options are available?",
    answer: "JoyaGoo offers multiple shipping methods: EMS (7-15 days, balanced speed/cost), DHL/FedEx (5-7 days, premium), China Post/SAL (15-30 days, budget), and Sea Freight (30-60 days, for large hauls). Shipping costs depend on weight, destination, and method chosen."
  },
  {
    id: 8,
    category: "Shipping & Delivery",
    question: "Which countries do you ship to?",
    answer: "JoyaGoo ships worldwide! The most popular destinations are USA, Germany, Poland, UK, Canada, Australia, France, Italy, and Spain. Shipping times and costs vary by location. Our spreadsheet is optimized for customers in USA, Germany, and Poland with localized support."
  },
  {
    id: 9,
    category: "Shipping & Delivery",
    question: "How do I track my order?",
    answer: "Once your order ships from JoyaGoo, you'll receive a tracking number via email. You can track your package on the JoyaGoo website or using services like 17track.net or parcelsapp.com. We also provide tracking guides for each shipping method in our Help section."
  },
  {
    id: 10,
    category: "Payments & Pricing",
    question: "What payment methods are accepted?",
    answer: "JoyaGoo accepts PayPal (with Buyer Protection), credit/debit cards (Visa, Mastercard, Amex), and various local payment methods. PayPal is recommended for buyer protection. Our spreadsheet shows prices in both CNY (Chinese Yuan) and USD for convenience."
  },
  {
    id: 11,
    category: "Payments & Pricing",
    question: "Are there any hidden fees?",
    answer: "No hidden fees from our spreadsheet - it's completely free. When ordering through JoyaGoo, you pay: product cost + domestic shipping to warehouse + international shipping + optional services (detailed photos, packaging). All fees are shown before checkout."
  },
  {
    id: 12,
    category: "Payments & Pricing",
    question: "How do coupon codes work?",
    answer: "Our exclusive coupon codes can save you 15-25% on orders. Find codes throughout our spreadsheet or in our weekly newsletter. Enter the code during JoyaGoo checkout to apply the discount. Codes may have minimum order requirements or expiration dates."
  },
  {
    id: 13,
    category: "Support",
    question: "How can I get help with my order?",
    answer: "For spreadsheet questions, contact our support team where we can help. For order issues, contact JoyaGoo support directly through their website. We also have comprehensive guides in our Help section covering common questions."
  },
  {
    id: 14,
    category: "Support",
    question: "Can I request specific products?",
    answer: "Yes! Submit product requests with an image through our contact form. Our team will search for the best available version and add it to the spreadsheet within 24-48 hours. We've successfully sourced over 5,000 custom requests from our community."
  },
];

// FAQ Data - Polish
const faqsPolish = [
  {
    id: 1,
    category: "Pierwsze kroki",
    question: "Co to jest JoyaGoo Spreadsheet?",
    answer: "JoyaGoo Spreadsheet to najbardziej kompleksowa baza zweryfikowanych produktow JoyaGoo z ponad 10,000 produktami. Zawiera ceny w CNY i USD, zdjecia QC (Quality Check), bezposrednie linki do sprzedawcow, tabele rozmiarow i ekskluzywne kody rabatowe. Tworzymy te baze od 2023 roku, pomagajac ponad 50,000 klientom znalezc produkty wysokiej jakosci."
  },
  {
    id: 2,
    category: "Pierwsze kroki",
    question: "Czy JoyaGoo Spreadsheet jest darmowy?",
    answer: "Tak! JoyaGoo Spreadsheet jest calkowicie darmowy. Mozesz przegladac wszystkie 10,000+ produktow, ogladac zdjecia QC i uzywac naszych kodow rabatowych bez zadnych oplat. Zarabiamy przez partnerstwa afiliacyjne, nie przez oplaty uzytkownikow."
  },
  {
    id: 3,
    category: "Pierwsze kroki",
    question: "Jak korzystac z JoyaGoo Spreadsheet?",
    answer: "Po prostu odwiedz nasza strone ze spreadsheetem i uzyj wyszukiwarki lub filtrow kategorii, aby znalezc produkty. Kazda oferta pokazuje cene, ocene sprzedawcy, zdjecia QC i bezposredni link do zakupu. Kliknij na dowolny produkt, aby zobaczyc wiecej szczegolow, a nastepnie kliknij 'Kup teraz', aby przejsc bezposrednio do JoyaGoo."
  },
  {
    id: 4,
    category: "Wysylka do Polski",
    question: "Jak szybka jest wysylka do Polski?",
    answer: "Wysylka do Polski trwa zazwyczaj: EMS - 10-15 dni roboczych (najlepsza opcja cena/jakosc), DHL/FedEx - 5-7 dni (premium), China Post - 20-30 dni (ekonomiczna), Sea Mail - 30-45 dni (dla duzych zamowien). Wiekszosc polskich klientow wybiera EMS jako najlepszy kompromis miedzy cena a czasem dostawy."
  },
  {
    id: 5,
    category: "Wysylka do Polski",
    question: "Czy beda problemy z clem?",
    answer: "99% paczek do Polski przechodzi bez dodatkowych oplat celnych dzieki prawidlowemu deklarowaniu przez JoyaGoo. Sprzedawcy deklaruja nizsze wartosci (zgodnie z przepisami), aby zminimalizowac ryzyko. Jesli paczka zostanie zatrzymana, zazwyczaj wystarczy oplacic niewielkie clo (okolo 20-50 PLN dla typowych zamowien)."
  },
  {
    id: 6,
    category: "Wysylka do Polski",
    question: "Jakie sa koszty wysylki do Polski?",
    answer: "Koszty wysylki zaleza od wagi paczki: EMS - okolo 15-25 USD za pierwsze 500g + 5 USD za kazde dodatkowe 500g, DHL - okolo 25-40 USD za pierwsze 500g, China Post - okolo 8-12 USD za pierwsze 500g. Dla duzych haulow (ponad 5kg) warto rozwazyc Sea Freight - najtansza opcja dla ciezkich paczek."
  },
  {
    id: 7,
    category: "Wysylka do Polski",
    question: "Czy moge placic w PLN?",
    answer: "JoyaGoo akceptuje platnosci przez PayPal i karty kredytowe. PayPal automatycznie przewalutuje z USD na PLN. Mozesz tez uzyc karty wielowalutowej (np. Revolut) aby uniknac oplat za przewalutowanie. Niestety BLIK nie jest bezposrednio obslugiwany, ale mozesz doladowac PayPal przez BLIK."
  },
  {
    id: 8,
    category: "Produkty i jakosc",
    question: "Jak weryfikujecie produkty?",
    answer: "Nasz zespol Quality Control recznie sprawdza kazdy produkt przed dodaniem do bazy. Sprawdzamy oceny sprzedawcow (minimum 95% pozytywnych), przegladamy rzeczywiste zdjecia QC od poprzednich klientow, weryfikujemy dokladnosc cen i testujemy responsywnosc sprzedawcow. Tylko produkty spelniajace nasze standardy sa dodawane."
  },
  {
    id: 9,
    category: "Produkty i jakosc",
    question: "Co to sa zdjecia QC?",
    answer: "Zdjecia QC (Quality Check) to prawdziwe fotografie produktow wykonane w magazynie JoyaGoo przed wysylka. Pokazuja rzeczywisty przedmiot, ktory otrzymasz, wlacznie ze szczegolami takimi jak szwy, materialy i ogolna jakosc. Nasza baza zawiera tysiace zdjec QC od prawdziwych klientow, abys mogl podejmowac swiadome decyzje."
  },
  {
    id: 10,
    category: "Produkty i jakosc",
    question: "Jak czesto aktualizujecie spreadsheet?",
    answer: "Nasz spreadsheet jest aktualizowany codziennie. Dodajemy nowe produkty, usuwamy niedostepne pozycje, aktualizujemy ceny i dodajemy nowe zdjecia QC na biezaco. Nasz zespol monitoruje ponad 200 zaufanych sprzedawcow 24/7, aby baza byla zawsze aktualna."
  },
  {
    id: 11,
    category: "Platnosci",
    question: "Jakie metody platnosci sa akceptowane?",
    answer: "JoyaGoo akceptuje: PayPal (z Ochrona Kupujacego - zalecane!), karty kredytowe/debetowe (Visa, Mastercard, Amex), oraz rozne lokalne metody platnosci. Dla polskich klientow PayPal jest najlepszym wyborem - daje ochrona kupujacego i latwe przewalutowanie."
  },
  {
    id: 12,
    category: "Platnosci",
    question: "Jak dzialaja kody rabatowe?",
    answer: "Nasze ekskluzywne kody rabatowe pozwalaja zaoszczedzic 15-25% na zamowieniach. Znajdziesz je w naszym spreadsheecie lub w cotygodniowym newsletterze. Wpisz kod podczas finalizacji zamowienia na JoyaGoo, aby zastosowac znizke. Kody moga miec minimalna wartosc zamowienia lub date waznosci."
  },
  {
    id: 13,
    category: "Wsparcie",
    question: "Jak moge uzyskac pomoc?",
    answer: "W przypadku pytan o spreadsheet skontaktuj sie z naszym zespolem wsparcia. W sprawie problemow z zamowieniem skontaktuj sie bezposrednio z obsluga JoyaGoo przez ich strone. Mamy tez obsluge w jezyku polskim."
  },
  {
    id: 14,
    category: "Wsparcie",
    question: "Czy moge zamowic konkretny produkt?",
    answer: "Tak! Przeslij prosbe o produkt ze zdjeciem przez nasz formularz kontaktowy. Nasz zespol wyszuka najlepsza dostepna wersje i doda ja do spreadsheet w ciagu 24-48 godzin. Udalo nam sie znalezc ponad 5,000 produktow na prosbe naszej spolecznosci."
  },
];

// Categories for filtering
const categoriesEnglish = ["All", "Getting Started", "Products & Quality", "Shipping & Delivery", "Payments & Pricing", "Support"];
const categoriesPolish = ["Wszystkie", "Pierwsze kroki", "Produkty i jakosc", "Wysylka do Polski", "Platnosci", "Wsparcie"];

interface FAQClientProps {
  initialLang: 'en' | 'pl';
}

export default function FAQClient({ initialLang }: FAQClientProps) {
  const router = useRouter();
  const [language, setLanguage] = useState<'en' | 'pl'>(initialLang);
  const [activeCategory, setActiveCategory] = useState(initialLang === 'en' ? 'All' : 'Wszystkie');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = language === 'en' ? faqsEnglish : faqsPolish;
  const categories = language === 'en' ? categoriesEnglish : categoriesPolish;
  const allCategory = language === 'en' ? 'All' : 'Wszystkie';

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === allCategory || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLanguageChange = (newLang: 'en' | 'pl') => {
    setLanguage(newLang);
    setActiveCategory(newLang === 'en' ? 'All' : 'Wszystkie');
    // Update URL for SEO
    router.push(`/features/faq?lang=${newLang === 'en' ? 'english' : 'poland'}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto max-w-4xl px-4 relative z-10">
          {/* Language Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white/10 rounded-full p-1 backdrop-blur-sm">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  language === 'en'
                    ? 'bg-white text-blue-900'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange('pl')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  language === 'pl'
                    ? 'bg-white text-blue-900'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <span>Polski</span>
                <span className="text-lg">🇵🇱</span>
              </button>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              {language === 'en' ? 'Frequently Asked Questions' : 'Najczesciej Zadawane Pytania'}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              {language === 'en'
                ? 'Everything you need to know about using the JoyaGoo Spreadsheet'
                : 'Wszystko, co musisz wiedziec o korzystaniu z JoyaGoo Spreadsheet'}
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search questions...' : 'Szukaj pytan...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pl-14 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
                />
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-white border-b sticky top-0 z-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {language === 'en' ? 'No results found' : 'Nie znaleziono wynikow'}
              </h3>
              <p className="text-gray-600">
                {language === 'en'
                  ? 'Try adjusting your search or filter'
                  : 'Sprobuj zmienic wyszukiwanie lub filtr'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                  >
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-2">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {faq.question}
                      </h3>
                    </div>
                    <div className={`flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center transition-transform ${openFaq === faq.id ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {openFaq === faq.id && (
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-50 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {language === 'en' ? 'Still have questions?' : 'Masz wiecej pytan?'}
            </h2>
            <p className="text-gray-600">
              {language === 'en'
                ? 'Get in touch with our team or explore more resources'
                : 'Skontaktuj sie z naszym zespolem lub sprawdz inne zasoby'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/joyagoo-spreadsheet"
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all group border border-gray-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                📊
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                {language === 'en' ? 'Browse Spreadsheet' : 'Przegladaj Produkty'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'en'
                  ? 'Explore 10,000+ verified products'
                  : 'Przegladaj ponad 10,000 zweryfikowanych produktow'}
              </p>
            </Link>

            <Link
              href="/"
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all group border border-gray-100"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🏠
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                {language === 'en' ? 'Back to Home' : 'Powrot do strony glownej'}
              </h3>
              <p className="text-gray-600 text-sm">
                {language === 'en'
                  ? 'Explore all features'
                  : 'Odkryj wszystkie funkcje'}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Polish-specific Section */}
      {language === 'pl' && (
        <section className="py-16 bg-gradient-to-r from-red-50 to-white px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl">🇵🇱</span>
              <h2 className="text-3xl font-bold text-gray-900">Specjalnie dla polskich klientow</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Szybka wysylka do Polski
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• EMS: 10-15 dni roboczych</li>
                  <li>• DHL Express: 5-7 dni</li>
                  <li>• Ekonomiczna: 20-30 dni</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Brak problemow celnych
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• 99% paczek bez dodatkowych oplat</li>
                  <li>• Prawidlowe deklarowanie wartosci</li>
                  <li>• Pomoc w razie zatrzymania paczki</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Wygodne platnosci
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• PayPal z Ochrona Kupujacego</li>
                  <li>• Karty kredytowe/debetowe</li>
                  <li>• Revolut bez oplat za przewalutowanie</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Obsluga po polsku
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Polski support</li>
                  <li>• Poradniki w jezyku polskim</li>
                  <li>• Spolecznosc polskich kupujacych</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {language === 'en' ? 'Ready to Start Shopping?' : 'Gotowy na zakupy?'}
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Join 50,000+ smart shoppers using the #1 JoyaGoo Spreadsheet'
              : 'Dolacz do ponad 50,000 klientow korzystajacych z JoyaGoo Spreadsheet'}
          </p>
          <Link
            href="/joyagoo-spreadsheet"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
          >
            {language === 'en' ? 'Browse Free Spreadsheet' : 'Przegladaj produkty za darmo'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
