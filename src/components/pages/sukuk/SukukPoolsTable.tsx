"use client"

import { ArrowUpDown, Info } from "lucide-react"
import Link from "next/link"

const poolData = [
    {
        id: "sr022-t5",
        code: "SR022-T5",
        name: "Sukuk Ritel",
        couponType: "Fixed Rate",
        status: "Berlangsung",
        statusType: "ongoing",
        period: "16 Mei - 18 Jun 2025",
        returnRate: "6.55%",
        progress: 85.2,
        progressAmount: "Rp5,964,000,000,000",
        icon: "⭐",
        iconBg: "bg-purple-100"
    },
    {
        id: "sr023",
        code: "SR023",
        name: "Sukuk Ritel",
        couponType: "Fixed Rate",
        status: "Mendatang",
        statusType: "upcoming",
        period: "22 Agt - 12 Sep 2025",
        returnRate: null,
        progress: null,
        icon: "🔧",
        iconBg: "bg-purple-100"
    },
    {
        id: "sbr014-t2",
        code: "SBR014-T2",
        name: "Savings Bond Ritel",
        couponType: "Fixed Rate",
        status: "Berlangsung",
        statusType: "ongoing",
        period: "14 Jul - 07 Agt 2025",
        returnRate: "6.25%",
        progress: 73.8,
        progressAmount: "Rp7,381,168,000,000",
        icon: "💰",
        iconBg: "bg-red-100"
    },
    {
        id: "trade-finance-pool",
        code: "TFP001",
        name: "Trade Finance Pool",
        couponType: "Variable Rate",
        status: "Berlangsung",
        statusType: "ongoing",
        period: "15 Mar - 15 Sep 2025",
        returnRate: "8.5%",
        progress: 45.2,
        progressAmount: "Rp2,260,000,000,000",
        icon: "📈",
        iconBg: "bg-blue-100"
    },
    {
        id: "real-estate-sukuk",
        code: "RES002",
        name: "Real Estate Sukuk Pool",
        couponType: "Fixed Rate",
        status: "Mendatang",
        statusType: "upcoming",
        period: "01 Jun - 30 Nov 2025",
        returnRate: null,
        progress: null,
        icon: "🏢",
        iconBg: "bg-green-100"
    },
    {
        id: "sr019",
        code: "SR019",
        name: "Sukuk Ritel Seri SR019",
        couponType: "Fixed Rate",
        status: "Berakhir",
        statusType: "ended",
        period: "10 Jan - 10 Jul 2024",
        returnRate: "5.70%",
        progress: 100,
        progressAmount: "Rp15,500,000,000,000",
        icon: "✅",
        iconBg: "bg-gray-100"
    },
    {
        id: "sr018",
        code: "SR018",
        name: "Sukuk Ritel Seri SR018",
        couponType: "Fixed Rate",
        status: "Berakhir",
        statusType: "ended",
        period: "01 Nov - 01 May 2024",
        returnRate: "5.90%",
        progress: 100,
        progressAmount: "Rp12,300,000,000,000",
        icon: "📋",
        iconBg: "bg-gray-100"
    },
    {
        id: "corporate-sukuk",
        code: "CRP004",
        name: "Corporate Sukuk Pool",
        couponType: "Variable Rate",
        status: "Berlangsung",
        statusType: "ongoing",
        period: "10 May - 10 Nov 2025",
        returnRate: "8.75%",
        progress: 28.9,
        progressAmount: "Rp1,445,000,000,000",
        icon: "🏭",
        iconBg: "bg-indigo-100"
    }
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
                                <th className="text-left py-4 px-6 font-medium">
                                    <div className="flex items-center space-x-1">
                                        <span>Status</span>
                                        <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                                    </div>
                                </th>
                                <th className="text-left py-4 px-6 font-medium">Progress</th>
                                <th className="text-left py-4 px-6 font-medium">Imbal Hasil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {poolData.map((pool, index) => (
                                <tr key={index} className="border-b border-border hover:bg-accent/50">
                                    <td className="py-4 px-6">
                                        <Link href={`/sukuk/${pool.id}`} className="hover:text-primary transition-colors">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-10 h-10 ${pool.iconBg} rounded-lg flex items-center justify-center text-lg`}>
                                                    {pool.icon}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-foreground">{pool.code}</div>
                                                    <div className="text-muted-foreground text-sm">{pool.name}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6">
                                        {pool.couponType ? (
                                            <span className="text-foreground font-medium">{pool.couponType}</span>
                                        ) : (
                                            <span className="text-muted-foreground text-sm">-</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-foreground text-sm">{pool.period}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                pool.statusType === "ongoing"
                                                    ? "bg-primary/20 text-primary border border-primary/30"
                                                    : pool.statusType === "upcoming"
                                                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                                                    : pool.statusType === "ended"
                                                    ? "bg-gray-100 text-gray-800 border border-gray-200"
                                                    : "bg-muted/20 text-muted-foreground border border-muted/30"
                                            }`}
                                        >
                                            {pool.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        {pool.progress !== null ? (
                                            <div className="space-y-2 min-w-[200px]">
                                                <div className="w-full bg-muted rounded-full h-2">
                                                    <div 
                                                        className={`h-2 rounded-full transition-all duration-300 ${
                                                            pool.statusType === "ended" ? "bg-gray-400" : "bg-primary"
                                                        }`}
                                                        style={{ width: `${pool.progress}%` }}
                                                    ></div>
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {pool.statusType === "ended" ? "Total Terjual:" : "Kuota Nasional Tersisa:"} {pool.progress}%
                                                </div>
                                                <div className="text-xs font-medium text-foreground">
                                                    {pool.progressAmount}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground text-sm">-</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        {pool.returnRate ? (
                                            <span className="text-primary font-bold text-lg">{pool.returnRate}</span>
                                        ) : (
                                            <span className="text-muted-foreground text-sm">-</span>
                                        )}
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