import React, { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { useTournament } from '../../contexts/TournamentContext';
import { useStatistics } from '../../contexts/StatisticsContext';
import { useFilters } from '../../contexts/FilterContext';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-700 p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md text-gray-800 dark:text-gray-200">
        <p className="font-bold text-base md:text-lg">{data.teamName}</p>
        <p className="text-sm md:text-base">Goals For: {data.goalsFor}</p>
        <p className="text-sm md:text-base">Goals Against: {data.goalsAgainst}</p>
        <p className="text-sm md:text-base">Wins: {data.wins}</p>
        <p className="text-sm md:text-base">Losses: {data.losses}</p>
        <p className="text-sm md:text-base">Draws: {data.draws}</p>
        <p className="text-sm md:text-base">Points: {data.points}</p>
      </div>
    );
  }
  return null;
};

const TeamComparisonChart = () => {
  const { teams, loading: tourLoading } = useTournament();
  const { calculateTeamStats, totalGoals, completedMatches, loading: statsLoading } = useStatistics();
  const { selectedTeams } = useFilters();

  const loading = tourLoading || statsLoading;

  const chartData = useMemo(() => {
    if (loading || !teams || teams.length === 0 || completedMatches === 0) {
      return [];
    }

    const data = teams.map(team => {
      const stats = calculateTeamStats(team.team_id);
      return {
        teamId: team.team_id,
        teamName: team.team_name,
        goalsFor: stats.goalsFor,
        goalsAgainst: stats.goalsAgainst,
        wins: stats.wins,
        losses: stats.losses,
        draws: stats.draws,
        points: stats.points,
        isHovered: selectedTeams.includes(team.team_id), // For highlighting
      };
    });
    return data;
  }, [teams, calculateTeamStats, selectedTeams, loading, completedMatches]);

  const avgGoalsFor = useMemo(() => {
    if (chartData.length === 0) return 0;
    const sumGoalsFor = chartData.reduce((sum, team) => sum + team.goalsFor, 0);
    return sumGoalsFor / chartData.length;
  }, [chartData]);

  const avgGoalsAgainst = useMemo(() => {
    if (chartData.length === 0) return 0;
    const sumGoalsAgainst = chartData.reduce((sum, team) => sum + team.goalsAgainst, 0);
    return sumGoalsAgainst / chartData.length;
  }, [chartData]);


  if (loading) return <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400"><p className="text-sm md:text-base">Loading team comparison data...</p></div>;
  if (chartData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">Not enough data to compare teams (Goals For vs. Goals Against).</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Team Performance Comparison (Goals For vs. Goals Against)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-700" />
          <XAxis type="number" dataKey="goalsFor" name="Goals For" stroke="#888888" className="dark:stroke-gray-400" />
          <YAxis type="number" dataKey="goalsAgainst" name="Goals Against" stroke="#888888" className="dark:stroke-gray-400" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
          <Legend />

          {/* Quadrants */}
          {avgGoalsFor > 0 && <ReferenceLine x={avgGoalsFor} stroke="#ccc" strokeDasharray="3 3" label={`Avg GF: ${avgGoalsFor.toFixed(1)}`} />}
          {avgGoalsAgainst > 0 && <ReferenceLine y={avgGoalsAgainst} stroke="#ccc" strokeDasharray="3 3" label={{ value: `Avg GA: ${avgGoalsAgainst.toFixed(1)}`, position: 'insideTopLeft' }} />}

          <Scatter name="Teams" data={chartData} fill="#8884d8">
            {chartData.map((entry, index) => (
              <Scatter
                key={`scatter-${entry.teamId}`}
                data={[entry]}
                fill={selectedTeams.includes(entry.teamId) ? '#ff7300' : '#8884d8'} // Highlight selected team
                stroke={selectedTeams.includes(entry.teamId) ? '#ff7300' : 'none'}
                strokeWidth={2}
                r={selectedTeams.includes(entry.teamId) ? 8 : 5}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeamComparisonChart;