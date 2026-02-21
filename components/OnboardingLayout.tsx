'use client';

import { ReactNode } from 'react';
import { Stepper } from './Stepper';
import { useOnboardingStore } from '@/lib/store';
import { ArrowLeft } from 'lucide-react';

interface OnboardingLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
}

const STEPS = [
  { number: 1, label: 'Identify' },
  { number: 2, label: 'Sources' },
  { number: 3, label: 'Review Menu' },
  { number: 4, label: 'Customize' },
  { number: 5, label: 'Share' },
];

export function OnboardingLayout({ 
  children, 
  showBackButton = false,
  onBack 
}: OnboardingLayoutProps) {
  const { currentStep, previousStep } = useOnboardingStore();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      previousStep();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showBackButton && currentStep > 1 && (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
            )}
            <h1 className="text-xl font-bold text-slate-900">Menus Ready</h1>
          </div>
          <a
            href="/support"
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Need help?
          </a>
        </div>
      </header>

      {/* Progress Stepper */}
      <Stepper currentStep={currentStep} steps={STEPS} />

      {/* Main content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-slate-600">
            <a href="/privacy" className="hover:text-slate-900">Privacy</a>
            {' · '}
            <a href="/terms" className="hover:text-slate-900">Terms</a>
            {' · '}
            <a href="/how-it-works" className="hover:text-slate-900 font-medium">
              How we created this menu
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
