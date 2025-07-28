"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useRef, useState, useEffect } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import Image from "next/image";
import { cn } from "@/utils/style"
import { PrimaryButton } from "./ui/button"
import { usePrivy, useWallets } from "@privy-io/react-auth"

interface HeaderProps {
    centerNavItem?: string
    navItems?: string[]
}

export function Header({ centerNavItem, navItems }: HeaderProps) {
    const router = useRouter();
    const pathname = usePathname();
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
            className={`fixed z-50 flex items-center justify-between gap-4 w-full h-[72px] px-4 py-4 lg:px-24 transition-all duration-500 ${isScroll
                ? "backdrop-blur-sm bg-white/0"
                : "backdrop-blur-0 bg-green-950/0"
                }`}
        >
            <div className="flex items-center w-full justify-between px-6 py-4">
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <div className="flex flex-row items-center gap-2 text-green-400 text-xl font-bold">
                            <Image
                                src={"/images/indo-sukuk-logo.png"}
                                alt="indo-sukuk-logo"
                                width={36}
                                height={36}
                                className="rounded-full size-[36px] object-cover"
                            />
                            <span>INDOSUKUK</span>
                        </div>
                    </div>

                    {/* Hide Lite/Pro toggle for mobile */}
                    {/* <div className="flex items-center space-x-2">
                        <div className={cn(
                            "hidden p-1 rounded-full lg:flex flex-1 max-w-[397px] font-onestMedium gap-4",
                            "bg-green-950")}
                        >
                            {LINKS.map((link) => {
                                const isProLink = link.name === "Pro"
                                const isActive = isProLink ? isProState : link.path === pathname

                                return (
                                    <button
                                        key={link.name}
                                        className={cn(
                                            "group rounded-full flex-1 py-2 px-4 flex justify-center relative cursor-pointer",
                                            isActive ? "text-white" : "text-text-300"
                                        )}
                                        onClick={() => router.push(link.path)}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="switch-header"
                                                className="size-full absolute inset-0 rounded-full bg-green-800"
                                            ></motion.div>
                                        )}
                                        <div
                                            className={cn("size-full absolute inset-0 rounded-full",
                                                isActive ? "group-hover:bg-green-800" : "group-hover:bg-green-100"
                                            )}
                                        ></div>
                                        <p className={cn("relative text-sm",
                                            isActive ? "group-hover:text-white" : "group-hover:text-green-800"
                                        )}>{link.name}</p>
                                    </button>
                                )
                            })}
                        </div>
                    </div> */}
                </div>

                {/* Hide center navigation for mobile - will be replaced with bottom nav */}
                {/* PRO State Navigation */}
                {/* {isProState && (
                    <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-8">
                        {PRO_NAV_ITEMS.map((item) => {
                            const isActive = pathname.startsWith(item.path)
                            return (
                                <Link
                                    key={item.name}
                                    href={item.path}
                                    className={`text-sm font-medium transition-colors ${isActive
                                        ? "text-black border-b-2 border-green-400 pb-1"
                                        : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                )} */}

                {/* {centerNavItem && !isProState && (
                    <nav className="absolute left-1/2 transform -translate-x-1/2">
                        <span className="text-white border-b-2 border-green-400 pb-1 text-sm font-medium">{centerNavItem}</span>
                    </nav>
                )} */}

                {/* {navItems && !isProState && (
                    <nav className="flex items-center space-x-8">
                        {navItems.map((item) => {
                            const isActive = getActiveNavItem() === item
                            return (
                                <Link
                                    key={item}
                                    href={`/sukuk/${item.toLowerCase()}`}
                                    className={`text-sm transition-colors ${isActive ? "text-white border-b-2 border-green-400 pb-1" : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {item}
                                </Link>
                            )
                        })}
                    </nav>
                )} */}

                <div className="relative" ref={dropdownRef}>
                    <PrimaryButton
                        onClick={handleConnectWallet}
                        className="text-xs h-full py-2 hover:bg-green-700 text-white"
                    >
                        {authenticated && connectedWallet ? formatAddress(connectedWallet.address) : "Hubungkan Dompet"}
                    </PrimaryButton>

                    {showDropdown && authenticated && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                                <div className="font-medium">Wallet Connected</div>
                                <div className="text-xs text-gray-500 mt-1 break-all">
                                    {connectedWallet?.address}
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
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