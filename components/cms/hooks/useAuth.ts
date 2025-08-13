// components/cms/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { User, ApiResponse, AuthResponse, JWTPayload } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('cms_token');
    const savedUser = localStorage.getItem('cms_user');
    
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('cms_token');
        localStorage.removeItem('cms_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data: AuthResponse = await response.json();
        localStorage.setItem('cms_token', data.token);
        localStorage.setItem('cms_user', JSON.stringify(data.user));
        setUser(data.user);
        setIsLoggedIn(true);
        return { success: true, data };
      } else {
        const errorData = await response.json();
        return { success: false, error: errorData.error || 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('cms_token');
    localStorage.removeItem('cms_user');
    setUser(null);
    setIsLoggedIn(false);
  };

  // Fixed: Return Record<string, string> with proper typing
  const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('cms_token');
    if (token) {
      return { 'Authorization': `Bearer ${token}` };
    }
    return {}; // Return empty object instead of object with undefined
  };

  // Helper function to check if user has permission
  const hasPermission = (requiredRole: 'ADMIN' | 'EDITOR' | 'AUTHOR'): boolean => {
    if (!user) return false;
    
    const roleHierarchy = { 'ADMIN': 3, 'EDITOR': 2, 'AUTHOR': 1 };
    const userLevel = roleHierarchy[user.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;
    
    return userLevel >= requiredLevel;
  };

  // Helper function to get current token
  const getToken = (): string | null => {
    return localStorage.getItem('cms_token');
  };

  // Helper function to verify token is still valid
  const isTokenValid = (): boolean => {
    const token = getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])) as JWTPayload;
      const currentTime = Date.now() / 1000;
      return payload.exp ? payload.exp > currentTime : true;
    } catch (error) {
      return false;
    }
  };

  return {
    user,
    isLoading,
    isLoggedIn,
    login,
    logout,
    getAuthHeaders,
    hasPermission,
    getToken,
    isTokenValid
  };
};