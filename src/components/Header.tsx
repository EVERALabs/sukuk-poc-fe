"use client"

import Image from "next/image";
import { useRef, useState, useEffect } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { PrimaryButton } from "./ui/button"
import { usePrivy, useWallets } from "@privy-io/react-auth"
import { cn } from "@/utils/style";
import Link from "next/link";

export function Header() {
    const { login, authenticated, logout } = usePrivy();
    const { wallets } = useWallets();
    const connectedWallet = wallets[0];
    const [showDropdown, setShowDropdown] = useState(false);

    const [isScroll, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const wasScrolled = useRef(false);
    useMotionValueEvent(scrollY, "change", (latest) => {
        const isNowScrolled = latest > 250;

        if (isNowScrolled !== wasScrolled.current) {
            setIsScrolled(isNowScrolled);
            wasScrolled.current = isNowScrolled;
        }
    });

    const handleConnectWallet = () => {
        if (!authenticated) {
            login();
        } else {
            setShowDropdown(!showDropdown);
        }
    }

    const handleLogout = async () => {
        try {
            await logout();
            setShowDropdown(false);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    const formatAddress = (address: string) => {
        if (!address) return "";
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    // Close dropdown when clicking outside
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Add click outside listener
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <motion.header
            initial={{
                opacity: 0,
                y: "-100%",
            }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 0.6,
                },
            }}
            className={cn(
                "fixed z-50 flex items-center w-full transition-all duration-500",
                "h-[60px] md:h-[72px]",
                isScroll ? "backdrop-blur-sm bg-white/0" : "backdrop-blur-0 bg-green-950/0"
            )}
        >
            <div className="flex items-center w-full justify-between px-3 md:px-6 py-2 md:py-4">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
                        <Image
                            src="/images/indo-sukuk-logo.png"
                            alt="indo-sukuk-logo"
                            width={32}
                            height={32}
                            className="rounded-full w-7 h-7 md:w-9 md:h-9 object-cover"
                        />
                        <span className="text-green-400 text-sm md:text-xl font-bold">INDOSUKUK</span>
                    </Link>
                </div>

                {/* Wallet Connection Button */}
                <div className="relative" ref={dropdownRef}>
                    <PrimaryButton
                        onClick={handleConnectWallet}
                        className={cn(
                            "text-[10px] md:text-xs h-8 md:h-10",
                            "py-1 md:py-2",
                            "px-2 md:px-4",
                            "hover:bg-green-700 text-white",
                            "min-w-[90px] md:min-w-[140px]",
                            "truncate"
                        )}
                    >
                        {authenticated && connectedWallet ? (
                            formatAddress(connectedWallet.address)
                        ) : (
                            "Hubungkan Dompet"
                        )}
                    </PrimaryButton>

                    {showDropdown && authenticated && (
                        <div className="absolute right-0 mt-2 w-[280px] bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                            <div className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100">
                                <div className="font-medium">Wallet Connected</div>
                                <div className="text-xs text-gray-500 mt-1 break-all">
                                    {connectedWallet?.address}
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                Disconnect Wallet
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.header>
    )
}