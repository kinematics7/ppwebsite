import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import Header from "./components/header"
import Footer from "./components/footer"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
