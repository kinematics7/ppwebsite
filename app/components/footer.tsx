"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Instagram, Twitter, Facebook } from "lucide-react"
import Logo from "./logo"

export default function Footer() {
  return (
    <footer className="border-t border-cyan-900 bg-black py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "radial-gradient(circle, #00ffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Logo width={40} height={40} animate={false} />
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400">
                PARK & PLAY
              </h3>
            </div>
            <p className="text-gray-400 mb-4">
              Bringing the authentic arcade experience to your events. Our mobile arcade setup brings the nostalgia and
              fun directly to you!
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Park & Play Mobile Arcade. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors">
                <MapPin className="h-5 w-5 text-pink-500" />
                <span>Tampa, FL</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors">
                <Phone className="h-5 w-5 text-pink-500" />
                <span>(656) 217-0624</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors">
                <Mail className="h-5 w-5 text-pink-500" />
                <span>info@parkandplayarcade.com</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-cyan-400 mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-500 hover:to-purple-500 transition-all shadow-[0_0_10px_rgba(255,0,255,0.3)]"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 transition-all shadow-[0_0_10px_rgba(0,255,255,0.3)]"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 transition-all shadow-[0_0_10px_rgba(0,0,255,0.3)]"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-bold text-pink-400 mb-2">Service Areas</h4>
              <p className="text-gray-400">Tampa • St. Petersburg • Clearwater • Brandon • And surrounding areas</p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
