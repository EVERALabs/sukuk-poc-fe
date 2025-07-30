"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { Wallet, Shield, CheckCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { authenticated, ready, login } = usePrivy();
    const router = useRouter();
    
    const handleClose = () => {
        router.push('/');
    };

    useEffect(() => {
        if (ready && !authenticated) {
            // Don't auto-redirect, let user see the connection prompt
        }
    }, [authenticated, ready]);

    if (!ready) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="text-muted-foreground">Loading...</span>
                </div>
            </div>
        );
    }

    if (!authenticated) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={handleClose}
                />
                
                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl"
                >
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
                    >
                        <X size={24} />
                    </button>
                    
                    {/* Success animation background - matching SuccessModal */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 px-6 pt-12 pb-8">
                        {/* Animated circles background */}
                        <motion.div
                            className="absolute inset-0"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <motion.div
                                className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-green-200/30"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            <motion.div
                                className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-green-300/20"
                                animate={{
                                    scale: [1.2, 1, 1.2],
                                    rotate: [360, 180, 0],
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        </motion.div>

                            {/* Shield icon with animation */}
                            <motion.div
                                className="relative mx-auto w-20 h-20 mb-4"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15,
                                    delay: 0.1,
                                }}
                            >
                                <div className="absolute inset-0 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                                    <Shield className="w-12 h-12 text-white" strokeWidth={2.5} />
                                </div>
                                <motion.div
                                    className="absolute inset-0 bg-green-600 rounded-full"
                                    animate={{
                                        scale: [1, 1.3, 1.3],
                                        opacity: [0.7, 0, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: 0.5,
                                    }}
                                />
                            </motion.div>

                            {/* Logo */}
                            <motion.div
                                className="relative mx-auto mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Image
                                    src="/images/indo-sukuk-logo.png"
                                    alt="IndoSukuk"
                                    width={120}
                                    height={40}
                                    className="mx-auto"
                                />
                            </motion.div>

                            {/* Title */}
                            <motion.h3
                                className="text-2xl font-onestSemibold text-green-800 mb-2 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                Login Diperlukan
                            </motion.h3>

                            {/* Description */}
                            <motion.p
                                className="text-sm text-green-700 font-onestRegular text-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                Hubungkan dompet Anda untuk mengakses portofolio investasi syariah
                            </motion.p>
                    </div>

                    {/* Features section */}
                    <motion.div
                        className="px-6 py-4 bg-gray-50 border-t border-gray-100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <p className="text-xs text-gray-600 font-onestRegular">
                                    Sesuai Syariah
                                </p>
                            </motion.div>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <Shield className="w-5 h-5 text-green-600" />
                                </div>
                                <p className="text-xs text-gray-600 font-onestRegular">
                                    Aman & Terpercaya
                                </p>
                            </motion.div>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                    <Wallet className="w-5 h-5 text-green-600" />
                                </div>
                                <p className="text-xs text-gray-600 font-onestRegular">
                                    Akses Mudah
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Action button */}
                    <motion.div
                        className="px-6 py-4 bg-white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                    >
                        <button
                            type="button"
                            onClick={login}
                            className="w-full px-4 py-3 text-sm font-onestMedium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                        >
                            <Wallet className="w-4 h-4" />
                            Hubungkan Dompet
                        </button>
                        
                        {/* Security note */}
                        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                            <span className="font-onestRegular">Terenkripsi & Dilindungi oleh Privy</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return <>{children}</>;
}