'use client';

import Link from 'next/link';
import { FadeUp } from '@/components/motion/FadeUp';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';

export default function LandingPage() {
  // Mock Yelp review images data - photos of the SAME physical Sunrise Diner menu from different angles
  const mockYelpImages = [
    { 
      id: 1, 
      reviewer: 'Sarah M.', 
      date: 'Jan 15, 2026',
      imageUrl: '/menu-photos/menu1.jpg',
      rotation: 2
    },
    { 
      id: 2, 
      reviewer: 'Mike R.', 
      date: 'Jan 22, 2026',
      imageUrl: '/menu-photos/menu2.jpg',
      rotation: -1
    },
    { 
      id: 3, 
      reviewer: 'Jessica L.', 
      date: 'Feb 1, 2026',
      imageUrl: '/menu-photos/menu3.jpg',
      rotation: 3
    },
    { 
      id: 4, 
      reviewer: 'David K.', 
      date: 'Feb 5, 2026',
      imageUrl: '/menu-photos/menu4.jpg',
      rotation: -2
    },
    { 
      id: 5, 
      reviewer: 'Amanda P.', 
      date: 'Feb 8, 2026',
      imageUrl: '/menu-photos/menu5.jpg',
      rotation: 1
    },
    { 
      id: 6, 
      reviewer: 'Chris W.', 
      date: 'Feb 10, 2026',
      imageUrl: '/menu-photos/menu6.jpg',
      rotation: -3
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">
            Menu<span className="text-red-600">Ready</span>
          </h1>
          <a
            href="/support"
            className="text-sm text-slate-600 hover:text-slate-900 font-medium"
          >
            Need help?
          </a>
        </div>
      </header>

      {/* Social Proof Trust Bar */}
      <div className="bg-gradient-to-r from-slate-100 via-red-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-center gap-8 text-xs md:text-sm flex-wrap text-slate-600">
            <span className="font-semibold">847 menus digitized this month</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="font-semibold">91% publish after review</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="font-semibold">No upfront credit card required</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="font-semibold text-red-600">From public Yelp reviews</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-20 text-center">
        <FadeUp delay={0.05}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm font-semibold mb-6 shadow-sm">
            <i className="ri-checkbox-circle-fill text-green-600"></i>
            Revenue Opportunity Identified
          </div>
        </FadeUp>
        
        <FadeUp delay={0.10}>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            We already built your<br />
            <span className="text-red-600">digital menu</span>
          </h2>
        </FadeUp>
        
        <FadeUp delay={0.18}>
          <p className="text-xl md:text-2xl text-slate-600 mb-6 max-w-3xl mx-auto">
            We identified your restaurant as one that can <strong className="text-slate-900">increase revenue, improve reviews, and boost retention</strong> with a structured digital menu.
          </p>
          <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
            We've already done the work. Preview it free.
          </p>
        </FadeUp>

        <FadeUp delay={0.26}>
          <div className="flex flex-col items-center gap-4 mb-6">
            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-10 py-5 bg-red-600 text-white text-xl font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
            >
              Preview My Menu (Free)
              <i className="ri-arrow-right-line text-2xl"></i>
            </Link>
            <p className="text-sm text-slate-500">
              No credit card. Takes seconds.
            </p>
          </div>

          <p className="text-sm text-slate-600 mb-12 max-w-2xl mx-auto bg-slate-100 px-6 py-3 rounded-lg border border-slate-200">
            <i className="ri-line-chart-line text-green-600 mr-2"></i>
            Restaurants using structured digital menus typically see higher order values and better reviews.
          </p>
        </FadeUp>

        {/* Time Reframe */}
        <RevealOnScroll>
          <div className="mt-12 max-w-2xl mx-auto bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <i className="ri-time-line text-2xl text-red-600 flex-shrink-0 mt-1"></i>
              <div className="text-left">
                <p className="text-slate-600 mb-2">
                  Most restaurants take <strong className="text-slate-900">1–2 days</strong> to manually rebuild and upload menus.
                </p>
                <p className="text-lg font-bold text-slate-900">
                  With MenuReady: <span className="text-green-600">Review and publish same day</span>
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Yelp Visual Proof Section - Before vs After */}
      <section className="bg-white py-16 border-y-2 border-red-100">
        <RevealOnScroll>
          <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-3">
            Here's what customers see on Yelp right now
          </h3>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Scattered menu photos from reviews vs. your structured digital version
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center relative">
            {/* Left: Yelp Images (Cooler, Muted Tone) */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-600 text-white rounded flex items-center justify-center text-sm font-bold">
                  Y
                </div>
                <h4 className="font-bold text-slate-900 text-lg">On Yelp Today</h4>
              </div>
              
              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-3 gap-3">
                {mockYelpImages.map((img) => (
                  <div
                    key={img.id}
                    style={{ 
                      transform: `rotate(${img.rotation}deg)`,
                    }}
                    className="aspect-square rounded-lg border-2 border-red-300 overflow-hidden group hover:border-red-500 transition-all relative shadow-md"
                  >
                    <img
                      src={img.imageUrl}
                      alt={`Menu photo from ${img.reviewer}`}
                      className="w-full h-full object-cover opacity-90 saturate-75 contrast-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm p-2">
                      <p className="text-white text-xs font-semibold truncate">
                        Photo from review
                      </p>
                      <p className="text-white/80 text-xs">
                        {img.reviewer} · {img.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Scroll */}
              <div className="md:hidden flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory">
                {mockYelpImages.map((img) => (
                  <div
                    key={img.id}
                    style={{ 
                      transform: `rotate(${img.rotation}deg)`,
                    }}
                    className="flex-shrink-0 w-[280px] aspect-square rounded-lg border-2 border-red-300 overflow-hidden snap-start relative shadow-md"
                  >
                    <img
                      src={img.imageUrl}
                      alt={`Menu photo from ${img.reviewer}`}
                      className="w-full h-full object-cover opacity-90 saturate-75 contrast-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm p-3">
                      <p className="text-white text-sm font-semibold">
                        Photo from review
                      </p>
                      <p className="text-white/80 text-xs">
                        {img.reviewer} · {img.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Problem Statement */}
              <div className="mt-4 space-y-1 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="text-red-600">❌</span>
                  <span>Hard to read</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-600">❌</span>
                  <span>Out of order</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-600">❌</span>
                  <span>Different angles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-600">❌</span>
                  <span>Missing sections</span>
                </div>
              </div>
            </div>

            {/* Before → After Divider */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
              <div className="bg-gradient-to-r from-red-600 to-green-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-xl whitespace-nowrap animate-pulse">
                Before → After
              </div>
            </div>

            {/* Right: Structured Menu (Brighter, More Contrast) */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-checkbox-circle-line text-3xl text-green-600"></i>
                <h4 className="font-bold text-slate-900 text-lg">Your Structured Digital Version</h4>
              </div>
              
              <div className="bg-white border-2 border-green-400 rounded-lg p-6 shadow-2xl relative ring-2 ring-green-200 ring-offset-2">
                {/* Green Check Badge */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg">
                  <i className="ri-checkbox-circle-line text-2xl"></i>
                </div>

                <div className="mb-6">
                  <h5 className="text-2xl font-bold text-slate-900 mb-1">Sunrise Diner</h5>
                  <p className="text-slate-600 text-sm">American Diner · Orange, CA</p>
                </div>

                <div className="space-y-4">
                  {/* Breakfast Category */}
                  <div>
                    <h6 className="font-bold text-slate-900 mb-2 border-b-2 border-slate-300 pb-1 uppercase text-xs tracking-wide">
                      Breakfast
                    </h6>
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 text-sm leading-tight">Classic Pancakes</p>
                          <p className="text-xs text-slate-600">Three fluffy buttermilk pancakes</p>
                        </div>
                        <span className="font-bold text-red-600 text-sm whitespace-nowrap">$8.99</span>
                      </div>
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 text-sm leading-tight">Sunrise Special</p>
                          <p className="text-xs text-slate-600">Two eggs, bacon, hash browns, toast</p>
                        </div>
                        <span className="font-bold text-red-600 text-sm whitespace-nowrap">$12.99</span>
                      </div>
                    </div>
                  </div>

                  {/* Lunch Category */}
                  <div>
                    <h6 className="font-bold text-slate-900 mb-2 border-b-2 border-slate-300 pb-1 uppercase text-xs tracking-wide">
                      Lunch
                    </h6>
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 text-sm leading-tight">Classic Burger</p>
                          <p className="text-xs text-slate-600">Half-pound beef patty on brioche</p>
                        </div>
                        <span className="font-bold text-red-600 text-sm whitespace-nowrap">$13.99</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Statement */}
              <div className="mt-4 space-y-1 text-sm text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Easy to read</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Organized by category</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Always up to date</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Works everywhere</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </RevealOnScroll>
      </section>

      {/* Revenue Impact Section */}
      <section className="py-16 bg-slate-50">
        <RevealOnScroll>
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-3">
              Digital menus increase revenue
            </h3>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Restaurants with structured menus typically see measurable increases in order value and customer satisfaction.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="ri-money-dollar-circle-line text-2xl text-green-600"></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Higher average order values</h4>
                <p className="text-sm text-slate-600">
                  Clear descriptions and pricing encourage upsells and add-ons
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="ri-line-chart-line text-2xl text-indigo-600"></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">More add-ons selected</h4>
                <p className="text-sm text-slate-600">
                  Modifiers and extras are visible and easy to choose
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="ri-star-line text-2xl text-amber-600"></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Better reviews from clarity</h4>
                <p className="text-sm text-slate-600">
                  Customers know what to expect before ordering
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="ri-eye-line text-2xl text-blue-600"></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Increased Google discoverability</h4>
                <p className="text-sm text-slate-600">
                  Digital menus improve search visibility and SEO
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="ri-flashlight-line text-2xl text-purple-600"></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Faster table turnover</h4>
                <p className="text-sm text-slate-600">
                  Customers decide faster when menu is clear
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <i className="ri-team-line text-2xl text-red-600"></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Higher customer confidence</h4>
                <p className="text-sm text-slate-600">
                  Professional presentation builds trust
                </p>
              </div>
            </div>

            {/* Conservative Claims Disclaimer */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <i className="ri-checkbox-circle-line text-2xl text-green-600 flex-shrink-0 mt-1"></i>
                <div>
                  <p className="text-slate-900 font-semibold mb-2">
                    Conservative estimate based on industry data:
                  </p>
                  <p className="text-slate-700 text-sm">
                    Restaurants with structured menus typically see measurable increases in order value and customer satisfaction. While results vary, clear menu presentation consistently improves customer experience and business outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16 border-t-2 border-red-100">
        <RevealOnScroll>
          <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-3">
              We Already Did The Work
            </h3>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Your draft menu is ready. Just review and publish.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-red-50 border-2 border-red-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-red-400 transition-colors">
                  <span className="text-2xl font-bold text-red-600">1</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">We scanned Yelp</h4>
                <p className="text-slate-600">
                  Found menu photos in your public reviews and extracted every item.
                </p>
              </div>

              <div className="text-center group hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-green-400 transition-colors">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">You approve</h4>
                <p className="text-slate-600">
                  Review the draft, fix anything that needs attention, and publish.
                </p>
              </div>

              <div className="text-center group hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-indigo-50 border-2 border-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-indigo-400 transition-colors">
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">You share</h4>
                <p className="text-slate-600">
                  Get your link, QR codes, and share everywhere (Google, Instagram, tables).
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-slate-900 py-16 border-t-4 border-red-500">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Your menu is waiting</h3>
          <p className="text-xl mb-6 opacity-90">
            We already built your draft from Yelp. Review it now.
          </p>
          <div className="flex items-center justify-center gap-3 mb-8 text-sm opacity-75">
            <span>✓ Menu extracted</span>
            <span>·</span>
            <span>✓ Draft ready</span>
            <span>·</span>
            <span>✓ Free to publish</span>
          </div>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 text-lg font-bold rounded-lg hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl"
          >
            Review My Draft Menu
            <i className="ri-arrow-right-line text-xl"></i>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">
            <a href="/privacy" className="hover:text-white">Privacy</a>
            {' · '}
            <a href="/terms" className="hover:text-white">Terms</a>
            {' · '}
            <a href="/how-it-works" className="hover:text-white">How It Works</a>
          </p>
          <p className="text-xs text-slate-500 mt-4">
            © 2026 MenuReady. Digitizing local restaurants.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />
    </div>
  );
}
