import React, { useMemo } from 'react';
import MatchResultCard from './MatchResultCard';
import { useStatistics } from '../../contexts/StatisticsContext';
import { useTournament } from '../../contexts/TournamentContext'; // To get stage names

const RecentMatchesList = () => {
  const { filteredFixtures } = useStatistics();
  const { stages } = useTournament();

  const getStageName = (stageId) => {
    const stage = stages.find(s => s.stage_id === stageId);
    return stage ? stage.stage_name : 'N/A';
  };

  const recentCompletedMatches = useMemo(() => {
    return filteredFixtures
      .filter(f => f.status === 'Match Finished')
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by most recent
      .slice(0, 5) // Get the last 5
      .map(match => ({
        ...match,
        stage_name: getStageName(match.stage_id) // Add stage name for the card
      }));
  }, [filteredFixtures, stages]); // Re-calculate if fixtures or stages change

  if (recentCompletedMatches.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-center h-40">
        <p className="text-gray-500 dark:text-gray-400">No completed matches found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentCompletedMatches.map((match) => (
        <MatchResultCard key={match.fixture_id} match={match} />
      ))}
    </div>
  );
};

export default RecentMatchesList;
