import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RequestService from './pages/RequestService';
import ProjectDetails from './pages/ProjectDetails';
import Publications from './pages/Publications';
import SpecialistDashboard from './pages/SpecialistDashboard';
import SpecialistProjectDetails from './pages/SpecialistProjectDetails';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Specialist Route Component
const SpecialistRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== 'specialist') {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/request" element={<RequestService />} />
          
          {/* Client Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/project/:id" 
            element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            } 
          />

          {/* Specialist Routes */}
          <Route 
            path="/specialist" 
            element={
              <SpecialistRoute>
                <SpecialistDashboard />
              </SpecialistRoute>
            } 
          />
          <Route 
            path="/specialist/project/:id" 
            element={
              <SpecialistRoute>
                <SpecialistProjectDetails />
              </SpecialistRoute>
            } 
          />

        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;