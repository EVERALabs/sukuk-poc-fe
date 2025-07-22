import { PoolDetailHeader } from "@/components/pages/sukuk/pool-detail/PoolDetailHeader"
import { PoolStatistics } from "@/components/pages/sukuk/pool-detail/PoolStatistics"
import { PoolInvestmentPanel } from "@/components/pages/sukuk/pool-detail/PoolInvestmentPanel"
import { PoolTransactions } from "@/components/pages/sukuk/pool-detail/PoolTransactions"
import { PoolRiskMetrics } from "@/components/pages/sukuk/pool-detail/PoolRiskMetrics"

interface PoolDetailPageProps {
    params: {
        id: string
    }
}

export default function PoolDetailPage({ params }: PoolDetailPageProps) {
    return (
        <div className="min-h-[calc(100vh-80px)] bg-background px-6 py-6">
            <div className="max-w-7xl mx-auto">
                {/* Back to Pools */}
                <div className="mt-20 mb-6">
                    <a href="/sukuk" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Pools
                    </a>
                </div>

                {/* Pool Header */}
                <PoolDetailHeader poolId={params.id} />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <PoolStatistics />
                        <PoolTransactions />
                        <PoolRiskMetrics />
                    </div>

                    {/* Right Column - Investment Panel */}
                    <div className="lg:col-span-1">
                        <PoolInvestmentPanel />
                    </div>
                </div>
            </div>
        </div>
    )
} 