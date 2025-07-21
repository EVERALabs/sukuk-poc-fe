"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
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
        path: "/lite",
    },
    {
        name: "Pro",
        path: "/pro",
    },
];

export function Header({ centerNavItem, navItems }: HeaderProps) {
    const router = useRouter();
    const pathname = usePathname()
    const [isConnected, setIsConnected] = useState(false)

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
        <header className="border-b border-gray-800 bg-gray-900">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-12">
                    <div className="flex items-center space-x-2">
                        <div className="flex flex-row items-center gap-2 text-green-400 text-xl font-bold">
                            <Image
                                src={"/images/indo-sukuk-logo.png"}
                                alt="indo-sukuk-logo"
                                width={36}
                                height={36}
                                className="rounded-full size-[36px] object-cover"
                            />
                            <span>INDO SUKUK</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className={cn(
                            "hidden p-1 rounded-full lg:flex flex-1 max-w-[397px] font-onestMedium gap-4",
                            "bg-blue-950")}
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
                                            className="size-full absolute inset-0 rounded-full bg-blue-800"
                                        ></motion.div>
                                    )}
                                    <div
                                        className={cn("size-full absolute inset-0 rounded-full",
                                            link.path === pathname ? "group-hover:bg-blue-800" : "group-hover:bg-[#C6EDFF]"
                                        )}
                                    ></div>
                                    <p className={cn("relative text-sm",
                                        link.path === pathname ? "group-hover:text-white" : "group-hover:text-[#2E7C90]"
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
                                    href={`/pro/${item.toLowerCase()}`}
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
                    className={`${isConnected
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
                        }`}
                >
                    {isConnected ? "Wallet Connected" : "Connect wallet"}
                </PrimaryButton>
            </div>
        </header>
    )
}