"use client"

import { useState } from "react"
import { User, Wallet, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react"
import { usePrivy, useWallets } from "@privy-io/react-auth"

export default function ProfilePage() {
    const { authenticated, logout, user } = usePrivy()
    const { wallets } = useWallets()
    const connectedWallet = wallets[0]

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    const formatAddress = (address: string) => {
        if (!address) return ""
        return `${address.slice(0, 6)}...${address.slice(-4)}`
    }

    const menuItems = [
        {
            icon: Settings,
            label: "Pengaturan Akun",
            action: () => console.log("Account settings"),
        },
        {
            icon: HelpCircle,
            label: "Bantuan & Dukungan",
            action: () => console.log("Help & Support"),
        },
        {
            icon: LogOut,
            label: "Keluar",
            action: handleLogout,
            isDestructive: true,
        },
    ]

    return (
        <div className="min-h-[calc(100vh-80px)] bg-background px-6 py-6 pb-24">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="mt-20 mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Profil</h1>
                    <p className="text-muted-foreground">Kelola akun dan preferensi Anda</p>
                </div>

                {/* Profile Card */}
                <div className="bg-card rounded-xl p-6 border border-border mb-6">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-8 h-8 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-foreground">
                                {authenticated ? "User" : "Tamu"}
                            </h2>
                            <p className="text-muted-foreground text-sm">
                                {authenticated ? "Akun Terhubung" : "Belum terhubung"}
                            </p>
                        </div>
                    </div>

                    {/* Wallet Status */}
                    {authenticated && connectedWallet ? (
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center space-x-3">
                                <Wallet className="w-5 h-5 text-green-600" />
                                <div className="flex-1">
                                    <div className="text-green-800 font-medium text-sm">Dompet Terhubung</div>
                                    <div className="text-green-700 text-xs font-mono">
                                        {formatAddress(connectedWallet.address)}
                                    </div>
                                </div>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center space-x-3">
                                <Wallet className="w-5 h-5 text-gray-400" />
                                <div className="flex-1">
                                    <div className="text-gray-700 font-medium text-sm">Dompet Belum Terhubung</div>
                                    <div className="text-gray-500 text-xs">
                                        Hubungkan dompet untuk mulai investasi
                                    </div>
                                </div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Investment Summary */}
                {authenticated && (
                    <div className="bg-card rounded-xl p-6 border border-border mb-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Ringkasan Investasi</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-foreground">Rp 0</div>
                                <div className="text-sm text-muted-foreground">Total Investasi</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">Rp 0</div>
                                <div className="text-sm text-muted-foreground">Total Keuntungan</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Menu Items */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                    {menuItems.map((item, index) => (
                        <button
                            key={item.label}
                            onClick={item.action}
                            className={`w-full flex items-center justify-between p-4 text-left hover:bg-accent transition-colors ${
                                index !== menuItems.length - 1 ? "border-b border-border" : ""
                            } ${item.isDestructive ? "text-red-600 hover:bg-red-50" : "text-foreground"}`}
                        >
                            <div className="flex items-center space-x-3">
                                <item.icon className={`w-5 h-5 ${item.isDestructive ? "text-red-600" : "text-muted-foreground"}`} />
                                <span className="font-medium">{item.label}</span>
                            </div>
                            <ChevronRight className={`w-4 h-4 ${item.isDestructive ? "text-red-600" : "text-muted-foreground"}`} />
                        </button>
                    ))}
                </div>

                {/* App Info */}
                <div className="mt-8 text-center">
                    <div className="text-sm text-muted-foreground mb-2">
                        IndoSukuk v1.0.0
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Platform investasi sukuk syariah terpercaya
                    </div>
                </div>
            </div>
        </div>
    )
} 