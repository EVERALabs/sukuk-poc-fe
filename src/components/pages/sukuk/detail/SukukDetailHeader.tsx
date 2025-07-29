"use client"

import { useSukukPools } from "@/hooks/useApi"

interface SukukDetailHeaderProps {
    sukukId: string
}

// Helper function to get status type and styling
const getStatusInfo = (status: string) => {
  switch (status.toLowerCase()) {
    case 'berlangsung':
      return {
        type: 'ongoing',
        className: 'bg-primary/20 text-primary border border-primary/30'
      }
    case 'mendatang':
      return {
        type: 'upcoming',
        className: 'bg-blue-50 text-blue-600 border border-blue-200'
      }
    case 'berakhir':
      return {
        type: 'ended',
        className: 'bg-gray-100 text-gray-800 border border-gray-200'
      }
    default:
      return {
        type: 'unknown',
        className: 'bg-muted/20 text-muted-foreground border border-muted/30'
      }
  }
}

// Helper function to get icon based on sukuk code
const getSukukIcon = (sukukCode: string) => {
  const code = sukukCode.toLowerCase()
  if (code.includes('swdi')) return { icon: '🎭', bg: 'bg-purple-100' }
  if (code.includes('sr')) return { icon: '⭐', bg: 'bg-blue-100' }
  if (code.includes('sbr')) return { icon: '💰', bg: 'bg-red-100' }
  if (code.includes('tfp')) return { icon: '📈', bg: 'bg-green-100' }
  if (code.includes('res')) return { icon: '🏢', bg: 'bg-indigo-100' }
  if (code.includes('crp')) return { icon: '🏭', bg: 'bg-orange-100' }
  return { icon: '📋', bg: 'bg-gray-100' }
}

export function SukukDetailHeader({ sukukId }: SukukDetailHeaderProps) {
    const { data: sukukPools, loading, error } = useSukukPools()
    
    if (loading) {
        return (
            <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
                <div className="flex items-center justify-center py-6 md:py-8">
                    <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-primary"></div>
                    <span className="ml-2 text-sm md:text-base text-muted-foreground">Memuat detail sukuk...</span>
                </div>
            </div>
        )
    }

    if (error || !sukukPools) {
        return (
            <div className="bg-card rounded-xl p-6 border border-border">
                <div className="text-center py-8">
                    <p className="text-destructive">Gagal memuat detail sukuk: {error}</p>
                </div>
            </div>
        )
    }

    const sukuk = sukukPools.find(pool => pool.id.toString() === sukukId)
    
    if (!sukuk) {
        return (
            <div className="bg-card rounded-xl p-6 border border-border">
                <div className="text-center py-8">
                    <p className="text-muted-foreground">Sukuk tidak ditemukan</p>
                </div>
            </div>
        )
    }

    const statusInfo = getStatusInfo(sukuk.status)
    const iconInfo = getSukukIcon(sukuk.sukuk_code)

    return (
        <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="flex items-start space-x-3 md:space-x-4">
                    <div className={`w-12 h-12 md:w-16 md:h-16 ${iconInfo.bg} rounded-lg flex items-center justify-center text-xl md:text-2xl`}>
                        {iconInfo.icon}
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1 md:mb-2">
                            <h1 className="text-xl md:text-3xl font-bold text-foreground">{sukuk.sukuk_code}</h1>
                            <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}>
                                {sukuk.status}
                            </span>
                        </div>
                        <h2 className="text-sm md:text-lg text-muted-foreground">{sukuk.sukuk_title}</h2>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3">
                    <button className="flex-1 md:flex-none px-3 md:px-4 py-2 border border-border rounded-lg text-sm md:text-base text-foreground hover:bg-accent transition-colors">
                        Bagikan
                    </button>
                    <button className="flex-1 md:flex-none px-3 md:px-4 py-2 bg-primary text-sm md:text-base text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                        📥 Unduh
                    </button>
                </div>
            </div>

            {/* Key Metrics - Three Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {/* Tenor */}
                <div className="bg-gradient-to-br from-green-50 to-green-25 p-3 md:p-4 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-1 md:mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-700 font-medium text-sm">Tenor</span>
                    </div>
                    <div className="text-green-800 font-bold text-xl md:text-2xl">{sukuk.tenor}</div>
                </div>

                {/* Imbal Hasil */}
                <div className="bg-gradient-to-br from-green-50 to-green-25 p-3 md:p-4 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-1 md:mb-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-green-700 font-medium text-sm">Imbal Hasil</span>
                    </div>
                    <div className="text-green-800 font-bold text-xl md:text-2xl">{sukuk.imbal_hasil}% / Tahun</div>
                </div>

                {/* Status */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-25 p-3 md:p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-1 md:mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-blue-700 font-medium text-sm">Status</span>
                    </div>
                    <div className="text-blue-800 font-bold text-xl md:text-2xl">{sukuk.status}</div>
                </div>
            </div>
        </div>
    )
}
