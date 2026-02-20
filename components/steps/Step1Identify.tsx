'use client';

import { useState } from 'react';
import { Search, MapPin, Phone, ChevronRight } from 'lucide-react';
import { Restaurant } from '@/types/onboarding';
import { searchRestaurants } from '@/lib/mockApi';
import { useOnboardingStore } from '@/lib/store';

export function Step1Identify() {
  const [searchQuery, setSearchQuery] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchMode, setSearchMode] = useState<'name' | 'phone'>('name');

  const { setRestaurant, nextStep } = useOnboardingStore();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    const results = await searchRestaurants(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handlePhoneSearch = async () => {
    if (!phoneNumber.trim()) return;
    
    setIsSearching(true);
    // Mock phone search - in real app would hit different endpoint
    const results = await searchRestaurants(phoneNumber);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleContinue = () => {
    if (selectedRestaurant) {
      setRestaurant(selectedRestaurant);
      nextStep();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (searchMode === 'name') {
        handleSearch();
      } else {
        handlePhoneSearch();
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          Your menu is already on Yelp
        </h2>
        <p className="text-lg text-slate-600 mb-2">
          We digitized it for you
        </p>
        <p className="text-sm text-slate-500">
          We found public Yelp review photos and created a draft menu
        </p>
      </div>

      {/* Search mode toggle */}
      <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-lg">
        <button
          onClick={() => setSearchMode('name')}
          className={`
            flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all
            ${searchMode === 'name' 
              ? 'bg-white text-slate-900 shadow-sm' 
              : 'text-slate-600 hover:text-slate-900'
            }
          `}
        >
          Search by name
        </button>
        <button
          onClick={() => setSearchMode('phone')}
          className={`
            flex-1 py-2 px-4 rounded-md font-medium text-sm transition-all
            ${searchMode === 'phone' 
              ? 'bg-white text-slate-900 shadow-sm' 
              : 'text-slate-600 hover:text-slate-900'
            }
          `}
        >
          Search by phone
        </button>
      </div>

      {/* Search input */}
      {searchMode === 'name' ? (
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Restaurant name or city..."
            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
          />
          <button
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      ) : (
        <div className="relative mb-6">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="(123) 456-7890"
            className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
          />
          <button
            onClick={handlePhoneSearch}
            disabled={isSearching || !phoneNumber.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </div>
      )}

      {/* Search results */}
      {searchResults.length > 0 && (
        <div className="space-y-3 mb-8">
          {searchResults.map((restaurant) => (
            <button
              key={restaurant.id}
              onClick={() => handleSelectRestaurant(restaurant)}
              className={`
                w-full p-4 rounded-lg border-2 text-left transition-all
                hover:border-indigo-300 hover:shadow-md
                ${selectedRestaurant?.id === restaurant.id
                  ? 'border-indigo-600 bg-indigo-50 shadow-md'
                  : 'border-slate-200 bg-white'
                }
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-900 mb-1">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {restaurant.address}, {restaurant.city}, {restaurant.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="w-4 h-4" />
                    <span>{restaurant.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <p className="text-sm text-indigo-600 font-medium">
                      {restaurant.cuisine}
                    </p>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                      ✓ We found 6 menu photos
                    </span>
                  </div>
                </div>
                <ChevronRight
                  className={`w-5 h-5 flex-shrink-0 ml-4 transition-colors ${
                    selectedRestaurant?.id === restaurant.id
                      ? 'text-indigo-600'
                      : 'text-slate-400'
                  }`}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {searchResults.length === 0 && (searchQuery || phoneNumber) && !isSearching && (
        <div className="text-center py-8 text-slate-600">
          <p>No restaurants found. Try a different search.</p>
        </div>
      )}

      {/* Continue button */}
      {selectedRestaurant && (
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-4 -mx-4 md:static md:border-0 md:p-0 md:m-0">
          <button
            onClick={handleContinue}
            className="w-full py-4 bg-indigo-600 text-white font-semibold text-lg rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Continue with {selectedRestaurant.name}
          </button>
        </div>
      )}
    </div>
  );
}
