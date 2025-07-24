"use client"

import { useSukukPools } from "@/hooks/useApi"
import { formatCurrency, formatDate } from "@/utils/api"
import { useParams } from "next/navigation"

export function SukukStatistics() {
    const params = useParams()
    const sukukId = params.id as string
    const { data: sukukPools, loading, error } = useSukukPools()

    if (loading) {
        return (
            <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-2 text-muted-foreground">Memuat statistik sukuk...</span>
                </div>
            </div>
        )
    }

    if (error || !sukukPools) {
        return (
            <div className="bg-card rounded-xl p-6 border border-border">
                <div className="text-center py-8">
                    <p className="text-destructive">Gagal memuat statistik sukuk: {error}</p>
                </div>
            </div>
        )
    }

    const sukuk = sukukPools.find(pool => pool.id.toString() === sukukId)
    
    if (!sukuk) {
        return (
            <div className="bg-card rounded-xl p-6 border border-border">
                <div className="text-center py-8">
                    <p className="text-muted-foreground">Sukuk tidak ditemukan</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-8">Ketentuan {sukuk.sukuk_code}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    <div className="group">
                        <div className="flex justify-between items-center py-4 border-b border-border/50 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Periode Pembelian</span>
                            <span className="text-foreground font-semibold">{sukuk.periode_pembelian}</span>
                        </div>
                    </div>
                    
                    <div className="group">
                        <div className="flex justify-between items-center py-4 border-b border-border/50 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Kuota Nasional</span>
                            <span className="text-foreground font-semibold">{formatCurrency(sukuk.kuota_nasional, 'IDR')}</span>
                        </div>
                    </div>
                    
                    <div className="group">
                        <div className="flex justify-between items-center py-4 border-b border-border/50 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Minimum Pembelian</span>
                            <span className="text-foreground font-semibold">{formatCurrency(sukuk.minimum_pembelian, 'IDR')}</span>
                        </div>
                    </div>
                    
                    <div className="group">
                        <div className="flex justify-between items-center py-4 border-b border-border/50 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Maksimum Pembelian</span>
                            <span className="text-foreground font-semibold">{formatCurrency(sukuk.maksimum_pembelian, 'IDR')}</span>
                        </div>
                    </div>

                    <div className="group">
                        <div className="flex justify-between items-center py-4 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Tipe Kupon</span>
                            <div className="flex items-center space-x-2">
                                <span className="text-foreground font-semibold">{sukuk.tipe_kupon}</span>
                                <div className="w-4 h-4 text-muted-foreground hover:text-primary cursor-help transition-colors">
                                    <svg fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <div className="group">
                        <div className="flex justify-between items-center py-4 border-b border-border/50 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Jatuh Tempo</span>
                            <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">
                                {formatDate(sukuk.jatuh_tempo)}
                            </span>
                        </div>
                    </div>
                    
                    <div className="group">
                        <div className="flex justify-between items-center py-4 border-b border-border/50 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Penerimaan Kupon</span>
                            <span className="text-foreground font-semibold">{sukuk.penerimaan_kupon}</span>
                        </div>
                    </div>
                    
                    <div className="group">
                        <div className="flex justify-between items-center py-4 border-b border-border/50 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Tanggal Bayar Kupon</span>
                            <span className="text-foreground font-semibold">{sukuk.tanggal_bayar_kupon} Setiap Bulan</span>
                        </div>
                    </div>
                    
                    <div className="group">
                        <div className="flex justify-between items-center py-4 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Kupon Pertama</span>
                            <span className="text-foreground font-semibold">{formatDate(sukuk.kupon_pertama)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 