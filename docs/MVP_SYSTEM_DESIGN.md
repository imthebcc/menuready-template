# MenuReady MVP System Design

**Version:** 1.0  
**Launch Target:** 10-20 restaurants  
**Timeline:** Days, not weeks  
**Philosophy:** Manual backend acceptable, simple > complex

---

## 2. PAGE STRUCTURE

### Page 1: Landing Page (`/`)
**Purpose:** Convert visitors to preview viewers  
**Content:**
- Revenue-driven hero
- Before/After visual proof
- Revenue impact section
- How it works (3 steps)
- Final CTA

**CTAs:**
- Primary: "Preview My Menu (Free)"
- Secondary: Contact support

---

### Page 2: Preview Page (`/preview/[restaurant-id]`)
**Purpose:** Show personalized digitized menu + conversion  
**Content:**
- Restaurant name header
- Live menu preview (editable inline)
- Revenue callouts sidebar:
  - "Increase order values"
  - "Improve reviews"
  - "Boost retention"
- Two-path decision

**CTAs:**
1. **Publish Free** → Self-serve flow
2. **Upgrade to Done-For-You ($49)** → Paid flow

---

### Page 3a: Free Publish Flow (`/publish/free`)
**Steps:**
1. Create account (email + password)
2. Confirm business ownership (email verification)
3. Publish confirmation
4. Get shareable link + QR code

---

### Page 3b: Paid Upgrade Flow (`/publish/upgrade`)
**Steps:**
1. Stripe checkout ($49)
2. Payment confirmation
3. "We'll submit to Yelp for you" message
4. Email follow-up with timeline

---

### Page 4: Dashboard (`/dashboard`)
**Purpose:** Post-publish control center  
**Content:**
- Live menu link
- QR code download
- Edit menu button
- Share tools
- Support contact

---

### Page 5: Contact (`/contact`)
**Purpose:** Support & sales inquiries  
**Content:**
- Simple form (Name, Email, Message)
- Chat widget (Crisp or Tawk)
- Expected response time

---

## 3. USER FLOW DIAGRAM (Text-Based)

