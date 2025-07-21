"use client"

import { useState } from "react"
import { PrimaryButton } from "@/components/ui/button"
import { PrimaryInput } from "@/components/ui/input"
import { toCurrency } from "@/utils/string"

export function SwapInterface() {
    const [activeTab, setActiveTab] = useState<"invest" | "redeem">("invest")
    const [investAmount, setInvestAmount] = useState("")
    const [redeemAmount, setRedeemAmount] = useState("")
    const [usdcBalance] = useState(1000)
    const [isConnected, setIsConnected] = useState(false)
    const [inputValue, setInputValue] = useState("");

    const investOutput = investAmount ? Number.parseFloat(investAmount) || 0 : 0;

    const handleConnectWallet = () => {
        setIsConnected(true)
        setTimeout(() => {
            alert("Wallet connected successfully!")
        }, 500)
    }

    const handleInvest = () => {
        if (!investAmount || Number.parseFloat(investAmount) <= 0) return
        alert(`Investing ${investAmount} USDC for ${investOutput} FASR`)
    }

    return (
        <div className="mt-20 w-md mx-auto bg-card rounded-2xl p-6 shadow-lg border border-border">
            {/* Tabs */}
            <div className="flex mb-6 bg-muted rounded-lg p-1">
                <button
                    onClick={() => setActiveTab("invest")}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all cursor-pointer ${activeTab === "invest"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                >
                    Beli
                </button>
                <button
                    onClick={() => setActiveTab("redeem")}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all cursor-pointer ${activeTab === "redeem"
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        }`}
                >
                    Jual
                </button>
            </div>

            {activeTab === "invest" ? (
                <div className="space-y-4">
                    {/* Enter Amount - IDR */}
                    <PrimaryInput
                        label="Nilai Investasi"
                        placeholder="0"
                        isError={false}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        selector={
                            <div
                                className="whitespace-nowrap flex items-center gap-2 h-9 rounded-full hover:border-green-500 text-green-950 transition-all outline-0 ring-0 px-2"
                            >
                                <span className="font-onestMedium text-lg transition-all text-text-300">
                                    {"Rp"}
                                </span>
                            </div>
                        }
                    />

                    {/* Output */}
                    <div className="flex flex-col gap-2.5 p-4">
                        <p className="text-sm text-green-700">Kamu mendapat</p>
                        <div className="flex flex-row w-full justify-between">
                            <div className="w-full h-8 overflow-hidden text-text-300 relative">
                                <div
                                    className="absolute right-0 top-1/2 -translate-y-1/2 transform origin-right"
                                    style={{
                                        whiteSpace: "nowrap",
                                        transform: `scale(${Math.min(1.5, 25 / inputValue.length)})`,
                                    }}
                                >
                                    {toCurrency(inputValue)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Enter Amount - FASR */}
                    <PrimaryInput
                        label="Nilai Jual"
                        placeholder="0"
                        isError={false}
                        value={redeemAmount}
                        onChange={(e) => setRedeemAmount(e.target.value)}
                        selector={
                            <div
                                className="whitespace-nowrap flex items-center gap-2 h-9 rounded-full hover:border-green-500 text-green-950 transition-all outline-0 ring-0 px-2"
                            >
                                <span className="font-onestMedium text-lg transition-all text-text-300">
                                    {"Rp"}
                                </span>
                            </div>
                        }
                    />

                    {/* Output */}
                    <div className="flex flex-col gap-2.5 p-4">
                        <p className="text-sm text-green-700">Kamu mendapat</p>
                        <div className="flex flex-row w-full justify-between">
                            <div className="w-full h-8 overflow-hidden text-text-300 relative">
                                <div
                                    className="absolute right-0 top-1/2 -translate-y-1/2 transform origin-right"
                                    style={{
                                        whiteSpace: "nowrap",
                                        transform: `scale(${Math.min(1.5, 25 / redeemAmount.length)})`,
                                    }}
                                >
                                    Rp {toCurrency(redeemAmount)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-4 flex flex-col gap-4">
                {/* Invest/Claim PrimaryButton */}
                {!isConnected ? (
                    <PrimaryButton
                        onClick={handleConnectWallet}
                        className="w-full h-[52px] text-base"
                        textClassName="justify-center"
                    >
                        Hubungkan Dompet
                    </PrimaryButton>
                ) : (
                    <PrimaryButton
                        onClick={handleInvest}
                        disabled={
                            !investAmount || Number.parseFloat(investAmount) <= 0 || Number.parseFloat(investAmount) > usdcBalance
                        }
                        className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground py-3 rounded-lg font-medium text-lg"
                    >
                        Invest
                    </PrimaryButton>
                )}

                {activeTab === "invest" && (
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Tingkat Kupon/Tahun</span>
                            <span className="text-foreground">5.375%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Jatuh Tempo</span>
                            <span className="text-foreground">15 Agustus 2025</span>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Minimum Pembelian</span>
                            <span className="text-foreground">1 Unit (Rp1)</span>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Tanggal Kupon Berikutnya</span>
                            <span className="text-foreground">15 Juli 2025</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Pembagian Kupon</span>
                            <span className="text-foreground">Per 6 Bulan</span>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Penerbit</span>
                            <span className="text-foreground">PT ABC</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Tanggal Penerbitan</span>
                            <span className="text-foreground">1 Januari 2025</span>
                        </div>
                    </div>
                )}


            </div>
        </div>
    )
}