import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
export function App() {
  // Changed to true for demo purposes so you can see the home page
  const isAuthenticated = true;
  return <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/search-results" element={isAuthenticated ? <SearchResultsPage /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>;
}