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
                    Sukuk pools are Sharia-compliant investment vehicles. Always review pool details before investing.
                </p>
            </div>
        </div>
    )
}