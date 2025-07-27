"use client"

import { useState } from "react"

// Mock chart data
const mockChartData = [
    { date: "Jan", value: 1451770, nav: 1.45177 },
    { date: "Feb", value: 1453200, nav: 1.45320 },
    { date: "Mar", value: 1456800, nav: 1.45680 },
    { date: "Apr", value: 1461500, nav: 1.46150 },
    { date: "May", value: 1463200, nav: 1.46320 },
    { date: "Jun", value: 1465100, nav: 1.46510 },
    { date: "Jul", value: 1465747, nav: 1.465747 }
]

export function SukukChart() {
    const [selectedPeriod, setSelectedPeriod] = useState("1M")
    
    const currentValue = 1465.7476
    const change = 13.98
    const changePercentage = 0.96
    const currentNav = mockChartData[mockChartData.length - 1].nav

    const maxValue = Math.max(...mockChartData.map(d => d.value))
    const minValue = Math.min(...mockChartData.map(d => d.value))

    return (
        <div className="bg-card rounded-xl p-6 border border-border">
            {/* Header Section */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                    {/* NAV and Date */}
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm text-muted-foreground font-bold">NAV</span>
                        <span className="text-sm text-muted-foreground">25 Jul 25</span>
                    </div>
                    
                    {/* Main Value */}
                    <div className="mb-3">
                        <h2 className="text-4xl font-bold text-foreground mb-2">
                            Rp{currentValue.toFixed(4)}
                        </h2>
                        
                        {/* Change with Arrow */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-green-600">
                                <span className="text-lg">↗</span>
                                <span className="font-semibold">Rp{change.toFixed(2)}</span>
                                <span className="font-semibold">(+{changePercentage.toFixed(2)}%)</span>
                            </div>
                            <span className="text-sm text-muted-foreground">1 Bulan Terakhir</span>
                        </div>
                    </div>
                </div>

                {/* Top Badge */}
                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    <span>🏆</span>
                    <span>Top</span>
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative h-48 mb-6">
                <svg className="w-full h-full" viewBox="0 0 800 150">
                    {/* Chart Path */}
                    <path
                        d={mockChartData.map((point, index) => {
                            const x = (index / (mockChartData.length - 1)) * 780 + 10
                            const y = 130 - ((point.value - minValue) / (maxValue - minValue)) * 110
                            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
                        }).join(' ')}
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2.5"
                        className="drop-shadow-sm"
                    />

                    {/* Fill Area */}
                    <path
                        d={mockChartData.map((point, index) => {
                            const x = (index / (mockChartData.length - 1)) * 780 + 10
                            const y = 130 - ((point.value - minValue) / (maxValue - minValue)) * 110
                            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`
                        }).join(' ') + ' L 790 140 L 10 140 Z'}
                        fill="url(#chartGradient)"
                        opacity="0.3"
                    />

                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
                        </linearGradient>
                    </defs>

                    {/* Value Labels */}
                    <text x="10" y="15" className="text-xs fill-muted-foreground">Rp{minValue.toFixed(2)}</text>
                    <text x="780" y="15" className="text-xs fill-muted-foreground" textAnchor="end">Rp{maxValue.toFixed(2)}</text>
                </svg>
            </div>

            {/* Period Selector */}
            <div className="flex items-center justify-center space-x-1">
                {["1D", "1M", "3M", "YTD", "1Y", "3Y", "5Y", "All"].map((period) => (
                    <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                            selectedPeriod === period
                                ? "text-green-600 border-b-2 border-green-600"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        {period}
                    </button>
                ))}
            </div>
        </div>
    )
} 