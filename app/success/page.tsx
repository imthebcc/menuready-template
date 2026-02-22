'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const restaurant = searchParams.get('restaurant');
  const sessionId = searchParams.get('session_id');
  const [copied, setCopied] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState('');

  const menuUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://menusready.com'}/menu/${restaurant}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    verifySession();
  }, [sessionId]);

  async function verifySession() {
    if (!sessionId) {
      setError('Access denied. Missing payment verification.');
      setVerifying(false);
      return;
    }

    try {
      const res = await fetch(`/api/verify-session?session_id=${sessionId}`);
      const data = await res.json();

      if (data.valid) {
        setVerified(true);
      } else {
        setError('Access denied. Invalid or expired session.');
      }
    } catch (err) {
      setError('Access denied. Could not verify payment.');
    } finally {
      setVerifying(false);
    }
  }

  if (verifying) {
    return (
      <div className="min-h-screen bg-[#F5F4F1] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E8281E] mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (error || !verified || !restaurant) {
    return (
      <div className="min-h-screen bg-[#F5F4F1] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111111] mb-2" style={{fontFamily: "'Sora', sans-serif"}}>
            Access Denied
          </h1>
          <p className="text-[#6B7280] mb-6">
            {error || 'This page is only accessible after completing a purchase.'}
          </p>
          <Link href="/" className="text-[#E8281E] underline font-semibold">
            Go to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F4F1] max-w-[430px] mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        {/* Green checkmark */}
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-[#111111] mb-2" style={{fontFamily: "'Sora', sans-serif"}}>
          You're all set!
        </h1>
        <p className="text-[15px] text-[#6B7280]">
          Your menu is live. Here's everything you need.
        </p>
      </div>

      {/* Download Buttons */}
      <div className="bg-white rounded-2xl border border-[#E8E6E1] p-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {/* PDF Menu */}
          <a
            href={`/api/download/pdf?restaurant=${restaurant}`}
            download
            className="flex flex-col items-center justify-center gap-2 bg-[#F5F4F1] rounded-xl px-4 py-5 hover:bg-[#E8E6E1] transition-colors"
          >
            <span className="text-2xl">📄</span>
            <span className="text-[12px] font-semibold text-[#111111] text-center" style={{fontFamily: "'Sora', sans-serif"}}>
              Download PDF
            </span>
          </a>

          {/* QR Code */}
          <a
            href={`/api/download/qr?restaurant=${restaurant}`}
            download
            className="flex flex-col items-center justify-center gap-2 bg-[#F5F4F1] rounded-xl px-4 py-5 hover:bg-[#E8E6E1] transition-colors"
          >
            <span className="text-2xl">🖼️</span>
            <span className="text-[12px] font-semibold text-[#111111] text-center" style={{fontFamily: "'Sora', sans-serif"}}>
              QR Code PNG
            </span>
          </a>

          {/* Text File */}
          <a
            href={`/api/download/text?restaurant=${restaurant}`}
            download
            className="flex flex-col items-center justify-center gap-2 bg-[#F5F4F1] rounded-xl px-4 py-5 hover:bg-[#E8E6E1] transition-colors"
          >
            <span className="text-2xl">📝</span>
            <span className="text-[12px] font-semibold text-[#111111] text-center" style={{fontFamily: "'Sora', sans-serif"}}>
              Text File
            </span>
          </a>

          {/* Copy Link */}
          <button
            onClick={copyToClipboard}
            className="flex flex-col items-center justify-center gap-2 bg-[#F5F4F1] rounded-xl px-4 py-5 hover:bg-[#E8E6E1] transition-colors"
          >
            <span className="text-2xl">🔗</span>
            <span className="text-[12px] font-semibold text-[#111111] text-center" style={{fontFamily: "'Sora', sans-serif"}}>
              {copied ? 'Copied!' : 'Copy Link'}
            </span>
          </button>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-white rounded-2xl border border-[#E8E6E1] p-5 mb-6">
        <h2 className="text-base font-bold text-[#111111] mb-4" style={{fontFamily: "'Sora', sans-serif"}}>
          What happens next
        </h2>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 text-xs">✓</span>
            </div>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              We're submitting your menu to Yelp (within 24hrs)
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 text-xs">✓</span>
            </div>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              We're submitting to Google (within 24hrs)
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 text-xs">✓</span>
            </div>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              Print your QR code and put it on your tables
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 text-xs">✓</span>
            </div>
            <p className="text-[13px] text-[#6B7280] leading-relaxed">
              Share your menu link on Instagram
            </p>
          </div>
        </div>
      </div>

      {/* View Live Menu Button */}
      <Link
        href={`/menu/${restaurant}`}
        className="w-full flex items-center justify-center gap-2 bg-[#E8281E] text-white text-base font-bold rounded-2xl px-6 py-4 hover:bg-[#c41f16] transition-all mb-6"
        style={{
          fontFamily: "'Sora', sans-serif",
          boxShadow: '0 4px 20px rgba(232,40,30,0.35)'
        }}
      >
        View Your Live Menu →
      </Link>

      {/* Need Help */}
      <div className="text-center">
        <p className="text-[13px] text-[#6B7280] mb-2">Need help?</p>
        <a
          href="https://tally.so/r/QKDaMk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E8281E] font-semibold text-[14px] hover:underline"
          style={{fontFamily: "'Sora', sans-serif"}}
        >
          Contact Support →
        </a>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5F4F1] flex items-center justify-center">
        <p className="text-[#6B7280]">Loading...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
