import React from 'react';

const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-white shadow-lg p-4 sm:p-6 rounded-lg max-w-xs mx-auto mb-6 sm:mb-12 h-full">
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">{title}</h3>
      <p className="text-sm sm:text-base">{description}</p>
    </div>
  );
};

export default FeatureCard;
