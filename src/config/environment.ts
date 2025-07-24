// Environment Configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.indosukuk.com',
    timeout: 30000,
    retryAttempts: 3,
  },

  // Blockchain Configuration
  blockchain: {
    chainId: process.env.NEXT_PUBLIC_CHAIN_ID || '1',
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY',
  },

  // Wallet Configuration
  wallet: {
    connectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  },

  // App Configuration
  app: {
    name: 'IndoSukuk',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },

  // Feature Flags
  features: {
    enableMockData: process.env.NODE_ENV === 'development',
    enableAnalytics: process.env.NEXT_PUBLIC_GA_TRACKING_ID !== undefined,
  },
};

// Environment helpers
export const isDevelopment = config.app.environment === 'development';
export const isProduction = config.app.environment === 'production';
export const isTest = config.app.environment === 'test';

// API URL helpers
export const getApiUrl = (endpoint: string) => {
  const baseUrl = config.api.baseUrl.replace(/\/$/, '');
  const cleanEndpoint = endpoint.replace(/^\//, '');
  return `${baseUrl}/${cleanEndpoint}`;
};

// Validation helpers
export const validateConfig = () => {
  const errors: string[] = [];

  if (!config.api.baseUrl) {
    errors.push('API base URL is required');
  }

  if (isProduction && !config.wallet.connectProjectId) {
    errors.push('WalletConnect Project ID is required in production');
  }

  if (errors.length > 0) {
    console.error('Configuration errors:', errors);
    throw new Error(`Configuration validation failed: ${errors.join(', ')}`);
  }
}; 