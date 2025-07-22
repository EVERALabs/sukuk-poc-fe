"use client"

interface PoolDetailHeaderProps {
    poolId: string
}

// Mock data - in real app this would come from API
const getPoolData = (id: string) => {
    const poolsData: Record<string, any> = {
        "sr022-t5": {
            code: "SR022-T5",
            name: "Sukuk Ritel",
            description: "Sukuk Ritel Seri SR022-T5",
            couponType: "Fixed Rate",
            status: "Syariah",
            statusType: "syariah",
            period: "16 Mei - 18 Jun 2025",
            returnRate: "6.55%",
            tenor: "5 Tahun",
            icon: "⭐",
            iconBg: "bg-purple-100",
            totalValue: "Rp7,000,000,000,000",
            minInvestment: "Rp1,000,000",
            maxInvestment: "Rp10,000,000,000",
            investmentPeriod: "5 tahun",
            distribution: "Bulanan",
            shareCompliance: "100%",
            maturityDate: "10 Jun 2030",
            couponPayment: "10 Setiap Bulan",
            firstCoupon: "11 Agustus 2025"
        },
        "trade-finance-pool": {
            code: "TFP001",
            name: "Trade Finance Pool #fincards-receivables-pool-amoy",
            description: "Sharia-Compliant Trade Finance",
            couponType: "Fixed Rate",
            status: "Aktif",
            statusType: "ongoing",
            period: "15 Mar - 15 Sep 2025",
            returnRate: "12.5%",
            tenor: "12 bulan",
            progress: 100,
            icon: "📈",
            iconBg: "bg-blue-100",
            totalValue: "8.5M USD",
            minInvestment: "1,000 USD",
            investmentPeriod: "12 months",
            distribution: "Monthly",
            shareCompliance: "100%"
        }
    }
    
    return poolsData[id] || poolsData["sr022-t5"]
}

export function PoolDetailHeader({ poolId }: PoolDetailHeaderProps) {
    const pool = getPoolData(poolId)
    
    return (
        <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-start justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${pool.iconBg} rounded-lg flex items-center justify-center text-2xl`}>
                        {pool.icon}
                    </div>
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <h1 className="text-3xl font-bold text-foreground">{pool.code}</h1>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    pool.statusType === "syariah"
                                        ? "bg-pink-100 text-pink-600 border border-pink-200"
                                        : pool.statusType === "ongoing"
                                        ? "bg-primary/20 text-primary border border-primary/30"
                                        : pool.statusType === "upcoming"
                                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                                        : "bg-gray-100 text-gray-800 border border-gray-200"
                                }`}
                            >
                                {pool.status}
                            </span>
                        </div>
                        <h2 className="text-lg text-muted-foreground">{pool.name}</h2>
                    </div>
                </div>
                
                <div className="flex space-x-2">
                    <button className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-accent transition-colors">
                        Bagikan
                    </button>
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                        📥 Unduh Memorandum
                    </button>
                </div>
            </div>

            {/* Key Metrics - Three Cards */}
            <div className="grid grid-cols-3 gap-4">
                {/* Tenor */}
                <div className="bg-gradient-to-br from-green-50 to-green-25 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-700 font-medium text-sm">Tenor</span>
                    </div>
                    <div className="text-green-800 font-bold text-2xl">{pool.tenor}</div>
                </div>

                {/* Imbal Hasil */}
                <div className="bg-gradient-to-br from-green-50 to-green-25 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-700 font-medium text-sm">Imbal Hasil</span>
                    </div>
                    <div className="text-green-800 font-bold text-2xl">{pool.returnRate} / Tahun</div>
                </div>

                {/* Status */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-25 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-blue-700 font-medium text-sm">Status</span>
                    </div>
                    <div className="text-blue-800 font-bold text-2xl">{pool.status}</div>
                </div>
            </div>

            {/* Alternative format for trade-finance-pool */}
            {poolId === "trade-finance-pool" && (
                <div className="mt-4">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <p className="text-muted-foreground text-sm mb-1">Imbal Hasil /Tahun</p>
                            <p className="text-foreground font-bold text-3xl">{pool.returnRate}</p>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <p className="text-muted-foreground text-sm mb-1">Tenor</p>
                            <p className="text-foreground font-bold text-3xl">{pool.tenor}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
 