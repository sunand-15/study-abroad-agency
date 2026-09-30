import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('admin');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // On mount, verify session (fetch /me with current token)
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const freshAdmin = await authService.getMe();
        setAdmin(freshAdmin);
        localStorage.setItem('admin', JSON.stringify(freshAdmin));
      } catch (err) {
        // Token invalid → clear
        localStorage.removeItem('accessToken');
        localStorage.removeItem('admin');
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    const { accessToken, admin: adminData } = await authService.login(credentials);
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('admin', JSON.stringify(adminData));
    setAdmin(adminData);
    return adminData;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      // ignore
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('admin');
    setAdmin(null);
  };

  const value = {
    admin,
    isAuthenticated: !!admin,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Convenience hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};