/**
 * @file This file provides a context for calculating and supplying derived statistics
 * based on the raw data from TournamentContext and the user's filter selections
 * from FilterContext. It performs all major calculations and aggregations.
 */

import React, { createContext, useContext, useMemo } from 'react';
import { useTournament } from './TournamentContext';
import { useFilters } from './FilterContext';

const StatisticsContext = createContext();

/**
 * Custom hook to access the statistics context.
 * @returns {object} The statistics context value.
 */
export const useStatistics = () => {
  return useContext(StatisticsContext);
};

/**
 * Provides derived statistics and calculation functions to its children.
 * This provider depends on TournamentProvider and FilterProvider.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The provider component.
 */
export const StatisticsProvider = ({ children }) => {
  const { fixtures, teams } = useTournament();
  const { selectedTeams, dateRange, selectedStage, selectedVenue } = useFilters();

  /**
   * @type {object[]}
   * Memoized array of fixtures that match the current filter criteria.
   */
  const filteredFixtures = useMemo(() => {
    // This calculation filters all fixtures based on active user selections.
    return fixtures.filter(fixture => {
      const matchDate = new Date(fixture.date);
      const teamInFilter = selectedTeams.length === 0 || selectedTeams.includes(fixture.home_team_id) || selectedTeams.includes(fixture.away_team_id);
      const dateInFilter = (!dateRange.start || matchDate >= new Date(dateRange.start)) && (!dateRange.end || matchDate <= new Date(dateRange.end));
      const stageInFilter = !selectedStage || fixture.stage_id === selectedStage;
      const venueInFilter = !selectedVenue || fixture.venue_id === selectedVenue;
      return teamInFilter && dateInFilter && stageInFilter && venueInFilter;
    });
  }, [fixtures, selectedTeams, dateRange, selectedStage, selectedVenue]);

  /**
   * @type {object}
   * Memoized object containing high-level tournament statistics (KPIs).
   * These are recalculated whenever the filtered fixtures change.
   */
  const stats = useMemo(() => {
    // Aggregate stats from the currently filtered fixtures.
    const completed = filteredFixtures.filter(f => f.status === 'Match Finished');
    const totalMatches = filteredFixtures.length;
    const completedMatches = completed.length;
    const totalGoals = completed.reduce((sum, f) => sum + f.home_team_score + f.away_team_score, 0);
    const totalAttendance = completed.reduce((sum, f) => sum + f.attendance, 0);

    return {
      totalMatches,
      completedMatches,
      totalGoals,
      avgGoalsPerMatch: completedMatches > 0 ? (totalGoals / completedMatches).toFixed(2) : 0,
      totalAttendance,
      avgAttendance: completedMatches > 0 ? Math.round(totalAttendance / completedMatches) : 0,
      tournamentProgress: totalMatches > 0 ? (completedMatches / totalMatches) * 100 : 0,
    };
  }, [filteredFixtures]);

  /**
   * Calculates detailed statistics for a single team.
   * @param {number} teamId - The ID of the team.
   * @returns {object} An object containing the team's stats (played, wins, draws, etc.).
   */
  const calculateTeamStats = (teamId) => {
    // This function iterates through all fixtures to calculate one team's performance.
    const teamFixtures = fixtures.filter(f => (f.home_team_id === teamId || f.away_team_id === teamId) && f.status === 'Match Finished');
    let wins = 0, draws = 0, losses = 0, goalsFor = 0, goalsAgainst = 0;

    teamFixtures.forEach(f => {
      const isHome = f.home_team_id === teamId;
      const scoreFor = isHome ? f.home_team_score : f.away_team_score;
      const scoreAgainst = isHome ? f.away_team_score : f.home_team_score;

      goalsFor += scoreFor;
      goalsAgainst += scoreAgainst;

      if (scoreFor > scoreAgainst) wins++;
      else if (scoreFor < scoreAgainst) losses++;
      else draws++;
    });

    const goalDifference = goalsFor - goalsAgainst;
    const points = (wins * 3) + draws;

    return { teamId, played: teamFixtures.length, wins, draws, losses, goalsFor, goalsAgainst, goalDifference, points };
  };

  /**
   * @type {object}
   * Memoized object containing the standings for each group.
   * The standings are sorted based on points, goal difference, and goals for.
   */
  const groupStandings = useMemo(() => {
    const groups = {};
    teams.forEach(team => {
      if (!groups[team.group]) {
        groups[team.group] = [];
      }
      const teamStats = calculateTeamStats(team.team_id);
      groups[team.group].push({ ...team, ...teamStats });
    });

    // Sort each group according to standard tournament rules.
    for (const group in groups) {
      groups[group].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
        return a.team_name.localeCompare(b.team_name);
      });
    }

    return groups;
  }, [teams, fixtures]);

  const value = {
    ...stats,
    filteredFixtures,
    calculateTeamStats,
    groupStandings,
  };

  return <StatisticsContext.Provider value={value}>{children}</StatisticsContext.Provider>;
};
