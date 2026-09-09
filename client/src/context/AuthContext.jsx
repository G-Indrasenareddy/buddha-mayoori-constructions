import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => sessionStorage.getItem('bmc_admin_token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('bmc_admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await apiClient.get('/auth/me');
        if (response.data && response.data.success) {
          setUser(response.data.user);
          sessionStorage.setItem('bmc_admin_user', JSON.stringify(response.data.user));
        }
      } catch (err) {
        console.warn('Session verification failed:', err.message);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      if (response.data && response.data.success) {
        const { token: newToken, user: userData } = response.data;
        setToken(newToken);
        setUser(userData);
        sessionStorage.setItem('bmc_admin_token', newToken);
        sessionStorage.setItem('bmc_admin_user', JSON.stringify(userData));
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (err) {
      const errorMsg = err.response?.data?.error?.message || err.message || 'Authentication failed';
      return { success: false, error: errorMsg };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('bmc_admin_token');
    sessionStorage.removeItem('bmc_admin_user');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
