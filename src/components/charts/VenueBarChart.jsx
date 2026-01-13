import React, { useMemo, useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTournament } from '../../contexts/TournamentContext';
import { useStatistics } from '../../contexts/StatisticsContext';

// Function to generate distinct colors using brand palette
const getBrandColors = () => {
  return [
    'var(--color-primary-maroon)',
    'var(--color-primary-teal)',
    'var(--color-secondary-gold)',
    'var(--color-secondary-red)',
    'var(--color-secondary-dark-teal)',
  ];
};

const VenueBarChart = () => {
  const { venues, loading: tourLoading } = useTournament();
  const { filteredFixtures, loading: statsLoading } = useStatistics();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Tailwind's md breakpoint
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loading = tourLoading || statsLoading;

  const chartData = useMemo(() => {
    if (loading || !venues || venues.length === 0 || !filteredFixtures) {
      return [];
    }

    const venueMatchCounts = venues.map(venue => {
      const matchesHosted = filteredFixtures.filter(fixture => fixture.venue_id === venue.venue_id).length;
      return {
        venueName: venue.venue_name,
        matchesHosted: matchesHosted,
        venueId: venue.venue_id,
      };
    }).filter(data => data.matchesHosted > 0); // Only show venues that hosted matches

    return venueMatchCounts;
  }, [venues, filteredFixtures, loading]);

  const brandColors = useMemo(() => getBrandColors(), []);

  if (loading) return <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400"><p className="text-sm md:text-base">Loading venue chart data...</p></div>;
  if (chartData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">No data available for matches by venue.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Matches by Venue</h3>
      <ResponsiveContainer width="100%" height={isMobile ? Math.max(300, chartData.length * 50) : 300}>
        <BarChart
          data={chartData}
          layout={isMobile ? 'vertical' : 'horizontal'}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-300)" />
          {isMobile ? (
            <XAxis type="number" dataKey="matchesHosted" stroke="var(--color-gray-600)" />
          ) : (
            <XAxis type="category" dataKey="venueName" stroke="var(--color-gray-600)" interval={0} angle={-30} textAnchor="end" height={60} />
          )}
          {isMobile ? (
            <YAxis type="category" dataKey="venueName" stroke="var(--color-gray-600)" width={100} />
          ) : (
            <YAxis type="number" dataKey="matchesHosted" stroke="var(--color-gray-600)" />
          )}
          <Tooltip
            cursor={{ fill: 'rgba(0,0,0,0.1)' }}
            contentStyle={{ backgroundColor: 'var(--color-gray-700)', border: 'none', borderRadius: '5px' }}
            labelStyle={{ color: 'var(--color-secondary-white)' }}
            itemStyle={{ color: 'var(--color-secondary-white)' }}
          />
          <Legend />
          <Bar dataKey="matchesHosted" name="Matches Hosted">
            {chartData.map((entry, index) => (
              <Bar key={`bar-${entry.venueId}`} fill={brandColors[index % brandColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VenueBarChart;
