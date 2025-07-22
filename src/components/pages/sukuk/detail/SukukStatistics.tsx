"use client"

export function SukukStatistics() {
    return (
        <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-xl font-bold text-foreground mb-8">Ketentuan SR022-T5</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                    <div className="group">
                        <div className="flex justify-between items-center py-4 border-b border-border/50 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Periode Pembelian</span>
                            <span className="text-foreground font-semibold">16 Mei - 18 Jun 2025</span>
                        </div>
                    </div>
                    
                    <div className="group">
                        <div className="flex justify-between items-center py-4 border-b border-border/50 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Kuota Nasional</span>
                            <span className="text-foreground font-semibold">Rp7,000,000,000,000</span>
                        </div>
                    </div>
                    
                    <div className="group">
                        <div className="flex justify-between items-center py-4 border-b border-border/50 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Minimum Pembelian</span>
                            <span className="text-foreground font-semibold">Rp1,000,000</span>
                        </div>
                    </div>
                    
                    <div className="group">
                        <div className="flex justify-between items-center py-4 border-b border-border/50 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Maksimum Pembelian</span>
                            <span className="text-foreground font-semibold">Rp10,000,000,000</span>
                        </div>
                    </div>

                    <div className="group">
                        <div className="flex justify-between items-center py-4 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Tipe Kupon</span>
                            <div className="flex items-center space-x-2">
                                <span className="text-foreground font-semibold">Fixed Rate</span>
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
                                10 Jun 2030
                            </span>
                        </div>
                    </div>
                    
                    <div className="group">
                        <div className="flex justify-between items-center py-4 border-b border-border/50 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Penerimaan Kupon</span>
                            <span className="text-foreground font-semibold">Bulanan</span>
                        </div>
                    </div>
                    
                    <div className="group">
                        <div className="flex justify-between items-center py-4 border-b border-border/50 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Tanggal Bayar Kupon</span>
                            <span className="text-foreground font-semibold">10 Setiap Bulan</span>
                        </div>
                    </div>
                    
                    <div className="group">
                        <div className="flex justify-between items-center py-4 hover:border-primary/30 transition-colors">
                            <span className="text-muted-foreground font-medium">Kupon Pertama</span>
                            <span className="text-foreground font-semibold">11 Agustus 2025</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 