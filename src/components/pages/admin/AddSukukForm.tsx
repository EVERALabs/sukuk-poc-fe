"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { PrimaryButton } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SukukFormData {
    sukuk_code: string
    sukuk_title: string
    sukuk_deskripsi: string
    status: string
    imbal_hasil: string
    tenor: string
    kuota_nasional: string
    minimum_pembelian: string
    maksimum_pembelian: string
    periode_pembelian: string
    jatuh_tempo: string
    kupon_pertama: string
    tanggal_bayar_kupon: string
    penerimaan_kupon: string
    tipe_kupon: string
}

interface AddSukukFormProps {
    onClose?: () => void
}

export function AddSukukForm({ onClose }: AddSukukFormProps) {
    const [formData, setFormData] = useState<SukukFormData>({
        sukuk_code: "",
        sukuk_title: "",
        sukuk_deskripsi: "",
        status: "",
        imbal_hasil: "",
        tenor: "",
        kuota_nasional: "",
        minimum_pembelian: "",
        maksimum_pembelian: "",
        periode_pembelian: "",
        jatuh_tempo: "",
        kupon_pertama: "",
        tanggal_bayar_kupon: "",
        penerimaan_kupon: "",
        tipe_kupon: ""
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error', message: string} | null>(null)

    const handleInputChange = (field: keyof SukukFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitMessage(null)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            // Mock successful submission
            console.log("Submitting sukuk data:", formData)
            
            setSubmitMessage({
                type: 'success',
                message: 'Sukuk berhasil ditambahkan!'
            })
            
            // Reset form
            setFormData({
                sukuk_code: "",
                sukuk_title: "",
                sukuk_deskripsi: "",
                status: "",
                imbal_hasil: "",
                tenor: "",
                kuota_nasional: "",
                minimum_pembelian: "",
                maksimum_pembelian: "",
                periode_pembelian: "",
                jatuh_tempo: "",
                kupon_pertama: "",
                tanggal_bayar_kupon: "",
                penerimaan_kupon: "",
                tipe_kupon: ""
            })

            // Close modal after successful submission
            if (onClose) {
                setTimeout(() => {
                    onClose()
                }, 1500)
            }
        } catch (error) {
            console.error('Error submitting sukuk:', error)
            setSubmitMessage({
                type: 'error',
                message: 'Gagal menambahkan sukuk. Silakan coba lagi.'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="p-6">
            {/* Submit Message */}
            {submitMessage && (
                <div className={`mb-6 p-4 rounded-lg border ${
                    submitMessage.type === 'success' 
                        ? 'bg-green-50 border-green-200 text-green-800' 
                        : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                    {submitMessage.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="bg-muted/50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Informasi Dasar</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Kode Sukuk *
                            </label>
                            <Input
                                type="text"
                                value={formData.sukuk_code}
                                onChange={(e) => handleInputChange('sukuk_code', e.target.value)}
                                placeholder="Contoh: SR023-T5"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Status *
                            </label>
                            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mendatang">Mendatang</SelectItem>
                                    <SelectItem value="berlangsung">Berlangsung</SelectItem>
                                    <SelectItem value="berakhir">Berakhir</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Nama Sukuk *
                            </label>
                            <Input
                                type="text"
                                value={formData.sukuk_title}
                                onChange={(e) => handleInputChange('sukuk_title', e.target.value)}
                                placeholder="Contoh: Sukuk Ritel Seri SR023-T5"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Deskripsi Sukuk
                            </label>
                            <textarea
                                className="w-full px-3 py-2 border border-input rounded-md text-sm resize-none h-20"
                                value={formData.sukuk_deskripsi}
                                onChange={(e) => handleInputChange('sukuk_deskripsi', e.target.value)}
                                placeholder="Deskripsi detail tentang sukuk ini..."
                            />
                        </div>
                    </div>
                </div>

                {/* Financial Details */}
                <div className="bg-muted/50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Detail Keuangan</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Imbal Hasil (%) *
                            </label>
                            <Input
                                type="number"
                                step="0.01"
                                value={formData.imbal_hasil}
                                onChange={(e) => handleInputChange('imbal_hasil', e.target.value)}
                                placeholder="Contoh: 6.55"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Tipe Kupon *
                            </label>
                            <Select value={formData.tipe_kupon} onValueChange={(value) => handleInputChange('tipe_kupon', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih tipe kupon" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Fixed Rate">Fixed Rate</SelectItem>
                                    <SelectItem value="Variable Rate">Variable Rate</SelectItem>
                                    <SelectItem value="Ijarah">Ijarah</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Kuota Nasional (IDR) *
                            </label>
                            <Input
                                type="number"
                                value={formData.kuota_nasional}
                                onChange={(e) => handleInputChange('kuota_nasional', e.target.value)}
                                placeholder="Contoh: 7000000000000"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Minimum Pembelian (IDR) *
                            </label>
                            <Input
                                type="number"
                                value={formData.minimum_pembelian}
                                onChange={(e) => handleInputChange('minimum_pembelian', e.target.value)}
                                placeholder="Contoh: 1000000"
                                required
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Maksimum Pembelian (IDR) *
                            </label>
                            <Input
                                type="number"
                                value={formData.maksimum_pembelian}
                                onChange={(e) => handleInputChange('maksimum_pembelian', e.target.value)}
                                placeholder="Contoh: 10000000000"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Time & Period Details */}
                <div className="bg-muted/50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Detail Waktu & Periode</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Tenor *
                            </label>
                            <Input
                                type="text"
                                value={formData.tenor}
                                onChange={(e) => handleInputChange('tenor', e.target.value)}
                                placeholder="Contoh: 5 Tahun"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Penerimaan Kupon *
                            </label>
                            <Select value={formData.penerimaan_kupon} onValueChange={(value) => handleInputChange('penerimaan_kupon', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih periode kupon" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Bulanan">Bulanan</SelectItem>
                                    <SelectItem value="Kuartal">Kuartal</SelectItem>
                                    <SelectItem value="Semester">Semester</SelectItem>
                                    <SelectItem value="Tahunan">Tahunan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Periode Pembelian *
                            </label>
                            <Input
                                type="text"
                                value={formData.periode_pembelian}
                                onChange={(e) => handleInputChange('periode_pembelian', e.target.value)}
                                placeholder="Contoh: 16 Mei - 18 Jun 2025"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Tanggal Bayar Kupon *
                            </label>
                            <Input
                                type="text"
                                value={formData.tanggal_bayar_kupon}
                                onChange={(e) => handleInputChange('tanggal_bayar_kupon', e.target.value)}
                                placeholder="Contoh: 10 (tanggal setiap bulan)"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Jatuh Tempo *
                            </label>
                            <Input
                                type="date"
                                value={formData.jatuh_tempo}
                                onChange={(e) => handleInputChange('jatuh_tempo', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Kupon Pertama *
                            </label>
                            <Input
                                type="date"
                                value={formData.kupon_pertama}
                                onChange={(e) => handleInputChange('kupon_pertama', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-border">
                    <button
                        type="button"
                        className="px-6 py-2 border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        onClick={() => setFormData({
                            sukuk_code: "",
                            sukuk_title: "",
                            sukuk_deskripsi: "",
                            status: "",
                            imbal_hasil: "",
                            tenor: "",
                            kuota_nasional: "",
                            minimum_pembelian: "",
                            maksimum_pembelian: "",
                            periode_pembelian: "",
                            jatuh_tempo: "",
                            kupon_pertama: "",
                            tanggal_bayar_kupon: "",
                            penerimaan_kupon: "",
                            tipe_kupon: ""
                        })}
                    >
                        Reset Form
                    </button>
                    <PrimaryButton
                        type="submit"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                        loadingMessage="Menambahkan..."
                        className="px-8 py-2"
                    >
                        Tambah Sukuk
                    </PrimaryButton>
                </div>
            </form>
        </div>
    )
} 