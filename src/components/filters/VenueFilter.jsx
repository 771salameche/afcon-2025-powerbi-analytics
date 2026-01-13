import React from 'react';
import { useTournament } from '../../contexts/TournamentContext';
import { useFilters } from '../../contexts/FilterContext';

const VenueFilter = () => {
  const { venues } = useTournament();
  const { selectedVenue, setSelectedVenue } = useFilters();

  if (!venues || venues.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Filter by Venue</h3>
      <select
        value={selectedVenue || ''}
        onChange={(e) => setSelectedVenue(e.target.value === '' ? null : parseInt(e.target.value))}
        className="block w-full px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-200 border border-primary-teal rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-teal sm:text-sm"
      >
        <option value="">All Venues</option>
        {venues.map((venue) => (
          <option key={venue.venue_id} value={venue.venue_id}>
            {venue.venue_name} ({venue.city})
          </option>
        ))}
      </select>
    </div>
  );
};

export default VenueFilter;
