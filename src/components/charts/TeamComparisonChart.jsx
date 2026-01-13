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
import useBreakpoint from '../../hooks/useBreakpoint';

const CustomTooltip = ({ active, payload }) => {
  const isMd = useBreakpoint('md');

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-700 p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md text-gray-800 dark:text-gray-200" style={{ fontSize: isMd ? '0.875rem' : '0.75rem' }}>
        <p className="font-bold">{data.teamName}</p>
        <p>Goals For: {data.goalsFor}</p>
        <p>Goals Against: {data.goalsAgainst}</p>
        <p>Wins: {data.wins}</p>
        <p>Losses: {data.losses}</p>
        <p>Draws: {data.draws}</p>
        <p>Points: {data.points}</p>
      </div>
    );
  }
  return null;
};

const TeamComparisonChart = () => {
  const { teams, loading: tourLoading } = useTournament();
  const { calculateTeamStats, totalGoals, completedMatches, loading: statsLoading } = useStatistics();
  const { selectedTeams } = useFilters();
  const isMd = useBreakpoint('md');

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
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Team Performance Comparison</h3>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-300)" />
          <XAxis type="number" dataKey="goalsFor" name="Goals For" stroke="var(--color-gray-600)" tick={{ fontSize: isMd ? 12 : 10 }} />
          <YAxis type="number" dataKey="goalsAgainst" name="Goals Against" stroke="var(--color-gray-600)" tick={{ fontSize: isMd ? 12 : 10 }} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: isMd ? '0.875rem' : '0.75rem' }} />

          {/* Quadrants */}
          {avgGoalsFor > 0 && <ReferenceLine x={avgGoalsFor} stroke="var(--color-primary-teal)" strokeDasharray="3 3" label={{ value: `Avg GF: ${avgGoalsFor.toFixed(1)}`, fontSize: isMd ? 12 : 10, position: 'insideBottomRight' }} />}
          {avgGoalsAgainst > 0 && <ReferenceLine y={avgGoalsAgainst} stroke="var(--color-primary-teal)" strokeDasharray="3 3" label={{ value: `Avg GA: ${avgGoalsAgainst.toFixed(1)}`, fontSize: isMd ? 12 : 10, position: 'insideTopLeft' }} />}

import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
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
import useBreakpoint from '../../hooks/useBreakpoint';
import Button from '../common/Button'; // Import the Button component
import { exportChartAsPng } from '../../utils/chartExportHelpers'; // Assuming this utility will be created

const CustomTooltip = ({ active, payload }) => {
  const isMd = useBreakpoint('md');

  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-700 p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md text-gray-800 dark:text-gray-200" style={{ fontSize: isMd ? '0.875rem' : '0.75rem' }}>
        <p className="font-bold">{data.teamName}</p>
        <p>Goals For: {data.goalsFor}</p>
        <p>Goals Against: {data.goalsAgainst}</p>
        <p>Wins: {data.wins}</p>
        <p>Losses: {data.losses}</p>
        <p>Draws: {data.draws}</p>
        <p>Points: {data.points}</p>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
};

const TeamComparisonChart = () => {
  const { teams, loading: tourLoading } = useTournament();
  const { calculateTeamStats, completedMatches, loading: statsLoading } = useStatistics();
  const { selectedTeams } = useFilters();
  const isMd = useBreakpoint('md');
  const chartRef = useRef(null); // Create a ref for the chart container

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

  const handleExport = () => {
    if (chartRef.current) {
      exportChartAsPng(chartRef.current, 'team-comparison-chart.png');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400"><p className="text-sm md:text-base">Loading team comparison data...</p></div>;
  if (chartData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">Not enough data to compare teams (Goals For vs. Goals Against).</p>
      </div>
    );
  }

  return (
    <div ref={chartRef} className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">Team Performance Comparison</h3>
        <Button onClick={handleExport} className="text-sm">
          Export as PNG
        </Button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-300)" />
          <XAxis type="number" dataKey="goalsFor" name="Goals For" stroke="var(--color-gray-600)" tick={{ fontSize: isMd ? 12 : 10 }} />
          <YAxis type="number" dataKey="goalsAgainst" name="Goals Against" stroke="var(--color-gray-600)" tick={{ fontSize: isMd ? 12 : 10 }} />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: isMd ? '0.875rem' : '0.75rem' }} />

          {/* Quadrants */}
          {avgGoalsFor > 0 && <ReferenceLine x={avgGoalsFor} stroke="var(--color-primary-teal)" strokeDasharray="3 3" label={{ value: `Avg GF: ${avgGoalsFor.toFixed(1)}`, fontSize: isMd ? 12 : 10, position: 'insideBottomRight' }} />}
          {avgGoalsAgainst > 0 && <ReferenceLine y={avgGoalsAgainst} stroke="var(--color-primary-teal)" strokeDasharray="3 3" label={{ value: `Avg GA: ${avgGoalsAgainst.toFixed(1)}`, fontSize: isMd ? 12 : 10, position: 'insideTopLeft' }} />}

          <Scatter name="Teams" data={chartData} fill="var(--color-primary-teal)">
            {chartData.map((entry, index) => (
              <Scatter
                key={`scatter-${entry.teamId}`}
                data={[entry]}
                fill={selectedTeams.includes(entry.teamId) ? 'var(--color-primary-maroon)' : 'var(--color-primary-teal)'}
                stroke={selectedTeams.includes(entry.teamId) ? 'var(--color-primary-maroon)' : 'none'}
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

TeamComparisonChart.propTypes = {
  // No specific props needed for this component, as it fetches data from contexts
};

export default TeamComparisonChart;
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TeamComparisonChart;