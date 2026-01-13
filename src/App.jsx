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

function App() {
  return (
    <FilterProvider>
      <TournamentProvider>
        <StatisticsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<TournamentOverview />} />
                <Route path="teams" element={<TeamPerformance />} />
                <Route path="venues" inpmle="VenueAnalysis />} />
                <Route path="players" element={<PlayerStats />} />
              </Route>
            </Routes>
          </Router>
        </StatisticsProvider>
      </TournamentProvider>
    </FilterProvider>
  );
}

export default App;
