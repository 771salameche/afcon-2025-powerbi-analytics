import React from 'react';
import { motion } from 'framer-motion';
import { PatternBackground } from '../../utils/patternHelpers.jsx'; // Import PatternBackground

const BrandedKPICard = ({ title, value, icon, trend, subtitle, pattern = 'pattern-03.png', valueClassName = '' }) => {
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

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(128, 0, 0, 0.1), 0 4px 6px -2px rgba(128, 0, 0, 0.05)' }}
      whileTap={{ scale: 0.98, borderColor: '#07A88F' }}
      className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md border-t-4 border-primary-maroon p-4 sm:p-6 flex flex-col justify-between"
    >
      <PatternBackground pattern={pattern} opacity={0.2} className="absolute inset-0 rounded-lg" />
      <div className="relative z-10"> {/* Ensure content is above pattern */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
          {icon && <div className="text-gray-400 dark:text-gray-500 text-2xl">{icon}</div>}
        </div>
        <div className="flex items-baseline mb-2">
          <p className={`text-2xl sm:text-3xl md:text-4xl font-bold mr-2 ${valueClassName}`}>{value}</p>
          {trend && (
            <span className={`text-xs md:text-sm font-medium ${getTrendColor(trend)} flex items-center`}>
              {getTrendIcon(trend)}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-body">{subtitle}</p>}
      </div>
    </motion.div>
  );
};

export default BrandedKPICard;
