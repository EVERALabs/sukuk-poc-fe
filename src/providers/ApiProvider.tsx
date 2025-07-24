"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '@/libs/api';

interface ApiContextType {
  isAuthenticated: boolean;
  userProfile: any | null;
  globalError: string | null;
  setGlobalError: (error: string | null) => void;
  clearGlobalError: () => void;
  refreshUserProfile: () => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
  children: ReactNode;
}

export function ApiProvider({ children }: ApiProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        setIsAuthenticated(!!token);
      }
    };

    checkAuth();
  }, []);

  // Fetch user profile when authenticated
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated) {
        try {
          const response = await apiClient.getUserProfile();
          setUserProfile(response.data);
        } catch (error: any) {
          console.error('Failed to fetch user profile:', error);
          // If profile fetch fails, user might not be properly authenticated
          if (error.message?.includes('401')) {
            setIsAuthenticated(false);
            if (typeof window !== 'undefined') {
              localStorage.removeItem('auth_token');
            }
          }
        }
      } else {
        setUserProfile(null);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated]);

  const clearGlobalError = () => {
    setGlobalError(null);
  };

  const refreshUserProfile = async () => {
    if (isAuthenticated) {
      try {
        const response = await apiClient.getUserProfile();
        setUserProfile(response.data);
      } catch (error: any) {
        console.error('Failed to refresh user profile:', error);
      }
    }
  };

  const value: ApiContextType = {
    isAuthenticated,
    userProfile,
    globalError,
    setGlobalError,
    clearGlobalError,
    refreshUserProfile,
  };

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApiContext() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApiContext must be used within an ApiProvider');
  }
  return context;
} 