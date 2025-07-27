"use client"

import { useState } from "react"
import { Search, Edit, Trash2, Eye, Plus, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { PrimaryButton } from "@/components/ui/button"
import { AddSukukForm } from "./AddSukukForm"

// Mock data untuk sukuk yang ada
const mockSukukData = [
    {
        id: 1,
        sukuk_code: "SR022-T5",
        sukuk_title: "Sukuk Ritel Seri SR022-T5",
        status: "berlangsung",
        imbal_hasil: "6.55",
        tenor: "5 Tahun",
        kuota_nasional: 7000000000000,
        minimum_pembelian: 1000000,
        maksimum_pembelian: 10000000000,
        periode_pembelian: "16 Mei - 18 Jun 2025",
        jatuh_tempo: "2030-06-10",
        tipe_kupon: "Fixed Rate",
        created_at: "2025-05-16T00:00:00Z"
    },
    {
        id: 2,
        sukuk_code: "SBR014-T2",
        sukuk_title: "Savings Bond Ritel Seri SBR014-T2",
        status: "berlangsung",
        imbal_hasil: "6.25",
        tenor: "3 Bulan",
        kuota_nasional: 10000000000000,
        minimum_pembelian: 1000000,
        maksimum_pembelian: 300000000,
        periode_pembelian: "14 Jul - 07 Agt 2025",
        jatuh_tempo: "2025-08-07",
        tipe_kupon: "Fixed Rate",
        created_at: "2025-07-14T00:00:00Z"
    },
    {
        id: 3,
        sukuk_code: "SWDI",
        sukuk_title: "Sukuk Wayang Digital Indonesia",
        status: "berlangsung",
        imbal_hasil: "9.2",
        tenor: "2 Tahun",
        kuota_nasional: 180000000,
        minimum_pembelian: 1500000,
        maksimum_pembelian: 90000000,
        periode_pembelian: "1 Juli - 31 Agustus 2025",
        jatuh_tempo: "2027-08-15",
        tipe_kupon: "Ijarah",
        created_at: "2025-07-23T20:02:57Z"
    }
]

export function SukukDataTable() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    
    const filteredData = mockSukukData.filter(sukuk => 
        sukuk.sukuk_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sukuk.sukuk_title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount)
    }

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
                            <Plus className="w-4 h-4" />
                            <span>Tambah Sukuk</span>
                        </PrimaryButton>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                        <div className="text-2xl font-bold text-primary">{mockSukukData.length}</div>
                        <div className="text-sm text-primary/70">Total Sukuk</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-2xl font-bold text-green-700">
                            {mockSukukData.filter(s => s.status === 'berlangsung').length}
                        </div>
                        <div className="text-sm text-green-600">Aktif</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-2xl font-bold text-blue-700">
                            {mockSukukData.filter(s => s.status === 'mendatang').length}
                        </div>
                        <div className="text-sm text-blue-600">Mendatang</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="text-2xl font-bold text-gray-700">
                            {mockSukukData.filter(s => s.status === 'berakhir').length}
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
                            {filteredData.map((sukuk) => (
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
                                            <div className="font-medium text-foreground">{formatCurrency(sukuk.kuota_nasional)}</div>
                                            <div className="text-xs text-muted-foreground">
                                                Min: {formatCurrency(sukuk.minimum_pembelian)}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-foreground text-sm">
                                        {formatDate(sukuk.jatuh_tempo)}
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center space-x-2">
                                            <button className="p-1 text-blue-600 hover:bg-blue-100 rounded transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-orange-600 hover:bg-orange-100 rounded transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredData.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-muted-foreground">
                            {searchTerm ? 
                                `Tidak ditemukan sukuk dengan kata kunci "${searchTerm}"` : 
                                "Belum ada data sukuk"
                            }
                        </div>
                    </div>
                )}
            </div>

            {/* Add Sukuk Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-background rounded-xl border border-border max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
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
                        
                        {/* Modal Content */}
                        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                            <AddSukukForm onClose={() => setIsAddModalOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
} 