// components/Disclosure.tsx  – server component, one line of honesty.
import { INDEPENDENT_NOTE, AFFILIATE_NOTE } from '@/lib/site';

export default function Disclosure({ short = false, className = '' }: { short?: boolean; className?: string }) {
  return (
    <p className={className || 'text-xs text-gray-500'}>
      {INDEPENDENT_NOTE}{short ? '' : ` ${AFFILIATE_NOTE}`}
    </p>
  );
}
