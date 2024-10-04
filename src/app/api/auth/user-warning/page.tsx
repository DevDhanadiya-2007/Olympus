'use client'

import { AlertTriangle, Lock, User, Shield, Key } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        opacity: Math.random() * 0.7 + 0.3,
        animationDuration: `${Math.random() * 5 + 5}s`,
    }))
}

export default function Component() {
    const [stars, setStars] = useState<Array<any>>([])

    useEffect(() => {
        setStars(generateStars(50))
    }, [])

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
                <div className="absolute inset-0">
                    {stars.map((star) => (
                        <div
                            key={star.id}
                            className="absolute rounded-full bg-white"
                            style={{
                                top: star.top,
                                left: star.left,
                                width: star.width,
                                height: star.height,
                                opacity: star.opacity,
                                animation: `twinkle ${star.animationDuration} infinite`,
                            }}
                        />
                    ))}
                </div>
            </div>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full bg-gray-900/30 backdrop-blur-xl rounded-2xl p-8 relative z-10"
            >
                <div className="flex flex-col items-center space-y-6">
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <AlertTriangle className="w-16 h-16 text-yellow-500" />
                    </motion.div>
                    <h1 className="text-2xl font-bold text-white text-center">User Not Authenticated</h1>
                    <p className="text-gray-300 text-center">
                        Please log in to access this page. Your security is our priority.
                    </p>
                    <div className="flex space-x-4">
                        {[User, Shield, Key].map((Icon, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.2 }}
                                className="p-4 bg-gray-800/50 rounded-full"
                            >
                                <Icon className={`w-6 h-6 ${['text-blue-400', 'text-green-400', 'text-purple-400'][index]}`} />
                            </motion.div>
                        ))}
                    </div>
                    <div className="w-full max-w-xs">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                        >
                            <Link
                                href="/api/auth/login"
                                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 group"
                            >
                                <Lock className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                <span>Login</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
            <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
        </div>
    )
}