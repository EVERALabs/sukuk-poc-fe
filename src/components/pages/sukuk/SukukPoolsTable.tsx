"use client"

import { ArrowUpDown, Info } from "lucide-react"
import Link from "next/link"
import { useSukukPools } from "@/hooks/useApi"
import { formatCurrency } from "@/utils/api"

// Helper function to get status type and styling
const getStatusInfo = (status: string) => {
  switch (status.toLowerCase()) {
    case 'berlangsung':
      return {
        type: 'ongoing',
        className: 'bg-primary/20 text-primary border border-primary/30'
      }
    case 'mendatang':
      return {
        type: 'upcoming',
        className: 'bg-blue-50 text-blue-600 border border-blue-200'
      }
    case 'berakhir':
      return {
        type: 'ended',
        className: 'bg-gray-100 text-gray-800 border border-gray-200'
      }
    default:
      return {
        type: 'unknown',
        className: 'bg-muted/20 text-muted-foreground border border-muted/30'
      }
  }
}

// Helper function to get icon based on sukuk code
const getSukukIcon = (sukukCode: string) => {
  const code = sukukCode.toLowerCase()
  if (code.includes('swdi')) return { icon: '🎭', bg: 'bg-purple-100' }
  if (code.includes('sr')) return { icon: '⭐', bg: 'bg-blue-100' }
  if (code.includes('sbr')) return { icon: '💰', bg: 'bg-red-100' }
  if (code.includes('tfp')) return { icon: '📈', bg: 'bg-green-100' }
  if (code.includes('res')) return { icon: '🏢', bg: 'bg-indigo-100' }
  if (code.includes('crp')) return { icon: '🏭', bg: 'bg-orange-100' }
  return { icon: '📋', bg: 'bg-gray-100' }
}

export function SukukPoolsTable() {
    const { data: sukukPools, loading, error, refetch } = useSukukPools()

    if (loading) {
        return (
            <div className="bg-card rounded-lg border border-border p-4 md:p-8">
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-primary"></div>
                    <span className="ml-2 text-sm md:text-base text-muted-foreground">Memuat data sukuk...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-card rounded-lg border border-border p-4 md:p-8">
                <div className="text-center">
                    <p className="text-destructive mb-4">Gagal memuat data sukuk: {error}</p>
                    <button 
                        onClick={refetch}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        )
    }

    if (!sukukPools || sukukPools.length === 0) {
        return (
            <div className="bg-card rounded-lg border border-border p-4 md:p-8">
                <div className="text-center text-muted-foreground">
                    Tidak ada data sukuk yang tersedia
                </div>
            </div>
        )
    }

    return (
        <div className="px-4 md:px-6">
            {/* Produk Investasi Header */}
            <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className="flex items-center space-x-2">
                    <h2 className="text-foreground font-semibold">Produk Investasi</h2>
                </div>
                <Link href="/explore" className="text-primary text-sm font-medium hover:underline">
                    Explore
                </Link>
            </div>

            {/* Mobile View - Card Layout */}
            <div className="block md:hidden space-y-3">
                {sukukPools.map((pool) => {
                    const statusInfo = getStatusInfo(pool.status)
                    const iconInfo = getSukukIcon(pool.sukuk_code)
                    
                    return (
                        <Link href={`/sukuk/${pool.id}`} key={pool.id} className="block">
                            <div className="bg-card rounded-lg border border-border p-4 hover:border-primary/20 transition-colors">
                                <div className="flex items-start space-x-3 mb-3">
                                    <div className={`w-10 h-10 ${iconInfo.bg} rounded-lg flex items-center justify-center text-lg flex-shrink-0`}>
                                        {iconInfo.icon}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-semibold text-foreground truncate">{pool.sukuk_code}</div>
                                        <div className="text-muted-foreground text-sm truncate">{pool.sukuk_title}</div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.className} flex-shrink-0`}>
                                        {pool.status}
                                    </span>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <div className="text-xs text-muted-foreground mb-1">Tipe Kupon</div>
                                        <div className="text-sm font-medium">{pool.tipe_kupon}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-muted-foreground mb-1">Imbal Hasil</div>
                                        <div className="text-sm font-medium text-primary">{pool.imbal_hasil}%</div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="text-xs text-muted-foreground mb-1">Periode</div>
                                        <div className="text-sm">{pool.periode_pembelian}</div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="text-xs text-muted-foreground mb-1">Kuota</div>
                                        <div className="text-sm font-medium">{formatCurrency(pool.kuota_nasional, 'IDR')}</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            Min: {formatCurrency(pool.minimum_pembelian, 'IDR')}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            Max: {formatCurrency(pool.maksimum_pembelian, 'IDR')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* Desktop View - Table Layout */}
            <div className="hidden md:block bg-card rounded-lg border border-border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-muted-foreground text-sm border-b border-border">
                                <th className="text-left py-4 px-6 font-medium">Sukuk Pool</th>
                                <th className="text-left py-4 px-6 font-medium">
                                    <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                        <span>Tipe Kupon</span>
                                        <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th className="text-left py-4 px-6 font-medium">
                                    <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                        <span>Periode</span>
                                        <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th className="text-left py-4 px-6 font-medium">Status</th>
                                <th className="text-left py-4 px-6 font-medium">Kuota Nasional</th>
                                <th className="text-left py-4 px-6 font-medium">Imbal Hasil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sukukPools.map((pool) => {
                                const statusInfo = getStatusInfo(pool.status)
                                const iconInfo = getSukukIcon(pool.sukuk_code)
                                
                                return (
                                    <tr key={pool.id} className="border-b border-border hover:bg-accent/50">
                                        <td className="py-4 px-6">
                                            <Link href={`/sukuk/${pool.id}`} className="hover:text-primary transition-colors">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-10 h-10 ${iconInfo.bg} rounded-lg flex items-center justify-center text-lg`}>
                                                        {iconInfo.icon}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-foreground">{pool.sukuk_code}</div>
                                                        <div className="text-muted-foreground text-sm">{pool.sukuk_title}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-foreground font-medium">{pool.tipe_kupon}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-foreground text-sm">{pool.periode_pembelian}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}>
                                                {pool.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="space-y-2">
                                                <div className="text-xs font-medium text-foreground">
                                                    {formatCurrency(pool.kuota_nasional, 'IDR')}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Min: {formatCurrency(pool.minimum_pembelian, 'IDR')}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Max: {formatCurrency(pool.maksimum_pembelian, 'IDR')}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-primary font-bold text-lg">{pool.imbal_hasil}%</span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}