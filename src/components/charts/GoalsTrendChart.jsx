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

const GoalsTrendChart = ({ fixtures }) => {
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
        // Use a consistent date format for grouping, or plot individual matches
        // For a trend, often plotting points for each match day is sufficient
        const matchDate = new Date(fixture.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

        // Aggregate goals per day to avoid multiple points on the same day if desired
        // For simplicity, plotting each match as a point for a continuous trend
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
        <p>Not enough data to display goals trend.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Goals Scored Over Tournament</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-gray-700" />
          <XAxis dataKey="date" stroke="#888888" className="dark:stroke-gray-400" />
          <YAxis stroke="#888888" className="dark:stroke-gray-400" />
          <Tooltip
            contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '5px' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Cumulative Goals"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GoalsTrendChart;
