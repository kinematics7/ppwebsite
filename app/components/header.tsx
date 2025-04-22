"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import Logo from "./logo"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/games", label: "Games" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-2 shadow-[0_0_15px_rgba(255,0,255,0.3)]" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <Logo width={40} height={40} animate={false} />
            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">
              PARK & PLAY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive(link.href) ? "text-cyan-400" : "text-white hover:text-pink-400"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 top-full h-[2px] w-full bg-gradient-to-r from-pink-500 to-cyan-400"
                  />
                )}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact#booking-form"
            className="hidden md:inline-flex px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg text-white font-bold text-sm hover:from-pink-500 hover:to-purple-500 transition-all shadow-[0_0_10px_rgba(255,0,255,0.3)]"
          >
            BOOK NOW
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 w-10 h-10 flex items-center justify-center text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        className="fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex md:hidden"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="container mx-auto px-4 pt-24 pb-8">
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-2xl font-bold ${
                  isActive(link.href)
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400"
                    : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact#booking-form"
              className="mt-4 px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg text-white font-bold text-lg hover:from-pink-500 hover:to-purple-500 transition-all shadow-[0_0_15px_rgba(255,0,255,0.3)]"
            >
              BOOK NOW
            </Link>
          </nav>
        </div>
      </motion.div>
    </header>
  )
}
