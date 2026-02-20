'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, TrendingUp, Clock, Users, Star, DollarSign, Zap, Eye } from 'lucide-react';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax transforms for thumbnails
  const y1 = useTransform(scrollY, [0, 500], [0, -20]);
  const y2 = useTransform(scrollY, [0, 500], [0, -40]);
  const y3 = useTransform(scrollY, [0, 500], [0, -60]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mock Yelp review images data
  const mockYelpImages = [
    { id: 1, reviewer: 'Sarah M.', date: 'Jan 15, 2026', parallax: y1 },
    { id: 2, reviewer: 'Mike R.', date: 'Jan 22, 2026', parallax: y2 },
    { id: 3, reviewer: 'Jessica L.', date: 'Feb 1, 2026', parallax: y3 },
    { id: 4, reviewer: 'David K.', date: 'Feb 5, 2026', parallax: y1 },
    { id: 5, reviewer: 'Amanda P.', date: 'Feb 8, 2026', parallax: y2 },
    { id: 6, reviewer: 'Chris W.', date: 'Feb 10, 2026', parallax: y3 },
  ];

  // Animation variants
  const textRiseVariant = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const scaleRevealVariant = {
    hidden: { opacity: 0, scale: 0.95, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const cardLiftVariant = {
    rest: { y: 0, rotateX: 0, scale: 1 },
    hover: { 
      y: -8, 
      rotateX: 5,
      scale: 1.02,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const thumbnailStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const thumbnailVariant = {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

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
        <motion.div 
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          variants={scaleRevealVariant}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 border border-red-200 rounded-full text-sm font-semibold mb-6 shadow-sm"
        >
          <div className="w-5 h-5 bg-red-600 text-white rounded flex items-center justify-center text-xs font-bold">
            Y
          </div>
          We already found your menu on Yelp
        </motion.div>
        
        <motion.h2 
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          variants={textRiseVariant}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
        >
          We digitized it<br />
          <span className="text-red-600">for you</span>
        </motion.h2>
        
        <motion.p 
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          variants={textRiseVariant}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto"
        >
          We found menu photos from your public Yelp reviews and extracted your items.<br />
          Your digital menu is ready to review and publish.
        </motion.p>

        <motion.div 
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          variants={scaleRevealVariant}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-4 mb-8 flex-wrap"
        >
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white text-lg font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl animate-pulse"
          >
            Review My Draft Menu
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 border-2 border-red-600 text-lg font-bold rounded-lg hover:bg-red-50 transition-all"
          >
            <Eye className="w-5 h-5" />
            See What You're Missing
          </Link>
        </motion.div>

        <motion.p 
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          variants={textRiseVariant}
          transition={{ delay: 0.7 }}
          className="text-sm text-slate-500"
        >
          Already built · Just review and publish · No credit card
        </motion.p>

        {/* Time Reframe */}
        <motion.div 
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          variants={scaleRevealVariant}
          transition={{ delay: 0.9 }}
          className="mt-12 max-w-2xl mx-auto bg-white border border-slate-200 rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="text-left">
              <p className="text-slate-600 mb-2">
                Most restaurants take <strong className="text-slate-900">1–2 days</strong> to manually rebuild and upload menus.
              </p>
              <p className="text-lg font-bold text-slate-900">
                With MenuReady: <span className="text-green-600">Review and publish same day</span>
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Yelp Visual Proof Section */}
      <section className="bg-white py-16 border-y-2 border-red-100">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-3">
            Here's what customers see on Yelp right now
          </h3>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Scattered menu photos from reviews vs. your structured digital version
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Yelp Images */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-600 text-white rounded flex items-center justify-center text-sm font-bold">
                  Y
                </div>
                <h4 className="font-bold text-slate-900 text-lg">On Yelp Today</h4>
              </div>
              
              {/* Desktop Grid */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={thumbnailStagger}
                className="hidden md:grid grid-cols-3 gap-3"
              >
                {mockYelpImages.map((img) => (
                  <motion.div
                    key={img.id}
                    variants={thumbnailVariant}
                    style={{ y: img.parallax }}
                    className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg border border-red-200 overflow-hidden group hover:border-red-400 transition-all"
                  >
                    <div className="w-full h-full flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-400/30 to-slate-600/30" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2">
                        <p className="text-white text-xs font-semibold truncate">
                          Menu photo from review
                        </p>
                        <p className="text-white/80 text-xs">
                          {img.reviewer} · {img.date}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile Scroll */}
              <div className="md:hidden flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory">
                {mockYelpImages.map((img) => (
                  <div
                    key={img.id}
                    className="flex-shrink-0 w-[280px] aspect-square bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg border border-red-200 overflow-hidden snap-start"
                  >
                    <div className="w-full h-full flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-400/30 to-slate-600/30" />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-3">
                        <p className="text-white text-sm font-semibold">
                          Menu photo from review
                        </p>
                        <p className="text-white/80 text-xs">
                          {img.reviewer} · {img.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-slate-500 mt-3">
                ❌ Hard to read · Photos from different angles · Out of order
              </p>
            </div>

            {/* Before → After Divider */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
              <div className="bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg whitespace-nowrap">
                Before → After
              </div>
            </div>

            {/* Right: Structured Menu */}
            <div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textRiseVariant}
                className="flex items-center gap-2 mb-4"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
                <h4 className="font-bold text-slate-900 text-lg">Your Structured Digital Version</h4>
              </motion.div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleRevealVariant}
                transition={{ delay: 0.2 }}
                className="bg-white border-2 border-green-300 rounded-lg p-6 shadow-lg"
              >
                <div className="mb-6">
                  <h5 className="text-2xl font-bold text-slate-900 mb-1">Sunrise Diner</h5>
                  <p className="text-slate-600 text-sm">American Diner · Orange, CA</p>
                </div>

                <div className="space-y-4">
                  {/* Breakfast Category */}
                  <div>
                    <h6 className="font-bold text-slate-900 mb-2 border-b border-slate-200 pb-1">
                      Breakfast
                    </h6>
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 text-sm">Classic Pancakes</p>
                          <p className="text-xs text-slate-600">Three fluffy buttermilk pancakes</p>
                        </div>
                        <span className="font-bold text-red-600">$8.99</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 text-sm">Sunrise Special</p>
                          <p className="text-xs text-slate-600">Two eggs, bacon, hash browns, toast</p>
                        </div>
                        <span className="font-bold text-red-600">$12.99</span>
                      </div>
                    </div>
                  </div>

                  {/* Lunch Category */}
                  <div>
                    <h6 className="font-bold text-slate-900 mb-2 border-b border-slate-200 pb-1">
                      Lunch
                    </h6>
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 text-sm">Classic Burger</p>
                          <p className="text-xs text-slate-600">Half-pound beef patty on brioche</p>
                        </div>
                        <span className="font-bold text-red-600">$13.99</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-green-600 font-semibold mt-3">
                ✓ Easy to read · Organized by category · Always up to date
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Impact Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-3">
            Digital menus increase revenue
          </h3>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Restaurants with structured menus typically see measurable increases in order value and customer satisfaction.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: DollarSign,
                title: 'Higher average order values',
                description: 'Clear descriptions and pricing encourage upsells and add-ons',
                color: 'green',
              },
              {
                icon: TrendingUp,
                title: 'More add-ons selected',
                description: 'Modifiers and extras are visible and easy to choose',
                color: 'indigo',
              },
              {
                icon: Star,
                title: 'Better reviews from clarity',
                description: 'Customers know what to expect before ordering',
                color: 'amber',
              },
              {
                icon: Eye,
                title: 'Increased Google discoverability',
                description: 'Digital menus improve search visibility and SEO',
                color: 'blue',
              },
              {
                icon: Zap,
                title: 'Faster table turnover',
                description: 'Customers decide faster when menu is clear',
                color: 'purple',
              },
              {
                icon: Users,
                title: 'Higher customer confidence',
                description: 'Professional presentation builds trust',
                color: 'red',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial="rest"
                whileHover="hover"
                variants={cardLiftVariant}
                className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm group"
                style={{ perspective: '1000px' }}
              >
                <div className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Conservative Callout */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-slate-900 font-semibold mb-2">
                  Conservative estimate based on industry data:
                </p>
                <p className="text-slate-700 text-sm">
                  Restaurants with structured menus typically see measurable increases in order value and customer satisfaction. 
                  While results vary, clear menu presentation consistently improves customer experience and business outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 border-t-2 border-red-100">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-3">
            We Already Did The Work
          </h3>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Your draft menu is ready. Just review and publish.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'We scanned Yelp',
                description: 'Found menu photos in your public reviews and extracted every item.',
                color: 'red',
                delay: 0,
              },
              {
                step: '2',
                title: 'You approve',
                description: 'Review the draft, fix anything that needs attention, and publish.',
                color: 'green',
                delay: 0.2,
              },
              {
                step: '3',
                title: 'You share',
                description: 'Get your link, QR codes, and share everywhere (Google, Instagram, tables).',
                color: 'indigo',
                delay: 0.4,
              },
            ].map((item) => (
              <motion.div 
                key={item.step} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={textRiseVariant}
                transition={{ delay: item.delay }}
                className="text-center group hover:scale-105 transition-transform"
              >
                <div className={`w-16 h-16 bg-${item.color}-50 border-2 border-${item.color}-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:border-${item.color}-400 transition-colors`}>
                  <span className={`text-2xl font-bold text-${item.color}-600`}>{item.step}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-slate-900 py-16 border-t-4 border-red-500">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Your menu is waiting
          </h3>
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
            <ArrowRight className="w-5 h-5" />
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

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-red-600 p-4 shadow-2xl z-40">
        <Link
          href="/onboarding"
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-600 text-white text-lg font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg active:scale-95"
        >
          Review My Draft Menu
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
