"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Logo from "./logo"
import Link from "next/link"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create a grid of pixels for retro effect
    const pixelSize = 8
    const columns = Math.ceil(canvas.width / pixelSize)
    const rows = Math.ceil(canvas.height / pixelSize)

    // Neon colors for the pixels
    const colors = [
      "#ff00ff", // Magenta
      "#00ffff", // Cyan
      "#ffff00", // Yellow
      "#ff0099", // Pink
      "#33ff00", // Green
    ]

    function animate() {
      if (!ctx) return

      // Create scanline effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw random neon pixels
      for (let i = 0; i < 20; i++) {
        const x = Math.floor(Math.random() * columns) * pixelSize
        const y = Math.floor(Math.random() * rows) * pixelSize
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
        ctx.fillRect(x, y, pixelSize, pixelSize)
      }

      // Draw scanlines
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      for (let i = 0; i < canvas.height; i += 4) {
        ctx.fillRect(0, i, canvas.width, 2)
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Text animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-black" />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black/70" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 1,
          }}
          className="mb-8"
        >
          <Logo width={120} height={120} />
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="visible" className="mb-6">
          <motion.h1
            className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-400 to-yellow-400 sm:text-7xl lg:text-8xl"
            variants={slideIn}
          >
            PARK & PLAY
          </motion.h1>
        </motion.div>

        <motion.div
          className="mb-8 flex flex-col items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.p
            className="max-w-[600px] text-2xl font-bold text-cyan-400 sm:text-3xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            MOBILE ARCADE EXPERIENCE
          </motion.p>
          <motion.p
            className="mt-4 max-w-[600px] text-lg text-pink-300 sm:text-xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Bringing the 80s arcade experience to your event
          </motion.p>
        </motion.div>

        <Link href="/contact">
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg text-white font-bold text-lg hover:from-pink-500 hover:to-purple-500 transition-all shadow-[0_0_15px_rgba(255,0,255,0.5)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BOOK NOW
          </motion.button>
        </Link>
      </div>
    </div>
  )
}
