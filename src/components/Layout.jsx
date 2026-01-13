import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // Import useLocation
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useTournament } from '../contexts/TournamentContext';
import Loader from './common/Loader';

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { loading, error, loadingMessage } = useTournament(); // Get loadingMessage
  const location = useLocation(); // Get current location for AnimatePresence key

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return <Loader message={loadingMessage} />; // Pass loadingMessage to Loader
  }

  if (error) {
    // This is a simple error display. ErrorBoundary will catch more complex cases.
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error loading data: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 lg:p-6 bg-gray-100 dark:bg-gray-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname} // Unique key for each route
              initial={{ opacity: 0, y: 20 }} // Initial state (fade in from bottom)
              animate={{ opacity: 1, y: 0 }}   // Animate to (fully visible, no slide)
              exit={{ opacity: 0, y: -20 }}   // Exit state (fade out to top)
              transition={{ duration: 0.3, ease: 'easeInOut' }}   // Animation duration
              className="w-full h-full" // Ensure div takes full space
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
