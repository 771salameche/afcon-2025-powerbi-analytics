import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

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
  const [loadingMessage, setLoadingMessage] = useState("Loading tournament data...");
  const fetchAttemptRef = useRef(0);
  const maxRetries = 3;
  const retryDelay = 2000; // 2 seconds

  useEffect(() => {
    const fetchData = async () => {
      fetchAttemptRef.current++;
      setLoading(true);
      setError(null);
      setLoadingMessage(`Fetching data (attempt ${fetchAttemptRef.current}/${maxRetries})...`);

      const dataFiles = [
        { name: "Teams", url: "/data/Teams.json", setter: setTeams },
        { name: "Fixtures", url: "/data/Fixtures.json", setter: setFixtures },
        { name: "Players", url: "/data/Players.json", setter: setPlayers },
        { name: "Venues", url: "/data/Venues.json", setter: setVenues },
        { name: "Tournament Stages", url: "/data/Tournament_Stages.json", setter: setStages },
      ];

      try {
        const promises = dataFiles.map(async (file) => {
          setLoadingMessage(`Loading ${file.name}...`);
          const response = await fetch(file.url);
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to fetch ${file.name}: ${response.status} ${response.statusText} - ${errorText}`);
          }
          return response.json();
        });

        const results = await Promise.all(promises);

        dataFiles.forEach((file, index) => {
          file.setter(results[index]);
        });

        setLoading(false);
        setError(null);
        setLoadingMessage("Tournament data loaded successfully!");
        fetchAttemptRef.current = 0; // Reset retry counter on success
      } catch (err) {
        console.error("Error loading tournament data:", err);
        setError(err);
        if (fetchAttemptRef.current < maxRetries) {
          setLoadingMessage(`Failed to load data. Retrying in ${retryDelay / 1000} seconds...`);
          setTimeout(fetchData, retryDelay);
        } else {
          setLoading(false);
          setLoadingMessage("Failed to load tournament data after multiple retries.");
          console.error("Max retries reached. Could not load tournament data.");
        }
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

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
    loadingMessage, // Provide loading message
    getTeamById,
    getFixtureById,
    getPlayersByTeam,
  };

  return <TournamentContext.Provider value={value}>{children}</TournamentContext.Provider>;
};