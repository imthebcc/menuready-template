import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface CustomerEmailParams {
  customerEmail: string;
  restaurantName: string;
  slug: string;
  qrCode: Buffer;
  textMenu: string;
}

interface InternalAlertParams {
  restaurantName: string;
  slug: string;
  customerEmail: string;
  amount: number;
  timestamp: string;
}

/**
 * Send delivery email to customer with all files
 */
export async function sendCustomerEmail(params: CustomerEmailParams) {
  if (!resend) {
    console.log('[Email] Resend not configured, logging customer email:', params);
    return { success: true, demo: true };
  }
  
  const { customerEmail, restaurantName, slug, qrCode, textMenu } = params;
  const menuUrl = `https://menusready.com/menu/${slug}`;
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Menus Ready <hello@menusready.com>',
      to: [customerEmail],
      subject: `Your Menus Ready menu is live 🎉`,
      html: `
        <h2>Hi there,</h2>
        <p>Your digital menu for <strong>${restaurantName}</strong> is ready.</p>
        
        <p>Here's everything:</p>
        <ul>
          <li><strong>Live menu link:</strong> <a href="${menuUrl}">${menuUrl}</a></li>
          <li><strong>QR code:</strong> attached (print and display)</li>
          <li><strong>Text version:</strong> attached (easy to paste)</li>
        </ul>
        
        <p>Print the QR code and put it on your tables, front door, or share it on Instagram.</p>
        
        <p>— The Menus Ready Team</p>
      `,
      attachments: [
        {
          filename: `${slug}-qr-code.png`,
          content: qrCode,
        },
        {
          filename: `${slug}-menu.txt`,
          content: Buffer.from(textMenu),
        },
      ],
    });
    
    if (error) {
      console.error('[Email] Customer email error:', error);
      return { success: false, error };
    }
    
    console.log('[Email] Customer email sent:', data);
    return { success: true, data };
  } catch (error) {
    console.error('[Email] Customer email exception:', error);
    return { success: false, error };
  }
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
      subject: `💰 New Menus Ready purchase — ${restaurantName}`,
      html: `
        <h2>New Purchase Alert</h2>
        
        <p><strong>Restaurant:</strong> ${restaurantName}</p>
        <p><strong>Slug:</strong> <code>${slug}</code></p>
        <p><strong>Customer email:</strong> ${customerEmail}</p>
        <p><strong>Amount:</strong> $${amount}</p>
        <p><strong>Time:</strong> ${timestamp}</p>
        
        <h3>Action needed:</h3>
        <ul>
          <li>Verify menu is accurate</li>
          <li>Post to their Yelp / Google if needed</li>
          <li>Follow up in 48hrs</li>
        </ul>
        
        <p><a href="https://menusready.com/preview/${slug}">View menu preview</a></p>
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
