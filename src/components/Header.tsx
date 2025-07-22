"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import Image from "next/image";
import { cn } from "@/utils/style"
import { PrimaryButton } from "./ui/button"

interface HeaderProps {
    centerNavItem?: string
    navItems?: string[]
}

const LINKS = [
    {
        name: "Lite",
        path: "/buy",
    },
    {
        name: "Pro",
        path: "/sukuk",
    },
];

export function Header({ centerNavItem, navItems }: HeaderProps) {
    const router = useRouter();
    const pathname = usePathname()
    const [isConnected, setIsConnected] = useState(false)

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
        setIsConnected(true)
        setTimeout(() => {
            alert("Wallet connected successfully!")
        }, 500)
    }

    const getActiveNavItem = () => {
        if (pathname.includes("/pool")) return "Pool"
        if (pathname.includes("/portfolio")) return "Portfolio"
        if (pathname.includes("/history")) return "History"
        return ""
    }

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
            className={`fixed z-50 flex items-center justify-between gap-4 w-full h-[72px] px-4 py-4  lg:px-24 transition-all duration-500 ${isScroll
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

                    <div className="flex items-center space-x-2">
                        <div className={cn(
                            "hidden p-1 rounded-full lg:flex flex-1 max-w-[397px] font-onestMedium gap-4",
                            "bg-green-950")}
                        >
                            {LINKS.map((link) => (
                                <button
                                    key={link.name}
                                    className={cn(
                                        "group rounded-full flex-1 py-2 px-4 flex justify-center relative cursor-pointer",
                                        link.path === pathname ? "text-white" : "text-text-300"
                                    )}
                                    onClick={() => router.push(link.path)}
                                >
                                    {link.path === pathname && (
                                        <motion.div
                                            layoutId="switch-header"
                                            className="size-full absolute inset-0 rounded-full bg-green-800"
                                        ></motion.div>
                                    )}
                                    <div
                                        className={cn("size-full absolute inset-0 rounded-full",
                                            link.path === pathname ? "group-hover:bg-green-800" : "group-hover:bg-green-50"
                                        )}
                                    ></div>
                                    <p className={cn("relative text-sm",
                                        link.path === pathname ? "group-hover:text-white" : "group-hover:text-text-700"
                                    )}>{link.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {centerNavItem && (
                    <nav className="absolute left-1/2 transform -translate-x-1/2">
                        <span className="text-white border-b-2 border-green-400 pb-1 text-sm font-medium">{centerNavItem}</span>
                    </nav>
                )}

                {navItems && (
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
                )}

                <PrimaryButton
                    onClick={handleConnectWallet}
                    className="text-xs h-full py-2 hover:bg-green-700 text-white"
                >
                    {isConnected ? "Wallet Connected" : "Hubungkan Dompet"}
                </PrimaryButton>
            </div>
        </motion.header>
    )
}