'use client';

import { useState, useEffect } from 'react';
import { Link2, Palette, Globe, ShoppingCart, Sparkles, Smartphone, Loader2 } from 'lucide-react';
import { useOnboardingStore } from '@/lib/store';
import { checkSlugAvailability, publishMenu } from '@/lib/mockApi';
import { YelpUploadServiceCard } from '@/components/YelpUploadServiceCard';

export function Step4Customize() {
  const {
    restaurant,
    menuDraft,
    settings,
    updateSettings,
    isPublishing,
    setPublishing,
    nextStep,
  } = useOnboardingStore();

  const [slugInput, setSlugInput] = useState(settings.slug || '');
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [yelpServiceSelected, setYelpServiceSelected] = useState(false);

  // Initialize slug from restaurant name
  useEffect(() => {
    if (!slugInput && restaurant) {
      const generatedSlug = restaurant.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlugInput(generatedSlug);
      updateSettings({ slug: generatedSlug });
    }
  }, [restaurant, slugInput, updateSettings]);

  const handleSlugChange = async (value: string) => {
    const cleanSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '')
      .slice(0, 50);
    
    setSlugInput(cleanSlug);
    updateSettings({ slug: cleanSlug });

    if (cleanSlug.length >= 3) {
      setCheckingSlug(true);
      const available = await checkSlugAvailability(cleanSlug);
      setSlugAvailable(available);
      setCheckingSlug(false);
    } else {
      setSlugAvailable(null);
    }
  };

  const handlePublish = async () => {
    if (!menuDraft) return;

    setPublishing(true);
    await publishMenu(menuDraft.id, settings);
    setPublishing(false);
    nextStep();
  };

  const previewUrl = `menuready.app/m/${slugInput || 'your-restaurant'}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          Customize Your Menu
        </h2>
        <p className="text-lg text-slate-600">
          Choose your settings and publish your digital menu
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Settings form */}
        <div className="space-y-6 order-2 md:order-1">
          {/* URL slug */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              <Link2 className="w-4 h-4 inline mr-1" />
              Menu URL
            </label>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-slate-600">menuready.app/m/</span>
              <input
                type="text"
                value={slugInput}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="your-restaurant"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
              />
            </div>
            {checkingSlug && (
              <p className="text-sm text-slate-500">Checking availability...</p>
            )}
            {slugAvailable === true && (
              <p className="text-sm text-green-600 font-medium">
                ✓ Available
              </p>
            )}
            {slugAvailable === false && (
              <p className="text-sm text-red-600 font-medium">
                ✗ This URL is taken, try another
              </p>
            )}
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              <Palette className="w-4 h-4 inline mr-1" />
              Theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['light', 'dark', 'auto'] as const).map((theme) => (
                <button
                  key={theme}
                  onClick={() => updateSettings({ theme })}
                  className={`
                    px-4 py-3 rounded-lg border-2 font-medium text-sm capitalize transition-all
                    ${settings.theme === theme
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                    }
                  `}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          {/* Popular items */}
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <input
              type="checkbox"
              id="popular-items"
              checked={settings.showPopularItems}
              onChange={(e) => updateSettings({ showPopularItems: e.target.checked })}
              className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-100"
            />
            <label htmlFor="popular-items" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Show "Popular Items"
              </div>
              <p className="text-sm text-slate-600">
                Highlight your best sellers at the top of your menu
              </p>
            </label>
          </div>

          {/* Online ordering */}
          <div>
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200 mb-2">
              <input
                type="checkbox"
                id="enable-ordering"
                checked={settings.enableOrdering}
                onChange={(e) => updateSettings({ enableOrdering: e.target.checked })}
                className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-100"
              />
              <label htmlFor="enable-ordering" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                  <ShoppingCart className="w-4 h-4 text-green-500" />
                  Enable online ordering link
                </div>
                <p className="text-sm text-slate-600">
                  Add a button that links to your ordering platform
                </p>
              </label>
            </div>
            
            {settings.enableOrdering && (
              <input
                type="url"
                value={settings.orderingUrl || ''}
                onChange={(e) => updateSettings({ orderingUrl: e.target.value })}
                placeholder="https://yourorderingsite.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
              />
            )}
          </div>

          {/* Yelp Upload Service Upsell */}
          <div className="pt-6">
            <YelpUploadServiceCard
              selected={yelpServiceSelected}
              onSelect={setYelpServiceSelected}
            />
          </div>
        </div>

        {/* Preview */}
        <div className="order-1 md:order-2">
          <div className="sticky top-4">
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              <Smartphone className="w-4 h-4 inline mr-1" />
              Mobile Preview
            </label>
            <div className="bg-slate-900 rounded-3xl p-3 shadow-2xl">
              <div className="bg-white rounded-2xl overflow-hidden aspect-[9/16]">
                {/* Mock phone preview */}
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className={`p-4 ${settings.theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white'} border-b`}>
                    <h3 className="font-bold text-lg">{restaurant?.name || 'Your Restaurant'}</h3>
                    <p className="text-xs text-slate-500">{restaurant?.cuisine || 'Cuisine'}</p>
                  </div>
                  
                  {/* Menu preview */}
                  <div className={`flex-1 p-4 overflow-auto ${settings.theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    {settings.showPopularItems && (
                      <div className="mb-4">
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-600 mb-2">
                          <Sparkles className="w-3 h-3" />
                          Popular Items
                        </div>
                        <div className={`p-2 rounded ${settings.theme === 'dark' ? 'bg-slate-700' : 'bg-white'}`}>
                          <div className="text-xs font-semibold">Sample Item</div>
                          <div className="text-xs text-slate-500">$12.99</div>
                        </div>
                      </div>
                    )}
                    
                    <div className="text-xs font-bold mb-2">Breakfast</div>
                    <div className={`space-y-2 ${settings.theme === 'dark' ? 'text-white' : ''}`}>
                      <div className={`p-2 rounded ${settings.theme === 'dark' ? 'bg-slate-700' : 'bg-white'}`}>
                        <div className="text-xs font-semibold">Pancakes</div>
                        <div className="text-xs text-slate-500">$8.99</div>
                      </div>
                      <div className={`p-2 rounded ${settings.theme === 'dark' ? 'bg-slate-700' : 'bg-white'}`}>
                        <div className="text-xs font-semibold">Omelet</div>
                        <div className="text-xs text-slate-500">$10.99</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order button */}
                  {settings.enableOrdering && (
                    <div className="p-3 border-t">
                      <div className="bg-green-600 text-white text-center py-2 rounded-lg text-xs font-bold">
                        Order Online
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-3 text-center">
              <p className="text-xs text-slate-600">
                <Globe className="w-3 h-3 inline" /> {previewUrl}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Publish button */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-4 -mx-4 md:static md:border-0 md:p-0 md:m-0">
        <button
          onClick={handlePublish}
          disabled={isPublishing || slugAvailable === false || !slugInput}
          className="w-full py-4 bg-green-600 text-white font-semibold text-lg rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {isPublishing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Publishing your menu...
            </>
          ) : yelpServiceSelected ? (
            'Publish + Request Yelp Upload ($49)'
          ) : (
            'Publish Menu (DIY)'
          )}
        </button>
        {yelpServiceSelected && !isPublishing && (
          <p className="text-sm text-indigo-600 text-center mt-2">
            ✓ Yelp upload service included - we'll handle it for you
          </p>
        )}
      </div>
    </div>
  );
}
