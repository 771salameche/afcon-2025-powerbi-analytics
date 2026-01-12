import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black opacity-50 z-20 md:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-gray-700 text-white w-64 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-64 z-30`}>
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Navigation</h2>
          <nav className="flex flex-col space-y-2">
            <Link to="/" className="p-2 hover:bg-gray-600 rounded" onClick={toggleSidebar}>Overview</Link>
            <Link to="/teams" className="p-2 hover:bg-gray-600 rounded" onClick={toggleSidebar}>Teams</Link>
            <Link to="/venues" className="p-2 hover:bg-gray-600 rounded" onClick={toggleSidebar}>Venues</Link>
            <Link to="/players" className="p-2 hover:bg-gray-600 rounded" onClick={toggleSidebar}>Players</Link>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
