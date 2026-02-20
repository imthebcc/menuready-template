'use client';

import { useState } from 'react';
import { CheckCircle, ExternalLink, X } from 'lucide-react';

interface YelpUploadServiceCardProps {
  onSelect: (selected: boolean) => void;
  selected: boolean;
}

export function YelpUploadServiceCard({ onSelect, selected }: YelpUploadServiceCardProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleSelectService = () => {
    if (selected) {
      onSelect(false);
      setPaymentComplete(false);
    } else {
      setShowPaymentModal(true);
    }
  };

  const handleMockPayment = () => {
    // Mock payment flow
    setTimeout(() => {
      setPaymentComplete(true);
      onSelect(true);
      setShowPaymentModal(false);
    }, 1500);
  };

  return (
    <>
      {/* Service Card */}
      <div
        className={`
          relative bg-gradient-to-br from-indigo-50 to-purple-50 
          rounded-lg p-6 border-2 transition-all
          ${selected 
            ? 'border-green-500 shadow-lg' 
            : 'border-indigo-200 hover:border-indigo-300'
          }
        `}
      >
        {selected && (
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
        )}

        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Yelp Upload Service
            </h3>
            <p className="text-sm text-slate-600">
              Let us publish this directly to your Yelp page
            </p>
          </div>
          <div className="text-right ml-4">
            <p className="text-2xl font-bold text-indigo-600">$49</p>
            <p className="text-xs text-slate-500">one-time</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>We handle the formatting and submission</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>Professional presentation on Yelp</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>Saves you 1-2 hours of manual work</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span>Completed within 24 hours</span>
          </div>
        </div>

        {!selected ? (
          <button
            onClick={handleSelectService}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Add Yelp Upload Service
          </button>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-900">Service Added</span>
            </div>
            <button
              onClick={handleSelectService}
              className="text-sm text-slate-600 hover:text-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        )}

        <p className="text-xs text-slate-500 text-center mt-3">
          Or publish yourself for free
        </p>
      </div>

      {/* Mock Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Add Yelp Upload Service
            </h3>
            <p className="text-slate-600 mb-6">
              One-time payment of $49 for professional Yelp menu upload
            </p>

            {/* Mock payment form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Expiry
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleMockPayment}
              disabled={paymentComplete}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors mb-2"
            >
              {paymentComplete ? 'Processing...' : 'Pay $49'}
            </button>

            <p className="text-xs text-slate-500 text-center">
              This is a mock payment flow - no real charges
            </p>
          </div>
        </div>
      )}
    </>
  );
}
