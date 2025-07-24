/* eslint-disable @typescript-eslint/no-explicit-any */
import { SukukPool, Portfolio, Transaction, UserProfile } from './api';

// Mock Sukuk Pools Data - Updated to match new API structure
export const mockSukukPools: SukukPool[] = [
  {
    id: 55,
    contract_address: "0x57eFfEac105d03782b139B23a906437E3D40D858",
    token_id: 0,
    owner_address: "",
    transaction_hash: "0x5d79c39d8eef4b265bd1f8c476a53412d6333df0c7f4758053ab939b7a546c75",
    block_number: 28766343,
    sukuk_code: "SWDI",
    sukuk_title: "Sukuk Wayang Digital Indonesia",
    sukuk_deskripsi: "Sukuk untuk digitalisasi seni wayang tradisional Indonesia dan pengembangan platform wayang digital modern.",
    status: "berlangsung",
    logo_url: "",
    tenor: "2 Tahun",
    imbal_hasil: "9.2",
    periode_pembelian: "1 Juli - 31 Agustus 2025",
    jatuh_tempo: "2027-08-15T00:00:00Z",
    kuota_nasional: 180000000,
    penerimaan_kupon: "Kuartal",
    minimum_pembelian: 1500000,
    tanggal_bayar_kupon: "10",
    maksimum_pembelian: 90000000,
    kupon_pertama: "2025-10-10T00:00:00Z",
    tipe_kupon: "Ijarah",
    metadata_ready: true,
    created_at: "2025-07-23T20:02:57.76847Z",
    updated_at: "2025-07-23T20:28:24.461023Z"
  },
  {
    id: 56,
    contract_address: "0x1234567890abcdef1234567890abcdef12345678",
    token_id: 1,
    owner_address: "",
    transaction_hash: "0xabcdef1234567890abcdef1234567890abcdef12",
    block_number: 28766344,
    sukuk_code: "SR022-T5",
    sukuk_title: "Sukuk Ritel Seri SR022-T5",
    sukuk_deskripsi: "Sukuk Ritel Seri SR022-T5 dengan imbal hasil tetap 6.55% per tahun",
    status: "berlangsung",
    logo_url: "",
    tenor: "5 Tahun",
    imbal_hasil: "6.55",
    periode_pembelian: "16 Mei - 18 Jun 2025",
    jatuh_tempo: "2030-06-10T00:00:00Z",
    kuota_nasional: 7000000000000,
    penerimaan_kupon: "Bulanan",
    minimum_pembelian: 1000000,
    tanggal_bayar_kupon: "10",
    maksimum_pembelian: 10000000000,
    kupon_pertama: "2025-08-11T00:00:00Z",
    tipe_kupon: "Fixed Rate",
    metadata_ready: true,
    created_at: "2025-05-16T00:00:00Z",
    updated_at: "2025-07-23T20:28:24.461023Z"
  },
  {
    id: 57,
    contract_address: "0x2345678901bcdef2345678901bcdef2345678901",
    token_id: 2,
    owner_address: "",
    transaction_hash: "0xbcdef2345678901bcdef2345678901bcdef23456",
    block_number: 28766345,
    sukuk_code: "SBR014-T2",
    sukuk_title: "Savings Bond Ritel Seri SBR014-T2",
    sukuk_deskripsi: "Savings Bond Ritel Seri SBR014-T2 dengan imbal hasil 6.25% per tahun",
    status: "berlangsung",
    logo_url: "",
    tenor: "3 Bulan",
    imbal_hasil: "6.25",
    periode_pembelian: "14 Jul - 07 Agt 2025",
    jatuh_tempo: "2025-08-07T00:00:00Z",
    kuota_nasional: 10000000000000,
    penerimaan_kupon: "Bulanan",
    minimum_pembelian: 1000000,
    tanggal_bayar_kupon: "10",
    maksimum_pembelian: 300000000,
    kupon_pertama: "2025-08-10T00:00:00Z",
    tipe_kupon: "Fixed Rate",
    metadata_ready: true,
    created_at: "2025-07-14T00:00:00Z",
    updated_at: "2025-07-23T20:28:24.461023Z"
  }
];

// Mock Portfolio Data
export const mockPortfolio: Portfolio = {
  totalValue: 125000000,
  totalProfit: 8750000,
  averageReturn: 7.0,
  holdings: [
    {
      id: "holding-1",
      poolId: "sr022-t5",
      poolName: "Sukuk Ritel",
      poolCode: "SR022-T5",
      investedAmount: 50000000,
      currentValue: 53500000,
      profit: 3500000,
      returnRate: 7.0,
      purchaseDate: "2025-01-15",
      maturityDate: "2025-06-18",
      status: "active",
    },
    {
      id: "holding-2",
      poolId: "sbr014-t2",
      poolName: "Savings Bond Ritel",
      poolCode: "SBR014-T2",
      investedAmount: 30000000,
      currentValue: 31875000,
      profit: 1875000,
      returnRate: 6.25,
      purchaseDate: "2025-02-01",
      maturityDate: "2025-08-07",
      status: "active",
    },
    {
      id: "holding-3",
      poolId: "trade-finance-pool",
      poolName: "Trade Finance Pool",
      poolCode: "TFP001",
      investedAmount: 25000000,
      currentValue: 27125000,
      profit: 2125000,
      returnRate: 8.5,
      purchaseDate: "2025-03-20",
      maturityDate: "2025-09-15",
      status: "active",
    },
    {
      id: "holding-4",
      poolId: "corporate-sukuk",
      poolName: "Corporate Sukuk Pool",
      poolCode: "CRP004",
      investedAmount: 20000000,
      currentValue: 21750000,
      profit: 1750000,
      returnRate: 8.75,
      purchaseDate: "2025-04-10",
      maturityDate: "2025-11-10",
      status: "active",
    }
  ]
};

