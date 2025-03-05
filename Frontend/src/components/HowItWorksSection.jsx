import React from 'react';
import StepCard from './StepCard';

const HowItWorksSection = () => {
  const steps = [
    { step: 'Step 1', title: 'Sign Up', description: 'Create an account with your student email.' },
    { step: 'Step 2', title: 'Book a Ride', description: 'Choose your destination and confirm your booking.' },
    { step: 'Step 3', title: 'Enjoy Your Ride', description: 'Hop in and enjoy a safe and comfortable ride!' }
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white text-center px-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">How It Works</h2>
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch sm:space-x-4 md:space-x-8 space-y-6 sm:space-y-0">
        {steps.map((step, index) => (
          <StepCard key={index} step={step.step} title={step.title} description={step.description} />
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
