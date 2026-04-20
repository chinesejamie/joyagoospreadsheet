// app/api/qc-images/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { decryptImageUrl } from '@/lib/cryptoUtils';

const JOYAGOO_API_URL = 'https://open.kakobuy.com/open/pic/qcImage';
const JOYAGOO_API_TOKEN = process.env.JOYAGOO_API_TOKEN || '4b05cf382e5c5d4514eec44ba9affa30';
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

    // Send request as POST
    const response = await fetch(JOYAGOO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: JOYAGOO_API_TOKEN,
        goodsUrl: goodsUrl
      }),
    });

    const rawData = await response.text(); // Read as TEXT first

    let data: any = {};
    try {
      data = JSON.parse(rawData); // Then safely parse to JSON
    } catch (e) {
      // API returned non-JSON (e.g., IP whitelist error)
      console.error('JoyaGoo API returned non-JSON:', rawData.substring(0, 100));
      return NextResponse.json({
        status: 'error',
        message: rawData.includes('whitelist')
          ? 'Server IP not whitelisted with JoyaGoo API'
          : 'Invalid response from QC API',
      }, { status: 502 });
    }

    // If Response not OK or Data empty/problematic
    if (!response.ok || !data || data.status !== 'success') {
      return NextResponse.json({
        status: 'error',
        message: data.message || 'Unexpected response from JoyaGoo API',
        raw: data,
      }, { status: response.status || 502 });
    }

    // Success? Process images
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
    console.error('Error fetching QC images:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message || 'An internal server error occurred'
    }, { status: 500 });
  }
}
