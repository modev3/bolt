import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AnalyzePage from './pages/AnalyzePage';
import SavedTopics from './pages/SavedTopics';
import LandingPage from './pages/LandingPage';
import { useAuthStore } from './stores/authStore';
import { supabase } from './lib/supabase';

function App() {
  const { setUser, user } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="w-full">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />

            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analyze" 
              element={
                <ProtectedRoute>
                  <AnalyzePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/saved" 
              element={
                <ProtectedRoute>
                  <SavedTopics />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;