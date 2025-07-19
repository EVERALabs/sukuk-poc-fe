import { Header } from "@/components/header"
import { SwapInterface } from "@/components/invest-redeem"

export default function LitePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header centerNavItem="Invest" />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <SwapInterface />
      </div>
    </div>
  )
}
