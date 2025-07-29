"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useSukukPools } from "@/hooks/useApi"
import { SukukDetailHeader } from "@/components/pages/sukuk/detail/SukukDetailHeader"
import { SukukInvestmentPanel } from "@/components/pages/sukuk/detail/SukukInvestmentPanel"

function SukukDetailPageContent() {
    const params = useParams()
    const sukukId = params.id as string
    const { data: sukukPools, loading, error } = useSukukPools()

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-background px-6 py-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        <span className="ml-2 text-muted-foreground">Memuat detail sukuk...</span>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !sukukPools) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-background px-6 py-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-20">
                        <p className="text-destructive">Gagal memuat detail sukuk: {error}</p>
                    </div>
                </div>
            </div>
        )
    }

    const sukuk = sukukPools.find(pool => pool.id.toString() === sukukId)
    
    if (!sukuk) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-background px-6 py-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-20">
                        <p className="text-muted-foreground">Sukuk tidak ditemukan</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-background px-6 py-6">
            <div className="max-w-7xl mx-auto">
                {/* Back to Pools */}
                <div className="mt-20 mb-6">
                    <Link href="/sukuk" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Daftar Sukuk
                    </Link>
                </div>

                {/* Pool Header */}
                <SukukDetailHeader sukukId={sukukId} />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-card rounded-xl p-6 border border-border">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Sukuk Chart</h3>
                            <p className="text-muted-foreground">Chart component will be added here</p>
                        </div>
                        <div className="bg-card rounded-xl p-6 border border-border">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Sukuk Statistics</h3>
                            <p className="text-muted-foreground">Statistics component will be added here</p>
                        </div>
                        <div className="bg-card rounded-xl p-6 border border-border">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Sukuk Transactions</h3>
                            <p className="text-muted-foreground">Transactions component will be added here</p>
                        </div>
                        <div className="bg-card rounded-xl p-6 border border-border">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Sukuk Risk Metrics</h3>
                            <p className="text-muted-foreground">Risk metrics component will be added here</p>
                        </div>
                    </div>

                    {/* Right Column - Investment Panel */}
                    <div className="lg:col-span-1">
                        <SukukInvestmentPanel contractAddress={sukuk.contract_address} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function SukukDetailPage() {
    return <SukukDetailPageContent />
} 