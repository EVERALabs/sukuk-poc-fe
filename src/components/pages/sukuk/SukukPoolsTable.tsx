"use client"

import { ArrowUpDown, Info } from "lucide-react"
import Link from "next/link"

const poolData = [
    {
        name: "FinCards Receivables Pool Amoy",
        status: "Closed",
        tvl: "10M",
        apy: "13%",
        statusType: "closed",
        id: "fincards-receivables-pool-amoy",
    },
    {
        name: "Cashflow Based Financing",
        status: "Closed",
        tvl: "10M",
        apy: "13%",
        statusType: "closed",
        id: "cashflow-based-financing",
    },
    {
        name: "Revenue Based Financing Amoy",
        status: "Closed",
        tvl: "8M",
        apy: "13%",
        statusType: "closed",
        id: "revenue-based-financing-amoy",
    },
    {
        name: "Trade Finance Pool",
        status: "Active",
        tvl: "15M",
        apy: "11%",
        statusType: "active",
        id: "trade-finance-pool",
    },
    {
        name: "Real Estate Sukuk Pool",
        status: "Active",
        tvl: "25M",
        apy: "9%",
        statusType: "active",
        id: "real-estate-sukuk-pool",
    },
    {
        name: "Infrastructure Financing",
        status: "Revoked",
        tvl: "5M",
        apy: "8%",
        statusType: "revoked",
        id: "infrastructure-financing",
    },
]

export function SukukPoolsTable() {
    return (
        <div>
            {/* Pools Table */}
            <div className="bg-card rounded-lg border border-border">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-muted-foreground text-sm border-b border-border">
                                <th className="text-left py-4 px-6 font-medium">Pool Name</th>
                                <th className="text-left py-4 px-6 font-medium">
                                    <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                        <span>TVL</span>
                                        <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th className="text-left py-4 px-6 font-medium">
                                    <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                        <span>APY</span>
                                        <ArrowUpDown className="w-3 h-3" />
                                    </div>
                                </th>
                                <th className="text-left py-4 px-6 font-medium">
                                    <div className="flex items-center space-x-1">
                                        <span>Status</span>
                                        <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                                    </div>
                                </th>
                                <th className="text-left py-4 px-6 font-medium">Tranches</th>
                                <th className="text-left py-4 px-6 font-medium">Chain</th>
                            </tr>
                        </thead>
                        <tbody>
                            {poolData.map((pool, index) => (
                                <tr key={index} className="border-b border-border hover:bg-accent/50">
                                    <td className="py-4 px-6">
                                        <Link href={`/pro/pool/${pool.id}`} className="hover:text-primary transition-colors">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                                                    <span className="text-primary-foreground text-sm font-bold">{pool.name.split(" ")[0].charAt(0)}</span>
                                                </div>
                                                <div>
                                                    <div className="font-medium text-foreground">{pool.name}</div>
                                                    <div className="text-muted-foreground text-sm">{pool.status}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-foreground font-medium">{pool.tvl}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-primary font-medium">{pool.apy}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${pool.statusType === "active"
                                                ? "bg-primary/20 text-primary border border-primary/30"
                                                : pool.statusType === "closed"
                                                    ? "bg-muted/20 text-muted-foreground border border-muted/30"
                                                    : "bg-destructive/20 text-destructive border border-destructive/30"
                                                }`}
                                        >
                                            {pool.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="w-8 h-8 bg-primary/30 rounded-full border-2 border-primary flex items-center justify-center">
                                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-2 text-muted-foreground">
                                            <div className="w-4 h-4 bg-primary rounded-sm"></div>
                                            <span className="text-sm">Polygon Amoy</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}