import Link from "next/link"
import { ArrowLeft, Calendar, DollarSign, TrendingUp, Shield, Users, Clock, PieChart, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PoolDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/pro/pool" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Pools</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pool Header */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">Trade Finance Pool #{params.id}</h1>
                  <p className="text-muted-foreground">Sharia-Compliant Trade Finance</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-border text-muted-foreground bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    Active
                  </Button>
                  <Button variant="outline" size="sm" className="border-border text-muted-foreground bg-transparent">
                    <Shield className="w-4 h-4 mr-2" />
                    Sharia
                  </Button>
                  <Button variant="outline" size="sm" className="border-border text-muted-foreground bg-transparent">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    High Yield
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed">
                This pool provides financing for international trade transactions, focusing on 
                Sharia-compliant structures. The pool invests in trade receivables, letters of credit, 
                and other trade finance instruments with strong collateral backing.
              </p>
            </div>

            {/* Pool Statistics */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Pool Statistics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Pool Capacity</p>
                  <p className="text-foreground text-lg font-semibold">10M USD</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Total Value Locked</p>
                  <p className="text-foreground text-lg font-semibold">8.5M USD</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Minimum Investment</p>
                  <p className="text-foreground text-lg font-semibold">1,000 USD</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Expected Return</p>
                  <p className="text-foreground text-lg font-semibold">12.5% APY</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Investment Period</p>
                  <p className="text-foreground text-lg font-semibold">12 months</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Profit Distribution</p>
                  <p className="text-foreground text-lg font-semibold">Monthly</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Sharia Compliance</p>
                  <p className="text-foreground text-lg font-semibold">100%</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Status</p>
                  <p className="text-muted-foreground text-lg font-bold">Closed</p>
                </div>
              </div>
            </div>

            {/* Capital Structure */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Capital Structure</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-foreground font-medium">Senior Tranche</span>
                  </div>
                  <div className="text-muted-foreground text-sm">Senior</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-foreground font-medium">Senior Notes</p>
                      <p className="text-muted-foreground text-sm">Allocation: 80%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-foreground font-semibold">8M USD</p>
                      <p className="text-muted-foreground text-sm">8.5% APY</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <p className="text-foreground font-medium">Junior Notes</p>
                      <p className="text-muted-foreground text-sm">Allocation: 20%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-foreground font-semibold">2M USD</p>
                      <p className="text-muted-foreground text-sm">18.5% APY</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-muted-foreground text-sm border-b border-border">
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Type</th>
                      <th className="text-left py-3 px-2">Amount</th>
                      <th className="text-left py-3 px-2">Wallet</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 px-2 text-muted-foreground">15 Jul 2025</td>
                      <td className="py-3 px-2">
                        <Badge variant="secondary" className="bg-primary text-primary-foreground">Investment</Badge>
                      </td>
                      <td className="py-3 px-2 text-foreground">50,000 USD</td>
                      <td className="py-3 px-2 text-primary">0x4f1...a8b2</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Risk Metrics */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Risk Metrics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Sharia Board Approval</p>
                  <p className="text-foreground text-lg font-semibold">Approved</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Compliance Rating</p>
                  <p className="text-foreground text-lg font-semibold">AAA</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Structure Type</p>
                  <p className="text-foreground text-lg font-semibold">Murabaha</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Audit Date</p>
                  <p className="text-foreground text-lg font-semibold">30 Jun 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Invest Now
                </Button>
                <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                  <PieChart className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                  <Users className="w-4 h-4 mr-2" />
                  Pool Members
                </Button>
              </div>
            </div>

            {/* Pool Status */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Pool Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="secondary" className="bg-destructive text-destructive-foreground">Closed</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Next Distribution</span>
                  <span className="text-foreground">15 Aug 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Maturity Date</span>
                  <span className="text-foreground">15 Jul 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
