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
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <FilterProvider>
      <TournamentProvider>
        <StatisticsProvider>
          <ErrorBoundary>
            <Router>
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
  );
}

export default App;
