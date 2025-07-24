# API Setup Documentation

## Overview

This document describes the API infrastructure setup for the IndoSukuk application, including API client, hooks, and utilities for making HTTP requests to the backend.

## Architecture

### File Structure

```
src/
├── libs/
│   ├── api.ts              # Main API client with axios
│   └── mockData.ts         # Mock data for development
├── hooks/
│   └── useApi.ts           # React hooks for API calls
├── providers/
│   └── ApiProvider.tsx     # Context provider for global state
├── utils/
│   └── api.ts              # Utility functions for formatting/validation
└── config/
    └── environment.ts      # Environment configuration
```

## API Client (`src/libs/api.ts`)

### Features

- **Axios-based HTTP client** with interceptors
- **Authentication handling** with JWT tokens
- **Error handling** with custom error messages
- **TypeScript support** with full type definitions
- **Request/Response interceptors** for common operations

### Usage

```typescript
import { apiClient } from '@/libs/api';

// Get sukuk pools
const pools = await apiClient.getSukukPools();

// Get user portfolio
const portfolio = await apiClient.getPortfolio();

// Invest in a pool
const result = await apiClient.investInPool('pool-id', 1000000);
```

### API Endpoints

#### Sukuk Pools
- `GET /sukuk/pools` - Get all sukuk pools
- `GET /sukuk/pools/:id` - Get specific sukuk pool

#### Portfolio
- `GET /portfolio` - Get user portfolio overview
- `GET /portfolio/holdings` - Get portfolio holdings

#### Transactions
- `GET /transactions` - Get transaction history (with pagination)
- `GET /transactions/:id` - Get specific transaction

#### Investment Actions
- `POST /invest` - Invest in a sukuk pool
- `POST /withdraw` - Withdraw from a sukuk pool

#### User Management
- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

#### Authentication
- `POST /auth/connect-wallet` - Connect wallet
- `POST /auth/logout` - Logout user

#### Analytics
- `GET /analytics/investment-history` - Get investment history
- `GET /analytics/sukuk-distribution` - Get sukuk distribution

## React Hooks (`src/hooks/useApi.ts`)

### Available Hooks

```typescript
// Sukuk Pools
const { data: pools, loading, error, refetch } = useSukukPools();
const { data: pool, loading, error } = useSukukPool(poolId);

// Portfolio
const { data: portfolio, loading, error } = usePortfolio();
const { data: holdings, loading, error } = usePortfolioHoldings();

// Transactions
const { data: transactions, loading, error } = useTransactions({
  page: 1,
  limit: 10,
  search: 'search term'
});

// User Profile
const { data: profile, loading, error } = useUserProfile();

// Investment Actions
const { invest, withdraw, loading, error } = useInvestment();

// Authentication
const { connectWallet, logout, isAuthenticated, loading, error } = useAuth();
```

### Hook Features

- **Automatic loading states** - Each hook manages its own loading state
- **Error handling** - Built-in error handling with user-friendly messages
- **Refetch capability** - Ability to refetch data when needed
- **TypeScript support** - Full type safety for all data

## Context Provider (`src/providers/ApiProvider.tsx`)

### Global State Management

The `ApiProvider` provides global state for:
- Authentication status
- User profile
- Global error handling
- Profile refresh functionality

### Usage

```typescript
import { useApiContext } from '@/providers/ApiProvider';

function MyComponent() {
  const { isAuthenticated, userProfile, globalError } = useApiContext();
  
  if (!isAuthenticated) {
    return <LoginPrompt />;
  }
  
  return <Dashboard user={userProfile} />;
}
```

## Utility Functions (`src/utils/api.ts`)

### Formatting Functions

```typescript
import { formatCurrency, formatDate, formatPercentage } from '@/utils/api';

// Currency formatting
formatCurrency(1000000); // "Rp 1.000.000"

// Date formatting
formatDate('2025-01-15'); // "15 Januari 2025"

// Percentage formatting
formatPercentage(6.55); // "6,55%"
```

### Validation Functions

```typescript
import { validateAmount, validateWalletAddress } from '@/utils/api';

// Amount validation
const { isValid, error } = validateAmount('1000000');
if (!isValid) {
  console.error(error); // "Jumlah minimum investasi adalah Rp 10.000"
}

// Wallet address validation
const { isValid, error } = validateWalletAddress('0x123...');
```

### Status Utilities

```typescript
import { getStatusColor, getStatusText } from '@/utils/api';

// Get status styling
const statusClass = getStatusColor('ongoing'); // "text-green-600 bg-green-100 border-green-200"

// Get status text
const statusText = getStatusText('ongoing'); // "Berlangsung"
```

## Mock Data (`src/libs/mockData.ts`)

### Development Support

For development and testing, comprehensive mock data is provided:

- **Sukuk Pools** - 8 different pools with realistic data
- **Portfolio** - Sample portfolio with holdings
- **Transactions** - Sample transaction history
- **User Profile** - Sample user data

### Mock API Functions

```typescript
import { mockApi } from '@/libs/mockData';

// Use mock API in development
const pools = await mockApi.getSukukPools();
const portfolio = await mockApi.getPortfolio();
```

## Environment Configuration (`src/config/environment.ts`)

### Configuration Options

