import React from 'react';

const TableSkeleton = ({ columns = 10, rows = 5 }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-pulse">
      <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4"></div> {/* Title placeholder */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <td key={colIndex} className="px-3 py-4 whitespace-nowrap text-xs md:text-sm">
                    {colIndex === 1 ? ( // Assuming Team name column
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full mr-3"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                      </div>
                    ) : (
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
