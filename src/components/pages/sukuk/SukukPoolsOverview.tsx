"use client"

export function SukukPoolsOverview() {
    return (
        <div className="mt-20">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl p-6 border border-primary/30">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-muted-foreground text-sm font-medium">Total Value Locked</h3>
                        <span className="text-primary text-lg">$</span>
                    </div>
                    <p className="text-foreground text-3xl font-bold">12M USD</p>
                </div>

                <div className="bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl p-6 border border-primary/30">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-muted-foreground text-sm font-medium">Total Interest Earned</h3>
                        <span className="text-primary text-lg">$</span>
                    </div>
                    <p className="text-foreground text-3xl font-bold">0.00 USD</p>
                </div>
            </div>
        </div>
    )
}