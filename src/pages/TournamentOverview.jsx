import React, { useMemo } from 'react';
import { useTournament } from '../contexts/TournamentContext';
import { useStatistics } from '../contexts/StatisticsContext';
import { useFilters } from '../contexts/FilterContext';
import BrandedKPICard from '../components/common/BrandedKPICard';
import Loader from '../components/common/Loader';
import StageFilter from '../components/filters/StageFilter';
import DateRangeFilter from '../components/filters/DateRangeFilter';
import GoalsTrendChart from '../components/charts/GoalsTrendChart';
import RecentMatchesList from '../components/common/RecentMatchesList';
import StandingsTable from '../components/charts/StandingsTable';
import HeroSection from '../components/layout/HeroSection';
import { getRandomPattern, PatternBackground } from '../utils/patternHelpers.jsx';

// Import Skeleton Components
import KPICardSkeleton from '../components/skeletons/KPICardSkeleton';
import MatchCardSkeleton from '../components/skeletons/MatchCardSkeleton';
import TableSkeleton from '../components/skeletons/TableSkeleton';
import ChartSkeleton from '../components/skeletons/ChartSkeleton';

const TournamentOverview = () => {
  const { loading, error, stages } = useTournament();
  const { selectedStage } = useFilters();
  const {
    totalMatches,
    completedMatches,
    totalGoals,
    avgGoalsPerMatch,
    totalAttendance,
    avgAttendance,
    filteredFixtures,
    tournamentProgress,
    groupStandings
  } = useStatistics();

  const currentStageName = useMemo(() => {
    if (selectedStage) {
      const stage = stages.find(s => s.stage_id === selectedStage);
      return stage ? stage.stage_name : 'All Stages';
    }

    if (filteredFixtures.length === 0) {
      return 'Not Started';
    }

    const uncompletedFixtures = filteredFixtures.filter(f => f.status !== 'Match Finished');
    if (uncompletedFixtures.length > 0) {
      const earliestUncompleted = uncompletedFixtures.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
      const stage = stages.find(s => s.stage_id === earliestUncompleted.stage_id);
      return stage ? stage.stage_name : 'N/A';
    } else {
      return 'Tournament Concluded';
    }
  }, [selectedStage, stages, filteredFixtures]);

  if (loading) return <Loader message="Calculating statistics..." />;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      <HeroSection
        title="AFCON 2025 - Morocco"
        subtitle="Africa Cup of Nations Tournament"
        showMascot={true}
        pattern={getRandomPattern()}
      />

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StageFilter />
        <DateRangeFilter />
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <KPICardSkeleton key={i} />)
        ) : (
          <>
            <BrandedKPICard title="Total Matches" value={totalMatches} subtitle={`${tournamentProgress.toFixed(1)}% completed`} pattern={getRandomPattern()} />
            <BrandedKPICard title="Completed Matches" value={completedMatches} pattern={getRandomPattern()} />
            <BrandedKPICard title="Total Goals" value={totalGoals} subtitle={`${avgGoalsPerMatch} avg/match`} pattern={getRandomPattern()} icon={<img src="/logos/png-ball.png" alt="Ball" className="w-6 h-6 object-contain" />} />
            <BrandedKPICard title="Avg. Goals / Match" value={avgGoalsPerMatch} pattern={getRandomPattern()} />
            <BrandedKPICard title="Total Attendance" value={totalAttendance.toLocaleString()} subtitle={`${avgAttendance.toLocaleString()} avg`} pattern={getRandomPattern()} />
            <BrandedKPICard title="Current Stage" value={currentStageName} pattern={getRandomPattern()} icon={<img src="/logos/coupe.svg" alt="Trophy" className="w-6 h-6 object-contain" />} />
          </>
        )}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            <GoalsTrendChart fixtures={filteredFixtures} />
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96 flex items-center justify-center">
              <h2 className="text-xl md:text-2xl font-bold text-gray-500 dark:text-gray-400 font-body mb-4">Fixtures by Venue (Map) - Placeholder</h2>
            </div>
          </>
        )}
      </div>

      {/* Recent Matches Section */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Recent Matches</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 5 }).map((_, i) => <MatchCardSkeleton key={i} />)}
          </div>
        ) : (
          <RecentMatchesList />
        )}
      </div>

      {/* Group Standings Section */}
      <PatternBackground pattern={getRandomPattern()} opacity={0.15} className="p-6 rounded-lg shadow-md">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Group Standings</h2>
        {loading ? (
          <TableSkeleton />
        ) : (
          <StandingsTable standings={groupStandings} />
        )}
      </PatternBackground>
    </div>
  );
};

export default TournamentOverview;
