import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AppHeader = () => {
  const { auth, logout } = useAuth();

  return (
    <header className="app-header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/clinic-info">Clinic Info</Link>
        {auth ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default AppHeader;