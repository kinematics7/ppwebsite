"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Camera, X } from "lucide-react"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const galleryImages = [
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Arcade machine setup at event",
      category: "events",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Birthday party arcade setup",
      category: "events",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Pac-Man arcade machine",
      category: "machines",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Wedding reception arcade corner",
      category: "events",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Street Fighter II cabinet",
      category: "machines",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Kids playing arcade games",
      category: "people",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Retro gaming tournament",
      category: "events",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Mortal Kombat arcade cabinet",
      category: "machines",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Mobile arcade truck exterior",
      category: "setup",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Arcade setup at outdoor festival",
      category: "setup",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "People enjoying arcade games",
      category: "people",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Retro arcade lighting setup",
      category: "setup",
    },
  ]

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-black to-purple-950">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Camera className="h-12 w-12 mx-auto text-pink-500 mb-4" />
            <h1 className="text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-4">
              Gallery
            </h1>
            <p className="text-lg text-cyan-300 max-w-2xl mx-auto">
              Check out our mobile arcade setup in action at various events. From corporate functions to birthday
              parties, we bring the arcade experience to you!
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-4 right-4 text-white bg-pink-600 rounded-full p-2 hover:bg-pink-500 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <motion.img
              src={selectedImage}
              alt="Enlarged gallery image"
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-[0_0_30px_rgba(255,0,255,0.3)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}
