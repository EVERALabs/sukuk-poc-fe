import { Header } from "@/components/header"
import { SukukPoolsTable } from "@/components/sukuk-pools-table"

export default function ProPoolPage() {
  const navItems = ["Pool", "Portfolio", "History"]

  return (
    <div className="min-h-screen bg-background">
      <Header navItems={navItems} />
      <SukukPoolsTable />
    </div>
  )
}
