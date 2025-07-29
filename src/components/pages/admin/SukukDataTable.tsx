"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { PrimaryButton } from "@/components/ui/button"
import { AddSukukForm } from "./AddSukukForm"
import { useSukukPools } from "@/hooks/useApi"
import { formatCurrency } from "@/utils/api"
import { SMART_CONTRACT_IDRX_ADDRESS, SMART_CONTRACT_MANAGER_ADDRESS } from "@/libs/contracts/contractAddress"
import { SukukManagerAbi } from "@/libs/contracts/abi/SukukManagerAbi"
import { useWriteContract } from "wagmi"
import { apiClient } from "@/libs/api"

export function SukukDataTable() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isTakingSnapshot, setIsTakingSnapshot] = useState(false)
    const [snapshotError, setSnapshotError] = useState<string | null>(null)
    const [isDistributeModalOpen, setIsDistributeModalOpen] = useState(false)
    const [distributeAmount, setDistributeAmount] = useState("")
    const [selectedSukukAddress, setSelectedSukukAddress] = useState<string | null>(null)
    const [isDistributing, setIsDistributing] = useState(false)
    const { data: sukukPools, loading, error, refetch } = useSukukPools()

    const {
        writeContractAsync: writeContractTakeSnapshot,
        status: statusTakeSnapshot,
    } = useWriteContract();

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

    const handleTakeSnapshot = async (sukukAddress: string) => {
        if (isTakingSnapshot) return;

        setIsTakingSnapshot(true);
        setSnapshotError(null);

        try {
            console.log('Taking snapshot for sukuk:', sukukAddress)

            const tx = await writeContractTakeSnapshot({
                address: SMART_CONTRACT_MANAGER_ADDRESS,
                abi: SukukManagerAbi,
                functionName: "takeSnapshot",
                args: [sukukAddress as `0x${string}`],
            });

            console.log('Taking snapshot tx hash:', tx)

            return tx; // Return the transaction hash

        } catch (error) {
            console.error('Error taking snapshot:', error);
            setSnapshotError(error instanceof Error ? error.message : 'Failed to take snapshot');
            throw error; // Re-throw the error so calling code can handle it
        } finally {
            setIsTakingSnapshot(false);
        }
    }

    const handleDistributeYield = (sukukAddress: string) => {
        setSelectedSukukAddress(sukukAddress);
        setDistributeAmount("");
        setIsDistributeModalOpen(true);
    }

    const executeDistributeYield = async () => {
        if (!selectedSukukAddress || !distributeAmount) {
            console.error('Missing sukuk address or distribute amount');
            return;
        }

        setIsDistributing(true);

        try {
            console.log('Distributing yield for sukuk:', selectedSukukAddress);

            // Get the latest snapshot ID from the API
            const { data: snapshotsData } = await apiClient.getSukukSnapshots(selectedSukukAddress);
            const latestSnapshot = snapshotsData.snapshots[0]; // Get the most recent snapshot

            if (!latestSnapshot) {
                console.error('No snapshots found for this sukuk');
                return;
            }

            const snapshotId = BigInt(latestSnapshot.id);
            const amount = BigInt(distributeAmount);
            console.log('Using snapshot ID:', snapshotId.toString());
            console.log('Distribute amount:', amount.toString());

            const tx = await writeContractTakeSnapshot({
                address: SMART_CONTRACT_MANAGER_ADDRESS,
                abi: SukukManagerAbi,
                functionName: "distributeYieldFromSnapshot",
                args: [selectedSukukAddress as `0x${string}`, snapshotId, amount * 100n, SMART_CONTRACT_IDRX_ADDRESS],
            });

            console.log('Distribute yield transaction hash:', tx);

            // Close modal and reset state
            setIsDistributeModalOpen(false);
            setDistributeAmount("");
            setSelectedSukukAddress(null);
        } catch (error) {
            console.error('Error distributing yield:', error);
        } finally {
            setIsDistributing(false);
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

                {/* Error Display */}
                {snapshotError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-red-500">⚠️</span>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Snapshot Error</h3>
                                <div className="mt-1 text-sm text-red-700">{snapshotError}</div>
                            </div>
                            <div className="ml-auto pl-3">
                                <button
                                    onClick={() => setSnapshotError(null)}
                                    className="text-red-400 hover:text-red-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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
                                                    onClick={async () => {
                                                        try {
                                                            const result = await handleTakeSnapshot(sukuk.contract_address);
                                                            if (result) {
                                                                console.log('Snapshot completed successfully:', result);
                                                            }
                                                        } catch (error) {
                                                            console.error('Snapshot failed:', error);
                                                        }
                                                    }}
                                                    disabled={isTakingSnapshot || statusTakeSnapshot === "pending"}
                                                    className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                                                >
                                                    {isTakingSnapshot || statusTakeSnapshot === "pending" ? "Processing..." : "Take Snapshot"}
                                                </button>
                                                <button
                                                    onClick={() => handleDistributeYield(sukuk.contract_address)}
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

            {/* Distribute Yield Modal */}
            {isDistributeModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-background rounded-xl border border-border max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div>
                                <h2 className="text-xl font-bold text-foreground">Distribute Yield</h2>
                                <p className="text-sm text-muted-foreground">Masukkan total keuntungan yang akan dibagikan</p>
                            </div>
                            <button
                                onClick={() => setIsDistributeModalOpen(false)}
                                className="p-2 hover:bg-accent rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Total Keuntungan yang Dibagikan
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="Masukkan jumlah keuntungan"
                                        value={distributeAmount}
                                        onChange={(e) => setDistributeAmount(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                <div className="flex space-x-3 pt-4">
                                    <button
                                        onClick={() => setIsDistributeModalOpen(false)}
                                        className="flex-1 px-4 py-2 text-sm font-medium text-muted-foreground bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={executeDistributeYield}
                                        disabled={!distributeAmount || isDistributing}
                                        className="flex-1 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed rounded-lg transition-colors"
                                    >
                                        {isDistributing ? "Memproses..." : "Distribute"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
} 