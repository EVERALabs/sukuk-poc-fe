"use client"

import { useState } from "react"
import { Search, CheckCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { PrimaryButton } from "@/components/ui/button"

// Mock data untuk permintaan redeem
const mockRedeemRequests = [
    {
        id: 1,
        user_name: "Ahmad Rizki",
        user_address: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
        sukuk_code: "SR022-T5",
        sukuk_title: "Sukuk Ritel Seri SR022-T5",
        request_type: "redeem",
        amount: 50000000,
        yield_amount: 3500000,
        request_date: "2025-01-15T10:30:00Z",
        status: "pending",
        tx_hash: "0x1234567890abcdef1234567890abcdef12345678",
        reason: "Butuh dana untuk kebutuhan mendesak"
    },
    {
        id: 2,
        user_name: "Siti Nurhaliza",
        user_address: "0x8f3b2c1a5d6e9f4c7b8a9e2d5c8f1a4b7e9c2f5a",
        sukuk_code: "SBR014-T2",
        sukuk_title: "Savings Bond Ritel Seri SBR014-T2",
        request_type: "claim_yield",
        amount: 30000000,
        yield_amount: 1875000,
        request_date: "2025-01-14T14:15:00Z",
        status: "pending",
        tx_hash: "0xabcdef1234567890abcdef1234567890abcdef12",
        reason: "Klaim hasil kupon reguler"
    },
    {
        id: 3,
        user_name: "Budi Santoso",
        user_address: "0x9e2a7f4b8c1d6e5a9f2b5c8e1a4f7b9c2e5a8d1c",
        sukuk_code: "SWDI",
        sukuk_title: "Sukuk Wayang Digital Indonesia",
        request_type: "redeem",
        amount: 25000000,
        yield_amount: 2125000,
        request_date: "2025-01-13T09:45:00Z",
        status: "approved",
        tx_hash: "0x567890abcdef1234567890abcdef1234567890ab",
        reason: "Investasi di instrumen lain"
    },
    {
        id: 4,
        user_name: "Diana Putri",
        user_address: "0x6b4e9a2f5c8b1e4a7d0c5f8a1e4b7a0d5c8e1a4b",
        sukuk_code: "SR022-T5",
        sukuk_title: "Sukuk Ritel Seri SR022-T5",
        request_type: "claim_yield",
        amount: 75000000,
        yield_amount: 5250000,
        request_date: "2025-01-12T16:20:00Z",
        status: "rejected",
        tx_hash: "0xdef1234567890abcdef1234567890abcdef12345",
        reason: "Klaim kupon semester"
    }
]

export function RedeemRequestsTable() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
    const [processingIds, setProcessingIds] = useState<Set<number>>(new Set())
    
    const filteredRequests = mockRedeemRequests.filter(request => {
        const matchesSearch = request.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            request.sukuk_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            request.user_address.toLowerCase().includes(searchTerm.toLowerCase())
        
        const matchesStatus = statusFilter === "all" || request.status === statusFilter
        
        return matchesSearch && matchesStatus
    })

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
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            case 'approved':
                return 'bg-green-100 text-green-800 border border-green-200'
            case 'rejected':
                return 'bg-red-100 text-red-800 border border-red-200'
            default:
                return 'bg-gray-100 text-gray-800 border border-gray-200'
        }
    }

    const getRequestTypeLabel = (type: string) => {
        switch (type) {
            case 'redeem':
                return 'Redeem Sukuk'
            case 'claim_yield':
                return 'Klaim Yield'
            default:
                return type
        }
    }

    const handleApprove = async (requestId: number) => {
        setProcessingIds(prev => new Set(prev).add(requestId))
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            console.log(`Approved request ${requestId}`)
            // In real app, update the request status in state or refetch data
        } catch (error) {
            console.error('Failed to approve request:', error)
        } finally {
            setProcessingIds(prev => {
                const newSet = new Set(prev)
                newSet.delete(requestId)
                return newSet
            })
        }
    }

    const handleReject = async (requestId: number) => {
        setProcessingIds(prev => new Set(prev).add(requestId))
        
        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            console.log(`Rejected request ${requestId}`)
            // In real app, update the request status in state or refetch data
        } catch (error) {
            console.error('Failed to reject request:', error)
        } finally {
            setProcessingIds(prev => {
                const newSet = new Set(prev)
                newSet.delete(requestId)
                return newSet
            })
        }
    }

    const pendingCount = mockRedeemRequests.filter(r => r.status === 'pending').length
    const approvedCount = mockRedeemRequests.filter(r => r.status === 'approved').length
    const rejectedCount = mockRedeemRequests.filter(r => r.status === 'rejected').length

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-foreground">Permintaan Redeem & Claim Yield</h2>
                    <p className="text-sm text-muted-foreground">Kelola permintaan redeem sukuk dan klaim yield dari user</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Cari user atau sukuk..."
                            className="pl-10 w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <div className="text-2xl font-bold text-primary">{mockRedeemRequests.length}</div>
                    <div className="text-sm text-primary/70">Total Permintaan</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-700">{pendingCount}</div>
                    <div className="text-sm text-yellow-600">Menunggu</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-700">{approvedCount}</div>
                    <div className="text-sm text-green-600">Disetujui</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-700">{rejectedCount}</div>
                    <div className="text-sm text-red-600">Ditolak</div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-2 mb-6">
                {[
                    { key: "all", label: "Semua" },
                    { key: "pending", label: "Menunggu" },
                    { key: "approved", label: "Disetujui" },
                    { key: "rejected", label: "Ditolak" }
                ].map((filter) => (
                    <button
                        key={filter.key}
                        onClick={() => setStatusFilter(filter.key as "all" | "pending" | "approved" | "rejected")}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                            statusFilter === filter.key
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-muted-foreground text-sm border-b border-border">
                            <th className="text-left py-3 px-4 font-medium">User</th>
                            <th className="text-left py-3 px-4 font-medium">Sukuk</th>
                            <th className="text-left py-3 px-4 font-medium">Jenis</th>
                            <th className="text-left py-3 px-4 font-medium">Jumlah</th>
                            <th className="text-left py-3 px-4 font-medium">Yield</th>
                            <th className="text-left py-3 px-4 font-medium">Tanggal</th>
                            <th className="text-left py-3 px-4 font-medium">Status</th>
                            <th className="text-left py-3 px-4 font-medium">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((request) => (
                            <tr key={request.id} className="border-b border-border hover:bg-accent/50">
                                <td className="py-4 px-4">
                                    <div>
                                        <div className="font-medium text-foreground">{request.user_name}</div>
                                        <div className="text-xs text-muted-foreground font-mono">
                                            {request.user_address.slice(0, 8)}...{request.user_address.slice(-6)}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <div>
                                        <div className="font-medium text-foreground">{request.sukuk_code}</div>
                                        <div className="text-xs text-muted-foreground max-w-xs truncate">
                                            {request.sukuk_title}
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        request.request_type === 'redeem' 
                                            ? 'bg-orange-100 text-orange-800 border border-orange-200'
                                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                                    }`}>
                                        {getRequestTypeLabel(request.request_type)}
                                    </span>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="font-medium text-foreground">{formatCurrency(request.amount)}</div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="font-medium text-green-600">{formatCurrency(request.yield_amount)}</div>
                                </td>
                                <td className="py-4 px-4 text-foreground text-sm">
                                    {formatDate(request.request_date)}
                                </td>
                                <td className="py-4 px-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(request.status)}`}>
                                        {request.status === 'pending' ? 'Menunggu' :
                                         request.status === 'approved' ? 'Disetujui' : 
                                         request.status === 'rejected' ? 'Ditolak' : request.status}
                                    </span>
                                </td>
                                <td className="py-4 px-4">
                                    {request.status === 'pending' ? (
                                        <div className="flex items-center space-x-2">
                                            <PrimaryButton
                                                onClick={() => handleApprove(request.id)}
                                                disabled={processingIds.has(request.id)}
                                                isLoading={processingIds.has(request.id)}
                                                className="px-3 py-1 text-xs bg-green-600 hover:bg-green-700"
                                            >
                                                <CheckCircle className="w-3 h-3 mr-1" />
                                                Approve
                                            </PrimaryButton>
                                            <button
                                                onClick={() => handleReject(request.id)}
                                                disabled={processingIds.has(request.id)}
                                                className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                            >
                                                <XCircle className="w-3 h-3 mr-1" />
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-muted-foreground text-xs">
                                            {request.status === 'approved' ? (
                                                <>
                                                    <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
                                                    Telah disetujui
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="w-3 h-3 mr-1 text-red-600" />
                                                    Telah ditolak
                                                </>
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredRequests.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-muted-foreground">
                        {searchTerm ? 
                            `Tidak ditemukan permintaan dengan kata kunci "${searchTerm}"` : 
                            "Belum ada permintaan redeem"
                        }
                    </div>
                </div>
            )}
        </div>
    )
} 