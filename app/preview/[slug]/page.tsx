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
  paid?: boolean;
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
  
  // Supabase storage base URL (client-side accessible)
  const storageUrl = process.env.NEXT_PUBLIC_SUPABASE_URL 
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/menus/${slug}`
    : null;

  useEffect(() => {
    // Clean up old localStorage key (one-time reset)
    localStorage.removeItem(`preview_expiry_${slug}`);
    
    fetchRestaurantData();
  }, [slug]);

  useEffect(() => {
    // Only initialize timer if not paid
    if (restaurant && !restaurant.paid) {
      initializeTimer();
    }
  }, [restaurant]);

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
      {/* Full-Page Watermark Overlay - Only if not paid */}
      {!restaurant?.paid && (
        <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute whitespace-nowrap text-gray-300 text-sm font-medium opacity-30"
              style={{
                transform: 'rotate(-30deg)',
                top: `${i * 80 - 200}px`,
                left: '-100px',
                letterSpacing: '8px'
              }}
            >
              PREVIEW · MENUS READY · PREVIEW · MENUS READY · PREVIEW · MENUS READY
            </div>
          ))}
        </div>
      )}

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

      {/* Unlocked Delivery Banner - Show if paid */}
      {restaurant?.paid && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <i className="ri-checkbox-circle-fill text-3xl text-green-600"></i>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Your menu is live — {restaurant?.name}
              </h2>
            </div>
            
            {/* Download Buttons - 2x2 grid */}
            <div className="grid grid-cols-2 gap-3 mb-6 max-w-2xl mx-auto">
              {storageUrl ? (
                <>
                  <a
                    href={`${storageUrl}/menu.pdf`}
                    download
                    className="w-full min-h-[52px] bg-white border-2 border-green-600 text-green-700 font-bold py-3 px-4 rounded-lg hover:bg-green-50 transition-all flex items-center justify-center gap-2 no-underline"
                  >
                    <i className="ri-file-pdf-line text-xl"></i>
                    <span>Download PDF</span>
                  </a>
                  
                  <a
                    href={`${storageUrl}/qr-code.png`}
                    download
                    className="w-full min-h-[52px] bg-white border-2 border-green-600 text-green-700 font-bold py-3 px-4 rounded-lg hover:bg-green-50 transition-all flex items-center justify-center gap-2 no-underline"
                  >
                    <i className="ri-qr-code-line text-xl"></i>
                    <span>Download QR Code</span>
                  </a>
                  
                  <a
                    href={`${storageUrl}/menu.jpg`}
                    download
                    className="w-full min-h-[52px] bg-white border-2 border-green-600 text-green-700 font-bold py-3 px-4 rounded-lg hover:bg-green-50 transition-all flex items-center justify-center gap-2 no-underline"
                  >
                    <i className="ri-image-line text-xl"></i>
                    <span>Download Image</span>
                  </a>
                  
                  <a
                    href={`${storageUrl}/menu.txt`}
                    download
                    className="w-full min-h-[52px] bg-white border-2 border-green-600 text-green-700 font-bold py-3 px-4 rounded-lg hover:bg-green-50 transition-all flex items-center justify-center gap-2 no-underline"
                  >
                    <i className="ri-file-text-line text-xl"></i>
                    <span>Download Text File</span>
                  </a>
                </>
              ) : (
                <div className="col-span-2 text-center text-slate-600">
                  <p>Download links will appear here after setup.</p>
                </div>
              )}
            </div>

            {/* Menu Link */}
            <div className="bg-white rounded-lg border-2 border-green-200 p-4 mb-4">
              <p className="text-sm text-slate-600 mb-2">Your live menu link:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={`https://menusready.com/menu/${slug}`}
                  readOnly
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 font-mono text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://menusready.com/menu/${slug}`);
                    alert('Link copied!');
                  }}
                  className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all whitespace-nowrap"
                >
                  Copy Link
                </button>
              </div>
            </div>

            {/* Share Row */}
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-3">Share your menu →</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://menusready.com/menu/${slug}`);
                    alert('Link copied!');
                  }}
                  className="px-4 py-2 bg-slate-600 text-white font-medium rounded-lg hover:bg-slate-700 transition-all text-sm"
                >
                  <i className="ri-link mr-1"></i> Copy Link
                </button>
                <a
                  href={`https://www.instagram.com/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-all text-sm"
                >
                  <i className="ri-instagram-line mr-1"></i> Instagram
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://menusready.com/menu/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all text-sm"
                >
                  <i className="ri-facebook-fill mr-1"></i> Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Publish Banner - Show if not paid and not expired */}
      {!restaurant?.paid && !expired && (
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

      {/* Expired State - Only if not paid */}
      {!restaurant?.paid && expired && (
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
        {/* Menu Preview */}
        <div className="relative">
          {/* Expired Blur Overlay - Only if not paid */}
          {!restaurant?.paid && expired && (
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
                    const display = isNaN(price) ? '' : `$${price.toFixed(2)}`;
                    
                    return (
                      <div key={itemIdx} className="border-b border-slate-100 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-semibold text-slate-900 flex-1">{item.name}</h3>
                          <span className="text-lg font-bold text-red-600 ml-4 whitespace-nowrap">
                            {display}
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

        {/* Footer CTA - Only if not paid */}
        {!restaurant?.paid && !expired && (
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
