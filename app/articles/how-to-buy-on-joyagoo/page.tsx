// app/articles/how-to-buy-on-joyagoo/page.tsx
import Link from 'next/link';
import ArticleShell from '../_components/ArticleShell';
import AgentCta from '@/components/AgentCta';
import { articleMetadata } from '@/content/articles';
import { activeOffers } from '@/lib/offers';
import { AGENT_URL, AGENT_LINK_REL } from '@/lib/site';

const SLUG = 'how-to-buy-on-joyagoo';
export const metadata = articleMetadata(SLUG);

export default function HowToBuyOnJoyaGooPage() {
  const offer = activeOffers()[0]?.headline ?? null;

  return (
    <ArticleShell
      slug={SLUG}
      lead={
        <>
          JoyaGoo is a shopping agent: you pay JoyaGoo, JoyaGoo buys the item from a Chinese marketplace seller
          (Taobao, Weidian, 1688), receives it in its warehouse in China and ships it to you. This spreadsheet is
          only the list of finds. Ordering, payment and support all happen in your JoyaGoo account.
        </>
      }
    >
      <h2 id="overview">The whole process in eight steps</h2>
      <ol>
        <li><a href="#register">Create a JoyaGoo account</a></li>
        <li><a href="#pick">Pick a find in the spreadsheet</a></li>
        <li><a href="#open">Open it on JoyaGoo and choose size and colour</a></li>
        <li><a href="#pay">Pay JoyaGoo for the item and domestic shipping</a></li>
        <li><a href="#purchase">JoyaGoo buys from the seller</a></li>
        <li><a href="#warehouse">The item arrives in the warehouse</a></li>
        <li><a href="#qc-photos">Check the QC photos</a></li>
        <li><a href="#shipping">Rehearse the parcel, choose a shipping line, pay and wait for customs</a></li>
      </ol>

      <h2 id="register">1. Create a JoyaGoo account</h2>
      <p>
        You need an account on{' '}
        <a href={AGENT_URL} target="_blank" rel={AGENT_LINK_REL}>joyagoo.com</a> before you can order anything. Our
        register link carries our invite code: if you order through it, JoyaGoo pays us a commission. It does not change
        your prices.
      </p>
      <AgentCta variant="box" offerHeadline={offer} />

      <h2 id="pick">2. Pick a find in the spreadsheet</h2>
      <p>
        Browse the <Link href="/joyagoo-spreadsheet">spreadsheet</Link> by category or search. Each row shows the
        seller&apos;s listing price in yuan and an approximate conversion. That is the seller&apos;s price only:
        JoyaGoo&apos;s charges, domestic shipping in China, international shipping and import taxes come on top. Rows
        marked &ldquo;Sponsored&rdquo; are paid placements by sellers.
      </p>

      <h2 id="open">3. Open it on JoyaGoo</h2>
      <p>
        &ldquo;Open on JoyaGoo&rdquo; takes you to the same product inside JoyaGoo. Check there that the seller&apos;s
        page still exists, the price has not changed and your size and colour are in stock. Sellers change listings
        often. If a link is dead, please <Link href="/features/dead-link">report it</Link>.
      </p>

      <h2 id="pay">4. Pay JoyaGoo</h2>
      <p>
        You add the item to your JoyaGoo cart and pay for it plus the seller&apos;s domestic shipping to the warehouse.
        Payment methods and any service charges are shown at checkout and can change, so check them in your account
        rather than trusting a number from a third-party site, including this one.
      </p>

      <h2 id="purchase">5. JoyaGoo buys from the seller</h2>
      <p>
        JoyaGoo&apos;s purchasing staff place the order with the seller. If the item is out of stock or the price has
        changed, the agent contacts you through the order messages. Keep an eye on them: an unanswered message can hold
        up the order.
      </p>

      <h2 id="warehouse">6. The item arrives in the warehouse</h2>
      <p>
        The seller ships to JoyaGoo&apos;s warehouse in China. How long that takes depends on the seller. Free storage
        time and any fees after it are set by JoyaGoo; check the current terms in your account.
      </p>

      <h2 id="qc-photos">7. Check the QC photos</h2>
      <p>
        The photos in this spreadsheet are <strong>seller photos</strong>, taken from the marketplace listing. They show
        what the seller wants you to see, not the exact piece you will receive.
      </p>
      <p>
        <strong>QC (quality control) photos</strong> are taken by JoyaGoo&apos;s warehouse staff once your item has
        arrived. You find them in your JoyaGoo account under the order. They show the actual item: check size labels,
        stitching, colour, prints and visible defects. If something is wrong, ask about an exchange or return through the
        order <em>before</em> you ship. Once the parcel has left China, returns are much harder.
      </p>
      <p>
        In March 2025 users in r/JoyaGoo reported that QC photo links did not load for several days; one user got them
        to open via the share button in a new tab. Source:{' '}
        <a href="https://www.reddit.com/r/JoyaGoo/comments/1jn0f7e/qc_links_broken/" target="_blank" rel="noopener noreferrer">
          r/JoyaGoo, &ldquo;QC links broken&rdquo;
        </a>{' '}
        (read 12 Oct 2026).
      </p>

      <h2 id="shipping">8. Rehearse, choose a shipping line, pay, wait for customs</h2>
      <p>
        When everything you want is in the warehouse, you submit the items as one parcel. Agents usually offer a
        &ldquo;rehearsal&rdquo; (packing preview) so you can see the packed weight and size before you pay for
        international shipping. The shipping lines on offer, their prices and their delivery times depend on your
        destination and change over time. Compare them in your account on the day you ship.
      </p>
      <p>
        Your parcel then goes through customs in your country. For Germany and the EU see{' '}
        <Link href="/articles/joyagoo-shipping-to-germany">JoyaGoo shipping to Germany &amp; the EU</Link>.
      </p>

      <h2 id="before-you-start">Before you start</h2>
      <ul>
        <li>
          Many finds are replicas of branded goods. Importing counterfeits can be illegal where you live, and customs can
          seize them.
        </li>
        <li>Pay only on joyagoo.com or in JoyaGoo&apos;s app, never to someone who contacts you privately.</li>
        <li>
          Read <Link href="/articles/is-joyagoo-legit">Is JoyaGoo legit?</Link> before a large first order, and start
          small.
        </li>
      </ul>
    </ArticleShell>
  );
}
