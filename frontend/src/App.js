import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Home from './pages/Home';
import ClinicInfo from './pages/ClinicInfo';
import Login from './components/auth/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
// import Navbar from './components/common/Navbar';

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clinic-info" element={<ClinicInfo />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/patient/dashboard"
            element={
              <PrivateRoute roles={['patient']}>
                <Dashboard role="patient" />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor/dashboard"
            element={
              <PrivateRoute roles={['doctor']}>
                <Dashboard role="doctor" />
              </PrivateRoute>
            }
          />
          <Route
            path="/staff/dashboard"
            element={
              <PrivateRoute roles={['staff']}>
                <Dashboard role="staff" />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;