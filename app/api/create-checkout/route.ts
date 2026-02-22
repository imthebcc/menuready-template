import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;

    console.log('[Checkout] Creating session for:', slug);

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing restaurant slug' },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Get Stripe instance (lazy initialization)
    const stripe = getStripe();

    // Create checkout session using Stripe Price ID
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ONETIME,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/success?restaurant=${slug}`,
      cancel_url: `${appUrl}/preview/${slug}`,
      metadata: {
        slug: slug,
      },
    });

    console.log('[Checkout] Session created:', session.id);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[Checkout] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
