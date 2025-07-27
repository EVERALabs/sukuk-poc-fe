'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { arbitrum, base, berachain, mantle, polygon, story } from 'viem/chains';

export default function PrivyProviders({ children }: { children: React.ReactNode }) {
    return (
        <PrivyProvider
            appId="cmdgex67h00hjl40mqxoaq51r"
            // clientId="your-app-client-id"
            config={{
                // Create embedded wallets for users who don't have a wallet
                embeddedWallets: {
                    ethereum: {
                        createOnLogin: 'users-without-wallets'
                    }
                },
                defaultChain: base,
                supportedChains: [base, berachain, polygon, arbitrum, story, mantle]
            }}
        >
            {children}
        </PrivyProvider>
    );
}