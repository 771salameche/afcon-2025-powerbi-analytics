import React from 'react';

const Loader = ({ message = "Loading tournament data..." }) => {
  return (
    <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="flex items-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
