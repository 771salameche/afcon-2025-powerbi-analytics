import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import useBreakpoint from '../../hooks/useBreakpoint';

const GoalsTrendChart = ({ fixtures }) => {
  const isMd = useBreakpoint('md');

  const chartData = useMemo(() => {
    if (!fixtures || fixtures.length === 0) {
      return [];
    }

    const sortedFixtures = [...fixtures].sort((a, b) => new Date(a.date) - new Date(b.date));

    let cumulativeGoals = 0;
    const data = [];

    sortedFixtures.forEach((fixture) => {
      if (fixture.status === 'Match Finished') {
        cumulativeGoals += fixture.home_team_score + fixture.away_team_score;
        const matchDate = new Date(fixture.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
        data.push({
          date: matchDate,
          'Cumulative Goals': cumulativeGoals,
        });
      }
    });

    return data;
  }, [fixtures]);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
        <p className="text-sm md:text-base">Not enough data to display goals trend.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
      <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Goals Scored Over Tournament</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: isMd ? 30 : 10,
            left: isMd ? 20 : -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-gray-300)" />
          <XAxis dataKey="date" stroke="var(--color-gray-600)" tick={{ fontSize: isMd ? 12 : 10 }} />
          <YAxis stroke="var(--color-gray-600)" tick={{ fontSize: isMd ? 12 : 10 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-gray-700)',
              border: 'none',
              borderRadius: '5px',
              fontSize: isMd ? '0.875rem' : '0.75rem',
            }}
            labelStyle={{ color: 'var(--color-secondary-white)' }}
            itemStyle={{ color: 'var(--color-secondary-white)' }}
          />
          <Legend wrapperStyle={{ fontSize: isMd ? '0.875rem' : '0.75rem' }} />
          <Line
            type="monotone"
            dataKey="Cumulative Goals"
            stroke="var(--color-primary-maroon)"
            activeDot={{ r: 8, fill: 'var(--color-primary-maroon)', stroke: 'var(--color-primary-teal)' }}
            strokeWidth={2}
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoalsTrendChart;
