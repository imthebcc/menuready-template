'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import QRCode from 'qrcode.react';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const paid = searchParams.get('paid') === 'true';

  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const liveUrl = `${appUrl}/menu/${slug}`;

  useEffect(() => {
    if (slug) {
      fetchRestaurant();
    }
  }, [slug]);

  async function fetchRestaurant() {
    try {
      const res = await fetch(`/api/restaurants/${slug}`);
      const data = await res.json();

      if (res.ok) {
        setRestaurant(data.restaurant);
      }
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch restaurant:', err);
      setLoading(false);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadQR() {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${slug}-qr-code.png`;
    link.href = url;
    link.click();
  }

  async function handleUpgrade(priceType: 'onetime' | 'subscription') {
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          email: '', // User would need to re-enter or we could store it
          priceType,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Failed to create checkout:', err);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!slug || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Invalid Request</h1>
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
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-red-600">
            MenuReady
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <i className="ri-check-line text-3xl text-green-600"></i>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">You're Live!</h1>
            <p className="text-lg text-slate-600">
              {paid
                ? "Your menu is published. We'll submit it to Yelp within 48 hours."
                : 'Your menu is now published and ready to share.'}
            </p>
          </div>

          {/* Live Link */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Your Live Link:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={liveUrl}
                readOnly
                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-900 font-mono text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
              >
                {copied ? (
                  <>
                    <i className="ri-check-line"></i> Copied
                  </>
                ) : (
                  <>
                    <i className="ri-file-copy-line"></i> Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* QR Code */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-700 mb-4">
              Download QR Code:
            </label>
            <div className="flex flex-col items-center">
              <div ref={qrRef} className="bg-white p-4 rounded-lg border border-slate-200 mb-4">
                <QRCode value={liveUrl} size={200} level="H" />
              </div>
              <button
                onClick={downloadQR}
                className="px-6 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all"
              >
                <i className="ri-download-line mr-2"></i>
                Download High-Res QR
              </button>
            </div>
          </div>

          {/* What's Next */}
          <div className="border-t border-slate-200 pt-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">What's Next?</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <i className="ri-checkbox-circle-fill text-green-600 mr-2 mt-1"></i>
                <span>Share your link on social media</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-fill text-green-600 mr-2 mt-1"></i>
                <span>Print QR code for tables</span>
              </li>
              <li className="flex items-start">
                <i className="ri-checkbox-circle-fill text-green-600 mr-2 mt-1"></i>
                <span>Add to Google Business Profile</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Upsell Section (only show if not already paid) */}
        {!paid && (
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg shadow-sm border border-red-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Upgrade Your Menu</h2>
            <p className="text-slate-700 mb-6">
              Get more from your digital menu with professional optimization and analytics.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {/* One-time Upgrade */}
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Done-For-You</h3>
                <p className="text-3xl font-bold text-red-600 mb-4">
                  $99 <span className="text-sm text-slate-600 font-normal">one-time</span>
                </p>
                <ul className="space-y-2 text-sm text-slate-700 mb-6">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span>Professional Yelp submission</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span>Menu optimization</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span>Priority support</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleUpgrade('onetime')}
                  className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-all"
                >
                  Upgrade Now
                </button>
              </div>

              {/* Subscription */}
              <div className="bg-white rounded-lg border border-red-300 p-6 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  BEST VALUE
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">MenuReady Pro</h3>
                <p className="text-3xl font-bold text-red-600 mb-4">
                  $19 <span className="text-sm text-slate-600 font-normal">/month</span>
                </p>
                <ul className="space-y-2 text-sm text-slate-700 mb-6">
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span>Everything in Done-For-You</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span>Monthly menu updates</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-green-600 mr-2 mt-0.5"></i>
                    <span>Analytics dashboard</span>
                  </li>
                </ul>
                <button
                  onClick={() => handleUpgrade('subscription')}
                  className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-all"
                >
                  Start Pro
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Support */}
        <div className="text-center mt-8">
          <p className="text-slate-600 mb-2">Need help?</p>
          <Link
            href="/contact"
            className="text-red-600 hover:text-red-700 font-semibold"
          >
            Contact Support →
          </Link>
        </div>
      </div>
    </div>
  );
}
