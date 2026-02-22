import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const restaurant = searchParams.get('restaurant');

    if (!restaurant) {
      return NextResponse.json(
        { error: 'Missing restaurant parameter' },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://menusready.com';
    const menuUrl = `${appUrl}/menu/${restaurant}`;

    // Generate QR code as PNG buffer
    const qrBuffer = await QRCode.toBuffer(menuUrl, {
      width: 512,
      margin: 2,
      color: {
        dark: '#111111',
        light: '#FFFFFF'
      }
    });

    // Return as downloadable PNG using Uint8Array
    return new NextResponse(new Uint8Array(qrBuffer), {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="${restaurant}-qr-code.png"`,
      },
    });
  } catch (error) {
    console.error('[Download QR] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}
