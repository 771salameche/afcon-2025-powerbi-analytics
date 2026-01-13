import React, { useState, useMemo } from 'react';
import { useTournament } from '../../contexts/TournamentContext';
import { useFilters } from '../../contexts/FilterContext';

const TeamSelector = () => {
  const { teams } = useTournament();
  const { selectedTeams, setSelectedTeams } = useFilters();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredTeams = useMemo(() => {
    return teams.filter(team =>
      team.team_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [teams, searchTerm]);

  const handleTeamToggle = (teamId) => {
    const newSelectedTeams = selectedTeams.includes(teamId)
      ? selectedTeams.filter(id => id !== teamId)
      : [...selectedTeams, teamId];
    setSelectedTeams(newSelectedTeams);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-base md:text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Filter by Team</h3>
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-secondary-teal text-secondary-white font-medium py-2 px-4 rounded-lg flex justify-between items-center hover:bg-secondary-dark-teal transition-colors duration-200"
            >
                <span>{selectedTeams.length > 0 ? `${selectedTeams.length} teams selected` : 'Select Teams'}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                    <div className="p-2">
                        <input
                            type="text"
                            placeholder="Search teams..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border border-primary-teal rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-teal dark:bg-gray-800 dark:text-gray-200"
                        />
                    </div>
                    <ul className="max-h-60 overflow-y-auto">
                        {filteredTeams.map(team => (
                            <li key={team.team_id} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex items-center text-gray-800 dark:text-gray-200">
                                <input
                                    type="checkbox"
                                    checked={selectedTeams.includes(team.team_id)}
                                    onChange={() => handleTeamToggle(team.team_id)}
                                    className="mr-3 form-checkbox text-primary-maroon focus:ring-primary-maroon"
                                />
                                <span>{team.team_name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
  );
};

export default TeamSelector;
