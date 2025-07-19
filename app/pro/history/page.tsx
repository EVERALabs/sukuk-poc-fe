import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown } from "lucide-react"

export default function ProHistoryPage() {
  const navItems = ["Pool", "Portfolio", "History"]

  return (
    <div className="min-h-screen bg-gray-900">
      <Header navItems={navItems} />

      <div className="p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-6">Transaction History</h1>

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search tx hash..."
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:border-purple-400 text-white placeholder-gray-400 w-64"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
            >
              <Filter className="w-4 h-4 mr-2" />
              Status
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
            >
              <Filter className="w-4 h-4 mr-2" />
              Pool Type
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 text-sm border-b border-gray-700">
                  <th className="text-left py-4 px-6 font-medium">Id</th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                      <span>Amount</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                      <span>Pool</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                      <span>Date</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                      <span>Transaction Type</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                      <span>Status</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-white">
                      <span>Transaction</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="text-gray-400">
                      <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-500" />
                      </div>
                      <p className="font-medium">No results.</p>
                      <p className="text-sm mt-1">
                        Your sukuk transaction history will appear here once you start investing
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Rows per page:</span>
              <Select defaultValue="5">
                <SelectTrigger className="w-16 h-8 bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="5" className="text-white hover:bg-gray-600">
                    5
                  </SelectItem>
                  <SelectItem value="10" className="text-white hover:bg-gray-600">
                    10
                  </SelectItem>
                  <SelectItem value="25" className="text-white hover:bg-gray-600">
                    25
                  </SelectItem>
                  <SelectItem value="50" className="text-white hover:bg-gray-600">
                    50
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Page 1 of 0</span>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" disabled className="w-8 h-8 p-0 text-gray-500">
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" disabled className="w-8 h-8 p-0 text-gray-500">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" disabled className="w-8 h-8 p-0 text-gray-500">
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" disabled className="w-8 h-8 p-0 text-gray-500">
                  <ChevronsRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
