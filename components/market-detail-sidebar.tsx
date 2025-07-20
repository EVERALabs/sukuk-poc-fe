"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function MarketDetailSidebar() {
  const [activeTab, setActiveTab] = useState<"invest" | "redeem">("invest")
  const [amount, setAmount] = useState("")
  const [isConnected, setIsConnected] = useState(false)

  const handleConnectWallet = () => {
    setIsConnected(true)
    setTimeout(() => {
      alert("Wallet connected successfully!")
    }, 500)
  }

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
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

      {/* Enter Amount */}
      <div className="mb-4">
        <label className="text-muted-foreground text-sm mb-2 block">Enter Amount</label>
        <div className="bg-secondary rounded-lg p-3 border border-border">
          <div className="flex justify-between items-center mb-2">
            <Input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent border-none text-xl font-bold text-foreground p-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">U</span>
              </div>
              <span className="text-foreground font-medium">USDC</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Balance: 0</span>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 p-0 h-auto font-bold">
              MAX
            </Button>
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="mb-6">
        <div className="bg-secondary rounded-lg p-3 border border-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-foreground font-bold text-xl">0</span>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                <span className="text-accent-foreground text-xs font-bold">F</span>
              </div>
              <span className="text-foreground font-medium">FASR</span>
            </div>
          </div>
          <div className="text-muted-foreground text-sm">Balance: 0 FASR</div>
        </div>
      </div>

      {/* Button */}
      {!isConnected ? (
        <Button
          onClick={handleConnectWallet}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium mb-4"
        >
          Connect wallet
        </Button>
      ) : (
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-lg font-medium mb-4">
          {activeTab === "invest" ? "Invest" : "Redeem"}
        </Button>
      )}

      {/* Details */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Rate</span>
          <span className="text-foreground">1 USD = 1 FASR</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Lockup Period</span>
          <span className="text-foreground">7 Days</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Gas Fees</span>
          <span className="text-foreground">0 ETH</span>
        </div>
      </div>
    </div>
  )
}
