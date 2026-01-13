import React from 'react';

const PATTERN_FILES = [
  'pattern-01.png',
  'pattern-02.png',
  'pattern-03.png',
  'pattern-04.png',
  'pattern-05.png',
  'pattern-06.png',
];

export const getRandomPattern = () => {
  const randomIndex = Math.floor(Math.random() * PATTERN_FILES.length);
  return PATTERN_FILES[randomIndex];
};

export const getPatternStyle = (patternName, opacity = 0.1) => {
  if (!patternName) return {};
  return {
    backgroundImage: `url(/logos/${patternName})`,
    opacity: opacity,
    backgroundRepeat: 'repeat',
    backgroundSize: 'cover',
  };
};

export const PatternBackground = ({ pattern, opacity = 0.1, children, className = '' }) => {
  const selectedPattern = pattern || getRandomPattern();
  const style = getPatternStyle(selectedPattern, opacity);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-lg" style={style}></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
