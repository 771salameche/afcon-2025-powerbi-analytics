import React, { useMemo } from 'react';
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
import useBreakpoint from '../../hooks/useBreakpoint';

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
  const isMd = useBreakpoint('md');

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

  const isMobile = !isMd;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Matches by Venue</h3>
      <ResponsiveContainer width="100%" height={isMobile ? Math.max(300, chartData.length * 40) : 300}>
        <BarChart
          data={chartData}
          layout={isMobile ? 'vertical' : 'horizontal'}
          margin={{
            top: 20,
            right: isMobile ? 20 : 30,
            left: isMobile ? 80 : 20,
            bottom: isMobile ? 5 : 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-300)" />
          {isMobile ? (
            <XAxis type="number" dataKey="matchesHosted" stroke="var(--color-gray-600)" tick={{ fontSize: 10 }} />
          ) : (
            <XAxis type="category" dataKey="venueName" stroke="var(--color-gray-600)" interval={0} angle={-40} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
          )}
          {isMobile ? (
            <YAxis type="category" dataKey="venueName" stroke="var(--color-gray-600)" width={100} tick={{ fontSize: 10 }} />
          ) : (
            <YAxis type="number" dataKey="matchesHosted" stroke="var(--color-gray-600)" tick={{ fontSize: 12 }} />
          )}
          <Tooltip
            cursor={{ fill: 'rgba(0,0,0,0.1)' }}
            contentStyle={{ 
              backgroundColor: 'var(--color-gray-700)', 
              border: 'none', 
              borderRadius: '5px',
              fontSize: isMobile ? '0.75rem' : '0.875rem'
            }}
            labelStyle={{ color: 'var(--color-secondary-white)' }}
            itemStyle={{ color: 'var(--color-secondary-white)' }}
          />
          <Legend wrapperStyle={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }} />
          <Bar dataKey="matchesHosted" name="Matches Hosted" isAnimationActive={true} animationDuration={1500} animationEasing="ease-in-out">
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
