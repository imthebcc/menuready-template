import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, email, priceType } = body; // priceType: 'onetime' or 'subscription'

    if (!slug || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create checkout session based on price type
    const sessionParams: any = {
      customer_email: email,
      payment_method_types: ['card'],
      mode: priceType === 'subscription' ? 'subscription' : 'payment',
      success_url: `${appUrl}/confirmation?slug=${slug}&paid=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/preview/${slug}`,
      metadata: {
        restaurant_slug: slug,
        price_type: priceType,
      },
    };

    if (priceType === 'subscription') {
      // $19/month subscription
      sessionParams.line_items = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'MenuReady Pro Subscription',
              description: 'Monthly menu management and analytics',
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: 1900, // $19.00
          },
          quantity: 1,
        },
      ];
    } else {
      // $99 one-time payment
      sessionParams.line_items = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'MenuReady Upgrade - Done-For-You',
              description: 'Professional Yelp submission + menu optimization',
            },
            unit_amount: 9900, // $99.00
          },
          quantity: 1,
        },
      ];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
