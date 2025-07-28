"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from "@privy-io/wagmi";
import { wagmiConfig } from "@/config/wagmiConfig";
import PrivyProviders from "@/providers/PrivyProvider";
import { useMemo } from 'react';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <PrivyProviders>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProviders>
  );
} 