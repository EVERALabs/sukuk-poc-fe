/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://backend-sukuk.kadzu.dev/api/v1";
const API_TIMEOUT = 30000; // 30 seconds

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Transaction History Types (based on actual API response)
export interface TransactionActivity {
  type: string; // e.g., "purchase"
  address: string;
  amount: string; // Large number as string
  tx_hash: string;
  timestamp: string; // ISO string
  sukuk_address: string;
  sukuk_code: string;
  sukuk_title: string;
}

export interface TransactionHistoryResponse {
  address: string;
  total_count: number;
  activities: TransactionActivity[];
}

// Sukuk Types
export interface SukukPool {
  id: number;
  contract_address: string;
  token_id: number;
  owner_address: string;
  transaction_hash: string;
  block_number: number;
  sukuk_code: string;
  sukuk_title: string;
  sukuk_deskripsi: string;
  status: string;
  logo_url: string;
  tenor: string;
  imbal_hasil: string;
  periode_pembelian: string;
  jatuh_tempo: string;
  kuota_nasional: number;
  penerimaan_kupon: string;
  minimum_pembelian: number;
  tanggal_bayar_kupon: string;
  maksimum_pembelian: number;
  kupon_pertama: string;
  tipe_kupon: string;
  metadata_ready: boolean;
  created_at: string;
  updated_at: string;
}

// Legacy interface for backward compatibility
export interface LegacySukukPool {
  id: string;
  code: string;
  name: string;
  couponType: "Fixed Rate" | "Variable Rate";
  status: "Berlangsung" | "Mendatang" | "Berakhir";
  statusType: "ongoing" | "upcoming" | "ended";
  period: string;
  returnRate: string | null;
  progress: number | null;
  progressAmount: string | null;
  icon: string;
  iconBg: string;
  description?: string;
  minInvestment?: number;
  maxInvestment?: number;
  maturityDate?: string;
  issueDate?: string;
  totalAmount?: number;
  remainingAmount?: number;
}

export interface Portfolio {
  totalValue: number;
  totalProfit: number;
  averageReturn: number;
  holdings: PortfolioHolding[];
}

export interface PortfolioHolding {
  id: string;
  poolId: string;
  poolName: string;
  poolCode: string;
  investedAmount: number;
  currentValue: number;
  profit: number;
  returnRate: number;
  purchaseDate: string;
  maturityDate: string;
  status: "active" | "matured" | "cancelled";
}

export interface Transaction {
  id: string;
  txHash: string;
  amount: number;
  poolId: string;
  poolName: string;
  poolCode: string;
  date: string;
  type: "buy" | "sell" | "dividend" | "maturity";
  status: "pending" | "completed" | "failed" | "cancelled";
  gasFee?: number;
  blockNumber?: number;
}

export interface UserProfile {
  id: string;
  walletAddress: string;
  email?: string;
  name?: string;
  kycStatus: "pending" | "verified" | "rejected";
  totalInvested: number;
  totalProfit: number;
  joinDate: string;
  lastActive: string;
}

export interface OwnedSukuk {
  id: number;
  contract_address: string;
  token_id: number;
  owner_address: string;
  transaction_hash: string;
  block_number: number;
  sukuk_code: string;
  sukuk_title: string;
  sukuk_deskripsi: string;
  status: string;
  logo_url: string;
  tenor: string;
  imbal_hasil: string;
  periode_pembelian: string;
  jatuh_tempo: string;
  kuota_nasional: number;
  penerimaan_kupon: string;
  minimum_pembelian: number;
  tanggal_bayar_kupon: string;
  maksimum_pembelian: number;
  kupon_pertama: string;
  tipe_kupon: string;
  metadata_ready: boolean;
  created_at: string;
  updated_at: string;
  latest_activities: {
    type: string;
    address: string;
    amount: string; // Amount in wei as string
    tx_hash: string;
    timestamp: string;
    sukuk_address: string;
  }[];
  available_distributions: {
    amount: string;
    claimable: boolean;
    claimed_amount: string;
    distribution_id: number;
    payment_token: string;
    user_claimable_amount: string;
  }[];
}

export interface OwnedSukukResponse {
  address: string;
  total_count: number;
  sukuk: OwnedSukuk[];
}

// Redemption Types
export interface RedemptionRequest {
  request_id: string;
  user: string;
  sukuk_address: string;
  amount: string;
  payment_token: string;
  total_supply: string;
  request_tx_hash: string;
  request_time: string;
  request_block: number;
  status: "requested" | "approved" | "rejected";
  approval_id?: string;
  approval_tx_hash?: string;
  approval_time?: string;
  approval_block?: number;
  approved_amount?: string;
  metadata: {
    id: number;
    contract_address: string;
    sukuk_code: string;
    sukuk_title: string;
    status: string;
    imbal_hasil: string;
    tenor: string;
  };
  can_approve: boolean;
  requires_manager_auth: boolean;
}

