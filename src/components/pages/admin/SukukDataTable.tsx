"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { PrimaryButton } from "@/components/ui/button"
import { AddSukukForm } from "./AddSukukForm"
import { useSukukPools } from "@/hooks/useApi"
import { formatCurrency } from "@/utils/api"

export function SukukDataTable() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const { data: sukukPools, loading, error, refetch } = useSukukPools()
    
    const filteredData = sukukPools?.filter(sukuk => 
        sukuk.sukuk_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sukuk.sukuk_title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'berlangsung':
                return 'bg-green-100 text-green-800 border border-green-200'
            case 'mendatang':
                return 'bg-blue-100 text-blue-800 border border-blue-200'
            case 'berakhir':
                return 'bg-gray-100 text-gray-800 border border-gray-200'
            default:
                return 'bg-gray-100 text-gray-800 border border-gray-200'
        }
    }

    const handleTakeSnapshot = async (sukukId: number) => {
        // TODO: Implement snapshot functionality
        console.log('Taking snapshot for sukuk:', sukukId)
    }

    const handleDistributeYield = async (sukukId: number) => {
        // TODO: Implement yield distribution
        console.log('Distributing yield for sukuk:', sukukId)
    }

    return (
        <>
            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Data Sukuk</h2>
                        <p className="text-sm text-muted-foreground">Kelola semua data sukuk yang tersedia</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Cari sukuk..."
                                className="pl-10 w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <PrimaryButton
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center space-x-2"
                        >
                            <span>Tambah Sukuk</span>
                        </PrimaryButton>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                        <div className="text-2xl font-bold text-primary">{sukukPools?.length || 0}</div>
                        <div className="text-sm text-primary/70">Total Sukuk</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-700">
                            {sukukPools?.filter(s => s.status.toLowerCase() === 'berlangsung')?.length || 0}
                        </div>
                        <div className="text-sm text-green-600">Aktif</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-700">
                            {sukukPools?.filter(s => s.status.toLowerCase() === 'mendatang')?.length || 0}
                        </div>
                        <div className="text-sm text-blue-600">Mendatang</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-gray-700">
                            {sukukPools?.filter(s => s.status.toLowerCase() === 'berakhir')?.length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Berakhir</div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-muted-foreground text-sm border-b border-border">
                                <th className="text-left py-3 px-4 font-medium">Kode Sukuk</th>
                                <th className="text-left py-3 px-4 font-medium">Nama</th>
                                <th className="text-left py-3 px-4 font-medium">Status</th>
                                <th className="text-left py-3 px-4 font-medium">Imbal Hasil</th>
                                <th className="text-left py-3 px-4 font-medium">Tenor</th>
                                <th className="text-left py-3 px-4 font-medium">Kuota</th>
                                <th className="text-left py-3 px-4 font-medium">Jatuh Tempo</th>
                                <th className="text-left py-3 px-4 font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center">
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                            <span className="ml-2 text-muted-foreground">Memuat data sukuk...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center">
                                        <div className="text-red-600">Error: {error}</div>
                                        <button 
                                            onClick={refetch}
                                            className="mt-2 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                                        >
                                            Coba Lagi
                                        </button>
                                    </td>
                                </tr>
                            ) : filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center text-muted-foreground">
                                        {searchTerm ? `Tidak ditemukan sukuk dengan kata kunci "${searchTerm}"` : "Belum ada data sukuk"}
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((sukuk) => (
                                    <tr key={sukuk.id} className="border-b border-border hover:bg-accent/50">
                                        <td className="py-4 px-4">
                                            <div className="font-medium text-foreground">{sukuk.sukuk_code}</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="text-foreground max-w-xs">
                                                <div className="font-medium truncate">{sukuk.sukuk_title}</div>
                                                <div className="text-xs text-muted-foreground">{sukuk.tipe_kupon}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(sukuk.status)}`}>
                                                {sukuk.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="font-semibold text-green-600">{sukuk.imbal_hasil}%</span>
                                        </td>
                                        <td className="py-4 px-4 text-foreground">{sukuk.tenor}</td>
                                        <td className="py-4 px-4">
                                            <div className="text-sm">
                                                <div className="font-medium text-foreground">{formatCurrency(sukuk.kuota_nasional, 'IDR')}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    Min: {formatCurrency(sukuk.minimum_pembelian, 'IDR')}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-foreground text-sm">
                                            {formatDate(sukuk.jatuh_tempo)}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center space-x-2">
                                                <button 
                                                    onClick={() => handleTakeSnapshot(sukuk.id)}
                                                    className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                >
                                                    Take Snapshot
                                                </button>
                                                <button 
                                                    onClick={() => handleDistributeYield(sukuk.id)}
                                                    className="px-3 py-1.5 text-xs font-medium bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                                >
                                                    Distribute Yield
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Sukuk Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-background rounded-xl border border-border max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div>
                                <h2 className="text-xl font-bold text-foreground">Tambah Sukuk Baru</h2>
                                <p className="text-sm text-muted-foreground">Lengkapi form berikut untuk menambahkan sukuk baru ke sistem</p>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="p-2 hover:bg-accent rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>
                        
                        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                            <AddSukukForm onClose={() => setIsAddModalOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
} 