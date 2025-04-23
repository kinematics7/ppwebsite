"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function GamesList() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "classics", "racing", "fighting", "multiplayer"]

  const games = [
    {
      id: 1,
      title: "Pac-Man",
      category: "classics",
      image: "/placeholder.svg?height=400&width=600",
      year: "1980",
    },
    {
      id: 2,
      title: "Galaga",
      category: "classics",
      image: "/placeholder.svg?height=400&width=600",
      year: "1981",
    },
    {
      id: 3,
      title: "The Fast and The Furious",
      category: "racing",
      image: "/placeholder.svg?height=400&width=600",
      year: "2004",
    },
    {
      id: 4,
      title: "Street Fighter 2",
      category: "fighting",
      image: "/placeholder.svg?height=400&width=600",
      year: "1991",
    },
    {
      id: 5,
      title: "Mortal Kombat",
      category: "fighting",
      image: "/placeholder.svg?height=400&width=600",
      year: "1992",
    },
    {
      id: 6,
      title: "Joust",
      category: "classics",
      image: "/placeholder.svg?height=400&width=600",
      year: "1982",
    },
    {
      id: 7,
      title: "NFL Blitz",
      category: "multiplayer",
      image: "/placeholder.svg?height=400&width=600",
      year: "1997",
      description: "4 player",
    },
    {
      id: 8,
      title: "X-Men",
      category: "multiplayer",
      image: "/placeholder.svg?height=400&width=600",
      year: "1992",
      description: "4 player",
    },
    {
      id: 9,
      title: "Tempest",
      category: "classics",
      image: "/placeholder.svg?height=400&width=600",
      year: "1981",
    },
    {
      id: 10,
      title: "Asteroids",
      category: "classics",
      image: "/placeholder.svg?height=400&width=600",
      year: "1979",
    },
    {
      id: 11,
      title: "Centipede",
      category: "classics",
      image: "/placeholder.svg?height=400&width=600",
      year: "1981",
    },
    {
      id: 12,
      title: "Missile Command",
      category: "classics",
      image: "/placeholder.svg?height=400&width=600",
      year: "1980",
    },
    {
      id: 13,
      title: "Crystal Castles",
      category: "classics",
      image: "/placeholder.svg?height=400&width=600",
      year: "1983",
    },
    {
      id: 14,
      title: "Tapper",
      category: "classics",
      image: "/placeholder.svg?height=400&width=600",
      year: "1983",
    },
  ]

  const filteredGames = games.filter((game) => (selectedCategory === "all" ? true : game.category === selectedCategory))

  return (
    <section className="bg-black py-20 relative">
      <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="mb-4 text-center text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 sm:text-5xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Classic Games
        </motion.h2>
        <motion.p
          className="mb-12 text-center text-lg text-yellow-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Choose from our collection of arcade hits
        </motion.p>
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm capitalize ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-pink-500 text-white border-none"
                  : "border-cyan-500 text-cyan-400 hover:text-white hover:bg-cyan-500/20"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden bg-zinc-900 border-2 border-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.3)]">
                  <CardContent className="p-0">
                    <div className="group relative">
                      <img
                        src={game.image || "/placeholder.svg"}
                        alt={game.title}
                        className="w-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-purple-900/80 via-blue-900/60 to-transparent opacity-100">
                        <h3 className="text-2xl font-bold text-white">{game.title}</h3>
                        <p className="mt-2 text-sm text-cyan-300">{game.year}</p>
                        {game.description && <p className="text-pink-300">{game.description}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
