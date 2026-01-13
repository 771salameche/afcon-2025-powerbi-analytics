import React, { useMemo } from 'react';
import { useTournament } from '../contexts/TournamentContext';
import { useStatistics } from '../contexts/StatisticsContext';
import { useFilters } from '../contexts/FilterContext';
import Loader from '../components/common/Loader';
import BrandedKPICard from '../components/common/BrandedKPICard'; // Use BrandedKPICard
import TeamSelector from '../components/filters/TeamSelector';
import MatchCard from '../components/common/MatchCard'; // Use MatchCard
import TeamComparisonChart from '../components/charts/TeamComparisonChart';
import TeamLogo from '../components/common/TeamLogo'; // Import TeamLogo
import HeroSection from '../components/layout/HeroSection'; // Import HeroSection
import { getRandomPattern, PatternBackground } from '../utils/patternHelpers.jsx'; // Import both

const TeamPerformance = () => {
  const { loading, error, teams, getTeamById, stages } = useTournament();
  const { selectedTeams, setSelectedTeams } = useFilters();
  const { calculateTeamStats, filteredFixtures } = useStatistics();

  const getStageName = (stageId) => {
    const stage = stages.find(s => s.stage_id === stageId);
    return stage ? stage.stage_name : 'N/A';
  };

  const handleTeamSelectionChange = (newSelectedTeams) => {
    if (newSelectedTeams.length > 1) {
      setSelectedTeams([newSelectedTeams[newSelectedTeams.length - 1]]);
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
        stage_name: getStageName(match.stage_id),
        homeTeam: getTeamById(match.home_team_id), // Get home team details
        awayTeam: getTeamById(match.away_team_id) // Get away team details
      }));
  }, [selectedTeamId, filteredFixtures, getStageName, getTeamById]);

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
      <HeroSection
        title="Team Performance"
        subtitle="Detailed statistics and match history for selected teams."
        showMascot={false}
      />

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <p className="text-base md:text-lg font-semibold mb-2">Select Team</p>
        <TeamSelector multiSelect={false} selectedTeams={selectedTeams} setSelectedTeams={handleTeamSelectionChange} />
      </div>

      {!selectedTeam ? (
        <PatternBackground pattern={getRandomPattern()} opacity={0.15} className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <img src="/logos/mascot.svg" alt="Mascot" className="mx-auto h-24 w-auto mb-4 opacity-70" />
          <p className="text-xl md:text-2xl font-title text-gray-800 dark:text-gray-200 mb-2">Select a team to explore their journey</p>
          <img src="/logos/png-ball.png" alt="Football" className="mx-auto h-12 w-auto animate-spin" />
        </PatternBackground>
      ) : (
        <div className="space-y-6">
          {/* Team Header */}
          <PatternBackground pattern={getRandomPattern()} opacity={0.15} className="p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center space-x-6">
            <TeamLogo teamName={selectedTeam.team_name} size="xxl" /> {/* Use XXL size */}
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">{selectedTeam.team_name}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-body">Group: {selectedTeam.group}</p>
              <p className="text-md text-gray-500 dark:text-gray-400 font-body">FIFA Ranking: N/A (Placeholder)</p>
              <p className="text-md text-gray-500 dark:text-gray-400 font-body">Coach: N/A (Placeholder)</p> {/* Coach Name Placeholder */}
            </div>
          </PatternBackground>

          {/* Team Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <BrandedKPICard title="Record (W-D-L)" value={`${teamStats.wins}-${teamStats.draws}-${teamStats.losses}`} pattern={true} />
            <BrandedKPICard title="Points" value={teamStats.points} trend={teamStats.points > 0 ? 'up' : 'neutral'} pattern={true} />
            <BrandedKPICard title="Goals For" value={teamStats.goalsFor} trend={teamStats.goalsFor > teamStats.goalsAgainst ? 'up' : 'neutral'} pattern={true} icon={<img src="/logos/png-ball.png" alt="Ball" className="w-6 h-6 object-contain" />} />
            <BrandedKPICard title="Goals Against" value={teamStats.goalsAgainst} trend={teamStats.goalsAgainst < teamStats.goalsFor ? 'down' : 'neutral'} pattern={true} />
            <BrandedKPICard title="Goal Difference" value={teamStats.goalDifference} trend={teamStats.goalDifference > 0 ? 'up' : (teamStats.goalDifference < 0 ? 'down' : 'neutral')} pattern={true} />
            <BrandedKPICard title="Win Rate" value={`${winRate.toFixed(1)}%`} trend={winRate > 50 ? 'up' : (winRate < 30 ? 'down' : 'neutral')} pattern={true} />
            <BrandedKPICard title="Clean Sheets" value={cleanSheets} trend={cleanSheets > 0 ? 'up' : 'neutral'} pattern={true} icon={<img src="/logos/coupe.svg" alt="Trophy" className="w-6 h-6 object-contain" />} />
            <BrandedKPICard title="Home Record (W-D-L)" value={`${homeRecord.wins}-${homeRecord.draws}-${homeRecord.losses}`} pattern={true} />
            <BrandedKPICard title="Away Record (W-D-L)" value={`${awayRecord.wins}-${awayRecord.draws}-${awayRecord.losses}`} pattern={true} />
          </div>

          {/* Performance Charts - Placeholders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PatternBackground pattern={getRandomPattern()} opacity={0.05} className="p-6 rounded-lg shadow-md h-96 flex items-center justify-center relative">
              <TeamLogo teamName={selectedTeam.team_name} size="xxl" className="absolute opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /> {/* Watermark */}
              <p className="text-gray-500 dark:text-gray-400 font-body">Team Goal Distribution (Bar Chart) - Placeholder</p>
            </PatternBackground>
            <PatternBackground pattern={getRandomPattern()} opacity={0.05} className="p-6 rounded-lg shadow-md h-96 flex items-center justify-center relative">
              <TeamLogo teamName={selectedTeam.team_name} size="xxl" className="absolute opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" /> {/* Watermark */}
              <p className="text-gray-500 dark:text-gray-400 font-body">Player Contributions (Table/Chart) - Placeholder</p>
            </PatternBackground>
          </div>

          {/* Match History Timeline */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Match History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMatches.length > 0 ? (
                teamMatches.map(match => (
                  <MatchCard
                    key={match.fixture_id}
                    fixture={match}
                    homeTeam={match.homeTeam}
                    awayTeam={match.awayTeam}
                  />
                ))
              ) : (
                <div className="col-span-full bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-center h-40">
                  <p className="text-gray-500 dark:text-gray-400 font-body">No completed matches for this team in current filters.</p>
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