import React from 'react';
import { getRandomPattern, PatternBackground } from '../../utils/patternHelpers.jsx';

const Loader = ({ message = "Loading AFCON 2025 data..." }) => {
  return (
    <div className="fixed inset-0 bg-primary-maroon flex items-center justify-center z-50">
      <PatternBackground pattern={getRandomPattern()} opacity={0.15} className="absolute inset-0" />
      <div className="relative z-10 flex items-center p-4 rounded-lg bg-black bg-opacity-30">
        <img
          src="/logos/png-ball.png"
          alt="Loading"
          className="w-12 h-12 object-contain animate-spin mr-4"
        />
        <p className="text-lg md:text-xl font-title text-secondary-white">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
