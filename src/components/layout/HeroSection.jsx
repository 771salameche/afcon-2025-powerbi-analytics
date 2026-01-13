import React from 'react';

const HeroSection = ({ title, subtitle, pattern = 'pattern-03.png', showMascot = true }) => {
  return (
    <div className="relative overflow-hidden bg-primary-maroon text-white py-12 md:py-16 lg:py-20 min-h-[250px] flex items-center">
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 bg-repeat opacity-20"
        style={{ backgroundImage: `url(/logos/${pattern})` }}
      ></div>

      {/* Mascot SVG (positioned bottom-right) */}
      {showMascot && (
        <img
          src="/logos/mascot.svg"
          alt="Mascot"
          className="absolute bottom-0 right-0 h-48 md:h-64 lg:h-80 w-auto opacity-30 object-contain z-0 transform translate-x-1/4 translate-y-1/4 md:translate-x-1/5 md:translate-y-1/5"
        />
      )}

      {/* Trophy and Ball Icons (positioned left) - Placeholders */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/3 md:-translate-x-1/4 flex flex-col space-y-4 z-0 opacity-40">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-secondary-gold rounded-full flex items-center justify-center shadow-lg">
          {/* Placeholder for Trophy SVG */}
          <span className="text-white text-3xl">🏆</span>
        </div>
        <div className="w-12 h-12 md:w-16 md:h-16 bg-secondary-teal rounded-full flex items-center justify-center shadow-lg">
          {/* Placeholder for Ball SVG */}
          <span className="text-white text-2xl">⚽</span>
        </div>
      </div>


      {/* Content */}
      <div className="container mx-auto relative z-10 px-4 md:px-6 lg:px-8">
        <h1 className="font-title text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-primary-teal mt-2 md:mt-4">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
