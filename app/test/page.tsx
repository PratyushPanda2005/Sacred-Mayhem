"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"

export default function TestPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navigation />

      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/">
            <motion.div
              className="flex items-center space-x-2 mb-8 cursor-pointer hover:underline"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-bold tracking-wider">BACK TO HOME</span>
            </motion.div>
          </Link>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">TEST PAGE</h1>
            <p className="text-xl tracking-widest">ROUTING IS WORKING!</p>

            <div className="mt-12 space-y-4">
              <h2 className="text-2xl font-bold">Available Pages:</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {[
                  { name: "Shop", href: "/shop" },
                  { name: "About", href: "/about" },
                  { name: "Contact", href: "/contact" },
                  { name: "Lookbook", href: "/lookbook" },
                  { name: "Account", href: "/account" },
                  { name: "Wishlist", href: "/wishlist" },
                  { name: "Login", href: "/login" },
                  { name: "Signup", href: "/signup" },
                  { name: "Checkout", href: "/checkout" },
                  { name: "Collections", href: "/collections" },
                  { name: "Archives", href: "/sale" },
                  { name: "New Arrivals", href: "/new-arrivals" },
                  { name: "Shipping", href: "/shipping" },
                  { name: "Returns", href: "/returns" },
                  { name: "Size Guide", href: "/size-guide" },
                ].map((page) => (
                  <Link key={page.name} href={page.href}>
                    <div className="border-2 border-black p-4 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
                      <span className="font-bold tracking-wider">{page.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
