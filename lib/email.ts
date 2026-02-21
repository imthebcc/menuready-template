import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface InternalAlertParams {
  restaurantName: string;
  slug: string;
  customerEmail: string;
  amount: number;
  timestamp: string;
}

/**
 * Send internal alert to Tim and Remi
 */
export async function sendInternalAlert(params: InternalAlertParams) {
  if (!resend) {
    console.log('[Email] Resend not configured, logging internal alert:', params);
    return { success: true, demo: true };
  }
  
  const { restaurantName, slug, customerEmail, amount, timestamp } = params;
  
  // Hardcoded recipients
  const recipients = [
    'runitremi@gmail.com', // Remi
    // Add Tim's email here when available
  ];
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Menus Ready Alerts <alerts@menusready.com>',
      to: recipients,
      subject: `💰 New purchase — ${restaurantName}`,
      html: `
        <h2>New Purchase Alert</h2>
        
        <p><strong>Restaurant:</strong> ${restaurantName}</p>
        <p><strong>Customer email:</strong> ${customerEmail}</p>
        <p><strong>Slug:</strong> <code>${slug}</code></p>
        <p><strong>Time:</strong> ${timestamp}</p>
        
        <p><strong>Preview page is now unlocked. Files are live.</strong></p>
        
        <p><a href="https://menusready.com/preview/${slug}" style="display: inline-block; padding: 12px 24px; background: #16a34a; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">View Unlocked Page</a></p>
      `,
    });
    
    if (error) {
      console.error('[Email] Internal alert error:', error);
      return { success: false, error };
    }
    
    console.log('[Email] Internal alert sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('[Email] Internal alert exception:', error);
    return { success: false, error };
  }
}
