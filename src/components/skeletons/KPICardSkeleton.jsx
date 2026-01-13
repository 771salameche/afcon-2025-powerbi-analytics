import React from 'react';

const KPICardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border-t-4 border-primary-maroon p-6 flex flex-col justify-between animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
        <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      </div>
      <div className="flex items-baseline mb-2">
        <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
    </div>
  );
};

export default KPICardSkeleton;
