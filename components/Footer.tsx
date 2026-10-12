// components/Footer.tsx – global footer (server component). No links to other domains
// except JoyaGoo itself.
import Link from 'next/link';
import Disclosure from '@/components/Disclosure';
import { SITE_NAME, AGENT_NAME, AGENT_URL, AGENT_LINK_REL, CONTENT_LAST_REVIEWED } from '@/lib/site';

const CATEGORIES = [
  { slug: 'shoes', label: 'Shoes' },
  { slug: 't-shirts', label: 'T-shirts' },
  { slug: 'hoodies', label: 'Hoodies' },
  { slug: 'pants', label: 'Pants' },
  { slug: 'accessories', label: 'Accessories' },
  { slug: 'jackets', label: 'Jackets' },
];

const GUIDES = [
  { href: '/articles/how-to-buy-on-joyagoo', label: `How to buy on ${AGENT_NAME}` },
  { href: '/articles/is-joyagoo-legit', label: `Is ${AGENT_NAME} legit?` },
  { href: '/articles/joyagoo-shipping-to-germany', label: `${AGENT_NAME} shipping to Germany` },
  { href: '/articles/joyagoo-coupons-2026', label: `${AGENT_NAME} coupons 2026` },
  { href: '/features/faq', label: 'FAQ' },
];

const ABOUT = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy policy' },
  { href: '/features/dead-link', label: 'Report a dead link' },
];

const linkClass = 'text-sm text-gray-600 hover:text-gray-900';
const headingClass = 'text-xs font-semibold uppercase tracking-wider text-gray-900';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <nav aria-label="Sheet">
            <h2 className={headingClass}>Sheet</h2>
            <ul className="mt-3 space-y-2">
              <li><Link href="/joyagoo-spreadsheet" className={linkClass}>JoyaGoo Spreadsheet</Link></li>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/joyagoo-spreadsheet?category=${c.slug}`} className={linkClass}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Guides">
            <h2 className={headingClass}>Guides</h2>
            <ul className="mt-3 space-y-2">
              {GUIDES.map((g) => (
                <li key={g.href}><Link href={g.href} className={linkClass}>{g.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label="About">
            <h2 className={headingClass}>About</h2>
            <ul className="mt-3 space-y-2">
              {ABOUT.map((a) => (
                <li key={a.href}><Link href={a.href} className={linkClass}>{a.label}</Link></li>
              ))}
              <li>
                <a href={AGENT_URL} target="_blank" rel={AGENT_LINK_REL} className={linkClass}>
                  {AGENT_NAME} official site
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 space-y-2 border-t border-gray-200 pt-6">
          <Disclosure />
          <p className="text-xs text-gray-500">Content last reviewed {CONTENT_LAST_REVIEWED}</p>
          <p className="text-xs text-gray-500">© {year} {SITE_NAME}</p>
        </div>
      </div>
    </footer>
  );
}
