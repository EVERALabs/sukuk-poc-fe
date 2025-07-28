"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, PieChart, Receipt, User } from "lucide-react"

export function MobileBottomNav() {
    const pathname = usePathname()

    const navItems = [
        {
            name: "Home",
            path: "/sukuk",
            icon: Home,
            activeIcon: Home,
        },
        {
            name: "Portfolio",
            path: "/portfolio", 
            icon: PieChart,
            activeIcon: PieChart,
        },
        {
            name: "History",
            path: "/history",
            icon: Receipt,
            activeIcon: Receipt,
        },
        {
            name: "Profile",
            path: "/profile",
            icon: User,
            activeIcon: User,
        },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border/50 safe-area-inset-bottom">
            <div className="flex items-center justify-around px-4 py-2 pb-safe">
                {navItems.map((item) => {
                    const isActive = pathname === item.path || (item.path === "/sukuk" && pathname.startsWith("/sukuk"))
                    const IconComponent = isActive ? item.activeIcon : item.icon
                    
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={`flex flex-col items-center justify-center py-2 px-3 min-w-[64px] transition-all duration-200 ${
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground active:scale-95"
                            }`}
                        >
                            <div className={`p-2 rounded-xl transition-all duration-200 ${
                                isActive 
                                    ? "bg-primary/10 scale-105" 
                                    : "hover:bg-accent/50"
                            }`}>
                                <IconComponent 
                                    className={`transition-all duration-200 ${
                                        isActive ? "w-5 h-5" : "w-5 h-5"
                                    }`}
                                    strokeWidth={isActive ? 2.5 : 1.5}
                                />
                            </div>
                            <span className={`text-[10px] font-medium mt-1 transition-all duration-200 ${
                                isActive ? "text-primary" : "text-muted-foreground"
                            }`}>
                                {item.name}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
} 