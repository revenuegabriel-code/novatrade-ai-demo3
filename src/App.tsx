import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { LanguageProvider } from './LanguageContext';
import { ChatProvider } from './ChatContext';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { SettingsPage } from './components/SettingsPage';
import { TradingPage } from './components/TradingPage';
import { PortfolioPage } from './components/PortfolioPage';
import { Pricing } from './components/Pricing';
import { LandingPage } from './components/LandingPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen bg-charcoal-900 flex items-center justify-center text-neon-cyan">Loading...</div>;
  if (!user) return <Navigate to="/auth" />;
  
  return <>{children}</>;
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ChatProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/trading" element={
                <ProtectedRoute>
                  <TradingPage />
                </ProtectedRoute>
              } />
              <Route path="/portfolio" element={
                <ProtectedRoute>
                  <PortfolioPage />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </ChatProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
