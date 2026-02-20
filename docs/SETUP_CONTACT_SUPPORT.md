# Contact & Support Setup Guide

**Quick setup for contact form + chat widget (both FREE)**

---

## 1. Contact Form (Web3Forms - FREE)

### Step 1: Get Access Key
1. Go to https://web3forms.com/
2. Enter your email (the one you want to receive contact form submissions)
3. Click "Get Access Key"
4. Copy the access key they send you

### Step 2: Add to Code
Open `app/contact/page.tsx` and replace:
```tsx
<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
```

With:
```tsx
<input type="hidden" name="access_key" value="abc123-your-actual-key-xyz789" />
```

**Done!** Contact form will now send to your email.

---

## 2. Tawk Chat Widget (FREE)

### Step 1: Create Tawk Account
1. Go to https://www.tawk.to/
2. Sign up (free)
3. Create a new property (enter your website name)

### Step 2: Get Widget Code
1. In Tawk dashboard, go to **Administration → Channels → Chat Widget**
2. Click on your widget
3. Copy the **Property ID** and **Widget ID** from the embed code

It looks like:
```javascript
https://embed.tawk.to/PROPERTY_ID/WIDGET_ID
```

### Step 3: Add to Code
Open `app/layout.tsx` and replace:
```tsx
s1.src='https://embed.tawk.to/YOUR_TAWK_PROPERTY_ID/YOUR_TAWK_WIDGET_ID';
```

With:
```tsx
s1.src='https://embed.tawk.to/65f1234567890/1a2b3c4d5e6f';
```

**Done!** Chat widget will appear on all pages.

---

## 3. Test Everything

### Test Contact Form
1. Go to `/contact`
2. Fill out form
3. Submit
4. Check your email for the submission

### Test Chat Widget
1. Go to any page on your site
2. Look for chat bubble in bottom-right corner
3. Click it
4. Send a test message
5. Check Tawk dashboard for the message

---

## 4. Configure Tawk Settings (Optional)

### Set Offline Message
1. In Tawk dashboard → **Administration → Channels → Chat Widget**
2. Click **Triggers & Messaging**
3. Set offline message: "We're away. Email support@menuready.com for faster response."

### Set Business Hours
1. Go to **Administration → Monitoring & Reports → Availability**
2. Set hours: 9 AM - 6 PM PST (or whatever you want)

### Email Notifications
1. Go to **Administration → Personal Settings → Email Notifications**
2. Enable "New message received"

---

## 5. Email Forwarding (Optional)

If you want `support@menuready.com` to forward to your personal email:

### Option A: Gmail (Free)
1. Set up email forwarding in your domain provider
2. Forward `support@menuready.com` → your Gmail

### Option B: Cloudflare Email Routing (Free)
1. Go to Cloudflare dashboard
2. Navigate to Email → Email Routing
3. Create route: `support@menuready.com` → your email

---

## Quick Reference

**Contact form submissions go to:** Your email (via Web3Forms)  
**Chat messages go to:** Tawk dashboard + email notifications  
**Response time:** <24 hours (set expectations on site)

---

## Total Cost

- Web3Forms: **FREE** (unlimited emails)
- Tawk: **FREE** (unlimited chats)
- Email forwarding: **FREE**

**Total: $0/month** ✓

---

## Need Help?

If you run into issues:
1. Check spam folder for Web3Forms access key email
2. Make sure Tawk IDs are copied exactly
3. Test in incognito mode (clears cache)

**Still stuck?** Let me know and I'll help troubleshoot.

---

**Last Updated:** 2026-02-20  
**Setup Time:** ~10 minutes
