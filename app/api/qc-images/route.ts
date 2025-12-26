// app/api/qc-images/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { decryptImageUrl } from '@/lib/cryptoUtils';

const KAKOBUY_API_URL = 'https://open.kakobuy.com/open/pic/qcImage';
const KAKOBUY_API_TOKEN = process.env.KAKOBUY_API_TOKEN || '4b05cf382e5c5d4514eec44ba9affa30';
const URL_KEY = process.env.URL_KEY || 'Yui@OLI#LohTcretKkeRE';

export async function POST(request: NextRequest) {
  try {
    const { goodsUrl } = await request.json();

    if (!goodsUrl) {
      return NextResponse.json({ 
        status: 'error', 
        message: 'Goods URL is required' 
      }, { status: 400 });
    }

    // ✅ Sende Anfrage als POST
    const response = await fetch(KAKOBUY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: KAKOBUY_API_TOKEN,
        goodsUrl: goodsUrl
      }),
    });

    const rawData = await response.text(); // Lesen als TEXT zuerst

    let data: any = {};
    try {
      data = JSON.parse(rawData); // Danach sicher in JSON parsen
    } catch (e) {
      // API returned non-JSON (e.g., IP whitelist error)
      console.error('❌ KakoBuy API returned non-JSON:', rawData.substring(0, 100));
      return NextResponse.json({
        status: 'error',
        message: rawData.includes('whitelist')
          ? 'Server IP not whitelisted with KakoBuy API'
          : 'Invalid response from QC API',
      }, { status: 502 });
    }

    // Wenn Response nicht OK oder Data leer/problematisch
    if (!response.ok || !data || data.status !== 'success') {
      return NextResponse.json({
        status: 'error',
        message: data.message || 'Unexpected response from KakoBuy API',
        raw: data,
      }, { status: response.status || 502 });
    }

    // Erfolgreich? → Bilder verarbeiten
    const processedData = (data.data || []).map((item: any) => {
      const encryptedPart = new URL(item.image_url).searchParams.get('data');

      if (encryptedPart) {
        const decryptedUrl = decryptImageUrl(encryptedPart, URL_KEY);
        return {
          ...item,
          image_url: decryptedUrl || item.image_url
        };
      }

      return item;
    });

    return NextResponse.json({
      status: 'success',
      data: processedData,
    });

  } catch (error: any) {
    console.error('❌ Error fetching QC images:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: error.message || 'An internal server error occurred' 
    }, { status: 500 });
  }
}
