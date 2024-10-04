"use client"

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, BarChart2, LogIn, LogOut, User, LucideProps } from 'lucide-react'
import { useSelector } from 'react-redux'

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { RootState } from '../store/store'
import { useAuth } from '../hooks/useAuth'

type NavItem = {
    name: string
    icon: React.FC<LucideProps>
    href: string
}

const Navbar: React.FC = () => {
    const [activeItem, setActiveItem] = useState<string | null>(null)
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const router = useRouter()
    const pathname = usePathname()
    const { handleLogout, handleLogin, checkAuthStatus } = useAuth()

    const navItems: NavItem[] = [
        { name: 'Wallet', icon: Wallet, href: '/api/wallet' },
        { name: 'Dashboard', icon: BarChart2, href: '/dashboard' },
    ]

    const setActiveNavItem = useCallback(() => {
        const matchingNavItem = navItems.find(({ href }) => pathname.startsWith(href))
        if (matchingNavItem) {
            setActiveItem(matchingNavItem.name.toLowerCase())
        } else {
            setActiveItem(null)
        }
    }, [pathname, navItems])

    useEffect(() => {
        checkAuthStatus()
    }, [checkAuthStatus])

    useEffect(() => {
        setActiveNavItem()
    }, [pathname, setActiveNavItem])

    const handleLogoClick = useCallback(() => {
        router.push('/')
    }, [router])

    return (
        <motion.nav
            className="sticky top-0 z-50 bg-[#0a0f1f] rounded-b-lg shadow-lg p-2"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
                boxShadow: '0 4px 20px rgba(0, 150, 255, 0.2)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <div className="container mx-auto flex justify-between items-center">
                <motion.button
                    onClick={handleLogoClick}
                    className="flex items-center space-x-2 group focus:outline-none"
                    aria-label="Navigate to homepage"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-8 h-8"
                    >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                            <circle cx="12" cy="12" r="11" stroke="#00c8ff" strokeWidth="2" />
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7v-2z" fill="#00c8ff" />
                        </svg>
                        <Wallet className="h-5 w-5 text-[#00c8ff] absolute inset-0 m-auto" />
                    </motion.div>
                    <span className="text-xl font-extrabold text-white transition-all duration-300 group-hover:text-[#00c8ff]">
                        Olympus
                    </span>
                </motion.button>

                <div className="flex items-center space-x-2">
                    <AnimatePresence>
                        {navItems.map(({ name, icon: Icon, href }) => (
                            <motion.div key={name} className="relative"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link
                                    href={href}
                                    className={`flex items-center justify-center space-x-1 px-2 py-1 text-[#a0aec0] hover:text-[#00c8ff] transition-all duration-300`}
                                    aria-current={activeItem === name.toLowerCase() ? "page" : undefined}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span className="text-sm">{name}</span>
                                </Link>
                                {activeItem === name.toLowerCase() && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c8ff] rounded-full"
                                        layoutId="activeNavItem"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <AnimatePresence>
                        {isAuthenticated ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="relative h-8 w-8 rounded-full"
                                        >
                                            <motion.div
                                                className="h-8 w-8 rounded-full bg-[#1a2233] flex items-center justify-center"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <User className="h-5 w-8 text-[#00c8ff]" />
                                            </motion.div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={handleLogout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </motion.div>
                        ) : (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Button
                                    variant="outline"
                                    className="bg-[#1a2233] text-[#00c8ff] border border-[#00c8ff] transition-all duration-300 flex items-center justify-center text-sm px-3 py-1"
                                    onClick={handleLogin}
                                    style={{
                                        boxShadow: '0 2px 8px rgba(0, 200, 255, 0.2)',
                                    }}
                                >
                                    <LogIn className="h-4 w-4 mr-1" />
                                    Log In
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.nav>
    )
}
export default Navbar