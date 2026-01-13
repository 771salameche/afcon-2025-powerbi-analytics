/**
 * @file This file provides the state management for all user-driven filters
 * across the dashboard. It creates a React Context to manage selected teams,
 * date ranges, tournament stages, venues, and search queries.
 */

import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

/**
 * Custom hook to access the filter context.
 * This provides an easy way for components to get and set filter states.
 * @returns {object} The filter context value.
 */
export const useFilters = () => {
  return useContext(FilterContext);
};

/**
 * Provides the filter state and updater functions to its children components.
 * It encapsulates all filter-related logic.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The provider component.
 */
export const FilterProvider = ({ children }) => {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Resets all active filters to their default states.
   */
  const clearAllFilters = () => {
    setSelectedTeams([]);
    setDateRange({ start: null, end: null });
    setSelectedStage(null);
    setSelectedVenue(null);
    setSearchQuery('');
  };

  const value = {
    selectedTeams,
    setSelectedTeams,
    dateRange,
    setDateRange,
    selectedStage,
    setSelectedStage,
    selectedVenue,
    setSelectedVenue,
    searchQuery,
    setSearchQuery,
    clearAllFilters,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};