export interface RedemptionsResponse {
  total_count: number;
  redemptions: RedemptionRequest[];
  status_counts: {
    approved: number;
    requested: number;
    rejected?: number;
  };
}

export interface SukukSnapshot {
  block_number: number;
  eligible_count: number;
  holder_count: number;
  id: string;
  snapshot_id: string;
  sukuk_address: string;
  timestamp: string;
  total_supply: string;
  tx_hash: string;
}

export interface SukukSnapshotsResponse {
  snapshots: SukukSnapshot[];
  sukuk_address: string;
  total_count: number;
}

// API Client Class
class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }
        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  }

  private handleUnauthorized(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
  }

  // Generic request method
  private async request<T>(
    config: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.request(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || error.message || "Network error"
        );
      }
      throw new Error("Network error");
    }
  }

  // Sukuk Pools API
  async getSukukPools(): Promise<ApiResponse<SukukPool[]>> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/sukuk-metadata?ready=true`
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || error.message || "Network error"
        );
      }
      throw new Error("Network error");
    }
  }

  async getSukukPool(id: string): Promise<ApiResponse<SukukPool>> {
    return this.request({
      method: "GET",
      url: `/sukuk/pools/${id}`,
    });
  }

  // Transaction History API
  async getTransactionHistory(
    address: string,
    limit?: number
  ): Promise<ApiResponse<TransactionHistoryResponse>> {
    try {
      const url = `${API_BASE_URL}/transaction-history/${address}${
        limit ? `?limit=${limit}` : ""
      }`;
      const response = await axios.get(url);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || error.message || "Network error"
        );
      }
      throw new Error("Network error");
    }
  }

  // Owned Sukuk API
  async getOwnedSukuk(
    address: string
  ): Promise<ApiResponse<OwnedSukukResponse>> {
    try {
      const url = `${API_BASE_URL}/owned-sukuk/${address}`;
      const response = await axios.get(url);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || error.message || "Network error"
        );
      }
      throw new Error("Network error");
    }
  }

  // Portfolio API
  async getPortfolio(): Promise<ApiResponse<Portfolio>> {
    return this.request({
      method: "GET",
      url: "/portfolio",
    });
  }

  async getPortfolioHoldings(): Promise<ApiResponse<PortfolioHolding[]>> {
    return this.request({
      method: "GET",
      url: "/portfolio/holdings",
    });
  }

  // Transactions API
  async getTransactions(params?: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    poolId?: string;
    search?: string;
  }): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    return this.request({
      method: "GET",
      url: "/transactions",
      params,
    });
  }

  async getTransaction(id: string): Promise<ApiResponse<Transaction>> {
    return this.request({
      method: "GET",
      url: `/transactions/${id}`,
    });
  }

  // Investment API
  async investInPool(
    poolId: string,
    amount: number
  ): Promise<ApiResponse<{ txHash: string }>> {
    return this.request({
      method: "POST",
      url: "/invest",
      data: {
        poolId,
        amount,
      },
    });
  }

  async withdrawFromPool(
    poolId: string,
    amount: number
  ): Promise<ApiResponse<{ txHash: string }>> {
    return this.request({
      method: "POST",
      url: "/withdraw",
      data: {
        poolId,
        amount,
      },
    });
  }

  // User API
  async getUserProfile(): Promise<ApiResponse<UserProfile>> {
    return this.request({
      method: "GET",
      url: "/user/profile",
    });
  }

  async updateUserProfile(
    data: Partial<UserProfile>
  ): Promise<ApiResponse<UserProfile>> {
    return this.request({
      method: "PUT",
      url: "/user/profile",
      data,
    });
  }

  // Auth API
  async connectWallet(
    walletAddress: string,
    signature: string
  ): Promise<ApiResponse<{ token: string }>> {
    return this.request({
      method: "POST",
      url: "/auth/connect-wallet",
      data: {
        walletAddress,
        signature,
      },
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.request({
      method: "POST",
      url: "/auth/logout",
    });
  }

  // Analytics API
  // async getInvestmentHistory(params?: {
  //   period?: 'daily' | 'weekly' | 'monthly';
  //   startDate?: string;
  //   endDate?: string;
  // }): Promise<ApiResponse<InvestmentHistory[]>> {
  //   return this.request({
  //     method: 'GET',
  //     url: '/analytics/investment-history',
  //     params,
  //   });
  // }

  async getSukukDistribution(): Promise<ApiResponse<any>> {
    return this.request({
      method: "GET",
      url: "/analytics/sukuk-distribution",
    });
  }

  async getSukukSnapshots(sukukAddress: string): Promise<ApiResponse<SukukSnapshotsResponse>> {
    return this.request({
      method: "GET",
      url: `/sukuk/${sukukAddress}/snapshots`,
    });
  }

  // Redemption API
  async getRedemptions(): Promise<ApiResponse<RedemptionsResponse>> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/redemptions?limit=50&offset=0`
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || error.message || "Network error"
        );
      }
      throw new Error("Network error");
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
