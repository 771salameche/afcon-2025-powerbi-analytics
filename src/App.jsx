import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { TournamentProvider } from './contexts/TournamentContext';
import { FilterProvider } from './contexts/FilterContext';
import { StatisticsProvider } from './contexts/StatisticsContext';
import { ThemeProvider } from './contexts/ThemeContext'; // Import ThemeProvider
import ErrorBoundary from './components/common/ErrorBoundary';
import Loader from './components/common/Loader';

const TournamentOverview = lazy(() => import('./pages/TournamentOverview'));
const TeamPerformance = lazy(() => import('./pages/TeamPerformance'));
const VenueAnalysis = lazy(() => import('./pages/VenueAnalysis'));
const PlayerStats = lazy(() => import('./pages/PlayerStats'));

function App() {
  return (
    <ThemeProvider>
      <FilterProvider>
        <TournamentProvider>
          <StatisticsProvider>
            <ErrorBoundary>
              <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Suspense fallback={<Loader />}>
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route index element={<TournamentOverview />} />
                      <Route path="teams" element={<TeamPerformance />} />
                      <Route path="venues" element={<VenueAnalysis />} />
                      <Route path="players" element={<PlayerStats />} />
                    </Route>
                  </Routes>
                </Suspense>
              </Router>
            </ErrorBoundary>
          </StatisticsProvider>
        </TournamentProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}

export default App;
