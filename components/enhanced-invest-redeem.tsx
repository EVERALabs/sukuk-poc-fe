"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Info, TrendingUp, Clock, Shield } from "lucide-react"

export function EnhancedSwapInterface() {
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
  }

  const handleInvest = () => {
    if (!investAmount || Number.parseFloat(investAmount) <= 0) return
    alert(`Investing ${investAmount} USDC for ${investOutput} FASR`)
  }

  const canRedeem = new Date() > new Date("2025-07-16")

  return (
    <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
      {/* Enhanced Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">Quick Trade</h3>
          <div className="flex items-center space-x-1 text-green-400">
            <Shield className="w-4 h-4" />
            <span className="text-xs">Secured</span>
          </div>
        </div>
        <p className="text-gray-400 text-sm">Trade tokens instantly with optimal rates</p>
      </div>

      {/* Enhanced Tabs */}
      <div className="flex mb-6 bg-gray-900 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("invest")}
          className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all flex items-center justify-center space-x-2 ${
            activeTab === "invest"
              ? "bg-purple-600 text-white shadow-sm"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Invest</span>
        </button>
        <button
          onClick={() => setActiveTab("redeem")}
          className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all flex items-center justify-center space-x-2 ${
            activeTab === "redeem"
              ? "bg-purple-600 text-white shadow-sm"
              : "text-gray-400 hover:text-white hover:bg-gray-800"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Redeem</span>
        </button>
      </div>

      {activeTab === "invest" ? (
        <div className="space-y-4">
          {/* Enhanced Input */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-purple-500 transition-colors">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-400 text-sm">You're paying</span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">U</span>
                </div>
                <span className="text-white font-medium">USDC</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Input
                type="number"
                placeholder="0.00"
                value={investAmount}
                onChange={(e) => setInvestAmount(e.target.value)}
                className="bg-transparent border-none text-2xl font-bold text-white p-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ boxShadow: "none" }}
              />
              <div className="text-right">
                <div className="text-gray-400 text-sm mb-1">
                  Balance: {isConnected ? usdcBalance.toLocaleString() : 0}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMaxInvest}
                  disabled={!isConnected}
                  className="text-purple-400 hover:text-purple-300 p-0 h-auto font-bold"
                >
                  MAX
                </Button>
              </div>
            </div>
          </div>

          {/* Exchange Arrow */}
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center border border-gray-600">
              <span className="text-green-400">↓</span>
            </div>
          </div>

          {/* Enhanced Output */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-400 text-sm">You'll receive</span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">F</span>
                </div>
                <span className="text-white font-medium">FASR</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white font-bold text-2xl">{investOutput.toFixed(2)}</span>
              <div className="text-gray-400 text-sm">
                Balance: {isConnected ? fasrBalance.toLocaleString() : 0} FASR
              </div>
            </div>
          </div>

          {/* Enhanced Button */}
          {!isConnected ? (
            <Button
              onClick={handleConnectWallet}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black py-3 rounded-lg font-medium text-lg shadow-lg"
            >
              Connect Wallet
            </Button>
          ) : (
            <Button
              onClick={handleInvest}
              disabled={
                !investAmount || Number.parseFloat(investAmount) <= 0 || Number.parseFloat(investAmount) > usdcBalance
              }
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium text-lg shadow-lg"
            >
              Invest Now
            </Button>
          )}

          {/* Enhanced Details */}
          <div className="bg-gray-700/50 rounded-lg p-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Exchange Rate</span>
              <span className="text-white font-medium">1 USD = 1 FASR</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Lockup Period</span>
              <span className="text-white font-medium">7 Days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Estimated APY</span>
              <span className="text-green-400 font-medium">11.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">Network Fee</span>
                <Info className="w-3 h-3 text-gray-400 hover:text-gray-300 cursor-help" />
              </div>
              <span className="text-white font-medium">~$0.50</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Similar enhanced structure for redeem tab */}
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-purple-500 transition-colors">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-400 text-sm">You're redeeming</span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">F</span>
                </div>
                <span className="text-white font-medium">FASR</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Input
                type="number"
                placeholder="0.00"
                value={redeemAmount}
                onChange={(e) => setRedeemAmount(e.target.value)}
                className="bg-transparent border-none text-2xl font-bold text-white p-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                style={{ boxShadow: "none" }}
              />
              <div className="text-right">
                <div className="text-gray-400 text-sm mb-1">
                  Balance: {isConnected ? fasrBalance.toLocaleString() : 0}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMaxRedeem}
                  disabled={!isConnected}
                  className="text-purple-400 hover:text-purple-300 p-0 h-auto font-bold"
                >
                  MAX
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center border border-gray-600">
              <span className="text-green-400">↓</span>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-400 text-sm">You'll receive</span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">U</span>
                </div>
                <span className="text-white font-medium">USDC</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white font-bold text-2xl">{redeemOutput.toFixed(3)}</span>
              <div className="text-gray-400 text-sm">Balance: {isConnected ? usdcBalance.toLocaleString() : 0} USD</div>
            </div>
          </div>

          {!isConnected ? (
            <Button
              onClick={handleConnectWallet}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-black py-3 rounded-lg font-medium text-lg shadow-lg"
            >
              Connect Wallet
            </Button>
          ) : !canRedeem ? (
            <Button
              disabled
              className="w-full bg-purple-400 text-white py-3 rounded-lg font-medium text-lg cursor-not-allowed"
            >
              You can redeem after 16 Jul 2025
            </Button>
          ) : (
            <Button
              disabled={
                !redeemAmount || Number.parseFloat(redeemAmount) <= 0 || Number.parseFloat(redeemAmount) > fasrBalance
              }
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium text-lg shadow-lg"
            >
              Redeem Now
            </Button>
          )}

          <div className="bg-gray-700/50 rounded-lg p-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Exchange Rate</span>
              <span className="text-white font-medium">1 FASR = 1 USD</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">Network Fee</span>
                <Info className="w-3 h-3 text-gray-400 hover:text-gray-300 cursor-help" />
              </div>
              <span className="text-white font-medium">~$0.50</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">Redeem Fee</span>
                <Info className="w-3 h-3 text-gray-400 hover:text-gray-300 cursor-help" />
              </div>
              <span className="text-white font-medium">0.1%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
