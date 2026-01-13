import React from 'react';
import PropTypes from 'prop-types';
import TeamLogo from './TeamLogo';

const MatchCard = ({ fixture, homeTeam, awayTeam }) => {
  const {
    home_team_score,
    away_team_score,
    date,
    venue_name,
    stage_name,
    status
  } = fixture;

  const matchDateTime = new Date(date);
  const matchDate = matchDateTime.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const matchTime = matchDateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const isHomeWinner = status === 'Match Finished' && home_team_score > away_team_score;
  const isAwayWinner = status === 'Match Finished' && away_team_score > home_team_score;
  const isDraw = status === 'Match Finished' && home_team_score === away_team_score;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="flex justify-between items-center text-xs xs:text-sm md:text-base text-gray-500 dark:text-gray-400 mb-2 font-body">
        <span>{stage_name}</span>
        <span>{matchDate} - {matchTime}</span>
      </div>

      <div className="flex xs:flex-col items-center justify-between mb-4">
        {/* Home Team */}
        <div className="flex flex-col items-center flex-1 pr-2 xs:pr-0 xs:mb-4">
          <TeamLogo teamName={homeTeam.team_name} size="md" />
          <p className={`font-semibold text-gray-800 dark:text-gray-200 mt-2 text-sm text-center font-body ${isHomeWinner ? 'text-primary-maroon' : ''}`}>
            {homeTeam.team_name}
          </p>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center xs:my-2">
          <p className={`text-xl md:text-3xl font-bold text-primary-maroon ${isDraw ? 'text-gray-600 dark:text-gray-300' : ''}`}>
            {status === 'Match Finished' ? `${home_team_score} - ${away_team_score}` : 'vs'}
          </p>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-body">{status}</span>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center flex-1 pl-2 xs:pl-0 xs:mt-4">
          <TeamLogo teamName={awayTeam.team_name} size="md" />
          <p className={`font-semibold text-gray-800 dark:text-gray-200 mt-2 text-sm text-center font-body ${isAwayWinner ? 'text-primary-maroon' : ''}`}>
            {awayTeam.team_name}
          </p>
        </div>
      </div>

      <div className="text-center text-xs md:text-sm text-gray-600 dark:text-gray-300 font-body">
        <p>{venue_name}</p>
        <p className="text-primary-teal hover:text-secondary-dark-teal mt-2">Click for match details</p>
      </div>
    </div>
  );
};

MatchCard.propTypes = {
  fixture: PropTypes.shape({
    home_team_score: PropTypes.number,
    away_team_score: PropTypes.number,
    date: PropTypes.string.isRequired,
    venue_name: PropTypes.string.isRequired,
    stage_name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  homeTeam: PropTypes.shape({
    team_name: PropTypes.string.isRequired,
  }).isRequired,
  awayTeam: PropTypes.shape({
    team_name: PropTypes.string.isRequired,
  }).isRequired,
};

export default MatchCard;
