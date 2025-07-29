"use client";

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, ExternalLink } from "lucide-react"
import { useTransactionHistory } from "@/hooks/useApi"
import { TransactionActivity } from "@/libs/api"

// Test wallet address - in a real app, this would come from wallet connection
const TEST_WALLET_ADDRESS = "0xf57093Ea18E5CfF6E7bB3bb770Ae9C492277A5a9"

export default function HistoryPage() {
    const [limit, setLimit] = useState(10)
    const [searchTerm, setSearchTerm] = useState("")
    
    const { data: transactionHistory, loading, error, refetch } = useTransactionHistory(TEST_WALLET_ADDRESS, limit)

    // Filter transactions based on search term
    const filteredTransactions = transactionHistory?.activities?.filter((tx: TransactionActivity) => 
        tx.tx_hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.sukuk_address.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    // Helper function to format amount from wei to readable format
    const formatAmount = (amountWei: string) => {
        const amount = Number(amountWei) // Convert string to number directly
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount)
    }

    // Helper function to format date
    const formatDate = (timestamp: string) => {
        return new Date(timestamp).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    // Helper function to get transaction type in Indonesian
    const getTransactionType = (type: string) => {
        switch (type) {
            case 'purchase':
                return 'Pembelian'
            case 'sale':
                return 'Penjualan'
            case 'dividend':
                return 'Dividen'
            default:
                return type
        }
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-background px-4 md:px-6 py-4 md:py-6">
            <div className="p-6 mt-12">
                {/* Header */}
                <h1 className="text-2xl font-bold text-foreground mb-6">Riwayat Transaksi</h1>

                {/* Search and Filters */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Cari hash transaksi..."
                                className="bg-background border border-border rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* <OutlineButton
                            className="border-border text-foreground bg-transparent hover:bg-accent"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Status
                        </OutlineButton>

                        <OutlineButton

                            className="border-border text-foreground bg-transparent hover:bg-accent"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Jenis Pool
                        </OutlineButton> */}
                    </div>

                    {/* <OutlineButton

                        className="border-border text-foreground bg-transparent hover:bg-accent"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat
                    </OutlineButton> */}
                </div>

                {/* Table */}
                <div className="bg-card rounded-lg border border-border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-muted-foreground text-sm border-b border-border">
                                    <th className="text-left py-4 px-6 font-medium">ID</th>
                                    <th className="text-left py-4 px-6 font-medium">
                                        <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                            <span>Jumlah</span>
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 font-medium">
                                        <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                            <span>Pool</span>
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 font-medium">
                                        <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                            <span>Tanggal</span>
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 font-medium">
                                        <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                            <span>Jenis Transaksi</span>
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 font-medium">
                                        <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                            <span>Status</span>
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 font-medium">
                                        <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                            <span>Transaksi</span>
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={7} className="py-16 text-center">
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                                <span className="ml-2 text-muted-foreground">Memuat riwayat transaksi...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan={7} className="py-16 text-center">
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
                                ) : filteredTransactions.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="py-16 text-center">
                                            <div className="text-muted-foreground">
                                                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                                                    <Search className="w-8 h-8 text-muted-foreground" />
                                                </div>
                                                <p className="font-medium">
                                                    {searchTerm ? "Tidak ada hasil pencarian" : "Tidak ada transaksi"}
                                                </p>
                                                <p className="text-sm mt-1">
                                                    {searchTerm 
                                                        ? `Tidak ditemukan transaksi dengan kata kunci "${searchTerm}"`
                                                        : "Riwayat transaksi sukuk Anda akan muncul di sini setelah Anda mulai berinvestasi"
                                                    }
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredTransactions.map((transaction, index) => (
                                        <tr key={transaction.tx_hash} className="border-b border-border hover:bg-accent/50">
                                            <td className="py-4 px-6 text-foreground text-sm">
                                                #{index + 1}
                                            </td>
                                            <td className="py-4 px-6 text-foreground font-medium">
                                                {formatAmount(transaction.amount)}
                                            </td>
                                            <td className="py-4 px-6 text-foreground text-sm">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                        {transaction.sukuk_code}
                                                    </span>
                                                    <span className="text-muted-foreground font-mono text-xs">
                                                        {transaction.sukuk_address.slice(0, 6)}...{transaction.sukuk_address.slice(-4)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-foreground text-sm">
                                                {formatDate(transaction.timestamp)}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    {getTransactionType(transaction.type)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Berhasil
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <a 
                                                    href={`https://etherscan.io/tx/${transaction.tx_hash}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center space-x-2 text-primary hover:text-primary/80 text-sm"
                                                >
                                                    <span className="font-mono">
                                                        {transaction.tx_hash.slice(0, 6)}...{transaction.tx_hash.slice(-4)}
                                                    </span>
                                                    <ExternalLink className="w-3 h-3" />
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 md:px-6 py-4 border-t border-border">
                        <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground text-sm whitespace-nowrap">Baris per halaman:</span>
                            <select 
                                value={limit} 
                                onChange={(e) => setLimit(Number(e.target.value))}
                                className="w-16 h-8 bg-background border border-border rounded-md text-sm text-foreground px-2"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <span className="text-muted-foreground text-sm whitespace-nowrap">
                                Menampilkan {filteredTransactions.length} dari {transactionHistory?.total_count || 0} transaksi
                            </span>
                            <div className="flex items-center space-x-1">
                                <button 
                                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-50 disabled:hover:bg-transparent"
                                    disabled
                                >
                                    <ChevronsLeft className="w-4 h-4" />
                                </button>
                                <button 
                                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-50 disabled:hover:bg-transparent"
                                    disabled
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button 
                                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-50 disabled:hover:bg-transparent"
                                    disabled
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                                <button 
                                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-50 disabled:hover:bg-transparent"
                                    disabled
                                >
                                    <ChevronsRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}