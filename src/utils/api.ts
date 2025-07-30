/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatUnits } from 'viem';

// Currency formatting utilities
export function formatCurrency(amount: number, currency: 'IDR' | 'USD' = 'IDR'): string {
  if (currency === 'IDR') {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals).replace('.', ',')}%`;
}

// Date formatting utilities
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}

export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Baru saja';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} menit yang lalu`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} jam yang lalu`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} hari yang lalu`;
  } else {
    return formatDate(dateObj);
  }
}

// Validation utilities
export function validateAmount(amount: string): { isValid: boolean; error?: string } {
  const numAmount = parseFloat(amount);
  
  if (isNaN(numAmount)) {
    return { isValid: false, error: 'Jumlah harus berupa angka' };
  }
  
  if (numAmount <= 0) {
    return { isValid: false, error: 'Jumlah harus lebih dari 0' };
  }
  
  if (numAmount < 10000) {
    return { isValid: false, error: 'Jumlah minimum investasi adalah Rp 10.000' };
  }
  
  return { isValid: true };
}

export function validateWalletAddress(address: string): { isValid: boolean; error?: string } {
  if (!address) {
    return { isValid: false, error: 'Alamat dompet tidak boleh kosong' };
  }
  
  // Basic Ethereum address validation
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  if (!ethAddressRegex.test(address)) {
    return { isValid: false, error: 'Format alamat dompet tidak valid' };
  }
  
  return { isValid: true };
}

// Error handling utilities
export function getErrorMessage(error: any): string {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error?.response?.status) {
    switch (error.response.status) {
      case 400:
        return 'Permintaan tidak valid';
      case 401:
        return 'Sesi Anda telah berakhir, silakan login kembali';
      case 403:
        return 'Anda tidak memiliki izin untuk melakukan aksi ini';
      case 404:
        return 'Data tidak ditemukan';
      case 429:
        return 'Terlalu banyak permintaan, silakan coba lagi nanti';
      case 500:
        return 'Terjadi kesalahan pada server';
      default:
        return 'Terjadi kesalahan yang tidak diketahui';
    }
  }
  
  return 'Terjadi kesalahan jaringan';
}

// Status utilities
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'ongoing':
    case 'berlangsung':
    case 'active':
    case 'completed':
      return 'text-green-600 bg-green-100 border-green-200';
    case 'upcoming':
    case 'mendatang':
    case 'pending':
      return 'text-blue-600 bg-blue-100 border-blue-200';
    case 'ended':
    case 'berakhir':
    case 'matured':
      return 'text-gray-600 bg-gray-100 border-gray-200';
    case 'failed':
    case 'cancelled':
      return 'text-red-600 bg-red-100 border-red-200';
    default:
      return 'text-gray-600 bg-gray-100 border-gray-200';
  }
}

export function getStatusText(status: string): string {
  switch (status.toLowerCase()) {
    case 'ongoing':
      return 'Berlangsung';
    case 'upcoming':
      return 'Mendatang';
    case 'ended':
      return 'Berakhir';
    case 'active':
      return 'Aktif';
    case 'matured':
      return 'Jatuh Tempo';
    case 'pending':
      return 'Menunggu';
    case 'completed':
      return 'Selesai';
    case 'failed':
      return 'Gagal';
    case 'cancelled':
      return 'Dibatalkan';
    default:
      return status;
  }
}

// Transaction type utilities
export function getTransactionTypeText(type: string): string {
  switch (type.toLowerCase()) {
    case 'buy':
      return 'Beli';
    case 'sell':
      return 'Jual';
    case 'dividend':
      return 'Dividen';
    case 'maturity':
      return 'Jatuh Tempo';
    default:
      return type;
  }
}

// Progress utilities
export function getProgressColor(progress: number): string {
  if (progress >= 80) {
    return 'bg-green-500';
  } else if (progress >= 60) {
    return 'bg-yellow-500';
  } else if (progress >= 40) {
    return 'bg-orange-500';
  } else {
    return 'bg-red-500';
  }
}

// Search utilities
export function searchInArray<T>(
  array: T[],
  searchTerm: string,
  searchFields: (keyof T)[]
): T[] {
  if (!searchTerm.trim()) {
    return array;
  }
  
  const term = searchTerm.toLowerCase();
  
  return array.filter(item => {
    return searchFields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(term);
      }
      if (typeof value === 'number') {
        return value.toString().includes(term);
      }
      return false;
    });
  });
}

// Pagination utilities
export function getPaginationInfo(
  currentPage: number,
  totalPages: number,
  totalItems: number,
  itemsPerPage: number
) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  
  return {
    startItem,
    endItem,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
} 

// Portfolio calculation helpers
export function calculateSukukBalance(sukuk: any): number {
  if (!sukuk.latest_activities || sukuk.latest_activities.length === 0) {
    return 0;
  }
  
  // Filter activities by current user address
  const userAddress = sukuk.latest_activities.find((activity: any) => activity.address)?.address;
  const userActivities = sukuk.latest_activities.filter((activity: any) => 
    activity.address === userAddress
  );
  
  let totalBalance = 0;
  
  for (const activity of userActivities) {
    const amount = parseFloat(activity.amount) / 100; // Convert from 2 decimal format (10000 = 100.00)
    
    if (activity.type === 'purchase') {
      totalBalance += amount;
    } else if (activity.type === 'redemption_request') {
      totalBalance -= amount; // Subtract redemption requests from balance
    }
  }
  
  return Math.max(0, totalBalance); // Ensure balance doesn't go negative
}

