'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingLayout } from '@/components/OnboardingLayout';
import { Step1Identify } from '@/components/steps/Step1Identify';
import { Step2Sources } from '@/components/steps/Step2Sources';
import { Step3ReviewMenu } from '@/components/steps/Step3ReviewMenu';
import { Step4Customize } from '@/components/steps/Step4Customize';
import { Step5Share } from '@/components/steps/Step5Share';
import { useOnboardingStore } from '@/lib/store';

export default function OnboardingPage() {
  const { currentStep } = useOnboardingStore();
  const [direction, setDirection] = useState(1);
  const [prevStep, setPrevStep] = useState(currentStep);

  useEffect(() => {
    if (currentStep > prevStep) {
      setDirection(1); // Forward
    } else if (currentStep < prevStep) {
      setDirection(-1); // Backward
    }
    setPrevStep(currentStep);
  }, [currentStep, prevStep]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      filter: 'blur(10px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      filter: 'blur(10px)',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Identify />;
      case 2:
        return <Step2Sources />;
      case 3:
        return <Step3ReviewMenu />;
      case 4:
        return <Step4Customize />;
      case 5:
        return <Step5Share />;
      default:
        return <Step1Identify />;
    }
  };

  return (
    <OnboardingLayout showBackButton={currentStep > 1}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </OnboardingLayout>
  );
}
