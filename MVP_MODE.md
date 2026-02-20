# MVP Mode - No Database Required

**Status:** MenuReady now works WITHOUT Supabase/Stripe setup

---

## What Changed

The MVP now runs in **file-based mode** - no database or payment setup required.

### API Routes

**`/api/restaurants/[slug]`**
- ✅ Serves menu from `/data/restaurants/[slug]/menu.json`
- ✅ Generates restaurant data from slug
- ❌ No Supabase query

**`/api/publish-free`**
- ✅ Validates email
- ✅ Returns mock customer data
- ❌ No database save (logged to console)

**`/api/create-checkout`** & **`/api/webhooks/stripe`**
- ⏳ Will fail until Stripe env vars set
- 💡 Use only after Stripe setup complete

---

## What Works Now (No Setup)

### ✅ Landing Page
- Live at `/`
- All CTAs functional

### ✅ Preview Page
- Live at `/preview/harbor-diner-huntington-beach`
- Shows Harbor Diner menu
- Free publish button works

### ✅ Free Publish Flow
1. Click "Publish Free"
2. Enter email + confirm ownership
3. Redirects to confirmation
4. See live URL + QR code

### ✅ Public Menu
- Live at `/menu/harbor-diner-huntington-beach`
- Customer-facing view
- Clean, mobile-friendly

### ✅ Confirmation Page
- Shows live URL
- QR code generation
- Copy link button
- Download QR as PNG

---

## What Doesn't Work Yet

### ❌ Paid Upgrades ($99 / $19/mo)
**Requires:**
- Stripe API keys in env vars
- Webhook endpoint configured

**Error:** "Stripe not configured"

### ❌ Database Persistence
**Requires:**
- Supabase project
- Tables created
- Env vars set

**Current:** Publishes work but aren't saved

---

## Demo Flow (Works Now)

```
1. Visit: menuready-template.vercel.app

2. Click: "Preview My Menu (Free)"
   → Goes to /preview/harbor-diner-huntington-beach

3. See: Harbor Diner menu (19 items, 4 categories)

4. Click: "Publish Free"
   → Enter: your@email.com
   → Check: "I own or manage Harbor Diner"

5. Redirects to: /confirmation?slug=harbor-diner-huntington-beach

6. Get:
   - Live URL: menuready-template.vercel.app/menu/harbor-diner-huntington-beach
   - QR code (downloadable)
   - Copy link button

7. Visit live menu: /menu/harbor-diner-huntington-beach
   → See customer-facing menu
```

---

## Console Logging

All API routes now log to console:

```
[API] Fetching restaurant: harbor-diner-huntington-beach
[API] Menu loaded successfully: 4 categories
[API] Returning restaurant: Harbor Diner Huntington Beach

[Preview] Fetching restaurant: harbor-diner-huntington-beach
[Preview] API response: { ok: true, status: 200, data: {...} }
[Preview] Restaurant loaded: Harbor Diner Huntington Beach
[Preview] Menu categories: 4

[Publish Free] Request: { email: "...", slug: "...", confirmOwnership: true }
[Publish Free] MVP mode - skipping database save
[Publish Free] Would save: { email: "...", slug: "...", status: "free" }
[Publish Free] Success: menuready-template.vercel.app/menu/...
```

Check **Vercel Runtime Logs** to see these.

---

## Adding Real Restaurants (MVP)

1. Create folder: `/data/restaurants/[slug]/`
2. Add `menu.json`:
   ```json
   [
     {
       "category": "Breakfast",
       "items": [
         {
           "name": "Pancakes",
           "price": "$9.99",
           "description": "Stack of three fluffy pancakes"
         }
       ]
     }
   ]
   ```
3. Deploy to Vercel
4. Share link: `menuready-template.vercel.app/preview/[slug]`

---

## Enabling Full Features

### Step 1: Supabase (Database)

1. Create Supabase project
2. Run `/supabase/schema.sql`
3. Add to Vercel env vars:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
   ```
4. Redeploy

**Then:** Publishes save to database

---

### Step 2: Stripe (Payments)

1. Create Stripe account
2. Add products ($99 + $19/mo)
3. Set up webhook
4. Add to Vercel env vars:
   ```
   STRIPE_SECRET_KEY=sk_test_xxx
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```
5. Redeploy

**Then:** Paid upgrades work

---

## Current Deployment

**URL:** https://menuready-template.vercel.app

**Status:**
- ✅ Build succeeding
- ✅ Landing page live
- ✅ Preview page working
- ✅ Free publish working
- ✅ QR codes generating
- ❌ Stripe not configured
- ❌ Supabase not configured

**Mode:** MVP file-based (no database)

---

## Next Steps

1. **Test the demo flow** ↑ (works now)
2. **Add 10 restaurants** (create menu.json files)
3. **Set up Supabase** (when ready for persistence)
4. **Set up Stripe** (when ready for revenue)

---

**Last Updated:** 2026-02-20  
**Commit:** `040cf92`
