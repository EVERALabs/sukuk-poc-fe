import { Header } from "@/components/header"
import { SukukPoolsTable } from "@/components/sukuk-pools-table"

export default function ProPoolPage() {
  const navItems = ["Pool", "Portfolio", "History"]

  return (
    <div className="min-h-screen bg-gray-900">
      <Header navItems={navItems} />
      <SukukPoolsTable />
    </div>
  )
}
