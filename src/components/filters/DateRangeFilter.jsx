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
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Filter by Date</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="start" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="start"
            id="start"
            value={dateRange.start || ''}
            onChange={handleDateChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="end" className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="end"
            id="end"
            value={dateRange.end || ''}
            onChange={handleDateChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <button
        onClick={clearDates}
        className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
      >
        Clear Dates
      </button>
    </div>
  );
};

export default DateRangeFilter;
