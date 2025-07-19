"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, X, Info, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  const [isSwapDropdownOpen, setIsSwapDropdownOpen] = useState(false)
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
              <span className="cursor-pointer">Home</span>
              <div className="relative">
                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={() => setIsSwapDropdownOpen(!isSwapDropdownOpen)}
                >
                  <span>Swap</span>
                  <ChevronDown className="w-4 h-4" />
                </div>

                {/* Swap Dropdown */}
                {isSwapDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 bg-black bg-opacity-50 z-40"
                      onClick={() => setIsSwapDropdownOpen(false)}
                    />

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-80 bg-gray-900 rounded-lg shadow-xl z-50 p-4">
                      <div className="space-y-4">
                        {/* Swap Option */}
                        <Link
                          href="/swap"
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer"
                        >
                          <div className="w-6 h-6 mt-1">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold mb-1">Swap</h3>
                            <p className="text-gray-400 text-sm">
                              Exchange any tokens to Usual assets instantly and efficiently.
                            </p>
                          </div>
                        </Link>

                        {/* Stake Option */}
                        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
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
                            <h3 className="text-white font-semibold mb-1">Stake</h3>
                            <p className="text-gray-400 text-sm">
                              Stake USUAL to USD0 to earn rewards and grow your share in the protocol.
                            </p>
                          </div>
                        </div>

                        {/* Lock Option */}
                        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
                          <div className="w-6 h-6 mt-1">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold mb-1">Lock</h3>
                            <p className="text-gray-400 text-sm">
                              Lock USUALx to earn protocol revenue on a weekly basis.
                            </p>
                          </div>
                        </div>

                        {/* Bridge Option */}
                        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
                          <div className="w-6 h-6 mt-1">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold mb-1">Bridge</h3>
                            <p className="text-gray-400 text-sm">
                              Transfer Usual assets seamlessly across supported blockchains.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
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

      {/* Hero Section */}
      <section className="bg-white px-4 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <span className="text-sm text-gray-600">USUAL is live on</span>
            <Image src="/placeholder.svg?height=20&width=80&text=BINANCE" alt="Binance" width={80} height={20} />
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="text-sm font-semibold">$0.08</span>
            </div>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6">Let's become Blackrock, together.</h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Usual is a secure and decentralized fiat-backed stablecoin issuer that redistributes value and ownership
            through the $USUAL token.
          </p>

          {/* Success Module */}
          <div className="bg-black rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold">Usual Success Module</h2>
              <div className="flex space-x-4">
                <Button variant="outline" className="bg-transparent border-gray-600 text-white">
                  Total Value Locked
                </Button>
                <Button variant="ghost" className="text-gray-400">
                  Revenue
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-400">TVL</span>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-3xl font-bold">$651.70M</div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-400">Revenue</span>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-3xl font-bold">$25.37M</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-2">Users</div>
                <div className="text-3xl font-bold">218.79k</div>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-black">$</span>
                  </div>
                  <span className="text-sm">Falcon USD</span>
                </div>
                <div className="text-sm text-gray-400">Left To Go</div>
                <div className="text-xl font-bold">$2.63M</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 w-4/5"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>$0</span>
                <span>$528.76M</span>
                <span>$654.34M</span>
                <span className="text-green-400">$162.14B</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Staking */}
            <div className="lg:col-span-2">
              <Card className="bg-black text-white p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full border-2 border-purple-400"></div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">0.00 USUALx</h3>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <span>0.00</span>
                        <div className="w-4 h-4 rounded-full border border-gray-600"></div>
                      </div>
                      <span className="text-gray-400">$0.00</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$0.00</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-lg font-semibold mb-2">Staking APY</div>
                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
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
                      <span>Weekly rewards</span>
                    </div>
                    <div className="text-2xl font-bold">0% APY</div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <span>--</span>
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Connect */}
            <div>
              <Card className="bg-black text-white p-6 text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 rounded-full border-2 border-purple-400"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Connect and get USUALx to earn protocol revenue!</h3>
                <p className="text-gray-400 mb-4">
                  Get some <span className="text-white">USUAL x</span> and earn up to{" "}
                  <span className="text-white">36% APY</span>.
                </p>
                <Button className="w-full bg-white text-black hover:bg-gray-200">Connect</Button>
              </Card>
            </div>
          </div>

          {/* Yield Opportunities */}
          <div className="mt-12">
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
                    <span className="text-sm">7.3% - 13%</span>
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
          </div>

          {/* Usual Positions */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Usual Positions</h2>
            <Card className="p-8 text-center">
              <div className="mb-4">
                <span className="text-gray-400">Positions</span>
                <div className="text-3xl font-bold">$0.00</div>
              </div>
              <p className="text-gray-600 mb-6">
                Connect to show your positions and your
                <br />
                vesting overview
              </p>
              <Button className="bg-black text-white hover:bg-gray-800">Connect</Button>
            </Card>
          </div>

          {/* Usual Ecosystem */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Usual Ecosystem</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* USD0++ */}
              <Card className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">$</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">USD0++</h3>
                <p className="text-gray-600 mb-4">Growth-Driven LST</p>
                <p className="text-sm text-gray-600 mb-6">
                  Liquid Staking for Real-World Assets, Offering Yield, Growth Exposure, and Transferability.
                </p>
                <div className="flex items-center justify-between">
                  <Button className="bg-black text-white hover:bg-gray-800">Get USD0++</Button>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">APY</div>
                    <div className="text-xl font-bold">7.8%</div>
                  </div>
                </div>
              </Card>

              {/* ETH0 */}
              <Card className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                </div>
                <Badge className="bg-blue-500 text-white mb-2">Genesis</Badge>
                <h3 className="text-xl font-bold mb-2">ETH0</h3>
                <p className="text-gray-600 mb-4">ETH Yield Token</p>
                <p className="text-sm text-gray-600 mb-6">
                  Keep ETH exposure the smart way. No lock-ups, full control, and native USUAL rewards during Genesis.
                </p>
                <div className="flex items-center justify-between">
                  <Button className="bg-black text-white hover:bg-gray-800">Buy ETH0</Button>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">APY</div>
                    <div className="text-xl font-bold">7.3%</div>
                  </div>
                </div>
              </Card>

              {/* USUAL */}
              <Card className="bg-black text-white p-6">
                <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-8 h-8 rounded-full border-2 border-purple-400"></div>
                </div>
                <h3 className="text-xl font-bold mb-2">USUAL</h3>
                <p className="text-gray-400 mb-4">Long-Term Value Token</p>
                <p className="text-sm text-gray-400 mb-6">
                  The governance token that empowers holders to own, control & govern the Usual protocol.
                </p>
                <div className="flex items-center justify-between">
                  <Button className="bg-white text-black hover:bg-gray-200">Buy USUAL</Button>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                      <span>APY</span>
                      <Info className="w-4 h-4" />
                    </div>
                    <div className="text-xl font-bold">87%</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Usual Token Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Usual Token</h2>
              <div className="flex items-center space-x-2 text-blue-600 cursor-pointer">
                <span>Learn more</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </div>

            <Card className="bg-black text-white p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <h3 className="text-2xl font-bold">Introducing</h3>
                    <div className="w-8 h-8 rounded-full border-2 border-purple-400"></div>
                    <span className="text-2xl font-bold">USUAL Token</span>
                  </div>

                  <p className="text-gray-300 mb-8">
                    USUAL rewards USD0's adoption and usage, aligning incentives with contributors to fuel protocol
                    growth. Its distribution introduces new DeFi primitives, ensuring rapid ecosystem scaling and
                    sustainable decentralization.
                  </p>

                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Price</div>
                      <div className="text-xl font-bold">$0.08</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Market Cap</div>
                      <div className="text-xl font-bold">$108.16M</div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="text-sm text-gray-400">Revenue Switch</span>
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="text-xl font-bold">Up to 36% APY</div>
                    </div>
                  </div>

                  {/* Distribution Bar */}
                  <div className="mb-8">
                    <div className="h-2 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full mb-2"></div>
                    <div className="flex justify-between text-sm">
                      <span>90% Community</span>
                      <span>10% Initiators</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-bold mb-2">Real Ownership</h4>
                      <p className="text-sm text-gray-400 mb-4">
                        The USUAL token gives you the power to control the protocol's treasury, fueled by 100% of its
                        revenue.
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">▲</span>
                        <span className="font-bold">$24,429,125</span>
                      </div>
                      <div className="text-sm text-gray-400">Protocol Treasury</div>
                    </div>

                    <div>
                      <h4 className="font-bold mb-2">Real Revenues</h4>
                      <p className="text-sm text-gray-400 mb-4">
                        Usual's mechanism ensures USUAL issuance is always aligned with future cash flows, preventing
                        dilution for long- term holders.
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">▲</span>
                        <span className="font-bold">$94,223,665</span>
                      </div>
                      <div className="text-sm text-gray-400">4-Year Cash Flow</div>
                    </div>

                    <div>
                      <h4 className="font-bold mb-2">Scarcity Advantage</h4>
                      <p className="text-sm text-gray-400 mb-4">
                        USUAL becomes increasingly scarce over time. As USD0++ TVL rises, the minting rate slows,
                        creating natural scarcity that rewards early adopters and long-term believers.
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-red-400">▼</span>
                        <span className="font-bold">8.2 USUAL/USD0++</span>
                      </div>
                      <div className="text-sm text-gray-400">Minting Factor</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-64 h-64 relative">
                    <div className="w-full h-full rounded-full border border-gray-600 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-4 border-purple-400 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-purple-400"></div>
                      </div>
                    </div>
                    {/* Orbital elements */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s" }}>
                      <div className="absolute top-4 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2"></div>
                      <div className="absolute bottom-4 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2"></div>
                      <div className="absolute top-1/2 left-4 w-2 h-2 bg-white rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute top-1/2 right-4 w-2 h-2 bg-white rounded-full transform -translate-y-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Discover More */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Discover More</h2>
            <Card className="bg-black text-white p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Empower DeFi with Usual Integrations</h3>
                  <p className="text-gray-300 mb-6">
                    Usual is set to redefine DeFi, merging innovative finance solutions with seamless integration across
                    the ecosystem. Our focus on usability ensures that every Usual product is essential, adaptable, and
                    widely adopted.
                  </p>
                  <Button className="bg-white text-black hover:bg-gray-200">Join the Usual Ecosystem</Button>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-64 h-64 relative">
                    <div className="w-full h-full rounded-full border border-gray-600 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border-4 border-purple-400 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-purple-400"></div>
                      </div>
                    </div>
                    {/* Various DeFi protocol icons positioned around the circle */}
                    <div className="absolute top-8 left-1/2 w-8 h-8 bg-gray-700 rounded-full transform -translate-x-1/2"></div>
                    <div className="absolute top-16 right-16 w-8 h-8 bg-gray-700 rounded-full"></div>
                    <div className="absolute top-1/2 right-8 w-8 h-8 bg-gray-700 rounded-full transform -translate-y-1/2"></div>
                    <div className="absolute bottom-16 right-16 w-8 h-8 bg-gray-700 rounded-full"></div>
                    <div className="absolute bottom-8 left-1/2 w-8 h-8 bg-gray-700 rounded-full transform -translate-x-1/2"></div>
                    <div className="absolute bottom-16 left-16 w-8 h-8 bg-gray-700 rounded-full"></div>
                    <div className="absolute top-1/2 left-8 w-8 h-8 bg-gray-700 rounded-full transform -translate-y-1/2"></div>
                    <div className="absolute top-16 left-16 w-8 h-8 bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Social Links */}
          <div className="mt-8 text-center">
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
      </section>
    </div>
  )
}
