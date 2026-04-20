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
      title: 'JoyaGoo FAQ 2026 | Najczesciej Zadawane Pytania | Polski',
      description: 'Kompletny FAQ dla JoyaGoo Spreadsheet. Odpowiedzi na pytania o wysylke do Polski, metody platnosci, zdjecia QC, kody rabatowe i wiecej. Obsluga po polsku.',
      keywords: [
        'joyagoo faq',
        'joyagoo pytania',
        'joyagoo pomoc',
        'joyagoo wysylka polska',
        'joyagoo platnosc',
        'joyagoo paypal',
        'joyagoo zdjecia qc',
        'joyagoo kody rabatowe',
        'joyagoo poradnik',
        'jak zamawiać joyagoo',
        'joyagoo polska',
      ],
      openGraph: {
        title: 'JoyaGoo FAQ - Najczesciej Zadawane Pytania | Polski',
        description: 'Kompletny FAQ dla JoyaGoo Spreadsheet. Wysylka do Polski, metody platnosci, zdjecia QC. Obsluga po polsku.',
        url: '/features/faq?lang=poland',
        siteName: 'JoyaGoo Spreadsheet',
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
    title: 'JoyaGoo FAQ 2026 | Frequently Asked Questions | English',
    description: 'Complete FAQ for JoyaGoo Spreadsheet. Get answers about shipping to USA, Germany, Poland, payment methods, QC photos, coupon codes, and more.',
    keywords: [
      'joyagoo faq',
      'joyagoo questions',
      'joyagoo help',
      'joyagoo shipping',
      'joyagoo payment',
      'joyagoo paypal',
      'joyagoo qc photos',
      'joyagoo coupon codes',
      'joyagoo spreadsheet help',
      'joyagoo guide',
      'joyagoo tutorial',
    ],
    openGraph: {
      title: 'JoyaGoo FAQ - Frequently Asked Questions | English',
      description: 'Complete FAQ for JoyaGoo Spreadsheet. Shipping info, payment methods, QC photos guide.',
      url: '/features/faq?lang=english',
      siteName: 'JoyaGoo Spreadsheet',
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
