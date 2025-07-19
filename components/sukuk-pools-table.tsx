import { Info, ArrowUpDown } from "lucide-react"
import Link from "next/link"

const poolData = [
  {
    name: "FinCards Receivables Pool Amoy",
    status: "Closed",
    tvl: "10M",
    apy: "13%",
    statusType: "closed",
    id: "fincards-receivables-pool-amoy",
  },
  {
    name: "Cashflow Based Financing",
    status: "Closed",
    tvl: "10M",
    apy: "13%",
    statusType: "closed",
    id: "cashflow-based-financing",
  },
  {
    name: "Revenue Based Financing Amoy",
    status: "Closed",
    tvl: "8M",
    apy: "13%",
    statusType: "closed",
    id: "revenue-based-financing-amoy",
  },
  {
    name: "Trade Finance Pool",
    status: "Active",
    tvl: "15M",
    apy: "11%",
    statusType: "active",
    id: "trade-finance-pool",
  },
  {
    name: "Real Estate Sukuk Pool",
    status: "Active",
    tvl: "25M",
    apy: "9%",
    statusType: "active",
    id: "real-estate-sukuk-pool",
  },
  {
    name: "Infrastructure Financing",
    status: "Revoked",
    tvl: "5M",
    apy: "8%",
    statusType: "revoked",
    id: "infrastructure-financing",
  },
]

export function SukukPoolsTable() {
  const totalValueLocked = poolData.reduce((sum, pool) => {
    const value = Number.parseFloat(pool.tvl.replace("M", ""))
    return sum + value
  }, 0)

  return (
    <div className="bg-gray-900 text-white">
      <div className="px-6 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">Total Value Locked</h3>
              <span className="text-purple-400 text-lg">$</span>
            </div>
            <p className="text-white text-3xl font-bold">{totalValueLocked.toFixed(2)}M USD</p>
          </div>

          <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 rounded-xl p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">Total Interest Earned</h3>
              <span className="text-purple-400 text-lg">$</span>
            </div>
            <p className="text-white text-3xl font-bold">0.00 USD</p>
          </div>
        </div>

        {/* Pools Table */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-700">
                  <th className="text-left py-4 px-6 font-medium">Pool Name</th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                      <span>TVL</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                      <span>APY</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      <Info className="w-3 h-3 text-gray-500 hover:text-gray-400 cursor-help" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-medium">Tranches</th>
                  <th className="text-left py-4 px-6 font-medium">Chain</th>
                </tr>
              </thead>
              <tbody>
                {poolData.map((pool, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-800/50">
                    <td className="py-4 px-6">
                      <Link href={`/pro/pool/${pool.id}`} className="hover:text-purple-400 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">{pool.name.split(" ")[0].charAt(0)}</span>
                          </div>
                          <div>
                            <div className="font-medium text-white">{pool.name}</div>
                            <div className="text-gray-400 text-sm">{pool.status}</div>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-white font-medium">{pool.tvl}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-green-400 font-medium">{pool.apy}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          pool.statusType === "active"
                            ? "bg-green-400/20 text-green-400 border border-green-400/30"
                            : pool.statusType === "closed"
                              ? "bg-gray-400/20 text-gray-400 border border-gray-400/30"
                              : "bg-red-400/20 text-red-400 border border-red-400/30"
                        }`}
                      >
                        {pool.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-8 h-8 bg-purple-500/30 rounded-full border-2 border-purple-500 flex items-center justify-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
                        <span className="text-sm">Polygon Amoy</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Sukuk pools are Sharia-compliant investment vehicles. Always review pool details before investing.
          </p>
        </div>
      </div>
    </div>
  )
}
