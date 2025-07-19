import { Header } from "@/components/header"
import { MarketDetailSidebar } from "@/components/market-detail-sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, BarChart3, Activity, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function MarketDetailPage({ params }: { params: { id: string } }) {
  const navItems = ["Markets", "Portfolio", "History"]

  return (
    <div className="min-h-screen bg-gray-900">
      <Header navItems={navItems} />

      <div className="p-6">
        {/* Back Button */}
        <Link href="/pro/markets" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Markets</span>
        </Link>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg font-bold">C</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">FinCards Receivables Pool Amoy</h1>
                    <p className="text-gray-400">CAPAC / MON</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                    Overview
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                    Details
                  </Button>
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 bg-transparent">
                    Analytics
                  </Button>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                FinCards is transforming capital management for Web3 teams by offering settlement liquidity for its
                USDC-backed corporate cards. The platform enables DeFi protocols to seamlessly provide liquidity for
                expenses through a payment system secured by collateral collateral, significantly reducing credit risk.
              </p>
            </div>

            {/* Pool Overview */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Pool Overview
              </h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Pool Capacity</p>
                  <p className="text-white text-lg font-bold">10M USD</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Value Locked</p>
                  <p className="text-white text-lg font-bold">10M USD</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Minimum Investment</p>
                  <p className="text-white text-lg font-bold">1K USD</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Estimated APY</p>
                  <p className="text-green-400 text-lg font-bold">11%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Capital Formation</p>
                  <p className="text-white text-lg font-bold">30 Days</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Loan Term</p>
                  <p className="text-white text-lg font-bold">7 Days</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Principal Repaid</p>
                  <p className="text-white text-lg font-bold">0.000 USD</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Repaid</p>
                  <p className="text-white text-lg font-bold">0.000 USD</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Interest Paid</p>
                  <p className="text-white text-lg font-bold">0.000 USD</p>
                </div>
              </div>
            </div>

            {/* Tranche Structure */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Tranche Structure
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#374151" strokeWidth="8" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="8"
                        strokeDasharray="87 13"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">13%</div>
                        <div className="text-gray-400 text-sm">Senior</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Senior Tranche Details</p>
                      <p className="text-gray-400 text-sm">Allocation: 80%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">APY: 11%</p>
                      <p className="text-gray-400 text-sm">0 USD</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Junior Tranche</p>
                      <p className="text-gray-400 text-sm">Allocation: 20%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">APY: 23%</p>
                      <p className="text-gray-400 text-sm">0 USD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pool Activity */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Pool Activity
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-400 text-sm border-b border-gray-700">
                      <th className="text-left py-3 px-2">Action</th>
                      <th className="text-left py-3 px-2">Amount</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-2 text-white">Deposit</td>
                      <td className="py-3 px-2 text-white">5,142,205</td>
                      <td className="py-3 px-2 text-gray-400">8 Jul 2025</td>
                      <td className="py-3 px-2">
                        <span className="text-green-400 bg-green-400/20 px-2 py-1 rounded text-xs">Success</span>
                      </td>
                      <td className="py-3 px-2 text-purple-400">0x4f1...a8b2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Risk Report */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Risk Report
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Expected to Default</p>
                  <p className="text-white text-lg font-bold">800 USD</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Expected Loss Given Default</p>
                  <p className="text-white text-lg font-bold">10.5%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Probability of Default</p>
                  <p className="text-white text-lg font-bold">0.5%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Risk Score</p>
                  <p className="text-white text-lg font-bold">2.7/5.0</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <MarketDetailSidebar />
          </div>
        </div>
      </div>
    </div>
  )
}
