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
      {/* Header - Mobile-first, restaurant-industry credibility */}
      <header 
        className="bg-white sticky top-0 z-50 h-14 md:h-16"
        style={{ boxShadow: '0 1px 12px rgba(0, 0, 0, 0.08)' }}
      >
        <div className="h-full px-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl">
            <span className="font-bold text-gray-900" style={{fontFamily: "'Playfair Display', serif"}}>Menus</span>
            <span className="font-bold text-red-600" style={{fontFamily: "'Playfair Display', serif"}}> Ready</span>
          </h1>
          <a
            href="mailto:support@menusready.com"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Need help?
          </a>
        </div>
      </header>

      {/* Social Proof Trust Bar - CHANGE 4: Enhanced social proof */}
      <div className="hidden md:block bg-gradient-to-r from-slate-100 via-red-50 to-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-center gap-8 text-xs md:text-sm flex-wrap text-slate-600">
            <span className="font-semibold">Built by restaurant owners, for restaurant owners</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="font-semibold">100% satisfaction</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="font-semibold">Same week delivery</span>
          </div>
        </div>
      </div>

      {/* Hero - Above the fold on mobile */}
      <section className="max-w-screen-sm md:max-w-6xl mx-auto px-4 py-8 md:py-20 text-center min-h-[calc(100vh-120px)] md:min-h-0 flex flex-col justify-center">
        <FadeUp delay={0.05}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6 shadow-sm">
            <i className="ri-checkbox-circle-fill text-green-600"></i>
            <span>Revenue Opportunity Identified</span>
          </div>
        </FadeUp>
        
        <FadeUp delay={0.10}>
          {/* CHANGE 1: New headline - using Headline A (fear of loss trigger) */}
          {/* Alternative headlines to A/B test:
              Headline B: "398 Yelp Photos, Zero Menu Page — We Fixed That"
              Headline C: "Your Customers Can't Find Your Menu Online" */}
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-slate-900 mb-4 md:mb-6 leading-tight tracking-tight">
            Stop Losing Customers<br />
            to Your <span className="text-red-600 underline decoration-4 decoration-red-600/30">Invisible Menu</span>
          </h2>
        </FadeUp>
        
        <FadeUp delay={0.18}>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
            Your menu is already built from Yelp. Just claim it.
          </p>
        </FadeUp>

        <FadeUp delay={0.26}>
          <div className="flex flex-col items-stretch gap-3 md:gap-4 max-w-md mx-auto">
            <Link
              href="/preview/harbor-diner-huntington-beach"
              className="w-full flex items-center justify-center gap-2 px-8 py-4 min-h-[52px] bg-red-600 text-white text-lg sm:text-xl font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl"
            >
              Preview My Menu (Free)
              <i className="ri-arrow-right-line text-xl sm:text-2xl"></i>
            </Link>
            <p className="text-sm text-slate-500 text-center">
              No credit card. Takes seconds.
            </p>
          </div>
        </FadeUp>

      </section>

      {/* Yelp Visual Proof Section - Before vs After */}
      <section className="bg-white py-8 md:py-16 border-y-2 border-red-100">
        <RevealOnScroll>
          <div className="max-w-screen-sm md:max-w-7xl mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-3 leading-tight">
            Here's what customers see on Yelp right now
          </h3>
          <p className="text-center text-slate-600 mb-8 md:mb-12 max-w-2xl mx-auto text-base sm:text-lg">
            Scattered menu photos from reviews vs. your structured digital version
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center relative">
            {/* Left: Yelp Images (Flat Neutral Background) */}
            <div className="bg-slate-100 p-6 rounded-xl">
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

              {/* Mobile Stack - Single column, all 3 photos */}
              <div className="md:hidden flex flex-col gap-3">
                {mockYelpImages.slice(0, 3).map((img) => (
                  <div
                    key={img.id}
                    className="relative w-full h-[220px] rounded-lg border-2 border-red-300 overflow-hidden shadow-md"
                  >
                    <img
                      src={img.imageUrl}
                      alt={`Menu photo from ${img.reviewer}`}
                      className="w-full h-full object-cover opacity-90 saturate-75 contrast-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-2 bg-black/50 text-white text-xs">
                      Photo from review · {img.reviewer} · {img.date}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Problem Statement - Single column on mobile */}
              <div className="mt-4 flex flex-col gap-2 text-base text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 text-lg">✕</span>
                  <span className="font-medium">Hard to read</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 text-lg">✕</span>
                  <span className="font-medium">Out of order</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 text-lg">✕</span>
                  <span className="font-medium">Different angles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 text-lg">✕</span>
                  <span className="font-medium">Missing sections</span>
                </div>
              </div>
            </div>

            {/* Before → After Divider */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-10">
              <div className="bg-gradient-to-r from-red-600 to-green-600 text-white px-6 py-3 rounded-full font-bold text-sm shadow-xl whitespace-nowrap animate-pulse">
                Before → After
              </div>
            </div>

            {/* Right: Structured Menu (Clean White Background) */}
            <div className="bg-white p-4 sm:p-6 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-checkbox-circle-fill text-2xl sm:text-3xl text-green-600"></i>
                <h4 className="font-bold text-slate-900 text-base sm:text-lg">Your Structured Digital Version</h4>
              </div>
              
              <div className="bg-white border-2 border-green-400 rounded-lg p-4 sm:p-6 shadow-2xl relative ring-2 ring-green-200 ring-offset-2">

                <div className="mb-6">
                  <h5 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Sunrise Diner</h5>
                  <p className="text-slate-600 text-sm sm:text-base">American Diner · Orange, CA</p>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {/* Breakfast Category */}
                  <div>
                    <h6 className="font-bold text-slate-900 mb-3 border-b-2 border-slate-300 pb-2 uppercase text-sm sm:text-xs tracking-wide">
                      BREAKFAST
                    </h6>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 text-base sm:text-sm leading-tight mb-1">Classic Pancakes</p>
                          <p className="text-sm sm:text-xs text-slate-600 leading-relaxed">Three fluffy buttermilk pancakes</p>
                        </div>
                        <span className="font-bold text-red-600 text-base sm:text-sm whitespace-nowrap">$8.99</span>
                      </div>
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 text-base sm:text-sm leading-tight mb-1">Sunrise Special</p>
                          <p className="text-sm sm:text-xs text-slate-600 leading-relaxed">Two eggs, bacon, hash browns, toast</p>
                        </div>
                        <span className="font-bold text-red-600 text-base sm:text-sm whitespace-nowrap">$12.99</span>
                      </div>
                    </div>
                  </div>

                  {/* Lunch Category */}
                  <div>
                    <h6 className="font-bold text-slate-900 mb-3 border-b-2 border-slate-300 pb-2 uppercase text-sm sm:text-xs tracking-wide">
                      LUNCH
                    </h6>
                    <div className="space-y-3">
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
              <div className="mt-6 space-y-3 text-base text-slate-800 font-medium">
                <div className="flex items-center gap-3">
                  <i className="ri-checkbox-circle-fill text-xl text-green-600"></i>
                  <span>Easy to read</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="ri-checkbox-circle-fill text-xl text-green-600"></i>
                  <span>Organized by category</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="ri-checkbox-circle-fill text-xl text-green-600"></i>
                  <span>Always up to date</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="ri-checkbox-circle-fill text-xl text-green-600"></i>
                  <span>Works everywhere</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </RevealOnScroll>
      </section>

      {/* Revenue Impact Section - CHANGE 5: Emotional triggers + PAS framework */}
      <section className="py-8 md:py-16 bg-slate-50">
        <RevealOnScroll>
          <div className="max-w-screen-sm md:max-w-6xl mx-auto px-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-3">
              Why This Matters
            </h3>
            <p className="text-center text-slate-600 mb-8 md:mb-12 max-w-2xl mx-auto text-base sm:text-lg">
              Every day without a digital menu, you're losing customers and revenue.
            </p>

            {/* Problem-Agitate (Before Digital Menu) */}
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8 max-w-3xl mx-auto">
              <h4 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">❌</span>
                Without a Digital Menu:
              </h4>
              <div className="space-y-3 text-base text-slate-700">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-lg mt-0.5">✕</span>
                  <span><strong>Customers Google "[your restaurant] menu" → find competitors</strong></span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-lg mt-0.5">✕</span>
                  <span><strong>You lose orders to restaurants with visible menus</strong></span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-lg mt-0.5">✕</span>
                  <span><strong>Yelp photos are scattered, hard to read, outdated</strong></span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-lg mt-0.5">✕</span>
                  <span><strong>Customers call asking "what's on the menu?" wasting your time</strong></span>
                </div>
              </div>
            </div>

            {/* Solution (With Menus Ready) */}
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8 max-w-3xl mx-auto">
              <h4 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">✅</span>
                With Menus Ready:
              </h4>
              <div className="space-y-3 text-base text-slate-700">
                <div className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-xl text-green-600 mt-0.5"></i>
                  <span><strong>Show up in Google search results instantly</strong> — customers find you before competitors</span>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-xl text-green-600 mt-0.5"></i>
                  <span><strong>Customers know what you offer before they visit</strong> — more confident walk-ins</span>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-xl text-green-600 mt-0.5"></i>
                  <span><strong>Professional menu = professional restaurant</strong> — first impression matters</span>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-xl text-green-600 mt-0.5"></i>
                  <span><strong>23% higher average order value</strong> — customers see full menu, order more</span>
                </div>
              </div>
            </div>

            {/* Additional Benefits Grid */}
            <p className="text-center text-slate-600 mb-6 max-w-2xl mx-auto text-base sm:text-lg font-semibold">
              Plus These Proven Benefits:
            </p>

            <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12 max-w-xl md:max-w-none mx-auto">
              <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all group w-full">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <i className="ri-money-dollar-circle-line text-2xl text-green-600"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base sm:text-lg">Higher average order values</h4>
                </div>
                <p className="text-base sm:text-sm text-slate-600 leading-relaxed">
                  Clear descriptions and pricing encourage upsells and add-ons
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all group w-full">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <i className="ri-line-chart-line text-2xl text-indigo-600"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base sm:text-lg">More add-ons selected</h4>
                </div>
                <p className="text-base sm:text-sm text-slate-600 leading-relaxed">
                  Modifiers and extras are visible and easy to choose
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all group w-full">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <i className="ri-star-line text-2xl text-amber-600"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base sm:text-lg">Better reviews from clarity</h4>
                </div>
                <p className="text-base sm:text-sm text-slate-600 leading-relaxed">
                  Customers know what to expect before ordering
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all group w-full">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <i className="ri-eye-line text-2xl text-blue-600"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base sm:text-lg">Increased Google discoverability</h4>
                </div>
                <p className="text-base sm:text-sm text-slate-600 leading-relaxed">
                  A structured digital menu makes your items indexable by Google, so customers find you before they find a competitor.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all group w-full">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <i className="ri-flashlight-line text-2xl text-purple-600"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base sm:text-lg">Faster table turnover</h4>
                </div>
                <p className="text-base sm:text-sm text-slate-600 leading-relaxed">
                  Customers who know what they want before they sit down order faster and leave happier.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all group w-full">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <i className="ri-team-line text-2xl text-red-600"></i>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base sm:text-lg">Higher customer confidence</h4>
                </div>
                <p className="text-base sm:text-sm text-slate-600 leading-relaxed">
                  A clean, professional menu tells customers your restaurant takes quality seriously — before they ever taste the food.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* How It Works - CHANGE 2: Pricing transparency added */}
      <section className="bg-white py-8 md:py-16 border-t-2 border-red-100">
        <RevealOnScroll>
          <div className="max-w-screen-sm md:max-w-6xl mx-auto px-4">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-3">
              How It Works
            </h3>
            <p className="text-center text-slate-600 mb-8 md:mb-12 max-w-2xl mx-auto text-base sm:text-lg">
              Simple, transparent, no surprises.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center group hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-red-50 border-2 border-red-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-red-400 transition-colors">
                  <span className="text-2xl font-bold text-red-600">1</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">See Your Preview (Free)</h4>
                <p className="text-slate-600">
                  We already scraped your menu from Yelp. Review it now — no signup required.
                </p>
              </div>

              <div className="text-center group hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-green-400 transition-colors">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Claim It for $99</h4>
                <p className="text-slate-600">
                  Like what you see? Pay once, own it forever. Includes everything below.
                </p>
              </div>

              <div className="text-center group hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-indigo-50 border-2 border-indigo-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-indigo-400 transition-colors">
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Share Everywhere</h4>
                <p className="text-slate-600">
                  Post to Instagram, print the QR, submit to Google — customers find you instantly.
                </p>
              </div>
            </div>

            {/* What's Included - Pricing transparency */}
            <div className="bg-gradient-to-br from-slate-50 to-red-50 border-2 border-red-200 rounded-xl p-6 md:p-8 max-w-2xl mx-auto">
              <h4 className="text-2xl font-bold text-slate-900 mb-6 text-center">What's Included for $99</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-2xl text-green-600 mt-0.5"></i>
                  <div>
                    <p className="font-bold text-slate-900">QR Code</p>
                    <p className="text-sm text-slate-600">Print & display at tables</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-2xl text-green-600 mt-0.5"></i>
                  <div>
                    <p className="font-bold text-slate-900">Downloadable Files</p>
                    <p className="text-sm text-slate-600">PDF, text, image formats</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-2xl text-green-600 mt-0.5"></i>
                  <div>
                    <p className="font-bold text-slate-900">Yelp Submission</p>
                    <p className="text-sm text-slate-600">We upload your menu to Yelp</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-2xl text-green-600 mt-0.5"></i>
                  <div>
                    <p className="font-bold text-slate-900">Google Submission</p>
                    <p className="text-sm text-slate-600">Get found in search results</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-2xl text-green-600 mt-0.5"></i>
                  <div>
                    <p className="font-bold text-slate-900">Live Link</p>
                    <p className="text-sm text-slate-600">menusready.com/your-restaurant</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-checkbox-circle-fill text-2xl text-green-600 mt-0.5"></i>
                  <div>
                    <p className="font-bold text-slate-900">Free Updates</p>
                    <p className="text-sm text-slate-600">Menu changes? Email us anytime</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t-2 border-red-200 text-center">
                <p className="text-lg font-bold text-slate-900">No subscription. No ongoing fees. $99 one-time.</p>
                <p className="text-sm text-slate-600 mt-2">Pay once, own it forever.</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-slate-900 py-12 md:py-16 border-t-4 border-red-500">
        <div className="max-w-screen-sm md:max-w-3xl mx-auto px-4 text-center text-white">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Your menu is waiting</h3>
          <p className="text-lg sm:text-xl mb-6 opacity-90">
            We already built your draft from Yelp. Review it now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 text-sm opacity-75">
            <span>✓ Menu extracted</span>
            <span className="hidden sm:inline">·</span>
            <span>✓ Draft ready</span>
            <span className="hidden sm:inline">·</span>
            <span>✓ Free preview</span>
          </div>
          <Link
            href="/preview/harbor-diner-huntington-beach"
            className="w-full max-w-md mx-auto flex items-center justify-center gap-2 px-8 py-4 min-h-[52px] bg-white text-red-600 text-lg sm:text-xl font-bold rounded-lg hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl"
          >
            See My Menu Preview (Free)
            <i className="ri-arrow-right-line text-xl"></i>
          </Link>
        </div>
      </section>

      {/* CHANGE 3: FAQ Section - Objection handling */}
      <section className="bg-white py-12 md:py-16 border-t-2 border-slate-200">
        <div className="max-w-screen-sm md:max-w-4xl mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-8 md:mb-12">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                <i className="ri-question-line text-red-600 text-xl mt-0.5"></i>
                What if I don't like the menu we built?
              </h4>
              <p className="text-slate-700 ml-7">
                The preview is <strong>100% free</strong>. If it's not perfect, you don't pay. Simple.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                <i className="ri-question-line text-red-600 text-xl mt-0.5"></i>
                What if my menu changes?
              </h4>
              <p className="text-slate-700 ml-7">
                Email us anytime — we'll update it for free within 24 hours. No extra charge.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                <i className="ri-question-line text-red-600 text-xl mt-0.5"></i>
                Why $99?
              </h4>
              <p className="text-slate-700 ml-7">
                We manually scrape, format, and submit your menu to Yelp & Google. $99 is a <strong>one-time fee</strong> — no subscription, no recurring charges, no hidden costs. You own it forever.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                <i className="ri-question-line text-red-600 text-xl mt-0.5"></i>
                How long does it take?
              </h4>
              <p className="text-slate-700 ml-7">
                Preview is <strong>instant</strong>. Once you pay, you get download links immediately. Yelp/Google submission happens within the same week.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                <i className="ri-question-line text-red-600 text-xl mt-0.5"></i>
                Can I edit it myself?
              </h4>
              <p className="text-slate-700 ml-7">
                Not yet, but <strong>coming soon</strong>. For now, just email us any changes and we'll update it free. Usually within 24 hours.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-start gap-2">
                <i className="ri-question-line text-red-600 text-xl mt-0.5"></i>
                Is this a subscription?
              </h4>
              <p className="text-slate-700 ml-7">
                <strong>No.</strong> $99 one-time payment. No monthly fees, no recurring charges. Pay once, own it forever.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Still have questions?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold"
            >
              Contact us
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">
            <a href="/contact" className="hover:text-white">Contact</a>
            {' · '}
            <a href="/privacy" className="hover:text-white">Privacy</a>
            {' · '}
            <a href="/terms" className="hover:text-white">Terms</a>
            {' · '}
            <a href="/how-it-works" className="hover:text-white">How It Works</a>
          </p>
          <p className="text-xs text-slate-500 mt-4">
            © 2026 Menus Ready. Digitizing local restaurants.
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />
    </div>
  );
}
