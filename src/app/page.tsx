'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { StarProps } from '@/types'

const Star: React.FC<StarProps> = ({ top, left, size, delay }) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={{ top, left, width: size, height: size }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 1, 0] }}
    transition={{ duration: 2, delay, repeat: Infinity }}
  />
)

const ShootingStar = () => {
  const [position, setPosition] = useState({ top: '0%', left: '0%' })

  useEffect(() => {
    setPosition({
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
    })
  }, [])

  return (
    <motion.div
      className="absolute w-0.5 h-0.5 bg-white"
      style={position}
      initial={{ opacity: 1, scale: 0 }}
      animate={{
        opacity: [1, 0],
        scale: [0, 15],
        left: [position.left, '100%'],
        top: [position.top, '100%'],
      }}
      transition={{ duration: 0.8, delay: Math.random() * 10, repeat: Infinity }}
    />
  )
}

export default function Page() {
  const [stars, setStars] = useState<StarProps[]>([])

  useEffect(() => {
    const newStars: StarProps[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      size: Math.random() * 2 + 1 + 'px',
      delay: Math.random() * 5,
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="relative w-full h-screen bg-[#0a0a1f] overflow-hidden">
      {stars.map((star) => (
        <Star key={star.id} {...star} />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <ShootingStar key={i} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a1f] to-[#0a0a1f] opacity-70" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-6xl md:text-8xl font-bold mb-8 text-center"
        >
          Welcome to Olympus
        </motion.h1>
        <Link href="/api/wallet" passHref>
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white bg-opacity-10 backdrop-blur-md rounded-full text-xl font-bold text-white shadow-lg transition-all duration-300"
          >
            Create or Link Wallet
          </motion.button>
        </Link>
      </div>
    </div>
  )
}