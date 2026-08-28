import React, { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('portfolio_admin_token'));

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('portfolio_admin_token', res.data.token);
    setToken(res.data.token);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('portfolio_admin_token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
