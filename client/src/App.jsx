import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Home from './pages/Home';
import Login from './dashboard/Login';
import Dashboard from './dashboard/Dashboard';
import ProtectedRoute from './dashboard/ProtectedRoute';
import { ContentProvider } from './context/ContentContext';

export default function App() {
  return (
    <MotionConfig reducedMotion="never">
      <Routes>
        <Route
          path="/"
          element={
            <ContentProvider>
              <Home />
            </ContentProvider>
          }
        />
        <Route path="/dashboard/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </MotionConfig>
  );
}
