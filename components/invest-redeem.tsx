"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Info } from "lucide-react"

export function SwapInterface() {
  const [activeTab, setActiveTab] = useState<"invest" | "redeem">("invest")
  const [investAmount, setInvestAmount] = useState("")
  const [redeemAmount, setRedeemAmount] = useState("")
  const [usdcBalance] = useState(1000)
  const [fasrBalance] = useState(500)
  const [isConnected, setIsConnected] = useState(false)

  const investOutput = investAmount ? Number.parseFloat(investAmount) || 0 : 0
  const redeemOutput = redeemAmount ? Number.parseFloat(redeemAmount) || 0 : 0

  const handleMaxInvest = () => {
    setInvestAmount(usdcBalance.toString())
  }

  const handleMaxRedeem = () => {
    setRedeemAmount(fasrBalance.toString())
  }

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

  const canRedeem = new Date() > new Date("2025-07-16")

  return (
    <div className="max-w-md mx-auto bg-card rounded-xl p-6 shadow-lg border border-border">
      {/* Tabs */}
      <div className="flex mb-6 bg-muted rounded-lg p-1">
        <button
          onClick={() => setActiveTab("invest")}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
            activeTab === "invest"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          }`}
        >
          Invest
        </button>
        <button
          onClick={() => setActiveTab("redeem")}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
            activeTab === "redeem"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-accent"
          }`}
        >
          Redeem
        </button>
      </div>

      {activeTab === "invest" ? (
        <div className="space-y-4">
          {/* Enter Amount - USDC */}
          <div className="bg-secondary rounded-lg p-4 border border-border">
            <div className="flex justify-between items-center mb-3">
              <span className="text-muted-foreground text-sm">Enter Amount</span>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">U</span>
                </div>
                <span className="text-foreground font-medium">USDC</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Input
                type="number"
                placeholder="0"
                value={investAmount}
                onChange={(e) => setInvestAmount(e.target.value)}
                className="bg-transparent border-none text-2xl font-bold text-foreground p-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ boxShadow: "none" }}
              />
              <div className="text-right">
                <div className="text-muted-foreground text-sm mb-1">Balance: {isConnected ? usdcBalance : 0}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMaxInvest}
                  disabled={!isConnected}
                  className="text-primary hover:text-primary/80 p-0 h-auto font-bold"
                >
                  MAX
                </Button>
              </div>
            </div>
          </div>

          {/* Output - FASR */}
          <div className="bg-secondary rounded-lg p-4 border border-border">
            <div className="flex justify-between items-center mb-3">
              <span className="text-foreground font-bold text-2xl">{investOutput.toFixed(0)}</span>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-accent-foreground text-xs font-bold">F</span>
                </div>
                <span className="text-foreground font-medium">FASR</span>
              </div>
            </div>
            <div className="text-muted-foreground text-sm">Balance: {isConnected ? fasrBalance : 0} FASR</div>
          </div>

          {/* Invest Button */}
          {!isConnected ? (
            <Button
              onClick={handleConnectWallet}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium text-lg"
            >
              Connect wallet
            </Button>
          ) : (
            <Button
              onClick={handleInvest}
              disabled={
                !investAmount || Number.parseFloat(investAmount) <= 0 || Number.parseFloat(investAmount) > usdcBalance
              }
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground py-3 rounded-lg font-medium text-lg"
            >
              Invest
            </Button>
          )}

          {/* Details */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rate</span>
              <span className="text-foreground">1 USD = 1 FASR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lockup Period</span>
              <span className="text-foreground">7 Days</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <span className="text-muted-foreground">Gas Fees</span>
                <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
              </div>
              <span className="text-foreground">0 ETH</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Enter Amount - FASR */}
          <div className="bg-secondary rounded-lg p-4 border border-border">
            <div className="flex justify-between items-center mb-3">
              <span className="text-muted-foreground text-sm">Enter Amount</span>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-accent-foreground text-xs font-bold">F</span>
                </div>
                <span className="text-foreground font-medium">FASR</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Input
                type="number"
                placeholder="0"
                value={redeemAmount}
                onChange={(e) => setRedeemAmount(e.target.value)}
                className="bg-transparent border-none text-2xl font-bold text-foreground p-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ boxShadow: "none" }}
              />
              <div className="text-right">
                <div className="text-muted-foreground text-sm mb-1">Balance: {isConnected ? fasrBalance : 0}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMaxRedeem}
                  disabled={!isConnected}
                  className="text-primary hover:text-primary/80 p-0 h-auto font-bold"
                >
                  MAX
                </Button>
              </div>
            </div>
          </div>

          {/* Output - USDC */}
          <div className="bg-secondary rounded-lg p-4 border border-border">
            <div className="flex justify-between items-center mb-3">
              <span className="text-foreground font-bold text-2xl">{redeemOutput.toFixed(3)}</span>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">U</span>
                </div>
                <span className="text-foreground font-medium">USDC</span>
              </div>
            </div>
            <div className="text-muted-foreground text-sm">Balance: {isConnected ? usdcBalance : 0} USD</div>
          </div>

          {/* Redeem Button */}
          {!isConnected ? (
            <Button
              onClick={handleConnectWallet}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium text-lg"
            >
              Connect wallet
            </Button>
          ) : !canRedeem ? (
            <Button
              disabled
              className="w-full bg-muted text-muted-foreground py-3 rounded-lg font-medium text-lg cursor-not-allowed"
            >
              You can redeem after 16 Jul 2025
            </Button>
          ) : (
            <Button
              disabled={
                !redeemAmount || Number.parseFloat(redeemAmount) <= 0 || Number.parseFloat(redeemAmount) > fasrBalance
              }
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground py-3 rounded-lg font-medium text-lg"
            >
              Redeem
            </Button>
          )}

          {/* Details */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rate</span>
              <span className="text-foreground">1 FASR = 1 USD</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <span className="text-muted-foreground">Gas Fees</span>
                <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
              </div>
              <span className="text-foreground">0 ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <span className="text-muted-foreground">Redeem Fee</span>
                <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
              </div>
              <span className="text-foreground">0 USDC</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
