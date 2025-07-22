import { SukukPoolsOverview } from "@/components/pages/sukuk/SukukPoolsOverview"
import { SukukPoolsTable } from "@/components/pages/sukuk/SukukPoolsTable"

export default function ProPoolPage() {

    return (
        <div className="min-h-[calc(100vh-80px)] bg-background px-6 py-6">
            <SukukPoolsOverview />
            <SukukPoolsTable />
            {/* Additional Info */}
            <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                    Sukuk adalah kendaraan investasi yang kompatibel dengan syariah. Selalu periksa detail pool sebelum berinvestasi.
                </p>
            </div>
        </div>
    )
}