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

export default function MenuPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMenu();
  }, [slug]);

  async function fetchMenu() {
    try {
      const res = await fetch(`/api/restaurants/${slug}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Menu not found');
        setLoading(false);
        return;
      }

      setRestaurant(data.restaurant);
      setMenu(data.menu || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to load menu');
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Menu Not Found</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link href="/" className="text-red-600 hover:text-red-700 font-semibold">
            Visit Menus Ready →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{restaurant.name}</h1>
              <p className="text-sm text-slate-600">{restaurant.location}</p>
            </div>
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-red-600 transition-colors"
            >
              Powered by Menus Ready
            </Link>
          </div>
        </div>
      </header>

      {/* Menu Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 md:p-8">
          {menu && menu.length > 0 ? menu.map((category, idx) => (
            <div key={idx} className="mb-10 last:mb-0">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 uppercase tracking-wide border-b-2 border-red-600 pb-2">
                {category.category}
              </h2>
              <div className="space-y-5">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-slate-900 flex-1 pr-4">
                        {item.name}
                      </h3>
                      <span className="text-xl font-bold text-red-600 whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-slate-600 leading-relaxed">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )) : (
            <div className="text-center py-8 text-slate-500">
              <p>No menu items available.</p>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-8 p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200">
          <p className="text-slate-700 mb-3">Want a menu like this for your restaurant?</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all"
          >
            Get Your Free Menu
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
