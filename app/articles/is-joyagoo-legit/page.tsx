// app/articles/is-joyagoo-legit/page.tsx
import Link from 'next/link';
import ArticleShell, { Source } from '../_components/ArticleShell';
import AgentCta from '@/components/AgentCta';
import { articleMetadata } from '@/content/articles';
import { activeOffers } from '@/lib/offers';
import { AGENT_URL, AGENT_LINK_REL } from '@/lib/site';

const SLUG = 'is-joyagoo-legit';
export const metadata = articleMetadata(SLUG);

const TRUSTPILOT = 'https://uk.trustpilot.com/review/joyagoo.com';
const RDAP = 'https://rdap.verisign.com/com/v1/domain/joyagoo.com';

export default function IsJoyaGooLegitPage() {
  const offer = activeOffers()[0]?.headline ?? null;

  return (
    <ArticleShell
      slug={SLUG}
      lead={
        <>
          Short answer: JoyaGoo is a real, working shopping agent that buyers report receiving parcels from. It is also
          young, based in China, and the kind of business where the risks sit mostly with you. Here is what we could
          verify, what we could not, and how to limit your risk. We run an independent spreadsheet for JoyaGoo and earn
          a commission through our invite link, so read this with that in mind.
        </>
      }
    >
      <h2 id="what-it-is">What JoyaGoo is</h2>
      <p>
        JoyaGoo is a Chinese purchasing and shipping agent. You send it a product link from Taobao, Weidian, 1688 or
        similar sites; it buys the item, receives it in its warehouse, takes photos and ships it to you. On its
        Trustpilot profile JoyaGoo describes itself in these terms and lists China as its country and
        support@joyagoo.com as contact. No company address is listed there.
      </p>
      <Source href={TRUSTPILOT} label="JoyaGoo on Trustpilot, company details" />

      <h2 id="how-long">How long it has existed</h2>
      <p>
        The domain joyagoo.com was registered on 11 March 2025 through Alibaba Cloud (HiChina). JoyaGoo claimed its
        Trustpilot profile in March 2025, and the oldest posts in the r/JoyaGoo subreddit we found are from March 2025.
        So JoyaGoo has been public for roughly a year and a half. We found no reliable information about the company or
        people behind it.
      </p>
      <Source href={RDAP} label="Verisign RDAP record for joyagoo.com" />
      <Source href="https://www.reddit.com/r/JoyaGoo/" label="r/JoyaGoo" />

      <h2 id="business-model">How shopping agents make money</h2>
      <ul>
        <li>Charges on international shipping (usually the largest part of their margin).</li>
        <li>Service or handling charges on purchases and extra services such as photos, packing or insurance.</li>
        <li>Currency conversion and payment processing.</li>
      </ul>
      <p>
        Agents also pay affiliates like us for new customers, and they hand out coupon packs to new accounts. Coupons
        are discounts on charges the agent sets itself, not free money. The exact fees JoyaGoo charges today are shown
        in your account; we do not quote them because they change.
      </p>

      <h2 id="risks">The risks, plainly</h2>
      <h3>Replicas and the law</h3>
      <p>
        A large share of what is bought through agents, including many finds in spreadsheets like ours, are replicas of
        branded goods. In the EU, customs can seize counterfeit goods even when they are for private use, and you may
        lose the item and what you paid for it. That risk exists regardless of which agent you use.
      </p>
      <h3>Customs and import costs</h3>
      <p>
        Since 1 July 2026 the EU no longer lets low-value parcels in duty-free, and import VAT has always applied. A
        cheap haul can cost noticeably more than the spreadsheet price. Details for Germany are in{' '}
        <Link href="/articles/joyagoo-shipping-to-germany">our shipping and customs guide</Link>.
      </p>
      <h3>Agent risk</h3>
      <p>
        Your money and your items sit with a company in China that you cannot easily take to court. Agents in this
        market do disappear or stop working normally: in 2025 and 2026 several agents that had been popular a year
        earlier went through shutdowns or long disruptions that left buyers worried about their balances and warehouse
        parcels. JoyaGoo is younger than most of them. Do not treat an agent account as a place to keep money.
      </p>

      <h2 id="what-users-report">What buyers report</h2>
      <p>
        JoyaGoo&apos;s Trustpilot page showed 2,924 reviews when we read it. Trustpilot notes that the company has not
        invited customers recently and has not replied to negative reviews; reviews are self-selected and their content is not checked
        by Trustpilot. Positive reviews mostly mention fast replies, useful QC photos and parcels arriving. The
        negative reviews we read describe:
      </p>
      <ul>
        <li>shipping costs that were much higher than expected, sometimes more than the goods;</li>
        <li>orders that could not be cancelled, or refunds that did not arrive;</li>
        <li>parcels returned or destroyed by customs, and damaged parcels without a successful claim;</li>
        <li>slow or unhelpful support, and an account restricted during a payment dispute.</li>
      </ul>
      <Source href={TRUSTPILOT} label="JoyaGoo on Trustpilot" />
      <p>
        On Reddit, r/JoyaGoo is small. Threads from March 2025 include a haul that arrived about 20 days after the first
        shipping update, a user who could not pay for an order, and several days of QC photo links not loading with
        support replies the user called generic.
      </p>
      <Source
        href="https://www.reddit.com/r/JoyaGoo/comments/1jn0f7e/qc_links_broken/"
        label="r/JoyaGoo, “QC links broken”"
      />
      <Source
        href="https://www.reddit.com/r/JoyaGoo/comments/1jljf6m/why_cant_i_pay_for_my_order/"
        label="r/JoyaGoo, “why can’t i pay for my order”"
      />

      <h2 id="verdict">Our conclusion, with limits</h2>
      <p>
        JoyaGoo is a functioning agent: people order, receive QC photos and get parcels. It is not a scam in the sense
        of a fake shop. But it is young, we cannot see who runs it, and the complaints are the typical agent problems
        (shipping cost surprises, refunds, support). We have not audited JoyaGoo and we earn money when you sign up, so
        please do not treat this as a guarantee of anything.
      </p>

      <h2 id="checklist">Checklist before your first order</h2>
      <ul>
        <li>Make sure you are on <a href={AGENT_URL} target="_blank" rel={AGENT_LINK_REL}>joyagoo.com</a> or JoyaGoo&apos;s app, not a lookalike domain.</li>
        <li>Start with one or two inexpensive items.</li>
        <li>Top up only what you are about to spend; do not keep a large balance.</li>
        <li>Check the QC photos carefully and raise problems before you ship.</li>
        <li>Use the shipping estimate in your account, then add import VAT and duty for your country.</li>
        <li>Pay with a method that offers buyer protection where possible.</li>
        <li>Save screenshots of orders, QC photos and support chats.</li>
      </ul>
      <p>
        Step-by-step instructions are in <Link href="/articles/how-to-buy-on-joyagoo">How to buy on JoyaGoo</Link>.
      </p>

      <AgentCta variant="box" offerHeadline={offer} />
    </ArticleShell>
  );
}
