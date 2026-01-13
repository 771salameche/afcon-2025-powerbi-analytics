import React from 'react';
import { useFilters } from '../../contexts/FilterContext';

const DateRangeFilter = () => {
  const { dateRange, setDateRange } = useFilters();

  const handleDateChange = (e) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: e.target.value,
    });
  };

  const clearDates = () => {
    setDateRange({ start: null, end: null });
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Filter by Date</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="start" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Start Date</label>
          <input
            type="date"
            name="start"
            id="start"
            value={dateRange.start || ''}
            onChange={handleDateChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-200 border border-primary-teal rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-teal sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="end" className="block text-sm font-medium text-gray-700 dark:text-gray-200">End Date</label>
          <input
            type="date"
            name="end"
            id="end"
            value={dateRange.end || ''}
            onChange={handleDateChange}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-200 border border-primary-teal rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-teal sm:text-sm"
          />
        </div>
      </div>
      <button
        onClick={clearDates}
        className="mt-4 w-full bg-secondary-red text-secondary-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
      >
        Clear Dates
      </button>
    </div>
  );
};

export default DateRangeFilter;
