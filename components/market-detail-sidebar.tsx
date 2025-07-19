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
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      {/* Tabs */}
      <div className="flex mb-6 bg-gray-900 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("invest")}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
            activeTab === "invest"
              ? "bg-purple-600 text-white shadow-sm"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`}
        >
          Invest
        </button>
        <button
          onClick={() => setActiveTab("redeem")}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
            activeTab === "redeem"
              ? "bg-purple-600 text-white shadow-sm"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`}
        >
          Redeem
        </button>
      </div>

      {/* Enter Amount */}
      <div className="mb-4">
        <label className="text-gray-400 text-sm mb-2 block">Enter Amount</label>
        <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
          <div className="flex justify-between items-center mb-2">
            <Input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent border-none text-xl font-bold text-white p-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">U</span>
              </div>
              <span className="text-white font-medium">USDC</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Balance: 0</span>
            <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 p-0 h-auto font-bold">
              MAX
            </Button>
          </div>
        </div>
      </div>

      {/* Output */}
      <div className="mb-6">
        <div className="bg-gray-700 rounded-lg p-3 border border-gray-600">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold text-xl">0</span>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">F</span>
              </div>
              <span className="text-white font-medium">FASR</span>
            </div>
          </div>
          <div className="text-gray-400 text-sm">Balance: 0 FASR</div>
        </div>
      </div>

      {/* Button */}
      {!isConnected ? (
        <Button
          onClick={handleConnectWallet}
          className="w-full bg-green-500 hover:bg-green-600 text-black py-3 rounded-lg font-medium mb-4"
        >
          Connect wallet
        </Button>
      ) : (
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium mb-4">
          {activeTab === "invest" ? "Invest" : "Redeem"}
        </Button>
      )}

      {/* Details */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Rate</span>
          <span className="text-white">1 USD = 1 FASR</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Lockup Period</span>
          <span className="text-white">7 Days</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Gas Fees</span>
          <span className="text-white">0 ETH</span>
        </div>
      </div>
    </div>
  )
}
