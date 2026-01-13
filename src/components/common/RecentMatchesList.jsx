import React, { useMemo } from 'react';
import MatchCard from './MatchCard'; // Import MatchCard
import { useStatistics } from '../../contexts/StatisticsContext';
import { useTournament } from '../../contexts/TournamentContext'; // To get stage names and team details

const RecentMatchesList = () => {
  const { filteredFixtures } = useStatistics();
  const { stages, getTeamById } = useTournament(); // Get getTeamById

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
        stage_name: getStageName(match.stage_id), // Add stage name for the card
        homeTeam: getTeamById(match.home_team_id), // Get home team details
        awayTeam: getTeamById(match.away_team_id) // Get away team details
      }));
  }, [filteredFixtures, stages, getTeamById]); // Re-calculate if fixtures or stages change

  if (recentCompletedMatches.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-center h-40">
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">No completed matches found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentCompletedMatches.map((match) => (
        <MatchCard
          key={match.fixture_id}
          fixture={match}
          homeTeam={match.homeTeam}
          awayTeam={match.awayTeam}
        />
      ))}
    </div>
  );
};

export default RecentMatchesList;
