"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface HeaderProps {
  centerNavItem?: string
  navItems?: string[]
}

export function Header({ centerNavItem, navItems }: HeaderProps) {
  const pathname = usePathname()
  const isLite = pathname.includes("/lite")
  const isPro = pathname.includes("/pro")
  const [isConnected, setIsConnected] = useState(false)

  const handleConnectWallet = () => {
    setIsConnected(true)
    setTimeout(() => {
      alert("Wallet connected successfully!")
    }, 500)
  }

  const getActiveNavItem = () => {
    if (pathname.includes("/pool")) return "Pool"
    if (pathname.includes("/portfolio")) return "Portfolio"
    if (pathname.includes("/history")) return "History"
    return ""
  }

  return (
    <header className="border-b border-gray-800 bg-gray-900">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="text-green-400 text-2xl font-bold">S</div>
            <span className="text-white text-xl font-semibold">sukuk</span>
          </div>

          <div className="flex items-center space-x-2">
            <Link href="/lite">
              <Button
                variant={isLite ? "default" : "outline"}
                size="sm"
                className={
                  isLite ? "bg-green-600 hover:bg-green-700" : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                Lite
              </Button>
            </Link>
            <Link href="/pro">
              <Button
                variant={isPro ? "default" : "outline"}
                size="sm"
                className={
                  isPro ? "bg-green-600 hover:bg-green-700" : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                Pro
              </Button>
            </Link>
          </div>
        </div>

        {centerNavItem && (
          <nav className="absolute left-1/2 transform -translate-x-1/2">
            <span className="text-white border-b-2 border-green-400 pb-1 text-sm font-medium">{centerNavItem}</span>
          </nav>
        )}

        {navItems && (
          <nav className="flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = getActiveNavItem() === item
              return (
                <Link
                  key={item}
                  href={`/pro/${item.toLowerCase()}`}
                  className={`text-sm transition-colors ${
                    isActive ? "text-white border-b-2 border-green-400 pb-1" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item}
                </Link>
              )
            })}
          </nav>
        )}

        <Button
          onClick={handleConnectWallet}
          className={`${
            isConnected
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
          }`}
        >
          {isConnected ? "Wallet Connected" : "Connect wallet"}
        </Button>
      </div>
    </header>
  )
}
