"use client"

import { useState } from "react"
import { Search, CheckCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRedemptions } from "@/hooks/useApi"
import { formatCurrency } from "@/utils/api"
import { SukukManagerAbi } from "@/libs/contracts/abi/SukukManagerAbi"
import { SMART_CONTRACT_MANAGER_ADDRESS } from "@/libs/contracts/contractAddress"
import { RedemptionRequest } from "@/libs/api"
import { useWriteContract } from "wagmi"

export function RedeemRequestsTable() {
    const [searchTerm, setSearchTerm] = useState("")
    const { data: redemptionData, loading, error, refetch } = useRedemptions()
    const [processingIds, setProcessingIds] = useState<Set<string>>(new Set())

    const {
        writeContractAsync: writeContractApprove,
    } = useWriteContract();

    const filteredRequests = redemptionData?.redemptions.filter(request =>
        request.metadata.sukuk_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.metadata.sukuk_title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

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
            case 'requested':
                return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            case 'approved':
                return 'bg-green-100 text-green-800 border border-green-200'
            case 'rejected':
                return 'bg-red-100 text-red-800 border border-red-200'
            default:
                return 'bg-gray-100 text-gray-800 border border-gray-200'
        }
    }

    const handleApprove = async (request: RedemptionRequest) => {
        try {
            setProcessingIds(prev => new Set([...prev, request.request_id]))
            const tx = await writeContractApprove({
                address: SMART_CONTRACT_MANAGER_ADDRESS,
                abi: SukukManagerAbi,
                functionName: "approveRedemption",
                args: [request.sukuk_address as `0x${string}`, request.user as `0x${string}`],
            });

            await new Promise(resolve => setTimeout(resolve, 1000))
            console.log('Approved request:', request.request_id, tx)
            refetch()
        } catch (error) {
            console.error('Error approving request:', error)
        } finally {
            setProcessingIds(prev => {
                const newSet = new Set(prev)
                newSet.delete(request.request_id)
                return newSet
            })
        }
    }

    const handleReject = async (requestId: string) => {
        try {
            setProcessingIds(prev => new Set([...prev, requestId]))
            // TODO: Implement rejection logic with API
            await new Promise(resolve => setTimeout(resolve, 1000))
            console.log('Rejected request:', requestId)
            refetch()
        } catch (error) {
            console.error('Error rejecting request:', error)
        } finally {
            setProcessingIds(prev => {
                const newSet = new Set(prev)
                newSet.delete(requestId)
                return newSet
            })
        }
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-foreground">Permintaan Redeem</h2>
                    <p className="text-sm text-muted-foreground">Kelola permintaan redeem sukuk dari user</p>
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
                    <div className="text-2xl font-bold text-primary">{redemptionData?.total_count || 0}</div>
                    <div className="text-sm text-primary/70">Total Permintaan</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-700">
                        {redemptionData?.status_counts.requested || 0}
                    </div>
                    <div className="text-sm text-yellow-600">Menunggu</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-700">
                        {redemptionData?.status_counts.approved || 0}
                    </div>
                    <div className="text-sm text-green-600">Disetujui</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="text-2xl font-bold text-red-700">
                        {redemptionData?.status_counts.rejected || 0}
                    </div>
                    <div className="text-sm text-red-600">Ditolak</div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-muted-foreground text-sm border-b border-border">
                            <th className="text-left py-3 px-4 font-medium">User</th>
                            <th className="text-left py-3 px-4 font-medium">Sukuk</th>
                            <th className="text-left py-3 px-4 font-medium">Jumlah</th>
                            <th className="text-left py-3 px-4 font-medium">Tanggal Request</th>
                            <th className="text-left py-3 px-4 font-medium">Status</th>
                            <th className="text-left py-3 px-4 font-medium">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="py-8 text-center">
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                        <span className="ml-2 text-muted-foreground">Memuat data permintaan redeem...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={6} className="py-8 text-center">
                                    <div className="text-red-600">Error: {error}</div>
                                    <button
                                        onClick={refetch}
                                        className="mt-2 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                                    >
                                        Coba Lagi
                                    </button>
                                </td>
                            </tr>
                        ) : filteredRequests.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="py-8 text-center text-muted-foreground">
                                    {searchTerm ?
                                        `Tidak ditemukan permintaan dengan kata kunci "${searchTerm}"` :
                                        "Belum ada permintaan redeem"
                                    }
                                </td>
                            </tr>
                        ) : (
                            filteredRequests.map((request) => (
                                <tr key={request.request_id} className="border-b border-border hover:bg-accent/50">
                                    <td className="py-4 px-4">
                                        <div>
                                            <div className="text-xs text-muted-foreground font-mono">
                                                {request.user.slice(0, 8)}...{request.user.slice(-6)}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div>
                                            <div className="font-medium text-foreground">{request.metadata.sukuk_code}</div>
                                            <div className="text-xs text-muted-foreground max-w-xs truncate">
                                                {request.metadata.sukuk_title}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="font-medium text-foreground">{formatCurrency(Number(request.amount), 'IDR')}</div>
                                    </td>
                                    <td className="py-4 px-4 text-foreground text-sm">
                                        {formatDate(request.request_time)}
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(request.status)}`}>
                                            {request.status === 'requested' ? 'Menunggu' :
                                                request.status === 'approved' ? 'Disetujui' :
                                                    request.status === 'rejected' ? 'Ditolak' : request.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        {request.status === 'requested' && request.can_approve ? (
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleApprove(request)}
                                                    disabled={processingIds.has(request.request_id)}
                                                    className="px-3 py-1.5 text-xs font-medium bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors disabled:opacity-50"
                                                >
                                                    {processingIds.has(request.request_id) ? 'Processing...' : 'Approve'}
                                                </button>
                                                <button
                                                    onClick={() => handleReject(request.request_id)}
                                                    disabled={processingIds.has(request.request_id)}
                                                    className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                                                >
                                                    {processingIds.has(request.request_id) ? 'Processing...' : 'Reject'}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center text-muted-foreground text-xs">
                                                {request.status === 'approved' ? (
                                                    <>
                                                        <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
                                                        Telah disetujui
                                                    </>
                                                ) : request.status === 'rejected' ? (
                                                    <>
                                                        <XCircle className="w-3 h-3 mr-1 text-red-600" />
                                                        Telah ditolak
                                                    </>
                                                ) : null}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
} 