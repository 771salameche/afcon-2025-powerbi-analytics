import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilters = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [selectedStage, setSelectedStage] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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
