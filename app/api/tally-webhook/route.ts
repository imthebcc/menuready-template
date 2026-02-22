import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('[Tally Webhook] Received:', JSON.stringify(body, null, 2));

    // Extract form data from Tally webhook payload
    const data = body.data || {};
    const fields = data.fields || [];
    
    // Map field labels to values
    const formData: Record<string, string> = {};
    fields.forEach((field: any) => {
      if (field.label && field.value) {
        formData[field.label] = field.value;
      }
    });

    const name = formData['Name'] || formData['name'] || 'Not provided';
    const restaurant = formData['Restaurant'] || formData['restaurant'] || 'Not provided';
    const message = formData['Message'] || formData['message'] || formData['How can we help?'] || 'Not provided';
    const timestamp = new Date().toLocaleString('en-US', { 
      timeZone: 'America/Los_Angeles',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    // Get Telegram chat ID from environment variable
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!telegramChatId || !telegramBotToken) {
      console.error('[Tally Webhook] Missing Telegram credentials');
      // Still return 200 to Tally so they don't retry
      return NextResponse.json({ 
        success: false, 
        error: 'Missing Telegram configuration' 
      });
    }

    // Format Telegram message
    const telegramMessage = `🚨 *New Help Request!*

*Name:* ${name}
*Restaurant:* ${restaurant}
*Message:* ${message}
*Time:* ${timestamp}`;

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('[Tally Webhook] Telegram API error:', telegramData);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to send Telegram message',
        details: telegramData 
      });
    }

    console.log('[Tally Webhook] Telegram message sent successfully');

    return NextResponse.json({ 
      success: true,
      message: 'Webhook processed and Telegram notification sent'
    });
  } catch (error) {
    console.error('[Tally Webhook] Error:', error);
    
    // Return 200 to Tally even on error to prevent retries
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
