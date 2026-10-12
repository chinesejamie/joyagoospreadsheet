// app/articles/joyagoo-shipping-to-germany/page.tsx
import Link from 'next/link';
import ArticleShell, { Source } from '../_components/ArticleShell';
import AgentCta from '@/components/AgentCta';
import { articleMetadata } from '@/content/articles';
import { activeOffers } from '@/lib/offers';

const SLUG = 'joyagoo-shipping-to-germany';
export const metadata = articleMetadata(SLUG);

const COUNCIL_DEC_2025 =
  'https://www.consilium.europa.eu/en/press/press-releases/2025/12/12/customs-council-agrees-to-levy-customs-duty-on-small-parcels-as-of-1-july-2026/';
const COUNCIL_FEB_2026 =
  'https://www.consilium.europa.eu/en/press/press-releases/2026/02/11/council-gives-final-green-light-to-new-customs-duty-rules-for-small-parcels/';
const LAW_SOCIETY_SEP_2026 =
  'https://www.lawsociety.ie/gazette/top-stories/2026/september/eu-member-states-back-customs-overhaul/';
const ZOLL_POST = 'https://www.zoll.de/DE/Privatpersonen/Post-Internet/post-internet_node.html';

export default function JoyaGooShippingGermanyPage() {
  const offer = activeOffers()[0]?.headline ?? null;

  return (
    <ArticleShell
      slug={SLUG}
      lead={
        <>
          A JoyaGoo parcel to Germany costs more than the item price: international shipping, 19 % import VAT and,
          since July 2026, an EU customs duty on low-value parcels. Here is how it works, with sources, and what you
          have to check yourself.
        </>
      }
    >
      <h2 id="process">How a parcel gets from JoyaGoo to Germany</h2>
      <ol>
        <li>Your items arrive in JoyaGoo&apos;s warehouse in China and you approve the QC photos.</li>
        <li>You submit them as one parcel and choose a shipping line in your account.</li>
        <li>You pay international shipping to JoyaGoo; the parcel is handed to the carrier.</li>
        <li>The parcel enters the EU and is cleared by customs, in Germany by the Zoll.</li>
        <li>Import VAT and duty are paid, either already through the shipping line or by you on delivery or at the customs office.</li>
        <li>A local carrier (often DHL, DPD, GLS or Hermes) delivers it.</li>
      </ol>
      <p>
        Which of these steps the shipping line handles for you (for example whether taxes are prepaid) depends on the
        line. The description of each line in your JoyaGoo account is the only up-to-date source for that.
      </p>

      <h2 id="customs-2026">What changed in EU customs in 2026</h2>
      <h3>From 1 July 2026: no more duty-free parcels under €150</h3>
      <p>
        Until mid-2026, goods worth up to €150 entered the EU without customs duty (VAT was still due). Since 1 July
        2026 a fixed customs duty of €3 applies to items in small parcels worth less than €150. It is charged per
        product category in the parcel, not per parcel: the Council&apos;s own example is a parcel with two toys, one
        wool coat and three bottles of shampoo, which pays €9. The rule is an interim measure planned until 1 July 2028.
        The Council describes it as covering goods from sellers registered in the EU&apos;s IOSS VAT scheme; how a
        given agent shipping line declares your parcel decides how it applies to you.
      </p>
      <Source href={COUNCIL_DEC_2025} label="Council of the EU, press release of 12 December 2025" />
      <Source href={COUNCIL_FEB_2026} label="Council of the EU, press release of 11 February 2026" />

      <h3>From 1 November 2026: an extra handling fee per parcel</h3>
      <p>
        On top of the duty, the EU announced a flat handling fee on small parcels from outside the EU, which member
        states have to start collecting by 1 November 2026 at the latest. The amount is not written into the law; it is
        set separately (earlier proposals mentioned about €2 per item, but we found no final figure). For the amount that
        applies in Germany, check zoll.de before you ship.
      </p>
      <Source href={LAW_SOCIETY_SEP_2026} label="Law Society Gazette, “EU member states back customs overhaul”, September 2026" />
      <Source href={ZOLL_POST} label="Zoll (German customs): Post und Internet" />

      <h2 id="vat">19 % import VAT (Einfuhrumsatzsteuer)</h2>
      <p>
        Germany charges 19 % import VAT on goods from outside the EU (7 % for a few reduced-rate goods such as books).
        It is calculated on the customs value, which includes the price of the goods and the shipping cost to the EU,
        plus any customs duty. There is no minimum value: even a cheap parcel is taxed. If the carrier pays the tax for
        you at the border, it usually adds its own handling charge when it collects the money from you.
      </p>
      <Source href={ZOLL_POST} label="Zoll: Post und Internet" />

      <h2 id="example">A simple example (illustrative only)</h2>
      <p>
        Say your items cost €60 and international shipping to Germany costs €25, all clothing (one product category).
        Customs value €85. Duty €3. Import VAT 19 % of €88 = €16.72. Total before any carrier charge and before the
        November handling fee: €104.72. These are made-up round numbers to show the arithmetic, not JoyaGoo prices.
      </p>

      <h2 id="tips">Practical tips</h2>
      <ul>
        <li>
          <strong>Declare the real value.</strong> Under-declaring is a customs offence. If customs doubt the value they
          can ask for proof of payment, so keep your JoyaGoo order and payment records.
        </li>
        <li>
          <strong>Keep the paperwork.</strong> Screenshots of the order, the parcel contents and what you paid help when
          customs ask questions or a parcel is held.
        </li>
        <li>
          <strong>Branded replicas are a customs risk.</strong> Counterfeit goods can be seized and destroyed in the EU
          even for private use, and you lose what you paid. No shipping line removes that risk, whatever its description
          says.
        </li>
        <li>
          <strong>Fewer product categories, fewer duty lines.</strong> Under the €3-per-category rule, mixing many
          categories in one parcel raises the duty.
        </li>
        <li>
          <strong>Check delivery times in the account.</strong> One r/JoyaGoo user reported a haul arriving about 20 days
          after the first shipping update on normal shipping (March 2025, not Germany-specific). Times vary by line and
          season.
        </li>
      </ul>
      <Source href="https://www.reddit.com/r/JoyaGoo/comments/1jlxic2/joyabuy_55kg_haul_review/" label="r/JoyaGoo haul review, March 2025" />

      <h2 id="unknowns">What we do not know</h2>
      <p>
        We cannot see JoyaGoo&apos;s current shipping line prices, weight limits or delivery times for Germany: they
        change often and are only shown in your account. We also cannot tell you how each line handles duty and VAT
        after the 2026 changes. Use the shipping estimate in your account and add duty and VAT using the rules above.
      </p>

      <p>
        New to ordering? Start with <Link href="/articles/how-to-buy-on-joyagoo">How to buy on JoyaGoo</Link>.
      </p>
      <AgentCta variant="box" offerHeadline={offer} />

      <p className="text-sm text-gray-500">
        This is general information, not legal or tax advice. For your specific case, ask the Zoll.
      </p>
    </ArticleShell>
  );
}
