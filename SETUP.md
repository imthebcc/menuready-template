# MenuReady MVP Setup Guide

## Prerequisites

1. **Supabase Account** - https://supabase.com
2. **Stripe Account** - https://stripe.com
3. **Vercel Account** (already connected)

---

## Step 1: Set Up Supabase

### Create Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Name: `menuready`
4. Choose a region close to your users
5. Set a strong database password
6. Wait for project to provision (~2 minutes)

### Run Schema
1. In your Supabase project, go to **SQL Editor**
2. Click **New Query**
3. Copy the contents of `/supabase/schema.sql`
4. Paste and click **Run**
5. Verify tables created: `restaurants`, `menus`, `customers`

### Get API Keys
1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** (`NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public key** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)

---

## Step 2: Set Up Stripe

### Create Products

#### Product 1: Done-For-You Upgrade
1. Go to https://dashboard.stripe.com/products
2. Click **Add Product**
3. Name: `MenuReady Upgrade - Done-For-You`
4. Description: `Professional Yelp submission + menu optimization`
5. Pricing: **One-time** $99.00 USD
6. Click **Save**

#### Product 2: MenuReady Pro (Subscription)
1. Click **Add Product** again
2. Name: `MenuReady Pro Subscription`
3. Description: `Monthly menu management and analytics`
4. Pricing: **Recurring** $19.00 USD / month
5. Click **Save**

### Get API Keys
1. Go to **Developers** → **API Keys**
2. Copy:
   - **Publishable key** (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`)
   - **Secret key** (`STRIPE_SECRET_KEY`)

### Set Up Webhook
1. Go to **Developers** → **Webhooks**
2. Click **Add Endpoint**
3. Endpoint URL: `https://menuready-template.vercel.app/api/webhooks/stripe`
   (Replace with your actual Vercel domain)
4. Events to listen to:
   - `checkout.session.completed`
5. Click **Add Endpoint**
6. Copy the **Signing Secret** (`STRIPE_WEBHOOK_SECRET`)

---

## Step 3: Configure Environment Variables

### Create `.env.local`
In the project root, create `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Stripe
STRIPE_SECRET_KEY=sk_test_your-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# App URL
NEXT_PUBLIC_APP_URL=https://menuready-template.vercel.app
```

### Add to Vercel
1. Go to https://vercel.com/dashboard
2. Select your `menuready-template` project
3. Go to **Settings** → **Environment Variables**
4. Add each variable from `.env.local`
5. Make sure to select **All** environments (Production, Preview, Development)

---

## Step 4: Deploy

### Option A: Auto-Deploy (Recommended)
```bash
git add -A
git commit -m "feat: Complete MVP with Supabase and Stripe integration"
git push origin main
```

Vercel will automatically deploy. Check https://vercel.com/dashboard for status.

### Option B: Manual Deploy
```bash
npm run build
vercel --prod
```

---

## Step 5: Test the Flow

### Test Free Publish
1. Go to https://menuready-template.vercel.app
2. Click **Preview My Menu (Free)**
3. Should see Harbor Diner menu
4. Click **Publish Free**
5. Enter email + check ownership box
6. Click **Publish Now**
7. Should redirect to confirmation with:
   - Live URL
   - QR code
   - Copy/download buttons

### Test Paid Upgrade
1. From preview page, click **Upgrade — $99 one-time**
2. Should redirect to Stripe checkout
3. Use test card: `4242 4242 4242 4242`
4. Expiry: Any future date
5. CVC: Any 3 digits
6. Complete payment
7. Should redirect to confirmation with paid message

### Verify Database
1. Go to Supabase **Table Editor**
2. Check `customers` table
3. Should see your test entry with `status = 'free'` or `status = 'paid_onetime'`

---

## Step 6: Add Real Restaurants

### Manual Process (MVP)
1. Follow `/docs/DIGITIZATION_SOP.md`
2. Create folder: `/data/restaurants/[slug]/`
3. Add `menu.json` with structured data
4. Insert into Supabase:
   ```sql
   INSERT INTO restaurants (slug, name, location)
   VALUES ('restaurant-slug', 'Restaurant Name', 'City, State');
   ```
5. Share preview link: `https://menuready-template.vercel.app/preview/[slug]`

---

## Troubleshooting

### "Restaurant not found"
- Check slug matches between Supabase and file path
- Verify `menu.json` exists at `/data/restaurants/[slug]/menu.json`

### "Failed to publish"
- Check Supabase connection (verify env vars)
- Check browser console for errors

### Stripe checkout fails
- Verify webhook endpoint is correct
- Check Stripe test mode vs live mode keys match
- View webhook logs in Stripe dashboard

### QR code doesn't work
- Verify `NEXT_PUBLIC_APP_URL` is set correctly
- Make sure it's the full URL with `https://`

---

## Going Live

### Switch Stripe to Live Mode
1. Go to Stripe **Developers** → **API Keys**
2. Toggle to **Live Mode** (top right)
3. Copy new **live** keys
4. Update Vercel environment variables
5. Redeploy

### Custom Domain (Optional)
1. Register `menuready.com`
2. In Vercel: **Settings** → **Domains**
3. Add custom domain
4. Update DNS records
5. Update `NEXT_PUBLIC_APP_URL` to `https://menuready.com`

---

## Next Steps

1. **Test everything** with Harbor Diner demo
2. **Digitize 10 restaurants** following SOP
3. **Send outreach messages** via Yelp
4. **Monitor conversions** in spreadsheet
5. **Collect first paid customer** 🎯

---

**Questions?** See `/docs/BUILD_NEXT_SUMMARY.md` or contact Tim.

**Last Updated:** 2026-02-20
