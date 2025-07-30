"use client"

import { useState } from "react"
import { PrimaryButton } from "@/components/ui/button"
import { PrimaryInput } from "@/components/ui/input"
import { toCurrency } from "@/utils/string"
import { useAccount, useWriteContract } from "wagmi"
import { erc20Abi, formatUnits } from "viem"
import { SMART_CONTRACT_IDRX_ADDRESS, SMART_CONTRACT_MANAGER_ADDRESS } from "@/libs/contracts/contractAddress"
import { SukukManagerAbi } from "@/libs/contracts/abi/SukukManagerAbi"
import { usePrivy } from "@privy-io/react-auth"
import { useRouter } from "next/navigation"
import { X, CheckCircle2, ExternalLink } from "lucide-react"
import { useOwnedSukuk } from "@/hooks/useApi"
import { calculateSukukBalance } from "@/utils/api"

interface SukukInvestmentPanelProps {
    contractAddress: string
}

export function SukukInvestmentPanel({ contractAddress }: SukukInvestmentPanelProps) {
    const { address, isConnected } = useAccount();
    const { login } = usePrivy();
    const router = useRouter();

    // Enhanced debug logging for RPC troubleshooting
    console.log("SukukInvestmentPanel Debug:", {
        contractAddress,
        address,
        isConnected,
        IDRX_ADDRESS: SMART_CONTRACT_IDRX_ADDRESS,
        MANAGER_ADDRESS: SMART_CONTRACT_MANAGER_ADDRESS,
    });
    
    // Validate contract addresses
    const isValidSukukAddress = contractAddress && contractAddress.startsWith('0x') && contractAddress.length === 42;
    
    console.log("Contract Validation:", {
        isValidSukukAddress,
        sukuk_address: contractAddress
    });

    const [activeTab, setActiveTab] = useState<"beli" | "jual">("beli")
    const [investAmount, setInvestAmount] = useState("")
    const [isApproving, setApproving] = useState(false);
    const [isConfirming, setConfirming] = useState(false);
    const [showTxDialog, setShowTxDialog] = useState(false);
    const [currentTxHash, setCurrentTxHash] = useState<string | null>(null);
    const [txStep, setTxStep] = useState<1 | 2>(1);
    const [isSuccess, setIsSuccess] = useState(false);
    const [transactionType, setTransactionType] = useState<"beli" | "jual">("beli");

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

    // Fetch owned sukuk data to get balance from backend
    const { data: ownedSukukData, loading: ownedSukukLoading } = useOwnedSukuk(address || "");
    
    // Find current sukuk from owned data
    const currentSukuk = ownedSukukData?.sukuk.find(
        sukuk => sukuk.contract_address.toLowerCase() === contractAddress.toLowerCase()
    );
    
    // Calculate sukuk balance from backend data
    const apiSukukBalance = currentSukuk ? calculateSukukBalance(currentSukuk) : 0;

    // No IDRX balance needed for beli tab - user can enter any amount

    // Format sukuk balance from backend data
    const formattedSukukBalance = (() => {
        if (!isConnected || !address) return "0";
        if (ownedSukukLoading) return "Loading...";
        
        // Use API data for sukuk balance
        if (apiSukukBalance > 0) {
            console.log("Sukuk Balance (from API):", apiSukukBalance);
            return apiSukukBalance.toString();
        }
        
        // If no balance found in API data
        if (!currentSukuk) {
            console.log("No sukuk found in owned data for contract:", contractAddress);
            return "0";
        }
        
        return "0";
    })();
    // Calculate button text based on state
    const getButtonText = () => {
        if (!isConnected) {
            return "Hubungkan Dompet";
        }

        if (isApproving || isConfirming || isPending || statusBuy === "pending" || statusSell === "pending") {
            return "Sedang di proses";
        }

        if (!investAmount || isNaN(Number(investAmount)) || Number(investAmount) <= 0) {
            return activeTab === "beli" ? "Masukkan Jumlah Pembelian" : "Masukkan Jumlah Penjualan";
        }

        if (activeTab === "beli") {
            return "Beli Sekarang";
        }

        return "Jual Sekarang";
    };

    // Calculate if button should be disabled
    const isButtonDisabled = () => {
        if (!isConnected || !address) {
            return false; // Allow wallet connection
        }

        return isApproving || isConfirming || isPending || statusBuy === "pending" || statusSell === "pending";
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
        setTransactionType("beli");

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
        setTransactionType("jual");

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

    // Handle MAX button clicks
    const handleMaxBeli = () => {
        // No MAX functionality for beli tab - user can enter any amount
        return;
    };

    const handleMaxJual = () => {
        if (!ownedSukukLoading && formattedSukukBalance !== "Loading..." && formattedSukukBalance !== "0") {
            setInvestAmount(formattedSukukBalance);
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
                            label="Nilai Beli"
                            placeholder="0"
                            value={investAmount}
                            onChange={(e) => setInvestAmount(e.target.value)}
                            handleMax={handleMaxBeli}
                            isShowBallance={false}
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
                            balance={toCurrency(formattedSukukBalance)}
                            handleMax={handleMaxJual}
                            isShowBallance={true}
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
                    className={`w-full h-12 text-base bg-primary text-primary-foreground ${
                        isButtonDisabled()
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-primary/90'
                    }`}
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                    
                    {/* Modal */}
                    <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl">
                        {/* Close button */}
                        <button
                            onClick={() => {
                                if (!isConfirming) {
                                    setShowTxDialog(false);
                                    setCurrentTxHash(null);
                                    setTxStep(1);
                                    setIsSuccess(false);
                                }
                            }}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                            disabled={isConfirming}
                        >
                            <X size={24} />
                        </button>
                        
                        {/* Header section with animations */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 px-6 pt-12 pb-8">
                            {/* Animated circles background */}
                            <div className="absolute inset-0">
                                <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-green-200/30 animate-pulse" />
                                <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-green-300/20 animate-pulse" />
                            </div>

                            {/* Status icon */}
                            <div className="relative mx-auto w-20 h-20 mb-4">
                                <div className="absolute inset-0 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                                    {isSuccess ? (
                                        <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={3} />
                                    ) : (
                                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
                                    )}
                                </div>
                            </div>

                            {/* Logo */}
                            <div className="relative mx-auto mb-4">
                                <img
                                    src="/images/indo-sukuk-logo.png"
                                    alt="IndoSukuk"
                                    className="mx-auto h-10"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-onestSemibold text-green-800 mb-2 text-center">
                                {isSuccess 
                                    ? (transactionType === "jual" ? "Permintaan Jual Diterima!" : "Pembelian Berhasil!") 
                                    : (transactionType === "jual" ? "Memproses Penjualan" : "Memproses Pembelian")
                                }
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-green-700 font-onestRegular text-center">
                                {isSuccess 
                                    ? (transactionType === "jual" 
                                        ? "Permintaan jual diterima, mohon menunggu 1-2 hari untuk proses pencairan dana."
                                        : "Transaksi pembelian sukuk Anda telah berhasil diproses."
                                    )
                                    : "Silakan konfirmasi transaksi di dompet Anda"
                                }
                            </p>
                        </div>

                        {/* Transaction steps */}
                        {!isSuccess && (
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                <div className="space-y-3">
                                    <div className={`flex items-center gap-3 ${txStep === 1 ? 'text-green-600' : txStep > 1 ? 'text-green-600' : 'text-gray-400'}`}>
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span className="text-sm font-onestRegular">Konfirmasi di dompet</span>
                                    </div>
                                    <div className={`flex items-center gap-3 ${txStep === 2 ? 'text-green-600' : txStep > 2 ? 'text-green-600' : 'text-gray-400'}`}>
                                        <CheckCircle2 className="w-5 h-5" />
                                        <span className="text-sm font-onestRegular">Mengirim transaksi</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Transaction hash section */}
                        {currentTxHash && (
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-sm text-gray-600 font-onestRegular">Hash Transaksi:</p>
                                    <a 
                                        href={`https://base-sepolia.blockscout.com/tx/${currentTxHash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 hover:text-green-700 flex items-center gap-1"
                                    >
                                        <span className="text-xs font-onestMedium">Lihat di Explorer</span>
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                                <p className="text-xs font-mono text-gray-500 break-all bg-white p-2 rounded border">
                                    {currentTxHash}
                                </p>
                            </div>
                        )}

                        {/* Action button */}
                        {isSuccess && (
                            <div className="px-6 py-4 bg-white">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowTxDialog(false);
                                        setCurrentTxHash(null);
                                        setTxStep(1);
                                        setIsSuccess(false);
                                        
                                        // Navigate to portfolio if it's a buy transaction
                                        if (transactionType === "beli") {
                                            router.push("/portfolio");
                                        }
                                    }}
                                    className="w-full px-4 py-3 text-sm font-onestMedium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                                >
                                    {transactionType === "beli" ? "Lihat Portofolio" : "Selesai"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
} 