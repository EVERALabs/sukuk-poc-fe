import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, PieChart, ChevronDown } from "lucide-react"

export default function ProPortfolioPage() {
  const navItems = ["Pool", "Portfolio", "History"]

  return (
    <div className="min-h-screen bg-background">
      <Header navItems={navItems} />

      <div className="p-6">
        {/* Overview Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-6">Portfolio Overview</h1>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <p className="text-muted-foreground text-sm mb-2">Total Portfolio Value</p>
              <p className="text-foreground text-2xl font-bold">0 USD</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <p className="text-muted-foreground text-sm mb-2">Total Profit Earned</p>
              <p className="text-foreground text-2xl font-bold">0 USD</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <p className="text-muted-foreground text-sm mb-2">Average Return</p>
              <p className="text-foreground text-2xl font-bold">0.00 %</p>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-6">Analytics</h2>

          <div className="grid grid-cols-2 gap-6">
            {/* Historical Investments */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Investment History
                </h3>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="text-primary bg-primary/20">
                    Daily
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    Weekly
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    Monthly
                  </Button>
                </div>
              </div>

              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg border border-border">
                <div className="text-center">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium">No Data</p>
                </div>
              </div>
            </div>

            {/* Portfolio Distribution */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <PieChart className="w-5 h-5 mr-2" />
                Sukuk Distribution
              </h3>

              <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg border border-border">
                <div className="text-center">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                    <PieChart className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium">No Data</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sukuk Holdings */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-6">Sukuk Holdings</h2>

          <div className="bg-card rounded-lg border border-border">
            {/* Filter and Controls */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Filter sukuk pools..."
                    className="bg-background border border-border rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground w-64"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border text-foreground bg-transparent hover:bg-accent"
                >
                  Columns
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-muted-foreground text-sm border-b border-border">
                    <th className="text-left py-4 px-6 font-medium">Pool Name</th>
                    <th className="text-left py-4 px-6 font-medium">Expected Return</th>
                    <th className="text-left py-4 px-6 font-medium">Invested Amount</th>
                    <th className="text-left py-4 px-6 font-medium">Term</th>
                    <th className="text-left py-4 px-6 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <div className="text-muted-foreground">
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <p className="font-medium">No sukuk holdings</p>
                        <p className="text-sm mt-1">Start investing in sukuk pools to see your holdings here</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
