import React from 'react';

const ChartSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96 flex flex-col justify-between animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div> {/* Title placeholder */}
      <div className="flex-1 flex items-end justify-between space-x-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="w-4 bg-gray-300 dark:bg-gray-600 rounded"
            style={{ height: `${Math.random() * 70 + 30}%` }} // Random bar heights
          ></div>
        ))}
      </div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mt-4"></div> {/* X-axis placeholder */}
    </div>
  );
};

export default ChartSkeleton;
