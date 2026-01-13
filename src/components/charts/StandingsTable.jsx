import React from 'react';
import TeamLogo from '../common/TeamLogo'; // Import TeamLogo

const StandingsTable = ({ standings }) => {
  if (!standings || Object.keys(standings).length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
        <p className="text-sm md:text-base">No group standings data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {Object.keys(standings).map((groupName) => (
        <div key={groupName} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Group {groupName}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr><th scope="col" className="px-3 py-3 text-left text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>{/* New Logo Column Header */}<th scope="col" className="px-3 py-3 text-left text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pos</th><th scope="col" className="px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Team</th><th scope="col" className="px-3 py-3 text-center text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">P</th><th scope="col" className="px-3 py-3 text-center text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">W</th><th scope="col" className="px-3 py-3 text-center text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">D</th><th scope="col" className="px-3 py-3 text-center text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">L</th><th scope="col" className="px-3 py-3 text-center text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">GF</th><th scope="col" className="px-3 py-3 text-center text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">GA</th><th scope="col" className="px-3 py-3 text-center text-xs md:text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">GD</th><th scope="col" className="px-3 py-3 text-center text-xs md:text-sm font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pts</th></tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {standings[groupName].map((team, index) => (
                  <tr key={team.team_id} className={`${index < 2 ? 'bg-secondary-gold bg-opacity-10 border-l-4 border-secondary-gold' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}><td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100"><TeamLogo teamName={team.team_name} size="sm" /> {/* TeamLogo in new column */}</td><td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900 dark:text-gray-100">{index + 1}</td><td className="px-6 py-4 whitespace-nowrap text-sm md:text-base font-medium text-gray-900 dark:text-gray-100 flex items-center">{team.team_name}</td><td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-gray-700 dark:text-gray-300 text-center">{team.played}</td><td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-gray-700 dark:text-gray-300 text-center">{team.wins}</td><td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-gray-700 dark:text-gray-300 text-center">{team.draws}</td><td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-gray-700 dark:text-gray-300 text-center">{team.losses}</td><td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-gray-700 dark:text-gray-300 text-center">{team.goalsFor}</td><td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-gray-700 dark:text-gray-300 text-center">{team.goalsAgainst}</td><td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm text-gray-700 dark:text-gray-300 text-center">{team.goalDifference}</td><td className="px-3 py-4 whitespace-nowrap text-xs md:text-sm font-bold text-gray-900 dark:text-gray-100 text-center">{team.points}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StandingsTable;
