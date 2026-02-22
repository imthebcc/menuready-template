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
      <div className="min-h-screen flex items-center justify-center bg-[#F5F4F1]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E8281E] mx-auto"></div>
          <p className="mt-4 text-[#6B7280]">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F4F1] px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#111111] mb-4" style={{fontFamily: "'Sora', sans-serif"}}>Menu Not Found</h1>
          <p className="text-[#6B7280] mb-6">{error}</p>
          <Link href="/" className="text-[#E8281E] hover:text-[#c41f16] font-semibold">
            Visit Menus Ready →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F4F1] max-w-[430px] mx-auto">
      {/* Header */}
      <header className="bg-white border-b border-[#E8E6E1] sticky top-0 z-10 px-6 py-5">
        <div>
          <h1 className="text-xl font-bold text-[#111111] mb-1" style={{fontFamily: "'Sora', sans-serif"}}>
            {restaurant.name}
          </h1>
          <p className="text-[13px] text-[#6B7280]">{restaurant.location}</p>
        </div>
      </header>

      {/* Menu Content */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl border border-[#E8E6E1] p-5">
          {menu && menu.length > 0 ? menu.map((category, idx) => (
            <div key={idx} className="mb-8 last:mb-0">
              <h2 className="text-base font-bold text-[#111111] mb-4 uppercase tracking-wide border-b border-[#E8281E] pb-2" style={{fontFamily: "'Sora', sans-serif"}}>
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="border-b border-[#E8E6E1] pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start gap-3 mb-1">
                      <h3 className="text-[15px] font-semibold text-[#111111] flex-1" style={{fontFamily: "'Sora', sans-serif"}}>
                        {item.name}
                      </h3>
                      <span className="text-[15px] font-bold text-[#E8281E] whitespace-nowrap" style={{fontFamily: "'Sora', sans-serif"}}>
                        ${item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-[13px] text-[#6B7280] leading-relaxed">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )) : (
            <div className="text-center py-8 text-[#6B7280]">
              <p>No menu items available.</p>
            </div>
          )}
        </div>

        {/* Powered by Footer */}
        <div className="text-center mt-6 py-4">
          <Link
            href="/"
            className="text-[12px] text-[#6B7280] hover:text-[#E8281E] transition-colors"
          >
            Powered by <span className="font-semibold" style={{fontFamily: "'Sora', sans-serif"}}>Menus Ready</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
