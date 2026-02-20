# What to Build Next - Quick Summary

**Current Status:** Landing page done. No working preview/publish flow yet.

---

## WHAT EXISTS NOW ✅

1. **Landing Page** - Live, working, converts to preview link
2. **Contact Page** - Form working, sends to email
3. **Example Data** - Harbor Diner menu.json ready
4. **SOP** - Process to digitize 10-20 restaurants

---

## WHAT'S MISSING ❌

### Can't send outreach yet because:

**Missing Page:** Preview page (`/preview/[restaurant-slug]`)
- Where customers see their digitized menu
- Where they click "Publish Free" or "Done-For-You $49"

**Missing Flow:** Publish (free)
- Modal to collect email
- Database to store published menus
- Confirmation page with link + QR code

**Missing Flow:** Paid upgrade
- Stripe checkout integration
- Webhook to capture payment
- Email notification to us

---

## USER JOURNEY (COMPLETE FLOW)

```
1. Restaurant owner receives Yelp message:
   "I built your digital menu. Preview: [LINK]"
   
2. Clicks link → Goes to Landing Page ✅ BUILT
   Sees before/after, benefits, CTA
   
3. Clicks "Preview My Menu" → Goes to Preview Page ❌ NOT BUILT
   Sees their actual menu (Harbor Diner, 19 items)
   Two buttons: [Publish Free] [Done-For-You $49]
   
4a. FREE PATH: Clicks "Publish Free" → Modal ❌ NOT BUILT
    Enter email + checkbox "I own this business"
    Submit → Database saves → Redirect
    
4b. PAID PATH: Clicks "$49" → Stripe Checkout ❌ NOT BUILT
    Pay → Webhook updates database → Redirect
    
5. Confirmation Page ❌ NOT BUILT
   "You're live!"
   Link: menuready.com/harbor-diner-huntington-beach
   [Copy Link] [Download QR Code]
```

**Right now:** Step 3 doesn't exist. Landing page CTA button goes nowhere useful.

---

## BUILD PRIORITY (10 DAYS)

### WEEK 1: FREE FLOW (Days 1-5)

**Day 1: Database**
- Set up Supabase
- Create `restaurants` table
- Seed Harbor Diner data
- Build API endpoint to fetch menu

**Day 2: Preview Page**
- `/preview/[slug]` page
- Display menu (categories + items)
- Two CTA buttons (not functional yet)

**Day 3: Free Publish**
- Modal component (email + checkbox)
- API endpoint to save to database
- Generate live URL

**Day 4: Confirmation**
- `/published` page
- Show live link
- Generate + download QR code

**Day 5: Testing**
- End-to-end free flow
- Mobile testing
- Deploy

**OUTPUT:** Can send 10 outreach messages, 1 free publish

---

### WEEK 2: PAID FLOW (Days 6-10)

**Day 6-7: Stripe Setup**
- Stripe account
- Checkout integration
- "Done-For-You $49" button working

**Day 8-9: Webhook**
- Payment success handler
- Email notification to us
- Update database

**Day 10: Launch**
- Switch Stripe to live mode
- Final testing
- Send real outreach

**OUTPUT:** Can get first paid customer ($49)

---

## WHAT NEEDS APPROVAL

**Decisions needed now:**

1. **Supabase vs Airtable?**
   - Supabase = more scalable, better for future
   - Airtable = faster to set up, easier to manage manually
   - **Recommendation:** Supabase

2. **Custom domain?**
   - Live links will be `menuready.vercel.app/[slug]`
   - OR register `menuready.com` → `menuready.com/[slug]`
   - **Recommendation:** Use Vercel domain for MVP, register .com later

3. **QR code format?**
   - PNG (simple, works everywhere)
   - SVG (scalable, better for print)
   - **Recommendation:** PNG at 300 DPI

4. **Email for notifications?**
   - Free: Gmail forwarding
   - Paid: Resend ($20/mo), SendGrid (free tier)
   - **Recommendation:** Free Gmail for MVP

---

## WHAT THIS ENABLES

**After Week 1:**
- ✅ Can send outreach to 10 restaurants
- ✅ They can preview their menu
- ✅ They can publish for free
- ✅ They get link + QR code
- ❌ Can't collect payments yet

**After Week 2:**
- ✅ Everything from Week 1
- ✅ Can collect $49 payments
- ✅ Email notification when someone pays
- ✅ Manual Yelp submission process
- 🎯 **FULLY OPERATIONAL MVP**

---

## TECHNICAL STACK (FINAL)

**Frontend:**
- Next.js 15 ✅ (current)
- Tailwind CSS ✅ (current)
- Remix Icons ✅ (current)

**Backend:**
- Supabase (database) - **TO SET UP**
- Stripe (payments) - **TO SET UP**

**Tools:**
- Web3Forms (contact) ✅ DONE
- qrcode.react (QR generation) - **TO ADD**
- Vercel (hosting) ✅ DONE

**Total monthly cost:** $0-50

---

## FILES TO REVIEW

**Complete flow map:** `/docs/UI_FLOW_MAP.md` (21KB, detailed)

**This summary:** `/docs/BUILD_NEXT_SUMMARY.md` (you are here)

---

## READY TO START?

**What I need:**

1. **Approval to proceed** with Supabase (database)
2. **Stripe account** email (for payments)
3. **10 days** to build (can be faster if focused)

**What you get:**

- Working preview page
- Free publish flow
- Paid upgrade flow ($49)
- Ability to send outreach and collect customers

---

**Next step:** You say "build it" and I start Day 1. 🚀

**ETA:** 10 days to fully operational MVP

**First customer:** Week 2

---

**Last Updated:** 2026-02-20  
**Status:** Waiting for approval to build
