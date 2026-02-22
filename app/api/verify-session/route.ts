import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { valid: false, error: 'Missing session ID' },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    
    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify payment was successful
    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        { valid: false, error: 'Payment not completed' },
        { status: 403 }
      );
    }

    // Return success with restaurant slug from metadata
    return NextResponse.json({
      valid: true,
      restaurant: session.metadata?.slug || null,
    });
  } catch (error) {
    console.error('[Verify Session] Error:', error);
    return NextResponse.json(
      { valid: false, error: 'Invalid session' },
      { status: 403 }
    );
  }
}
