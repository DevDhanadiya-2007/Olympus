"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, Plus, Pen, Settings, RefreshCw } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Skeleton } from '@/components/ui/skeleton'
import { LayoutProps } from '@/types'

interface NavItem {
    icon: LucideIcon
    title: string
    id: string
}

const navItems: NavItem[] = [
    { icon: LayoutDashboard, title: 'Dashboard', id: 'dashboard' },
    { icon: Plus, title: 'Create', id: 'create' },
    { icon: Pen, title: 'Manage', id: 'manage' },
    { icon: Settings, title: 'Settings', id: 'settings' },
]

export default function Layout({ create, manage, settings, children }: LayoutProps) {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [isLoading, setIsLoading] = useState(false)

    const handleRefresh = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 1000)
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'create':
                return create
            case 'manage':
                return manage
            case 'settings':
                return settings
            default:
                return children
        }
    }

    return (
        <TooltipProvider>
            <div className="flex h-screen bg-black text-white">
                <nav className="fixed left-0 top-0 flex h-full w-16 flex-col justify-between bg-gray-900 p-3 z-20">
                    <div className="mt-16">
                        {navItems.slice(0, 1).map((item) => (
                            <NavIcon key={item.id} item={item} isActive={activeTab === item.id} onClick={() => setActiveTab(item.id)} />
                        ))}
                    </div>
                    <div>
                        {navItems.slice(1).map((item) => (
                            <NavIcon key={item.id} item={item} isActive={activeTab === item.id} onClick={() => setActiveTab(item.id)} />
                        ))}
                    </div>
                </nav>
                <main className="ml-16 flex-1 overflow-auto">
                    <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-black p-4">
                        <h1 className="text-xl font-semibold capitalize">{activeTab}</h1>
                        <button
                            onClick={handleRefresh}
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="Refresh page"
                        >
                            <RefreshCw size={20} />
                        </button>
                    </div>
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="p-4"
                            >
                                <Skeleton className="h-8 w-3/4 mb-4" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-3/4" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="content"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="p-4"
                            >
                                {renderContent()}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </TooltipProvider>
    )
}

function NavIcon({ item, isActive, onClick }: { item: NavItem; isActive: boolean; onClick: () => void }) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button onClick={onClick} className="w-full">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${isActive ? 'text-primary-foreground' : 'text-gray-400 hover:text-gray-200'
                            }`}
                    >
                        <item.icon size={20} />
                    </motion.div>
                </button>
            </TooltipTrigger>
            <TooltipContent side="right">
                <p>{item.title}</p>
            </TooltipContent>
        </Tooltip>
    )
}