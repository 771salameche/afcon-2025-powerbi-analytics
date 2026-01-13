import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TournamentOverview from './pages/TournamentOverview';
import TeamPerformance from './pages/TeamPerformance';
import VenueAnalysis from './pages/VenueAnalysis';
import PlayerStats from './pages/PlayerStats';
import { TournamentProvider } from './contexts/TournamentContext';
import { FilterProvider } from './contexts/FilterContext';
import { StatisticsProvider } from './contexts/StatisticsContext';
import { ThemeProvider } from './contexts/ThemeContext'; // Import ThemeProvider
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ThemeProvider>
      <FilterProvider>
        <TournamentProvider>
          <StatisticsProvider>
            <ErrorBoundary>
              <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<TournamentOverview />} />
                    <Route path="teams" element={<TeamPerformance />} />
                    <Route path="venues" element={<VenueAnalysis />} />
                    <Route path="players" element={<PlayerStats />} />
                  </Route>
                </Routes>
              </Router>
            </ErrorBoundary>
          </StatisticsProvider>
        </TournamentProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}

export default App;