// Mock Transactions Data
export const mockTransactions: Transaction[] = [
  {
    id: "tx-001",
    txHash: "0x1234567890abcdef1234567890abcdef12345678",
    amount: 50000000,
    poolId: "sr022-t5",
    poolName: "Sukuk Ritel",
    poolCode: "SR022-T5",
    date: "2025-01-15T10:30:00Z",
    type: "buy",
    status: "completed",
    gasFee: 0.001,
    blockNumber: 12345678,
  },
  {
    id: "tx-002",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef12",
    amount: 30000000,
    poolId: "sbr014-t2",
    poolName: "Savings Bond Ritel",
    poolCode: "SBR014-T2",
    date: "2025-02-01T14:15:00Z",
    type: "buy",
    status: "completed",
    gasFee: 0.001,
    blockNumber: 12345679,
  },
  {
    id: "tx-003",
    txHash: "0x567890abcdef1234567890abcdef1234567890ab",
    amount: 25000000,
    poolId: "trade-finance-pool",
    poolName: "Trade Finance Pool",
    poolCode: "TFP001",
    date: "2025-03-20T09:45:00Z",
    type: "buy",
    status: "completed",
    gasFee: 0.001,
    blockNumber: 12345680,
  },
  {
    id: "tx-004",
    txHash: "0xdef1234567890abcdef1234567890abcdef12345",
    amount: 20000000,
    poolId: "corporate-sukuk",
    poolName: "Corporate Sukuk Pool",
    poolCode: "CRP004",
    date: "2025-04-10T16:20:00Z",
    type: "buy",
    status: "completed",
    gasFee: 0.001,
    blockNumber: 12345681,
  },
  {
    id: "tx-005",
    txHash: "0x890abcdef1234567890abcdef1234567890abcdef",
    amount: 3500000,
    poolId: "sr022-t5",
    poolName: "Sukuk Ritel",
    poolCode: "SR022-T5",
    date: "2025-05-15T11:00:00Z",
    type: "dividend",
    status: "completed",
    gasFee: 0.0005,
    blockNumber: 12345682,
  },
  {
    id: "tx-006",
    txHash: "0xef1234567890abcdef1234567890abcdef1234567",
    amount: 1875000,
    poolId: "sbr014-t2",
    poolName: "Savings Bond Ritel",
    poolCode: "SBR014-T2",
    date: "2025-06-01T13:30:00Z",
    type: "dividend",
    status: "completed",
    gasFee: 0.0005,
    blockNumber: 12345683,
  }
];

// Mock User Profile Data
export const mockUserProfile: UserProfile = {
  id: "user-001",
  walletAddress: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
  email: "user@example.com",
  name: "Ahmad Rahman",
  kycStatus: "verified",
  totalInvested: 125000000,
  totalProfit: 8750000,
  joinDate: "2025-01-01T00:00:00Z",
  lastActive: "2025-05-15T10:30:00Z",
};

// Mock API responses
export const createMockApiResponse = <T>(data: T) => ({
  success: true,
  data,
  message: "Success",
});

export const createMockErrorResponse = (message: string) => ({
  success: false,
  data: null,
  error: message,
});

// Mock API delays for realistic testing
export const mockApiDelay = (ms: number = 1000) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions that simulate real API calls
export const mockApi = {
  async getSukukPools() {
    await mockApiDelay(800);
    return createMockApiResponse(mockSukukPools);
  },

  async getSukukPool(id: string) {
    await mockApiDelay(500);
    const pool = mockSukukPools.find(p => p.id.toString() === id);
    if (!pool) {
      throw new Error("Pool tidak ditemukan");
    }
    return createMockApiResponse(pool);
  },

  async getPortfolio() {
    await mockApiDelay(1000);
    return createMockApiResponse(mockPortfolio);
  },

  async getPortfolioHoldings() {
    await mockApiDelay(800);
    return createMockApiResponse(mockPortfolio.holdings);
  },

  async getTransactions(params?: any) {
    await mockApiDelay(600);
    let filteredTransactions = [...mockTransactions];
    
    if (params?.search) {
      filteredTransactions = filteredTransactions.filter(tx => 
        tx.poolName.toLowerCase().includes(params.search.toLowerCase()) ||
        tx.txHash.toLowerCase().includes(params.search.toLowerCase())
      );
    }
    
    if (params?.type) {
      filteredTransactions = filteredTransactions.filter(tx => 
        tx.type === params.type
      );
    }
    
    if (params?.status) {
      filteredTransactions = filteredTransactions.filter(tx => 
        tx.status === params.status
      );
    }
    
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredTransactions.slice(startIndex, endIndex);
    
    return createMockApiResponse({
      data: paginatedData,
      pagination: {
        page,
        limit,
        total: filteredTransactions.length,
        totalPages: Math.ceil(filteredTransactions.length / limit),
      },
    });
  },

  async getUserProfile() {
    await mockApiDelay(500);
    return createMockApiResponse(mockUserProfile);
  },

  async investInPool(poolId: string, amount: number) {
    await mockApiDelay(2000);
    return createMockApiResponse({
      txHash: `0x${Math.random().toString(16).substr(2, 40)}`,
    });
  },

  async withdrawFromPool(poolId: string, amount: number) {
    await mockApiDelay(2000);
    return createMockApiResponse({
      txHash: `0x${Math.random().toString(16).substr(2, 40)}`,
    });
  },
}; 