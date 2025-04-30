import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import AppHeader from './components/common/AppHeader';
import AppFooter from './components/common/AppFooter';
import Home from './pages/Home';
import ClinicInfo from './pages/ClinicInfo';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppHeader />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clinic-info" element={<ClinicInfo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <AppFooter />
      </AuthProvider>
    </Router>
  );
}

export default App;