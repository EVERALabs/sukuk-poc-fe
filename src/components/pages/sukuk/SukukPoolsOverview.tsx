"use client"

import { Copy } from "lucide-react"

export function SukukPoolsOverview() {
    return (
        <div className="mt-10 md:mt-20 px-4 md:px-6">
            {/* Portfolio Header */}
            <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-muted-foreground text-sm font-medium">Nilai Portfolio</h2>
                    <Copy className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline space-x-2 mb-1">
                    <h1 className="text-foreground text-3xl md:text-4xl font-bold">Rp0</h1>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                {/* Keuntungan */}
                <div className="bg-card rounded-xl p-3 md:p-4 border border-border">
                    <div className="text-muted-foreground text-sm font-medium mb-1 md:mb-2">Keuntungan</div>
                    <div className="text-foreground text-lg md:text-xl font-bold">Rp0</div>
                    <div className="text-muted-foreground text-xs mt-1">0.00%</div>
                </div>

                {/* Imbal Hasil */}
                <div className="bg-card rounded-xl p-3 md:p-4 border border-border">
                    <div className="text-muted-foreground text-sm font-medium mb-1 md:mb-2">Imbal Hasil</div>
                    <div className="text-foreground text-lg md:text-xl font-bold">0.00%</div>
                </div>
            </div>

            {/* Promotion Banner */}
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 md:p-4 mb-4 md:mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-1 pr-2">
                        <span className="text-xs flex-shrink-0">✨</span>
                        <span className="text-primary text-sm font-medium break-words">Pakai RDN Wallet, Gratis Biaya Pembayaran</span>
                    </div>
                    <button className="text-primary text-xs hover:underline flex-shrink-0">×</button>
                </div>
            </div>
        </div>
    )
}