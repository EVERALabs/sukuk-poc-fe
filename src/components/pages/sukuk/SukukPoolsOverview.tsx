"use client"

export function SukukPoolsOverview() {
    return (
        <div className="mt-20">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl p-6 border border-primary/30">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-primary text-sm font-medium">Total Investasi</h3>
                        <span className="text-primary text-lg">IDR</span>
                    </div>
                    <p className="text-foreground text-3xl font-bold">Rp 12.000.000.000.000</p>
                </div>

                <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl p-6 border border-primary/30">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-primary text-sm font-medium">Total Keuntungan</h3>
                        <span className="text-primary text-lg">IDR</span>
                    </div>
                    <p className="text-foreground text-3xl font-bold">Rp 5.000.000</p>
                </div>
            </div>
        </div>
    )
}