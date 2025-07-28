"use client"

import { useState } from "react"
import { SukukDataTable } from "@/components/pages/admin/SukukDataTable"
import { RedeemRequestsTable } from "@/components/pages/admin/RedeemRequestsTable"

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<"sukuk-data" | "redeem-requests">("sukuk-data")

    return (
        <div className="min-h-[calc(100vh-80px)] bg-background px-6 py-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mt-20 mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Kelola data sukuk dan approve permintaan redeem dari user</p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex items-center space-x-2 mb-8 border-b border-border">
                    <button
                        onClick={() => setActiveTab("sukuk-data")}
                        className={`py-3 px-6 text-sm font-medium border-b-2 transition-all ${
                            activeTab === "sukuk-data"
                                ? "border-primary text-primary bg-primary/5"
                                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                        }`}
                    >
                        Data Sukuk
                    </button>
                    <button
                        onClick={() => setActiveTab("redeem-requests")}
                        className={`py-3 px-6 text-sm font-medium border-b-2 transition-all ${
                            activeTab === "redeem-requests"
                                ? "border-primary text-primary bg-primary/5"
                                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                        }`}
                    >
                        Permintaan Redeem
                    </button>
                </div>

                {/* Tab Content */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                    {activeTab === "sukuk-data" && <SukukDataTable />}
                    {activeTab === "redeem-requests" && <RedeemRequestsTable />}
                </div>
            </div>
        </div>
    )
} 