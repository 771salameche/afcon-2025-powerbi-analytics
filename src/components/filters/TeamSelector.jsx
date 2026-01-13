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
    <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Filter by Team</h3>
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg flex justify-between items-center"
            >
                <span>{selectedTeams.length > 0 ? `${selectedTeams.length} teams selected` : 'Select Teams'}</span>
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="p-2">
                        <input
                            type="text"
                            placeholder="Search teams..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <ul className="max-h-60 overflow-y-auto">
                        {filteredTeams.map(team => (
                            <li key={team.team_id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedTeams.includes(team.team_id)}
                                    onChange={() => handleTeamToggle(team.team_id)}
                                    className="mr-3"
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
