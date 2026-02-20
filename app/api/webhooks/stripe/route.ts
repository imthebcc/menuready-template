import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { restaurant_slug, price_type } = session.metadata || {};

    if (!restaurant_slug) {
      console.error('No restaurant_slug in session metadata');
      return NextResponse.json({ received: true });
    }

    // Determine status based on price type
    const status = price_type === 'subscription' ? 'paid_subscription' : 'paid_onetime';

    // Update customer status in Supabase
    const { error: updateError } = await supabase
      .from('customers')
      .update({
        status,
        stripe_session_id: session.id,
        stripe_subscription_id: session.subscription as string || null,
        updated_at: new Date().toISOString(),
      })
      .eq('restaurant_slug', restaurant_slug)
      .eq('email', session.customer_email);

    if (updateError) {
      console.error('Error updating customer:', updateError);
      return NextResponse.json(
        { error: 'Failed to update customer' },
        { status: 500 }
      );
    }

    console.log(`✅ Payment successful for ${restaurant_slug} - ${status}`);

    // TODO: Send notification email to admin
  }

  return NextResponse.json({ received: true });
}
