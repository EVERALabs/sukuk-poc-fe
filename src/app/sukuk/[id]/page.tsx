import Link from "next/link"
import { SukukDetailHeader } from "@/components/pages/sukuk/detail/SukukDetailHeader"
import { SukukInvestmentPanel } from "@/components/pages/sukuk/detail/SukukInvestmentPanel"
import { SukukRiskMetrics } from "@/components/pages/sukuk/detail/SukukRiskMetrics"
import { SukukStatistics } from "@/components/pages/sukuk/detail/SukukStatistics"
import { SukukTransactions } from "@/components/pages/sukuk/detail/SukukTransactions"

interface PoolDetailPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function PoolDetailPage({ params }: PoolDetailPageProps) {
    const { id } = await params
    return (
        <div className="min-h-[calc(100vh-80px)] bg-background px-6 py-6">
            <div className="max-w-7xl mx-auto">
                {/* Back to Pools */}
                <div className="mt-20 mb-6">
                    <Link href="/sukuk" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Pools
                    </Link>
                </div>

                {/* Pool Header */}
                <SukukDetailHeader sukukId={id} />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <SukukStatistics />
                        <SukukTransactions />
                        <SukukRiskMetrics />
                    </div>

                    {/* Right Column - Investment Panel */}
                    <div className="lg:col-span-1">
                        <SukukInvestmentPanel />
                    </div>
                </div>
            </div>
        </div>
    )
} 