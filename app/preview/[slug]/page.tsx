'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  const router = useRouter();
  const slug = params.slug as string;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showUpgradeMessage, setShowUpgradeMessage] = useState(false);
  const [email, setEmail] = useState('');
  const [confirmOwnership, setConfirmOwnership] = useState(false);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    fetchRestaurantData();
  }, [slug]);

  async function fetchRestaurantData() {
    try {
      console.log('[Preview] Fetching restaurant:', slug);
      const res = await fetch(`/api/restaurants/${slug}`);
      const data = await res.json();

      console.log('[Preview] API response:', { ok: res.ok, status: res.status, data });

      if (!res.ok) {
        const errorMsg = data.error || 'Restaurant not found';
        console.error('[Preview] API error:', errorMsg, data);
        setError(errorMsg);
        setLoading(false);
        return;
      }

      console.log('[Preview] Restaurant loaded:', data.restaurant?.name);
      console.log('[Preview] Menu categories:', data.menu?.length);

      setRestaurant(data.restaurant);
      setMenu(data.menu || []);
      setLoading(false);
    } catch (err) {
      console.error('[Preview] Fetch error:', err);
      setError(`Failed to load restaurant data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setLoading(false);
    }
  }

  async function handlePublishFree() {
    if (!email || !confirmOwnership) {
      setError('Please enter your email and confirm ownership');
      return;
    }

    setPublishing(true);
    setError('');

    try {
      const res = await fetch('/api/publish-free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          slug,
          confirmOwnership,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to publish');
        setPublishing(false);
        return;
      }

      // Redirect to confirmation
      router.push(`/confirmation?slug=${slug}`);
    } catch (err) {
      setError('Failed to publish. Please try again.');
      setPublishing(false);
    }
  }

  async function handleUpgrade() {
    try {
      console.log('[Upgrade] Creating checkout session for:', slug);
      
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('[Upgrade] Checkout failed:', data.error);
        setShowUpgradeMessage(true);
        setShowEmailInput(true);
        return;
      }

      console.log('[Upgrade] Redirecting to Stripe:', data.url);
      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (err) {
      console.error('[Upgrade] Error:', err);
      setShowUpgradeMessage(true);
      setShowEmailInput(true);
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

  if (error || !restaurant) {
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-red-600">
            Menus Ready
          </Link>
          <Link href="/" className="text-slate-600 hover:text-slate-900">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Restaurant Info */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{restaurant.name}</h1>
          <p className="text-lg text-slate-600">{restaurant.location}</p>
          <p className="text-sm text-slate-500 mt-2">
            Preview your digital menu built from Yelp photos
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Menu Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">{restaurant.name}</h2>
              <p className="text-slate-600 mb-6">{restaurant.location}</p>

              {menu && menu.length > 0 ? menu.map((category, idx) => (
                <div key={idx} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-wide border-b-2 border-red-600 pb-2">
                    {category.category}
                  </h3>
                  <div className="space-y-4">
                    {category.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="border-b border-slate-100 pb-4 last:border-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-lg font-semibold text-slate-900">{item.name}</h4>
                          <span className="text-lg font-bold text-red-600 ml-4">{item.price}</span>
                        </div>
                        {item.description && (
                          <p className="text-sm text-slate-600">{item.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-slate-500">
                  <p>No menu items found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Benefits */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue Benefits</h3>
                <ul className="space-y-4 text-sm text-slate-700">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 text-xl mr-2 flex-shrink-0"></i>
                    <div>
                      <div className="font-semibold">23% higher average order value</div>
                      <div className="text-xs text-slate-500 mt-0.5">— Toast Restaurant Report 2023</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 text-xl mr-2 flex-shrink-0"></i>
                    <div>
                      <div className="font-semibold">4.2x more Google search visibility</div>
                      <div className="text-xs text-slate-500 mt-0.5">— Google Business data</div>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 text-xl mr-2 flex-shrink-0"></i>
                    <div>
                      <div className="font-semibold">68% of diners check menus online before visiting</div>
                      <div className="text-xs text-slate-500 mt-0.5">— National Restaurant Association</div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Choose Path */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Choose Your Path</h3>

                {!showEmailInput ? (
                  <>
                    <button
                      onClick={() => setShowEmailInput(true)}
                      className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-all mb-2"
                    >
                      Claim My Menu — Free
                    </button>
                    <p className="text-xs text-slate-500 text-center mb-6">
                      Your menu is already built. Just confirm your email to go live.
                    </p>
                  </>
                ) : (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Confirm Your Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent mb-3"
                    />
                    <label className="flex items-start mb-3">
                      <input
                        type="checkbox"
                        checked={confirmOwnership}
                        onChange={(e) => {
                          setConfirmOwnership(e.target.checked);
                          setError('');
                        }}
                        className="mt-1 mr-2"
                      />
                      <span className="text-sm text-slate-700">
                        I own or manage {restaurant?.name}
                      </span>
                    </label>
                    {error && (
                      <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}
                    <button
                      onClick={handlePublishFree}
                      disabled={publishing || !email || !confirmOwnership}
                      className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed mb-2"
                    >
                      {publishing ? 'Publishing...' : 'Confirm & Go Live'}
                    </button>
                    <button
                      onClick={() => {
                        setShowEmailInput(false);
                        setError('');
                      }}
                      className="w-full text-slate-600 text-sm hover:text-slate-900"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                <div className="mb-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-slate-400 line-through text-lg">$149</span>
                    <span className="text-red-600 font-bold text-2xl">$99</span>
                    <span className="text-sm text-slate-600">today only</span>
                  </div>
                </div>
                <button
                  onClick={handleUpgrade}
                  className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-all mb-2"
                >
                  Upgrade — $99 one-time
                </button>
                {showUpgradeMessage && (
                  <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700 text-center">
                      Coming soon — enter your email and we'll notify you when paid plans launch.
                    </p>
                  </div>
                )}
                <p className="text-xs text-amber-600 text-center mb-2">
                  ⏰ Offer expires in 24 hours
                </p>
                <p className="text-xs text-slate-500 text-center">Priority listing + Yelp submission</p>
              </div>

              {/* Source */}
              <div className="text-center text-sm text-slate-500">
                <p>Source: {menu.reduce((acc, cat) => acc + cat.items.length, 0)} items</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
