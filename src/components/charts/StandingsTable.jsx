import React from 'react';
import PropTypes from 'prop-types';
import TeamLogo from '../common/TeamLogo';
import Button from '../common/Button'; // Import the Button component

const StandingsTable = ({ standings }) => {
  if (!standings || Object.keys(standings).length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
        <p className="text-sm md:text-base">No group standings data available.</p>
      </div>
    );
  }

  const handleExportCsv = (groupName) => {
    const groupData = standings[groupName];
    if (!groupData) return;

    const headers = [
      "Pos", "Team", "P", "W", "D", "L", "GF", "GA", "GD", "Pts"
    ];
    const csvRows = [headers.join(',')];

    groupData.forEach((team, index) => {
      const row = [
        index + 1,
        `"${team.team_name}"`, // Wrap team name in quotes to handle commas
        team.played,
        team.wins,
        team.draws,
        team.losses,
        team.goalsFor,
        team.goalsAgainst,
        team.goalDifference,
        team.points,
      ];
      csvRows.push(row.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      link.setAttribute('href', URL.createObjectURL(blob));
      link.setAttribute('download', `${groupName.replace(/\s/g, '_')}_standings.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-8">
      {Object.keys(standings).map((groupName) => (
        <div key={groupName} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">Group {groupName}</h3>
            <Button onClick={() => handleExportCsv(groupName)} className="text-sm">
              Export to CSV
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"></th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pos</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Team</th>
                  <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">P</th>
                  <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">W</th>
                  <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">D</th>
                  <th scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">L</th>
                  <th scope="col" className="hidden md:table-cell px-2 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">GF</th>
                  <th scope="col" className="hidden md:table-cell px-2 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">GA</th>
                  <th scope="col" className="hidden md:table-cell px-2 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">GD</th>
                  <th scope="col" className="px-2 py-3 text-center text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pts</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {groupData.map((team, index) => (
                  <tr key={team.team_id} className={`${index < 2 ? 'bg-secondary-gold bg-opacity-10 border-l-4 border-secondary-gold' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                    <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      <TeamLogo teamName={team.team_name} size="sm" />
                    </td>
                    <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{index + 1}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center">{team.team_name}</td>
                    <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">{team.played}</td>
                    <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">{team.wins}</td>
                    <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">{team.draws}</td>
                    <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">{team.losses}</td>
                    <td className="hidden md:table-cell px-2 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">{team.goalsFor}</td>
                    <td className="hidden md:table-cell px-2 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">{team.goalsAgainst}</td>
                    <td className="hidden md:table-cell px-2 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300 text-center">{team.goalDifference}</td>
                    <td className="px-2 py-3 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100 text-center">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

StandingsTable.propTypes = {
  standings: PropTypes.object.isRequired,
};

export default StandingsTable;
