import { Metadata } from 'next';
import FAQClient from './FAQClient';

interface PageProps {
  searchParams: Promise<{ lang?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const lang = params.lang === 'poland' ? 'pl' : 'en';

  if (lang === 'pl') {
    return {
      title: 'KakoBuy FAQ 2026 | Najczesciej Zadawane Pytania | Polski',
      description: 'Kompletny FAQ dla KakoBuy Spreadsheet. Odpowiedzi na pytania o wysylke do Polski, metody platnosci, zdjecia QC, kody rabatowe i wiecej. Obsluga po polsku.',
      keywords: [
        'kakobuy faq',
        'kakobuy pytania',
        'kakobuy pomoc',
        'kakobuy wysylka polska',
        'kakobuy platnosc',
        'kakobuy paypal',
        'kakobuy zdjecia qc',
        'kakobuy kody rabatowe',
        'kakobuy poradnik',
        'jak zamawiać kakobuy',
        'kakobuy polska',
      ],
      openGraph: {
        title: 'KakoBuy FAQ - Najczesciej Zadawane Pytania | Polski',
        description: 'Kompletny FAQ dla KakoBuy Spreadsheet. Wysylka do Polski, metody platnosci, zdjecia QC. Obsluga po polsku.',
        url: '/features/faq?lang=poland',
        siteName: 'KakoBuy Spreadsheet',
        locale: 'pl_PL',
        type: 'website',
      },
      alternates: {
        canonical: '/features/faq?lang=poland',
        languages: {
          'en-US': '/features/faq?lang=english',
          'pl-PL': '/features/faq?lang=poland',
        },
      },
    };
  }

  return {
    title: 'KakoBuy FAQ 2026 | Frequently Asked Questions | English',
    description: 'Complete FAQ for KakoBuy Spreadsheet. Get answers about shipping to USA, Germany, Poland, payment methods, QC photos, coupon codes, and more.',
    keywords: [
      'kakobuy faq',
      'kakobuy questions',
      'kakobuy help',
      'kakobuy shipping',
      'kakobuy payment',
      'kakobuy paypal',
      'kakobuy qc photos',
      'kakobuy coupon codes',
      'kakobuy spreadsheet help',
      'kakobuy guide',
      'kakobuy tutorial',
    ],
    openGraph: {
      title: 'KakoBuy FAQ - Frequently Asked Questions | English',
      description: 'Complete FAQ for KakoBuy Spreadsheet. Shipping info, payment methods, QC photos guide.',
      url: '/features/faq?lang=english',
      siteName: 'KakoBuy Spreadsheet',
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: '/features/faq?lang=english',
      languages: {
        'en-US': '/features/faq?lang=english',
        'pl-PL': '/features/faq?lang=poland',
      },
    },
  };
}

export default async function FAQPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialLang = params.lang === 'poland' ? 'pl' : 'en';

  return <FAQClient initialLang={initialLang} />;
}
