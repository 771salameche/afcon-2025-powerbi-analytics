import React from 'react';

const KPICard = ({ title, value, icon, trend, subtitle }) => {
  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
        {icon && <div className="text-gray-400 dark:text-gray-500 text-2xl">{icon}</div>}
      </div>
      <div className="flex items-baseline mb-2">
        <p className="text-4xl font-bold text-gray-900 dark:text-white mr-2">{value}</p>
        {trend && (
          <span className={`text-sm font-medium ${getTrendColor(trend)} flex items-center`}>
            {getTrendIcon(trend)}
          </span>
        )}
      </div>
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </div>
  );
};

export default KPICard;
