# Yelp Prospect Search Guide (Updated with Tiers)

**Goal:** Find 10 restaurants with good menu photos but no digital menu

---

## TIER SYSTEM

### **Tier 1 (PRIORITY) — 2.5 to 3.5 stars**
**Pitch angle:** Rating recovery  
**Value prop:** "Your low rating is costing you customers. A professional digital menu shows you care about quality."  
**Target:** 5-7 restaurants

### **Tier 2 — 3.6 to 4.1 stars**
**Pitch angle:** Digital presence  
**Value prop:** "You're doing great, but customers can't find your menu online. Let's fix that."  
**Target:** 3-5 restaurants

---

## SEARCH CRITERIA

**Rating:**  
- Tier 1: 2.5 - 3.5 stars ⭐ **PRIORITIZE THESE**
- Tier 2: 3.6 - 4.1 stars

**Reviews:** 50-300  
**Categories:** Diner, Mexican, Chinese, BBQ, Deli, Breakfast, Salvadoran, Vietnamese  
**Locations:** Santa Ana, CA & Huntington Beach, CA  
**Active:** Last review within 6 months  
**No digital menu:** No menu link on Yelp listing  
**No major POS:** No Toast/Square/OpenTable visible  

---

## SEARCH URLS

### Santa Ana, CA

**Diners:**
https://www.yelp.com/search?find_desc=diners&find_loc=Santa+Ana,+CA&sortby=rating

**Mexican:**
https://www.yelp.com/search?find_desc=mexican+restaurants&find_loc=Santa+Ana,+CA&sortby=rating

**Chinese:**
https://www.yelp.com/search?find_desc=chinese+restaurants&find_loc=Santa+Ana,+CA&sortby=rating

**BBQ:**
https://www.yelp.com/search?find_desc=bbq&find_loc=Santa+Ana,+CA&sortby=rating

**Deli:**
https://www.yelp.com/search?find_desc=deli&find_loc=Santa+Ana,+CA&sortby=rating

**Breakfast/Brunch:**
https://www.yelp.com/search?find_desc=breakfast+brunch&find_loc=Santa+Ana,+CA&sortby=rating

**Salvadoran:**
https://www.yelp.com/search?find_desc=salvadoran&find_loc=Santa+Ana,+CA&sortby=rating

**Vietnamese:**
https://www.yelp.com/search?find_desc=vietnamese&find_loc=Santa+Ana,+CA&sortby=rating

---

### Huntington Beach, CA

**Diners:**
https://www.yelp.com/search?find_desc=diners&find_loc=Huntington+Beach,+CA&sortby=rating

**Mexican:**
https://www.yelp.com/search?find_desc=mexican+restaurants&find_loc=Huntington+Beach,+CA&sortby=rating

**Chinese:**
https://www.yelp.com/search?find_desc=chinese+restaurants&find_loc=Huntington+Beach,+CA&sortby=rating

**BBQ:**
https://www.yelp.com/search?find_desc=bbq&find_loc=Huntington+Beach,+CA&sortby=rating

**Deli:**
https://www.yelp.com/search?find_desc=deli&find_loc=Huntington+Beach,+CA&sortby=rating

**Breakfast/Brunch:**
https://www.yelp.com/search?find_desc=breakfast+brunch&find_loc=Huntington+Beach,+CA&sortby=rating

**Vietnamese:**
https://www.yelp.com/search?find_desc=vietnamese&find_loc=Huntington+Beach,+CA&sortby=rating

---

## HOW TO QUALIFY

### **Tier 1 (2.5-3.5 stars) — STRONGEST TARGETS**

Look for:
- ✅ 2.5-3.5 stars
- ✅ 50-300 reviews
- ✅ Last review within 6 months
- ✅ NO menu link on Yelp
- ✅ 5+ menu photos in reviews
- ✅ No mention of QR codes/online ordering
- ✅ Phone number listed
- ✅ Recent negative reviews about "looks dirty" or "unprofessional"

**Red flags in Tier 1:**
- ❌ Below 2.5 stars (too risky)
- ❌ Closed/permanently shuttered
- ❌ Health violations in reviews

---

### **Tier 2 (3.6-4.1 stars)**

Look for:
- ✅ 3.6-4.1 stars
- ✅ 50-300 reviews
- ✅ Last review within 6 months
- ✅ NO menu link on Yelp
- ✅ 5+ menu photos
- ✅ Family-owned/independent vibe

**Skip if:**
- ❌ Already has digital menu
- ❌ Toast/Square/OpenTable visible
- ❌ Chain restaurant

---

## DATA TO COLLECT

For each qualified restaurant:

1. **Restaurant Name** - Copy exactly from Yelp
2. **Yelp URL** - Full URL
3. **Phone Number** - From "Call" button
4. **Star Rating** - Exact (e.g., 3.2)
5. **Review Count** - Total reviews
6. **Most Recent Review Date** - Scroll to reviews, check top one
7. **Menu Photo Count** - Count photos tagged "Menu" in photos section
8. **Website** - If listed (or "None")
9. **Tier** - 1 or 2
10. **Notes** - Cash only? Family owned? Negative reviews? Anything relevant

---

## WORKFLOW

1. **Start with Tier 1 searches (2.5-3.5 stars)**
   - Open search URL
   - Look for 2.5-3.5 star restaurants
   - Click each restaurant
   - Quick check: Reviews 50-300? Active? No digital menu?
   - If YES → Click "Photos" → Count "Menu" tag
   - Collect all data
   
2. **Then Tier 2 searches (3.6-4.1 stars)**
   - Same process, different rating range
   
3. **Paste into** `PROSPECT_LIST_TEMPLATE.csv`

4. **Sort:**
   - Tier 1 restaurants first
   - Within Tier 1: Sort by Menu Photo Count (descending)
   - Then Tier 2 restaurants
   - Within Tier 2: Sort by Menu Photo Count (descending)

---

## EXAMPLE ENTRIES

**Tier 1 (Rating Recovery):**
```
La Cocina del Pueblo,https://www.yelp.com/biz/la-cocina-del-pueblo-santa-ana,714-555-1234,3.2,87,2024-02-18,14,None,1,"Recent reviews mention 'food is great but place looks run down' — perfect recovery candidate"
```

**Tier 2 (Digital Presence):**
```
Pho 88,https://www.yelp.com/biz/pho-88-huntington-beach,714-555-5678,3.9,142,2024-02-20,9,None,2,"Family owned, busy lunch spot, no website"
```

---

## PRIORITIZATION

**Target distribution:**
- Tier 1: 5-7 restaurants (PRIORITY)
- Tier 2: 3-5 restaurants

**Why Tier 1 is stronger:**
- Urgent pain point (low rating)
- Clear before/after story
- Higher perceived value
- Less competition (other services ignore low-rated places)
- Easier to demonstrate ROI

---

## TIME ESTIMATE

- 5-10 minutes per restaurant
- 10 restaurants = 1-2 hours total
- **Focus on Tier 1 first**

---

## PITCH ANGLES BY TIER

**Tier 1 (2.5-3.5 stars):**
> "I noticed your Yelp rating. A professional digital menu shows customers you care about quality and helps recover from bad reviews. I already built yours — preview it free."

**Tier 2 (3.6-4.1 stars):**
> "Your food gets great reviews, but customers can't find your menu online. I built a digital version from your Yelp photos — preview it free."

---

**Save results to:** `/Users/Remi/.openclaw/workspace/menuready-template/data/PROSPECT_LIST.csv`

**Format:** Tier 1 first, sorted by photo count. Then Tier 2, sorted by photo count.
