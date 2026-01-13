import React from 'react';

const MatchCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col animate-pulse">
      <div className="flex justify-between items-center text-sm md:text-base mb-2">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
      </div>

      <div className="flex items-center justify-between mb-4">
        {/* Home Team */}
        <div className="flex flex-col items-center flex-1 pr-2">
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mt-2"></div>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mt-1"></div>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center flex-1 pl-2">
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mt-2"></div>
        </div>
      </div>

      <div className="text-center text-xs md:text-sm">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mx-auto mt-2"></div>
      </div>
    </div>
  );
};

export default MatchCardSkeleton;
