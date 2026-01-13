import React, { useMemo } from 'react';
import { useTournament } from '../contexts/TournamentContext';
import { useStatistics } from '../contexts/StatisticsContext';
import { useFilters } from '../contexts/FilterContext';
import Loader from '../components/common/Loader';
import KPICard from '../components/common/KPICard';
import TeamSelector from '../components/filters/TeamSelector'; // This will be duplicated in sidebar, but useful for direct page access
import MatchResultCard from '../components/common/MatchResultCard';
import TeamComparisonChart from '../components/charts/TeamComparisonChart';

const TeamPerformance = () => {
  const { loading, error, teams, getTeamById, stages } = useTournament();
  const { selectedTeams, setSelectedTeams } = useFilters(); // Add setSelectedTeams
  const { calculateTeamStats, filteredFixtures } = useStatistics();

  const getStageName = (stageId) => {
    const stage = stages.find(s => s.stage_id === stageId);
    return stage ? stage.stage_name : 'N/A';
  };

  // Ensure only one team can be selected for this page
  const handleTeamSelectionChange = (newSelectedTeams) => {
    if (newSelectedTeams.length > 1) {
      setSelectedTeams([newSelectedTeams[newSelectedTeams.length - 1]]); // Keep only the last selected
    } else {
      setSelectedTeams(newSelectedTeams);
    }
  };

  if (loading) return <Loader message="Loading team data..." />;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error.message}</div>;

  const selectedTeamId = selectedTeams.length > 0 ? selectedTeams[0] : null;
  const selectedTeam = selectedTeamId ? getTeamById(selectedTeamId) : null;

  const teamStats = useMemo(() => {
    if (selectedTeamId) {
      return calculateTeamStats(selectedTeamId);
    }
    return null;
  }, [selectedTeamId, calculateTeamStats]);

  const teamMatches = useMemo(() => {
    if (!selectedTeamId) return [];
    return filteredFixtures
      .filter(f => (f.home_team_id === selectedTeamId || f.away_team_id === selectedTeamId) && f.status === 'Match Finished')
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Most recent first
      .map(match => ({
        ...match,
        stage_name: getStageName(match.stage_id)
      }));
  }, [selectedTeamId, filteredFixtures, getStageName]);

  // Calculate additional KPIs
  const winRate = teamStats && teamStats.played > 0 ? (teamStats.wins / teamStats.played) * 100 : 0;
  const cleanSheets = teamMatches.filter(match => 
    (match.home_team_id === selectedTeamId && match.away_team_score === 0) ||
    (match.away_team_id === selectedTeamId && match.home_team_score === 0)
  ).length;

  const homeRecord = { wins: 0, draws: 0, losses: 0 };
  const awayRecord = { wins: 0, draws: 0, losses: 0 };

  teamMatches.forEach(match => {
    const isHomeGame = match.home_team_id === selectedTeamId;
    if (isHomeGame) {
      if (match.home_team_score > match.away_team_score) homeRecord.wins++;
      else if (match.home_team_score < match.away_team_score) homeRecord.losses++;
      else homeRecord.draws++;
    } else {
      if (match.away_team_score > match.home_team_score) awayRecord.wins++;
      else if (match.away_team_score < match.home_team_score) awayRecord.losses++;
      else awayRecord.draws++;
    }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">Team Performance</h1>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        {/* Use a custom TeamSelector that enforces single selection */}
        <p className="text-base md:text-lg font-semibold mb-2">Select Team</p>
        <TeamSelector multiSelect={false} selectedTeams={selectedTeams} setSelectedTeams={handleTeamSelectionChange} />
      </div>

      {!selectedTeam ? (
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <p className="text-xl text-gray-600 dark:text-gray-300">Please select a team from the filter above or the sidebar to view details.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Team Header */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-6">
            {selectedTeam.team_logo_url && <img src={selectedTeam.team_logo_url} alt={selectedTeam.team_name} className="w-16 h-16 md:w-24 md:h-24 object-contain" />}
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">{selectedTeam.team_name}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">Group: {selectedTeam.group}</p>
              {/* Assuming FIFA Ranking is not in data, using a placeholder */}
              <p className="text-md text-gray-500 dark:text-gray-400">FIFA Ranking: N/A (Placeholder)</p>
            </div>
          </div>

          {/* Team Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <KPICard title="Record (W-D-L)" value={`${teamStats.wins}-${teamStats.draws}-${teamStats.losses}`} />
            <KPICard title="Points" value={teamStats.points} trend={teamStats.points > 0 ? 'up' : 'neutral'} />
            <KPICard title="Goals For" value={teamStats.goalsFor} trend={teamStats.goalsFor > teamStats.goalsAgainst ? 'up' : 'neutral'} />
            <KPICard title="Goals Against" value={teamStats.goalsAgainst} trend={teamStats.goalsAgainst < teamStats.goalsFor ? 'down' : 'neutral'} />
            <KPICard title="Goal Difference" value={teamStats.goalDifference} trend={teamStats.goalDifference > 0 ? 'up' : (teamStats.goalDifference < 0 ? 'down' : 'neutral')} />
            <KPICard title="Win Rate" value={`${winRate.toFixed(1)}%`} trend={winRate > 50 ? 'up' : (winRate < 30 ? 'down' : 'neutral')} />
            <KPICard title="Clean Sheets" value={cleanSheets} trend={cleanSheets > 0 ? 'up' : 'neutral'} />
            <KPICard title="Home Record (W-D-L)" value={`${homeRecord.wins}-${homeRecord.draws}-${homeRecord.losses}`} />
            <KPICard title="Away Record (W-D-L)" value={`${awayRecord.wins}-${awayRecord.draws}-${awayRecord.losses}`} />
          </div>

          {/* Performance Charts - Placeholders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TeamComparisonChart />
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96 flex items-center justify-center">
              <p className="text-gray-500">Player Contributions (Table/Chart) - Placeholder</p>
            </div>
          </div>

          {/* Match History Timeline */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Match History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMatches.length > 0 ? (
                teamMatches.map(match => (
                  <MatchResultCard key={match.fixture_id} match={match} />
                ))
              ) : (
                <div className="col-span-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-center h-40">
                  <p className="text-gray-500 dark:text-gray-400">No completed matches for this team in current filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamPerformance;