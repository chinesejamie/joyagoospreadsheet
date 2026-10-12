'use client';

import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import AgentCta from '@/components/AgentCta';
import { AGENT_NAME, SITE_NAME } from '@/lib/site';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'JoyaGoo Spreadsheet', href: '/joyagoo-spreadsheet' },
  { name: 'How to buy', href: '/articles/how-to-buy-on-joyagoo' },
  { name: `Is ${AGENT_NAME} legit?`, href: '/articles/is-joyagoo-legit' },
  { name: 'Coupons', href: '/articles/joyagoo-coupons-2026' },
  { name: 'FAQ', href: '/features/faq' },
];

const ctaClass =
  'inline-flex items-center justify-center rounded-md bg-primary-500 px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-primary-600 transition-colors';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-30 bg-white shadow-md">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* Left Side: Logo */}
        <div className="flex lg:flex-1 items-center">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{SITE_NAME}</span>
            <Image
              src="/staticImages/JoyaGooSpreadSheet.webp"
              alt={`${SITE_NAME} logo`}
              width={120}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Mobile menu open button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <AgentCta variant="button" label={`Register on ${AGENT_NAME}`} className={ctaClass} />
        </div>
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <div className="fixed inset-0 z-50 bg-black/30" aria-hidden="true" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">{SITE_NAME}</span>
              <Image
                src="/staticImages/JoyaGooSpreadSheet.webp"
                alt={`${SITE_NAME} logo`}
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-100"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <AgentCta variant="button" label={`Register on ${AGENT_NAME}`} className={ctaClass} />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
