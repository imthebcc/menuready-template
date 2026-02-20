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
  const [showModal, setShowModal] = useState(false);
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
      alert('Please enter your email and confirm ownership');
      return;
    }

    setPublishing(true);

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
        alert(data.error || 'Failed to publish');
        setPublishing(false);
        return;
      }

      // Redirect to confirmation
      router.push(`/confirmation?slug=${slug}`);
    } catch (err) {
      alert('Failed to publish. Please try again.');
      setPublishing(false);
    }
  }

  async function handleUpgrade(priceType: 'onetime' | 'subscription') {
    if (!email) {
      alert('Please enter your email first');
      return;
    }

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          email,
          priceType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Failed to create checkout');
        return;
      }

      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (err) {
      alert('Failed to create checkout. Please try again.');
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
            MenuReady
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
                <ul className="space-y-3 text-sm text-slate-700">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 text-xl mr-2 flex-shrink-0"></i>
                    <span>Higher order values</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 text-xl mr-2 flex-shrink-0"></i>
                    <span>Better reviews</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 text-xl mr-2 flex-shrink-0"></i>
                    <span>Boost retention</span>
                  </li>
                </ul>
              </div>

              {/* Choose Path */}
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Choose Your Path</h3>

                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-all mb-3"
                >
                  Publish Free
                </button>
                <p className="text-xs text-slate-500 text-center mb-6">Get link + QR instantly</p>

                <button
                  onClick={() => handleUpgrade('onetime')}
                  className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-all"
                >
                  Upgrade — $99 one-time
                </button>
                <p className="text-xs text-slate-500 text-center mt-2">We submit to Yelp</p>
              </div>

              {/* Source */}
              <div className="text-center text-sm text-slate-500">
                <p>Source: {menu.reduce((acc, cat) => acc + cat.items.length, 0)} items</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Free Publish Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Publish Your Menu (Free)</h3>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={confirmOwnership}
                  onChange={(e) => setConfirmOwnership(e.target.checked)}
                  className="mt-1 mr-2"
                />
                <span className="text-sm text-slate-700">
                  I own or manage {restaurant.name}
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                disabled={publishing}
              >
                Cancel
              </button>
              <button
                onClick={handlePublishFree}
                disabled={publishing}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-slate-300"
              >
                {publishing ? 'Publishing...' : 'Publish Now'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
