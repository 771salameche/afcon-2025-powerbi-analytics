import React from 'react';
import { getPatternStyle } from '../../utils/patternHelpers.jsx'; // Import getPatternStyle

const HeroSection = ({ title, subtitle, pattern = 'pattern-03.png', showMascot = true }) => {
  return (
    <div className="relative overflow-hidden bg-primary-maroon text-white py-12 md:py-16 lg:py-20 min-h-[250px] flex items-center">
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0"
        style={getPatternStyle(pattern, 0.2)}
      ></div>

      {/* Mascot SVG (positioned bottom-right) */}
      {showMascot && (
        <img
          src="/logos/mascot.svg"
          alt="AFCON Mascot"
          className="absolute bottom-0 right-0 h-32 md:h-64 lg:h-80 w-auto opacity-50 md:opacity-30 object-contain z-0 transform translate-x-1/4 translate-y-1/4"
        />
      )}

      {/* Trophy and Ball Icons (positioned left) */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 md:-translate-x-1/4 flex flex-col space-y-4 z-0 opacity-40">
        <img src="/logos/coupe.svg" alt="Trophy" className="w-12 h-12 md:w-20 md:h-20 object-contain shadow-lg" />
        <img src="/logos/png-ball.png" alt="Football" className="w-10 h-10 md:w-16 md:h-16 object-contain shadow-lg" />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10 px-4 md:px-6 lg:px-8">
        <h1 className="font-title text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-primary-teal mt-2 md:mt-4 font-body">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
