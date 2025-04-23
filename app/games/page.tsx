"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Gamepad2 } from "lucide-react"

export default function GamesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "classics", "racing", "fighting", "multiplayer"]

  const games = [
    {
      id: 1,
      title: "Pac-Man",
      category: "classics",
      image: "/pacman.png?height=400&width=600",
      year: "1980",
      description: "Navigate Pac-Man through a maze while eating dots and avoiding ghosts.",
    },
    {
      id: 2,
      title: "Galaga",
      category: "classics",
      image: "/galaga.png?height=400&width=600",
      year: "1981",
      description: "Pilot a starfighter and shoot down waves of alien insects.",
    },
    {
      id: 3,
      title: "The Fast and The Furious",
      category: "racing",
      image: "/fastfurious.png?height=400&width=600",
      year: "2004",
      description: "Race through city streets in this high-speed arcade racing game.",
    },
    {
      id: 4,
      title: "Street Fighter 2",
      category: "fighting",
      image: "/placeholder.svg?height=400&width=600",
      year: "1991",
      description: "Battle opponents in one-on-one martial arts combat.",
    },
    {
      id: 5,
      title: "Mortal Kombat",
      category: "fighting",
      image: "/mortalkombat.png?height=400&width=600",
      year: "1992",
      description: "Engage in brutal martial arts combat with special moves and fatalities.",
    },
    {
      id: 6,
      title: "Joust",
      category: "classics",
      image: "/joust.png?height=400&width=600",
      year: "1982",
      description: "Ride a flying ostrich and joust against enemy knights.",
    },
    {
      id: 7,
      title: "NFL Blitz",
      category: "multiplayer",
      image: "/blitz.png?height=400&width=600",
      year: "1997",
      description: "4-player arcade-style football game with over-the-top action.",
    },
    {
      id: 8,
      title: "Tempest",
      category: "classics",
      image: "/tempest.png?height=400&width=600",
      year: "1981",
      description: "Navigate a claw-shaped spaceship around the edge of geometric shapes.",
    },
    {
      id: 9,
      title: "Asteroids",
      category: "classics",
      image: "/asteroids.png?height=400&width=600",
      year: "1979",
      description: "Control a spaceship and destroy asteroids while avoiding UFOs.",
    },
    {
      id: 10,
      title: "Centipede",
      category: "classics",
      image: "/centipede.png?height=400&width=600",
      year: "1981",
      description: "Shoot at a descending centipede that splits into segments when hit.",
    },
    {
      id: 11,
      title: "Missile Command",
      category: "classics",
      image: "/misslecommand.png?height=400&width=600",
      year: "1980",
      description: "Defend cities from incoming missiles using counter-missiles.",
    },
    {
      id: 12,
      title: "Crystal Castles",
      category: "classics",
      image: "/crystalcastles.png?height=400&width=600",
      year: "1983",
      description: "Guide Bentley Bear through a 3D maze collecting gems and avoiding enemies.",
    },
    {
      id: 13,
      title: "Tapper",
      category: "classics",
      image: "/tapper.png?height=400&width=600",
      year: "1983",
      description: "Serve drinks to impatient customers before they reach the end of the bar.",
    },
  ]

  const filteredGames = games.filter((game) => (selectedCategory === "all" ? true : game.category === selectedCategory))

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-black to-purple-950">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Gamepad2 className="h-12 w-12 mx-auto text-pink-500 mb-4" />
            <h1 className="text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 mb-4">
              Our Arcade Games
            </h1>
            <p className="text-lg text-cyan-300 max-w-2xl mx-auto">
              Browse our collection of arcade classics. Choose your favorite game and get ready to play! We have a wide variety of games to suit all tastes and ages.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
        </motion.div>

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
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-purple-900/80 via-blue-900/60 to-transparent opacity-100">
                        <h3 className="text-2xl font-bold text-white">{game.title}</h3>
                        <p className="mt-2 text-sm text-cyan-300">{game.year}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-300">{game.description}</p>
                      <div className="mt-4">
                        <span className="inline-block bg-pink-900/50 text-pink-300 text-xs px-3 py-1 rounded-full">
                          {game.category}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
