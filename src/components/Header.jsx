import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="md:hidden mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold">AFCON 2025 Dashboard</h1>
      </div>
      <nav className="hidden md:flex space-x-4">
        <Link to="/" className="hover:text-gray-300">Overview</Link>
        <Link to="/teams" className="hover:text-gray-300">Teams</Link>
        <Link to="/venues" className="hover:text-gray-300">Venues</Link>
        <Link to="/players" className="hover:text-gray-300">Players</Link>
      </nav>
    </header>
  );
};

export default Header;
