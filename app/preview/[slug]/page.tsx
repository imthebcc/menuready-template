'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface MenuItem {
  name: string;
  price: string;
  description?: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

interface Restaurant {
  id: string;
  slug: string;
  name: string;
  location: string;
}

export default function PreviewPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expired, setExpired] = useState(false);
  const [expiryText, setExpiryText] = useState('');

  useEffect(() => {
    // Clean up old localStorage key (one-time reset)
    localStorage.removeItem(`preview_expiry_${slug}`);
    
    fetchRestaurantData();
    initializeTimer();
  }, [slug]);

  useEffect(() => {
    // Check expiry every 10 seconds (no visible countdown)
    const interval = setInterval(() => {
      checkExpiry();
    }, 10000);

    return () => clearInterval(interval);
  }, [slug]);

  function initializeTimer() {
    const expiryKey = `preview_expiry_${slug}`;
    let expiry = sessionStorage.getItem(expiryKey);

    if (!expiry) {
      // Set 24 hour expiry
      const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
      sessionStorage.setItem(expiryKey, expiryTime.toString());
      expiry = expiryTime.toString();
    }

    const expiryTimestamp = parseInt(expiry);
    const now = Date.now();

    if (expiryTimestamp <= now) {
      setExpired(true);
      setExpiryText('expired');
    } else {
      setExpired(false);
      
      // Format expiry date
      const expiryDate = new Date(expiryTimestamp);
      const formatted = expiryDate.toLocaleString('en-US', {
        weekday: 'long',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      setExpiryText(formatted);
    }
  }

  function checkExpiry() {
    const expiryKey = `preview_expiry_${slug}`;
    const expiry = sessionStorage.getItem(expiryKey);

    if (!expiry) {
      initializeTimer();
      return;
    }

    const expiryTimestamp = parseInt(expiry);
    const now = Date.now();

    if (expiryTimestamp <= now && !expired) {
      setExpired(true);
    }
  }

  async function fetchRestaurantData() {
    try {
      const res = await fetch(`/api/restaurants/${slug}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Restaurant not found');
        setLoading(false);
        return;
      }

      setRestaurant(data.restaurant);
      setMenu(data.menu || []);
      setLoading(false);
    } catch (err) {
      setError(`Failed to load restaurant data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setLoading(false);
    }
  }

  async function handlePublish() {
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout not available yet. Please try again later.');
      }
    } catch (err) {
      alert('Failed to start checkout. Please try again.');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading your menu...</p>
        </div>
      </div>
    );
  }

  if (error && !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Restaurant Not Found</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link href="/" className="text-red-600 hover:text-red-700 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-slate-50"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-red-600">
            Menus Ready
          </Link>
          <Link href="/" className="text-slate-600 hover:text-slate-900 text-sm">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Publish Banner */}
      {!expired && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
              This menu was built for {restaurant?.name}
            </h2>
            <p className="text-base text-slate-700 mb-4">
              Publish it with your own URL and QR code.
            </p>
            
            <button
              onClick={handlePublish}
              className="w-full max-w-sm mx-auto min-h-[52px] bg-red-600 text-white text-lg font-bold rounded-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2"
            >
              Publish My Menu — $99 →
            </button>

            {/* Static Deadline */}
            <p className="text-sm text-amber-700 mt-3">
              This preview expires {expiryText}
            </p>
          </div>
        </div>
      )}

      {/* Expired State */}
      {expired && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
              This preview has expired
            </h2>
            <p className="text-base text-slate-700 mb-4">
              Contact us to restore it.
            </p>
            
            <a
              href="mailto:support@menuready.com"
              className="w-full max-w-sm mx-auto min-h-[52px] bg-slate-600 text-white text-lg font-bold rounded-lg hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
            >
              Email Us
            </a>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Menu Preview with Watermark */}
        <div className="relative">
          {/* Watermark Overlay - Diagonal repeating text */}
          <div className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute whitespace-nowrap text-gray-300 text-sm font-medium opacity-40"
                style={{
                  transform: 'rotate(-30deg)',
                  top: `${i * 60 - 100}px`,
                  left: '-50px',
                  letterSpacing: '8px'
                }}
              >
                PREVIEW · MENUS READY · PREVIEW · MENUS READY · PREVIEW · MENUS READY
              </div>
            ))}
          </div>

          {/* Expired Blur Overlay */}
          {expired && (
            <div className="absolute inset-0 z-20 backdrop-blur-md bg-white/50 pointer-events-none" />
          )}

          {/* Menu Card */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8 select-none">
            <h1 className="text-3xl font-bold text-slate-900 mb-1">{restaurant?.name}</h1>
            <p className="text-lg text-slate-600 mb-8">{restaurant?.location}</p>

            {menu && menu.length > 0 ? menu.map((category, idx) => (
              <div key={idx} className="mb-10 last:mb-0">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-wide border-b-2 border-red-600 pb-2">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.items.map((item, itemIdx) => {
                    const price = parseFloat(item.price);
                    
                    return (
                      <div key={itemIdx} className="border-b border-slate-100 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-semibold text-slate-900 flex-1">{item.name}</h3>
                          <span className="text-lg font-bold text-red-600 ml-4 whitespace-nowrap">
                            ${price.toFixed(2)}
                          </span>
                        </div>
                        {item.description && (
                          <p className="text-sm text-slate-600">{item.description}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-slate-500">
                <p>No menu items found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        {!expired && (
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Click "Publish" above to get your live menu link and QR code
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
