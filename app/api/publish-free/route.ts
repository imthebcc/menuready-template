import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, slug, confirmOwnership } = body;

    console.log('[Publish Free] Request:', { email, slug, confirmOwnership });

    // Validation
    if (!email || !slug || !confirmOwnership) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // For MVP: skip Supabase, just return success
    // In production, this would save to database
    console.log('[Publish Free] MVP mode - skipping database save');
    console.log('[Publish Free] Would save:', { email, slug, status: 'free' });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const liveUrl = `${appUrl}/menu/${slug}`;

    const customer = {
      id: `mock-${Date.now()}`,
      restaurant_slug: slug,
      email,
      status: 'free',
      created_at: new Date().toISOString(),
    };

    console.log('[Publish Free] Success:', liveUrl);

    return NextResponse.json({
      success: true,
      liveUrl,
      customer,
    });
  } catch (error) {
    console.error('[Publish Free] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}
