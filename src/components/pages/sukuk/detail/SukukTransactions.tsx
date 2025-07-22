"use client"

const mockTransactions = [
    {
        id: 1,
        date: "15 Jul 2025",
        type: "Pembelian",
        amount: "Rp50,000,000",
        wallet: "0x41...ab62",
        status: "berhasil"
    },
    {
        id: 2,
        date: "14 Jul 2025", 
        type: "Pembayaran Kupon",
        amount: "Rp2,500,000",
        wallet: "0x23...cd84",
        status: "berhasil"
    },
    {
        id: 3,
        date: "13 Jul 2025",
        type: "Pembelian",
        amount: "Rp25,000,000", 
        wallet: "0x89...ef12",
        status: "berhasil"
    },
    {
        id: 4,
        date: "12 Jul 2025",
        type: "Penjualan",
        amount: "Rp15,000,000",
        wallet: "0x67...gh34",
        status: "berhasil"
    },
    {
        id: 5,
        date: "11 Jul 2025",
        type: "Pembelian",
        amount: "Rp100,000,000",
        wallet: "0x45...ij56",
        status: "pending"
    }
]

export function SukukTransactions() {
    return (
        <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Transaksi Terbaru</h3>
                <button className="text-primary text-sm hover:text-primary/80 transition-colors">
                    Lihat Semua
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-muted-foreground text-sm border-b border-border">
                            <th className="text-left py-3 font-medium">Tanggal</th>
                            <th className="text-left py-3 font-medium">Jenis</th>
                            <th className="text-left py-3 font-medium">Jumlah</th>
                            <th className="text-left py-3 font-medium">Dompet</th>
                            <th className="text-left py-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockTransactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b border-border hover:bg-accent/50">
                                <td className="py-4 text-foreground text-sm">
                                    {transaction.date}
                                </td>
                                <td className="py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        transaction.type === "Pembelian" 
                                            ? "bg-green-100 text-green-800"
                                            : transaction.type === "Pembayaran Kupon"
                                            ? "bg-blue-100 text-blue-800" 
                                            : "bg-orange-100 text-orange-800"
                                    }`}>
                                        {transaction.type}
                                    </span>
                                </td>
                                <td className="py-4 text-foreground font-medium">
                                    {transaction.amount}
                                </td>
                                <td className="py-4 text-muted-foreground text-sm font-mono">
                                    {transaction.wallet}
                                </td>
                                <td className="py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        transaction.status === "berhasil"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                    }`}>
                                        {transaction.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>Menampilkan 5 dari 156 transaksi</span>
                <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 border border-border rounded hover:bg-accent transition-colors">
                        Sebelumnya
                    </button>
                    <button className="px-3 py-1 border border-border rounded hover:bg-accent transition-colors">
                        Berikutnya
                    </button>
                </div>
            </div>
        </div>
    )
} 