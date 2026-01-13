import React from 'react';

const BrandedKPICard = ({ title, value, icon, trend, subtitle, pattern }) => {
  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-secondary-gold';
      case 'down':
        return 'text-secondary-red';
      case 'neutral':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return '▲'; // Up arrow
      case 'down':
        return '▼'; // Down arrow
      case 'neutral':
        return '●'; // Dot or dash
      default:
        return '';
    }
  };

  // Simple pattern background, can be replaced with actual SVG pattern if needed
  const patternStyle = pattern ? {
    backgroundImage: `repeating-linear-gradient(45deg, rgba(128,0,0,0.05) 0, rgba(128,0,0,0.05) 10px, transparent 10px, transparent 20px)`,
  } : {};


  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-t-4 border-primary-maroon p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div style={patternStyle} className="absolute inset-0 opacity-10 rounded-lg"></div> {/* Pattern background */}
      <div className="relative z-10"> {/* Ensure content is above pattern */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
          {icon && <div className="text-gray-400 dark:text-gray-500 text-2xl">{icon}</div>}
        </div>
        <div className="flex items-baseline mb-2">
          <p className="text-3xl md:text-4xl font-bold text-primary-maroon mr-2">{value}</p>
          {trend && (
            <span className={`text-xs md:text-sm font-medium ${getTrendColor(trend)} flex items-center`}>
              {getTrendIcon(trend)}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
      </div>
    </div>
  );
};

export default BrandedKPICard;
