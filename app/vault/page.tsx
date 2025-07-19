"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, X, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function VaultPage() {
    const [isEarnDropdownOpen, setIsEarnDropdownOpen] = useState(false)
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
                {/* Header */}
                <section className="mb-12">
                    <h1 className="text-4xl font-bold mb-4">Vaults</h1>
                    <p className="text-xl text-gray-600 max-w-3xl">
                        Automate your earnings with ease with strategy vaults. Deposit assets and let the vaults optimize for yields
                        across the very best protocols in DeFi.
                    </p>
                </section>

                {/* Featured Vault */}
                <section className="mb-12">
                    <Card className="bg-black text-white p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="flex items-center space-x-6">
                                <div className="w-32 h-32">
                                    <svg viewBox="0 0 120 120" className="w-full h-full">
                                        {/* 3D Isometric Vault */}
                                        <defs>
                                            <linearGradient id="vaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#6B7280" />
                                                <stop offset="100%" stopColor="#374151" />
                                            </linearGradient>
                                            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#10B981" />
                                                <stop offset="100%" stopColor="#059669" />
                                            </linearGradient>
                                        </defs>
                                        {/* Base platform */}
                                        <polygon points="20,90 60,105 100,90 60,75" fill="#4B5563" />
                                        <polygon points="20,90 60,105 60,95 20,80" fill="#6B7280" />
                                        <polygon points="60,105 100,90 100,80 60,95" fill="#9CA3AF" />
                                        {/* Vault body */}
                                        <polygon points="30,70 90,70 90,30 30,30" fill="url(#vaultGradient)" />
                                        <polygon points="30,30 90,30 95,25 35,25" fill="#9CA3AF" />
                                        <polygon points="90,30 95,25 95,65 90,70" fill="#6B7280" />
                                        {/* Dollar sign */}
                                        <circle cx="60" cy="50" r="12" fill="url(#greenGradient)" />
                                        <text x="60" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                                            $
                                        </text>
                                        {/* Control panel */}
                                        <rect x="75" y="40" width="8" height="4" fill="#EC4899" />
                                        <rect x="75" y="50" width="8" height="4" fill="#8B5CF6" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <h2 className="text-2xl font-bold">Syrup Vault</h2>
                                        <Badge variant="outline" className="text-gray-400 border-gray-600">
                                            Powered by LAGOON
                                        </Badge>
                                    </div>
                                    <p className="text-gray-300 mb-4">
                                        A yield-optimised vault that earns you rewards from both Syrup and Usual protocols effortlessly.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">TVL</div>
                                    <div className="text-2xl font-bold">$28.72k</div>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-1 text-gray-400 text-sm mb-1">
                                        <span>APY</span>
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="text-2xl font-bold">9.7%</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Rewards</div>
                                    <div className="flex space-x-1">
                                        <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                                        <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Sky Vault */}
                <section className="mb-12">
                    <Card className="bg-black text-white p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="flex items-center space-x-6">
                                <div className="w-32 h-32">
                                    <svg viewBox="0 0 120 120" className="w-full h-full">
                                        {/* 3D Isometric Vault with different styling */}
                                        <defs>
                                            <linearGradient id="skyVaultGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#1F2937" />
                                                <stop offset="100%" stopColor="#111827" />
                                            </linearGradient>
                                        </defs>
                                        {/* Base platform */}
                                        <polygon points="20,90 60,105 100,90 60,75" fill="#374151" />
                                        <polygon points="20,90 60,105 60,95 20,80" fill="#4B5563" />
                                        <polygon points="60,105 100,90 100,80 60,95" fill="#6B7280" />
                                        {/* Vault body */}
                                        <polygon points="30,70 90,70 90,30 30,30" fill="url(#skyVaultGradient)" />
                                        <polygon points="30,30 90,30 95,25 35,25" fill="#6B7280" />
                                        <polygon points="90,30 95,25 95,65 90,70" fill="#4B5563" />
                                        {/* Sky logo placeholder */}
                                        <circle cx="60" cy="50" r="12" fill="#1F2937" />
                                        <polygon points="55,45 65,45 60,55" fill="white" />
                                        {/* Dollar sign */}
                                        <circle cx="60" cy="65" r="8" fill="url(#greenGradient)" />
                                        <text x="60" y="69" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
                                            $
                                        </text>
                                        {/* Control panel */}
                                        <rect x="75" y="40" width="8" height="4" fill="#EC4899" />
                                        <rect x="75" y="50" width="8" height="4" fill="#8B5CF6" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <h2 className="text-2xl font-bold">Sky Vault</h2>
                                        <Badge variant="outline" className="text-gray-400 border-gray-600">
                                            Powered by USUAL
                                        </Badge>
                                    </div>
                                    <p className="text-gray-300 mb-4">
                                        A yield-optimized vault that earns you rewards from both Sky and Usual protocols effortlessly.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">TVL</div>
                                    <div className="text-2xl font-bold">$290.40k</div>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-1 text-gray-400 text-sm mb-1">
                                        <span>APY</span>
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="text-2xl font-bold">8.2%</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-sm mb-1">Rewards</div>
                                    <div className="flex space-x-1">
                                        <div className="w-6 h-6 bg-black rounded-full border border-gray-600"></div>
                                        <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Upcoming Vaults */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Upcoming Vaults</h2>
                    <Card className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="flex items-center space-x-6">
                                <div className="w-24 h-24">
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        {/* Morpho vault design */}
                                        <defs>
                                            <linearGradient id="morphoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#6B7280" />
                                                <stop offset="100%" stopColor="#374151" />
                                            </linearGradient>
                                        </defs>
                                        {/* Base platform */}
                                        <polygon points="15,75 50,85 85,75 50,65" fill="#4B5563" />
                                        <polygon points="15,75 50,85 50,80 15,70" fill="#6B7280" />
                                        <polygon points="50,85 85,75 85,70 50,80" fill="#9CA3AF" />
                                        {/* Vault body */}
                                        <polygon points="25,60 75,60 75,25 25,25" fill="url(#morphoGradient)" />
                                        <polygon points="25,25 75,25 80,20 30,20" fill="#9CA3AF" />
                                        <polygon points="75,25 80,20 80,55 75,60" fill="#6B7280" />
                                        {/* Morpho logo placeholder */}
                                        <circle cx="50" cy="42" r="10" fill="#1F2937" />
                                        <circle cx="50" cy="42" r="6" fill="white" />
                                        <circle cx="50" cy="42" r="3" fill="#1F2937" />
                                        {/* Dollar sign */}
                                        <circle cx="50" cy="55" r="6" fill="url(#greenGradient)" />
                                        <text x="50" y="58" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">
                                            $
                                        </text>
                                    </svg>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2 mb-2">
                                        <h3 className="text-xl font-bold">Morpho USDC Vault</h3>
                                        <Badge className="bg-gray-800 text-white">Coming soon</Badge>
                                    </div>
                                    <p className="text-gray-600">
                                        A high-efficiency vault that optimizes your yield from Morpho's lending markets and Usual rewards.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* New Vaults in Preparation */}
                <section className="mb-12 text-center">
                    <Badge className="bg-gray-800 text-white mb-6">Coming Soon</Badge>
                    <div className="flex justify-center mb-8">
                        <div className="w-80 h-48">
                            <svg viewBox="0 0 400 200" className="w-full h-full">
                                {/* Three vault illustrations */}
                                <g transform="translate(50, 50)">
                                    <polygon points="10,60 40,70 70,60 40,50" fill="#4B5563" />
                                    <polygon points="20,45 60,45 60,15 20,15" fill="#6B7280" />
                                    <circle cx="40" cy="30" r="8" fill="#10B981" />
                                    <text x="40" y="34" textAnchor="middle" fill="white" fontSize="8">
                                        $
                                    </text>
                                </g>
                                <g transform="translate(150, 30)">
                                    <polygon points="10,60 40,70 70,60 40,50" fill="#4B5563" />
                                    <polygon points="20,45 60,45 60,15 20,15" fill="#6B7280" />
                                    <circle cx="40" cy="30" r="8" fill="#10B981" />
                                    <text x="40" y="34" textAnchor="middle" fill="white" fontSize="8">
                                        $
                                    </text>
                                </g>
                                <g transform="translate(250, 50)">
                                    <polygon points="10,60 40,70 70,60 40,50" fill="#4B5563" />
                                    <polygon points="20,45 60,45 60,15 20,15" fill="#6B7280" />
                                    <circle cx="40" cy="30" r="8" fill="#10B981" />
                                    <text x="40" y="34" textAnchor="middle" fill="white" fontSize="8">
                                        $
                                    </text>
                                </g>
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">New Vaults in Preparation</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        New vaults are on the horizon to bring you even more opportunities to your Usual experience. Stay tuned for
                        updates as we roll out these exciting additions.
                    </p>
                </section>

                {/* More Vaults */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">More Vaults</h2>
                    <div className="space-y-6">
                        {/* TAC Vault */}
                        <Card className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                <div className="flex items-center space-x-6">
                                    <div className="w-20 h-20">
                                        <svg viewBox="0 0 80 80" className="w-full h-full">
                                            <polygon points="10,60 40,65 70,60 40,55" fill="#4B5563" />
                                            <polygon points="20,50 60,50 60,20 20,20" fill="#6B7280" />
                                            <circle cx="40" cy="35" r="8" fill="#1F2937" />
                                            <polygon points="35,30 45,30 40,40" fill="white" />
                                            <circle cx="40" cy="45" r="6" fill="#10B981" />
                                            <text x="40" y="48" textAnchor="middle" fill="white" fontSize="6">
                                                $
                                            </text>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <h3 className="text-xl font-bold">TAC Vault</h3>
                                            <Badge variant="outline" className="text-gray-600 border-gray-300">
                                                Powered by LAGOON
                                            </Badge>
                                            <ExternalLink className="w-4 h-4 text-gray-400" />
                                        </div>
                                        <p className="text-gray-600">
                                            A yield-optimized vault that earns you both Usual yield and exclusive TAC rewards.
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">TVL</div>
                                        <div className="text-xl font-bold">$6.89M</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-1 text-gray-400 text-sm mb-1">
                                            <span>APY</span>
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div className="text-xl font-bold">13%</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">Rewards</div>
                                        <div className="flex space-x-1">
                                            <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
                                            <div className="w-5 h-5 bg-orange-500 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Resolv Vault */}
                        <Card className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                <div className="flex items-center space-x-6">
                                    <div className="w-20 h-20">
                                        <svg viewBox="0 0 80 80" className="w-full h-full">
                                            <polygon points="10,60 40,65 70,60 40,55" fill="#4B5563" />
                                            <polygon points="20,50 60,50 60,20 20,20" fill="#6B7280" />
                                            <circle cx="40" cy="35" r="8" fill="#1F2937" />
                                            <circle cx="40" cy="35" r="5" fill="white" />
                                            <circle cx="40" cy="45" r="6" fill="#10B981" />
                                            <text x="40" y="48" textAnchor="middle" fill="white" fontSize="6">
                                                $
                                            </text>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <h3 className="text-xl font-bold">Resolv Vault</h3>
                                            <Badge variant="outline" className="text-gray-600 border-gray-300">
                                                Powered by LAGOON
                                            </Badge>
                                        </div>
                                        <p className="text-gray-600">
                                            A yield-optimized vault that earns you rewards from both Resolv and Usual protocols effortlessly.
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">TVL</div>
                                        <div className="text-xl font-bold">$1.02M</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-1 text-gray-400 text-sm mb-1">
                                            <span>APY</span>
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div className="text-xl font-bold">10%</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">Rewards</div>
                                        <div className="flex space-x-1">
                                            <div className="w-5 h-5 bg-black rounded-full border border-gray-300"></div>
                                            <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Superstate Vault */}
                        <Card className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                <div className="flex items-center space-x-6">
                                    <div className="w-20 h-20">
                                        <svg viewBox="0 0 80 80" className="w-full h-full">
                                            <polygon points="10,60 40,65 70,60 40,55" fill="#4B5563" />
                                            <polygon points="20,50 60,50 60,20 20,20" fill="#6B7280" />
                                            <circle cx="40" cy="35" r="8" fill="#1F2937" />
                                            <rect x="35" y="30" width="10" height="10" fill="white" />
                                            <circle cx="40" cy="45" r="6" fill="#10B981" />
                                            <text x="40" y="48" textAnchor="middle" fill="white" fontSize="6">
                                                $
                                            </text>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2 mb-2">
                                            <h3 className="text-xl font-bold">Superstate Vault</h3>
                                            <Badge variant="outline" className="text-gray-600 border-gray-300">
                                                Powered by LAGOON
                                            </Badge>
                                        </div>
                                        <p className="text-gray-600">
                                            A yield-optimized vault that earns you rewards from both Superstate and Usual protocols
                                            effortlessly.
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">TVL</div>
                                        <div className="text-xl font-bold">$1.44M</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-1 text-gray-400 text-sm mb-1">
                                            <span>APY</span>
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div className="text-xl font-bold">10%</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400 text-sm mb-1">Rewards</div>
                                        <div className="flex space-x-1">
                                            <div className="w-5 h-5 bg-black rounded-full border border-gray-300"></div>
                                            <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
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
