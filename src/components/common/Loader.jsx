import React from 'react';

const Loader = ({ message = "Loading tournament data..." }) => {
  return (
    <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="flex items-center">
        <img
          src="/logos/png-ball.png"
          alt="Loading"
          className="w-10 h-10 object-contain animate-spin mr-4"
        />
        <p className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 font-body">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
