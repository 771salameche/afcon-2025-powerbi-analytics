import React, { createContext, useContext, useState, useEffect } from 'react';

// Direct imports
import teamsData from '../data/Teams.json';
import fixturesData from '../data/Fixtures.json';
import playersData from '../data/Players.json';
import venuesData from '../data/Venues.json';
import stagesData from '../data/Tournament_Stages.json';
import summaryData from '../data/Tournament_Summary.json';

const TournamentContext = createContext();

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within TournamentProvider');
  }
  return context;
};

// Helper function to clean escaped quotes from strings
const cleanString = (str) => {
  if (typeof str === 'string') {
    return str.replace(/^"|"$/g, '').replace(/\\"/g, '"');
  }
  return str;
};

// Recursive function to deep clean strings in objects and arrays
const deepCleanStrings = (data) => {
  if (typeof data === 'string') {
    return cleanString(data);
  }
  if (Array.isArray(data)) {
    return data.map(item => deepCleanStrings(item));
  }
  if (typeof data === 'object' && data !== null) {
    const cleanedData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        cleanedData[key] = deepCleanStrings(data[key]);
      }
    }
    return cleanedData;
  }
  return data;
};

export const TournamentProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [players, setPlayers] = useState([]);
  const [venues, setVenues] = useState([]);
  const [stages, setStages] = useState([]);
  const [tournamentSummary, setTournamentSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMessage, setLoadingMessage] = useState("Loading AFCON 2025 data...");

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      setLoadingMessage('Loading data from direct imports...');

      // Apply deep cleaning to all imported data
      const cleanedTeams = deepCleanStrings(teamsData);
      const cleanedFixtures = deepCleanStrings(fixturesData);
      const cleanedPlayers = deepCleanStrings(playersData);
      const cleanedVenues = deepCleanStrings(venuesData);
      const cleanedStages = deepCleanStrings(stagesData);
      // Extract first element and then deep clean
      const rawSummary = summaryData && Array.isArray(summaryData) && summaryData.length > 0 ? summaryData[0] : {};
      const cleanedSummary = deepCleanStrings(rawSummary);

      // Validate and set data
      if (!cleanedTeams || cleanedTeams.length === 0) throw new Error('Teams data is empty or invalid.');
      if (!cleanedFixtures || cleanedFixtures.length === 0) throw new Error('Fixtures data is empty or invalid.');
      if (!cleanedPlayers || cleanedPlayers.length === 0) throw new Error('Players data is empty or invalid.');
      if (!cleanedVenues || cleanedVenues.length === 0) throw new Error('Venues data is empty or invalid.');
      if (!cleanedStages || cleanedStages.length === 0) throw new Error('Tournament Stages data is empty or invalid.');
      if (!cleanedSummary || Object.keys(cleanedSummary).length === 0) throw new Error('Tournament Summary data is empty or invalid.');

      setTeams(cleanedTeams);
      setFixtures(cleanedFixtures);
      setPlayers(cleanedPlayers);
      setVenues(cleanedVenues);
      setStages(cleanedStages);
      setTournamentSummary(cleanedSummary);

      setLoading(false);
      setError(null);
      setLoadingMessage("Data loaded successfully from direct imports!");
    } catch (err) {
      console.error('Error loading data from direct imports:', err);
      setLoading(false);
      setError(err);
      setLoadingMessage(`Failed to load data from direct imports: ${err.message}. Please check console.`);
    }
  }, []); // Empty dependency array to run once on mount

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
    tournamentSummary,
    loading,
    error,
    loadingMessage,
    getTeamById,
    getFixtureById,
    getPlayersByTeam,
  };

  return <TournamentContext.Provider value={value}>{children}</TournamentContext.Provider>;
};