import React, { createContext, useContext, useState, useEffect } from 'react';

const TournamentContext = createContext();

export const useTournament = () => {
  return useContext(TournamentContext);
};

export const TournamentProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [players, setPlayers] = useState([]);
  const [venues, setVenues] = useState([]);
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [teamsRes, fixturesRes, playersRes, venuesRes, stagesRes] = await Promise.all([
          fetch('/data/Teams.json'),
          fetch('/data/Fixtures.json'),
          fetch('/data/Players.json'),
          fetch('/data/Venues.json'),
          fetch('/data/Tournament_Stages.json'),
        ]);

        if (!teamsRes.ok || !fixturesRes.ok || !playersRes.ok || !venuesRes.ok || !stagesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const teamsData = await teamsRes.json();
        const fixturesData = await fixturesRes.json();
        const playersData = await playersRes.json();
        const venuesData = await venuesRes.json();
        const stagesData = await stagesRes.json();

        setTeams(teamsData);
        setFixtures(fixturesData);
        setPlayers(playersData);
        setVenues(venuesData);
        setStages(stagesData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTeamById = (id) => {
    return teams.find((team) => team.team_id === id);
  };

  const getFixtureById = (id) => {
    return fixtures.find((fixture) => fixture.fixture_id === id);
  };

  const getPlayersByTeam = (teamId) => {
    return players.filter((player) => player.team_id === teamId);
  };

  const value = {
    teams,
    fixtures,
    players,
    venues,
    stages,
    loading,
    error,
    getTeamById,
    getFixtureById,
    getPlayersByTeam,
  };

  return <TournamentContext.Provider value={value}>{children}</TournamentContext.Provider>;
};
