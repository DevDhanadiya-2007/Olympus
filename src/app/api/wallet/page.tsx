"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Wallet, Plus, Star } from 'lucide-react'

export default function Component() {
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: 0.2,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 300, damping: 24 }
        }
    }

    const iconVariants = {
        hover: { scale: 1.2, rotate: 360, transition: { duration: 0.3 } }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-[#1a1a1a] p-8 rounded-3xl max-w-md w-full"
            >
                <motion.div
                    variants={itemVariants}
                    className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center relative overflow-hidden"
                >
                    <Wallet className="w-10 h-10 text-white z-10" />
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 opacity-75"
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </motion.div>
                <motion.h1 variants={itemVariants} className="text-3xl font-bold text-white mb-6 text-center">
                    Olympus Wallet
                </motion.h1>
                <div className="space-y-6 flex flex-col">
                    <Link href="/api/wallet/import-wallet" passHref>
                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-4 px-6 bg-[#2a2a2a] text-white rounded-2xl transition-all duration-300 flex items-center justify-between group"
                        >
                            <div>
                                <span className="text-lg font-semibold">Import Wallet</span>
                                <p className="text-sm text-gray-400 mt-1">Already have a wallet?</p>
                            </div>
                            <motion.div variants={iconVariants} whileHover="hover">
                                <ArrowRight className="h-5 w-5 text-purple-400" />
                            </motion.div>
                        </motion.button>
                    </Link>
                    <Link href="/api/wallet/create-wallet" passHref>
                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-4 px-6 bg-[#2a2a2a] text-white rounded-2xl transition-all duration-300 flex items-center justify-between group"
                        >
                            <div>
                                <span className="text-lg font-semibold">Create New Wallet</span>
                                <p className="text-sm text-gray-400 mt-1">Start your cosmic journey</p>
                            </div>
                            <motion.div variants={iconVariants} whileHover="hover">
                                <Plus className="h-5 w-5 text-blue-400" />
                            </motion.div>
                        </motion.button>
                    </Link>
                </div>
                <motion.div
                    variants={itemVariants}
                    className="mt-8 text-center text-gray-500 flex items-center justify-center space-x-2"
                >
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>Explore the with Olympus</span>
                    <Star className="h-4 w-4 text-yellow-500" />
                </motion.div>
            </motion.div>
        </div>
    )
}