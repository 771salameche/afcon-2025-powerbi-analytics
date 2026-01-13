import React, { createContext, useContext, useMemo } from 'react';
import { useTournament } from './TournamentContext';
import { useFilters } from './FilterContext';

const StatisticsContext = createContext();

export const useStatistics = () => {
  return useContext(StatisticsContext);
};

export const StatisticsProvider = ({ children }) => {
  const { fixtures, teams } = useTournament();
  const { selectedTeams, dateRange, selectedStage, selectedVenue } = useFilters();

  const filteredFixtures = useMemo(() => {
    return fixtures.filter(fixture => {
      const matchDate = new Date(fixture.date);
      const teamInFilter = selectedTeams.length === 0 || selectedTeams.includes(fixture.home_team_id) || selectedTeams.includes(fixture.away_team_id);
      const dateInFilter = (!dateRange.start || matchDate >= new Date(dateRange.start)) && (!dateRange.end || matchDate <= new Date(dateRange.end));
      const stageInFilter = !selectedStage || fixture.stage_id === selectedStage;
      const venueInFilter = !selectedVenue || fixture.venue_id === selectedVenue;
      return teamInFilter && dateInFilter && stageInFilter && venueInFilter;
    });
  }, [fixtures, selectedTeams, dateRange, selectedStage, selectedVenue]);

  const stats = useMemo(() => {
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

  const calculateTeamStats = (teamId) => {
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

  const groupStandings = useMemo(() => {
    const groups = {};
    teams.forEach(team => {
      if (!groups[team.group]) {
        groups[team.group] = [];
      }
      const teamStats = calculateTeamStats(team.team_id);
      groups[team.group].push({ ...team, ...teamStats });
    });

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
