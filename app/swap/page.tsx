"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown, X, ArrowUpDown, Plus, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function SwapPage() {
    const [fromAmount, setFromAmount] = useState("")
    const [toAmount, setToAmount] = useState("")
    const [expandedFaq, setExpandedFaq] = useState<string | null>("what-is-usual")
    const [isEarnDropdownOpen, setIsEarnDropdownOpen] = useState(false)
    const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false)

    const toggleFaq = (id: string) => {
        setExpandedFaq(expandedFaq === id ? null : id)
    }

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
                            <div className="flex items-center space-x-1">
                                <span className="cursor-pointer text-purple-400">Swap</span>
                                <ChevronDown className="w-4 h-4" />
                            </div>
                            <div className="relative">
                                <div
                                    className="flex items-center space-x-1 cursor-pointer"
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
                {/* Swap Interface */}
                <section className="mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Swap Form */}
                        <div>
                            <div className="flex items-center space-x-4 mb-8">
                                <h2 className="text-2xl font-bold">Swap</h2>
                                <ChevronDown className="w-5 h-5" />
                                <div className="ml-auto">
                                    <Button variant="outline" size="sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                                            />
                                        </svg>
                                    </Button>
                                </div>
                            </div>

                            <Card className="p-6 mb-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-bold">$</span>
                                        </div>
                                        <span className="font-semibold">USDC</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={fromAmount}
                                        onChange={(e) => setFromAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="text-right text-2xl font-bold bg-transparent outline-none w-32"
                                    />
                                </div>
                                <div className="text-sm text-gray-500">Balance: 0.00</div>
                            </Card>

                            <div className="flex justify-center mb-4">
                                <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                                    <ArrowUpDown className="w-4 h-4" />
                                </Button>
                            </div>

                            <Card className="p-6 mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 rounded-full border-2 border-black"></div>
                                        <span className="font-semibold">USUAL</span>
                                        <div className="flex space-x-1">
                                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        value={toAmount}
                                        onChange={(e) => setToAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="text-right text-2xl font-bold bg-transparent outline-none w-32"
                                    />
                                </div>
                                <div className="text-sm text-gray-500">Balance: 0.00</div>
                            </Card>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Min. received</span>
                                    <span>1 USDC = -- USUAL</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">APY forecast</span>
                                    <span>0%</span>
                                </div>
                            </div>
                        </div>

                        {/* Get Started Section */}
                        <div className="flex flex-col items-center justify-center text-center">
                            <div className="w-64 h-48 mb-8">
                                <svg viewBox="0 0 300 200" className="w-full h-full">
                                    {/* Swap illustration */}
                                    <circle cx="80" cy="100" r="30" fill="#3B82F6" />
                                    <text x="80" y="105" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
                                        $
                                    </text>

                                    <circle cx="220" cy="100" r="30" fill="#8B5CF6" />
                                    <circle cx="220" cy="100" r="20" fill="none" stroke="#8B5CF6" strokeWidth="2" />

                                    <path d="M 120 100 L 180 100" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                                    <path d="M 180 120 L 120 120" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead2)" />

                                    <defs>
                                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                                        </marker>
                                        <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                            <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                                        </marker>
                                    </defs>

                                    {/* Technical elements */}
                                    <rect x="50" y="150" width="40" height="20" fill="#E5E7EB" rx="2" />
                                    <rect x="210" y="150" width="40" height="20" fill="#E5E7EB" rx="2" />
                                    <circle cx="150" cy="160" r="8" fill="#10B981" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-bold mb-4">Get started</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <p>1. Select the token and the amount to Swap</p>
                                <p>2. Pick the token you want to exchange for</p>
                                <p>3. The quote will be ready in a moment!</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Usual Assets Section */}
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold">Usual Assets</h1>
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full border-2 border-black"></div>
                            <span className="font-semibold">USUAL</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-8 h-8 rounded-full border-2 border-black"></div>
                                <h2 className="text-3xl font-bold">USUAL, A Long-Term Value Token Backed by Real Yield</h2>
                            </div>

                            <p className="text-gray-600 mb-8 text-lg">
                                USUAL rewards USD0's adoption and usage, aligning incentives with contributors to fuel protocol growth.
                                Its distribution introduces new DeFi primitives, ensuring rapid ecosystem scaling and sustainable
                                decentralization.
                            </p>

                            <Button variant="outline" className="mb-8 bg-transparent">
                                Learn more <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>

                            {/* Distribution Bar */}
                            <div className="mb-8">
                                <div className="h-2 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full mb-2"></div>
                                <div className="flex justify-between text-sm">
                                    <span>90% Community</span>
                                    <span>10% Initiators</span>
                                </div>
                            </div>

                            {/* Three Pillars */}
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <h3 className="font-bold mb-2">Real Ownership</h3>
                                    <p className="text-sm text-gray-600">
                                        The USUAL token gives you the power to control the protocol's treasury, fueled by 100% of its
                                        revenue.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">Real Revenues</h3>
                                    <p className="text-sm text-gray-600">
                                        Usual's mechanism ensures USUAL issuance is always aligned with future cash flows, preventing
                                        dilution for long-term holders.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-2">Scarcity Advantage</h3>
                                    <p className="text-sm text-gray-600">
                                        USUAL becomes increasingly scarce over time. As USD0++ TVL rises, the minting rate slows, creating
                                        natural scarcity that rewards early adopters and long-term believers.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="w-64 h-64 relative">
                                <div className="w-full h-full rounded-full border border-gray-300 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-full border-4 border-purple-400 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-purple-400"></div>
                                    </div>
                                </div>
                                {/* Orbital elements */}
                                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s" }}>
                                    <div className="absolute top-4 left-1/2 w-2 h-2 bg-gray-400 rounded-full transform -translate-x-1/2"></div>
                                    <div className="absolute bottom-4 left-1/2 w-2 h-2 bg-gray-400 rounded-full transform -translate-x-1/2"></div>
                                    <div className="absolute top-1/2 left-4 w-2 h-2 bg-gray-400 rounded-full transform -translate-y-1/2"></div>
                                    <div className="absolute top-1/2 right-4 w-2 h-2 bg-gray-400 rounded-full transform -translate-y-1/2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Metrics Section */}
                <section className="mb-12">
                    <div className="grid grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-green-400">▲</span>
                                <span className="font-bold text-xl">$24,429,125</span>
                            </div>
                            <div className="text-sm text-gray-600">Protocol Treasury</div>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-green-400">▲</span>
                                <span className="font-bold text-xl">$94,223,664</span>
                            </div>
                            <div className="text-sm text-gray-600">4-Year Cash Flow</div>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="text-red-400">▼</span>
                                <span className="font-bold text-xl">8.2 USUAL/USD0++</span>
                            </div>
                            <div className="text-sm text-gray-600">Minting Factor</div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold">FAQ</h2>
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full border-2 border-black"></div>
                            <span className="font-semibold">USUAL</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* What is USUAL? */}
                        <Card className="p-6">
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => toggleFaq("what-is-usual")}
                            >
                                <h3 className="text-lg font-semibold">What is USUAL?</h3>
                                <Plus
                                    className={`w-5 h-5 transition-transform ${expandedFaq === "what-is-usual" ? "rotate-45" : ""}`}
                                />
                            </div>
                            {expandedFaq === "what-is-usual" && (
                                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-gray-600 mb-6">
                                            $USUAL is the governance token powering the Usual protocol, uniquely designed with an intrinsic
                                            value tied directly to the protocol's revenue model. $USUAL drives the adoption and use of USD0,
                                            aligning incentives for contributors and fueling protocol growth. Its innovative distribution
                                            model sets the stage for new DeFi possibilities, accelerating ecosystem expansion and sustainable
                                            decentralization.
                                        </p>
                                        <Button variant="outline">
                                            Read Docs <ExternalLink className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <div className="w-48 h-48">
                                            <svg viewBox="0 0 200 200" className="w-full h-full">
                                                {/* Technical diagram */}
                                                <circle cx="100" cy="100" r="80" fill="none" stroke="#E5E7EB" strokeWidth="2" />
                                                <circle cx="100" cy="100" r="40" fill="none" stroke="#8B5CF6" strokeWidth="3" />
                                                <circle cx="100" cy="100" r="20" fill="#8B5CF6" />

                                                {/* Connection lines */}
                                                <line
                                                    x1="100"
                                                    y1="20"
                                                    x2="100"
                                                    y2="60"
                                                    stroke="#6B7280"
                                                    strokeWidth="1"
                                                    strokeDasharray="2,2"
                                                />
                                                <line
                                                    x1="100"
                                                    y1="140"
                                                    x2="100"
                                                    y2="180"
                                                    stroke="#6B7280"
                                                    strokeWidth="1"
                                                    strokeDasharray="2,2"
                                                />
                                                <line
                                                    x1="20"
                                                    y1="100"
                                                    x2="60"
                                                    y2="100"
                                                    stroke="#6B7280"
                                                    strokeWidth="1"
                                                    strokeDasharray="2,2"
                                                />
                                                <line
                                                    x1="140"
                                                    y1="100"
                                                    x2="180"
                                                    y2="100"
                                                    stroke="#6B7280"
                                                    strokeWidth="1"
                                                    strokeDasharray="2,2"
                                                />

                                                {/* Outer elements */}
                                                <circle cx="100" cy="20" r="8" fill="#10B981" />
                                                <circle cx="180" cy="100" r="8" fill="#F59E0B" />
                                                <circle cx="100" cy="180" r="8" fill="#EF4444" />
                                                <circle cx="20" cy="100" r="8" fill="#3B82F6" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>

                        {/* Other FAQ Items */}
                        <Card className="p-6">
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => toggleFaq("what-makes-different")}
                            >
                                <h3 className="text-lg font-semibold">What makes USUAL Different?</h3>
                                <Plus
                                    className={`w-5 h-5 transition-transform ${expandedFaq === "what-makes-different" ? "rotate-45" : ""}`}
                                />
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => toggleFaq("how-distributed")}
                            >
                                <h3 className="text-lg font-semibold">How are USUAL tokens distributed?</h3>
                                <Plus
                                    className={`w-5 h-5 transition-transform ${expandedFaq === "how-distributed" ? "rotate-45" : ""}`}
                                />
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => toggleFaq("what-is-swap")}
                            >
                                <h3 className="text-lg font-semibold">What is a swap?</h3>
                                <Plus className={`w-5 h-5 transition-transform ${expandedFaq === "what-is-swap" ? "rotate-45" : ""}`} />
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => toggleFaq("how-to-swap")}
                            >
                                <h3 className="text-lg font-semibold">How to swap?</h3>
                                <Plus className={`w-5 h-5 transition-transform ${expandedFaq === "how-to-swap" ? "rotate-45" : ""}`} />
                            </div>
                        </Card>
                    </div>
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