```typescript
import { config, isDevelopment, isProduction } from '@/config/environment';

// API Configuration
config.api.baseUrl; // API base URL
config.api.timeout; // Request timeout

// Blockchain Configuration
config.blockchain.chainId; // Chain ID
config.blockchain.rpcUrl; // RPC URL

// Feature Flags
config.features.enableMockData; // Enable mock data in development
```

## Environment Variables

Create a `.env.local` file in your project root:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.indosukuk.com

# Development API (for testing)
# NEXT_PUBLIC_API_URL=http://localhost:3001

# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=1
NEXT_PUBLIC_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_KEY

# Wallet Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id

# Analytics (Optional)
NEXT_PUBLIC_GA_TRACKING_ID=your_google_analytics_id
```

## Error Handling

### HTTP Status Codes

The API client handles common HTTP status codes:

- **400** - Bad Request: "Permintaan tidak valid"
- **401** - Unauthorized: "Sesi Anda telah berakhir, silakan login kembali"
- **403** - Forbidden: "Anda tidak memiliki izin untuk melakukan aksi ini"
- **404** - Not Found: "Data tidak ditemukan"
- **429** - Too Many Requests: "Terlalu banyak permintaan, silakan coba lagi nanti"
- **500** - Server Error: "Terjadi kesalahan pada server"

### Error Messages

All error messages are in Indonesian and user-friendly:

```typescript
import { getErrorMessage } from '@/utils/api';

try {
  await apiClient.getSukukPools();
} catch (error) {
  const message = getErrorMessage(error);
  console.error(message); // "Terjadi kesalahan jaringan"
}
```

## Authentication

### Token Management

The API client automatically handles JWT tokens:

- **Storage**: Tokens are stored in `localStorage`
- **Inclusion**: Tokens are automatically included in request headers
- **Expiration**: 401 responses trigger automatic logout

### Wallet Connection

```typescript
import { useAuth } from '@/hooks/useApi';

function ConnectWallet() {
  const { connectWallet, loading, error } = useAuth();
  
  const handleConnect = async () => {
    try {
      await connectWallet(walletAddress, signature);
      // Token is automatically stored
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };
}
```

## Pagination

### Transaction History

The transactions API supports pagination:

```typescript
const { data: transactions } = useTransactions({
  page: 1,
  limit: 10,
  type: 'buy',
  status: 'completed',
  search: 'pool name'
});

// Response includes pagination info
const { data, pagination } = transactions;
console.log(`Page ${pagination.page} of ${pagination.totalPages}`);
```

## Search and Filtering

### Search Functionality

```typescript
import { searchInArray } from '@/utils/api';

const filteredPools = searchInArray(pools, searchTerm, ['name', 'code']);
```

### Filter Options

- **Transaction Type**: buy, sell, dividend, maturity
- **Status**: pending, completed, failed, cancelled
- **Pool ID**: Filter by specific pool
- **Search**: Search by pool name or transaction hash

## Testing

### Mock Data Testing

```typescript
import { mockSukukPools, mockPortfolio } from '@/libs/mockData';

// Test with mock data
expect(mockSukukPools).toHaveLength(8);
expect(mockPortfolio.totalValue).toBe(125000000);
```

### API Testing

```typescript
import { apiClient } from '@/libs/api';

// Test API calls
const response = await apiClient.getSukukPools();
expect(response.success).toBe(true);
expect(response.data).toBeDefined();
```

## Best Practices

### 1. Use Hooks for Data Fetching

```typescript
// ✅ Good
const { data: pools, loading, error } = useSukukPools();

// ❌ Avoid direct API calls in components
const [pools, setPools] = useState([]);
useEffect(() => {
  apiClient.getSukukPools().then(setPools);
}, []);
```

### 2. Handle Loading States

```typescript
function SukukPools() {
  const { data: pools, loading, error } = useSukukPools();
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  
  return <PoolsList pools={pools} />;
}
```

### 3. Use Error Boundaries

```typescript
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ApiProvider>
        <YourApp />
      </ApiProvider>
    </ErrorBoundary>
  );
}
```

### 4. Format Data Consistently

```typescript
import { formatCurrency, formatDate } from '@/utils/api';

function TransactionRow({ transaction }) {
  return (
    <tr>
      <td>{formatCurrency(transaction.amount)}</td>
      <td>{formatDate(transaction.date)}</td>
    </tr>
  );
}
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure API server allows requests from your domain
2. **Authentication Errors**: Check if token is valid and not expired
3. **Network Errors**: Verify API URL and network connectivity
4. **Type Errors**: Ensure all API responses match TypeScript interfaces

### Debug Mode

Enable debug logging in development:

```typescript
// In api.ts
if (process.env.NODE_ENV === 'development') {
  console.log('API Request:', config);
  console.log('API Response:', response);
}
```

## Dependencies

### Required Dependencies

```json
{
  "axios": "^1.6.0"
}
```

### Installation

```bash
npm install axios
```

## Migration Guide

### From Direct Fetch Calls

```typescript
// Old way
const response = await fetch('/api/sukuk/pools');
const pools = await response.json();

// New way
const { data: pools } = await apiClient.getSukukPools();
```

### From useState + useEffect

```typescript
// Old way
const [pools, setPools] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchPools().then(setPools).finally(() => setLoading(false));
}, []);

// New way
const { data: pools, loading } = useSukukPools();
```

This API setup provides a robust, type-safe, and user-friendly foundation for the IndoSukuk application with comprehensive error handling, loading states, and development support. 