```
┌─────────────────────────────────────────────────────────────────┐
│ STEP 1: LANDING PAGE                                            │
│                                                                 │
│ User arrives → Sees revenue opportunity → Clicks "Preview"     │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 2: PREVIEW PAGE (/preview/sunrise-diner-orange-ca)        │
│                                                                 │
│ ┌─────────────────────┐    ┌────────────────────────────────┐  │
│ │ Live Menu Preview   │    │ Revenue Callouts               │  │
│ │ (Editable)          │    │ - Higher order values          │  │
│ │                     │    │ - Better reviews               │  │
│ │ Breakfast           │    │ - Retention boost              │  │
│ │ - Pancakes $8.99    │    └────────────────────────────────┘  │
│ │ - Special $12.99    │                                        │
│ │                     │    ┌────────────────────────────────┐  │
│ │ Lunch               │    │ TWO-PATH DECISION:             │  │
│ │ - Burger $13.99     │    │                                │  │
│ └─────────────────────┘    │ [Publish Free]                 │  │
│                            │ Self-serve, instant            │  │
│                            │                                │  │
│                            │ [Done-For-You $49]             │  │
│                            │ We submit to Yelp              │  │
│                            └────────────────────────────────┘  │
└────────────┬─────────────────────────┬──────────────────────────┘
             │                         │
             │ FREE PATH               │ PAID PATH
             ▼                         ▼
┌──────────────────────────┐  ┌──────────────────────────────────┐
│ STEP 3a: FREE FLOW       │  │ STEP 3b: PAID FLOW               │
│                          │  │                                  │
│ 1. Create account        │  │ 1. Stripe checkout ($49)         │
│    - Email               │  │ 2. Payment confirmation          │
│    - Password            │  │ 3. "We'll handle Yelp"           │
│                          │  │ 4. Email with timeline           │
│ 2. Verify ownership      │  │                                  │
│    - Email confirm       │  │ Status: Awaiting fulfillment     │
│                          │  │                                  │
│ 3. Publish menu          │  │                                  │
│    - Get link            │  │                                  │
│    - Get QR code         │  │                                  │
│                          │  │                                  │
│ Status: Live             │  │                                  │
└──────────┬───────────────┘  └─────────────┬────────────────────┘
           │                                │
           └────────────┬───────────────────┘
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 4: CONFIRMATION / DASHBOARD                                │
│                                                                 │
│ "You're live!"                                                  │
│                                                                 │
│ ✓ Share link: menuready.com/sunrise-diner                      │
│ ✓ Download QR code                                             │
│ ✓ Contact support                                              │
│                                                                 │
│ [Edit Menu] [Share Tools] [Get Support]                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│ STEP 5: EMAIL FOLLOW-UP                                         │
│                                                                 │
│ Subject: Your MenuReady menu is live                            │
│                                                                 │
│ Body:                                                           │
│ - Link to menu                                                  │
│ - QR code attachment                                           │
│ - Quick start guide                                            │
│ - Support contact                                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. BACKEND PROCESS OUTLINE

### Phase 1: Manual Identification (First 10-20 Restaurants)

**Step 1: Target Selection**
- Manually identify Orange County restaurants
- Criteria:
  - <4.2 Yelp rating (pain point visible)
  - Has menu photos in reviews
  - Active business (recent reviews)
- Store in Google Sheet: `MenuReady_Pipeline.csv`

**Step 2: Data Collection**
- Manually visit Yelp listing
- Download menu photos from reviews
- Store in `/data/restaurants/[restaurant-slug]/photos/`

**Step 3: Menu Digitization**
- Use ChatGPT/Claude to extract menu items from photos
- Format in standardized JSON:
```json
{
  "restaurant": "Sunrise Diner",
  "location": "Orange, CA",
  "categories": [
    {
      "name": "Breakfast",
      "items": [
        {
          "name": "Classic Pancakes",
          "description": "Three fluffy buttermilk pancakes",
          "price": "8.99"
        }
      ]
    }
  ]
}
```
- Store in `/data/restaurants/[restaurant-slug]/menu.json`

**Step 4: Preview Link Generation**
- Generate unique preview URL: `/preview/sunrise-diner-orange-ca`
- Store in database (Supabase or Airtable):
  - `restaurant_slug`
  - `preview_url`
  - `status` (pending, published, paid)
  - `contact_email`
  - `created_at`

**Step 5: Outreach**
- Send personalized email to restaurant owner:
  - Subject: "We digitized your menu for free"
  - Body: Revenue opportunity + preview link
  - CTA: "Preview My Menu (Free)"
- Track in spreadsheet: `Outreach_Log.csv`

---

### Phase 2: Approval & Publishing

**Free Path:**
1. User creates account → Store in auth table
2. User verifies ownership → Email confirmation
3. User clicks "Publish" → Update status to `published`
4. Generate public URL: `menuready.com/[restaurant-slug]`
5. Send confirmation email with link + QR code

**Paid Path:**
1. User pays $49 → Stripe webhook triggers
2. Update database: `status = paid_upgrade`
3. Send internal notification to Remi (email or Slack)
4. Remi manually submits to Yelp within 24-48h
5. Send completion email to customer

---

### Phase 3: Internal Operations

**Daily Tasks (Remi):**
- Check Contact Us inbox (once AM, once PM)
- Monitor new signups
- Approve publish requests
- Handle Yelp submissions (paid customers)

**Weekly Tasks (Remi + Tim):**
- Review metrics:
  - Previews viewed
  - Free publishes
  - Paid upgrades
  - Support tickets
- Identify next 10 restaurants to target

---

## 5. SUPPORT FLOW OUTLINE

### Support Channels

**1. Contact Us Form (`/contact`)**
- Fields: Name, Email, Message
- Sends to: `support@menuready.com` (forwarded to Remi)
- Auto-reply: "Thanks! We'll respond within 24 hours."
- Response time: Same day (business hours)

**2. Chat Widget (Crisp / Tawk)**
- Embedded on all pages
- Monitored by: Remi (9 AM - 6 PM PST)
- Offline message: "We're away. Email support@menuready.com"

**3. Email Support**
- Address: `support@menuready.com`
- Monitored by: Remi
- Escalation: Forward to Tim if technical issue

---

### Support Tagging System (Spreadsheet)

| Ticket ID | Name | Email | Issue Type | Status | Notes |
|-----------|------|-------|------------|--------|-------|
| 001 | John Doe | john@example.com | Publish Error | Resolved | Fixed ownership verification |
| 002 | Jane Smith | jane@example.com | Payment Question | Awaiting Response | Sent pricing FAQ |

**Tags:**
- New lead
- Awaiting publish
- Paid upgrade
- Support needed
- Resolved

---

### Common Support Scenarios

**Issue: Can't publish menu**
- Response: "Check your email for verification link. Click to confirm ownership."

**Issue: Want to edit menu**
- Response: "Log in to your dashboard at menuready.com/dashboard and click 'Edit Menu'."

**Issue: How do I submit to Yelp?**
- Response: "Free plan: You can submit manually. Paid plan ($49): We handle submission for you within 48h."

**Issue: QR code not working**
- Response: "Download the high-res QR code from your dashboard. Print at 300 DPI minimum."

---

## 6. MINIMAL TECHNICAL IMPLEMENTATION STEPS

### Week 1: Foundation (Day 1-2)

**Backend:**
1. Set up Supabase project
2. Create tables:
   - `restaurants` (id, slug, name, location, menu_json, status, created_at)
   - `users` (id, email, password_hash, restaurant_id, created_at)
   - `payments` (id, user_id, amount, stripe_session_id, status, created_at)

**Auth:**
1. Add NextAuth.js with email/password
2. Email verification flow (send magic link)

**Stripe:**
1. Create Stripe product: "Done-For-You Yelp Submission - $49"
2. Set up checkout session API
3. Webhook handler for payment confirmation

---

### Week 1: Pages (Day 3-4)

**Build:**
1. `/preview/[slug]` page
   - Fetch menu from database
   - Inline editing (basic)
   - Two CTA buttons (Free / Paid)

2. `/publish/free` flow
   - Account creation form
   - Email verification
   - Publish confirmation

3. `/publish/upgrade` flow
   - Stripe checkout redirect
   - Payment confirmation page

4. `/dashboard` page
   - Display live link
   - QR code generator
   - Edit menu button

5. `/contact` page
   - Contact form → email
   - Embed Crisp chat widget

---

### Week 1: Testing (Day 5)

**Test flows:**
1. Free publish path (end-to-end)
2. Paid upgrade path (test mode Stripe)
3. Email verification
4. QR code generation
5. Contact form submission

---

### Week 2: Launch (Day 6-7)

**Pre-launch:**
1. Manually digitize 10 menus
2. Generate preview links
3. Send outreach emails to 10 restaurants

**Launch:**
1. Monitor preview views
2. Respond to support inquiries
3. Process paid upgrades manually

---

## 7. MVP LAUNCH CHECKLIST

### Pre-Launch (Must Complete)

**Technical:**
- [ ] Supabase database configured
- [ ] NextAuth authentication working
- [ ] Stripe test mode working
- [ ] Email verification sending
- [ ] QR code generation functional
- [ ] Contact form sending emails
- [ ] Chat widget embedded (Crisp/Tawk)

**Content:**
- [ ] 10 restaurant menus digitized
- [ ] Preview links generated
- [ ] Outreach email template ready
- [ ] Support email auto-reply configured

**Legal:**
- [ ] Privacy Policy page live
- [ ] Terms of Service page live
- [ ] Stripe Terms accepted

**Operations:**
- [ ] Google Sheet pipeline tracker created
- [ ] Support spreadsheet template ready
- [ ] `support@menuready.com` forwarding to Remi

---

### Launch Day

**Morning:**
- [ ] Send 10 outreach emails with preview links
- [ ] Monitor preview page analytics
- [ ] Check chat widget online

**Throughout Day:**
- [ ] Respond to support inquiries within 2 hours
- [ ] Monitor Stripe dashboard for payments
- [ ] Track signups in spreadsheet

**Evening:**
- [ ] Review metrics:
  - Emails sent
  - Preview views
  - Free publishes
  - Paid upgrades
- [ ] Plan next day outreach

---

### Week 1 Post-Launch

**Daily:**
- [ ] Check support inbox AM & PM
- [ ] Process any paid upgrades (Yelp submissions)
- [ ] Send 2-3 new outreach emails

**End of Week:**
- [ ] Review conversion rates:
  - Email open rate
  - Preview view rate
  - Free publish rate
  - Paid upgrade rate
- [ ] Identify improvements
- [ ] Plan next 10 restaurants

---

## Success Metrics (Week 1)

**Target Goals:**
- 10 emails sent
- 40% preview view rate (4 views)
- 50% free publish rate (2 publishes)
- 25% paid upgrade rate (1 paid customer = $49)

**Minimum Viable Success:**
- 1 free publish
- 1 paid upgrade
- 0 critical bugs

---

## Scalability Path (Future)

**When to automate:**
- After 20 successful manual launches
- When spending >2h/day on manual tasks

**What to automate first:**
1. Menu digitization (OCR + AI)
2. Preview link generation
3. Email follow-ups
4. Yelp submission (API if available)

**What to keep manual:**
- Customer support (until 50+ customers)
- Quality control (menu accuracy)
- Sales outreach (until proven messaging)

---

## Notes

**Keep it simple:**
- Spreadsheet > CRM
- Manual > Automated
- Working > Perfect

**Focus on:**
- Customer feedback
- Conversion optimization
- Support quality

**Avoid:**
- Complex automation too early
- Feature creep
- Over-engineering

---

**Last Updated:** 2026-02-20  
**Owner:** Remi (Operations) + Tim (Oversight)
