"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDown, X, Info } from "lucide-react"
import Link from "next/link"

export default function EarnPage() {
    const [isEarnDropdownOpen, setIsEarnDropdownOpen] = useState(false)
    const [hideZeroBalance, setHideZeroBalance] = useState(false)
    const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Banner */}
            <div className="bg-black text-white px-4 py-3 text-center text-sm">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div></div>
                    <span>USUAL x locking live • Earn boosted weekly USD0 from protocol revenue by locking USUALx. Lock Now</span>
                    <X className="w-4 h-4 cursor-pointer" />
                </div>
            </div>

            {/* Navigation */}
            <nav className="bg-black text-white px-4 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full border-2 border-purple-400"></div>
                            <span className="font-semibold">USUAL</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="flex items-center space-x-6">
                            <Link href="/" className="cursor-pointer hover:text-gray-300">
                                Home
                            </Link>
                            <Link href="/swap" className="cursor-pointer hover:text-gray-300">
                                <div className="flex items-center space-x-1">
                                    <span>Swap</span>
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                            </Link>
                            <div className="relative">
                                <div
                                    className="flex items-center space-x-1 cursor-pointer text-purple-400"
                                    onClick={() => setIsEarnDropdownOpen(!isEarnDropdownOpen)}
                                >
                                    <span>Earn</span>
                                    <ChevronDown className="w-4 h-4" />
                                </div>

                                {/* Earn Dropdown */}
                                {isEarnDropdownOpen && (
                                    <>
                                        {/* Backdrop */}
                                        <div
                                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                                            onClick={() => setIsEarnDropdownOpen(false)}
                                        />

                                        {/* Dropdown Menu */}
                                        <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900 rounded-lg shadow-xl z-50 p-4">
                                            <div className="space-y-4">
                                                {/* Earn Option */}
                                                <Link
                                                    href="/earn"
                                                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer"
                                                    onClick={() => setIsEarnDropdownOpen(false)}
                                                >
                                                    <div className="w-6 h-6 mt-1">
                                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-semibold mb-1">Earn</h3>
                                                        <p className="text-gray-400 text-sm">
                                                            Discover a wide range of DeFi products to generate yield.
                                                        </p>
                                                    </div>
                                                </Link>

                                                {/* Vaults Option */}
                                                <Link
                                                    href="/vault"
                                                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer"
                                                    onClick={() => setIsEarnDropdownOpen(false)}
                                                >
                                                    <div className="w-6 h-6 mt-1">
                                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-semibold mb-1">Vaults</h3>
                                                        <p className="text-gray-400 text-sm">
                                                            Deposit your Usual assets into vaults and access to powerful external strategies.
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="relative">
                                <div
                                    className="flex items-center space-x-1 cursor-pointer"
                                    onClick={() => setIsExploreDropdownOpen(!isExploreDropdownOpen)}
                                >
                                    <span>Explore</span>
                                    <ChevronDown className="w-4 h-4" />
                                </div>

                                {/* Explore Dropdown */}
                                {isExploreDropdownOpen && (
                                    <>
                                        {/* Backdrop */}
                                        <div
                                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                                            onClick={() => setIsExploreDropdownOpen(false)}
                                        />

                                        {/* Dropdown Menu */}
                                        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 rounded-lg shadow-xl z-50 p-4">
                                            <div className="space-y-2">
                                                {/* Documentation */}
                                                <div className="p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
                                                    <h3 className="text-white font-medium">Documentation</h3>
                                                </div>

                                                {/* Transparency */}
                                                <div className="p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
                                                    <h3 className="text-white font-medium">Transparency</h3>
                                                </div>

                                                {/* Governance */}
                                                <div className="p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
                                                    <h3 className="text-white font-medium">Governance</h3>
                                                </div>

                                                {/* Blog */}
                                                <div className="p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
                                                    <h3 className="text-white font-medium">Blog</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <Button variant="outline" className="bg-transparent border-gray-600 text-white hover:bg-gray-800">
                        Connect
                    </Button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Rewards Dashboard */}
                <section className="mb-8">
                    <Card className="bg-black text-white p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-gray-400">Pending Rewards</span>
                                    <Info className="w-4 h-4 text-gray-400" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-full border border-gray-600"></div>
                                    <span className="text-3xl font-bold">0</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-gray-400">Next Cycle in</span>
                                    <Info className="w-4 h-4 text-gray-400" />
                                </div>
                                <div className="text-3xl font-bold">--</div>
                            </div>

                            <div className="text-center">
                                <p className="text-gray-400 mb-4">No wallet = no data :(</p>
                                <p className="text-gray-300 mb-6">Connect to consult all your positions and rewards available.</p>
                                <Button className="bg-white text-black hover:bg-gray-200">Connect</Button>
                            </div>

                            <div className="text-center">
                                <div className="flex items-center justify-center space-x-2 mb-2">
                                    <div className="w-6 h-6 rounded-full border border-gray-600"></div>
                                    <span className="text-2xl font-bold">0.00</span>
                                </div>
                                <div className="text-gray-400 mb-4">$0.00</div>
                                <Button className="w-full bg-white text-black hover:bg-gray-200">Claim rewards</Button>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Staking Interface */}
                <section className="mb-8">
                    <Card className="bg-black text-white p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left - USUALx Display */}
                            <div className="flex items-center space-x-6">
                                <div className="w-24 h-24">
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        {/* 3D Isometric USUALx Token */}
                                        <defs>
                                            <linearGradient id="tokenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#8B5CF6" />
                                                <stop offset="100%" stopColor="#EC4899" />
                                            </linearGradient>
                                        </defs>
                                        {/* Base platform */}
                                        <polygon points="20,70 50,85 80,70 50,55" fill="#374151" />
                                        <polygon points="20,70 50,85 50,75 20,60" fill="#4B5563" />
                                        <polygon points="50,85 80,70 80,60 50,75" fill="#6B7280" />
                                        {/* Token ring */}
                                        <circle cx="50" cy="65" r="15" fill="none" stroke="url(#tokenGradient)" strokeWidth="3" />
                                        <circle cx="50" cy="65" r="8" fill="url(#tokenGradient)" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-1">0.00 USUALx</h3>
                                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                                        <span>0.00</span>
                                        <div className="w-4 h-4 rounded-full border border-gray-600"></div>
                                    </div>
                                    <span className="text-gray-400">$0.00</span>
                                </div>
                            </div>

                            {/* Middle - APY Information */}
                            <div className="space-y-6">
                                <div>
                                    <div className="text-lg font-semibold mb-2">Staking APY</div>
                                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span>Daily rewards</span>
                                    </div>
                                    <div className="text-2xl font-bold">50% APY</div>
                                    <div className="flex items-center space-x-2 text-gray-400">
                                        <span>--</span>
                                        <div className="w-4 h-4 rounded-full border border-gray-600"></div>
                                    </div>
                                </div>

                                <div>
                                    <div className="text-lg font-semibold mb-2">Locking APY</div>
                                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span>Weekly rewards</span>
                                    </div>
                                    <div className="text-2xl font-bold">0% APY</div>
                                    <div className="flex items-center space-x-2 text-gray-400">
                                        <span>--</span>
                                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Connect Section */}
                            <div className="text-center">
                                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <div className="w-8 h-8 rounded-full border-2 border-purple-400"></div>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Connect and get USUALx to earn protocol revenue!</h3>
                                <p className="text-gray-400 mb-4">
                                    Get some <span className="text-white">USUAL x</span> and earn up to{" "}
                                    <span className="text-white">36% APY</span>.
                                </p>
                                <Button className="w-full bg-white text-black hover:bg-gray-200">Connect</Button>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Yield Opportunities */}
                <section className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">Yield Opportunities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* USD0++ */}
                        <Card className="bg-black text-white p-6">
                            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-black font-bold">$</span>
                            </div>
                            <h3 className="font-bold mb-1">USD0++</h3>
                            <p className="text-gray-400 text-sm mb-4">Usual</p>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">USUAL APY</span>
                                    <span className="text-sm">7.8%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">Maturity APY</span>
                                    <span className="text-green-400 text-sm">2%</span>
                                </div>
                            </div>
                        </Card>

                        {/* USUALx */}
                        <Card className="bg-black text-white p-6">
                            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                                <div className="w-6 h-6 rounded-full border-2 border-purple-400"></div>
                            </div>
                            <h3 className="font-bold mb-1">USUALx</h3>
                            <p className="text-gray-400 text-sm mb-4">Usual</p>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">USUAL APY</span>
                                    <span className="text-sm">50%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">USD0 APY</span>
                                    <span className="text-green-400 text-sm">36%</span>
                                </div>
                            </div>
                        </Card>

                        {/* ETH0 */}
                        <Card className="bg-black text-white p-6">
                            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                                <div className="w-6 h-6 rounded-full bg-blue-400"></div>
                            </div>
                            <h3 className="font-bold mb-1">ETH0</h3>
                            <p className="text-gray-400 text-sm mb-4">Usual</p>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">USUAL APY</span>
                                    <span className="text-sm">7.3%</span>
                                </div>
                            </div>
                        </Card>

                        {/* ETH0 Morpho */}
                        <Card className="bg-white p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                            </div>
                            <h3 className="font-bold mb-1">ETH0</h3>
                            <p className="text-gray-400 text-sm mb-4">Morpho</p>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">Usual APY</span>
                                    <span className="text-sm">7.3% - 12%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">Bonus</span>
                                    <Badge className="bg-blue-500 text-white">+8</Badge>
                                </div>
                            </div>
                        </Card>

                        {/* USD0/USDC */}
                        <Card className="bg-white p-6">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-green-600 font-bold">$</span>
                            </div>
                            <h3 className="font-bold mb-1">USD0/USDC</h3>
                            <p className="text-gray-400 text-sm mb-4">Fluid</p>
                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">Usual APY</span>
                                    <span className="text-sm">11%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">Fluid APY</span>
                                    <span className="text-sm">2.2%</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* Earn Usual Assets */}
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Earn Usual Assets</h2>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="hide-zero" checked={hideZeroBalance} />
                                <label htmlFor="hide-zero" className="text-sm text-gray-600">
                                    Hide zero balance
                                </label>
                            </div>
                            <Button variant="outline" size="sm">
                                Networks <ChevronDown className="w-4 h-4 ml-1" />
                            </Button>
                            <Button variant="outline" size="sm">
                                Categories <ChevronDown className="w-4 h-4 ml-1" />
                            </Button>
                        </div>
                    </div>

                    <Card className="p-8">
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="text-gray-400 mb-4">Positions</h3>
                                <div className="h-32 bg-gray-100 rounded-lg"></div>
                            </div>
                            <div>
                                <h3 className="text-gray-400 mb-4">Average APY</h3>
                                <div className="h-32 bg-gray-100 rounded-lg"></div>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-gray-600 mb-4">No wallet = no data :(</p>
                            <p className="text-gray-600 mb-6">Connect to consult all your positions and vestings.</p>
                            <Button className="bg-black text-white hover:bg-gray-800">Connect</Button>
                        </div>
                    </Card>
                </section>

                {/* Social Links */}
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-8 text-gray-600">
                        <span className="cursor-pointer hover:text-gray-900">X (Twitter)</span>
                        <span className="cursor-pointer hover:text-gray-900">Discord</span>
                        <span className="cursor-pointer hover:text-gray-900">LinkedIn</span>
                        <span className="cursor-pointer hover:text-gray-900">Mirror</span>
                        <span className="cursor-pointer hover:text-gray-900">Telegram</span>
                        <span className="cursor-pointer hover:text-gray-900">Galxe</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
