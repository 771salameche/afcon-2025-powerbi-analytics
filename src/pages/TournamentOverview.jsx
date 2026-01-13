import React, { useMemo } from 'react';
import { useTournament } from '../contexts/TournamentContext';
import { useStatistics } from '../contexts/StatisticsContext';
import { useFilters } from '../contexts/FilterContext'; // Import useFilters
import KPICard from '../components/common/KPICard';
import Loader from '../components/common/Loader';
import StageFilter from '../components/filters/StageFilter';
import DateRangeFilter from '../components/filters/DateRangeFilter';
import GoalsTrendChart from '../components/charts/GoalsTrendChart'; // Import GoalsTrendChart
import RecentMatchesList from '../components/common/RecentMatchesList'; // Import RecentMatchesList
import StandingsTable from '../components/charts/StandingsTable'; // Import StandingsTable


const TournamentOverview = () => {
  const { loading, error, stages } = useTournament();
  const { selectedStage } = useFilters(); // Get selectedStage from filters
  const {
    totalMatches,
    completedMatches,
    totalGoals,
    avgGoalsPerMatch,
    totalAttendance,
    avgAttendance,
    filteredFixtures,
    tournamentProgress,
    groupStandings // Get groupStandings from useStatistics
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
      // Find the stage of the earliest uncompleted fixture
      const earliestUncompleted = uncompletedFixtures.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
      const stage = stages.find(s => s.stage_id === earliestUncompleted.stage_id);
      return stage ? stage.stage_name : 'N/A';
    } else {
      // All fixtures completed
      return 'Tournament Concluded';
    }
  }, [selectedStage, stages, filteredFixtures]);


  if (loading) return <Loader message="Calculating statistics..." />;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error.message}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">AFCON 2025 - Tournament Overview</h1>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StageFilter />
        <DateRangeFilter />
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard title="Total Matches" value={totalMatches} subtitle={`${tournamentProgress.toFixed(1)}% completed`} />
        <KPICard title="Completed Matches" value={completedMatches} />
        <KPICard title="Total Goals" value={totalGoals} subtitle={`${avgGoalsPerMatch} avg/match`} />
        <KPICard title="Avg. Goals / Match" value={avgGoalsPerMatch} />
        <KPICard title="Total Attendance" value={totalAttendance.toLocaleString()} subtitle={`${avgAttendance.toLocaleString()} avg`} />
        <KPICard title="Current Stage" value={currentStageName} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GoalsTrendChart fixtures={filteredFixtures} />
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96 flex items-center justify-center">
          <p className="text-gray-500">Fixtures by Venue (Map) - Placeholder</p>
        </div>
      </div>

      {/* Recent Matches Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Recent Matches</h2>
        <RecentMatchesList />
      </div>

      {/* Group Standings Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Group Standings</h2>
        <StandingsTable standings={groupStandings} />
      </div>
    </div>
  );
};

export default TournamentOverview;
