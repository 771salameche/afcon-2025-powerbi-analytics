import React from 'react';
import PropTypes from 'prop-types';

const MatchResultCard = ({ match }) => {
  const {
    home_team_name,
    away_team_name,
    home_team_score,
    away_team_score,
    date,
    venue_name,
    stage_name,
  } = match;

  const matchDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const matchTime = new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const isHomeWinner = home_team_score > away_team_score;
  const isAwayWinner = away_team_score > home_team_score;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{matchDate} {matchTime}</span>
        <span className="text-xs md:text-sm text-primary-teal font-medium">{stage_name}</span>
      </div>
      <div className="flex items-center justify-center mb-3">
        <p className={`text-base md:text-lg font-semibold ${isHomeWinner ? 'text-secondary-gold' : 'text-gray-800 dark:text-gray-100'}`}>
          {home_team_name}
        </p>
        <span className="mx-2 md:mx-3 text-lg md:text-xl font-bold text-gray-900 dark:text-white">
          {home_team_score} - {away_team_score}
        </span>
        <p className={`text-base md:text-lg font-semibold ${isAwayWinner ? 'text-secondary-gold' : 'text-gray-800 dark:text-gray-100'}`}>
          {away_team_name}
        </p>
      </div>
      <div className="text-center text-xs md:text-sm text-gray-600 dark:text-gray-300">
        <p>{venue_name}</p>
        <p className="text-primary-teal hover:text-secondary-dark-teal mt-2">Click for match details</p>
      </div>
    </div>
  );
};

MatchResultCard.propTypes = {
  match: PropTypes.shape({
    home_team_name: PropTypes.string.isRequired,
    away_team_name: PropTypes.string.isRequired,
    home_team_score: PropTypes.number.isRequired,
    away_team_score: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    venue_name: PropTypes.string.isRequired,
    stage_name: PropTypes.string.isRequired,
  }).isRequired,
};

export default MatchResultCard;
