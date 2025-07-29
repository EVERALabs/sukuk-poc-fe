"use client"

import { useState } from "react"
import { PrimaryButton } from "@/components/ui/button"
import { PrimaryInput } from "@/components/ui/input"
import { toCurrency } from "@/utils/string"
import { useAccount, useWriteContract } from "wagmi"
import { erc20Abi } from "viem"
import { SMART_CONTRACT_IDRX_ADDRESS, SMART_CONTRACT_MANAGER_ADDRESS } from "@/libs/contracts/contractAddress"
import { SukukManagerAbi } from "@/libs/contracts/abi/SukukManagerAbi"
import { usePrivy } from "@privy-io/react-auth"
import { X, CheckCircle2, ExternalLink } from "lucide-react"

interface SukukInvestmentPanelProps {
    contractAddress: string
}

export function SukukInvestmentPanel({ contractAddress }: SukukInvestmentPanelProps) {
    const { address, isConnected } = useAccount();
    const { login } = usePrivy();

    const [activeTab, setActiveTab] = useState<"beli" | "jual">("beli")
    const [investAmount, setInvestAmount] = useState("")
    const [isApproving, setApproving] = useState(false);
    const [isConfirming, setConfirming] = useState(false);
    const [showTxDialog, setShowTxDialog] = useState(false);
    const [currentTxHash, setCurrentTxHash] = useState<string | null>(null);
    const [txStep, setTxStep] = useState<1 | 2>(1);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        writeContractAsync: writeContractAsyncAllowance,
        isPending,
    } = useWriteContract();

    const {
        writeContractAsync: writeContractBuy,
        status: statusBuy,
    } = useWriteContract();

    const {
        writeContractAsync: writeContractSell,
        status: statusSell,
    } = useWriteContract();

    // const { data: dataAllowanceIDRX, refetch: refetchAllowanceIDRX } =
    //     useReadContract({
    //         abi: IDRXAbi,
    //         address: SMART_CONTRACT_IDRX_ADDRESS,
    //         functionName: "allowance",
    //         args: [address || "0x0000000000000000000000000000000000000000" as `0x${string}`, SMART_CONTRACT_MANAGER_ADDRESS],
    //         query: {
    //             enabled: !!address && isConnected,
    //         },
    //     });
    // Calculate button text based on state
    const getButtonText = () => {
        if (!isConnected) {
            return "Hubungkan Dompet";
        }

        if (isApproving || isConfirming || isPending || statusBuy === "pending" || statusSell === "pending") {
            return "Sedang di proses";
        }

        if (activeTab === "beli") {
            return "Beli Sekarang";
        }

        if (activeTab === "jual") {
            return "Jual Sekarang";
        }

        return "Hubungkan Dompet";
    };

    // Calculate if button should be disabled
    const isButtonDisabled = () => {
        if (!isConnected || !address) {
            return false; // Allow wallet connection
        }

        if (isApproving || isConfirming || isPending || statusBuy === "pending" || statusSell === "pending") {
            return true; // Disable during processing
        }

        if (!investAmount || isNaN(Number(investAmount)) || Number(investAmount) <= 0) {
            return true; // Disable if no valid amount
        }

        return false;
    };

    const approveAllowanceBuy = async () => {
        if (!address) {
            console.error("No wallet address available");
            return;
        }

        try {
            setApproving(true);

            await writeContractAsyncAllowance({
                address: SMART_CONTRACT_IDRX_ADDRESS,
                abi: erc20Abi,
                functionName: "approve",
                args: [SMART_CONTRACT_MANAGER_ADDRESS, BigInt(340282366920938463463374607431768211455)],
            });
            // await refetchAllowanceIDRX();
        } catch (e) {
            console.error("Error while approving: ", e);
        } finally {
            setApproving(false);
            setConfirming(false);
        }
    };

    // const approveAllowanceSell = async () => {
    //     if (!address) {
    //         console.error("No wallet address available");
    //         return;
    //     }

    //     try {
    //         setApproving(true);

    //         await writeContractAsyncAllowance({
    //             address: contractAddress as `0x${string}`,
    //             abi: erc20Abi,
    //             functionName: "approve",
    //             args: [SMART_CONTRACT_MANAGER_ADDRESS, BigInt(340282366920938463463374607431768211455)],
    //         });
    //         // await refetchAllowanceIDRX();
    //     } catch (e) {
    //         console.error("Error while approving: ", e);
    //     } finally {
    //         setApproving(false);
    //         setConfirming(false);
    //     }
    // };

    const buy = async (amount: bigint) => {
        if (isConfirming || !address) return;
        setConfirming(true);
        setShowTxDialog(true);
        setTxStep(1);
        setIsSuccess(false);

        try {
            await approveAllowanceBuy();
            setTxStep(2);

            const tx = await writeContractBuy({
                address: SMART_CONTRACT_MANAGER_ADDRESS,
                abi: SukukManagerAbi,
                functionName: "buySukuk",
                args: [contractAddress as `0x${string}`, amount, SMART_CONTRACT_IDRX_ADDRESS],
            });

            console.log("TX HASH:", tx);
            setCurrentTxHash(tx);
            setInvestAmount("");
            setIsSuccess(true);
        } catch (e) {
            console.error("ERROR WHILE BUYING", e);
        } finally {
            setApproving(false);
            setConfirming(false);
        }
    };

    const sell = async (amount: bigint) => {
        if (isConfirming || !address) return;
        setConfirming(true);
        setShowTxDialog(true);
        setTxStep(1);
        setIsSuccess(false);

        try {
            const tx = await writeContractSell({
                address: SMART_CONTRACT_MANAGER_ADDRESS,
                abi: SukukManagerAbi,
                functionName: "requestRedemption",
                args: [contractAddress as `0x${string}`, amount, SMART_CONTRACT_IDRX_ADDRESS],
            });

            console.log("TX HASH:", tx);
            setCurrentTxHash(tx);
            setInvestAmount("");
            setTxStep(2);
            setIsSuccess(true);
        } catch (e) {
            console.error("ERROR WHILE SELLING", e);
        } finally {
            setApproving(false);
            setConfirming(false);
        }
    };

    const handleInvest = async () => {
        if (!isConnected || !address) {
            login();
            return;
        }

        if (!investAmount || isNaN(Number(investAmount)) || Number(investAmount) <= 0) {
            return;
        }

        try {
            if (activeTab === "beli") {
                await buy(BigInt(investAmount) * 100n);
            } else {
                await sell(BigInt(investAmount) * 100n);
            }
        } catch (e) {
            console.error("Error in handleInvest:", e);
        }
    };

    // Calculate projections
    const principal = Number.parseFloat(investAmount) || 100000000 // Default 100M for example
    const annualRate = 6.55 / 100
    const monthlyRate = annualRate / 12
    const monthlyCoupon = Number((principal * monthlyRate).toFixed(2)) // Fix to 2 decimal places
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

                <PrimaryButton
                    onClick={handleInvest}
                    disabled={isButtonDisabled()}
                    className="w-full h-12 text-base bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground text-center"
                >
                    {getButtonText()}
                </PrimaryButton>
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
                        <span className="text-foreground font-medium">Rp{toCurrency(monthlyCoupon.toFixed(2))}</span>
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

            {/* Transaction Confirmation Dialog */}
            {showTxDialog && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-background rounded-xl border border-border max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <div>
                                <h2 className="text-xl font-bold text-foreground">
                                    {isSuccess ? "Transaction Successful" : "Confirm your transaction"}
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    {isSuccess 
                                        ? "Your transaction has been confirmed and processed successfully."
                                        : "Review and confirm your token details before proceeding."
                                    }
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    if (!isConfirming) {
                                        setShowTxDialog(false);
                                        setCurrentTxHash(null);
                                        setTxStep(1);
                                        setIsSuccess(false);
                                    }
                                }}
                                className="p-2 hover:bg-accent rounded-lg transition-colors"
                                disabled={isConfirming}
                            >
                                <X className="w-5 h-5 text-muted-foreground" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="space-y-4">
                                <div className={`flex items-center space-x-3 ${txStep === 1 ? 'text-primary' : isSuccess ? 'text-green-600' : 'text-muted-foreground'}`}>
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span>Confirm transaction on your wallet</span>
                                </div>
                                <div className={`flex items-center space-x-3 ${txStep === 2 ? 'text-primary' : isSuccess ? 'text-green-600' : 'text-muted-foreground'}`}>
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span>Send to your wallet</span>
                                </div>
                            </div>

                            {currentTxHash && (
                                <div className={`mt-4 p-4 ${isSuccess ? 'bg-green-50 border border-green-200' : 'bg-muted/20'} rounded-lg`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm text-muted-foreground">Transaction Hash:</p>
                                        <a 
                                            href={`https://base-sepolia.blockscout.com/tx/${currentTxHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:text-primary/80 flex items-center space-x-1"
                                        >
                                            <span className="text-xs">View on Explorer</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                    <p className="text-sm font-mono break-all">{currentTxHash}</p>
                                </div>
                            )}

                            {isConfirming && (
                                <div className="flex items-center justify-center py-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            )}

                            {isSuccess && (
                                <div className="flex items-center justify-center py-4 text-green-600">
                                    <CheckCircle2 className="w-12 h-12" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
} 