import React, { useMemo } from 'react';
import { useTournament } from '../contexts/TournamentContext';
import { useStatistics } from '../contexts/StatisticsContext';
import { useFilters } from '../contexts/FilterContext';
import Loader from '../components/common/Loader';
import BrandedKPICard from '../components/common/BrandedKPICard'; // Use BrandedKPICard
import VenueFilter from '../components/filters/VenueFilter';
import VenueBarChart from '../components/charts/VenueBarChart'; // Import VenueBarChart
import HeroSection from '../components/layout/HeroSection'; // Import HeroSection
import { PatternBackground, getRandomPattern } from '../utils/patternHelpers.jsx'; // Import PatternBackground and getRandomPattern

// Import Skeleton Components
import KPICardSkeleton from '../components/skeletons/KPICardSkeleton';
import ChartSkeleton from '../components/skeletons/ChartSkeleton';


const VenueAnalysis = () => {
  const { loading, error, venues, fixtures } = useTournament(); // Also get raw fixtures for highest attendance
  const { selectedVenue } = useFilters();
  const { filteredFixtures } = useStatistics();

  if (loading) return <Loader message="Loading venue data..." />;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error.message}</div>;

  const selectedVenueData = selectedVenue ? venues.find(v => v.venue_id === selectedVenue) : null;

  const venueStats = useMemo(() => {
    if (!selectedVenue || !selectedVenueData) return null;

    const fixturesAtVenue = filteredFixtures.filter(f => f.venue_id === selectedVenue && f.status === 'Match Finished');
    const allFixturesAtVenue = fixtures.filter(f => f.venue_id === selectedVenue && f.status === 'Match Finished'); // Use raw fixtures for highest attendance across all (not just filtered)

    const totalMatchesAtVenue = fixturesAtVenue.length;
    const totalGoalsAtVenue = fixturesAtVenue.reduce((sum, f) => sum + f.home_team_score + f.away_team_score, 0);
    const totalAttendanceAtVenue = fixturesAtVenue.reduce((sum, f) => sum + f.attendance, 0);

    const avgGoalsPerMatchAtVenue = totalMatchesAtVenue > 0 ? (totalGoalsAtVenue / totalMatchesAtVenue).toFixed(2) : 0;
    const avgAttendancePerMatchAtVenue = totalMatchesAtVenue > 0 ? Math.round(totalAttendanceAtVenue / totalMatchesAtVenue) : 0;

    const capacityUtilization = (totalAttendanceAtVenue && selectedVenueData.capacity && totalMatchesAtVenue) > 0
      ? ((totalAttendanceAtVenue / (totalMatchesAtVenue * selectedVenueData.capacity)) * 100).toFixed(1)
      : 0;
    
    const highestAttendanceMatch = allFixturesAtVenue.sort((a, b) => b.attendance - a.attendance)[0];

    return {
      totalMatchesAtVenue,
      totalGoalsAtVenue,
      avgGoalsPerMatchAtVenue,
      totalAttendanceAtVenue,
      avgAttendancePerMatchAtVenue,
      capacityUtilization,
      highestAttendanceMatch,
    };
  }, [selectedVenue, selectedVenueData, filteredFixtures, fixtures]);

  return (
    <div className="space-y-6">
      <HeroSection
        title="AFCON 2025 - Venues"
        subtitle="Explore stadiums across Morocco"
        showMascot={true}
        pattern={getRandomPattern()} // Use random pattern
      />

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <VenueFilter />
      </div>

      {!selectedVenueData ? (
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <p className="text-xl text-gray-600 dark:text-gray-300 font-body">Please select a venue from the filter above to view details.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Venue Header */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            {selectedVenueData.image_url && <img src={selectedVenueData.image_url} alt={selectedVenueData.venue_name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg shadow-lg" />}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{selectedVenueData.venue_name}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-body">{selectedVenueData.city}, {selectedVenueData.country}</p>
              <p className="text-md text-gray-500 dark:text-gray-400 font-body">Capacity: {selectedVenueData.capacity.toLocaleString()}</p>
            </div>
          </div>

          {/* Venue Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <KPICardSkeleton key={i} />)
            ) : (
              <>
                <BrandedKPICard title="Matches Hosted" value={venueStats.totalMatchesAtVenue} pattern={getRandomPattern()} icon={<img src="/logos/png-ball.png" alt="Ball" className="w-6 h-6 object-contain" />} />
                <BrandedKPICard title="Total Goals" value={venueStats.totalGoalsAtVenue} subtitle={`${venueStats.avgGoalsPerMatchAtVenue} avg/match`} pattern={getRandomPattern()} icon={<img src="/logos/coupe.svg" alt="Trophy" className="w-6 h-6 object-contain" />} />
                <BrandedKPICard title="Average Attendance" value={venueStats.avgAttendancePerMatchAtVenue.toLocaleString()} pattern={getRandomPattern()} />
                <BrandedKPICard title="Capacity Utilization" value={`${venueStats.capacityUtilization}%`} trend={parseFloat(venueStats.capacityUtilization) > 70 ? 'up' : (parseFloat(venueStats.capacityUtilization) < 50 ? 'down' : 'neutral')} pattern={getRandomPattern()} />
                <BrandedKPICard
                  title="Highest Attendance Match"
                  value={venueStats.highestAttendanceMatch ? venueStats.highestAttendanceMatch.attendance.toLocaleString() : 'N/A'}
                  subtitle={venueStats.highestAttendanceMatch ? `${venueStats.highestAttendanceMatch.home_team_name} vs ${venueStats.highestAttendanceMatch.away_team_name}` : 'N/A'}
                  pattern={getRandomPattern()}
                />
              </>
            )}
          </div>

          {/* Morocco Map with Markers */}
          {loading ? (
            <ChartSkeleton />
          ) : (
            <PatternBackground pattern={getRandomPattern()} opacity={0.15} className="bg-primary-maroon p-6 rounded-lg shadow-md h-96 flex flex-col items-center justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-secondary-gold font-title mb-4">Morocco Map with Venue Markers - Placeholder</h2>
              <img src="/logos/mascot.svg" alt="Mascot" className="h-24 w-auto opacity-70" />
            </PatternBackground>
          )}

          {/* Charts - Placeholders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {loading ? (
              <>
                <ChartSkeleton />
                <ChartSkeleton />
              </>
            ) : (
              <>
                <PatternBackground pattern={getRandomPattern()} opacity={0.05} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96 flex items-center justify-center relative">
                  <VenueBarChart />
                </PatternBackground>
                <PatternBackground pattern={getRandomPattern()} opacity={0.05} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96 flex items-center justify-center relative">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-500 dark:text-gray-400 font-body mb-4">Attendance Trend (Line Chart) - Placeholder</h2>
                </PatternBackground>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueAnalysis;