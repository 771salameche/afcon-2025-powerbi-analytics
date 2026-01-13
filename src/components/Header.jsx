import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { useTheme } from '../contexts/ThemeContext'; // Import useTheme

const Header = ({ toggleSidebar }) => {
  const location = useLocation(); // Get current location
  const { theme, toggleTheme } = useTheme(); // Use theme context

  const getLinkClass = (path) => {
    return `block p-2 hover:bg-gray-700 rounded transition-colors duration-200 ${
      location.pathname === path ? 'bg-gray-700 text-blue-300' : 'text-white'
    }`;
  };

  return (
    <header className="sticky top-0 z-40 bg-gray-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Hamburger for mobile */}
        <button onClick={toggleSidebar} className="md:hidden p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Logo/Title */}
        <Link to="/" className="flex items-center text-xl font-bold text-white tracking-wide hover:text-blue-300 transition-colors duration-200">
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
            <Link to="/players" className="text-gray-400 cursor-not-allowed p-2">Players (Coming Soon)</Link> {/* Disabled link */}
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.325 5.825l-.707-.707M6.382 6.382l-.707-.707m12.728 0l-.707.707M6.382 17.618l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
