import { Header } from "@/components/header"
import { MarketDetailSidebar } from "@/components/market-detail-sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, BarChart3, Activity, Shield } from "lucide-react"
import Link from "next/link"

export default function PoolDetailPage({ params }: { params: { id: string } }) {
  const navItems = ["Pool", "Portfolio", "History"]

  return (
    <div className="min-h-screen bg-gray-900">
      <Header navItems={navItems} />

      <div className="p-6">
        {/* Back Button */}
        <Link href="/pro/pool" className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Pools</span>
        </Link>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Header */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">FinCards Receivables Sukuk Pool</h1>
                    <p className="text-gray-400">Sharia-Compliant Trade Finance</p>
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
                This Sukuk pool provides Sharia-compliant financing for trade receivables, offering investors exposure
                to diversified trade finance assets while adhering to Islamic finance principles. The pool is structured
                to ensure compliance with Murabaha and Ijara principles.
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
                  <p className="text-gray-400 text-sm mb-1">Expected Return</p>
                  <p className="text-green-400 text-lg font-bold">13%</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Investment Period</p>
                  <p className="text-white text-lg font-bold">12 Months</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Profit Distribution</p>
                  <p className="text-white text-lg font-bold">Quarterly</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Sharia Compliance</p>
                  <p className="text-green-400 text-lg font-bold">Certified</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Risk Rating</p>
                  <p className="text-yellow-400 text-lg font-bold">Medium</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Status</p>
                  <p className="text-gray-400 text-lg font-bold">Closed</p>
                </div>
              </div>
            </div>

            {/* Tranche Structure */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Sukuk Structure
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
                        strokeDasharray="80 20"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">80%</div>
                        <div className="text-gray-400 text-sm">Senior</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Senior Sukuk</p>
                      <p className="text-gray-400 text-sm">Allocation: 80%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">Return: 11%</p>
                      <p className="text-gray-400 text-sm">8M USD</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Junior Sukuk</p>
                      <p className="text-gray-400 text-sm">Allocation: 20%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">Return: 18%</p>
                      <p className="text-gray-400 text-sm">2M USD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pool Activity */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Recent Activity
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
                      <td className="py-3 px-2 text-white">Investment</td>
                      <td className="py-3 px-2 text-white">1,000,000</td>
                      <td className="py-3 px-2 text-gray-400">15 Jul 2025</td>
                      <td className="py-3 px-2">
                        <span className="text-green-400 bg-green-400/20 px-2 py-1 rounded text-xs">Confirmed</span>
                      </td>
                      <td className="py-3 px-2 text-purple-400">0x4f1...a8b2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sharia Compliance */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Sharia Compliance
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Sharia Board Approval</p>
                  <p className="text-green-400 text-lg font-bold">Certified</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Compliance Rating</p>
                  <p className="text-green-400 text-lg font-bold">AAA</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Structure Type</p>
                  <p className="text-white text-lg font-bold">Murabaha</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Audit Date</p>
                  <p className="text-white text-lg font-bold">Jan 2025</p>
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
