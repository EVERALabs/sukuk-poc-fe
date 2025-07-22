"use client"

import { useState } from "react"
import { PrimaryButton } from "@/components/ui/button"
import { PrimaryInput } from "@/components/ui/input"
import { toCurrency } from "@/utils/string"

export function SukukInvestmentPanel() {
    const [activeTab, setActiveTab] = useState<"beli" | "jual">("beli")
    const [investAmount, setInvestAmount] = useState("")
    const [isConnected, setIsConnected] = useState(false)

    const handleConnectWallet = () => {
        setIsConnected(true)
        setTimeout(() => {
            alert("Dompet berhasil terhubung!")
        }, 500)
    }

    const handleInvest = () => {
        if (!investAmount || Number.parseFloat(investAmount) <= 0) return
        alert(`Investasi ${investAmount} Rupiah dalam pool ini`)
    }

    // Calculate projections
    const principal = Number.parseFloat(investAmount) || 100000000 // Default 100M for example
    const annualRate = 6.55 / 100
    const monthlyRate = annualRate / 12
    const monthlyCoupon = principal * monthlyRate
    const totalCoupons = monthlyCoupon * 60 // 5 years * 12 months
    const totalValue = principal + totalCoupons

    return (
        <div className="space-y-6">
            {/* Buy/Sell Interface */}
            <div className="bg-card rounded-xl p-6 border border-border">
                {/* Tabs */}
                <div className="flex mb-6 bg-muted rounded-lg p-1">
                    <button
                        onClick={() => setActiveTab("beli")}
                        className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all cursor-pointer ${activeTab === "beli"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            }`}
                    >
                        Beli
                    </button>
                    <button
                        onClick={() => setActiveTab("jual")}
                        className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all cursor-pointer ${activeTab === "jual"
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            }`}
                    >
                        Jual
                    </button>
                </div>

                {activeTab === "beli" ? (
                    <div className="space-y-4">
                        <PrimaryInput
                            label="Nilai Jual"
                            placeholder="0"
                            value={investAmount}
                            onChange={(e) => setInvestAmount(e.target.value)}
                            selector={
                                <div className="whitespace-nowrap flex items-center gap-2 h-9 rounded-full hover:border-green-500 text-green-950 transition-all outline-0 ring-0 px-2">
                                    <span className="font-onestMedium text-lg transition-all text-text-300">
                                        Rp
                                    </span>
                                </div>
                            }
                        />

                        <div className="flex flex-col gap-2.5 p-4">
                            <p className="text-sm text-green-700">Kamu mendapat</p>
                            <div className="flex flex-row w-full justify-between">
                                <div className="w-full h-8 overflow-hidden text-text-300 relative">
                                    <div
                                        className="absolute right-0 top-1/2 -translate-y-1/2 transform origin-right"
                                        style={{
                                            whiteSpace: "nowrap",
                                            transform: `scale(${Math.min(1.5, 25 / investAmount.length)})`,
                                        }}
                                    >
                                        Rp {investAmount ? toCurrency(investAmount) : "0"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <PrimaryInput
                            label="Nilai Jual"
                            placeholder="0"
                            value={investAmount}
                            onChange={(e) => setInvestAmount(e.target.value)}
                            selector={
                                <div className="whitespace-nowrap flex items-center gap-2 h-9 rounded-full hover:border-green-500 text-green-950 transition-all outline-0 ring-0 px-2">
                                    <span className="font-onestMedium text-lg transition-all text-text-300">
                                        Rp
                                    </span>
                                </div>
                            }
                        />

                        <div className="flex flex-col gap-2.5 p-4">
                            <p className="text-sm text-green-700">Kamu mendapat</p>
                            <div className="flex flex-row w-full justify-between">
                                <div className="w-full h-8 overflow-hidden text-text-300 relative">
                                    <div
                                        className="absolute right-0 top-1/2 -translate-y-1/2 transform origin-right"
                                        style={{
                                            whiteSpace: "nowrap",
                                            transform: `scale(${Math.min(1.5, 25 / investAmount.length)})`,
                                        }}
                                    >
                                        Rp {investAmount ? toCurrency(investAmount) : "0"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!isConnected ? (
                    <PrimaryButton
                        onClick={handleConnectWallet}
                        className="w-full h-12 text-base"
                    >
                        HUBUNGKAN DOMPET
                    </PrimaryButton>
                ) : (
                    <PrimaryButton
                        onClick={handleInvest}
                        disabled={!investAmount || Number.parseFloat(investAmount) <= 0}
                        className="w-full h-12 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground"
                    >
                        {activeTab === "beli" ? "Beli Sekarang" : "Jual Sekarang"}
                    </PrimaryButton>
                )}
            </div>

            {/* Investment Simulation */}
            <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Simulasi Investasi</h3>

                <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Modal Investasi</span>
                        <span className="text-foreground font-medium">Rp{toCurrency(principal)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Tingkat Imbal Hasil Kupon</span>
                        <span className="text-foreground font-medium">6.55%</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Kupon / Bulan</span>
                        <span className="text-foreground font-medium">Rp{toCurrency(monthlyCoupon)}</span>
                    </div>
                </div>

                <div className="mb-6">
                    <h4 className="text-md font-semibold text-foreground mb-3">
                        Proyeksi Nilai Investasi Kamu di <span className="text-primary">10 Jun 2030</span>
                    </h4>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Modal Investasi</span>
                            <span className="text-foreground font-medium">Rp{toCurrency(principal)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Kupon</span>
                            <span className="text-primary font-medium">+Rp{toCurrency(totalCoupons)}</span>
                        </div>

                        <div className="bg-primary/10 p-4 rounded-lg">
                            <div className="text-primary font-bold text-xl">
                                Rp {toCurrency(totalValue)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-xs text-muted-foreground bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                    <div className="flex items-center space-x-2">
                        <span>ℹ️</span>
                        <span>Proyeksi nilai investasi sudah dipotong pajak 10%.</span>
                    </div>
                </div>
            </div>


        </div>
    )
} 