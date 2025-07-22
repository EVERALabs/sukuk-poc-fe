"use client"

export function SukukRiskMetrics() {
    return (
        <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Tentang SBN</h3>
            
            <div className="space-y-6">
                <div>
                    <p className="text-foreground text-base leading-relaxed">
                        SBN adalah Obligasi Negara yang ditujukan khusus untuk investor retail
                    </p>
                </div>
                
                <div>
                    <p className="text-foreground text-base leading-relaxed">
                        Pembayaran kupon dan pokok 100% aman dijamin oleh negara
                    </p>
                </div>
                
                <div>
                    <p className="text-foreground text-base leading-relaxed">
                        Pasti dapat kupon setiap bulan
                    </p>
                </div>
            </div>

            {/* Keamanan Investasi */}
            <div className="mt-8 pt-6 border-t border-border">
                <h4 className="text-md font-semibold text-foreground mb-4">Keamanan Investasi</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-green-800 font-medium text-sm">Jaminan Negara</span>
                        </div>
                        <div className="text-green-900 font-bold text-lg">100%</div>
                        <div className="text-green-700 text-xs">Dijamin penuh oleh negara</div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-blue-800 font-medium text-sm">Kepatuhan Syariah</span>
                        </div>
                        <div className="text-blue-900 font-bold text-lg">100%</div>
                        <div className="text-blue-700 text-xs">Sesuai prinsip syariah</div>
                    </div>
                </div>
            </div>

            {/* Risiko Investasi */}
            <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-md font-semibold text-foreground mb-4">Risiko Investasi</h4>
                
                <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start space-x-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>Risiko Pasar: Nilai investasi dapat berfluktuasi sesuai kondisi pasar</span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>Risiko Likuiditas: Kemudahan menjual kembali tergantung kondisi pasar</span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <span>Risiko Inflasi: Daya beli dapat terpengaruh inflasi</span>
                    </div>
                </div>
            </div>

            {/* Penting untuk Diketahui */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-2">
                    <div className="w-5 h-5 text-yellow-600 mt-0.5">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-yellow-800 font-medium text-sm">Penting untuk Diketahui</p>
                        <p className="text-yellow-700 text-xs mt-1">
                            Investasi ini telah sesuai dengan prinsip syariah dan mendapat jaminan penuh dari pemerintah Indonesia. 
                            Namun tetap pertimbangkan profil risiko Anda sebelum berinvestasi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
} 