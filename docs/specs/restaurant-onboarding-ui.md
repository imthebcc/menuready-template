You are a senior product designer + staff frontend engineer. Build a production-ready, mobile-first onboarding web portal UI for restaurant owners who do NOT have digital menus yet.

## Product concept
We identify restaurants that lack digital menus. We scrape publicly available Yelp review images that contain menu photos (and optionally other food photos), run OCR/LLM extraction, and generate a digitized menu draft. We then invite the owner to claim the draft, verify/edit it, and publish a digital menu link that can be used immediately (QR code, link in bio, Google Business, etc.). The UI must communicate “increase sales fast” while feeling trustworthy and simple for non-technical owners.

## Hard requirements
- Mobile-first. Every core flow must feel excellent on a phone.
- Clean, professional, friendly. Aesthetic: modern SaaS for local businesses.
- “Yelp ecosystem” adjacency: aligned to the idea of reviews/visibility/local discovery, BUT do NOT copy Yelp branding, UI, or trademark visuals. Use original styling.
- Fast onboarding: reduce cognitive load. Clear progress indicator and next steps.
- Trust: show where data came from (review images), show what we did (digitized), and give owner control (edit/approve).
- Accessibility: proper contrast, tap targets, keyboard navigation, ARIA labels where appropriate.
- Internationalization-ready: UI copy is in English, but structure should support future i18n.

## Tech constraints (assume in repo)
- Next.js App Router (latest stable)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide icons
- Framer Motion for subtle transitions
- Use server actions / route handlers only as placeholders (no real scraping code). Focus on UI + state flow scaffolding.

## Deliverables
1) Implement the UI screens + navigation + basic client state.
2) Include a sample “mock data” JSON for:
   - Restaurant profile (name, address, phone, cuisine, hours)
   - Yelp image set (menu photos + a couple food photos) with captions and source timestamps
   - Extracted menu draft (categories, items, prices, modifiers, notes)
   - Confidence signals (OCR confidence per item, ambiguous items list)
3) Provide a cohesive design system (Tailwind tokens / CSS variables) and component patterns.
4) Provide a clear folder structure and README with “how to run” and “where to edit copy”.

## Brand & visual direction
- Feel: “Local business growth engine” + “verified + trustworthy”
- Layout: lots of whitespace, simple grids, crisp typography, gentle shadows, minimal borders.
- Color palette: fresh and confident. Use a modern neutral base with one primary accent and one success accent.
  - Primary: deep indigo/blue (trust + business)
  - Success: green (published + live)
  - Warning: amber (needs review)
  - Neutrals: slate/stone
- Typography: clean, slightly friendly (use system font stack or an open-source font if already in repo).
- Imagery: restaurant hero header uses scraped photos in a tasteful, privacy-safe way (blur or crop option). Menu photos displayed as “Sources” with clear attribution: “From public review images.”
- Micro-interactions: subtle, not flashy. Use Framer Motion for step transitions, button hover, and card reveal.

## Information architecture (core flow)
Create a 5-step onboarding flow with a persistent progress header:
Step 1: Identify your restaurant
Step 2: We found menu photos (sources)
Step 3: Review your digitized menu
Step 4: Customize & publish
Step 5: Share your link / QR

### Step 1 — Identify
- Search box: “Find your restaurant” (name + city)
- OR “Enter business phone” (quick verify)
- Show a result card list (mock results) with “Select”
- CTA: “Continue”

### Step 2 — Sources
- Explain simply: “We used public review images to draft your menu”
- Show a grid carousel of menu images with:
  - thumbnail
  - “menu photo” label
  - date
  - “View larger” modal
- Provide toggles:
  - “Hide non-menu photos”
  - “Blur faces/people in photos” (UI-only toggle)
- CTA: “Generate Draft Menu” (shows loading state + success)

### Step 3 — Review Draft Menu (most important)
- Two-pane layout on desktop; single-column on mobile.
- Left/top: extracted categories and items in editable cards:
  - Category name editable
  - Each item: name, description, price, modifiers (optional)
  - Inline edit, add item, delete item
  - “Mark as unsure” tool for low confidence items
- Right/below: “Source viewer” that highlights which photo a section came from (UI simulation).
- Confidence UI:
  - “High confidence” badge for good items
  - “Needs review” badge for ambiguous items
  - A “Review queue” list: 5–10 flagged items with quick fix controls
- CTA: “Approve Draft” (disabled until review queue is resolved or explicitly acknowledged)

### Step 4 — Customize & Publish
- Settings:
  - Menu URL slug (e.g., /m/restaurant-name)
  - Add logo (optional)
  - Theme: Light / Dark / Auto
  - “Enable online ordering link” (optional field)
  - “Add ‘Popular items’ section” (checkbox)
- Preview card of published menu (mobile preview mock)
- CTA: “Publish Menu” (success state)

### Step 5 — Share
- Show:
  - Your live menu link (copy button)
  - QR code (mock)
  - “Add to Instagram bio” quick instructions
  - “Add to Google Business” quick instructions
  - “Print table tent” (download placeholder)
- CTA: “Invite my team” (optional email inputs)

## Global UI elements
- Top bar: brand name (placeholder) + support link
- Footer: privacy / terms / “How we created this menu”
- A “Trust drawer” component: explains data sources and that owner is in control.
- Toast notifications for save/publish/copy events.
- Error/empty states for: no photos found, OCR failed, menu too blurry.

## Copy tone guidelines
- Friendly, straight, not hypey. Avoid buzzwords.
- Emphasize speed + control: “Drafted for you. You approve.”
- Always reduce anxiety: “You can edit anything before publishing.”
- Avoid legal claims. Use: “May help increase orders/visibility” not “will”.

## Implementation specifics
- Use shadcn/ui: Button, Card, Input, Tabs, Dialog, Sheet, Toast, Badge, Progress, Skeleton.
- Use a single `OnboardingLayout` with a Stepper component.
- Use `zustand` OR React context for wizard state (choose one and implement).
- Data model types in `types/`.
- Mock API calls in `lib/mockApi.ts` with async delays to simulate generation.
- Routes (App Router):
  - `/` landing + “Find your restaurant”
  - `/onboarding` wizard container
  - `/onboarding/step-1` ... `/onboarding/step-5`
  - `/preview/[slug]` published menu preview (mock)
- Add mobile sticky bottom CTA bar on steps 2–5.

## Success criteria
- Feels like a premium tool for busy owners.
- Everything is thumb-friendly on mobile.
- Owner immediately understands: “You already did the work for me.”
- Clear path from identification → review → publish → share.
- No broken states; polished empty/loading/error states.

## Output requirements
- Modify existing repo files as needed. If starting from scratch, generate complete files.
- Provide:
  - File tree summary
  - Key components list
  - Notes for where future backend hooks will plug in
- Do not implement real scraping; only UI scaffolding + mock data and placeholders.

Now build it.
