"use client";
import { useState } from "react"
import { GhostButton } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, PieChart, ChevronDown, Gift } from "lucide-react"
import { useOwnedSukuk } from "@/hooks/useApi"
import { formatCurrency, formatDate } from "@/utils/api"
import { calculatePortfolioSummary, formatSukukHolding } from "@/utils/api"

// Test wallet address - in a real app, this would come from wallet connection
const TEST_WALLET_ADDRESS = "0xf57093Ea18E5CfF6E7bB3bb770Ae9C492277A5a9"

export default function PortfolioPage() {
    const [searchTerm, setSearchTerm] = useState("")
    
    const { data: ownedSukukData, loading, error, refetch } = useOwnedSukuk(TEST_WALLET_ADDRESS)

    // Calculate portfolio summary from owned sukuk data
    const portfolioSummary = ownedSukukData ? calculatePortfolioSummary(ownedSukukData.sukuk) : {
        totalValue: 0,
        totalInvestments: 0,
        averageReturn: 0
    }

    // Filter sukuk holdings based on search term
    const filteredHoldings = ownedSukukData?.sukuk?.filter((sukuk) => 
        sukuk.sukuk_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sukuk.sukuk_title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    // Helper function to get status styling
    const getStatusInfo = (status: string) => {
        switch (status.toLowerCase()) {
            case 'berlangsung':
            case 'active':
                return 'bg-primary/20 text-primary border border-primary/30'
            case 'mendatang':
            case 'upcoming':
                return 'bg-blue-50 text-blue-600 border border-blue-200'
            case 'berakhir':
            case 'matured':
                return 'bg-gray-100 text-gray-800 border border-gray-200'
            default:
                return 'bg-muted/20 text-muted-foreground border border-muted/30'
        }
    }

    const handleClaim = (sukukId: number) => {
        // TODO: Implement claim functionality
        console.log('Claiming rewards for sukuk:', sukukId);
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-background px-4 md:px-6 py-4 md:py-6">
            <div className="p-4 md:p-6 mt-8 md:mt-12">
                {/* Overview Section */}
                <div className="mb-6 md:mb-8">
                    <h1 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-6">Ringkasan Portofolio</h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
                            <p className="text-muted-foreground text-sm mb-2">Total Nilai Portofolio</p>
                            <p className="text-foreground text-xl md:text-2xl font-bold">
                                {loading ? "..." : formatCurrency(portfolioSummary.totalValue, 'IDR')}
                            </p>
                        </div>
                        <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
                            <p className="text-muted-foreground text-sm mb-2">Total Investasi</p>
                            <p className="text-foreground text-xl md:text-2xl font-bold">
                                {loading ? "..." : formatCurrency(portfolioSummary.totalInvestments, 'IDR')}
                            </p>
                        </div>
                        <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
                            <p className="text-muted-foreground text-sm mb-2">Rata-rata Imbal Hasil</p>
                            <p className="text-foreground text-xl md:text-2xl font-bold">
                                {loading ? "..." : `${portfolioSummary.averageReturn.toFixed(2)}%`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Analytics Section */}
                <div className="mb-6 md:mb-8">
                    <h2 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6">Analisis Investasi</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {/* Historical Investments */}
                        <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <h3 className="text-base md:text-lg font-semibold text-foreground flex items-center mb-3 md:mb-0">
                                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                                    Riwayat Investasi
                                </h3>
                                <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
                                    <GhostButton className="text-primary bg-primary/20 text-sm whitespace-nowrap">
                                        Harian
                                    </GhostButton>
                                    <GhostButton className="text-muted-foreground hover:text-foreground text-sm whitespace-nowrap">
                                        Mingguan
                                    </GhostButton>
                                    <GhostButton className="text-muted-foreground hover:text-foreground text-sm whitespace-nowrap">
                                        Bulanan
                                    </GhostButton>
                                </div>
                            </div>

                            <div className="h-48 md:h-64 flex items-center justify-center bg-muted/50 rounded-lg border border-border">
                                <div className="text-center">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground font-medium text-sm md:text-base">
                                        {loading ? "Memuat data..." : "Data grafik akan segera tersedia"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Portfolio Distribution */}
                        <div className="bg-card rounded-lg p-4 md:p-6 border border-border">
                            <h3 className="text-base md:text-lg font-semibold text-foreground mb-4 flex items-center">
                                <PieChart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                                Distribusi Sukuk
                            </h3>

                            <div className="h-48 md:h-64 flex items-center justify-center bg-muted/50 rounded-lg border border-border">
                                <div className="text-center">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <PieChart className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground font-medium text-sm md:text-base">
                                        {loading ? "Memuat data..." : 
                                         filteredHoldings.length > 0 ? "Data distribusi akan segera tersedia" : "Belum Ada Data"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sukuk Holdings */}
                <div>
                    <h2 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6">Kepemilikan Sukuk</h2>

                    <div className="bg-card rounded-lg border border-border">
                        {/* Filter and Controls */}
                        <div className="p-4 md:p-6 border-b border-border">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
                                <div className="relative w-full md:w-auto">
                                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder="Cari pool sukuk..."
                                        className="bg-background border border-border rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground w-full md:w-64"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                {/* <GhostButton
                                    className="border-border text-foreground bg-transparent hover:bg-accent md:ml-2"
                                >
                                    Kolom
                                    <ChevronDown className="w-4 h-4 ml-2" />
                                </GhostButton> */}
                            </div>
                        </div>

                        {/* Table/Card View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-muted-foreground text-sm border-b border-border">
                                        <th className="text-left py-4 px-6 font-medium">Nama Pool</th>
                                        <th className="text-left py-4 px-6 font-medium">Imbal Hasil</th>
                                        <th className="text-left py-4 px-6 font-medium">Jumlah Investasi</th>
                                        <th className="text-left py-4 px-6 font-medium">Jangka Waktu</th>
                                        <th className="text-left py-4 px-6 font-medium">Status</th>
                                        <th className="text-left py-4 px-6 font-medium">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="py-12 text-center">
                                                <div className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                                    <span className="ml-2 text-muted-foreground">Memuat kepemilikan sukuk...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan={6} className="py-12 text-center">
                                                <div className="text-muted-foreground">
                                                    <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                                        <span className="text-red-500 text-2xl">⚠️</span>
                                                    </div>
                                                    <p className="font-medium text-red-600">Gagal memuat data</p>
                                                    <p className="text-sm mt-1">{error}</p>
                                                    <button 
                                                        onClick={refetch}
                                                        className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90"
                                                    >
                                                        Coba Lagi
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : filteredHoldings.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-12 text-center">
                                                <div className="text-muted-foreground">
                                                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                                                        <Search className="w-8 h-8 text-muted-foreground" />
                                                    </div>
                                                    <p className="font-medium">
                                                        {searchTerm ? "Tidak ada hasil pencarian" : "Belum ada kepemilikan sukuk"}
                                                    </p>
                                                    <p className="text-sm mt-1">
                                                        {searchTerm 
                                                            ? `Tidak ditemukan sukuk dengan kata kunci "${searchTerm}"`
                                                            : "Mulai berinvestasi di pool sukuk untuk melihat kepemilikan Anda di sini"
                                                        }
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredHoldings.map((sukuk) => {
                                            const holding = formatSukukHolding(sukuk);
                                            const statusInfo = getStatusInfo(sukuk.status);
                                            
                                            return (
                                                <tr key={sukuk.id} className="border-b border-border hover:bg-accent/50">
                                                    <td className="py-4 px-6">
                                                        <div>
                                                            <div className="font-semibold text-foreground">{sukuk.sukuk_code}</div>
                                                            <div className="text-muted-foreground text-sm">{sukuk.sukuk_title}</div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-6 text-foreground font-medium">
                                                        {sukuk.imbal_hasil ? `${sukuk.imbal_hasil}%` : 'N/A'}
                                                    </td>
                                                    <td className="py-4 px-6 text-foreground font-medium">
                                                        {formatCurrency(holding.investedAmount, 'IDR')}
                                                    </td>
                                                    <td className="py-4 px-6 text-foreground text-sm">
                                                        {sukuk.tenor || 'N/A'}
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo}`}>
                                                            {sukuk.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6">
                                                        <button
                                                            onClick={() => handleClaim(sukuk.id)}
                                                            className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary text-sm rounded-lg transition-colors"
                                                        >
                                                            <Gift className="w-4 h-4" />
                                                            <span>Claim</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="md:hidden">
                            {loading ? (
                                <div className="p-6 text-center">
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                        <span className="ml-2 text-sm text-muted-foreground">Memuat kepemilikan sukuk...</span>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="p-6 text-center">
                                    <div className="text-muted-foreground">
                                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                            <span className="text-red-500 text-xl">⚠️</span>
                                        </div>
                                        <p className="font-medium text-red-600 text-sm">Gagal memuat data</p>
                                        <p className="text-xs mt-1">{error}</p>
                                        <button 
                                            onClick={refetch}
                                            className="mt-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90"
                                        >
                                            Coba Lagi
                                        </button>
                                    </div>
                                </div>
                            ) : filteredHoldings.length === 0 ? (
                                <div className="p-6 text-center">
                                    <div className="text-muted-foreground">
                                        <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                                            <Search className="w-6 h-6 text-muted-foreground" />
                                        </div>
                                        <p className="font-medium text-sm">
                                            {searchTerm ? "Tidak ada hasil pencarian" : "Belum ada kepemilikan sukuk"}
                                        </p>
                                        <p className="text-xs mt-1">
                                            {searchTerm 
                                                ? `Tidak ditemukan sukuk dengan kata kunci "${searchTerm}"`
                                                : "Mulai berinvestasi di pool sukuk untuk melihat kepemilikan Anda di sini"
                                            }
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="divide-y divide-border">
                                    {filteredHoldings.map((sukuk) => {
                                        const holding = formatSukukHolding(sukuk);
                                        const statusInfo = getStatusInfo(sukuk.status);
                                        
                                        return (
                                            <div key={sukuk.id} className="p-4">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div>
                                                        <div className="font-semibold text-foreground">{sukuk.sukuk_code}</div>
                                                        <div className="text-muted-foreground text-sm">{sukuk.sukuk_title}</div>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo}`}>
                                                        {sukuk.status}
                                                    </span>
                                                </div>
                                                
                                                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                                                    <div>
                                                        <div className="text-muted-foreground">Imbal Hasil</div>
                                                        <div className="font-medium">{sukuk.imbal_hasil ? `${sukuk.imbal_hasil}%` : 'N/A'}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-muted-foreground">Jangka Waktu</div>
                                                        <div className="font-medium">{sukuk.tenor || 'N/A'}</div>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <div className="text-muted-foreground">Jumlah Investasi</div>
                                                        <div className="font-medium">{formatCurrency(holding.investedAmount, 'IDR')}</div>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => handleClaim(sukuk.id)}
                                                    className="w-full flex items-center justify-center space-x-1 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-sm rounded-lg transition-colors"
                                                >
                                                    <Gift className="w-4 h-4" />
                                                    <span>Claim Rewards</span>
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}