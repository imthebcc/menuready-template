# MenuReady 3-Step MVP - Quick Summary

**What Changed:** Simplified from 5 steps to 3 steps  
**Why:** Speed, clarity, immediate launch  
**Timeline:** 5 days to build, launch on day 6

---

## THE 3 STEPS

### STEP 1: PREVIEW
**Landing page → Preview screen**

User sees:
- Revenue positioning
- Before/After visual
- Their digitized menu (editable)
- Two buttons:
  1. Publish Free
  2. Done-For-You $49

**No account required.**

---

### STEP 2: GO LIVE
**Choose your path**

**FREE:**
- Enter email
- Check "I own this business"
- Instant publish
- Get link + QR code

**PAID ($49):**
- Stripe checkout
- We submit to Yelp
- Get link + QR code

**No dashboard. No complex onboarding.**

---

### STEP 3: SUPPORT & GROW
**Confirmation screen**

User gets:
- Live link (copy button)
- QR code (download)
- Contact support button

**Support:**
- Contact form
- Chat widget
- Email (monitored by Remi)

**No user portal needed.**

---

## WHAT WE REMOVED

❌ Dashboard page  
❌ Account creation flow  
❌ Multi-step wizard  
❌ Password management  
❌ Complex user portal  
❌ CRM system

**Result:** 4 pages instead of 7+

---

## 4 PAGES TOTAL

1. **Landing** - Hero + proof
2. **Preview** - Menu + CTAs
3. **Confirmation** - Link + QR + support
4. **Contact** - Form + chat

---

## PUBLISH LOGIC (SIMPLE)

### Free Path
```
Click "Publish Free"
  ↓
Modal: Email + Checkbox
  ↓
Backend: Create record, generate QR
  ↓
Redirect to /published
```

### Paid Path
```
Click "Done-For-You $49"
  ↓
Stripe Checkout
  ↓
Webhook: Update status, notify Remi
  ↓
Redirect to /published
```

**Database:** Single table, 4 status values

---

## BACKEND (MANUAL)

**For first 10-20 restaurants:**
1. Manually identify Yelp listings
2. Manually extract menu photos
3. AI-structure menu
4. Store in Supabase
5. Track in spreadsheet

**Status tags:**
- Lead
- Preview sent
- Published (Free)
- Paid
- Support

**Automation:** Not required for pilot

---

## BUILD TIMELINE

**Day 1-2:** Core pages (Preview, Confirmation, Contact)  
**Day 3:** Publish flows (Free modal, Stripe integration)  
**Day 4:** Support setup (Form, chat, emails)  
**Day 5:** Testing & polish  
**Day 6:** LAUNCH (send 10 emails)

**Total:** 5 days to build

---

## WEEK 1 GOALS

**Primary:**
- **1 paid upgrade = $49 revenue**

**Secondary:**
- 10 preview views
- 2-3 free publishes
- <24h support response

**Minimum Viable:**
- 1 free publish
- 1 paid customer
- 0 critical bugs

---

## TECH STACK

- Next.js 15 (current)
- Supabase (database)
- Stripe (payments)
- Crisp or Tawk (chat)
- Resend or SendGrid (email)

**Monthly cost:** ~$50

---

## DECISIONS NEEDED

1. **Database:** Supabase ✓ (recommended)
2. **Chat:** Crisp ($25/mo) or Tawk (free)?
3. **Email:** Resend ($20/mo) or SendGrid (free tier)?

---

## READY TO BUILD

✅ 3-step flow defined  
✅ Page structure simplified  
✅ Technical roadmap reduced  
✅ Publish logic clean  
✅ Launch checklist updated

**Full details:** See `/docs/MVP_3_STEP_SYSTEM.md`

---

**Next:** Approve approach → Start building → Launch in 5 days 🚀

**Questions?** Let me know.

---

**Date:** 2026-02-20  
**Owner:** Remi
