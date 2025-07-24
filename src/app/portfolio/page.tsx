"use client";
import { useState } from "react"
import { GhostButton } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, PieChart, ChevronDown } from "lucide-react"
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

    return (
        <div className="min-h-[calc(100vh-80px)] bg-background px-6 py-6">
            <div className="p-6 mt-12">
                {/* Overview Section */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-foreground mb-6">Ringkasan Portofolio</h1>

                    <div className="grid grid-cols-3 gap-6">
                        <div className="bg-card rounded-lg p-6 border border-border">
                            <p className="text-muted-foreground text-sm mb-2">Total Nilai Portofolio</p>
                            <p className="text-foreground text-2xl font-bold">
                                {loading ? "..." : formatCurrency(portfolioSummary.totalValue, 'IDR')}
                            </p>
                        </div>
                        <div className="bg-card rounded-lg p-6 border border-border">
                            <p className="text-muted-foreground text-sm mb-2">Total Investasi</p>
                            <p className="text-foreground text-2xl font-bold">
                                {loading ? "..." : formatCurrency(portfolioSummary.totalInvestments, 'IDR')}
                            </p>
                        </div>
                        <div className="bg-card rounded-lg p-6 border border-border">
                            <p className="text-muted-foreground text-sm mb-2">Rata-rata Imbal Hasil</p>
                            <p className="text-foreground text-2xl font-bold">
                                {loading ? "..." : `${portfolioSummary.averageReturn.toFixed(2)}%`}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Analytics Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-foreground mb-6">Analisis Investasi</h2>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Historical Investments */}
                        <div className="bg-card rounded-lg p-6 border border-border">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-foreground flex items-center">
                                    <TrendingUp className="w-5 h-5 mr-2" />
                                    Riwayat Investasi
                                </h3>
                                <div className="flex space-x-2">
                                    <GhostButton className="text-primary bg-primary/20">
                                        Harian
                                    </GhostButton>
                                    <GhostButton className="text-muted-foreground hover:text-foreground">
                                        Mingguan
                                    </GhostButton>
                                    <GhostButton className="text-muted-foreground hover:text-foreground">
                                        Bulanan
                                    </GhostButton>
                                </div>
                            </div>

                            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg border border-border">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <TrendingUp className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground font-medium">
                                        {loading ? "Memuat data..." : "Data grafik akan segera tersedia"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Portfolio Distribution */}
                        <div className="bg-card rounded-lg p-6 border border-border">
                            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                                <PieChart className="w-5 h-5 mr-2" />
                                Distribusi Sukuk
                            </h3>

                            <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg border border-border">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <PieChart className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <p className="text-muted-foreground font-medium">
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
                    <h2 className="text-xl font-bold text-foreground mb-6">Kepemilikan Sukuk</h2>

                    <div className="bg-card rounded-lg border border-border">
                        {/* Filter and Controls */}
                        <div className="p-6 border-b border-border">
                            <div className="flex items-center justify-between">
                                <div className="relative">
                                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder="Cari pool sukuk..."
                                        className="bg-background border border-border rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground w-64"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <GhostButton
                                    className="border-border text-foreground bg-transparent hover:bg-accent"
                                >
                                    Kolom
                                    <ChevronDown className="w-4 h-4 ml-2" />
                                </GhostButton>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-muted-foreground text-sm border-b border-border">
                                        <th className="text-left py-4 px-6 font-medium">Nama Pool</th>
                                        <th className="text-left py-4 px-6 font-medium">Imbal Hasil</th>
                                        <th className="text-left py-4 px-6 font-medium">Jumlah Investasi</th>
                                        <th className="text-left py-4 px-6 font-medium">Jangka Waktu</th>
                                        <th className="text-left py-4 px-6 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={5} className="py-12 text-center">
                                                <div className="flex items-center justify-center">
                                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                                    <span className="ml-2 text-muted-foreground">Memuat kepemilikan sukuk...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : error ? (
                                        <tr>
                                            <td colSpan={5} className="py-12 text-center">
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
                                            <td colSpan={5} className="py-12 text-center">
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
                                                </tr>
                                            )
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}