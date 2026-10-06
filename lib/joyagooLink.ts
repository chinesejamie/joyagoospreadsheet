// lib/joyagooLink.ts
// Baut aus einem Taobao/Tmall/Weidian/1688-Produktlink die JoyaGoo-URL im Format
// https://joyagoo.com/product?platform=WEIDIAN&id=7469216286&ref=300000171

export const JOYAGOO_REF = '300000171';

type Platform = 'WEIDIAN' | 'TAOBAO' | 'ALI_1688';

function parseSourceLink(raw: string): { platform: Platform; id: string } | null {
  const link = raw.trim();
  if (!link) return null;

  let url: URL;
  try {
    url = new URL(link.startsWith('http') ? link : `https://${link}`);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  const q = url.searchParams;

  // Weidian: weidian.com/item.html?itemID=123  |  shop123.v.weidian.com/item.html?itemId=123
  if (host.includes('weidian.com')) {
    const id = q.get('itemID') || q.get('itemId') || q.get('itemid') || q.get('id');
    return id ? { platform: 'WEIDIAN', id } : null;
  }

  // 1688: detail.1688.com/offer/123.html  |  m.1688.com/offer/123.html  |  ...?offerId=123
  if (host.includes('1688.com')) {
    const m = url.pathname.match(/\/offer\/(\d+)\.html/);
    const id = m?.[1] || q.get('offerId') || q.get('id');
    return id ? { platform: 'ALI_1688', id } : null;
  }

  // Taobao / Tmall: item.taobao.com/item.htm?id=123  |  detail.tmall.com/item.htm?id=123  |  m.tb.cn kann nicht aufgelöst werden
  if (host.includes('taobao.com') || host.includes('tmall.com') || host.includes('tmall.hk')) {
    const id =
      q.get('id') ||
      q.get('itemId') ||
      url.pathname.match(/\/i(\d+)\.htm/)?.[1] ||
      url.pathname.match(/id=(\d+)\.htm/)?.[1] || // www.taobao.com/list/item/id=123.htm
      null;
    return id ? { platform: 'TAOBAO', id } : null;
  }

  return null;
}

/**
 * Liefert die JoyaGoo-Produkt-URL mit Ref-Code (id/platform-Format; Shortlinks als url-Fallback), null ohne Link.
 */
export function buildJoyaGooLink(sourceLink?: string | null): string | null {
  if (!sourceLink) return null;

  // Bereits ein JoyaGoo-Link? Dann nur ref sicherstellen.
  if (/joyagoo\.com/i.test(sourceLink)) {
    try {
      const u = new URL(sourceLink);
      if (!u.searchParams.get('ref')) u.searchParams.set('ref', JOYAGOO_REF);
      return u.toString();
    } catch {
      return null;
    }
  }

  const parsed = parseSourceLink(sourceLink);
  if (!parsed) {
    // Shortlinks (k.youshop10.com, ikako.vip, m.tb.cn …) lassen sich nicht in id/platform zerlegen –
    // JoyaGoo den Rohlink auflösen lassen.
    return `https://joyagoo.com/product?url=${encodeURIComponent(sourceLink.trim())}&ref=${JOYAGOO_REF}`;
  }

  const p = new URLSearchParams({ platform: parsed.platform, id: parsed.id, ref: JOYAGOO_REF });
  return `https://joyagoo.com/product?${p.toString()}`;
}
