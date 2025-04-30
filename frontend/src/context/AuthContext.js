import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const userData = await authLogin(username, password);
      setAuth(userData);
      localStorage.setItem('auth', JSON.stringify(userData));
      navigate('/dashboard');
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);