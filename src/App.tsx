import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import AdminPage from './pages/AdminPage';
import VoterEligibilityMapPage from './pages/VoterEligibilityMapPage';
import PollingPlaceDetailsPage from './pages/PollingPlaceDetailsPage';
export function App() {
  // Changed to true for demo purposes so you can see the home page
  const isAuthenticated = true;
  return <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Helmet>
            <title>Votifi</title>
          </Helmet>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/search-results" element={isAuthenticated ? <SearchResultsPage /> : <Navigate to="/login" />} />
            <Route path="/polling-places" element={<Navigate to="/admin/map" />} />
            <Route path="/voter-eligibility" element={isAuthenticated ? <VoterEligibilityMapPage /> : <Navigate to="/login" />} />
            <Route path="/admin/*" element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />} />
            <Route path="/polling-place/:pollingPlaceId" element={isAuthenticated ? <PollingPlaceDetailsPage /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>;
}