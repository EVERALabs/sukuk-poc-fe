/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import { apiClient, ApiResponse } from '@/libs/api';

// Generic API hook
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}

// Sukuk Pools hooks
export function useSukukPools() {
  return useApi(() => apiClient.getSukukPools(), []);
}

export function useSukukPool(id: string) {
  return useApi(() => apiClient.getSukukPool(id), [id]);
}

// Portfolio hooks
export function usePortfolio() {
  return useApi(() => apiClient.getPortfolio(), []);
}

export function usePortfolioHoldings() {
  return useApi(() => apiClient.getPortfolioHoldings(), []);
}

// Transactions hooks
export function useTransactions(params?: {
  page?: number;
  limit?: number;
  type?: string;
  status?: string;
  poolId?: string;
  search?: string;
}) {
  return useApi(() => apiClient.getTransactions(params), [params]);
}

export function useTransaction(id: string) {
  return useApi(() => apiClient.getTransaction(id), [id]);
}

// Transaction History hooks
export function useTransactionHistory(address: string, limit?: number) {
  return useApi(() => apiClient.getTransactionHistory(address, limit), [address, limit]);
}

// Owned Sukuk hooks
export function useOwnedSukuk(address: string) {
  return useApi(() => apiClient.getOwnedSukuk(address), [address]);
}

// User Profile hooks
export function useUserProfile() {
  return useApi(() => apiClient.getUserProfile(), []);
}

// Investment actions
export function useInvestment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const invest = async (poolId: string, amount: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.investInPool(poolId, amount);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Gagal melakukan investasi');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async (poolId: string, amount: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.withdrawFromPool(poolId, amount);
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Gagal melakukan penarikan');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { invest, withdraw, loading, error };
}

// Auth hooks
export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async (walletAddress: string, signature: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.connectWallet(walletAddress, signature);
      
      // Store token
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
      }
      
      return response.data;
    } catch (err: any) {
      setError(err.message || 'Gagal menghubungkan dompet');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await apiClient.logout();
      
      // Remove token
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
    } catch (err: any) {
      setError(err.message || 'Gagal logout');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('auth_token');
    }
    return false;
  };

  return { connectWallet, logout, isAuthenticated, loading, error };
}

// Analytics hooks
// export function useInvestmentHistory(params?: {
//   period?: 'daily' | 'weekly' | 'monthly';
//   startDate?: string;
//   endDate?: string;
// }) {
//   return useApi(() => apiClient.getInvestmentHistory(params), [params]);
// }

export function useSukukDistribution() {
  return useApi(() => apiClient.getSukukDistribution(), []);
}

// Redemption hooks
export function useRedemptions() {
  return useApi(() => apiClient.getRedemptions(), []);
}

// Cache management
export function useCache() {
  const clearCache = useCallback(() => {
    // Clear any cached data if needed
    if (typeof window !== 'undefined') {
      // You can implement cache clearing logic here
      console.log('Cache cleared');
    }
  }, []);

  return { clearCache };
} 