// Calculate latest claimable yield from available distributions
export function calculateClaimableYield(sukuk: any): number {
  if (!sukuk.available_distributions || sukuk.available_distributions.length === 0) {
    return 0;
  }
  
  // Find the latest claimable distribution (highest distribution_id)
  const claimableDistributions = sukuk.available_distributions.filter(
    (dist: any) => dist.claimable && dist.user_claimable_amount
  );
  
  if (claimableDistributions.length === 0) {
    return 0;
  }
  
  // Get the distribution with the highest ID (latest)
  const latestClaimable = claimableDistributions.reduce((latest: any, current: any) => 
    current.distribution_id > latest.distribution_id ? current : latest
  );
  
  return parseFloat(latestClaimable.user_claimable_amount) / 100; // Convert from 2 decimal format
}

// Get the latest claimable distribution ID for claiming
export function getLatestClaimableDistributionId(sukuk: any): number | null {
  if (!sukuk.available_distributions || sukuk.available_distributions.length === 0) {
    return null;
  }
  
  const claimableDistributions = sukuk.available_distributions.filter(
    (dist: any) => dist.claimable && dist.user_claimable_amount
  );
  
  if (claimableDistributions.length === 0) {
    return null;
  }
  
  // Get the distribution with the highest ID (latest)
  const latestClaimable = claimableDistributions.reduce((latest: any, current: any) => 
    current.distribution_id > latest.distribution_id ? current : latest
  );
  
  return latestClaimable.distribution_id;
}

// Calculate total yield from all sukuk
export function calculateTotalClaimableYield(ownedSukukList: any[]): number {
  if (!ownedSukukList || ownedSukukList.length === 0) {
    return 0;
  }
  
  let totalClaimable = 0;
  
  for (const sukuk of ownedSukukList) {
    totalClaimable += calculateClaimableYield(sukuk);
  }
  
  return totalClaimable;
}

export function calculatePortfolioSummary(ownedSukukList: any[]): {
  totalValue: number;
  totalInvestments: number;
  averageReturn: number;
} {
  if (!ownedSukukList || ownedSukukList.length === 0) {
    return {
      totalValue: 0,
      totalInvestments: 0,
      averageReturn: 0
    };
  }

  let totalInvested = 0;
  let totalCurrentValue = 0;
  let totalReturnRate = 0;

  for (const sukuk of ownedSukukList) {
    const balance = calculateSukukBalance(sukuk);
    totalInvested += balance;
    
    // For current value, we assume 1:1 unless we have market data
    // In a real scenario, this would factor in current market price
    totalCurrentValue += balance;
    
    // Parse return rate from imbal_hasil field (e.g., "8.5" -> 8.5)
    const returnRate = sukuk.imbal_hasil ? parseFloat(sukuk.imbal_hasil) : 0;
    totalReturnRate += returnRate;
  }

  const averageReturn = ownedSukukList.length > 0 ? totalReturnRate / ownedSukukList.length : 0;

  return {
    totalValue: totalCurrentValue,
    totalInvestments: totalInvested,
    averageReturn: averageReturn
  };
}

export function formatSukukHolding(sukuk: any) {
  const balance = calculateSukukBalance(sukuk);
  const returnRate = sukuk.imbal_hasil ? parseFloat(sukuk.imbal_hasil) : 0;
  
  return {
    id: sukuk.id.toString(),
    sukukCode: sukuk.sukuk_code,
    sukukTitle: sukuk.sukuk_title,
    investedAmount: balance,
    currentValue: balance, // Assuming 1:1 for now
    returnRate: returnRate,
    status: sukuk.status,
    maturityDate: sukuk.jatuh_tempo,
    couponType: sukuk.tipe_kupon,
    couponPayment: sukuk.penerimaan_kupon
  };
}

// Helper function to get user's sukuk balance by contract address from API data
export function getSukukBalanceByContract(ownedSukukData: any, contractAddress: string): number {
  if (!ownedSukukData?.sukuk || !contractAddress) {
    return 0;
  }
  
  const sukuk = ownedSukukData.sukuk.find(
    (s: any) => s.contract_address.toLowerCase() === contractAddress.toLowerCase()
  );
  
  return sukuk ? calculateSukukBalance(sukuk) : 0;
}

// Enhanced balance validation with API fallback
export function validateBalanceWithFallback(
  contractBalance: bigint | undefined,
  apiBalance: number,
  isLoading: boolean,
  hasError: boolean,
  decimals: number = 18
): { balance: string; source: 'contract' | 'api' | 'mock' | 'loading' } {
  if (isLoading) {
    return { balance: 'Loading...', source: 'loading' };
  }
  
  // Prefer contract data if available and valid
  if (contractBalance && !hasError) {
    try {
      const formatted = formatUnits(contractBalance, decimals);
      return { balance: parseFloat(formatted).toString(), source: 'contract' };
    } catch (e) {
      console.error('Error formatting contract balance:', e);
    }
  }
  
  // Fallback to API data
  if (apiBalance > 0) {
    return { balance: apiBalance.toString(), source: 'api' };
  }
  
  // Mock data for testing when neither contract nor API data is available
  if (hasError) {
    console.warn('Using mock balance for testing purposes');
    return { balance: '1000000', source: 'mock' }; // Mock balance
  }
  
  return { balance: '0', source: 'api' };
} 