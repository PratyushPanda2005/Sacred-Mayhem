"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingBag, Heart, User, Search } from "lucide-react"
import Link from "next/link"

interface NavigationProps {
  cartItemCount?: number
  wishlistCount?: number
  onCartOpen?: () => void
}

const navItems = [
  { name: "SHOP", href: "/shop" },
  { name: "NEW ARRIVALS", href: "/new-arrivals" },
  { name: "LOOKBOOK", href: "/lookbook" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
]

export default function Navigation({ cartItemCount = 0, wishlistCount = 0, onCartOpen }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="text-xl md:text-2xl font-black tracking-tighter cursor-pointer" // Changed to text-xl for mobile, md:text-2xl for desktop
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SACRED MAYHEM
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.span
                  className="text-sm font-bold tracking-wider hover:underline cursor-pointer"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <motion.button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search className="w-5 h-5" />
            </motion.button>

            <Link href="/account">
              <motion.button
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <User className="w-5 h-5" />
              </motion.button>
            </Link>

            <Link href="/wishlist">
              <motion.button
                className="p-2 hover:bg-gray-100 rounded transition-colors relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            <Link href="/cart">
              <motion.button
                className="p-2 hover:bg-gray-100 rounded transition-colors relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-white border-t border-black"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <span
                      className="block text-lg font-bold tracking-wider hover:underline cursor-pointer py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}