import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown } from "lucide-react"

export default function ProHistoryPage() {
  const navItems = ["Pool", "Portfolio", "History"]

  return (
    <div className="min-h-screen bg-background">
      <Header navItems={navItems} />

      <div className="p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-foreground mb-6">Transaction History</h1>

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tx hash..."
                className="bg-background border border-border rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground w-64"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-border text-foreground bg-transparent hover:bg-accent"
            >
              <Filter className="w-4 h-4 mr-2" />
              Status
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="border-border text-foreground bg-transparent hover:bg-accent"
            >
              <Filter className="w-4 h-4 mr-2" />
              Pool Type
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-border text-foreground bg-transparent hover:bg-accent"
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
        </div>

        {/* Table */}
        <div className="bg-card rounded-lg border border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-muted-foreground text-sm border-b border-border">
                  <th className="text-left py-4 px-6 font-medium">Id</th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                      <span>Amount</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                      <span>Pool</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                      <span>Date</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                      <span>Transaction Type</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                      <span>Status</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="text-left py-4 px-6 font-medium">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                      <span>Transaction</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="text-muted-foreground">
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-muted-foreground" />
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
          <div className="flex items-center justify-between px-6 py-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground text-sm">Rows per page:</span>
              <Select defaultValue="5">
                <SelectTrigger className="w-16 h-8 bg-background border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="5" className="text-foreground hover:bg-accent">
                    5
                  </SelectItem>
                  <SelectItem value="10" className="text-foreground hover:bg-accent">
                    10
                  </SelectItem>
                  <SelectItem value="25" className="text-foreground hover:bg-accent">
                    25
                  </SelectItem>
                  <SelectItem value="50" className="text-foreground hover:bg-accent">
                    50
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground text-sm">Page 1 of 0</span>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" disabled className="w-8 h-8 p-0 text-muted-foreground">
                  <ChevronsLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" disabled className="w-8 h-8 p-0 text-muted-foreground">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" disabled className="w-8 h-8 p-0 text-muted-foreground">
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" disabled className="w-8 h-8 p-0 text-muted-foreground">
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
