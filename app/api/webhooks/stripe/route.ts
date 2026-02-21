import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { generateDeliverables } from '@/lib/fileGeneration';
import { sendCustomerEmail, sendInternalAlert } from '@/lib/email';

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
    console.error('[Webhook] Signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const slug = session.metadata?.slug;
    const customerEmail = session.customer_email;

    if (!slug || !customerEmail) {
      console.error('[Webhook] Missing slug or customer_email in session metadata');
      return NextResponse.json({ received: true });
    }

    console.log(`[Webhook] Processing payment for ${slug}, customer: ${customerEmail}`);

    try {
      // 1. Update Supabase - mark restaurant as paid
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        const { error: updateError } = await supabase
          .from('restaurants')
          .update({
            paid: true,
            paid_at: new Date().toISOString(),
            customer_email: customerEmail,
          })
          .eq('slug', slug);

        if (updateError) {
          console.error('[Webhook] Supabase update error:', updateError);
        } else {
          console.log(`[Webhook] ✅ Restaurant ${slug} marked as paid`);
        }
      } else {
        console.log('[Webhook] Supabase not configured, skipping database update');
      }

      // 2. Generate deliverables (QR code, text menu, etc.)
      console.log(`[Webhook] Generating deliverables for ${slug}...`);
      const { qrCode, textMenu } = await generateDeliverables(slug);
      console.log('[Webhook] ✅ Deliverables generated');

      // 3. Send customer email with files
      console.log(`[Webhook] Sending customer email to ${customerEmail}...`);
      const menuData = require(`@/data/restaurants/${slug}/menu.json`);
      await sendCustomerEmail({
        customerEmail,
        restaurantName: menuData.restaurant,
        slug,
        qrCode,
        textMenu,
      });
      console.log('[Webhook] ✅ Customer email sent');

      // 4. Send internal alert to Tim + Remi
      console.log('[Webhook] Sending internal alert...');
      await sendInternalAlert({
        restaurantName: menuData.restaurant,
        slug,
        customerEmail,
        amount: 99,
        timestamp: new Date().toISOString(),
      });
      console.log('[Webhook] ✅ Internal alert sent');

      console.log(`[Webhook] 🎉 Complete delivery flow finished for ${slug}`);
    } catch (error) {
      console.error('[Webhook] Error in post-purchase flow:', error);
      // Don't fail the webhook - Stripe will retry
    }
  }

  return NextResponse.json({ received: true });
}
