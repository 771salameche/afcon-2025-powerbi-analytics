import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useFilters } from '../contexts/FilterContext';
import Button from './common/Button';

const Header = ({ toggleSidebar }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { selectedTeams, dateRange, selectedStage, selectedVenue, searchQuery } = useFilters();

  const getLinkClass = (path) => {
    return `block p-2 hover:bg-gray-700 rounded transition-colors duration-200 ${
      location.pathname === path ? 'bg-gray-700 text-secondary-gold' : 'text-secondary-white'
    }`;
  };

  const handleShare = async () => {
    const params = new URLSearchParams();
    if (selectedTeams.length > 0) params.append('teams', selectedTeams.join(','));
    if (dateRange.start) params.append('startDate', dateRange.start);
    if (dateRange.end) params.append('endDate', dateRange.end);
    if (selectedStage) params.append('stage', selectedStage);
    if (selectedVenue) params.append('venue', selectedVenue);
    if (searchQuery) params.append('search', searchQuery);

    const shareUrl = `${window.location.origin}${location.pathname}?${params.toString()}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy share link:', err);
      alert('Failed to copy link. Please copy manually: ' + shareUrl);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-gray-800 text-secondary-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Hamburger for mobile */}
        <button onClick={toggleSidebar} className="md:hidden p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-teal transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Logo/Title */}
        <Link to="/" className="flex items-center text-xl font-bold text-secondary-white tracking-wide hover:text-primary-teal transition-colors duration-200">
          <img
            src="/logos/tournaments_africa-cup-of-nations-2025.football-logos.cc.svg"
            alt="AFCON 2025 Logo"
            className="h-10 w-auto object-contain mr-2"
          />
          AFCON 2025
        </Link>

        <div className="flex items-center space-x-4">
          {/* Navigation for desktop */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className={getLinkClass('/')}>Overview</Link>
            <Link to="/teams" className={getLinkClass('/teams')}>Teams</Link>
            <Link to="/venues" className={getLinkClass('/venues')}>Venues</Link>
            <Link to="/players" className="text-gray-400 cursor-not-allowed p-2">Players (Coming Soon)</Link>
          </nav>

          {/* Share Button */}
          <Button onClick={handleShare} className="hidden md:block">
            Share
          </Button>

          {/* Print Button */}
          <Button onClick={() => window.print()} className="hidden md:block">
            Print
          </Button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-teal transition-colors duration-200"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.325 5.825l-.707-.707M6.382 6.382l-.707-.707m12.728 0l-.707.707M6.382 17.618l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Header;
