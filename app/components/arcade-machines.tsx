"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"

export default function ArcadeMachines() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const machines = [
    {
      src: "/pacman.png?height=600&width=400",
      alt: "Pac-Man arcade machine",
      title: "Pac-Man",
    },
    {
      src: "/spaceinvaders.png?height=600&width=400",
      alt: "Space Invaders arcade machine",
      title: "Space Invaders",
    },
    {
      src: "/streetfighter.png?height=600&width=400",
      alt: "Street Fighter 2 arcade machine",
      title: "Street Fighter 2",
    },
    {
      src: "/galaga.png?height=600&width=400",
      alt: "Galaga arcade machine",
      title: "Galaga",
    },
  ]

  return (
    <section className="relative py-20 bg-gradient-to-b from-black to-purple-950">
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "radial-gradient(circle, #ff00ff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>
      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="mb-4 text-center text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 sm:text-5xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Arcade Machines
        </motion.h2>
        <motion.p
          className="mb-12 text-center text-lg text-cyan-300"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          80s arcade cabinets ready to roll to your location
        </motion.p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {machines.map((machine, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-lg border-2 border-pink-500 shadow-[0_0_15px_rgba(255,0,255,0.3)]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="aspect-[2/3] overflow-hidden">
                <img
                  src={machine.src || "/placeholder.svg"}
                  alt={machine.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-purple-900/90 to-transparent p-6">
                <h3 className="text-xl font-bold text-cyan-300">{machine.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
