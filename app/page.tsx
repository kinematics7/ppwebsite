"use client"

import Hero from "./components/hero"
import ArcadeMachines from "./components/arcade-machines"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <ArcadeMachines />

      {/* Featured Games Section */}
      <section className="py-20 bg-gradient-to-b from-black to-purple-950 relative">
        <div className="absolute inset-0 opacity-10">
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
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 sm:text-5xl mb-4">
              Featured Games
            </h2>
            <p className="text-lg text-yellow-300 max-w-2xl mx-auto">
              Check out some of our most popular arcade classics that will bring the 80s nostalgia to your event
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {[
              {
                title: "Pac-Man",
                image: "/placeholder.svg?height=300&width=400",
                description: "The iconic maze chase game that defined a generation",
              },
              {
                title: "Street Fighter II",
                image: "/placeholder.svg?height=300&width=400",
                description: "The legendary fighting game that revolutionized arcades",
              },
              {
                title: "Galaga",
                image: "/placeholder.svg?height=300&width=400",
                description: "The space shooter classic with endless alien waves",
              },
            ].map((game, index) => (
              <motion.div
                key={index}
                className="bg-zinc-900 rounded-lg overflow-hidden border-2 border-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.3)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img src={game.image || "/placeholder.svg"} alt={game.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-cyan-300 mb-2">{game.title}</h3>
                  <p className="text-gray-300 mb-4">{game.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/games">
              <Button className="bg-gradient-to-r from-pink-600 to-cyan-600 hover:from-pink-500 hover:to-cyan-500 text-white font-bold shadow-[0_0_15px_rgba(255,0,255,0.3)]">
                View All Games
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-900/40 to-pink-900/40 p-8 md:p-12 rounded-2xl border border-pink-500/30 shadow-[0_0_30px_rgba(255,0,255,0.2)]">
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">
                Ready to Level Up Your Event?
              </h2>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Book our mobile arcade experience and transport your guests back to the golden age of gaming. Perfect
                for birthdays, corporate events, weddings, and more!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-lg px-8 py-6 h-auto shadow-[0_0_15px_rgba(255,0,255,0.3)]">
                    BOOK NOW
                  </Button>
                </Link>
                <Link href="/gallery">
                  <Button
                    variant="outline"
                    className="border-cyan-500 text-cyan-400 hover:text-white hover:bg-cyan-500/20 font-bold text-lg px-8 py-6 h-auto"
                  >
                    View Gallery
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
