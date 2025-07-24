"use client";

import { GhostButton, OutlineButton } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select"
import { Search, Filter, Eye, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown } from "lucide-react"

export default function HistoryPage() {
    return (
        <div className="min-h-[calc(100vh-80px)] bg-background px-6 py-6">
            <div className="p-6 mt-12">
                {/* Header */}
                <h1 className="text-2xl font-bold text-foreground mb-6">Riwayat Transaksi</h1>

                {/* Search and Filters */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Cari hash transaksi..."
                                className="bg-background border border-border rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:border-primary text-foreground placeholder-muted-foreground w-64"
                            />
                        </div>

                        <OutlineButton
                            className="border-border text-foreground bg-transparent hover:bg-accent"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Status
                        </OutlineButton>

                        <OutlineButton

                            className="border-border text-foreground bg-transparent hover:bg-accent"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Jenis Pool
                        </OutlineButton>
                    </div>

                    <OutlineButton

                        className="border-border text-foreground bg-transparent hover:bg-accent"
                    >
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat
                    </OutlineButton>
                </div>

                {/* Table */}
                <div className="bg-card rounded-lg border border-border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-muted-foreground text-sm border-b border-border">
                                    <th className="text-left py-4 px-6 font-medium">ID</th>
                                    <th className="text-left py-4 px-6 font-medium">
                                        <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                            <span>Jumlah</span>
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 font-medium">
                                        <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                            <span>Pool</span>
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 font-medium">
                                        <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                            <span>Tanggal</span>
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 font-medium">
                                        <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                            <span>Jenis Transaksi</span>
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 font-medium">
                                        <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                            <span>Status</span>
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 font-medium">
                                        <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                                            <span>Transaksi</span>
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={7} className="py-16 text-center">
                                        <div className="text-muted-foreground">
                                            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                                                <Search className="w-8 h-8 text-muted-foreground" />
                                            </div>
                                            <p className="font-medium">Tidak ada hasil.</p>
                                            <p className="text-sm mt-1">
                                                Riwayat transaksi sukuk Anda akan muncul di sini setelah Anda mulai berinvestasi
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                        <div className="flex items-center space-x-2">
                            <span className="text-muted-foreground text-sm">Baris per halaman:</span>
                            <Select defaultValue="5">
                                <SelectTrigger className="w-16 h-8 bg-background border-border text-foreground">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-background border-border">
                                    <SelectItem value="5" className="text-foreground hover:bg-accent">
                                        5
                                    </SelectItem>
                                    <SelectItem value="10" className="text-foreground hover:bg-accent">
                                        10
                                    </SelectItem>
                                    <SelectItem value="25" className="text-foreground hover:bg-accent">
                                        25
                                    </SelectItem>
                                    <SelectItem value="50" className="text-foreground hover:bg-accent">
                                        50
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-muted-foreground text-sm">Halaman 1 dari 0</span>
                            <div className="flex items-center space-x-1">
                                <GhostButton disabled className="w-8 h-8 p-0 text-muted-foreground">
                                    <ChevronsLeft className="w-4 h-4" />
                                </GhostButton>
                                <GhostButton disabled className="w-8 h-8 p-0 text-muted-foreground">
                                    <ChevronLeft className="w-4 h-4" />
                                </GhostButton>
                                <GhostButton disabled className="w-8 h-8 p-0 text-muted-foreground">
                                    <ChevronRight className="w-4 h-4" />
                                </GhostButton>
                                <GhostButton disabled className="w-8 h-8 p-0 text-muted-foreground">
                                    <ChevronsRight className="w-4 h-4" />
                                </GhostButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}